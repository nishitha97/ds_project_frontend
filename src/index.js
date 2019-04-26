import React from 'react';
import ReactDOM from 'react-dom';
import './css/Home.css';
import User from './component/User';
import Login from './component/Login';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Payment from "./component/Payment";
import Ticket from "./component/Ticket";
import CreateNewUser from "./component/CreateNewUser";
import BookTrain from "./component/BookTrain";
import CreateNewPayment from "./component/CreateNewPayment";



const routing = (
    <Router>
        <div>
            <ul>
                <li >
                    <Link to="/">View Users |</Link>

                    <Link to="/payment">View Payments |</Link>

                    <Link to="/ticket">View Tickets </Link>

                    <Link style={{marginLeft:1100}}to="/login">Login </Link>
                </li>
            </ul>

            <ul>
                <li >
                    <Link to="/user">Sign up</Link>
                </li>
                <li >
                    <Link to="/book">Book Train</Link>
                </li>
                <li >
                    <Link to="/makePayment">Make Payment</Link>
                </li>

            </ul>


            <Route exact path="/" component={User}/>
            <Route path="/login" component={Login} />
            <Route path="/payment" component={Payment} />
            <Route path="/ticket" component={Ticket} />
            <Route path="/user" component={CreateNewUser} />
            <Route path="/book" component={BookTrain} />
            <Route path="/makePayment" component={CreateNewPayment} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
