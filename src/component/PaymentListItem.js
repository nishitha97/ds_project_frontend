import React, {Component} from 'react';

/**
 * component which renders the each Payment List item(row) in the PaymentList component
 *
 * @author IT17006880
 */
class PaymentListItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            this.props.payments.map((list, index) => {//payment object array list passed through props is mapped and rendered
                return (

                    <tr key={index}>

                        <td>{list.userId}</td>
                        <td>{list.bookingId}</td>
                        <td>{String(list.creditCardPayment)}</td>
                        <td>{String(list.mobilePayment)}</td>

                    </tr>

                );


            })


        );

    }
}

export default PaymentListItem;
