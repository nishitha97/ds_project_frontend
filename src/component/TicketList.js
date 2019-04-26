import React, {Component} from 'react';
import PaymentListItem from './PaymentListItem';
import TicketListItem from "./TicketListItem";


class TicketList extends Component {
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
                        <th>ArrivalTime</th>
                        <th>DepartureTime</th>
                        <th>From</th>
                        <th>To</th>
                        <th>PlatForm</th>
                        <th>TicketCount</th>
                        <th>TicketDate</th>
                        <th>Train</th>
                        <th>UserID</th>
                    </tr>
                    <TicketListItem tickets={this.props.tickets} isLoading={this.props.isLoading}/>
                    </tbody>
                </table>
            </div>

        );
    }
}



export default TicketList;
