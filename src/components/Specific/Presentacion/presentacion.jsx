import styles from './presentacion.module.css';
import image4 from '../../../assets/imagegallery/image4.jpg';

const Descrip = () => {
  return (
    <div className={`${styles.container} row`}>
      <div className={`${styles.image} container-fluid mt-5`}>
        <img src={image4} className={`${styles.imageGallery} my-2`} alt="foto de nuestros platos gourmet" />
      </div>
      <div className={`${styles.text}`}>
        <h1>Slice Haven</h1>
        <p>
          En Slice Haven, nuestra pasión es la fusión de sabores auténticos. Con una amplia gama de platos, desde exquisitas pizzas hasta deliciosas ensaladas. ¡Te invitamos a descubrir el sabor y la hospitalidad en Slice Haven!
        </p>
      </div>
    </div>
  ); 
};

export default Descrip;