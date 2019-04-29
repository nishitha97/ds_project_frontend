import React, {Component} from 'react';
import Axios from "../util/Axios";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import HomePage from "./HomePage";
import  { Redirect } from 'react-router-dom'
import BookTrain from "./BookTrain";

/**
 * component which renders an interface for a user to create an account by providing relevant details
 *
 * @author IT17006880
 */
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
            nic:''

        };

    }

    //sets and updates the state value when user enters text in the input box based on the name given to the input box
    //called when an onChange event is registered
    handleChange=(e)=>{
        this.setState({ [e.target.name]: e.target.value });
    }

    //called when submit button is pressed
    handleSubmit=(event)=> {
        event.preventDefault();
        const {username,password,email,creditCardNo,contactNo,nic}=this.state

        //api call to create a new user from given user inputs
        Axios.post('http://localhost:8081/api/v1/users',{username,password,email,creditCardNo,contactNo,nic})
            .then(response=>{
                console.log(response);
                this.setState({//update isAuthenticated,username and userId states with response from newly user booking object
                    isAuthenticated:true,
                    username:response.data.username,
                    userId:response.data.id


                })
                alert("SignUp Successful ! ")
                const imageurl = document.getElementById('link');//renders next component(Book Train) by clicking on the Link
                                                                 // since Sign up process is now completed
                imageurl.click();

            })


    }

    render() {
        const {username,password,email,creditCardNo,contactNo,isAuthenticated,userId,nic} = this.state;
        return (
            <div>
                <h1>Sign Up</h1><hr className={'hr'}/>

            <form name="Signup" onSubmit={this.handleSubmit} style={{marginLeft:"15%"}}>
                <table className={'table table-hover'} style={{width:600}}>
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
                <tr>
                    <td> Enter NIC number :<br/>(compulsory field for government service workers)</td>
                    <td> <input type="text" name="nic" value={nic} onChange={this.handleChange} /></td>
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