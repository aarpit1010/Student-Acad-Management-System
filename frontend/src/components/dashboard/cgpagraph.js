import React, { Component, Suspense } from "react";
import { useEffect, useState } from "react";
import { Chart, Title, PieSeries } from "@devexpress/dx-react-chart-bootstrap4";
import "@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css";
import { Animation } from "@devexpress/dx-react-chart";
import axios from "axios";

let data = [
  { score: "score", val: 0 },
  { score: "", val: 0 },
];

function setCGPA(...arr) {
  data[0].val = arr[0];
  data[1].val = 10 - arr[0];
  //   setData(data);
}

export default class Sgpigraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }
  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let res = await axios.get("/student/profile", {
      headers: {
        "auth-token": localStorage.token,
        "Content-Type": "application/json",
      },
    });

    const profile = res.data;
    setCGPA(profile.cgpi);
  };

  render() {
    const { data: chartData } = this.state;

    return (
      <div className="card p-0">
        <Suspense fallback={<h1>Loading data...</h1>}>
          <Chart data={chartData} className="chart">
            <PieSeries
              valueField="val"
              argumentField="score"
              innerRadius={0.7}
            />
            <Title text="CGPA" />
            <Animation />
          </Chart>
          <h2 style={{ textAlign: "center" }}>{this.state.data[0].val}</h2>
        </Suspense>
      </div>
    );
  }
}
