import React,{useState} from "react";
import './BgRemover.scss';
import Header from '../../components/header/Header';
import CoverPic from '../../coverpic.svg';
import picIcon from '../../uploadimage.svg';
import axios from "axios";
import { triggerBase64Download } from 'common-base64-downloader-react';

function BgRemover() {
  
  const[msg,setmsg] = useState("")
  const onSubmitHandler = async (files) => {
 console.log(files);
 if(!files.type.includes("image") )
 { setmsg("File format must be .jpg, .png, .jpeg");
   return console.log("File format must be .jpg, .png, .jpeg");
 }else if(files.size > 4999999){
   setmsg("File size should be less than 5Mb");
   return console.log("File size should be less than 5Mb");
 }
 setmsg("processing");
  const formdata = new FormData();
  formdata.append("file",files);
  let data = await axios.post("https://marketplacee.herokuapp.com/bgremove", formdata);   
  triggerBase64Download("data:image/png;base64,"+ data.data.base64img,"bg-removed " + files.name.split(".")[0])
  setmsg("Downloaded");
}
 
  return( 
  <>
  <Header />
  <div className="landingPage">
        <div className="about">
          <div className="leftContainer">
            <h1 className="title">Remove image background</h1>
            <p className="description">100% automatic and free</p>
            <div className="imgContainer">
              <img src={CoverPic} alt="user_img" className="userImg" />
            </div>
          </div>
        </div>
        <div className="upload_pic">
          <div className="rightContainer">
            <div className="pictureContainer">
              <img src={picIcon} alt="" className="gallery" />
            </div>
            <p className="instructions">File should be png, jpg and less than 5mb</p>
            <label className="choose_img"> Upload Image
              <input type="file" style={{display:"none"}} onChange={(e)=>{               
               console.log(e.target.files[0]);
               onSubmitHandler(e.target.files[0])}}>
              </input>
            </label>
            
        
            {/* <button className="choose_img">Upload Image
            
            </button> */}
            <p className="instructions">Or drop a file</p>
            {msg}
          </div>
        </div>
      </div>
  </>
  )}

export default BgRemover;
