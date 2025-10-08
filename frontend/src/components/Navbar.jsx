import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                Musicalio
            </div>
            <ul className="navbar-menu">
                <li><a href="/" className="navbar-link">Home</a></li>
                <li><a href="/about" className="navbar-link">Sobre</a></li>
                <li><a href="/contact" className="navbar-link">Contato</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;