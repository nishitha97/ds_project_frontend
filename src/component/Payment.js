import React, {Component} from 'react';
import List from './UserList'
import Axios from "../util/Axios";
import PaymentList from "./PaymentList";



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
        Axios.get("http://localhost:8081/api/v1/payments")
            .then(response =>

                    response.data.map(payment => ({

                        creditCardPayment: payment.creditCardPayment,
                        mobilePayment: payment.mobilePayment,
                        bookingId:payment.bookingId,
                        userId:payment.userId,
                        paymentStatus:payment.paymentStatus

                    }))
                // {
                //     this.setState({
                //         users:response.data.users,
                //         isLoading: false
                //     });
                // }

            ).then(payments => {
                this.setState({
                    payments:payments,
                    isLoading: false
                });
            })

            .catch(error => this.setState({ error, isLoading: false }));
    }






    render() {
        return (
            <div>
                <PaymentList payments={this.state.payments} isLoading={this.state.isLoading}/>
            </div>

        );
    }

    // render() {
    //     const {isLoading, users} = this.state;
    //     return (
    //         <React.Fragment>
    //             <h2>Random User</h2>
    //             <div>
    //                 {!isLoading ? (
    //                     users.map(user => {
    //                         const { name, email} = user;
    //                         return (
    //                             <div>
    //                                 <p>{name}</p>
    //                                 <div>
    //                                     <img alt={name}/>
    //                                 </div>
    //                                 <p>{email}</p>
    //                                 <hr/>
    //                             </div>
    //                         );
    //                     })
    //                 ) : (
    //                     <p>Loading...</p>
    //                 )}
    //             </div>
    //         </React.Fragment>
    //     );
    // }
}

export default Payment;
