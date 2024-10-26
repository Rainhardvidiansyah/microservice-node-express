
const articleService = require('../service/articleservice');

class ArticleController{

    constructor(){}

    async getArticleById(req, res){
        try{
            const id = req.params.id;
            const article = await articleService.getArticlesById(id);
            if(article){
                res.status(200).json(article);
            } else{
                res.status(404).send('Article not found');
            }
        }catch(error){
            console.error(error);
            res.status(500).json({message: 'Server Error'});
        }
    }


    async getAllArtice(req, res){
        try{
            const articles = await articleService.getAllArticle();
            res.status(200).json(articles);
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Server Error'});
        }
    }



    async createArticle(req, res){
        try {
            const {title, content, tag} = req.body;
            if(!title || !content || !tag) {
                return res.status(400).json({message: 'Please provide all required fields'});
            }
            const article = await articleService.createArticel(title, content, tag);
            return res.status(201).json({message: 'article created successfully'});
        } catch (error) {
            res.statu(500).json({message: 'Error creating article'});
        }
    }

    async editArticle(req, res){

        try{
        const id = req.params.id;
        const {title, content, tag} = req.body;
        if(!id || !title ||!content ||!tag) {
            return res.status(400).json({message: 'Please provide all required fields'});
        }
        const editedArticle = await articleservice.editArticle(id, title, content, tag);
        return editedArticle;
    }catch{
        res.status(500).json({message: 'Error editing article'});
    }
    }
}

module.exports = new ArticleController();