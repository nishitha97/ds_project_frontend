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
            nic:'',
            fields:{},
            errors:{}

        };

    }

    //sets and updates the state value when user enters text in the input box based on the name given to the input box
    //called when an onChange event is registered
    handleChange=(e)=>{
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields,
            [e.target.name]: e.target.value
        });
    }

    //called when submit button is pressed
    handleSubmit=(event)=> {
        event.preventDefault();
        const {username,password,email,creditCardNo,contactNo,nic}=this.state

        if(this.validateForm()) {//check if user inputs are validated

            //api call to create a new user from given user inputs
            Axios.post('http://localhost:8081/api/v1/users', {username, password, email, creditCardNo, contactNo, nic})
                .then(response => {
                    console.log(response);
                    this.setState({//update isAuthenticated,username and userId states with response from newly user booking object
                        isAuthenticated: true,
                        username: response.data.username,
                        userId: response.data.id


                    })
                    alert("SignUp Successful ! ")
                    const imageurl = document.getElementById('link');//renders next component(Book Train) by clicking on the Link
                                                                     // since Sign up process is now completed
                    imageurl.click();

                })

        }
    }

    //form validation handled here
    validateForm(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "*Please enter your username.";
        }
        if (typeof fields["username"] !== "undefined") {
            if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["username"] = "*Please enter alphabet characters only.";
            }
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }

        if (typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                errors["password"] = "*Please password larger than 8 characters including lowercase,uppercase,special characters and numbers.";
            }
        }

        if (!fields["contactNo"]) {
            formIsValid = false;
            errors["contactNo"] = "*Please enter your mobile no.";
        }

        if (typeof fields["contactNo"] !== "undefined") {
            if (!fields["contactNo"].match(/^[0-9]{10}$/)) {
                formIsValid = false;
                errors["contactNo"] = "*Please enter valid mobile no.";
            }
        }

        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "*Please enter your email-ID.";
        }

        if (typeof fields["email"] !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["email"])) {
                formIsValid = false;
                errors["email"] = "*Please enter a valid email";
            }
        }

        if (!fields["creditCardNo"]) {
            formIsValid = false;
            errors["creditCardNo"]="*Please enter a card number"
        }
        if (typeof fields["creditCardNo"] !== "undefined") {
            if (!fields["creditCardNo"].match(/^[0-9]{16}$/)) {
                formIsValid = false;
                errors["creditCardNo"]="*Please enter a valid credit card number"
            }
        }

        if(this.state.fields.nic !== '') {
            if (typeof fields["nic"] !== "undefined") {
                if (!fields["nic"].match(/[0-9]{9}[x|X|v|V]/g)) {
                    formIsValid = false;
                    errors["nic"]="*Please enter a valid NIC number"
                }
            }

        }

        this.setState({
            errors: errors
        });
        return formIsValid;
    }




    render() {
        const {username,password,email,creditCardNo,contactNo,isAuthenticated,userId,nic} = this.state;
        return (
            <div>
                <h1>Sign Up</h1><hr className={'hr'}/>

            <form name="Signup" onSubmit={this.handleSubmit} style={{marginLeft:"5%"}}>
                <table className={'table table-hover'} style={{width:800}}>
                    <tbody>
                <tr>
                    <td> Name:</td>
                    <td> <input type="text" name="username" value={username} onChange={this.handleChange} /></td>
                    <td style={{color:"red"}}>{this.state.errors.username}</td>
                </tr>
               <tr>
                   <td>Password:</td>
                   <td><input type="password" name="password" value={password} onChange={this.handleChange} /></td>
                   <td style={{color:"red"}}>{this.state.errors.password}</td>
                </tr>
                  <tr>
                      <td> Email:</td>
                      <td> <input type="text" name="email" value={email} onChange={this.handleChange} /></td>
                      <td style={{color:"red"}}>{this.state.errors.email}</td>
                </tr>
                <tr>
                    <td>CreditCardNo:</td>
                    <td> <input type="text" name="creditCardNo" value={creditCardNo} onChange={this.handleChange} /></td>
                    <td style={{color:"red"}}>{this.state.errors.creditCardNo}</td>
                </tr>
                <tr>
                    <td> ContactNo:</td>
                    <td> <input type="text" name="contactNo" value={contactNo} onChange={this.handleChange} /></td>
                    <td style={{color:"red"}}>{this.state.errors.contactNo}</td>
                </tr>
                <tr>
                    <td> Enter NIC number :<br/>(compulsory field for government service workers)</td>
                    <td> <input type="text" name="nic" value={nic} onChange={this.handleChange} /></td>
                    <td style={{color:"red"}}>{this.state.errors.nic}</td>
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