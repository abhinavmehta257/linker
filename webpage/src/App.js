import logo from './logo.svg';
import './App.css';
import Profile from './components/Profile';
import React, { useEffect,useState } from 'react'
import Links from './components/Links';
import axios from 'axios'
import UserNotFound from './components/UserNotFound'

function changeappearance(bodyStyle,cardStyle) {
  
  console.log(bodyStyle);
  document.documentElement.style.setProperty('--backgroungColor', bodyStyle.backgroundColor);
  document.documentElement.style.setProperty('--color', bodyStyle.color);
  document.documentElement.style.setProperty('--linkCardTextColor', cardStyle.color);
  document.documentElement.style.setProperty('--linkCardBackgroundColor', cardStyle.backgroundColor);
  document.documentElement.style.setProperty('--linkCardBorderRadius', cardStyle.borderRadius);
  document.documentElement.style.setProperty('--linkCardBorderColor', cardStyle.borderColor);
  document.documentElement.style.setProperty('--linkCardShadow', cardStyle.shadow);
  document.documentElement.style.setProperty('--linkCardBorderWidth', cardStyle.borderWidth);
}


function App() {
  const getData = async () => {
    //get passed url 
    const url = window.location.href;
    //get webpage id from url
    const webpageId = url.split('/')[3];
    console.log(webpageId);
    const {data} = await axios.get(`http://localhost:3001/${webpageId}`);
    console.log(data);
    setwebpageConfig(data);
    changeappearance(data.appearance.bodyStyle,data.appearance.cardStyle);
  }
  const [webpageConfig, setwebpageConfig] = useState(null);
  useEffect(() => {
    getData();
  }, [])

  return (
    webpageConfig ? (
    <div className="App">
      <Profile profile={webpageConfig.profile} ></Profile>
      <Links links={webpageConfig.links}/>
    </div>
    ) : <UserNotFound></UserNotFound>
  );
}

export default App;
