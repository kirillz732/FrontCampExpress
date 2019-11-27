const express = require('express');

const bodyParser = require('body-parser');

const app = express();

let news = require('./news.json');

const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/news', (req, res, next) => {
  if (req.url === '/news') {
    res.send(news);
  } else {
    next(new Error('not valid url'));
  }
});

app.get('/news/:id', (req, res) => {
  let getNews = news.find(newss => {
    return newss.id === req.params.id;
  });
  res.send(getNews);
})
;

app.put('/news/:id', (req, res) => {
  let putNews = news.find(putNewsId => {
    return putNewsId.id === req.params.id;
  });
  putNews.author = req.body.author;
  putNews.title = req.body.title;
  res.sendStatus(200);
  console.log('done put');
});

app.post('/news/add', (req, res, next) => {
  if (req.url === '/news/add') {
    let addNews = {
      id: req.body.id,
      author: req.body.author,
      source: req.body.source,
      title: req.body.title,
      content: req.body.content,
      publishedAt: req.body.publishedAt
    };
    news.push(addNews);
    res.sendStatus(200);
    console.log('done post');
  } else {
    next(new Error('not valid url'));
  }
});

app.delete('/news/:id', (req, res) => {
  news = news.filter(deleteNews => {
    return deleteNews.id !== req.params.id;
  });
  res.sendStatus(200);
  console.log('done delete');
});

app.get('/', (req, res) => {
  res.send('hello guest');
});

app.listen(port, () => {
  console.log(`Server successfully started on ${port} port `);
});