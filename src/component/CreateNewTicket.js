import React, {Component} from 'react';
import Axios from "../util/Axios";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import HomePage from "./HomePage";


/**
 * component which renders generated ticket details based on user booking and payment
 *
 * @author IT17006880
 */
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



    }





    render() {
        //const {bookingId,userId,mobilePayment,creditCardPayment,paymentStatus} = this.state;
        return (
            <div>
                <h1>Your ticket</h1><hr className={'hr'}/>

                {/*<form onSubmit={this.handleSubmit} style={{marginLeft:"30%"}}>

                </form>*/}
                    <table className={'table table-hover'} style={{width:600,marginLeft:"15%"}}>
                        <tbody>
                        <tr>
                            <td>UserName </td>
                            <td><p>{this.props.data.username}</p></td>
                        </tr>
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
                        {/*<tr>
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
                        </tr>*/}
                        <tr>
                            <td>Date</td>
                            <td>{String(new Date())}</td>
                        </tr>
                        {/*<tr>
                            <td><input type="submit" value="Submit"/></td>
                            <td><input type="hidden" name="paymentStatus"/></td>
                        </tr>*/}
                        </tbody>
                    </table>

            </div>
        );
    }
}
export default CreateNewTicket;