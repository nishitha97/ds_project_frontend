import React, {Component} from 'react';
import List from './UserList'
import Axios from "../util/Axios";
import PaymentList from "./PaymentList";

/**
 * component which renders a table providing all user details stored in the database
 *
 * @author IT17006880
 */
class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            payments: [],
            isLoading: true,
            errors: null
        };
    }


    componentDidMount() {
        Axios.get("http://localhost:8081/api/v1/payments")//api call to get payment details from the database
            .then(response =>

                    response.data.map(payment => ({//response array list mapped to payment object

                        creditCardPayment: payment.creditCardPayment,
                        mobilePayment: payment.mobilePayment,
                        bookingId:payment.bookingId,
                        userId:payment.userId,
                        paymentStatus:payment.paymentStatus

                    }))

            ).then(payments => {//state is updated from the response received
                this.setState({
                    payments:payments,
                    isLoading: false
                });
            })

            .catch(error => this.setState({ error, isLoading: false }));//when error occurs
    }






    render() {
        return (
            <div>
                <PaymentList payments={this.state.payments} isLoading={this.state.isLoading}/>
            </div>

        );
    }


}

export default Payment;
