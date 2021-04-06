import React, { useEffect, useState } from "react";
// import "./TimeProfile.css";

function TimeProfile() {
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(`${year}-05-15`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        D: Math.floor(difference / (1000 * 60 * 60 * 24)),
        H: Math.floor((difference / (1000 * 60 * 60)) % 24),
        M: Math.floor((difference / 1000 / 60) % 60),
        S: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}
        {" : "}
      </span>
    );
  });
  return (
    <div>
      {/* <h2>With React Hooks!</h2> */}
      <h6>
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </h6>
    </div>
  );
}

export default TimeProfile;
