import styles from './presentacion.module.css';
import image4 from '../../../assets/imagegallery/image4.jpg';

const Descrip = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.image} ${styles.reveal} container-fluid mt-4 align-items-center d-flex`}>
        <img src={image4} className={`${styles.imageGallery} col-12 col-md-6 col-lg-4 col-xl-4 my-2`} alt="foto de nuestros platos gourmet" />
      </div>
      <div className={`${styles.text} ${styles.reveal}`}>
        <h1>Slice Haven</h1>
        <p>
          En Slice Haven, nuestra pasión es la fusión de sabores auténticos. Con una amplia gama de platos, desde exquisitas pizzas hasta deliciosas ensaladas. ¡Te invitamos a descubrir el sabor y la hospitalidad en Slice Haven!
        </p>
      </div>
    </div>
  ); 
};

export default Descrip;
