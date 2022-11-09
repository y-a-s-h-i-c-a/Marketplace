import React,{useState} from 'react';
import './headerlogin.scss';
import Cuvette from '../../Cuvette.png';
import { Link, useNavigate } from "react-router-dom";
import Modal from '../modal/modal';
import { Icon } from '@iconify/react';
function headerlogin() {
  const navigate=useNavigate();
    const [openModal, setOpenModal] = useState(false);
    return (
        <div className='headerlogin'>
        <Link to="/">
        <img className='Cuvette' src={Cuvette} alt='logo'></img>
        </Link>
           
        <div style={{display: "flex",
         alignItems: "center"}}>
         
         <Link to="/MyApi">
         <button className="button1" >My APIs</button> </Link>
        
         <Link to="/Contact">
         <button className="button1"  style={{paddingLeft:'20px'}}>Contact us</button> </Link>


          <button className="button2"
           onClick={() => {
            setOpenModal(true);
            }}>+New API</button>
          {openModal && <Modal closeModal={setOpenModal} />}
          
            <Icon icon="tabler:logout"  className='logout'
            onClick= {() => {
              localStorage.setItem("accessToken","")
              navigate("/")
            }}/>        

          </div>
       </div>
    );
}
export default headerlogin;
