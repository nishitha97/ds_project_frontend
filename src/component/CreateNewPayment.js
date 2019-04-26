import React, {Component} from 'react';
import Axios from "../util/Axios";

class CreateNewPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingId: '',
            creditCardPayment: false,
            mobilePayment:false,
            paymentStatus:'NOT PAID',
            userId:''

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
            })
    }

    render() {
        const {bookingId,userId,mobilePayment,creditCardPayment,paymentStatus} = this.state;
        return (
            <div>
                <h1 style={{marginLeft:"30%"}}>Make Payment</h1><br/><br/>

                <form onSubmit={this.handleSubmit} style={{marginLeft:"30%"}}>
                    <table className={'table table-hover'} style={{width:400}}>
                        <tbody>
                        <tr>
                            <td> UserId:</td>
                            <td> <input type="text" name="userId" value={userId} onChange={this.handleChange} /></td>
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

            </div>
        );
    }
}
export default CreateNewPayment;