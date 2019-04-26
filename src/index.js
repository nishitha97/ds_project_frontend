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



const routing = (
    <Router>
        <div>
            <ul>
                <li >
                    <Link to="/">User </Link>

                    <Link to="/payment">Payment </Link>

                    <Link to="/ticket">Ticket </Link>

                    <Link style={{marginLeft:1100}}to="/login">Login </Link>
                </li>
            </ul>

            <Route exact path="/" component={User}/>
            <Route path="/login" component={Login} />
            <Route path="/payment" component={Payment} />
            <Route path="/ticket" component={Ticket} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
