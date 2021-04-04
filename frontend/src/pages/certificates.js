import React, { useEffect, useState } from "react";
import axios from "axios";
import "./certificates.css";

import { useForm, value } from "react-hook-form";

const Certificates = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [item, setItem] = useState({ docType: "" });
  let isAvailable = true;
  const { docType } = item;

  const handleChange = (e) => {
    e.persist();
    //     console.log(e.target.value);

    setItem((prevState) => ({
      ...prevState,
      docType: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(`${docType}`);
    console.log(`${docType}`);
    const responseObject = { type: `${docType}` };
    axios
      .post("/student/reqDoc", responseObject, {
        headers: {
          "auth-token": localStorage.token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setLoading(true);
      })
      .catch((err) => console.log(err));
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
          isAvailable = false;
        }
      })
      .catch((error) => console.log(error));
    return () => setLoading(false);
  }, [isLoading]);

  if (isLoading) {
    return <div className="Course-Summary">Loading...</div>;
  }

  return (
    <div className="certificates-student">
      <h3>Send a request for the type of document you need.</h3>
      <div className="card col-md-8 mx-auto p-3">
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mr-0">
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="flexRadioDefault1"
                    value="bonafide"
                    onChange={handleChange}
                    checked="true"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Bonafide Certificate
                  </label>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="flexRadioDefault2"
                    value="lastSemGrade"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Last semester's grade report
                  </label>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="flexRadioDefault2"
                    value="feeReceipt"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Fee Receipt
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="flexRadioDefault1"
                    value="migration"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Migration Certificate
                  </label>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="flexRadioDefault2"
                    value="courseReport"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Course Summary/Report
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-50 mx-auto">
            Send Request
          </button>
        </form>
      </div>
      <h6>
        Note: If the view certificate button is not visible, the admin hasn't
        uploaded the document that you requested for previously.
      </h6>
      {data === Array &&
        data.map((item, key) => {
          console.log(data);
          {
            item.certpdf.map((typeOfDoc, docKey) => {
              return (
                <a
                  key={docKey + key}
                  href={typeOfDoc.link}
                  target="_blank"
                  rel="noreferrer"
                  class="btn btn-secondary disabled"
                  tabindex="-1"
                  role="button"
                  aria-disabled="true"
                >
                  Link
                </a>
              );
            });
          }
        })}
    </div>
  );
};

export default Certificates;
