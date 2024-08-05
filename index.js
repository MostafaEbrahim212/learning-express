const express = require('express');
const app = express();
app.use(express.json());
const productsRouter = require('./routes/products.route');

app.use('/api/products', productsRouter);




app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

module.exports = app;