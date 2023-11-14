import GalleryImage from '../../components/Specific/GalleryImage/GalleryImage';
import About from '../AboutUs/About';
import Contact from '../../components/Specific/Contact/Contact';
import Reservas from '../Reservas/Reservas';
import Descrip from '../../components/Specific/Presentacion/presentacion';


const Home = () => {
  return (
    <div>
      <Descrip/>
      <GalleryImage/>
      <Reservas />
      <Contact/>
      <About/>
    </div>
  )
}

export default Home