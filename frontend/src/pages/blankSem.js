import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const AcademicRegistration = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [item, setItem] = useState({ choice: "" });
  const { choice } = item;

  const handleChange = (e) => {
    e.persist();
    setItem((prevState) => ({
      ...prevState,
      choice: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${choice}`);
    const responseObject = { type: `${choice}` };
  };

  useEffect(() => {
    axios
      .get("/student/viewcertificate", {
        headers: {
          "auth-token": localStorage.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
        console.log(data);
        if (typeof data === "string") {
          console.log("string");
        }
      })
      .catch((error) => console.log(error));
    return () => setLoading(false);
  }, [isLoading]);

  if (isLoading) {
    return <div className="Course-Summary">Loading...</div>;
  }

  return (
    <Tabs defaultActiveKey="blankSem" id="uncontrolled-tab-example">
      <Tab eventKey="blankSem" title="Home">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  id="no"
                  onChange={handleChange}
                  checked="true"
                />
                <label className="form-check-label" htmlFor="no">
                  Yes
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  id="no"
                  onChange={handleChange}
                  checked="true"
                />
                <label className="form-check-label" htmlFor="no">
                  No
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-50 mx-auto">
                Send Request
              </button>
            </form>
          </div>
        </div>
      </Tab>
      <Tab eventKey="Course Selection" title="Profile">
        <h1>Hiiii</h1>
      </Tab>
      <Tab eventKey="Submit" title="Contact">
        <h1>Hiiii</h1>
      </Tab>
    </Tabs>
  );
};

export default AcademicRegistration;
