import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getpostData } from '../action/main'
import Posts from './Posts'
function Allposts({update}) {
  console.log('cv',update)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getpostData())

    },[update])
    const posts = useSelector(state => state.getposts.user)
  return (
    <div className='mtop'>
         {
            posts?.map((val,i)=>{
              return  <Posts val={val} res={update} />
            })
          }
        
    </div>
  )
}

export default Allposts