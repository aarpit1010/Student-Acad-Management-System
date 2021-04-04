import React, { useState } from "react";
import form from "react-bootstrap";
import "./adminEmail.css";

const AdminEmail = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const PostData = () => {
    fetch("/admin/send", {
      method: "post",
      headers: {
        "admin-auth-token": localStorage.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("message send");
        setMessage("");
        setName("");
        setSubject("");
        setEmail("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="admin-email-page pt-5">
      <div className="card col-md-8 mx-auto">
        <div className="card-body">
          <div className="card-title">
            <h4>Send an official message</h4>
          </div>
          <form>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                className="form-control"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Message</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                type="text"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => PostData()}
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AdminEmail;
