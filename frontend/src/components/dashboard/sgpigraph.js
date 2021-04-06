import * as React from "react";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-bootstrap4";
import "@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css";
import { Animation } from "@devexpress/dx-react-chart";

const data = [
  { Semester: "I", SGPI: 7.9 },
  { Semester: "II", SGPI: 8.3 },
  { Semester: "III", SGPI: 8.8 },
  { Semester: "IV", SGPI: 0 },
  { Semester: "V", SGPI: 0 },
  { Semester: "VI", SGPI: 0 },
  { Semester: "VII", SGPI: 0 },
];

export default class Sgpigraph extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <div className="card p-0">
        <Chart data={chartData}>
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries valueField="SGPI" argumentField="Semester" />
          <Title text="SGPI Graph" />
          <Animation />
        </Chart>
      </div>
    );
  }
}
