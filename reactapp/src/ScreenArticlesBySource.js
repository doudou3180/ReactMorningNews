import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import { useParams } from 'react-router-dom';
import './App.css';
import { Card, Icon, Modal} from 'antd';
import Nav from './Nav'

const { Meta } = Card;






 // COMPOSANT DE PRESENTATION -----------------------------------------------------------------------
function ScreenArticlesBySource(props) {

  const [articleList, setArticleList] = useState([])

  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  var { id } = useParams();

  useEffect(() => {
    const findArticles = async() => {
      const data = await fetch(`https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=ba7496d7706d4948878e0172e9b9b485`)
      const body = await data.json()
      console.log(body)
      setArticleList(body.articles) 
    }

    findArticles()    
  },[])

  var showModal = (title, content) => {
    setVisible(true)
    setTitle(title)
    setContent(content)

  }

  var handleOk = e => {
    console.log(e)
    setVisible(false)
  }

  var handleCancel = e => {
    console.log(e)
    setVisible(false)
  }

  var updateWishList = async (article) => {
    props.addToWishList(article)
    
    const addArticle = await fetch("/addtowishlist", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${props.token}&title=${article.title}&description=${article.description}&content=${article.content}&url=${article.urlToImage}`,
    });
  };

  return (
    <div>
         
            <Nav/>

            <div className="Banner"/>

            <div className="Card">
              {articleList.map((article,i) => (
                <div key={i} style={{display:'flex',justifyContent:'center'}}>

                <Card
                  
                  style={{ 
                  width: 300, 
                  margin:'15px', 
                  display:'flex',
                  flexDirection: 'column',
                  justifyContent:'space-between' }}
                  cover={
                  <img
                      alt="example"
                      src={article.urlToImage}
                  />
                  }
                  actions={[
                      <Icon type="read" key="ellipsis2" onClick={() => showModal(article.title,article.content)} />,
                      <Icon type="like" key="ellipsis" onClick={()=> updateWishList(article)} />
                  ]}
                  >

                  <Meta
                    title={article.title}
                    description={article.description}
                  />

                </Card>
                <Modal
                  title={title}
                  visible={visible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <p>{content}</p>
                </Modal>

              </div>

              ))}
              


            

           </div> 

         
      
      </div>
  );
}



// COMPOSANT CONTENEUR --------------------------------------------------/

function mapDispatchToProps(dispatch) {
 
  return {
    addToWishList: function(title, description, content, urlToImage) {
        dispatch( {type: 'addArticle',articleLiked : {title, description, content, urlToImage} })
    }
  }
 }

 function mapStateToProps(state) {
  return { token: state.token, selectedLang: state.selectedLang };
}
 
 export default connect(mapStateToProps,mapDispatchToProps)(ScreenArticlesBySource);


