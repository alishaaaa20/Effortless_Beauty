import {useEffect, useRef} from 'react';
import logo from '../../assets/images/logo.png';
import {NavLink, Link} from 'react-router-dom'

const navLinks = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/artists',
    display: 'Find a Makeup Artists'
  },
  {
    path: '/sercives',
    display: 'Services'
  },
  {
    path: '/contact',
    display: 'Contact'
  },
]

const Header = () => {
  return (
    <header className="header flex items-center">
      <div className='container'>
        <div className='flex itemns-center justify-between'>
          {/* Logo */}
          <div>
            <img src={logo} alt="" height={200} width={200} />
          </div>

          {/* menu */}
          <div className='navigation items-center'>
            <ul className='menu flex items-center gap-[2.7rem]'>
              {
                navLinks.map((link, index) => <li key={index}>
                  <NavLink to={link.path} className={navClass => navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[600]' : 'text-textColor text-[16px] leading-7 font-[500]'}>{link.display}</NavLink>
                </li>)
              }

            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;