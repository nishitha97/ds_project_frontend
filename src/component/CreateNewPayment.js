import React, {Component} from 'react';
import Axios from "../util/Axios";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import CreateNewTicket from "./CreateNewTicket";

class CreateNewPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingId:this.props.data.bookingId,
            creditCardPayment: false,
            mobilePayment:false,
            paymentStatus:'NOT PAID',
            userId:this.props.data.userId,
            selectedTrain:this.props.data.selectedTrain,
            numberOfTickets:this.props.data.numberOfTickets,
            to:this.props.data.to,
            from:this.props.data.from,
            isAuthenticated:this.props.data.isAuthenticated,
            username:this.props.data.username

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

        event.preventDefault();
        const {bookingId,creditCardPayment,mobilePayment,paymentStatus,userId}=this.state;
        Axios.post('http://localhost:8081/api/v1/payments',{bookingId,creditCardPayment,mobilePayment,paymentStatus,userId})
            .then(response=>{
                console.log(response);
                const url = document.getElementById('ticket');
                url.click();
            })



    }



    render() {
        const {bookingId,userId,mobilePayment,creditCardPayment,paymentStatus,selectedTrain,numberOfTickets,to,from,isAuthenticated,username} = this.state;
        /*,selectedTrain,numberOfTickets,to,from}=this.props;*/
        //console.log("dsdsdsdsdsssssssssssssssssss"+selectedTrain)



        return (
            <div>
                <h1>Make Payment</h1><hr className={'hr'}/>

                <form onSubmit={this.handleSubmit} style={{marginLeft:"30%"}}>
                    <table className={'table table-hover'} style={{width:600}}>
                        <tbody>
                        <tr>
                            <td> UserName:</td>
                            <td>{this.props.data.username} </td>
                        </tr>
                        <tr>
                            <td>Payable:</td>
                            <td> Rs 100/=</td>
                        </tr>

                        <tr>
                   <td>Payment Method:</td>
                   <td><input type="radio" name="radio" value={mobilePayment} onChange={this.handleRadioMobile}/> Mobile Payment(Dialog)<br/>
                   <input type="radio" name="radio" value={creditCardPayment} onChange={this.handleRadioCredit}/> Credit Payment

                   </td>
               </tr>

                        <tr>
                            <td><input type="submit" value="Confirm Payment" className="btn btn-primary"/></td>
                            <td><input type="hidden" name="paymentStatus" value={paymentStatus}/></td>
                            <td><input type="hidden" name="userId" value={this.props.data.userId} onChange={this.handleChange}/></td>
                            <td><input type="text" name="bookingId" value={this.props.data.bookingId}  onChange={this.handleChange}/></td>

                        </tr>
                        </tbody>
                    </table>
                </form>
                <hr className={'hr'}/><Router><div><Link id="ticket" to="/booking/payment/ticket"></Link></div><Route path='/booking/payment/ticket' render={(props) => (
                    <CreateNewTicket {...props} data={{bookingId,userId,mobilePayment,creditCardPayment,paymentStatus,selectedTrain,numberOfTickets,to,from,isAuthenticated,username}}/>
                )}/></Router>
            </div>
        );
    }
}
export default CreateNewPayment;