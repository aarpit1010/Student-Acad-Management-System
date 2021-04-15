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
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isLoading) {
    return <div className="Faculty">Loading...</div>;
  }

  return (
    <div>
      {typeof data === "string" ? (
        <h3 className="text-center pt-3">Faculty has not been assigned yet.</h3>
      ) : (
        <div className="row">
          {data.faculty.map((item, key) => {
            return (
              <div className="col-md-4">
                <div key={key} className="card m-3 shadow rounded">
                  <h5 className="card-header list-group-item-info">
                    {item.courseid}
                  </h5>
                  <div className="card-body border">
                    <h4 className="card-title">Name: {item.facultyname}</h4>
                    <p className="card-text">
                      <h5>Course Name: {item.coursename}</h5>
                    </p>
                    <button type="button" className="btn btn-primary">
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          ;
        </div>
      )}
    </div>
  );
}

export default Faculty;
