import React, {Component} from 'react';
import Axios from "../util/Axios";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import HomePage from "./HomePage";
import  { Redirect } from 'react-router-dom'
import BookTrain from "./BookTrain";
class CreateNewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email:'',
            creditCardNo:'',
            contactNo:'',
            userId:'',
            isAuthenticated:false,

        };


    }
    handleChange=(e)=>{
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit=(event)=> {
       // alert('A name was submitted: ' + this.state.username);
        event.preventDefault();
        const {username,password,email,creditCardNo,contactNo}=this.state

        Axios.post('http://localhost:8081/api/v1/users',{username,password,email,creditCardNo,contactNo})
            .then(response=>{
                console.log(response);
                this.setState({
                    isAuthenticated:true,
                    username:response.data.username,
                    userId:response.data.id


                })
                alert("Sign up successful")
                const imageurl = document.getElementById('link');
                imageurl.click();

            })


    }



    render() {
        const {username,password,email,creditCardNo,contactNo,isAuthenticated,userId} = this.state;
        return (
            <div>
                <h1>Sign Up</h1><hr className={'hr'}/>

            <form name="Signup" onSubmit={this.handleSubmit} style={{marginLeft:"30%"}}>
                <table className={'table table-hover'} style={{width:400}}>
                    <tbody>
                <tr>
                    <td> Name:</td>
                    <td> <input type="text" name="username" value={username} onChange={this.handleChange} /></td>
                </tr>
               <tr>
                   <td>Password:</td>
                   <td><input type="password" name="password" value={password} onChange={this.handleChange} /></td>
                </tr>
                  <tr>
                      <td> Email:</td>
                      <td> <input type="text" name="email" value={email} onChange={this.handleChange} /></td>
                </tr>
                <tr>
                    <td>CreditCardNo:</td>
                    <td> <input type="text" name="creditCardNo" value={creditCardNo} onChange={this.handleChange} /></td>
                </tr>
                <tr>
                    <td> ContactNo:</td>
                    <td> <input type="text" name="contactNo" value={contactNo} onChange={this.handleChange} /></td>
                </tr>
                <tr><td>
                    <input type="submit" value="Sign Up" className="btn btn-primary"/></td></tr></tbody>
                </table>
            </form>
                <Router><div><Link id="link" to="/book"></Link></div><Route path='/book' render={(props) => (
                    <BookTrain {...props} data={{username,isAuthenticated,userId}}/>
                )}/></Router>
            </div>
        );
    }
}
export default CreateNewUser;