import React from 'react';
import Lottie from 'lottie-react';

import loader from '@/assets/json/loader.json';

import '@/static/styles/loader.css';

export const Loader = () => {
  return (
    <div className='loaderContainer'>
      <Lottie
        width={300}
        style={{ maxWidth: 600, maxHeight: 600 }}
        height={300}
        animationData={loader}
      />
    </div>
  );
};
