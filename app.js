const express = require('express');
const mongoose = require('mongoose');
const Book = require('./model/book');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.listen(process.env.PORT || 5000, () => {
    console.log("Listening..")
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

url = "mongodb+srv://anand:sherlok08@samplecluster.rga9v.mongodb.net/bookstore?retryWrites=true&w=majority"
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connnected to database..")
}).catch((err) => {
    console.log(err);
})

app.post('/api/addBook', (req, res) => {
    const book = new Book({
        name: req.body.name,
        author: req.body.author,
        publishedYear: req.body.publishedYear,
        genre: req.body.genre,
        language: req.body.language,
        pages: req.body.pages,
        uId: uuidv4()
    })

    book.save().then(() => {
        res.status(201).json({
            message: "Book Added",
            book
        })
    })
})

app.get('/api/books', (req, res) => {
    Book.find()
        .then(data => {
            if (data) {
                res.status(200).json({
                    books: data
                })
            }
        });
})

app.put('/api/books/:uId', (req, res) => {
    const book = {
        name: req.body.name,
        author: req.body.author,
        publishedYear: req.body.publishedYear,
        genre: req.body.genre,
        language: req.body.language,
        pages: req.body.pages,
        uId: req.params.uId
    }

    Book.updateOne({ uId: req.params.uId }, book)
        .then(data => {
            if (data.n > 0) {
                res.status(200).json({ message: "Update successfull" });
            } else {
                res.status(401).json({ message: "Not Authorized" });
            }
        });
})

app.delete('/api/books/:uId', () => {
    Book.deleteOne({ uId: req.params.uId }).then(() => {
        res.status(200).json({
            message: "Post Deleted"
        })
    })

})