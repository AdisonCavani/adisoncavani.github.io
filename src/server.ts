import express from 'express';
import path from 'path';

const articleRouter = require('./routes/articles');
const indexRouter = require('./routes/index');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/articles', articleRouter);

app.use('/', indexRouter);

app.listen(5000);