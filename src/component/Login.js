import React, {Component} from 'react';
import Axios from "../util/Axios";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import BookTrain from "./BookTrain";


/**
 * component which renders an interface for a user to login by providing user credentials
 *
 * @author IT17006880
 */
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isAuthenticated: false,
            userId:'',
            fields:{},
            errors:{}

        }

    }

    //sets and updates the state value when user enters text in the input box based on the name given to the input box
    //called when an onChange event is registered
    handleChange = (e) => {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;

        this.setState({
            fields,
            [e.target.name]: e.target.value
        });

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

        this.setState({
            errors: errors
        });
        return formIsValid;
    }


    //called when submit button is pressed
    handleSubmit = (event) => {
        event.preventDefault();
        const {username, password} = this.state;

        if(this.validateForm()) {//check if user inputs are validated

            Axios.post('http://localhost:8081/api/v1/session/authenticate', {username, password})//posts user credentials entered
                                                                                                 // to validate login
                .then(response => {
                    console.log(response);
                    console.log(response.data.id)
                    if (response.status == 200) {//check if authenticated based on response code
                        console.log(response.status);
                        this.setState({
                            isAuthenticated: true,
                            username: response.data.username,
                            userId: response.data.id
                        })
                        alert("Login Successful ! ")
                        const imageurl = document.getElementById('link');//renders next component(Book Train) by clicking on the Link
                        // since Login process is now completed
                        imageurl.click();

                    }
                }).catch((err) => {
                alert("Login unsuccessful !\nPlease revalidate credentials and try again\n" + err);//when user is not authenticated
                                                                                                   //usually a 401 status code
            });
        }
    }


    render() {
        const {username,password,isAuthenticated,userId} = this.state;
        return (
            <div>
                <h1>Login Here</h1><hr className={'hr'}/>

                <form onSubmit={this.handleSubmit} style={{marginLeft:"15%"}}>
                    <table className={'table table-hover'} style={{width:600}}>
                    <tbody>
                    <tr>
                        <td>Username</td>
                        <td><input type="text" id="username" name="username" value={username} onChange={this.handleChange}/></td>
                        <td style={{color:"red"}}>{this.state.errors.username}</td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input type="password" id="password" name="password" value={password} onChange={this.handleChange}/></td>
                        <td style={{color:"red"}}>{this.state.errors.password}</td>
                    </tr>
                    <tr>
                        <td><input type="submit" value="Login" className="btn btn-primary"/></td>
                    </tr>
                    </tbody>
                </table>
                </form>
                <Router><div><Link id="link" to="/book"></Link></div><Route path='/book' render={(props) => (
                    <BookTrain {...props} data={{username,isAuthenticated,userId}}/>
                )}/></Router>
            </div>

        );
    }
}

export default Login;
