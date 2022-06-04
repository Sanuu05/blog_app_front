import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  getfollowData } from '../action/main'
import { Container, Row} from 'react-bootstrap'
import Createpost from './Createpost'
import Posts from './Posts'
function Home({update}) {
  const dispatch = useDispatch()
  useEffect(() => {
   
    dispatch(getfollowData())
    
  }, [update,dispatch])

  const followposts = useSelector(state => state.getposts.follow)
  
  
  return (
    <div className='mtop'>

      <Container>
        <Createpost res={update}/>
        <Row>
          {
            followposts.map((val,i)=>{
              return  <Posts val={val} res={update} />
            })
          }
        

        </Row>
      </Container>
   
    </div>
  )
}

export default Home