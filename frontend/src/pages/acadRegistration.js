import React from "react";
import { Link } from "react-router-dom";
import "./acadRegistration.css";
import { Tabs, Tab } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const AcademicRegistration = () => {
  return (
    <Tabs defaultActiveKey="blankSem" id="uncontrolled-tab-example">
      {/* <Link to="/student/blankSem"> */}
      <Tab eventKey="blankSem" title="Blank Sem">
        <div className="card">
          <div className="card-body"></div>
        </div>
      </Tab>
      {/* </Link> */}
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
