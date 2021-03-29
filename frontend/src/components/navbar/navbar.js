import React from "react";
import "./navbar.css";
import { Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Auth from "../../auth/Auth";
import { useHistory } from "react-router-dom";

function Navigation(hasAuth) {
    const history = useHistory();

    const handleLogout = () => {
        Auth.logoutStudent(() => {
            localStorage.clear();
            history.push("/selectUser");
        });
    };

    if (hasAuth)
        return (
            <div className="navbar-student">
                <Navbar>
                    {/* <Navbar.Brand className="portal-name">Student Portal</Navbar.Brand> */}
                    <Nav className="ml-auto items">
                        <Link to="/student/profile">Profile</Link>
                        <Link to="/student/notifications">Notifications</Link>
                        <Button onClick={() => handleLogout()}>Logout</Button>
                    </Nav>
                </Navbar>
            </div>
        );
    else return <></>;
}

export default Navigation;
