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
                        <td>{list.ticketId}</td>
                        <td>{list.creditCardPayment}</td>
                        <td>{list.mobilePayment}</td>

                    </tr>

                );



            })


        );

    }
}

export default PaymentListItem;
