import React, {Component} from 'react';
import Axios from "../util/Axios";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import BookTrain from "./BookTrain";

class HomePage extends Component {
    constructor(props) {
        super(props);


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
                    this.setState={
                        isAuthenticated:true,
                        userId:response.data.id
                    }
                    const imageurl = document.getElementById('link');
                    imageurl.click();

                }
            })

    }


    render() {

        return (
          <div>

          </div>

        );
    }
}

export default HomePage;
