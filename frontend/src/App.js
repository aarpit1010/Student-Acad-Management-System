import React from "react";
import "./App.css";
import Sidebar from "./components/sidebar/newSidebar";

import AdminLoginPage from "./admin-pages/adminLogin";
import StudentLoginPage from "./pages/login";
import AcademicRegistration from "./pages/acadRegistration/acadRegistration";
import Certificates from "./pages/certificates";
import CourseSummary from "./pages/course-summary";
import Dashboard from "./components/dashboard/dashboard";
import Faculty from "./pages/faculty";
import SemwiseCourses from "./pages/semwise-courses";
import Register from "./pages/registration";
import Profile from "./pages/profile";
import AdminNav from "./admin-pages/adminNav";
import AcademicCalendar from "./admin-pages/academicCalendar";
import Notifications from "./pages/notifications";
import Calendar from "./pages/calendar";
import BlankSem from "./pages/acadRegistration/blankSem";
import Fees from "./pages/fees";
import CourseSelection from "./pages/acadRegistration/courseSelection";
import Footer from "./components/footer/footer";

import SelectUser from "./pages/user-selection";
import EditStudentProfile from "./admin-pages/editStudentProfile";
import Message from "./components/email/Message";
import Announcements from "./admin-pages/announcements";
import Logs from "./admin-pages/logs";
import AdminFaculty from "./admin-pages/adminFaculty";
import AdminEmail from "./admin-pages/adminEmail";
import AdminCertificates from "./admin-pages/adminCertificates";
import StudentList from "./admin-pages/studentList";
import Attendance from "./admin-pages/attendance";

import Navbar from "./components/navbar/navbar";
import Auth from "./auth/Auth";

import StudentProtectedRoute from "./auth/StudentProtectedRoute";
import AdminProtectedRoute from "./auth/AdminProtectedRoute";

import { Redirect, Route, Switch } from "react-router-dom";
import AdminDashboard from "./admin-pages/adminDashboard";
import SubmitPage from "./pages/acadRegistration/submit";

function App() {
    return (
        <React.Fragment>
            <Switch>
                <Route exact path="/selectUser" component={SelectUser} />
                <Route path="/admin">
                    <AdminNav hasAuth={Auth.isAuthenticatedStudent()} />
                    <AdminProtectedRoute
                        exact
                        path="/admin/adminDashboard"
                        component={AdminDashboard}
                    />
                    <AdminProtectedRoute
                        exact
                        path="/admin/editStudentProfile"
                        component={EditStudentProfile}
                    />
                    <AdminProtectedRoute
                        exact
                        path="/admin/announcements"
                        component={Announcements}
                    />
                    <AdminProtectedRoute
                        exact
                        path="/admin/academicCalendar"
                        component={AcademicCalendar}
                    />
                    <AdminProtectedRoute
                        exact
                        path="/admin/faculty"
                        component={AdminFaculty}
                    />
                    <AdminProtectedRoute
                        exact
                        path="/admin/send"
                        component={AdminEmail}
                    />
                    <AdminProtectedRoute
                        exact
                        path="/admin/grantCertificates"
                        component={AdminCertificates}
                    />
                    <AdminProtectedRoute
                        exact
                        path="/admin/studentList"
                        component={StudentList}
                    />
                    <AdminProtectedRoute
                        exact
                        path="/admin/logs"
                        component={Logs}
                    />
                    <AdminProtectedRoute
                        exact
                        path="/admin/attendance"
                        component={Attendance}
                    />

                    <Route path="/admin/*">
                        <Redirect to="/admin/adminDashboard" />
                    </Route>
                </Route>

                <Route exact path="/register" component={Register} />
                <Route path="/student">
                    <div className="App">
                        <div className="container-fluid h-100">
                            <div className="row h-100">
                                <div className="col-md-auto sidebar p-0">
                                    <Sidebar
                                        hasAuth={Auth.isAuthenticatedStudent()}
                                    />
                                </div>
                                <div className="col p-0">
                                    <div className="row m-0">
                                        <div className="col p-0">
                                            <Navbar
                                                hasAuth={Auth.isAuthenticatedStudent()}
                                            />
                                        </div>
                                    </div>
                                    <div className="row m-0">
                                        <div className="col main-col w-100 pl-3 pr-3">
                                            <StudentProtectedRoute
                                                exact
                                                path="/student/studentDashboard"
                                                component={Dashboard}
                                            />
                                            <StudentProtectedRoute
                                                exact
                                                path="/student/academicRegistration"
                                                component={AcademicRegistration}
                                            />
                                            <StudentProtectedRoute
                                                exact
                                                path="/student/blankSem"
                                                component={BlankSem}
                                            />
                                            <StudentProtectedRoute
                                                exact
                                                path="/student/submitPage"
                                                component={SubmitPage}
                                            />
                                            <StudentProtectedRoute
                                                exact
                                                path="/student/CourseSelection"
                                                component={CourseSelection}
                                            />
                                            <StudentProtectedRoute
                                                exact
                                                path="/student/certificates"
                                                component={Certificates}
                                            />
                                            <StudentProtectedRoute
                                                exact
                                                path="/student/fees"
                                                component={Fees}
                                            />
                                            <StudentProtectedRoute
                                                exact
                                                path="/student/course-summary"
                                                component={CourseSummary}
                                            />
                                            <StudentProtectedRoute
                                                exact
                                                path="/student/faculty"
                                                component={Faculty}
                                            />
                                            <StudentProtectedRoute
                                                exact
                                                path="/student/semwise-courses"
                                                component={SemwiseCourses}
                                            />
                                            <StudentProtectedRoute
                                                exact
                                                path="/student/profile"
                                                component={Profile}
                                            />
                                            <StudentProtectedRoute
                                                exact
                                                path="/student/email"
                                                component={Message}
                                            />
                                            <StudentProtectedRoute
                                                exact
                                                path="/student/notifications"
                                                component={Notifications}
                                            />
                                            <StudentProtectedRoute
                                                exact
                                                path="/student/viewCalendar"
                                                component={Calendar}
                                            />
                                            <Route path="/student/*">
                                                <Redirect to="/student/studentDashboard" />
                                            </Route>
                                        </div>
                                    </div>
                                    <div className="row m-0 p-0">
                                        <Footer />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Route>
                <Route exact path="/">
                    <Redirect to="/selectUser" />
                </Route>
                <Route
                    exact
                    path="/studentLogin"
                    component={StudentLoginPage}
                />
                <Route exact path="/adminLogin" component={AdminLoginPage} />
                <Route path="*" component={() => <h1>404 NOT FOUND</h1>} />
            </Switch>
        </React.Fragment>
    );
}

export default App;
