const express = require('express');
const cors = require('cors');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

const db = new sqlite3.Database('./chinook.db', (err) => {
    if (err) {
        console.log("Error while connecting to the database");
    } else {
        console.log("Successfully connected to the database");
    }
});

// db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, confirm_password TEXT)');




// app.post('/createAccount', (req, res) => {
//     const { username, password, confirmPassword } = req.body;

 
//     db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to query the database.' });
//         }

//         if (row) {
//             return res.status(400).json({ error: 'Username already exists.' });
//         }

       
//         const queryString = 'INSERT INTO users (username, password, confirm_password) VALUES (?, ?, ?)';
//         db.run(queryString, [username, password, confirmPassword], (err) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Failed to insert into table.' });
//             }

//             req.session.username = username;


//             res.status(200).json({ message: 'Account created successfully.' });
//         });
//     });
// });



// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const queryString = 'SELECT * FROM users WHERE username = ?';
//     db.get(queryString, [username], (err, row) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to query the database.' });
//         }

//         if (row && row.password === password) {
//             req.session.username = username;

//             res.status(200).json({ success: true });
//         } else {
//             res.status(200).json({ success: false });
//         }
//     });
// });

db.run('CREATE TABLE IF NOT EXISTS usersAccounts (id INTEGER PRIMARY KEY, username TEXT, password TEXT, confirm_password TEXT, userPannel TEXT)');

app.post('/createAccount', (req, res) => {
    const { username, password, confirmPassword, userPannel } = req.body;

 
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to query the database.' });
        }

        if (row) {
            return res.status(400).json({ error: 'Username already exists.' });
        }

       
        const queryString = 'INSERT INTO usersAccounts (username, password, confirm_password, userPannel) VALUES (?, ?, ?, ?)';
        db.run(queryString, [username, password, confirmPassword, userPannel], (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to insert into table.' });
            }

            req.session.username = username;


            res.status(200).json({ message: 'Account created successfully.' });
        });
    });
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const queryString = 'SELECT * FROM usersAccounts WHERE username = ?';
    db.get(queryString, [username], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to query the database.' });
        }

        if (row && row.password === password) {
            req.session.username = username;
            req.session.userPannel = row.userPannel; 

            res.status(200).json({ success: true, isAdmin: row.userPannel === 'Admin' });
        } else {
            res.status(200).json({ success: false });
        }
    });
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////Inserting items into the table/////////////////////////////////////////////////////////////

db.run('CREATE TABLE IF NOT EXISTS allItems (id INTEGER PRIMARY KEY, category TEXT, title TEXT, prize REAL, image TEXT)');




app.post('/api/addItem', (req, res) => {
  const {category, title, prize, image } = req.body;


  

  db.run('INSERT INTO allItems (category, title, prize, image) VALUES (?, ?, ?, ?)', [category, title, prize, image], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Item added successfully' });
  });
});

app.get('/api/getItems/:category', (req, res) => {

    const category = req.params.category;

    db.all('SELECT * FROM allItems WHERE category = ?', [category], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});









app.delete('/api/deleteItem/:itemId', (req, res) => {
    const itemId = req.params.itemId;
  
    db.run('DELETE FROM allItems WHERE id = ?', [itemId], (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Item deleted successfully' });
    });

    
  });
  
  

app.put('/api/updateItem/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    const { title, prize, image } = req.body;

    db.run('UPDATE allItems SET title = ?, prize = ?, image = ? WHERE id = ?', [title, prize, image, itemId], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Item updated successfully' });
    });
});

////////////////////////////////////////////////////////////////////////////////////
//////add to favorite//////////////////////////////////////////////////////////////


db.run("CREATE TABLE IF NOT EXISTS user_favorites (itemId TEXT, title TEXT, price REAL, image TEXT, heartIcon TEXT, user_name TEXT REFERENCES users(username))");



app.post('/api/addToFavorite', (req, res) => {
    const { itemId, title, price, image, heartIcon } = req.body;

    db.run('INSERT INTO user_favorites (itemId, title, price, image, heartIcon) VALUES (?, ?, ?, ?, ?)',
        [itemId, title, price, image, heartIcon],
        (err) => {
            if (err) {
                console.error('Error adding to favorites:', err.message);
                return res.status(500).json({ error: 'Failed to add to favorites' });
            }

            res.json({ success: true, item: { itemId, title, price, image , heartIcon } });
        }
    );
});


app.get('/api/getFavorite', (req, res) => {
    // const username = req.session.username;

    // if (!username) {
    //     return res.status(401).json({ error: 'User not authenticated' });
    // }

    db.all('SELECT * FROM user_favorites', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});




app.delete('/api/removeFavorite/:itemId', (req, res) => {
    const itemId = req.params.itemId;
  
    db.run('DELETE FROM user_favorites WHERE itemId = ?', [itemId], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Item deleted successfully' });
    });
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////add-to-cart//////////////////////////////////////////////////////////////////////////////////////////

db.run("CREATE TABLE IF NOT EXISTS cartTable (itemId TEXT, title TEXT, price REAL, image TEXT, itemCount REAL, totalPrice REAL)");

app.post('/api/addToCart', (req, res) => {
  const { itemId, title, price, image, itemCount, totalPrice } = req.body;

  db.run('INSERT INTO cartTable (itemId, title, price, image, itemCount, totalPrice) VALUES (?, ?, ?, ?, ?, ?)',
      [itemId, title, price, image, itemCount, totalPrice],
      (err) => {
          if (err) {
         
              return res.status(500).json({ error: err.message });
          }
          res.json({ success: true });
      }
  );
});




app.get('/api/getCart', (req, res) => {
  db.all('SELECT * FROM cartTable', (err, rows) => {
      if (err) {
       
          return res.status(500).json({ error: err.message });
      }
      res.json(rows);
  });
});



app.delete('/api/removeFromCart/:itemId', (req, res) => {

  const itemId = req.params.itemId;

  db.run('DELETE FROM cartTable WHERE itemId = ?', [itemId], (err) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json({ success: true }); 
  });
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
