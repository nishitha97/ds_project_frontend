import React, {Component} from 'react';
import Axios from "../util/Axios";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import HomePage from "./HomePage";


class CreateNewTicket extends Component {
    constructor(props) {
        super(props);
       /* this.state = {
            bookingId: '',
            creditCardPayment: false,
            mobilePayment:false,
            paymentStatus:'NOT PAID',
            userId:''

        };
*/

    }
    handleChange=(e)=>{
        this.setState({ [e.target.name]: e.target.value });
    }

    handleRadioMobile=(e)=>{
        this.setState({ mobilePayment: true });
    }

    handleRadioCredit=(e)=>{
        this.setState({ creditCardPayment: true });
    }

    handleSubmit=(event)=> {

        const url=document.getElementById('homepage');
        url.click();


    }





    render() {
        //const {bookingId,userId,mobilePayment,creditCardPayment,paymentStatus} = this.state;
        return (
            <div>
                <h1 style={{marginLeft:"30%"}}>Your ticket</h1><br/><br/>

                <form onSubmit={this.handleSubmit} style={{marginLeft:"30%"}}>

                </form>
                    <table className={'table table-hover'} style={{width:400}}>
                        <tbody>
                        <tr>
                            <td> From</td>
                            <td> {this.props.data.from}</td>
                        </tr>
                        <tr>
                            <td>To </td>
                            <td>{this.props.data.to}</td>
                        </tr>
                        <tr>
                            <td>Tickets Booked </td>
                            <td>{this.props.data.numberOfTickets}</td>
                        </tr>
                        <tr>
                            <td>Train </td>
                            <td>{this.props.data.selectedTrain}</td>
                        </tr>
                        <tr>
                            <td>Arrival Time </td>
                            <td>{this.props.data.numberOfTickets}</td>
                        </tr>
                        <tr>
                            <td>Departure Time </td>
                            <td>{this.props.data.numberOfTickets}</td>
                        </tr>
                        <tr>
                            <td>Platform </td>
                            <td>{this.props.data.numberOfTickets}</td>
                        </tr>
                        <tr>
                            <td>UserID </td>
                            <td>{this.props.data.userId}</td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td>{String(new Date())}</td>
                        </tr>
                        <tr>
                            <td><input type="submit" value="Submit"/></td>
                            <td><input type="hidden" name="paymentStatus"/></td>
                        </tr>
                        </tbody>
                    </table>
                <Router><div><Link id="homepage" to="/"></Link></div><Route path='/' render={(props) => (
                    <HomePage {...props} data={{}}/>
                )}/></Router>
            </div>
        );
    }
}
export default CreateNewTicket;