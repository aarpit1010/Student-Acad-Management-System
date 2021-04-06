import { Row, Col, Container } from "react-bootstrap";
import * as React from "react";
import Timetable from "./timetable";
import TimeProfile from "./timeProfile";
import "./dashboard.css";
import Sgpigraph from "./sgpigraph";

import { Chart, PieSeries, Title } from "@devexpress/dx-react-chart-bootstrap4";
import "@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css";
import { Animation } from "@devexpress/dx-react-chart";
import axios from "axios";

const data = [
  { score: "score", val: 8.4 },
  { score: "", val: 1.6 },
];

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <div className="pt-3">
        <Container fluid="md">
          <Row className="chart-row">
            <Col md={4} className="cgpa card shadow">
              <Chart data={chartData} className="chart">
                <PieSeries
                  valueField="val"
                  argumentField="score"
                  innerRadius={0.7}
                />
                <Title text="CGPA" />
                <Animation />
              </Chart>
              <h2 style={{ textAlign: "center" }}>8.4</h2>
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
