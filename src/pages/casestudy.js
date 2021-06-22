import React, {useState,useEffect} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
export const CaseStudy = () =>{
  const { proj } = useParams();
  const [project,setProject] = useState(0);
  const [projectShowcase,setProjectShowcase] = useState([0]);
  const getProject = () =>{
    Axios.get('https://yunghogportfolio-default-rtdb.firebaseio.com/projects.json').then(res=>{
      const fetchedData = []
      const fetchedImg = []
      for(let key in res.data){
        fetchedData.push({...res.data[key],_id:key})
      }
      const curProj = fetchedData.filter(function(x){return x.code===proj})[0];
      setProject(curProj);
      setProjectShowcase(curProj.showcase);
    })
  }
  useEffect(()=>{
    getProject();
  })
  return(
    <section>
      <Container>
        <Row>
          <Col>
            <h2  className="text-xl">Case Study<span className="text-primary">.</span></h2>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col>
            <div className="proj-hero">
              <div className="proj-image">
                <img src={project.prev} alt={project.title} width="100%"/>
              </div>
              <div className="proj-title">
                <h1 class="text-xl">{project.title}</h1>
                <h4>{project.shortDesc}</h4>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col md={{offset:'2', span:'3'}}>
            <h3>Client</h3>
            <p>{project.client}</p>
            <h3>Work</h3>
            <p>{project.work}</p>
          </Col>
          <Col md={5}>
            <h3>Details</h3>
            <p>{project.description}</p>
          </Col>
        </Row>
      </Container>
      <br/>
      <Container>
        <Row>
          <Col  className="text-center">
            <h2>Project Showcase<span className="text-primary">.</span></h2>
          </Col>
        </Row>
          {projectShowcase.map(i=>
            <Row>
              <Col>
                <img className="showcase-img" src={i} alt={proj.title}/>
              </Col>
            </Row>
          )}
          <Row>
            <Col>
              <a href="/projects" className="btn btn-dark btn-block text-primary">View more projects</a>
            </Col>
          </Row>
      </Container>
    </section>
  )
}
