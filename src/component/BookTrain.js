import React, {Component} from 'react';
import Axios from "../util/Axios";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import CreateNewPayment from "./CreateNewPayment";
class BookTrain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId:'',
            selectedTrain: '',
            numberOfTickets: '',
            to:'',
            from:'',


        };

    }
    handleChange=(e)=>{
        this.setState({ [e.target.name]: e.target.value });

    }

    handleChangeSelectTo=(e)=>{
        this.setState({to: e.target.value});
    }

    handleChangeSelectFrom=(e)=>{
        this.setState({from: e.target.value});
    }

    handleChangeSelectTrain=(e)=>{
        this.setState({selectedTrain: e.target.value});
    }


    componentDidMount(){

    }

    handleSubmit=(event)=> {
        // alert('A name was submitted: ' + this.state.username);
        event.preventDefault();
        const {userId,selectedTrain,numberOfTickets,to,from}=this.state

        Axios.post('http://localhost:8081/api/v1/booking',{userId,selectedTrain,numberOfTickets,to,from})
            .then(response=>{
                console.log(response);
            })


        const url = document.getElementById('payment');
        url.click();
    }


    render() {
        const {userId,selectedTrain,numberOfTickets,to,from} = this.state;


        return (
            <div>
                <h1>Book a train</h1><br/><br/>
                <form onSubmit={this.handleSubmit} style={{marginLeft:"30%"}}>
                    <table className={'table table-hover'} style={{width:400}}>
                        <tbody>
                        <tr>
                            <td> UserId:</td>
                            <td><input type="text" name="userId" value={userId} onChange={this.handleChange} /></td>
                        </tr>
                        <tr>
                            <td>  Select Train:</td>
                            <td><select value={selectedTrain} onChange={this.handleChangeSelectTrain}>
                                <option value="train1">train1</option>
                                <option value="train2">train2</option>
                            </select></td>
                        </tr>
                        <tr>
                            <td> Enter number Of Tickets:</td>
                            <td> <input type="text" name="numberOfTickets" value={numberOfTickets} onChange={this.handleChange} /></td>
                        </tr>
                        <tr>
                            <td>  To:</td>
                            <td><select value={to} onChange={this.handleChangeSelectTo}>
                                <option value="Station1">Station1</option>
                                <option value="Station2">Station2</option>
                            </select></td>
                        </tr>
                        <tr>
                            <td>  From:</td>
                            <td><select value={from} onChange={this.handleChangeSelectFrom}>
                                <option value="Station1">Station1</option>
                                <option value="Station2">Station2</option>
                            </select></td>
                        </tr>
                        <tr>
                            <td><input type="submit" value="Submit" /></td>
                            {/*                   <td><Router><div><Link to="/makePayment">Next-></Link></div><Route exact path="/makePayment" component={CreateNewPayment} /></Router></td>
   */}
                        </tr>
                        </tbody>
                    </table>
                </form>
                <Router><div><Link id="payment" to="/booking/payment"></Link></div><Route path='/booking/payment' render={(props) => (
                    <CreateNewPayment {...props} data={{userId,selectedTrain,numberOfTickets,to,from}}/>
                )}/></Router>
            </div>
        );
    }
}



export default BookTrain;
