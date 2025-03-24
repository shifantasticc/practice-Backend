const express = require("express");
const app = express();
const path = require("path");

let port = 8080;
//connecting static file folder(public) path to EJS
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));
//connecting templates folder(veiw) path to EJS
app.set("view engine", "ejs");  
app.set("veiw", path.join(__dirname, "/views"));

//home.ejs
app.get("/", (req,res) => {
    res.render("home.ejs");
});

// instagram.ejs
app.get("/ig/:username", (req, res) => {
    let {username} = req.params;
    const instaData = require("./data.json");
    const data =  instaData[username];
    if (data) {
        res.render("instagram.ejs", {data});
    } else {
        res.render("Error.ejs");
    }
    
});

// facebook.ejs
app.get("/fb/:username", (req, res) => {
    let {username} = req.params;
    const followers = ["Ri", "Violet", "Xaden", "ridoc"];
    res.render("facebook.ejs", {username, followers});
});

// rolldice.ejs
app.get("/rolldice", (req, res) => {
    let  diceVal = Math.floor(Math.random()*6)+1;
    res.render("rolldice.ejs", {diceVal});
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
