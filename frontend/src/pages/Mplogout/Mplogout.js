// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './Mplogout.scss';
import Coverpic from '../../coverpic.svg';
import ApiCard from '../../components/apiCard/apiCard';
import Header from '../../components/header/Header';
import { Link, useNavigate } from "react-router-dom";

function Mplogout() {

  const [arr,setarr] = useState([]);
  // let arr = [
  //   {src:Coverpic, name:"Backgound Remove", desc:"The description of the API in quick brief and we will truncate it here...."},
  //   {src:Coverpic, name:"Backgound Remove", desc:"The description of the API in quick brief and we will truncate it here...."},
  //   {src:Coverpic, name:"Backgound Remove", desc:"The description of the API in quick brief and we will truncate it here...."},
  //   {src:Coverpic, name:"Backgound Remove", desc:"The description of the API in quick brief and we will truncate it here...."},
  //   {src:Coverpic, name:"Backgound Remove", desc:"The description of the API in quick brief and we will truncate it here...."}
  // ]
  const navigate=useNavigate();

  useEffect(() => {
    let token=localStorage.getItem("accessToken")
    if(token)navigate("/mplogin")
  })
  useEffect(() => {
    // eslint-disable-next-line no-undef
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        result=result.apis
        let data=result.map(x=>{
          let obj= {}
          obj.name=x.name,
          obj.desc=x.description,
          obj.src=Coverpic,
          obj.endPoint=x.endpoint
          return obj;
        })
         setarr(data);
      });
  }, []);

  return (
    <>
     <div className="Header">
        <Header />
        <Link to="login">
          <button className="button">Login/Signup</button>
        </Link>
      </div>


    <div className='mainPage'>
      <div className='banner'>
        <img src={Coverpic} alt='coverpic' />
        <div className='right'>
          <div className='r1'>
            <div className='heading1'>Backgroung IMAGE Remover</div>
            <div className='heading2'>100% automatic and free</div>
          </div>
          <Link to="Bgremove">
          <div className='viewButton'>View App</div>
          </Link>
        </div>
      </div>
      <div className='subHead'>All APIs</div>
      <div className='cardContainer'>
       {arr.map((data,idx)=><ApiCard key={idx} src={data.src} name={data.name} desc={data.desc} endPoint={data.endPoint} hide={true}></ApiCard>)}
      </div>
    </div>
    </>
  )
}

export default Mplogout;

