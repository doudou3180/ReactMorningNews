export default function (articleList = [], action) {

    if (action.type == 'addArticle') {
        var articleCopy =  [...articleList ];
        var doubleArticle = false;

        for (let i =0; i<articleCopy.length; i++){   
            if (articleCopy[i].title === action.articleLiked.title)
        {  
           doubleArticle = true;
        }}
            
        if (!doubleArticle) {
        articleCopy.push({title : action.articleLiked.title,description: action.articleLiked.description, content: action.articleLiked.content, img: action.articleLiked.urlToImage})
        }
        return articleCopy


    } else if (action.type =='deleteArticle'){

        var articleCopy = [...articleList];
        var position = null;

        for (let i =0; i<articleCopy.length; i++){
            if (articleCopy[i].title === action.articleLiked.title){
                position = i;
        }
    }

        articleCopy.splice(position,1);
        return articleCopy;

    } else {

        return articleList;
    }
}