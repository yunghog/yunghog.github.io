import React, {useState,useEffect} from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import Axios from 'axios'
import Cursor from '../assets/images/cursor.png'
export const Project = () =>{
  const [projs,setProjs] = useState(0);
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
      <Container>
          {projs && projs.map(proj=>
            {
              if(projs.indexOf(proj)%2==1){
                return(
                  <Row key={proj._id}>
                      <Col md={{span:'4', offset:'1'}}>
                          <div className="proj-thumb-2">
                            <img src={proj.prev} alt={proj.shortDesc}/>
                            <div className="proj-cursor-con">
                              <img src={Cursor} height="150px" className="proj-cursor"/>
                            </div>
                          </div>
                      </Col>
                    </Row>
                )
              }
              if(projs.indexOf(proj)%2==0){
                return(
                  <Row key={proj._id}>
                      <Col md={{span:'6', offset:'1'}}>

                      </Col>
                      <Col md={{span:'4'}}>
                          <div className="proj-thumb-2">
                            <img src={proj.prev} alt={proj.shortDesc}/>
                            <div className="proj-cursor-con">
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
