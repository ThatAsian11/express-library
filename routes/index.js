var express = require('express');
var router = express.Router();
var axios = require('axios');
var async = require('async');

require('dotenv').config();

const api = process.env.API;
let result = '';
let url = '';

router.get('/', function(req, res, next) {
  res.render('results', {res: false});
})

router.post('/', async(req, res, next) => {
  let title = req.body.searched;
  let author = req.body.author;
  // console.log(title);
  if (author) {
    url = 'https://www.googleapis.com/books/v1/volumes?q=' + title + '+inauthor:' + author + '&key=' + api;
  } else {
    url = 'https://www.googleapis.com/books/v1/volumes?q=' + title + '&key=' + api;
  }

  try {
    const response = await axios.get(url);
    // console.log(response.data['items'])
    result = response.data['items'];
    
  } catch(err) {
    console.log(err);
  }
  // res.redirect('/')
  res.render('results', {res: result});
})

router.get('/book/:id', async(req, res) => {
  code = req.params.id;
  // console.log(code);
  let url = "https://www.googleapis.com/books/v1/volumes/" + code
  let result = ''
  try {
    const response = await axios.get(url);
    // console.log(response.data);
    result = response.data;
  } catch(err) {
    console.log(err);
  }
  res.render('book', {res: result});
})

module.exports = router;