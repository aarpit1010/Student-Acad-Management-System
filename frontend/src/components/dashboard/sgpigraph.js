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
import axios from "axios";

let data = [
    { Semester: "I", SGPI: 0 },
    { Semester: "II", SGPI: 0 },
    { Semester: "III", SGPI: 0 },
    { Semester: "IV", SGPI: 0 },
    { Semester: "V", SGPI: 0 },
    { Semester: "VI", SGPI: 0 },
    { Semester: "VII", SGPI: 0 },
];

function setSGPI(...arr) {
    for (let i = 0; i < arr[0].length; i++) {
        data[i].SGPI = arr[0][i];
    }
}

export default class Sgpigraph extends React.PureComponent {
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
        setSGPI(profile.sgpi);
    };

    render() {
        const { data: chartData } = this.state;

        return (
            <div className="card p-0">
                <Chart data={chartData}>
                    <ArgumentAxis />
                    <ValueAxis max={8} />

                    <BarSeries valueField="SGPI" argumentField="Semester" />
                    <Title text="SGPI Graph" />
                    <Animation />
                </Chart>
            </div>
        );
    }
}
