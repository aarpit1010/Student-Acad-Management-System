import React from "react";
import "./adminDashboard.css";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <React.Fragment>
      <div className="admin-dashboard mx-auto pb-3">
        <br />
        <h1>Admin Dashboard</h1>
        <br />
        <div className="row ml-0 mr-0 justify-content-md-center mb-3">
          <div className="col-md-4 m-1">
            <div className="card shadow rounded">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    src="https://img.icons8.com/color/96/000000/edit-file.png"
                    className="admin-card-img"
                    alt="admin-card-img"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body  text-right">
                    <h5 className="card-title">Student Info</h5>
                    <p className="card-text">
                      Edit Students' information or marks here.
                    </p>
                    <Link
                      to="/admin/editStudentProfile"
                      className="a-dashboard-button"
                    >
                      <button type="button" className="btn btn-success">
                        Student List
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 m-1">
            <div className="card shadow rounded">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    src="https://img.icons8.com/color/96/000000/commercial.png"
                    className="admin-card-img"
                    alt="admin-card-img"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body text-right">
                    <h5 className="card-title">Announcements</h5>
                    <p className="card-text">
                      Add or delete important announcements and official
                      notices.
                    </p>
                    <Link
                      to="/admin/announcements"
                      className="a-dashboard-button"
                    >
                      <button type="button" className="btn btn-success">
                        Announcements
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row ml-0 mr-0 mb-3 justify-content-md-center">
          <div className="col-md-4 m-1">
            <div className="card shadow rounded">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    src="https://img.icons8.com/color/96/000000/calendar--v2.png"
                    className="admin-card-img"
                    alt="admin-card-img"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body text-right">
                    <h5 className="card-title">Academic Calendar</h5>
                    <p className="card-text">
                      Add a new Academic Calendar or modify the existing one.
                    </p>
                    <Link
                      to="/admin/academicCalendar"
                      className="a-dashboard-button"
                    >
                      <button type="button" className="btn btn-info">
                        Upload new
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 m-1">
            <div className="card shadow rounded">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    src="https://img.icons8.com/color/96/000000/diploma.png"
                    className="admin-card-img"
                    alt="admin-card-img"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body text-right">
                    <h5 className="card-title">Certificates</h5>
                    <p className="card-text">
                      Check requests by students for Certificates.
                    </p>
                    <Link
                      to="/admin/grantCertificates"
                      className="a-dashboard-button"
                    >
                      <button type="button" className="btn btn-info">
                        View requests
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row ml-0 mr-0 mb-3 justify-content-md-center">
          <div className="col-md-4 m-1">
            <div className="card shadow rounded">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    src="https://img.icons8.com/color/96/000000/teacher.png"
                    className="admin-card-img"
                    alt="admin-card-img"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body text-right">
                    <h5 className="card-title">Faculty</h5>
                    <p className="card-text">
                      Add or delete entries from the list of faculty.
                    </p>
                    <Link to="/admin/faculty" className="a-dashboard-button">
                      <button type="button" className="btn btn-primary">
                        Faculty List
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 m-1">
            <div className="card shadow rounded">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    src="https://img.icons8.com/color/96/000000/time-machine--v1.png"
                    className="admin-card-img"
                    alt="admin-card-img"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body text-right">
                    <h5 className="card-title">Logs</h5>
                    <p className="card-text">
                      Check out the log report for the website.
                    </p>
                    <Link to="/admin/logs" className="a-dashboard-button">
                      <button type="button" className="btn btn-primary">
                        Log Report
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row ml-0 mr-0 mb-3 justify-content-md-center">
          <div className="col-md-4 m-1">
            <div className="card shadow rounded">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    src="https://img.icons8.com/color/96/000000/attendance-mark.png"
                    className="admin-card-img"
                    alt="admin-card-img"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body text-right">
                    <h5 className="card-title">Attendance</h5>
                    <p className="card-text">
                      Enter the attendance record for Students.
                    </p>
                    <Link to="/admin/attendance" className="a-dashboard-button">
                      <button type="button" className="btn btn-success">
                        Enter attendance
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 m-1">
            <div className="card shadow rounded">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    src="https://img.icons8.com/fluent/96/000000/fail.png"
                    className="admin-card-img"
                    alt="admin-card-img"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body text-right">
                    <h5 className="card-title">Student List</h5>
                    <p className="card-text">
                      Check out the official list of all students enrolled in
                      the institute.
                    </p>
                    <Link
                      to="/admin/studentList"
                      className="a-dashboard-button"
                    >
                      <button type="button" className="btn btn-success">
                        Student List
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AdminDashboard;
