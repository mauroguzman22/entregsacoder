const express = require('express');
const fs = require('fs');
const ProductManager = require('ruta-a-tu-product-manager');

const app = express();
const productManager = new ProductManager('./productos.json');

app.get('/products', async (req, res) => {
  const limit = req.query.limit;
  try {
    const productos = await productManager.getAllProducts(limit);
    res.send(productos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/products/:pid', async (req, res) => {
  const pid = parseInt(req.params.pid);
  try {
    const producto = await productManager.getProductById(pid);
    if (producto) {
      res.send(producto);
    } else {
      res.status(404).send(`No se encontró el producto con id ${pid}`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(3000, () => {
  console.log('Servidor Express iniciado en el puerto 3000');
});
