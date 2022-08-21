import React, {useEffect} from 'react'
import SponcerCard from './SponserCard';

function Sponcers({sponsers}) {
    useEffect(() => {
      console.log(sponsers);
    }, [])
    return (
      <div className='sponsers-container mt-4'>
        <h1 className='text-xl font-medium'>Sponsers</h1>
        <div className='card-container'>
          <div className="grid grid-cols-2 gap-2">
            {sponsers.map((sponser,ind) =>(
              sponser.enabled && sponser.title !== '' && sponser.url !== '' && sponser.ImageUrl ? 
              <SponcerCard sponser={sponser} />: null
            ))}
          </div>
          
        </div>
      </div>
    )
}

export default Sponcers