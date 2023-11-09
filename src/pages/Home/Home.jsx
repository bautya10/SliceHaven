import React from 'react';
import GalleryImage from '../../components/Specific/GalleryImage/GalleryImage';
import About from '../AboutUs/About';
import Reserves from '../../components/Specific/Reserves/Reserves';

const Home = () => {
  return (
    <div>Home
      <Reserves/>
      <GalleryImage/>
      <About/>
    </div>
  )
}

export default Home