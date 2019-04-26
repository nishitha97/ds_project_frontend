import React, {Component} from 'react';


class TicketListItem extends Component {

    constructor(props){
        super(props);
    }




    /*delete(id) {
        this.props.delete(id);
    }
*/


    render() {
        return (
            this.props.tickets.map((list,index)=>{
                return(

                    <tr key={index}>

                        <td>{list.arrivalTime}</td>
                        <td>{list.departureTime}</td>
                        <td>{list.from}</td>
                        <td>{list.to}</td>
                        <td>{list.platform}</td>
                        <td>{list.ticketCount}</td>
                        <td>{list.ticketDate}</td>
                        <td>{list.train}</td>
                        <td>{list.userID}</td>


                    </tr>

                );



            })


        );

    }
}

export default TicketListItem;
