/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const { BookModel } = require('../models');

module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res){
      const books = await BookModel.find({});
      const formattedBooks = books.map((book) => ({
        _id: book._id,
        title: book.title,
        commentcount: book.comments.length
      }))

      res.json(formattedBooks);
    })
    
    .post(async function (req, res){
      let title = req.body.title;
      if (!title) return res.json('missing required field title');

      const book = new BookModel({
        title: title,
        comments: []
      })
      
      await book.save();
      res.json({
        _id: book._id,
        title: title 
      })
 
    })
    
    .delete(async function(req, res){
      //if successful response will be 'complete delete successful'
      await BookModel.deleteMany({});
      res.json("complete delete successful")
    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      let bookid = req.params.id;
      const book = await BookModel.findOne({_id: bookid});
      if (!book) return res.json("no book exists");
      return res.json(book);
    })
    
    .post(async function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if (!comment) return res.json("missing required field comment");
 
      try {
        const book = await BookModel.findOne({_id: bookid});
        if (!book) return res.json("no book exists");

        book.comments.push(comment);
        await book.save();
        return res.json({
          ...book.toJSON(),
          commentcount: book.comments.length
        });

      } catch (err) {
        res.json("no book exists")
      }
    })
    
    .delete(async function(req, res){
      let bookid = req.params.id;
      const book = await BookModel.findOne({_id: bookid});
      if (!book) return res.json("no book exists");
      await BookModel.findOneAndDelete({_id: bookid});
      return res.json("delete successful");
    });
  
};
