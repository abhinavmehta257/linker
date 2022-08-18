import React, {useEffect} from 'react'
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {updateAppearence} from '../../../redux';
import ThemeSample from './ThemeSample';
function Themes() {
  const dispatch = useDispatch();
  const [themes, setThemes] = React.useState([]);

  async function getThemes  (){
    const {data} = await axios.get('http://localhost:3001/themes');
    console.log(data);
    setThemes(data);
  }  


  useEffect(() => {
    getThemes();
  } , []);
  return (
    <div>
      <h1 className='text-3xl mb-3'>
          Themes
      </h1>
      <div className='grid grid-cols-3 gap-5'>
        {themes.map(theme => {
          return (<div className='cursor-pointer' onClick={()=>{dispatch(updateAppearence(theme.appearance))}}>
            <ThemeSample theme={theme} />
          </div>);
        })}            
      </div>
    </div>
  )
}

export default Themes