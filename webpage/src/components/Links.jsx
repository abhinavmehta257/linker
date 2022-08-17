import React, { useEffect } from 'react'
import { linkCardSelector } from '../helper/linkCardSelector';

function Links({links}) {
  useEffect(() => {
    console.log(links);
  }, [])
  return (
    links ? (
    <div className='links-container'>
      <div   className='card-container'>
      {links.map((link,ind) =>(
          link.enabled ? 
          linkCardSelector(link, ind): null
        ))}
      </div>
    </div>
    ) : null
  )
}

export default Links