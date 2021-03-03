import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import emailjs from 'emailjs-com';
import AOS from 'aos';
import '../css/style.css';

class Contact extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      name: "",
      email: "",
      btn: "send mail!",
      query: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });

  }
  handleSubmit(event) {
    alert(this.state);
    event.preventDefault();
    var params = {
      "reply_to": "Samartha",
      "from_name": this.state.name,
      "to_name": "Samartha",
      "from_email": this.state.email,
      "message_html": this.state.query
    }

    var service_id = "gmail";
    var template_id = "template_Mr3zPgLv";
    this.setState({btn: "sending....."});
    emailjs.send(service_id, template_id, params, 'user_9eCN0jEqX8MFrL7Pa1SiY')
    .then(function(){
      alert("Sent!");
    }, function(err) {
      alert("Couldn't send email!\r\n Response:\n " + JSON.stringify(err));
    });
    this.setState({btn: "send mail!!",name:'',email:'',query:''});
  }
  componentDidMount(){
  }
  render(){
    AOS.init({
      duration: 1000,
      once: true
    });

    return (
      <div>
        <h3>Contact</h3>
        <Row><Col><form className="form-control2" onSubmit={this.handleSubmit}>
          <Row><Col><input type="text"  placeholder="Name" name="name" onChange={this.handleChange} required></input></Col></Row>
          <Row><Col><input type="text" placeholder="Email ID" name="email" onChange={this.handleChange} required></input></Col></Row>
          <Row><Col><textarea type="text" placeholder="Query" name="query"  onChange={this.handleChange} rows="6" required></textarea></Col></Row>
          <Row><Col className="text-center"><button type="submit"className="btn btn-1" >{this.state.btn}</button></Col></Row>
        </form></Col></Row>
      </div>
    );
  }
}
export default Contact;
