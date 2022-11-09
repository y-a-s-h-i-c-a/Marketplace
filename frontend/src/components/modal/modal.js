import React, { useState } from "react";
import "./modal.scss";

function Modal({ closeModal }) {
  const [name, setName] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [description, setDescription] = useState("");
  // const navigate = useNavigate();

  function createAPI(event) {
    event.preventDefault();

    // eslint-disable-next-line no-undef
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        name,
        endPoint,
        description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert(data.message);
          closeModal(false);
          window.location.reload();
        }
      });
  }

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="closeBtn">
            <button
              onClick={() => {
                closeModal(false);
              }}
              className="cross"
            >
              {" "}
              X{" "}
            </button>
          </div>
          <div>
            <div className="modalTitle">Add new API</div>
            <form className="apiForm" onSubmit={createAPI}>
              <input
                type="text"
                placeholder="API Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="API Endpoint"
                value={endPoint}
                onChange={(e) => setEndPoint(e.target.value)}
              />
              <textarea
                cols=""
                rows="5"
                placeholder="Description of API"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <input type="submit" value="Add API" id="submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;