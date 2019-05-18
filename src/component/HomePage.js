import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import image1 from '../resource/image1.jpg';
import image2 from '../resource/image2.jpg';
import image3 from '../resource/image3.jpg';
import image4 from '../resource/image4.jpg';
import SimpleImageSlider from "react-simple-image-slider";


/**
 * home page
 *
 * @author IT17006880
 */
class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {};

    }


    render() {
        const images = [
            {url: image1},
            {url: image2},
            {url: image3},
            {url: image4}

        ];

        return (
            <div>
                <div>
                    <p style={{alignContent: "center", color: "black", fontSize: 20}}>Please Login or SignUp to begin
                        booking</p>
                    <SimpleImageSlider
                        slideDuration={1}
                        style={{marginLeft: "5%"}}
                        width={800}
                        height={400}
                        images={images}
                    />
                </div>
            </div>

        );

    }
}

export default HomePage;
