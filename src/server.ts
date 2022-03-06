import express from 'express';
const articleRouter = require('./routes/index');
const app = express();

app.set('view engine', 'ejs');

app.use(articleRouter);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(5000);