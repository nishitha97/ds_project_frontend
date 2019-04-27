import React, {Component} from 'react';


class PaymentListItem extends Component {

    constructor(props){
        super(props);
    }




    /*delete(id) {
        this.props.delete(id);
    }
*/


    render() {
        return (
            this.props.payments.map((list,index)=>{
                return(

                    <tr key={index}>

                        <td>{list.userId}</td>
                        <td>{list.bookingId}</td>
                        <td>{String(list.creditCardPayment)}</td>
                        <td>{String(list.mobilePayment)}</td>
                        <td>{list.paymentStatus}</td>

                    </tr>

                );



            })


        );

    }
}

export default PaymentListItem;
