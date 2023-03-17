const express = require('express');
const mysql = require('mysql');
var cors = require('cors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors())
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "healthadvicegroup"
});

// make test connection
db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MySQL connected");
    }
});

//make test post
app.get("/test", (req, res) => {
    const firstName = "test";
    const lastName = "test";
    const email = "test";
    const password = "test";
    db.query(
        "INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?)",
        [firstName, lastName, email, password],
        (err, result) => {
            if (err) {
                res.send({ err: err });
                console.log(err);
            } else {
                res.send({ message: "User registered!" });
                console.log("User registered!")
            }
        }
    )
});

app.post("/edituser", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const authorizationLevel = req.body.authorizationLevel
    const id = req.body.userId


    // get current user info from db
    // compare current user info with new user info
    // if current user info is different from new user info, update the db

    db.query(
        "SELECT * FROM users WHERE id = ?",
        [id],
        (err, result) => {
            if (err) {
                res.send({ err: err });
                console.log(err);
            } else {
              if (result[0].first_name !== firstName && firstName !== "") {
                db.query(
                    "UPDATE users SET first_name = ? WHERE id = ?",
                    [firstName, id],
                    (err, result) => {
                        if (err) {
                            res.send({ err: err });
                            console.log(err);
                        } else {
                            console.log("User edited!")
                        }
                    }
                )
            }
            if (result[0].last_name !== lastName && lastName !== "") {
                db.query(
                    "UPDATE users SET last_name = ? WHERE id = ?",
                    [lastName, id],
                    (err, result) => {
                        if (err) {
                            res.send({ err: err });
                            console.log(err);
                        } else {
                            console.log("User edited!")
                        }
                    }
                )
            }
            if (result[0].email !== email && email !== "") {
                db.query(
                    "UPDATE users SET email = ? WHERE id = ?",
                    [email, id],
                    (err, result) => {
                        if (err) {
                            res.send({ err: err });
                            console.log(err);
                        } else {
                            console.log("User edited!")
                        }
                    }
                )
            }
            if (result[0].password !== password && password !== "") {
                db.query(
                    "UPDATE users SET password = ? WHERE id = ?",
                    [password, id],
                    (err, result) => {
                        if (err) {
                            res.send({ err: err });
                            console.log(err);
                        } else {
                            console.log("User edited!")
                        }
                    }
                )
            }

            // send back the new user info
            db.query(
                "SELECT * FROM users WHERE id = ?",
                [id],
                (err, result) => {

                    if (err) {
                        res.send({ err: err });
                        console.log(err);
                    } else {
                        res.send({ message: "User edited!", user: result[0] });
                        console.log(result[0])
                        console.log("User edited!")
                    }
                }
            )


          }




        }
    )
    


   
});

app.post("/deleteuser", (req, res) => {
    const id = req.body.userId

    db.query(
        "DELETE FROM users WHERE id = ?",
        [id],
        (err, result) => {
            if (err) {
                res.send({ err: err });
                console.log(err);
            } else {
                res.send({ message: "User deleted!" });
                console.log("User deleted!")
            }
        }
    )
});

app.get("/getusers", (req, res) => {
    db.query(
        "SELECT * FROM users",
        (err, result) => {
            if (err) {
                res.send({ err: err });
                console.log(err);
            } else {
                res.send({ message: "Users retrieved!", users: result });
                console.log("Users retrieved!")
            }
        }
    )
});

app.get("/getforums", (req, res) => {
    db.query(
        "SELECT * FROM forums",
        (err, result) => {
            if (err) {
                res.send({ err: err });
                console.log(err);
                } else {
                    res.send({ message: "Forums retrieved!", forums: result });
                    console.log("Forums retrieved!")
                }
            }
        )
    });

