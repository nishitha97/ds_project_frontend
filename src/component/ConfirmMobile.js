import React, {Component} from 'react';
import {Route} from 'react-router-dom';


class ConfirmMobile extends Component {
    constructor(props) {
        super(props);
    }

    //sets and updates the state value when user enters text in the input box based on the name given to the input box
    //called when an onChange event is registered
    //calling onChange method in CreateNewPaymentComponent to update the state
    handleChange = (e) => {
        this.props.handleChange(e);
    }

    render() {
        return (
            <tbody>
            <tr>
                <td>Confirm Your Mobile Number to verify Payment</td>
                <td><input type="text" name="mobileNumber" value={this.props.mobileNumber}
                           onChange={this.handleChange}/></td>
            </tr>
            </tbody>
        );
    }
}

export default ConfirmMobile;
