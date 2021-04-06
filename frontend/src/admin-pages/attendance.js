import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Attendance() {
  const [isLoading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState(null);

  const { register, handleSubmit, watch } = useForm();
  const fetchStudentDetails = () => {
    const enrollment = watch("enrollment");
    const responseObject = { enrollment: enrollment.toLowerCase() };
    console.log(responseObject);

    axios
      .post("/admin/getattendance", responseObject, {
        headers: {
          "admin-auth-token": localStorage.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setAttendanceData(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log({ error });
        console.log({ TOKEN: localStorage.token });
      });
  };

  const onSubmit = (data) => {
    //     const responseObject = { enrollment: enrollment.toLowerCase() };
    console.log(data);
    const updatedData = attendanceData;

    Object.keys(updatedData.subjects_attend).forEach((i) => {
      if (data.attendance[i].trim() !== "") {
        updatedData.subjects_attend[i].daysoutof90 = data.attendance[i];
      }
    });

    console.log(updatedData);

    axios
      .post("/admin/attendance", updatedData, {
        headers: {
          "admin-auth-token": localStorage.token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === (200 || 201)) {
          alert("Attendance Record successfully Added!");
        }
      })
      .catch((error) => {
        console.log({ error });
        console.log({ TOKEN: localStorage.token });
      });
  };

  //   if (isLoading) {
  //     return <div className="Course-Summary">Loading...</div>;
  //   }

  return (
    <div className="admin-certificates-page pt-5">
      <div className="card col-md-8 mx-auto">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h5>Enter the Attendance Record of any Student.</h5>
            <div className="form-group">
              <label htmlFor="enrollment">Enrollment no.</label>
              <input
                type="text"
                className="form-control"
                id="enrollment"
                name="enrollment"
                placeholder="IIT20XX001"
                ref={register}
              />
            </div>
            <button
              type="button"
              className="btn btn-warning mx-auto"
              onClick={() => fetchStudentDetails()}
            >
              Fetch Student's Attendance
            </button>
            <h5>Courses</h5>
            {attendanceData?.subjects_attend.map((item, key) => {
              return (
                <div className="form-row" key={key}>
                  <div className="col-md-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={item.course_ID}
                      disabled
                      name="cID"
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={item.course_Name}
                      disabled
                      name="cName"
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={item.daysoutof90}
                      ref={register}
                      name={`attendance[${key}]`}
                    />
                  </div>
                </div>
              );
            })}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
