import GalleryImage from '../../components/Specific/GalleryImage/GalleryImage';
import About from '../AboutUs/About';
import Contact from '../../components/Specific/Contact/Contact';
import Reserves from '../../components/Specific/Reserves/Reserves';


const Home = () => {
  return (
    <div>Home
      <Reserves/>
      <GalleryImage/>
      <Contact/>
      <About/>
    </div>
  )
}

export default Home