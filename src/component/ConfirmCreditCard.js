import React, {Component} from 'react';
import {Route} from 'react-router-dom';


class ConfirmCreditCard extends Component {
    constructor(props) {
        super(props);
    }

    //sets and updates the state value when user enters text in the input box based on the name given to the input box
    //called when an onChange event is registered
    //calling onChange method in CreateNewPaymentComponent to update the state
    handleChange = (e) => {
        this.props.handleChange(e);
    }

    //Please note that cvc number and account holder information will not be sent through the request to the backend
    //for security reasons.This will be validated by the bank by making an external api call not implemented here since we are
    //not technically contacting a payment gateway.

    //Only the credit card number will be sent and even then, only the last 3 digits will be stored
    //in the database
    render() {
        return (

                <tr>
                    <td>Confirm last 3 digits of credit Card Number to verify payment</td>
                    <td><input type="text" name="creditCardNumber" value={this.props.creditCardNumber}
                               onChange={this.handleChange}/></td>
                    <td>CVC number</td>
                    <td><input type="text" name="cvc" value={this.props.cvc} onChange={this.handleChange}/></td>
                    <td> Account Holder Name</td>
                    <td><input type="text" name="accountHolder" value={this.props.accountHolder}
                               onChange={this.handleChange}/></td>
                </tr>

        );
    }
}

export default ConfirmCreditCard;
