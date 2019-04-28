import React, {Component} from 'react';
import Axios from "../util/Axios";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import BookTrain from "./BookTrain";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isAuthenticated: false,
            userId:''
        }

    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (event) => {
        // alert('A name was submitted: ' + this.state.username);
        event.preventDefault();
        const {username, password} = this.state

        Axios.post('http://localhost:8081/api/v1/session/authenticate', {username, password})
            .then(response => {
                console.log(response);
                console.log(response.data.id)
                if(response.status==200){
                    console.log(response.status);
                    this.setState({
                        isAuthenticated:true,
                        username:response.data.username,
                        userId:response.data.id
                })
                    alert("login successful")
                    const imageurl = document.getElementById('link');
                    imageurl.click();

                }
            }).catch((err) => {
                alert("Login unsuccessful !\nPlease revalidate credentials and try again\n" + err);
        });

    }


    render() {
        const {username,password,isAuthenticated,userId} = this.state;
        return (
            <div>
                <h1>Login Here</h1><hr className={'hr'}/>

                <form onSubmit={this.handleSubmit} style={{marginLeft:"30%"}}>
                    <table className={'table table-hover'} style={{width:400}}>
                    <tbody>
                    <tr>
                        <td>Username</td>
                        <td><input type="text" id="username" name="username" value={username} onChange={this.handleChange}/></td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input type="password" id="password" name="password" value={password} onChange={this.handleChange}/></td>
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