app.get("/getforum/:id", (req, res) => {
    const id = req.params.id
    console.log(id)
    db.query(
        "SELECT * FROM forums_posts WHERE forum_id = ?",
        [id],
        (err, result) => {
            if (err) {
                res.send({ err: err });
                console.log(err);
                } else {
                    // get forum from the id, then send back the forum and the posts
                    db.query(
                        "SELECT * FROM forums WHERE id = ?",
                        [id],
                        (err, result2) => {
                            if (err) {
                                res.send({ err: err });
                                console.log(err);
                                } else {
                                    res.send({ message: "Forum retrieved!", forum: result2[0], posts: result });
                                    console.log("Forum retrieved!")
                                }
                            }
                        )
                    }
                }
            )
        });

// create the health diary post
app.post("/diarypost", (req, res) => {
    const userId = req.body.userId;
    const type = req.body.type;
    const message = req.body.message;

    db.query(
        "INSERT INTO health_diary (user_id, type, message) VALUES (?,?,?)",
        [userId, type, message],
        (err, result) => {
            if (err) {
                res.send({ err: err });
                console.log(err);
            } else {
                res.send({ message: "Diary post created!" });
                console.log("Diary post created!")
            }
        }
    )
});

app.post("/healthpost", (req,res) => {
    const userId = req.body.userId
    const height = req.body.height
    const weight = req.body.weight
    const bmi = req.body.weight
    const blood_pressure = req.body.blood_pressure
    const heart_rate = req.body.heart_rate

    db.query(
        "INSERT INTO health_tracking (user_id, height, weight, bmi, blood_pressure, heart_rate) VALUES (?,?,?,?,?,?)",
        [userId,height,weight,bmi,blood_pressure,heart_rate],
        (err, result) => {
            if (err) {
                res.send({ err: err });
                console.log(err);
            } else {
                res.send({ message: "health post created!" });
                console.log("health post created!")
            }
        }
    )
});

// get health tracker info
app.get("/gethealthinfo/:id", (req, res) => {
    const id = req.params.id
    db.query(
        "SELECT * FROM health_tracking WHERE user_id = ?",
        [id],
        (err,result) => {
            if (err) {
                res.send({ err: err });
                console.log(err)
            } else {
                res.send({ message: "health info retrieved!", posts: result})
                console.log("Health info retrieved!")
            }
        }
    )
})
// get the health diary posts
app.get("/getdiaryposts/:id", (req, res) => {
    const id = req.params.id
    db.query(
        "SELECT * FROM health_diary WHERE user_id = ?",
        [id],
        (err, result) => {
            if (err) {
                res.send({ err: err });
                console.log(err);
            } else {
                res.send({ message: "Diary posts retrieved!", posts: result });
                console.log("Diary posts retrieved!")
            }
        }
    )
});



app.post("/register", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const authorizationLevel = req.body.authorizationLevel
    
    db.query(
        "INSERT INTO users (first_name, last_name, email, password,authorization_level) VALUES (?,?,?,?,?)",
        [firstName, lastName, email, password,authorizationLevel],
        (err, result) => {
            if (err) {
                res.send({ err: err });
                console.log(err);
            } else {
                res.send({ message: "User registered!" });
                console.log("User registered!")
            }
        }
    )
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    db.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (err, result) => {
        if (err) {
          res.status(500).json({ message: 'Internal Server Error' });
          console.log(err);
          return;
        }
        if (result.length > 0) {
          // Compare the entered password with the hashed password from the database
          const isPasswordMatch = bcrypt.compareSync(password, result[0].password);
          if (isPasswordMatch) {
            // Generate JWT
            const token = jwt.sign({ userId: result[0].id }, 'your_secret_key_here', { expiresIn: '1h' });
  
            // Send user details as response
            res.json({
              id: result[0].id,
              firstName: result[0].first_name,
              lastName: result[0].last_name,
              email: result[0].email,
              userPic: result[0].profile_picture,
              authorizationLevel: result[0].authorization_level,
              token_name: token
            });
  
            console.log(result);
          } else {
            res.status(401).json({ message: 'Wrong email/password combination!' });
            console.log('Wrong email/password combination!');
          }
        } else {
          res.status(404).json({ message: 'User not found!' });
          console.log('User not found!');
        }
      }
    );
  });


app.listen(3001, () => {
    console.log("running on port 3001");
});