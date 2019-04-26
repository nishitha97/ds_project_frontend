import React, {Component} from 'react';
import Axios from "../util/Axios";

class CreateNewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email:'',
            creditCardNo:'',
            contactNo:''

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
            })
    }

    render() {
        const {username,password,email,creditCardNo,contactNo} = this.state;
        return (
            <div>
                <h1 style={{marginLeft:"30%"}}>Sign Up</h1><br/><br/>

            <form onSubmit={this.handleSubmit} style={{marginLeft:"30%"}}>
                <table className={'table table-hover'} style={{width:400}}>
                    <tbody>
                <tr>
                    <td> Name:</td>
                    <td> <input type="text" name="username" value={username} onChange={this.handleChange} /></td>
                </tr>
               <tr>
                   <td>Password:</td>
                   <td><input type="text" name="password" value={password} onChange={this.handleChange} /></td>
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
                    <input type="submit" value="Submit" /></td></tr></tbody>
                </table>
            </form>

            </div>
        );
    }
}
export default CreateNewUser;