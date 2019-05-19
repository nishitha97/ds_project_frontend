import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';


/**
 * component which renders generated ticket details based on user booking and payment
 *
 * @author IT17006880
 */
class CreateNewTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: this.props.isAuthenticated,
            routeToNextPage: false
        }


    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = () => {
        alert("You are now logged out of your account !")
        this.setState({
            isAuthenticated: false,
            routeToNextPage: true,
        })
    }
    renderRedirect = () => {
        // return <Redirect to='/' />
        this.props.history.push("/login")
    }


    render() {
        if (this.state.isAuthenticated && (!this.state.routeToNextPage)) {
            return (
                <div>
                    <h1>Your ticket</h1>
                    <hr className={'hr'}/>
                    <table className={'table table-hover'} style={{width: 850}}>
                        <tbody>
                        <tr>
                            <td>UserName</td>
                            <td><p>{this.props.username}</p></td>
                        </tr>
                        <tr>
                            <td> From</td>
                            <td> {this.props.from}</td>
                        </tr>
                        <tr>
                            <td>To</td>
                            <td>{this.props.to}</td>
                        </tr>
                        <tr>
                            <td>Tickets Booked</td>
                            <td>{this.props.numberOfTickets}</td>
                        </tr>
                        <tr>
                            <td>Train</td>
                            <td style={{fontSize:12}}>{this.props.selectedTrain}</td>
                        </tr>
                        <tr>
                            <td>Amount Paid</td>
                            <td>{this.props.price*this.props.numberOfTickets}</td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td>{String(new Date())}</td>
                        </tr>
                        <tr>
                            <td></td>

                            {/*<td><input type="submit" className="btn btn-primary" value="Finish"
                                       onClick={this.handleSubmit}/></td>*/}
                        </tr>
                        </tbody>
                    </table>
                </div>


            );

        } else if ((!this.state.isAuthenticated) && this.state.routeToNextPage) {
            return (
                <Redirect to='/'/>
            );
        } else if ((!this.state.isAuthenticated) && !(this.state.routeToNextPage)) {
            return (
                <Redirect to='/login'/>
            );
        }
    }
}

export default CreateNewTicket;