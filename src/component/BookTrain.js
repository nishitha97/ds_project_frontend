import React, {Component} from 'react';
import Axios from "../util/Axios";
import {BrowserRouter as Router, Link, Redirect, Route} from 'react-router-dom';
import CreateNewPayment from "./CreateNewPayment";
import {browserHistory} from 'react-router';

/**
 * component which renders interface for a user to book a Train providing relevant details
 *
 * @author IT17006880
 */
class BookTrain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.data.userId,
            selectedTrain: '',
            numberOfTickets: '',
            to: '',
            from: '',
            bookingId: '',
            trainsDetails: [],
            price:'',
            fields: {},
            errors: {},
        };

    }

    //sets and updates the state value when user enters text in the input box based on the name given to the input box
    //called when an onChange event is registered
    handleChange = (e) => {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;

        this.setState({
            fields,
            [e.target.name]: e.target.value
        });

    }

    handleChangeTicketNumber = (e) => {

        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;

        this.setState({
            fields,
            [e.target.name]: e.target.value
        },()=>{
            this.setAmount();
        });

    }

    handleChangeSelectTo = (e) => {
        this.setState({to: e.target.value});
    }

    handleChangeSelectFrom = (e) => {
        this.setState({from: e.target.value});
    }

    handleChangeSelectTrain = (e) => {
        var str = e.target.value;
        var n = str.lastIndexOf(': ');
        var result = str.substring(n + 1);
        this.setState({
            selectedTrain: e.target.value,
            price:result
        });
    }


    //form validation is handled here
    validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["numberOfTickets"]) {
            formIsValid = false;
            alert("Please Enter a valid number");
        }
        if (typeof fields["numberOfTickets"] !== "undefined") {
            if (!fields["numberOfTickets"].match(/^[1-9]*$/)) {
                formIsValid = false;
                alert("Please Enter a valid number");
            }
        }
        this.setState({
            errors: errors
        });
        return formIsValid;
    }


    //fetch data before render
    componentDidMount() {
        Axios.get('http://localhost:8081/api/v1/trains')//api call get the stored details from the mongodb database and pass to input form
            .then(response =>
                response.data.map(train => ({//response array list is mapped to a train object

                    toDest: train.to,
                    fromDest: train.from,
                    train: train.train,
                    arrivalTime: train.arrivalTime,
                    departureTime: train.departureTime,
                    platform: train.platform,
                    price:train.price

                }))
            )
            .then(trainDetails => {
                this.setState({
                    trainsDetails: trainDetails,//state is updated
                    //setting default value for drop down select elements
                    selectedTrain: "Train: " + trainDetails[0].train + " Arrival Time: " + trainDetails[0].arrivalTime + " Departure Time: " + trainDetails[0].departureTime + " Platform: " + trainDetails[0].platform + " Price per Ticket: "+ trainDetails[0].price,
                    to: trainDetails[0].toDest,
                    from: trainDetails[0].fromDest

                });

            })

            .catch = (e) => {
            console.log(e);
        }


    }

    //called when submit button pressed
    handleSubmit = (event) => {

        event.preventDefault();
        const {userId, selectedTrain, numberOfTickets, to, from} = this.state;

        let value = '';
        if (this.validateForm()) {//submit form only if user input is validated

            //api call to create a new booking from user inputs
            Axios.post('http://localhost:8081/api/v1/booking', {userId, selectedTrain, numberOfTickets, to, from})
                .then(response => {
                    value = response.data.id;
                    this.setState({
                        bookingId: value//update booking id state with response from newly created booking object id
                    })
                    alert("Your Booking is Successful");
                    const url = document.getElementById('payment');//renders next component(CreateNewPayment) by clicking on the Link
                                                                   // since booking a train is now completed
                    url.click();
                });

        }
    }

    setAmount=()=>{
        const{numberOfTickets,price}=this.state;
        let total= price*numberOfTickets;
        return total;
    }

    render() {
        if (this.props.data.isAuthenticated) {
            const {selectedTrain, numberOfTickets, to, from,bookingId,price} = this.state;
            return (
                <div>
                    <h1>Book a train</h1>
                    <hr className={'hr'}/>
                    <form onSubmit={this.handleSubmit} style={{marginLeft:"5%"}}>
                        <table className={'table table-hover'} style={{width: 800}}>
                            <tbody>
                            <tr>
                                <td> Username:</td>
                                <td>{this.props.data.username}</td>

                            </tr>
                            <tr>
                                <td> Select Train:</td>
                                <td><select value={selectedTrain} onChange={this.handleChangeSelectTrain}>
                                    {this.state.trainsDetails.map((trainDetail, index) => {
                                        return (
                                            <option key={index} value={`Train : ${trainDetail.train} Arrival Time: ${trainDetail.arrivalTime }  Departure Time : ${trainDetail.departureTime} Platform : ${trainDetail.platform} Price per Ticket: ${trainDetail.price}`}>
                                                {`Train : ${trainDetail.train} Arrival Time: ${trainDetail.arrivalTime } Departure Time : ${trainDetail.departureTime} Platform : ${trainDetail.platform}`}
                                            </option>
                                        );
                                    })}
                                </select>
                                </td>
                            </tr>
                            <tr>
                                <td> Price Per Ticket</td>
                                <td> Rs. {price}</td>
                            </tr>
                            <tr>
                                <td> Enter number Of Tickets:</td>
                                <td><input type="number" name="numberOfTickets" value={numberOfTickets}
                                           onChange={this.handleChangeTicketNumber}/></td>
                            </tr>
                            <tr>
                                <td> Payable price:</td>
                                <td>Rs.{this.setAmount()}</td>
                            </tr>
                            <tr>
                                <td> To:</td>
                                <td><select value={to} onChange={this.handleChangeSelectTo}>
                                    {this.state.trainsDetails.map((trainDetail, index) => {

                                        return (

                                            <option key={index} value={trainDetail.toDest}>{trainDetail.toDest}</option>


                                        );
                                    })}
                                </select></td>
                            </tr>
                            <tr>
                                <td> From:</td>
                                <td><select value={from} onChange={this.handleChangeSelectFrom}>
                                    {this.state.trainsDetails.map((trainDetail, index) => {

                                        return (

                                            <option key={index}
                                                    value={trainDetail.fromDest}>{trainDetail.fromDest}</option>


                                        );
                                    })}

                                </select></td>
                            </tr>
                            <tr>
                                <td><input type="submit" value="Confirm" className="btn btn-primary"/></td>
                                <td><input type="hidden" name="userId" value={(this.props.data.userId)}
                                           onChange={this.handleChange}/></td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                    <hr className={'hr'}/>

                    <Router>
                        <div><Link id="payment" to="/booking/payment"></Link></div>
                        <Route exact path='/booking/payment' render={(props) => (
                            <CreateNewPayment {...props} isAuthenticated={this.props.data.isAuthenticated}
                                              username={this.props.data.username}
                                              userId={this.props.data.userId}
                                              data={{selectedTrain, numberOfTickets, to, from, bookingId,price}}/>
                        )}/>
                    </Router>
                </div>
            );
        } else {
            return (
                <Redirect to='/login'/>
            );
        }
    }
}


export default BookTrain;
