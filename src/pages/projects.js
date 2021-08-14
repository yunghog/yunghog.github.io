import React, {useState,useEffect} from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import Axios from 'axios'
import Cursor from '../assets/images/cursor.png'
import {FaArrowRight} from 'react-icons/fa'
export const Project = () =>{
  const [isScrolling, setIsScrolling] = useState(0)
  const [projs,setProjs] = useState(0)
  const getProjs = () =>{
    Axios.get('https://yunghogportfolio-default-rtdb.firebaseio.com/projects.json').then(res=>{
      let fetchedData = []
      for(let key in res.data){
        fetchedData.push({...res.data[key],_id:key})
      }
      setProjs(fetchedData)
    })
  }

  useEffect(()=>{
    getProjs();
    })

  return(
    <section>
      <Container>
        <Row>
          <Col>
            <h2 className="text-xxl">Selected Works<span className="text-primary">.</span></h2>
          </Col>
        </Row>
      </Container>
      <br/>
      <Container>
          {projs && projs.map(proj=>
            {
              if(projs.indexOf(proj)%2==1){
                return(
                  <Row key={proj._id} className="proj-desc-2">
                      <Col md={{span:'4', offset:'2'}}>
                          <div className="proj-thumb-2">
                            <img src={proj.prev} alt={proj.shortDesc}/>
                            <div className="proj-cursor-con">
                              <img src={Cursor} height="150px" className="proj-cursor"/>
                            </div>
                          </div>
                      </Col>
                      <Col md={{span:'5'}}>
                        <div className="proj-det-2">
                          <h3>{proj.title}</h3>
                          <h5>{proj.shortDesc} for {proj.client}</h5>
                          <h2  className="arrow-anim"><FaArrowRight/></h2>
                        </div>
                      </Col>
                    </Row>
                )
              }
              if(projs.indexOf(proj)%2==0){
                return(
                  <Row key={proj._id} className="proj-desc-2">
                    <Col md={{span:'5',offset:'2'}}>
                      <div className="proj-det-2">
                        <h3>{proj.title}</h3>
                        <h5>{proj.shortDesc} for {proj.client}</h5>
                        <h2 className="arrow-anim"><FaArrowRight/></h2>
                      </div>
                    </Col>
                      <Col md={{span:'4'}}>
                          <div className="proj-thumb-2">
                            <img src={proj.prev} alt={proj.shortDesc}/>
                            <div className="proj-cursor-con cursor-left">
                              <img src={Cursor} height="150px" className="proj-cursor"/>
                            </div>
                          </div>
                      </Col>
                    </Row>
                  )
                  }
            }
          )}
      </Container>
    </section>
  )
}
