const Article = require('../model/article');
const userService = require('./userservice');

class ArticleService{


   async getArticlesById(id){
      try{
         const article = await Article.findById(id).populate('author'); //=> populate juga retrieved data user yang ada di articles
         console.log(`Get Article By Id Get Hit in Article Service`);
         return article;
      }catch(error){
         console.error(error);
      }
   }


   async getAllArticle(){
    try{
       const articles = await Article.find().populate('author'); //=> populate juga retrieved data user yang ada di articles
       console.log('Get All Articles Get Hit in Article Service');
       return articles;
    }catch(error){
       console.error(error);
    }
   }

   //title, author, content, tag

   async createArticel(title, content, tag){
      try {
         const author = await userService.getUser();
         const article = new Article({title: title, author: author, content: content, tag: tag});
         const savedArticle = await article.save();
         return savedArticle;

      } catch (error) {
         console.error(error);
      }
   }

   async editArticle(id, title, content, tag){
      try {
         const articleId = await Article.findById(id);
         if(!articleId) {
            console.log('Article not found');
            return;
         }else {
            articleId.title = title;
            articleId.content = content;
            articleId.tag = tag;
            const updatedArticle = await articleId.save();
            return updatedArticle;
         }
      } catch (error) {
         console.log(error);
      }

   }

}


module.exports = new ArticleService();