const express = require("express");
const app = express();
let port = 8080;

app.listen(port, () => {
    console.log(`App is listening on port ${port}`); //prints on terminal when starting
});


//sends on any route(page*) //Listen all the requests
// app.use((req, res) => {
//     console.log("request received"); //Prints on terminal when received request
//     res.send("this is a basic response"); //Prints on webpage //Can send object, string, HTML and ++
// });

//sends on specific route(page*) //only 1 response for same path!!
app.get("/", (req, res) => {
    res.send("hello, i am root");
});

//npm package=> NODEMON: to automatically restart server with code changes.
//PATH PARAMETERS
app.get("/:username/:id", (req, res) => {
    let {username, id} = req.params;
    let htmlStr = `<h1>welcome to the page @${username}.</h1>`;
    res.send(htmlStr);
});

app.get("/search", (req, res) => {
    let {q} = req.query;
    if (!q) {
        res.send("<h1>nothing searched</h1>");
    }
    res.send(`<h1>search result for query: ${q}</h1>`);
});

//BASIC ROUTES
// app.get("/apple", (req, res) => {
//     res.send("you contacted apple path");
// });

// app.get("/orange", (req, res) => {
//     res.send("you contacted orange path");
// });

// //kinda like else statement.... //default of paths that doesn't exist
// app.get("*", (req, res) => {
//     res.send("this path does not exist");
// });

// //post request
// app.post("/", (req, res) => {
//     res.send("you send a post request to root");
// });