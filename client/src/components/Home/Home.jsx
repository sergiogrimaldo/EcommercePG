import React from 'react'
import AboutHome from './AboutHome/AboutHome';
import Cover from './Cover/Cover';
import Footer from './Footer/Footer'
import Info from './Info/Info';
import Slider from './Slider/Slider';


function Home() {
    return (
        <div>
            <Cover/>
            <AboutHome/>
            <Slider/>            
            <Info/>
            <Footer/>
        </div>
    )
}

export default Home
