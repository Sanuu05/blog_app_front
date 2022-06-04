import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Col, Container, Row,Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getmytData,followUser,  unfollowUser  } from '../action/main'
import Createpost from './Createpost'
import Posts from './Posts'
import { NavLink} from 'react-router-dom'
import {AiFillEdit} from 'react-icons/ai'
import { Updatedp } from '../action/main'

function Myaccount({update}) {
    const userdarta = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const [heading, setheading] = useState()
    const [modaldata, setmodaldata] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        dispatch(getmytData())

    }, [update,dispatch])
    const myposts = useSelector(state => state.getmyposts.user)

    const updatedp = (e) => {
        if (e.target.files[0]) {
          const data = new FormData()
          data.append("file", e.target.files[0])
          data.append("upload_preset", "insta-clone")
          data.append("cloud_name", "sannu")
          fetch("https://api.cloudinary.com/v1_1/sannu/image/upload", {
            method: "post",
            body: data
          }).then(res =>
            res.json())
            .then(data => {
              dispatch(Updatedp({ pic: data.url }))
            }).catch(err => console.log(err))
    
        } else {
        //   dispatch(postData({ body: postdata }))
        }
    
      }
console.log('user',userdarta)


    return (
        <div className='myaccount mtop'>
            <Container>
                <Row>
                    <Col sm={{ span: 12, offset: 0 }} md={{ span: 8, offset: 2 }}>
                        <div className='top_part'>

                            <div className='top_part_left'>
                                <div>
                               
                                <label htmlFor='profilePic'> <AiFillEdit/></label>
                                <input type='file' id='profilePic' onChange={updatedp}/>
                                <img src={userdarta?.profilePic} className='img-fluid' alt='img' />

                                </div>
                                

                            </div>
                            <div className='top_part_right'>
                                <div className='top_part_right_top'>
                                    <h2>{userdarta?.name}</h2>
                                    <p>{userdarta?.email}</p>
                                </div>
                                <div className='top_part_right_bottom'>
                                    <div>
                                        <h4 className='m-0'>{myposts?.length}</h4>
                                        <p className='m-0'>Posts</p>

                                    </div>
                                    <div onClick={() => {
                                        setmodaldata(userdarta?.followers)
                                        setShow(true)
                                        setheading('Followers')
                                    }}>
                                        <h4 className='m-0'>{userdarta?.followers?.length}</h4>
                                        <p className='m-0'>Followers</p>

                                    </div>
                                    <div onClick={() => {
                                        setmodaldata(userdarta?.following)
                                        setShow(true)
                                        setheading('Following')
                                    }}>
                                        <h4 className='m-0'>{userdarta?.following?.length}</h4>
                                        <p className='m-0'>Following</p>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </Col>
                </Row>
                <Row className='mt-5'>
                    <Createpost res={update}/>
                </Row>
                <Row>
                    {
                        myposts?.map((val, i) => {
                            return <Posts val={val} res={update} />
                        })
                    }
                </Row>

            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{heading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        modaldata?.map((val, index) => {
                            return <div className='modal_list'>
                                <NavLink to={`/user/${val?.email}`} style={{ color: 'black', textDecoration: 'none' }} onClick={() => setShow(false)}>
                                    <div className='modal_list_main'>
                                        <div>
                                            <img src={val?.profilePic} className='img-fluid' alt='img' />
                                        </div>
                                        <div className='modal_list_right'>
                                            <h4 className='m-0'>{val?.name}</h4>
                                            <p className='m-0'>{val?.followers?.length} Followers</p>

                                        </div>


                                    </div>
                                </NavLink>
                               
                                {
                                    val?.followers?.includes(userdarta?._id) ? <button onClick={() => dispatch(unfollowUser({ followId: val?._id }))}>Following</button> : <button onClick={() => dispatch(followUser({ followId: val?._id }))}>Follow</button>
                                }



                            </div>

                        })
                    }
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default Myaccount