import React, { useState } from "react";
import './apiCard.scss';
import MainPic from "../../apiimg.png";
import { Icon } from "@iconify/react";
import EditModal from "../EditModal/EditModal";

function ApiCard({ name, desc, endPoint, id, hide }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    
    <div className="apicard">
      <img src={MainPic} alt="MainPic"></img>
      <div>
        <a href={endPoint} target="_blank" rel="noreferrer">
          <div className="MainHeading">{name}</div>
        </a>
        <div className="container">
          <div className="Description">{desc}</div>
          <button className="editButton">
            {hide==true?null:
            <Icon
              icon="akar-icons:edit"
              className="edit"
              onClick={() => {
                setOpenModal(true);
              }}
            />}
            {openModal && <EditModal id={id} closeModal={setOpenModal} />}
          </button>
        </div>
      </div>
    </div>
    
  );
}

export default ApiCard;