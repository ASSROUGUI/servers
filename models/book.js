const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: false },
  publication_date: { type: Number, required: false },
   Created_date: {
    type: Date,
    default: Date.now
  },
}, { timestamps: true })

const Book = mongoose.model('Book', bookSchema);

module.exports = Book