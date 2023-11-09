const express = require("express");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

const errorCodes = {
    "404": "Page not found"
};


const newsStories = {
    "0": {
        "title": "stuff happens",
        "content": "a thing"
    },
    "1": {
        "title": "a thingy that happened recently",
        "content": "recently a thingy happened and we will now report on that idk what"
    },
    "2": {
        "title": "is this",
        "content": "a thing"
    },
    "3": {
        "title": "is this the best new source",
        "content": "yes"
    },
    "4": {
        "title": "should you trust everything you see online?",
        "content": "Yes especially if it comes from us"
    }
};

app.get("/", (request, response) => {
    response.render("./pages/index.ejs", {
        "pageTitle": "Home"
    });
})
app.get("/pages/:id", (request, response) => {
    const id = request.params["id"];
    if (newsStories[id]){
        const title = newsStories[id]["title"]
        const content = newsStories[id]["content"]
        console.log(id)
        response.render("./pages/newspage.ejs", {
            "pageTitle": title,
            "newsTitle": title,
            "newsContent": content,
            "previews": [[]]
        });
    }
    else{
        response.render("./pages/errorPage.ejs", {
            "errorCode": "404",
            "errorMessage": errorCodes["404"] 
        })
    }
})

const server = app.listen(port, (error) => {
    if (error){
        return console.log(`Error: ${error}`);
    }
    console.log(`Listening on port ${port}`);
})