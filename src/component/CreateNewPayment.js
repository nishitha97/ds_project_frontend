import React, {Component} from 'react';
import Axios from "../util/Axios";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import CreateNewTicket from "./CreateNewTicket";

class CreateNewPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingId: '',
            creditCardPayment: false,
            mobilePayment:false,
            paymentStatus:'NOT PAID',
            userId:'',
            userIdFrom:this.props.data.userId,
            selectedTrain:this.props.data.selectedTrain,
            numberOfTickets:this.props.data.numberOfTickets,
            to:this.props.data.to,
            from:this.props.data.from

        };


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
        // alert('A name was submitted: ' + this.state.username);
        event.preventDefault();
        const {bookingId,creditCardPayment,mobilePayment,paymentStatus,userId}=this.state

        Axios.post('http://localhost:8081/api/v1/payments',{bookingId,creditCardPayment,mobilePayment,paymentStatus,userId})
            .then(response=>{
                console.log(response);
                const url = document.getElementById('ticket');
                url.click();
            })



    }





    render() {
        const {bookingId,userId,mobilePayment,creditCardPayment,paymentStatus,userIdFrom,selectedTrain,numberOfTickets,to,from} = this.state;
        /*,selectedTrain,numberOfTickets,to,from}=this.props;*/
        console.log("dsdsdsdsdsssssssssssssssssss"+selectedTrain)
        return (
            <div>
                <h1 style={{marginLeft:"30%"}}>Make Payment</h1><br/><br/>

                <form onSubmit={this.handleSubmit} style={{marginLeft:"30%"}}>
                    <table className={'table table-hover'} style={{width:400}}>
                        <tbody>
                        <tr>
                            <td> UserId:</td>
                            <td> <input type="text" name="userId" value={this.props.data.userId} onChange={this.handleChange} readOnly /></td>
                        </tr>
                        <tr>
                            <td>BookingId:</td>
                            <td><input type="text" name="bookingId" value={bookingId} onChange={this.handleChange} /></td>
                        </tr>

                        <tr>
                   <td>Payment Method:</td>
                   <td><input type="radio" name="mobilePayment" value={mobilePayment} onChange={this.handleRadioMobile}/> Mobile Payment<br/>
                   <input type="radio" name="creditCardPayment" value={creditCardPayment} onChange={this.handleRadioCredit}/> Credit Payment
                   </td>
               </tr>

                        <tr>
                            <td><input type="submit" value="Submit"/></td>
                            <td><input type="hidden" name="paymentStatus" value={paymentStatus}/></td>
                        </tr>
                        </tbody>
                    </table>
                </form>
                <Router><div><Link id="ticket" to="/booking/payment/ticket"></Link></div><Route path='/booking/payment/ticket' render={(props) => (
                    <CreateNewTicket {...props} data={{userIdFrom,selectedTrain,numberOfTickets,to,from}}/>
                )}/></Router>
            </div>
        );
    }
}
export default CreateNewPayment;