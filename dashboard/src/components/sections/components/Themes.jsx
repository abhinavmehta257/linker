import React, {useEffect} from 'react'
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {updateAppearence} from '../../../redux';
function Themes() {
  
  const [themes, setThemes] = React.useState([]);

  async function getThemes  (){
    const {data} = await axios.get('http://localhost:3001/themes');
    console.log(data);
    setThemes(data);
  }  

  const dispatch = useDispatch();

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
          const bodyStyle = {
            background: theme.appearance.bodyStyle.backgroundColor,
            color: theme.appearance.bodyStyle.color,
          };
          const cardStyle = {
            background: theme.appearance.cardStyle.backgroundColor,
            color: theme.appearance.cardStyle.color,
            borderColor: theme.appearance.cardStyle.borderColor,
            borderRadius: theme.appearance.cardStyle.borderRadius,
            borderWidth: theme.appearance.cardStyle.borderWidth,
            boxShadow: theme.appearance.cardStyle.shadow,
          };
          console.log(cardStyle);
          return (<div key={theme._id} onClick={()=>{dispatch(updateAppearence(theme.appearance))}} className='cursor-pointer'>
            <div style={bodyStyle} className='bg-gray-500 h-[300px] rounded-lg shadow-lg p-2 flex flex-col align-middle'>
              <div className='m-auto mt-3 mb-1'>
                <div className='h-[50px] w-[50px] bg-slate-50 rounded-full mb-5'></div>
              </div>
              <div className='grid grid-rows-3 gap-2'>
                <div style={cardStyle} className='h-[20px] bg-slate-50 rounded-full'>
                </div>
                <div style={cardStyle} className='h-[20px] bg-slate-50 rounded-full'>
                </div>
                <div style={cardStyle} className='h-[20px] bg-slate-50 rounded-full'>
                </div>
              </div>
            </div>
          </div>)
        })}            
      </div>
    </div>
  )
}

export default Themes