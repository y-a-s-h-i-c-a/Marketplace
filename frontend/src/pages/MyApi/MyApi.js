import React,{useState,useEffect} from 'react'
import ApiCard from '../../components/apiCard/apiCard';
import Headerlogin from '../../components/headerlogin/headerlogin';
import { useNavigate } from "react-router-dom";
import "./MyApi.scss";

export default function MyApi() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
  
    useEffect(() => {
      if (localStorage.getItem("accessToken") == null) {
        navigate("/login");
      }
  
      fetch("https://marketplacee.herokuapp.com/api/myapi", {
          method:"GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setData(result.myapi);
        });
    }, []);
  
    return (
      <>
        <div className="nav">
          <Headerlogin />
        </div>
        <div className="container">
          <div className="title">
            <h1 className="apiHeading">Your uploaded APIs</h1>
          </div>
          {data.length == 0 ? (
            <p className="text">No APIs Uploaded</p>
          ) : (
            <>
              <div className="cards">
                {data.map((data, idx) => (
                  <ApiCard
                    key={idx}
                    name={data.name}
                    desc={data.description}
                    endPoint={data.endPoint}
                    id={data._id}
                  ></ApiCard>
                ))}
              </div>
            </>
          )}
        </div>
      </>
    );
  }