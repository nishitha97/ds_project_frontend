import React, {Component} from 'react';
import Axios from "../util/Axios";

class BookTrain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId:'',
            selectedTrain: '',
            numberOfTickets: '',
            to:'',
            from:'',


        };

    }
    handleChange=(e)=>{
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit=(event)=> {
        // alert('A name was submitted: ' + this.state.username);
        event.preventDefault();
        const {userId,selectedTrain,numberOfTickets,to,from}=this.state

        Axios.post('http://localhost:8081/api/v1/booking',{userId,selectedTrain,numberOfTickets,to,from})
            .then(response=>{
                console.log(response);
            })

        this.state = {
            userId:'',
            selectedTrain: '',
            numberOfTickets: '',
            to:'',
            from:'',


        };
    }

    render() {
        const {userId,selectedTrain,numberOfTickets,to,from} = this.state;
        return (
            <div>
            <h1 style={{marginLeft:"30%"}}>Book a train</h1><br/><br/>
            <form onSubmit={this.handleSubmit} style={{marginLeft:"30%"}}>
                <table className={'table table-hover'} style={{width:400}}>
                    <tbody>
                <tr>
                    <td> UserId:</td>
                    <td><input type="text" name="userId" value={userId} onChange={this.handleChange} /></td>
                </tr>
                <tr>
                    <td>  Select Train:</td>
                    <td><select value={selectedTrain} onChange={this.handleChange}>
                        <option value="train1">train1</option>
                        <option value="train2">train2</option>
                    </select></td>
                </tr>
                <tr>
                    <td> Enter number Of Tickets:</td>
                    <td> <input type="text" name="numberOfTickets" value={numberOfTickets} onChange={this.handleChange} /></td>
                </tr>
                <tr>
                    <td>  To:</td>
                    <td><select value={to} onChange={this.handleChange}>
                        <option value="train1">Station1</option>
                        <option value="train2">Station2</option>
                    </select></td>
                </tr>
                <tr>
                    <td>  From:</td>
                  {/*  <input type="text" name="creditCardNo" value={creditCardNo} onChange={this.handleChange} />*/}
                    <td><select value={from} onChange={this.handleChange}>
                        <option value="train1">Station1</option>
                        <option value="train2">Station2</option>
                    </select></td>
                </tr>
                    <tr><td><input type="submit" value="Submit" /></td></tr>
                    </tbody>
                </table>
            </form>
            </div>
        );
    }
}
export default BookTrain;