import { Row, Col, Container, Image } from "react-bootstrap";
import * as React from "react";
import "./dashboard.css";
import Sgpigraph from "./sgpigraph";
import TimeTable from "../../images/timetable.png";

import { Chart, PieSeries, Title } from "@devexpress/dx-react-chart-bootstrap4";
import "@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css";
import { Animation } from "@devexpress/dx-react-chart";

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
      <Container fluid="md">
        <Row className="chart-row vh-100">
          <Col md={4}>
            <Chart data={chartData} className="chart">
              <PieSeries
                valueField="val"
                argumentField="score"
                innerRadius={0.7}
              />
              <Title text="CGPA" />
              <Animation />
            </Chart>
            <span>8.4</span>
          </Col>
          <Col>
            <Sgpigraph />
          </Col>
        </Row>
      </Container>
    );
  }
}
