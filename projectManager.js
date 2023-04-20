const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.nextId = 1;
    this.products = [];
    this.loadProducts();
    if (this.products.length > 0) {
      const lastProduct = this.products[this.products.length - 1];
      this.nextId = lastProduct.id + 1;
    }
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path);
      this.products = JSON.parse(data.toString());
    } catch (err) {
      console.log("Error while loading products from file:", err);
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products));
    } catch (err) {
      console.log("Error while saving products to file:", err);
    }
  }

  addProduct(product) {
    product.id = this.nextId++;
    this.products.push(product);
    this.saveProducts();
    return product;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }

  updateProduct(id, updates) {
    const product = this.getProductById(id);
    Object.assign(product, updates);
    this.saveProducts();
    return product;
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Product with id ${id} not found`);
    }
    const product = this.products.splice(index, 1)[0];
    this.saveProducts();
    return product;
  }
}


const pm = new ProductManager("products.json");

console.log(pm.getProducts()); // []

const newProduct = pm.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
});
console.log(newProduct); 

console.log(pm.getProducts()); 

const productById = pm.getProductById(1);
console.log(productById);
const updatedProduct = pm.updateProduct(1, { title: "nuevo título" });
console.log(updatedProduct); 

const deletedProduct = pm.deleteProduct(1);
console.log(deletedProduct); 
