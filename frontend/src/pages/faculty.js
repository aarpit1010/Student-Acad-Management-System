import React, { useState, useEffect } from "react";
import axios from "axios";

function Faculty() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("/student/viewFacultyList", {
        headers: {
          "auth-token": localStorage.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data.faculty);
        setLoading(false);
        // console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  if (isLoading) {
    return <div className="Faculty">Loading...</div>;
  }

  console.log(data);

  return (
    <div className="row">
      {data.map((item, key) => {
        return (
          <div className="card col-sm-4">
            <div className="card-body">
              <h5 className="card-title mr-auto">{item.facultyname}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{item.coursid}</h6>
              <p className="card-text">{item.coursename}</p>
              <button type="button" className="btn btn-primary">
                Send Message
              </button>
            </div>
          </div>
        );
      })}
      ;
    </div>
  );
}

export default Faculty;
