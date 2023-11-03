import React, {useState} from 'react'
import {heightgalery, imagegallery, imagenone} from './ImageGallery.module.css'
import image1 from '../../../assets/imagegallery/image1.jpg'
import image2 from '../../../assets/imagegallery/image2.jpg'
import image3 from '../../../assets/imagegallery/image3.jpg'

function ImageGallery() {
  return (
    <div className= {`${heightgalery} container-fluid mt-4 align-items-center d-flex`}>
      <div className='row'>
        <div className='col-12 col-md-6 col-lg-4 col-xl-4 my-2'>
          <img src={image1} className= {imagegallery} alt="" />
        </div>
        <div className='col-12 col-md-6 col-lg-4 col-xl-4 my-2'>
          <img src={image2} className= {imagegallery} alt="" />
        </div>
        <div className={`col-12 col-md col-lg-4 col-xl-4 my-2 ${imagenone}`}>
          <img src={image3} className= {imagegallery} alt="" />
        </div>
      </div>
    </div>
  )
}

export default ImageGallery