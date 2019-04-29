import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import image from '../resource/image.jpg';


/**
 * home page
 *
 * @author IT17006880
 */
class HomePage extends Component {


    render() {

        return (
            <div>
                <p style={{alignContent:"center",color:"black",fontSize:20}}>Please Login or SignUp to begin booking</p>
                <img src={image} style={{width:800,height:400}}/>
            </div>

        );
    }
}

export default HomePage;
