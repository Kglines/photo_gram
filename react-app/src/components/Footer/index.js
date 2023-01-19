import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className='footer-container'>
        <ul className='footer-list'>
            <li>Python</li>
            <li>Flask</li>
            <li>SQLAlchemy</li>
            <li>React</li>
            <li>Redux</li>
            <li>HTML</li>
            <li>CSS</li>
        </ul>
        <div>
            <p className='copyright'>Copyright @ 2023</p>
        </div>
    </div>
  )
}

export default Footer;
