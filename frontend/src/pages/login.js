import "./login.css";
import React, { Component } from "react";

export default function Login() {
  return (
    <div className="Login">
      <div class="card">
        <div class="card-body">
          <form>
            <h3>Sign In</h3>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
            <p className="forgot-password text-right">
              <a href="#">Forgot password?</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
