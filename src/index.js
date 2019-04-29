import React from 'react';
import ReactDOM from 'react-dom';
import './css/Home.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/Home.css'
import User from "./component/User";
import Payment from "./component/Payment";
import Login from "./component/Login";
import BookTrain from "./component/BookTrain";
import CreateNewPayment from "./component/CreateNewPayment";
import Ticket from "./component/Ticket";
import CreateNewUser from "./component/CreateNewUser";
import HomePage from "./component/HomePage";

/**
 * index(home) page
 *
 * @author IT17006880
 */
const routing = (
    <div>
        <Router>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"/>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <div>
            <nav className={"navbar navbar-inverse"}>
                <p style={{fontSize:20,color:"white"}}><Link to="/login">Login </Link>|<Link to="/signUp"> Sign up</Link></p>
                <div className={"container-fluid"}>

                    <div className={"navbar-header"}>

                        <a className={"navbar-brand"} style={{color:"white",fontSize:30}}>Welcome ! </a><br/>

                    </div>

                </div>
            </nav>

            <div className={"container-fluid text-center"}>
                <div className={"row content"}>
                    <div className={"col-sm-2 sidenav"} style={{height:"auto"}}>
                      {/*  <div className={"well"}><p style={{fontSize:20}}><Link to="/booking">Book Train</Link></p></div>*/}
                        <div className={"well"}><p style={{fontSize:15}}><Link to="/users">View All Users </Link></p></div>
                        <div className={"well"}><p style={{fontSize:15}}><Link to="/payments">View All Payments </Link></p></div>
                    </div>
                    <div className={"col-sm-8 text-left"} style={{textAlignLast:"center"}}>

                        <Route path="/" component={HomePage} />
                        <Route path="/users" component={User} />
                        <Route path="/payments" component={Payment} />
                        <Route path="/login" component={Login}/>
                        <Route exact path="/booking" component={BookTrain}/>
                        <Route path="/booking/payment" component={CreateNewPayment}/>
                        <Route path="/booking/payment/ticket" component={Ticket}/>
                        <Route path="/signUp" component={CreateNewUser}/>

                    </div>
                    <div className={"col-sm-2 sidenav"}style={{height:"auto"}}>
                        <div className={"well"}>
                            <a href='#'> About Us</a>
                        </div>
                        <div className={"well"}>
                            <a href='#'> Contact Us </a>
                        </div>
                    </div>
                </div>
            </div>

            {/*<footer className={"container-fluid text-center"} >
                <p>Footer Text</p>
            </footer>*/}



        </div>
        </Router>
    </div>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
