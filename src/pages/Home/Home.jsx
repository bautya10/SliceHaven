import React from 'react';
import GalleryImage from '../../components/Specific/GalleryImage/GalleryImage';
import About from '../AboutUs/About';
import Contact from '../../components/Specific/Contact/Contact';
import Reserves from '../../components/Specific/Reserves/Reserves';


const Home = () => {
  return (
    <div>Home
      <Reserves/>
      <GalleryImage/>
      <About/>
      <Contact/>
    </div>
  )
}

export default Home