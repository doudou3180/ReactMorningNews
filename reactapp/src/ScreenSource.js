import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import './App.css';
import { List, Avatar,} from 'antd';
import Nav from './Nav'
import {connect} from 'react-redux';

function ScreenSource(props) {

  const [sourceList, setSourceList] = useState([])
  const [selectedLang, setSelectedLang] = useState(props.selectedLang);

  useEffect( () => {
    const findLang = async() => {

      var reqFind = await fetch(`/user-lang?token=${props.token}`);
      var resultFind = await reqFind.json();
      setSelectedLang(resultFind.lang);   
    }
    findLang();
  }, []);


  useEffect( () => {
    const APIResultsLoading = async() => {

      var langue = "fr";
      var country = "fr";

      if(selectedLang == "en"){
        var langue = "en";
        var country = "us";
      }
      
      props.changeLang(selectedLang)
      var data = await fetch(`https://newsapi.org/v2/sources?language=${langue}&country=${country}&apiKey=ba7496d7706d4948878e0172e9b9b485`);
      var body = await data.json();
      setSourceList(body.sources);   
    }
    APIResultsLoading();
  }, [selectedLang]);


  var updateLang = async (lang) => {
    setSelectedLang(lang)

    //const reqLang = await fetch('/user-lang', {
    //  method: "POST",
    //  headers: {"Content-Type": "application/x-www-form-urlencoded"},
    //  body: `lang=${lang}&token=${props.token}`
    //})

  }

  var styleBorderFr = {borderRadius: " 25px", width: "40px", margin:"20px", cursor: 'pointer'};
  if(selectedLang === "fr") {
    styleBorderFr.border = '1px solid black'
  }

  var styleBorderEn = {borderRadius: " 25px", width: "40px", margin:"20px", cursor: 'pointer'};
  if(selectedLang === "en") {
    styleBorderEn.border = '1px solid black'
  }

  return (
    <div>
        <Nav/>
       
       <div className="Banner" style={{textAlign: 'center'}} >
        <img  shape ="round"style={styleBorderFr} src="/images/fr.png" onClick={() => updateLang('fr') } />
        <img style={styleBorderEn} src="/images/en.jpg" onClick={() => updateLang('en')} />
       </div>
       <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={source => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`/images/${source.category}.png`} />}
                        title={<Link to={`/screenarticlesbysource/${source.id}`}>{source.name}</Link>}
                        description={source.description}
                      />
                    </List.Item>
                  )}
                />


          </div>
                 
      </div>
  );
}

function mapStateToProps(state){
  return{token: state.token, selectedLang: state.selectedLang}
}

function mapDispatchToProps(dispatch){
  return {
    changeLang: function(selectedLang){
      dispatch({type: 'changeLang', selectedLang: selectedLang})
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (ScreenSource);