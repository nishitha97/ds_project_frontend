import React, {Component} from 'react';
import Axios from "../util/Axios";
import {BrowserRouter as Router, Link, Redirect, Route} from 'react-router-dom';
import CreateNewTicket from "./CreateNewTicket";
import ConfirmMobile from "./ConfirmMobile";
import ConfirmCreditCard from "./ConfirmCreditCard";

/**
 * component which renders interface for a make a payment providing relevant details
 *
 * @author IT17006880
 */
//TODO FIX REDIRECT CREATE NEW TICKET AND LOGOUT
class CreateNewPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingId:this.props.data.bookingId,
            userId:this.props.userId,
            creditCardPayment: false,
            mobilePayment:true,
            paymentStatus:'NOT PAID',
            mobileNumber:'',
            creditCardNumber:'',
            fields:{},
            errors:{},
            cvc:'',
            pinNumber:'',
            accountHolder:'',
        };

    }

    //sets and updates the state value when user enters text in the input box based on the name given to the input box
    //called when an onChange event is registered
    handleChange=(e)=>{
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields,
            [e.target.name]: e.target.value
        });
    }

    //sets and updates the state value for when mobile payment radio button is selected by the user
    //called when an onChange event is registered
    handleRadioMobile=(e)=>{
        this.setState({
            mobilePayment: true,
            creditCardPayment:false
        });
    }
    //sets and updates the state value for when credit payment radio button is selected by the user
    //called when an onChange event is registered
    handleRadioCredit=(e)=>{
        this.setState({
            creditCardPayment: true,
            mobilePayment:false
        });
    }

    //called when submit button is pressed
    handleSubmit=(event)=> {
        event.preventDefault();
        const {bookingId,creditCardPayment,mobilePayment,paymentStatus,creditCardNumber,mobileNumber}=this.state;
        const userId=this.props.userId;

        if(this.validateForm()) {//submit form only if user input is validated
            let value = '';

            if (creditCardNumber !== '') {//check if credit card number is not empty
                Axios.get('http://localhost:8081/api/v1/users/' + userId)
                    .then((response) => {
                        value = response.data.creditCardNo;//get credit cardNo(last 3 numbers) from response
                        if (value === creditCardNumber) {//check if user input matches the credit card number
                                                         //entered when the user registered to create the account
                            //api call to create a new payment based on user input values

                            Axios.post('http://localhost:8081/api/v1/payments', {//payment will be made only if
                                                                                 //user input matches the credit card number
                                                                                  //entered when the user registered to create the account
                                bookingId,
                                creditCardPayment,
                                mobilePayment,
                                paymentStatus,
                                userId
                            })
                                .then(response => {
                                    alert("Your Payment is successful ! ")
                                    this.setState({
                                        paymentStatus: 'PAID'
                                    })
                                    const url = document.getElementById('ticket');//renders next component(CreateNewTicket) by clicking on the Link
                                                                                  // since payment is now completed
                                    url.click();

                                })


                        } else {
                            alert("Payment unsuccessful !\n Credit number entered does not match registered credit card number")
                        }
                    })


            } else if (mobileNumber !== '') {//check if mobile number is not empty
                Axios.get('http://localhost:8081/api/v1/users/' + userId)
                    .then((response) => {
                        value = response.data.contactNo
                        if (value === mobileNumber) {//check if user input matches the mobile number
                                                      //entered when the user registered to create the account

                            //api call to create a new payment based on user input values
                            Axios.post('http://localhost:8081/api/v1/payments', {//payment will be made only if
                                                                                 //user input matches the mobile number
                                                                                 //entered when the user registered to create the account
                                bookingId,
                                creditCardPayment,
                                mobilePayment,
                                paymentStatus,
                                userId
                            })
                                .then(response => {
                                    alert("Your Payment is successful ! ")
                                    this.setState({
                                        paymentStatus: 'PAID'
                                    })
                                    const url = document.getElementById('ticket');//renders next component(CreateNewTicket) by clicking on the Link
                                                                                  // since payment is now completed
                                    url.click();

                                })


                        } else {
                            alert("Payment unsuccessful !\nMobile number entered does not match registered mobile number")
                        }
                    })


            }
        }
    }

    //form validation is handled here
    validateForm(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        let phone= /^\d+$/;
        let cvcLength='';
        let creditCardLength='';
        let mobileLength='';
        let pinLength='';

        if(this.state.fields.cvc !== undefined) {
            cvcLength = fields["cvc"].length;

            if (!fields["cvc"]) {
                formIsValid = false;
                alert("Please Enter a number of only 3 digits");
            }
            if (typeof fields["cvc"] !== "undefined") {
                if (!fields["cvc"].match(phone) || cvcLength>3) {
                    formIsValid = false;
                    alert("Please Enter a valid CVC number");
                }
            }

        }

        if(this.state.fields.pinNumber !== undefined) {
            pinLength = fields["pinNumber"].length;

            if (!fields["pinNumber"]) {
                formIsValid = false;
                alert("Please Enter a number of only 4 digits");
            }
            if (typeof fields["pinNumber"] !== "undefined") {
                if (!fields["pinNumber"].match(phone) || pinLength>4) {
                    formIsValid = false;
                    alert("Please Enter a valid 4 digit pin number");
                }
            }

        }


        if(this.state.fields.creditCardNumber !== undefined) {
             creditCardLength = fields["creditCardNumber"].length;
            if (!fields["creditCardNumber"]) {
                formIsValid = false;
                alert("Please a valid number");
            }
            if (typeof fields["creditCardNumber"] !== "undefined") {
                if (!fields["creditCardNumber"].match(phone) || creditCardLength>3) {
                    formIsValid = false;
                    alert("Please Enter a valid credit card number");
                }
            }

        }

        else if(this.state.fields.mobileNumber !== undefined){
            mobileLength=fields["mobileNumber"].length;

            if (!fields["mobileNumber"]) {
                formIsValid = false;
                alert("Please Enter a valid number");
            }
            if (typeof fields["mobileNumber"] !== "undefined") {
                if (!fields["mobileNumber"].match(phone) || mobileLength>11 ) {
                    formIsValid = false;
                    alert("Please Enter a valid contact number");
                }
            }

        }

        this.setState({
            errors: errors
        });
        return formIsValid;
    }


    render() {

            const {bookingId, userId, mobilePayment, creditCardPayment, paymentStatus, mobileNumber, creditCardNumber, cvc,pinNumber,accountHolder} = this.state;
        if (this.props.isAuthenticated) {
            //render based on user selected payment option
            const PaymentContent = () => {

                switch (this.state.creditCardPayment) {
                    case true:
                        return <ConfirmCreditCard cvc={cvc} accoutHolder={accountHolder}
                                                  creditCardNumber={creditCardNumber} validateForm={this.validateForm}
                                                  handleChange={this.handleChange}/>
                    case false:
                        return <ConfirmMobile mobileNumber={mobileNumber} validateForm={this.validateForm}
                                              pinNumber={pinNumber}
                                              handleChange={this.handleChange}/>
                    default:
                        return ""

                }
            }
            return (
                <div>
                    <h1>Make Payment</h1>
                    <hr className={'hr'}/>

                    <form onSubmit={this.handleSubmit} style={{marginLeft: "15%"}}>
                        <table className={'table table-hover'} style={{width: 650}}>
                            <tbody>
                            <tr>
                                <td> UserName:</td>
                                <td>{this.props.username} </td>
                            </tr>
                            <tr>
                                <td>Payable:</td>
                                <td>Rs {this.props.data.numberOfTickets*this.props.data.price}</td>
                            </tr>
                            <tr>
                                <td>Payment Method:</td>
                                <td><input type="radio" name="radio" value={mobilePayment} checked={mobilePayment}
                                           onChange={this.handleRadioMobile}/> Mobile Payment(Dialog)<br/>
                                    <input type="radio" name="radio" value={creditCardPayment} checked={creditCardPayment}
                                           onChange={this.handleRadioCredit}/> Credit Payment
                                </td>
                            </tr>
                            </tbody>
                            {PaymentContent()}
                            <tbody>
                            <tr>
                                <td><input type="submit" value="Confirm Payment" className="btn btn-primary"/></td>
                                <td><input type="hidden" name="paymentStatus" value={paymentStatus}/></td>
                                <td><input type="hidden" name="userId" value={this.props.userId}
                                           onChange={this.handleChange}/></td>
                                <td><input type="hidden" name="bookingId" value={this.state.bookingId}
                                           onChange={this.handleChange}/></td>

                            </tr>
                         </tbody>
                        </table>
                    </form>
                    <hr className={'hr'}/>
                    <Router>
                        <div><Link id="ticket" to="/booking/payment/ticket"></Link></div>
                        <Route exact path='/booking/payment/ticket' render={(props) => (
                            <CreateNewTicket {...props}
                                             selectedTrain={this.props.data.selectedTrain}
                                             numberOfTickets={this.props.data.numberOfTickets}
                                             price={this.props.data.price}
                                             to={this.props.data.to}
                                             from={this.props.data.from}
                                             isAuthenticated={this.props.isAuthenticated}
                                             username={this.props.username}
                                             data={{
                                                 bookingId,
                                                 userId,
                                                 mobilePayment,
                                                 creditCardPayment,
                                                 paymentStatus
                                             }}/>
                        )}/></Router>
                </div>
            );
        }return(
            <Redirect to='/login'/>
        )
    }
}


export default CreateNewPayment;