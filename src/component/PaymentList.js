import React, {Component} from 'react';
import PaymentListItem from './PaymentListItem';

/**
 * component which renders the payment list to be displayed in the Payment component
 *
 * @author IT17006880
 */
class PaymentList extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <table className={'table table-hover'}>
                    <tbody>
                    <tr>
                        <th>UserId</th>
                        <th>BookingId</th>
                        <th>CreditCardPayment</th>
                        <th>MobilePayment</th>
                    </tr>
                    <PaymentListItem payments={this.props.payments} isLoading={this.props.isLoading}/>
                    </tbody>
                </table>
            </div>

        );
    }
}


export default PaymentList;
