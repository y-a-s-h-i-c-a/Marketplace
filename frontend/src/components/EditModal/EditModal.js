import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditModal.scss";

function EditModal({ closeModal, id }) {
  const [name, setName] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken") == null) {
      navigate("/login");
    }

    fetch(`https://marketplacee.herokuapp.com/api/myapi/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.myapi);
      });
  }, []);

  function updateAPI(event) {
    event.preventDefault();

    fetch(`https://marketplacee.herokuapp.com/api/update/${id}`, {
      method: "PUT",
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

  function deleteAPI(event) {
    event.preventDefault();

    fetch(`https://marketplacee.herokuapp.com/api/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("API Deleted Successfully");
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
            <div className="modalTitle">Edit Current API</div>
            <form className="apiForm" onSubmit={updateAPI}>
              <input
                type="text"
                placeholder="API Name"
                defaultValue={data.name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="API Endpoint"
                defaultValue={data.endPoint}
                onChange={(e) => setEndPoint(e.target.value)}
              />
              <textarea
                cols=""
                rows="5"
                placeholder="Description of API"
                defaultValue={data.description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <input type="submit" value="Edit API" id="submit" />
              <button className="delete" onClick={deleteAPI}>
                Delete API
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditModal;