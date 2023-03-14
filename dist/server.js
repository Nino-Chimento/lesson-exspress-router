import express from 'express';
import "express-async-errors";
import morgan from 'morgan';
const app = express();
const port = 3000;
app.use(morgan('dev'));
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
