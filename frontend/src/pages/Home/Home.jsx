import React, { useEffect, useState } from 'react';
import Slider from '../../components/Slider/Slider';

import './Home.css'

import CardWrapper from '../../components/CardWrapper/CardWrapper';
import Benefits from '../../components/Benefits/Benefits';
import Categories from '../../components/Categories/Categories';

import furnitureService from '../../services/furniture.service';

const Home = () => {
  const [furnitures, setFurnitures] = useState(null);

  useEffect(() => {
    furnitureService
      .getFurnitures()
      .then(res => setFurnitures(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ marginTop: '60px' }}>
      <div className='slider-banner'>
        <Slider />
        <div className='slider-banner-text'>
          <h1>Simply Unique<span>/</span> Simply Better<span>.</span></h1>
          <p><span>3legant</span> is a gift & decorations store based in HCMC, Vietnam. Est since 2019.</p>
        </div>
      </div>
      {furnitures && <CardWrapper />}
      <Benefits />
      <Categories />
    </div>
  )
}

export default Home;