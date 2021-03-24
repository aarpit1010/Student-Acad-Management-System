import React from "react";
import AdminNav from "./adminNav";
import "./adminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard mx-auto">
      <AdminNav />
      <h1>Admin Dashboard</h1>
      <div className="row m-0  justify-content-md-center">
        <div className="col-md-4 m-1">
          <div class="card">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img
                  src="https://img.icons8.com/color/96/000000/edit-file.png"
                  className="admin-card-img "
                />
              </div>
              <div class="col-md-8">
                <div className="card-body  text-right">
                  <h5 className="card-title">Student Info</h5>
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" className="btn btn-success">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 m-1">
          <div class="card ">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img
                  src="https://img.icons8.com/color/96/000000/commercial.png"
                  className="admin-card-img "
                />
              </div>
              <div class="col-md-8">
                <div className="card-body text-right">
                  <h5 className="card-title">Add Announcements</h5>
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" className="btn btn-success">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row m-0  justify-content-md-center">
        <div className="col-md-4 m-1">
          <div class="card ">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img
                  src="https://img.icons8.com/color/96/000000/calendar--v2.png"
                  className="admin-card-img "
                />
              </div>
              <div class="col-md-8">
                <div className="card-body text-right">
                  <h5 className="card-title">Academic Calendar</h5>
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" className="btn btn-info">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 m-1">
          <div class="card ">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img
                  src="https://img.icons8.com/color/96/000000/diploma.png"
                  className="admin-card-img "
                />
              </div>
              <div class="col-md-8">
                <div className="card-body text-right">
                  <h5 className="card-title">Academic Calendar</h5>
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" className="btn btn-info">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row m-0  justify-content-md-center">
        <div className="col-md-4 m-1">
          <div className="card">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img
                  src="https://img.icons8.com/color/96/000000/teacher.png"
                  className="admin-card-img "
                />
              </div>
              <div class="col-md-8">
                <div className="card-body text-right">
                  <h5 className="card-title">Faculty</h5>
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 m-1">
          <div className="card">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img
                  src="https://img.icons8.com/color/96/000000/time-machine--v1.png"
                  className="admin-card-img "
                />
              </div>
              <div class="col-md-8">
                <div className="card-body text-right">
                  <h5 className="card-title">Faculty</h5>
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
