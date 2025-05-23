const express = require("express");
const app = express();
let port = 8080;

app.use(express.urlencoded({ extended : true}));
app.use(express.json());

//in Form: action: "register" 
app.get("/register", (req, res) => {
    let {user, password} = req.query;
    res.send(`Standard GET response, Welcome ${user}`);
});

app.post("/register", (req, res) => {
    let {user, password} = req.body;
    res.send(`Standard POST response, Welcome ${user}`);
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});