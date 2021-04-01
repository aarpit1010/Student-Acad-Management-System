import React from "react";
import "./editStudentProfile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function EditStudentProfile() {
  const { register, handleSubmit, watch, setValue, reset } = useForm();

  const [isLoading, setLoading] = useState(true);
  const [foundStudent, setFoundStudent] = useState({});
  const [profileData, setProfileData] = useState({});
  const [enrolledCourseData, setEnrolledCourseData] = useState([
    { course: { course_ID: null, course_Name: null }, marks: {} },
  ]);

  useEffect(() => {
    axios
      .get("/admin/profile-all", {
        headers: {
          "admin-auth-token": localStorage.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setProfileData(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const fetchStudentDetails = () => {
    const enrollment_no = watch("enrollment_no");
    const found = profileData.student.find((stud) =>
      stud.username.toLowerCase().includes(enrollment_no.toLowerCase())
    );

    if (found) {
      const student = Object.assign(found);
      setValue("enrollment_no", student.username);
      setValue("access", student.access);
      setValue("contact", student.contact);
      setValue("name", student.name);
      setValue("email", student.email);
      setValue("branch", student.branch);
      setValue("semester", student.semester);
      setValue("section", student.section);
      // console.log(student.name, student.username);

      /*-------------------------------------------------------------*/

      /*-------------------------------------------------------------*/

      setFoundStudent(found);

      const array = [];
      const course = profileData.enrolled_courses.find(
        (c) => c.semester === student.semester
      );
      course.course_list.forEach((i1, index) => {
        const details = {};

        details.course_ID = i1.course_ID;
        details.course_Name = i1.course_Name;

        details.marks = profileData.marks.find(
          (s) => s.enrollment === student.username
        ).semester_marks[index].marks;
        array.push(details);
      });
      setEnrolledCourseData(array);
      // console.log("RESPONSE::", {
      //   foundStudent,
      //   enrolledCourseData,
      // });
      // console.log("PROFILE-ALL::", profileData);
    } else {
      console.log("NO STUDENT FOUND!");
      reset();
      alert("NO STUDENT FOUND!");
      setEnrolledCourseData([]);
    }
  };

  //   const onSubmit = ({ enrollment_no, name, contact }) => {
  //     console.log({ enrollment_no, name, contact });
  //     const updatedData = {
  //       ...foundStudent,
  //       enrolledCourseData,
  //     };
  //     axios
  //       .post(
  //         "/admin/updatestudentmarks",
  //         { profileData: updatedData },
  //         {
  //           headers: {
  //             "admin-auth-token": localStorage.token,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       )
  //       .then((res) => console.log(res))
  //       .catch((err) => console.log(err));

  //     console.log("FORM SUBMITTED");
  //   };

  const onSubmit = (data) => {
    console.log(data);
    const updatedMarksData = [];
    console.log("ENROLLED COURSE DATA", enrolledCourseData);

    enrolledCourseData.forEach((course, courseKey) => {
      if (course.marks.c1 !== data.C1[courseKey]) {
        setValue(enrolledCourseData[courseKey].marks.c1, data.C1[courseKey]);
        console.log(enrolledCourseData[courseKey].marks.c1);
        console.log(data.C1[courseKey]);
      }
    });
  };

  if (isLoading) {
    return <div className="Course-Summary">Loading...</div>;
  }

  return (
    <div className="edit-student-profile">
      <h3 id="student-details">Student Details</h3>
      <img
        src="https://img.icons8.com/color/96/000000/student-male--v1.png"
        className="student-details-img"
        alt="student-details-img"
      />
      <div className="card col-md-10 mx-auto p-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="lastName">Enrolment No.</label>
              <input
                ref={register}
                type="text"
                className="form-control"
                id="enrollment_no"
                name="enrollment_no"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="firstName">Contact</label>
              <input
                ref={register}
                type="contact"
                id="contact"
                name="contact"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="lastName">Enable Access</label>
              <input
                ref={register}
                type="text"
                className="form-control"
                id="access"
                name="access"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Name</label>
              <input
                ref={register}
                type="text"
                className="form-control"
                id="name"
                name="name"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                disabled
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="branch">Branch</label>
              <input
                type="text"
                id="branch"
                name="branch"
                className="form-control"
                disabled
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="semester">Semester</label>
              <input
                type="text"
                id="semester"
                name="semester"
                className="form-control"
                disabled
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="section">Section</label>
              <input
                type="text"
                id="section"
                name="section"
                className="form-control"
                disabled
              />
            </div>
            <button
              type="button"
              className="btn btn-warning mx-auto"
              onClick={() => fetchStudentDetails()}
            >
              Fetch Student Details
            </button>
          </div>
          <div className="form-row">
            <h4>Enrolled Courses: </h4>
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">C.Id.</th>
                  <th scope="col">C.Name</th>
                  <th scope="col">C1 Marks</th>
                  <th scope="col">C2 Marks</th>
                  <th scope="col">C3 Marks</th>
                  <th scope="col">Total</th>
                  <th scope="col">GPA</th>
                </tr>
              </thead>
              <tbody>
                {enrolledCourseData?.map((c, courseKey) => {
                  return (
                    <tr key={courseKey}>
                      <td>
                        <input
                          type="text"
                          className="form-control p-1"
                          placeholder={c.course_ID}
                          disabled
                        />
                      </td>
                      <td width="30%">
                        <input
                          type="text"
                          className="form-control p-1"
                          placeholder={c.course_Name}
                          disabled
                        />
                      </td>
                      <td>
                        <input
                          ref={register}
                          name={`C1[${courseKey}]`}
                          type="text"
                          className="form-control p-1"
                          placeholder={c.marks.c1}
                        />
                      </td>
                      <td>
                        <input
                          ref={register}
                          name={`C2[${courseKey}]`}
                          type="text"
                          className="form-control p-1"
                          placeholder={c.marks.c2}
                        />
                      </td>
                      <td>
                        <input
                          ref={register}
                          name={`C3[${courseKey}]`}
                          type="text"
                          className="form-control p-1"
                          placeholder={c.marks.c3}
                        />
                      </td>
                      <td>
                        <input
                          ref={register}
                          name={`Total[${courseKey}]`}
                          type="text"
                          className="form-control p-1"
                          placeholder={c.marks.total}
                        />
                      </td>
                      <td>
                        <input
                          ref={register}
                          name={`Gpa[${courseKey}]`}
                          type="text"
                          className="form-control p-1"
                          placeholder={c.marks.gpa}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <button type="submit" className="btn btn-primary">
            Confirm Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditStudentProfile;
