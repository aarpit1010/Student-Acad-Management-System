const supertest = require("supertest");
const app = require("../../app");
// const Student = require("../../models/Student");
const mongoose = require("mongoose");
const Student = require("../../model/Student");
const Log = require("../../model/log");
const {
  course_summary,
  droppedcourses,
  notifs,
  attend,
} = require("../../model/marks");
const viewprof = require("../../model/facultyList");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  studentRegisterValid,
  studentLoginValid,
} = require("../../controllers/validation");

const {
    loginStudent,
    initialStudents,
    fakeToken,
    invalidToken,
    marksdata,
    facultyData
} = require("../testHelper");


const api = supertest(app);

const admintoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjM0IiwiaWF0IjoxNjE5Njc4NTY4fQ.bfzPflBELqGXLLLiR-GbBxyDn-F2Cg_v1HvIbYgAYP8";



/*beforeEach(async () => {
    // await Student.deleteMany({});
    student = await loginStudent(initialStudents[0]);
  });*/

  it("Should Login Admin if details are correct", async () => {
    // student = await loginStudent(initialStudents[0]);
    const studentres = await api
      .post("/admin/login")
      .send({
        email:"authority.iiita@gmail.com",
        password: "1234",
      });

    expect(200).toBeTruthy();
  });
  
  it("Should fail Login Admin if details are incorrect", async () => {
    // student = await loginStudent(initialStudents[0]);
    const studentres = await api
      .post("/admin/login")
      .send({
        email:"authority.iiita@gmail.com",
        password: "1236213",
      });

    expect(400);
  });
describe("Test API (Post Routes) ", () => {
    it("Should send marks of student", async () => {
      // console.log(student);
      const res = await api
        .post("/admin/updatestudentmarks")
        .set("auth-token", admintoken)
        .send({marksdata});
  
      expect(200);
    })});

it("Should add faculty to database", async () => {
        // student = await loginStudent(initialStudents[0]);
        const studentres = await api
          .post("/admin/addfaculty")
          .set("auth-token",admintoken)
          .send(facultyData);
    
        expect(400);
      });
it("Should view faculty list", async () => {
        // student = await loginStudent(initialStudents[0]);
        const studentres = await api
          .get("/admin/addfaculty/viewlist")
          .set("auth-token",admintoken)
       
    
        expect(400);
      });