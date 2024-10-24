const productService = require('../service/productservice')


class ProductController{

    constructor(){}

    async getProductById(req, res){
        try {
            const id = req.params.id;
            const product = await productService.getProductById(id);
            if(product){
                res.status(200).json(product);
            }else{
                res.status(404).send('Product not found');
            }
        } catch (error) {
            res.status(400).send('Error in getting product by ID');
        }
    }


    async saveproduct(req, res){

        try {
        console.log(`Save Product Get Hit in Product Controller`);
        const {productName, productDescription, price} = req.body;
        if(!productName ||!productDescription ||!price){
            return res.status(400).send('All fields are required');
        }
        const product = await productservice.createProduct(productName, productDescription, price);
        
        console.log(product);
        return res.status(201).send({message: 'product saved'});

        } catch (error) {
            console.log(error);
            return res.status(500).send({message: 'There\'\s an error in the product'});
        }
    }

    async getAllProduct(req, res){

        try {
            const products = await productService.getAllProducts();
            const productName = products[0].productName;
            console.log(`Get product {productName} from get all products method in product controller`);
            console.log(`Get All Product Get Hit in Product Controller`);
            res.send(products);
        } catch (error) {
            res.status(404).send({message: 'error in accessing all product'});
        }
    }


}

module.exports = new ProductController();