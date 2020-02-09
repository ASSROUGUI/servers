
const express = require('express')
const router = express.Router()
const Book = require('../models/book')


// router.get('/', (req, res) => {
//     res.json({"message": "Welcome ..."});
//     });
//git msg
    router.get('/', (req, res) => {
        Book.find({}, (err, allBooks) => {
          if (err) { console.log(err) }
          res.json(allBooks);
        });
      });
      //get by id
      router.get('/:id', (req, res)=>{
        Book.findById(req.params.id, (err, foundBook)=>{
          if (err)  { res.send(err) }
          res.json(foundBook);
        });
      });
//
    //   router.post('/', (req, res) => {
    //     Book.create(req.body, (error, createdBook)=>{
    //         res.json(createdBook);
    //     });
    // });
    //
    // router.get('/seed', (req, res)=>{
    //     Book.insertMany([
    //       {
    //         name: 'grapefruit',
    //         price: 'pink',
      
    //       },
    //       {
    //         name: 'grape',
    //         price: 'purple',
      
    //       },
    //       {
    //         name: 'avocado',
    //         price: 'green',
       
    //       }
    //     ], (err, books) => {
    //       res.json(books);
    //     })
    //   });

    // Creating one
router.post('/', async (req, res) => {
    const book = new Book({
      name: req.body.name,
      price: req.body.price,
      image:req.body.image,
      author:req.body.author,
      publication_date:req.body.publication_date

    })
    try {
      const newBook = await book.save()
      res.status(201).json(newBook)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
  //update
    router.put('/:id', (req, res)=>{
     
     try{Book.findByIdAndUpdate(req.params.id, req.body, {new:true}
        , (err, updatedModel)=>{
    res.send(updatedModel);
        });
    } catch (err) {
        res.status(400).json({ message: err.message })
      }
    });
  
//delete by id
    router.delete('/:id', (req, res)=>{
   try { Book.findByIdAndRemove(req.params.id, (err, deletedBook)=>{
          res.json('Deleted '+deletedBook);
        });}
        catch(err){
//       res.status(500).json({ message: err.message })

        }
      });


//delete all :)
      router.delete('/', (req, res) => {
        Book.deleteMany({}, (err, allBooks) => {
          if (err) { console.log(err) }
          res.json(allBooks);
        });
      });


      module.exports = router