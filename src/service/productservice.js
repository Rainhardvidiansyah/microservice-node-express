const Product = require('../model/products');


class ProductService{

    constructor(){}

    async getProductById(id){
        try{
            const product = await Product.findById(id);
            console.log(`Get Product By Id Get Hit in Product Service`);
            return product;
        }catch(error){
            console.error(error);
        }
    }

    async createProduct(productName, productDescription, price){
        console.log(`create product method is getting hit in Product Service`);

        try{

            const newProduct = new Product({
                productName,
                productDescription,
                price,
            });

            const savedProduct = await newProduct.save();
            console.log(`Create Product Get Hit in Product Service`);
            return savedProduct;

        }catch(error){
            console.error(error);
        }
    }


    async getAllProducts(){
        try{
            const products = await Product.find();
            console.log(`Get All Product Get Hit in Product Service`);
            return products;
        }catch(error){
            console.error(error);
        }
    }
}


module.exports = new ProductService();