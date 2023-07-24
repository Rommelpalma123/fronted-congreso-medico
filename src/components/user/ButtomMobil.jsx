import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';

export const ButtomMobil = ({ showSidebar }) => {

  const handleClick = () => {
    showSidebar(); // Llamar al método showSidebar al hacer clic en el botón
  };
  return (
    <div className='d-md-none'>
      <button className='btn fs-1 px-1 open-btn text-white' style={{width: '50px'}} onClick={handleClick}>
        <GiHamburgerMenu className='' style={{position: 'relative'}} />
      </button>
    </div>
  );
}
