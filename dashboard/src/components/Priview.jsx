import React from 'react'
import WebPage from './webpage/WebPage';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';

function Priview() {
  const isDataLoading = useSelector(state => state.data.loading);

  useEffect(() => {
    
  },[isDataLoading])

  return (
    <div className='col-span-5 p-5'>
            <h1 className='text-3xl mb-2'>Preview</h1>
            <div className=''>
              <div class="smartphone">
                <div class="content">
                  {
                    !isDataLoading ? <WebPage /> : <div className='text-center'>Loading...</div>
                  }
                </div>
              </div>
            </div>
          </div>
  )
}

export default Priview