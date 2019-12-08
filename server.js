const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const Schema = mongoose.Schema;

const url = 'mongodb+srv://kirillz732:admin@cluster0-km53s.mongodb.net/news?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true })
  .then(() => console.log('Db connected'))
  .catch(err => console.log('error'));

const allNews = new Schema({
  id: String,
  author: String,
  source: String,
  title: String,
  content: String,
  publishedAt: String
});

const News = mongoose.model('News', allNews);

const app = express();

//let news = require('./news.json');

const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/news', (req, res, next) => {
  if (req.url === '/news') {
    News.find().then(news => res.send(news));
  } else {
    next(new Error('not valid url'));
  }
});

app.get('/news/:id', (req, res) => {
  // let getNews = news.find(newss => {
  //   return newss.id === req.params.id;
  // });
  //res.send(getNews);
  News.find({'id': req.params.id}).then(news => res.send(news));
})
;

app.put('/news/:id', (req, res) => {
  // let putNews = news.find(putNewsId => {
  //   return putNewsId.id === req.params.id;
  // });
  // putNews.author = req.body.author;
  // putNews.title = req.body.title;
  News.update({'id' : req.params.id}, {$set: {'author' : req.body.author, 'title': req.body.title}})
  res.sendStatus(200);
  console.log('done put');
});

app.post('/news/add', (req, res, next) => {
  if (req.url === '/news/add') {
    // let addNews = {
    //   id: req.body.id,
    //   author: req.body.author,
    //   source: req.body.source,
    //   title: req.body.title,
    //   content: req.body.content,
    //   publishedAt: req.body.publishedAt
    // };
    // news.push(addNews);
    News.create( {
      id: req.body.id,
      author: req.body.author,
      source: req.body.source,
      title:  req.body.title,
      content: req.body.content,
      publishedAt: req.body.publishedA
    })
    res.sendStatus(200);
    console.log('done post');
  } else {
    next(new Error('not valid url'));
  }
});

app.delete('/news/:id', (req, res) => {
  // news = news.filter(deleteNews => {
  //   return deleteNews.id !== req.params.id;
  // });
  News.remove({'id': req.params.id})
  res.sendStatus(200);
  console.log('done delete');
});

app.get('/', (req, res) => {
  res.send('hello guest');
});

app.listen(port, () => {
  console.log(`Server successfully started on ${port} port `);
});
