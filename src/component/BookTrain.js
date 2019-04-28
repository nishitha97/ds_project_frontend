import React, {Component} from 'react';
import Axios from "../util/Axios";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import CreateNewPayment from "./CreateNewPayment";
import  { Redirect } from 'react-router-dom'
import { browserHistory } from 'react-router';
import Login from "./Login";
class BookTrain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId:this.props.data.userId,
            selectedTrain: '',
            numberOfTickets: '',
            to:'',
            from:'',
            isAuthenticated:this.props.data.isAuthenticated,
            username:this.props.data.username,
            bookingId:'',//here
            trainsDetails:[]


        };

    }
    handleChange=(e)=>{
        this.setState({ [e.target.name]: e.target.value });

    }

    handleChangeSelectTo=(e)=>{
        this.setState({to: e.target.value});
    }

    handleChangeSelectFrom=(e)=>{
        this.setState({from: e.target.value});
    }

    handleChangeSelectTrain=(e)=>{
        this.setState({selectedTrain: e.target.value});
    }


    componentDidMount(){
        Axios.get('http://localhost:8081/api/v1/trains')
            .then(response =>
                    response.data.map(train => ({

                        toDest: train.to,
                        fromDest: train.from,
                        train: train.train,
                        arrivalTime: train.arrivalTime,
                        departureTime: train.departureTime,
                        platform: train.platform,

                    }))

            )
            .then(trainDetails => {
                this.setState({
                    trainsDetails:trainDetails,

                });
            })

            .catch=(e)=>{
            console.log(e);
        }


    }

    handleSubmit=(event)=> {
        // alert('A name was submitted: ' + this.state.username);
        event.preventDefault();
        const {userId,selectedTrain,numberOfTickets,to,from}=this.state;

        Axios.post('http://localhost:8081/api/v1/booking',{userId,selectedTrain,numberOfTickets,to,from})
            .then(response=>{
                console.log(response);
                this.setState({
                    bookingId:response.data.id
                        });
            });


        const url = document.getElementById('payment');
        url.click();
    }

   // componentWillReceiveProps(){
        /*if(this.state.isAuthenticated===false||this.state.userId===undefined||this.state.username===undefined){
            alert("Please Login to continue !")
            const url = document.getElementById('login');
            url.click();
        }*/
       // console.log("componentWillReceiveProps",this.props.isAuthenticated);
  //  }



    render() {
        const {userId,selectedTrain,numberOfTickets,to,from,isAuthenticated,username,bookingId} = this.state;
/*
        if(isAuthenticated===false) {
           /!* return <Redirect to='/login'/>*!/
            this.props.history.push("/login");
            console.log("dsdsdsdsdsd");
        }*/

     /*   this.state.trainsDetails.map((trainDetail,index)=>{
            return(

                <tr key={index}>

                    <td>{trainDetail.name}</td>
                    <td>{trainDetail.email}</td>

                    {/!*   <td><button onClick={this.delete.bind(this,index)}>Delete</button></td>*!/}
                </tr>

            );



        })*/
//TODO FIND PROPER WAY TO BOOK TRAIN IN real life
        return (
            <div>
                <h1>Book a train</h1><hr className={'hr'}/>
                <form onSubmit={this.handleSubmit} style={{marginLeft:"5%"}}>
                    <table className={'table table-hover'} style={{width:1000}}>
                        <tbody>
                        <tr>
                            <td> Username:</td>
                            <td>{this.props.data.username}</td>
                        </tr>
                        <tr>
                            <td>  Select Train:</td>
                            <td><select value={selectedTrain} onChange={this.handleChangeSelectTrain}>
                                { this.state.trainsDetails.map((trainDetail,index)=> {

                                    return(

                                            <option key={index} value={trainDetail.train}>
                                                Train:{trainDetail.train} From:{trainDetail.fromDest} To:{trainDetail.toDest} arrivalTime:{trainDetail.arrivalTime} departureTime:{trainDetail.departureTime} PlatForm:{trainDetail.platform}
                                            </option>


                                    );})}
                            </select></td>


                        </tr>
                        <tr>
                            <td> Enter number Of Tickets:</td>
                            <td> <input type="text" name="numberOfTickets" value={numberOfTickets} onChange={this.handleChange} /></td>
                        </tr>
                        <tr>
                            <td>  To:</td>
                            <td><select value={to} onChange={this.handleChangeSelectTo}>
                                { this.state.trainsDetails.map((trainDetail,index)=> {

                                    return(

                                        <option key={index} value={trainDetail.toDest}>{trainDetail.toDest}</option>




                                    );})}
                            </select></td>
                        </tr>
                        <tr>
                            <td>  From:</td>
                            <td><select value={from} onChange={this.handleChangeSelectFrom}>
                                { this.state.trainsDetails.map((trainDetail,index)=> {

                                    return(

                                        <option key={index} value={trainDetail.fromDest}>{trainDetail.fromDest}</option>


                                    );})}

                            </select></td>
                        </tr>
                        <tr>
                            <td><input type="submit" value="Confirm" className="btn btn-primary" /></td>
                            <td><input type="hidden" name="userId" value={(this.state.userId)} onChange={this.handleChange} /></td>
                        </tr>
                        </tbody>
                    </table>
                </form>
                <hr className={'hr'}/><Router><div><Link id="payment" to="/booking/payment"></Link></div><Route path='/booking/payment' render={(props) => (
                    <CreateNewPayment {...props} data={{userId,selectedTrain,numberOfTickets,to,from,isAuthenticated,username,bookingId}}/>
                )}/></Router>
               {/* <Router><div><Link id="login" to="/login"></Link></div><Route path='/login' render={(props) => (
                <Login {...props} data={{}}/>
            )}/></Router>*/}
            </div>
        );
    }
}



export default BookTrain;
