import React from 'react';
import GalleryImage from '../../components/Specific/GalleryImage/GalleryImage';
import About from '../AboutUs/About';
import Contact from '../../components/Specific/Contact/Contact';

const Home = () => {
  return (
    <div>Home
      <GalleryImage/>
      <About/>
      <Contact/>
    </div>
  )
}

export default Home