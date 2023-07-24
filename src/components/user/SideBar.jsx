import { GiHamburgerMenu } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
import { TbCertificate } from 'react-icons/tb';
import { FaRegCheckSquare } from 'react-icons/fa';
import { BiExit } from 'react-icons/bi';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { ButtomMobil } from '@/components/user/ButtomMobil';
import { useAuth } from '@/contexts/AuthContext';
import { upperFirstWord } from '@/helpers/utils';

export const SideBar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const { authLogout, user } = useAuth();

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  const showSidebar = () => {
    setSidebarVisible(true);
  };

  const hideSidebar = () => {
    setSidebarVisible(false);
  };

  return (
    <div>
      <ButtomMobil showSidebar={showSidebar} />
      <div className='d-grid' style={{ height: '100vh' }}>
        <div className={`fijar-sidebar bg-dark ${sidebarVisible ? 'active' : ''}`} id='side_nav'>
          <div className='bg-dark px-2 pt-3 pb-4'>
            <h1 className='fs-4 text-center'>
              <span className='bg-dark text-white text-dark rounded shadow px-5 py-2 me-2 fs-5'>
                {upperFirstWord(user?.name)}
              </span>
            </h1>
            <button
              className='btn d-md-none d-block bg-dark close-btn px-1 py-0 text-white fs-1'
              onClick={hideSidebar}>
              <GiHamburgerMenu />
            </button>
          </div>
          <ul className='list-unstyled px-2'>
            <li
              onClick={() => handleItemClick(0)}
              style={{ backgroundColor: selectedItem === 0 ? '#00fa32' : '#fff' }}
              className='text-decoration-none rounded item-registro'>
              <Link
                to='/'
                className='d-flex text-dark align-items-center m-2'
                onClick={() => hideSidebar()}>
                <CgProfile className='fs-4 m-2' /> Perfil
              </Link>
            </li>

            <li
              onClick={() => handleItemClick(2)}
              style={{ backgroundColor: selectedItem === 2 ? '#00fa32' : '#fff' }}
              className='text-decoration-none rounded mt-3 item-registro'>
              <Link
                className='d-flex text-dark align-items-center m-2'
                to='/registros'
                style={{ color: selectedItem === 2 ? '#00fa32' : '#090909', height: '40px' }}
                onClick={() => {
                  hideSidebar();
                }}>
                <FaRegCheckSquare className='fs-4 m-2' /> Registros
              </Link>
            </li>
            <li
              onClick={() => handleItemClick(1)}
              style={{ backgroundColor: selectedItem === 1 ? '#00fa32' : '#fff' }}
              className='text-decoration-none rounded mt-3 item-registro'>
              <Link
                className='d-flex text-dark align-items-center m-2'
                to='/certificados'
                style={{ color: selectedItem === 1 ? '#00fa32' : '#090909', height: '40px' }}
                onClick={() => {
                  hideSidebar();
                }}>
                <TbCertificate className='fs-4 m-2' /> Certificados
              </Link>
            </li>

            <li
              onClick={() => handleItemClick(3)}
              style={{ backgroundColor: selectedItem === 3 ? '#e11111' : '#fff' }}
              className='text-decoration-none rounded mt-3 item-seccion'>
              <Link
                className='d-flex text-dark align-items-center m-2'
                onClick={() => {
                  hideSidebar();
                  authLogout();
                }}>
                <BiExit className='fs-4 m-2' /> Cerrar Sesion
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
