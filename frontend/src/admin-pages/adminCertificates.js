import React, { Component } from "react";
import axios from "axios";
import "./adminCertificates.css";

export default class AcademicCalendar extends Component {
  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      calpdf: "",
    };
  }

  onFileChange(e) {
    this.setState({ calpdf: e.target.files[0] });
  }

  onSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("calpdf", this.state.calpdf);
    axios
      .post("http://localhost:3001/cert/uploadcertificate", formData, {
        headers: {
          "admin-auth-token": localStorage.token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      });
  }

  render() {
    return (
      <div className="admin-certificates-page p-3">
        <div className="card mt-5 col-md-6 mx-auto">
          <div className="card-body">
            <h3>Issue Certificates to Students</h3>
            {/* <div className="row justify-content-md-center"> */}
            <form onSubmit={this.onSubmit}>
              <div className="form-group col-sm-2 mx-auto p-3">
                <input type="file" onChange={this.onFileChange} />
              </div>
              <div className="col-sm-2 mx-auto">
                <button className="btn btn-primary" type="submit">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
