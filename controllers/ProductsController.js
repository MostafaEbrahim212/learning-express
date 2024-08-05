const express = require('express');
const app = express();
const { validationResult } = require('express-validator');
app.use(express.json());
const fs = require('fs');

const exists = fs.existsSync('./products.json');
const products = exists ? JSON.parse(fs.readFileSync('./products.json')) : [];


const getProducts = (req, res) => {
    try {
        if (products.length === 0) {
            res.status(404).json({ message: 'No products found' });
        }
        res.json(products);
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
const getProduct = (req, res) => {
    try {
        const id = +req.params.id;
        const product = products.find(product => product.id === id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.json({
                product: product
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}


const addProduct = (req, res) => {
    try {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { name, price } = req.body;
        const data = { id: products.length + 1, name, price };
        products.push(data);
        fs.writeFileSync('./products.json', JSON.stringify(products, null, 4));
        res.status(201).json({
            message: 'Product created',
            product: data
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateProduct = (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const id = +req.params.id;
        const product = products.find(product => product.id === id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            const { name, price } = req.body;
            product.name = name;
            product.price = price;
            fs.writeFileSync('./products.json', JSON.stringify(products, null, 4));
            res.json(product);
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteProduct = (req, res) => {
    try {
        const id = +req.params.id;
        const product = products.find(product => product.id === id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            const index = products.indexOf(product);
            products.splice(index, 1);
            fs.writeFileSync('./products.json', JSON.stringify(products, null, 4));
            res.json({ message: 'Product deleted' });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}