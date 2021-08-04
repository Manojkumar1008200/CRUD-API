const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
 database: process.env.DB_NAME
});



// View Users
exports.view = (req, res) => {
    //   connection
    connection.query('SELECT * FROM users WHERE status = "active"', (err, rows) => {
      // When done with the connection, release it
      if (!err) {
        let removedUser = req.query.removed;
        res.render('home', { rows, removedUser });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }

  // Find User
  exports.find = (req, res) => {
    let searchTerm = req.body.search;
    //  the connection
    connection.query('SELECT * FROM users WHERE First_Name LIKE ? OR Last_Name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
      if (!err) {
        res.render('home', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }
  
  // Add New User
  exports.form = (req, res) => {
    res.render('Add-User');
}

//Adding User
exports.create = (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;
    let searchTerm = req.body.search;
  
    // User the connection
    connection.query('INSERT INTO users SET First_Name = ?, Last_Name = ?, Email = ?, Phone = ?, Comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
      if (!err) {
        res.render('Add-user', { alert: 'User added successfully.' });
      } else {
        console.log(err);
      }
      console.log('The data from users table: \n', rows);
    });
  }


  //Edit User
  exports.edit = (req, res) => {
    //   connection
    connection.query('SELECT * FROM users WHERE ID = ?', [req.params.id], (err, rows) => {
      // When done with the connection, release it
      if (!err) {
        
        res.render('edit-user', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }

  //update Data
  exports.update = (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;
    //   connection
    connection.query('UPDATE users SET First_Name = ?, Last_Name = ?, Email = ?, Phone = ?, Comments = ? WHERE ID = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {
      // When done with the connection, release it
      if (!err) {
        connection.query('SELECT * FROM users WHERE ID = ?', [req.params.id], (err, rows) => {
            // When done with the connection, release it
            if (!err) {
              
                res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
            } else {
              console.log(err);
            }
            console.log('The data from user table: \n', rows);
          });
        }
        else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }

  exports.ViewBar = (req, res) => {

    // User the connection
    connection.query('SELECT * FROM users WHERE ID = ?', [req.params.id], (err, rows) => {
      if (!err) {
        res.render('view-user', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  
  }
    
  exports.delete = (req, res) => {
  connection.query('UPDATE users SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
    if (!err) {
      let removedUser = encodeURIComponent('User successeflly removed.');
      res.redirect('/?removed=' + removedUser);
    } else {
      console.log(err);
    }
    console.log('The data from beer table are: \n', rows);
  });

  };