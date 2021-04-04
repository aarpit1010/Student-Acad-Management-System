import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Calendar() {
  const [isLoading, setLoading] = useState(true);
  const [cal, setCal] = useState("");

  useEffect(() => {
    axios
      .get("/student/viewcalendar", {
        headers: {
          "auth-token": localStorage.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCal(response.data);
        setLoading(false);
        console.log(cal);
      })
      .catch((error) => console.log(error));
  }, [cal]);

  if (isLoading) {
    return <div className="Course-Summary">Loading...</div>;
  }
  return (
    <div>
      <a href={cal} target="_blank" rel="noreferrer">
        CSV
      </a>
    </div>
  );
}
