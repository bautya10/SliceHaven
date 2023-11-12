import GalleryImage from '../../components/Specific/GalleryImage/GalleryImage';
import About from '../AboutUs/About';
import Contact from '../../components/Specific/Contact/Contact';
import Reservas from '../Reservas/Reservas';


const Home = ({user}) => {
  return (
    <div>
      <GalleryImage/>
      <Reservas user={user}/>
      <Contact/>
      <About/>
    </div>
  )
}

export default Home