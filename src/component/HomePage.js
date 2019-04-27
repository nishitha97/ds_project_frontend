import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import image from '../resource/image.jpg';
class HomePage extends Component {


    render() {

        return (
            <div>

                <img src={image} style={{width:800,height:400}}/>
            </div>

        );
    }
}

export default HomePage;
