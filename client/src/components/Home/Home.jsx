import React from 'react'
import AboutHome from './AboutHome/AboutHome';
import Cover from './Cover/Cover';

import Info from './Info/Info';
import Slider from './Slider/Slider';


function Home() {
    return (
        <div>
            <Cover/>
            <AboutHome/>
            <Slider/>            
            <Info/>
        </div>
    )
}

export default Home
