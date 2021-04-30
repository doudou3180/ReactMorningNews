import React from 'react';
import {connect} from 'react-redux';

import './App.css';
import { Card, Icon} from 'antd';
import Nav from './Nav'

const { Meta } = Card;

function ScreenMyArticles(props) {
console.log(props.wishList)


/* MAP SUR WISHLIST ------------------------------------------- */

var mapwishList = <p style={{marginTop:"30px"}}>-------------- No articles --------------</p>

if(props.wishList.length>0){

 mapwishList= props.wishList.map((element, i) => {
  return (
  
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
        src={element.img}
    />
    
    }    
    actions={[
      <Icon type="read" key="ellipsis2" />,
        <Icon type="delete" key="ellipsis" onClick={() => props.deleteToWishList(element.title)} />
    ]}
    >
      
    <Meta
      title={element.title}
      description={element.description}
    />
  </Card>
</div> )
})}


  return (
    <div>         
            <Nav/>
            <div className="Banner"/>
            <div className="Card">

            {mapwishList}

             </div>
      </div>
  );
}

/*COMPOSANT CONTAINER -------------------------------------*/

function mapStateToProps(state) {
  return { wishList: state.articleList }

 }

 function mapDispatchToProps(dispatch) {
  return {
    deleteToWishList: function(title) {
      dispatch({type: 'deleteArticle', articleLiked : title})
    }
  }
}  

export default connect(
  mapStateToProps,mapDispatchToProps)(ScreenMyArticles);



