import React, {Component} from 'react';
import Axios from "../util/Axios";
import TicketList from "./TicketList";




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
        Axios.get("http://localhost:8081/api/v1/tickets")
            .then(response =>
                    response.data.map(ticket => ({
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
                // {
                //     this.setState({
                //         users:response.data.users,
                //         isLoading: false
                //     });
                // }

            )
            .then(tickets => {
                this.setState({
                    tickets:tickets,
                    isLoading: false
                });
            })

            .catch(error => this.setState({ error, isLoading: false }));
    }






    render() {
        return (
            <div>
                <TicketList tickets={this.state.tickets} isLoading={this.state.isLoading}/>
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

export default Ticket;
