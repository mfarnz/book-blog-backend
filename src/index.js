const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 3000;

const Book = require("./book");

//Import the mongoose module
var mongoose = require("mongoose");

//Set up default mongoose connection
var mongoDB =
  "mongodb+srv://bookblog-user:9DWMF4y2stDdX8Nh@cluster0.ixsgg.azure.mongodb.net/BookBlog?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

setupDbTables();

//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

var books = [
  {
    title: "Harry Potter",
    author: "JK Rowling",
    bSeries: "1",
    published: "1997",
    pagecount: "309",
    review: "very Exiting",
    link:
      "https://www.goodreads.com/book/show/3.Harry_Potter_and_the_Sorcerer_s_Stone?ac=1&from_search=true&qid=WeMSD2OPpV&rank=1",
    website: "https://www.jkrowling.com/",
    libraryThing: "https://www.librarything.com/work/5403381",
    image: "https://dl.dropbox.com/s/kscjuhiew8dvqky/harry%20potter.jpg?dl=0",
    subtitle: "The Sorcerer's stone"
  },
  {
    title: "Mistborn",
    author: "Brandon Sanderson",
    bSeries: "1",
    published: "2006",
    pagecount: "541",
    review: "very Exiting",
    link:
      "https://www.goodreads.com/book/show/68428.Mistborn?ac=1&from_search=true&qid=c7cBDAHsvy&rank=2",
    website: "https://www.brandonsanderson.com/",
    libraryThing: "https://www.librarything.com/work/1287660",
    image: "https://dl.dropbox.com/s/mpm0smoqpjwd69u/Mistborn-cover.jpg?dl=0",
    subtitle: "The Final Empire"
  },
  {
    title: "Fablehaven",
    author: "Brandon Mull",
    bSeries: "1",
    published: "2006",
    pagecount: "359",
    review: "very Exiting",
    link:
      "https://www.goodreads.com/book/show/44652.Fablehaven?from_search=true&from_srp=true&qid=dimdkV8klW&rank=1",
    website: "https://brandonmull.com/",
    libraryThing: "https://www.librarything.com/work/787276",
    image: "https://dl.dropbox.com/s/n3i2ws4udaomryj/fablehaven1.jpg?dl=0",
    subtitle: "(Fablehaven Book-1)"
  },
  {
    title: "Inkheart",
    author: "Cornelia Funke",
    bSeries: "1",
    published: "2003",
    pagecount: "534",
    review: "very Exiting",
    link:
      "https://www.goodreads.com/book/show/28194.Inkheart?ac=1&from_search=true&qid=AJmKX49xjB&rank=1",
    website: "https://corneliafunke.com/en",
    libraryThing: "https://www.librarything.com/work/1653",
    image: "https://dl.dropbox.com/s/9vk4pjs3c9nv9u3/inheart.jpg?dl=0",
    subtitle: "(Inkheart Book-1)"
  },
  {
    title: "Prydain Chronicles",
    author: "Loyd Alexander",
    bSeries: "1",
    published: "1964",
    pagecount: "217",
    review: "very Exiting",
    link:
      "https://www.goodreads.com/book/show/24780.The_Book_of_Three?ac=1&from_search=true&qid=PwBG3g1B6y&rank=1",
    website: "https://en.wikipedia.org/wiki/Lloyd_Alexander",
    libraryThing: "https://www.librarything.com/work/5943",
    image: "https://dl.dropbox.com/s/9yo1keb806bdeqm/theBookOfThree.jpg?dl=0",
    subtitle: "The Book Of Three"
  }
];

app.get("/", (req, res) => {
  res.send("Hello World, from Express!");
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  res.json(books[req.params.id]);
  //res.send(req.params.id);
});

app.post("/books", (req, res) => {
  console.log("post request");
  console.log(req.body); // your JSON
  //res.send(req.body);
  res.json(req.body);
  books.push(req.body);
});

app.get("/user", (req, res) => {
  res.send("Michael");
});

app.get("/test", (req, res) => {
  res.send("It worked!");
});

app.delete("/books/:id", (req, res) => {
  books.splice(req.params.id, 1);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function setupDbTables() {
  // Define schema

  // Compile model from schema

  var bookEntity = new Book({
    title: "Mistborn",
    author: "Brandon Sanderson"
  });

  bookEntity.save(function (error, document) {
    if (error) console.error(error);
    console.log(document);
  });
}
