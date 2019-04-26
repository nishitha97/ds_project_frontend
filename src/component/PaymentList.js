import React, {Component} from 'react';
import PaymentListItem from './PaymentListItem';


class PaymentList extends Component {
    constructor(props) {
        super(props);
        /*this.state={
            users:this.props.users
        }*/

    }


  /*  delete = (id) => {
        this.setState(prevState => ({
            users: prevState.users.filter(el => el != id)
        }));
    }
*/

    render() {


        return (
            <div>
                <table className={'table table-hover'} style={{height:100,width:100,align:"center"}}>
                    <tbody>
                    <tr>
                        <th>UserId</th>
                        <th>BookingId</th>
                        <th>CreditCardPayment</th>
                        <th>MobilePayment</th>
                        <th>PaymentStatus</th>
                    </tr>
                    <PaymentListItem payments={this.props.payments} isLoading={this.props.isLoading}/>
                    </tbody>
                </table>
            </div>

        );
    }
}



export default PaymentList;
