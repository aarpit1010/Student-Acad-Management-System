import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Fees() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const { handleSubmit } = useForm();

  useEffect(() => {
    axios
      .get("/student/feestatus", {
        headers: {
          "auth-token": localStorage.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, [data]);

  if (isLoading) {
    return <div className="Course-Summary">Loading...</div>;
  }

  const onSubmit = () => {
    axios
      .post(
        "/student/feestatus/update",
        { fees_paid: true },
        {
          headers: {
            "auth-token": localStorage.token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
    alert("Fees Paid Successfully!");
  };

  return (
    <div style={{ paddingTop: "200px", textAlign: "center" }}>
      <div className="card w-75 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body">
            <h2>Fee status for the current semester</h2>
            <h1>Status: {data === false ? "Not paid" : "Paid"}</h1>
            <button
              type="submit"
              className="btn-lg btn-primary"
              disabled={data}
            >
              Pay Fees
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
