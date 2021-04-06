import React, { Component } from "react";
import axios from "axios";
import "./adminCertificates.css";

export default class AdminCertificates extends Component {
  constructor(props) {
    super(props);
    this.onEnrollmentChange = this.onEnrollmentChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      certpdf: "",
      enrollment: "",
      type: "",
    };
  }

  onEnrollmentChange(e) {
    this.setState({ ...this.state, enrollment: e.target.value });
    console.log(this.state);
  }

  onTypeChange(e) {
    this.setState({ ...this.state, type: e.target.value });
    console.log(this.state);
  }

  onFileChange(e) {
    this.setState({ ...this.state, certpdf: e.target.files[0] });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("submit button clicked");
    const formData = new FormData();
    formData.append("certpdf", this.state.certpdf);
    formData.append(
      "enrollment",
      this.state.enrollment.toString().toLowerCase()
    );
    formData.append("type", this.state.type.toString().toLowerCase());
    console.log(formData);

    axios
      .post("/cert/uploadcertificate", formData, {
        headers: {
          "admin-auth-token": localStorage.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === (200 || 201)) {
          alert("Certificate successfully uploaded!");
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="admin-certificates-page p-3">
        <div className="card mt-5 col-md-6 mx-auto">
          <div className="card-body">
            <h3>Issue Certificates to Students</h3>

            <form onSubmit={this.onSubmit}>
              <div className=" mb-3">
                <label htmlFor="enrollment" className="form-label">
                  Enrollment number
                </label>
                <input
                  type="text"
                  value={this.state.enrollment}
                  name="enrollment"
                  className="form-control"
                  id="enrollment"
                  placeholder="IIT2020001"
                  onChange={this.onEnrollmentChange}
                />
              </div>
              <div className=" mb-3">
                <label htmlFor="type" className="form-label">
                  Type of Certificate
                </label>
                <input
                  type="text"
                  value={this.state.type}
                  name="type"
                  className="form-control"
                  id="type"
                  placeholder="Bonafide"
                  onChange={this.onTypeChange}
                />
              </div>
              <div className="mb-3">
                <input type="file" onChange={this.onFileChange} />
              </div>
              <button className="btn btn-primary" type="submit">
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
