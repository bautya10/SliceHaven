import styles from './galleryImage.module.css';
import image1 from '../../../assets/imagegallery/image1.jpg';
import image2 from '../../../assets/imagegallery/image2.jpg';
import image3 from '../../../assets/imagegallery/image3.jpg';

const GalleryImage = () => {
  return (
    <div className={`${styles.HeightGalery} container-fluid mt-4 align-items-center d-flex pt-5`}>
      <div className='row'>
        <div className='col-12 col-md-6 col-lg-4 col-xl-4 my-2'>
          <img src={image1} className={styles.ImageGallery} alt="foto de nuestros paltos gourmet" />
        </div>
        <div className='col-12 col-md-6 col-lg-4 col-xl-4 my-2'>
          <img src={image2} className={styles.ImageGallery} alt="foto de nuestros paltos gourmet" />
        </div>
        <div className={`col-12 col-md col-lg-4 col-xl-4 my-2 ${styles.imagenone}`}>
          <img src={image3} className={styles.ImageGallery} alt="foto de nuestros paltos gourmet" />
        </div>
      </div>
    </div>
  )
};

export default GalleryImage;
