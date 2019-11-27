const express = require('express');

const bodyParser = require('body-parser');

const app = express();

let news = require('./news.json');

const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/news', (req, res, next) => {
  res.send(news);
});

app.get('/news/:id', (req, res) => {
    let user = users.find(user => {
      return user.id === req.params.id;
    });
    res.send(user);
});

app.put('/news/:id', (req, res) => {
    let putNews = news.find(putNewsId => {
      return putNewsId.id === req.params.id;
    });
    putNews.author = req.body.author;
    putNews.title = req.body.title;
    res.sendStatus(200);
    console.log('done put');
});

app.post('/news/add', (req, res) => {
     let addNews = {
      id: req.body.id,
      author: req.body.author,
      source: req.body.source,
      title: req.body.title,
      content: req.body.content,
      dateOfFirstLogin: firstLoginDate,
      publishedAt: req.body.publishedAt
    };
    news.push(addNews);
    res.sendStatus(200);
    console.log('done post');
});

app.delete('/news/:id', (req, res) => {
  return deleteNews.id !== req.params.id;
  res.sendStatus(200);
  console.log('done delete');

});

app.get('/', (req, res) => {
  res.send('hello guest');
});

app.listen(port, () => {
  console.log(`Server successfully started on ${port} port `);
});