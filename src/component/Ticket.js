import React, {Component} from 'react';
import Axios from "../util/Axios";
import TicketList from "./TicketList";


/**
 * component which generates a ticket based on the booking and payment info provided by the user
 *
 * @author IT17006880
 */
class Ticket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            isLoading: true,
            errors: null
        };
    }


    componentDidMount() {
        Axios.get("http://localhost:8081/api/v1/tickets")//api call to get all created tickets from the database
            .then(response =>
                    response.data.map(ticket => ({//response ticket array list is mapped to ticket object
                        arrivalTime:ticket.arrivalTime,
                        departureTime:ticket.departureTime,
                        from:ticket.from,
                        platform:ticket.platform,
                        ticketCount:ticket.ticketCount,
                        ticketDate:ticket.ticketDate,
                        to:ticket.to,
                        train:ticket.train,
                        userID:ticket.userID,

                    }))

            )
            .then(tickets => {
                this.setState({//state is updated from the response
                    tickets:tickets,
                    isLoading: false
                });
            })

            .catch(error => this.setState({ error, isLoading: false }));//when error occurs
    }


    render() {
        return (
            <div>
                <TicketList tickets={this.state.tickets} isLoading={this.state.isLoading}/>
            </div>

        );
    }
}

export default Ticket;
