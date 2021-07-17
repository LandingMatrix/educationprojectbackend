var express = require("express");
var router = express.Router();
let users = require('../data/users.json');

router.post("/register", function(req, res, next) {
    var first = req.body["first"];
    var last = req.body["last"];
    var email = req.body["email"];
    var pass = req.body["pass"];
    var phone = req.body["phone"];
    var token = register(first, last, email, pass, phone)
    console.log(token);
    res.send(register(first, last, email, pass, phone));
});

router.post("/login", function(req, res, next) {
    var email = req.body['email'];
    var pass = req.body['pass'];
    //res.send(login(email, pass));
    res.send("THIS IS BACKEND");
});

router.post("/logout", function(req, res, next) {
    var token = req.body['token'];
    res.send(logout(token));
});



//FUNCTIONS
function register(first, last, email, pass, phone) {
    var token = "VALID";

    var uID = users.length;

    
    if (!email.includes("@")) {
        token = "INVALID EMAIL";
    }

    var same_email = findUserByEmail(email);
    if (same_email != null) {
        console.log(same_email)
        return "Email already in system"
    }

    // if (email in users.json)
    if (token != "VALID") {
        return token;
    }

    newUser = {
        "userID": uID,
        "token": token,
        "firstName": first,
        "lastName": last,
        "email": email,
        "password": pass, //should encrypt but lazy
        "phone": phone
    }

    users.push(newUser);

    return token;
}

function login(email, pass) {
    var token = 'huirbuire'; //id and time
    //search email
    //compare encrypted password
    var user = findUserByEmail(email);
    if (user == null) {
        return 'INVALID';
    }

    if (user['password'] == pass) {
        user['token'] = token;
        console.log("logged in");
        return token;
    }

    return 'INVALID';
    
}

//login("jordanhuynh2001@gmail.com", "Test");

function logout(token) {
    var user = findUser(token);
    if (user == null) {
        return false;
    }

    user['token'] = '';
    return true;
}

//register("Jordan", "Huynh", "jordanhuynh2001@gmail.com", "hunter2", "0758239");






//helper functions

function findUser(token) {

    if (token == "") {
        console.log("INVLID TOKEN");
        return null;
    }

    for (var user in users) {
        if(users[user]['token'] == token) {
            return users[user];
        }
    }

    return null;
}

function findUserByEmail(email) {

    for (var user in users) {
        if(users[user]['email'] == email) {
            return users[user];
        }
    }

    return null;
}

module.exports = router;