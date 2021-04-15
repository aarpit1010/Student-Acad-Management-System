import { Row, Col, Container } from "react-bootstrap";
import * as React from "react";
import Timetable from "./timetable";
import "./dashboard.css";
import Sgpigraph from "./sgpigraph";
import Cgpagraph from "./cgpagraph";
import "@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css";

export default class Demo extends React.Component {
  render() {
    return (
      <div className="pt-3">
        <Container fluid="md">
          <Row className="chart-row">
            <Col md={4} className="cgpa card shadow">
              <Cgpagraph />
            </Col>
            <Col className="graph">
              <Sgpigraph />
            </Col>
          </Row>
          <Row className="mt-5">
            <h2 style={{ textAlign: "center" }} className="pb-3">
              Timetable for the current semester
            </h2>
            <Col>
              <Timetable />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
