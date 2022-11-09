import React from 'react';
import './Header.scss';
import Cuvette from '../../Cuvette.png';
import { Link } from "react-router-dom";

function header() {

    return (
        <div className='header'>
           <Link to="/">
           <img className='Cuvette' src={Cuvette} alt='logo'></img>
               </Link> 
        </div>
    );
}
export default header;
