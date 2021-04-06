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
} = require("../testHelper");

const api = supertest(app);

let student;

// beforeEach(async () => {
//     // await mongoose.connect(
//     //     process.env.DB_CONNECT,
//     //     { useUnifiedTopology: true,
//     //       useNewUrlParser: true,
//     //       useFindAndModify: false,
//     //       useCreateIndex: true },
//     //     () => console.log("Connected to Testing MongoDB")
//     // );
// }

it("Should save user to database", async () => {
  const res = await api.post("/student/register").send(initialStudents[0]);
  expect(201).toBeTruthy();
}, 9999);

it("Should Login Student if details are correct", async () => {
  // student = await loginStudent(initialStudents[0]);
  const studentres = await api.post("/student/login").send({
    email: initialStudents[0].email,
    password: "password",
  });
  expect(200).toBeTruthy();
});

it("Should give 403 Invalid Password if password is Wrong", async () => {
  // student = await loginStudent(initialStudents[0]);
  const studentres = await api.post("/student/login").send({
    email: initialStudents[0].email,
    password: "pswd",
  });
  expect(403).toBeTruthy();
});

describe("Test API (GET Routes) ", () => {
  it("Student views Notifications after successful Login ", async () => {
    student = await loginStudent(initialStudents[0]);
    // console.log(student);
    const res = await api
      .get("/student/notifications")
      .set("auth-token", student)
      .send({});

    expect(200);
  });

  it("ERROR: Student tries to view Notifications after unsuccessful Login", async () => {
    const res = await api
      .get("/student/notifications")
      .set("auth-token", "somerandomjwttoken")
      .send({});

    expect(400);
  });
  // });

  // describe('Test API and mock NPM Modules', () => {
  it("Student views Calendar after successful Login ", () => {
    student = loginStudent(initialStudents[0]);
    console.log(student);
    const res = api
      .get("/student/viewcalendar")
      .set("auth-token", student)
      .send({});

    expect(200);
  }, 9999);

  it("ERROR: Student tries to view Calendar after unsuccessful Login ", async () => {
    const res = await api
      .get("/student/viewcalendar")
      .set("auth-token", "somerandomjwttoken")
      .send({});

    expect(400);
  }, 9999);
  // });

  // describe('Test API and mock NPM Modules', () => {
  it("Student views Certificate after successful Login ", async () => {
    student = await loginStudent(initialStudents[0]);
    console.log(student);
    const res = await api
      .get("/student/viewcertificate")
      .set("auth-token", student)
      .send({});

    expect(200);
  });

  it("ERROR: Student tries to view Certificate after unsuccessful Login ", async () => {
    const res = await api
      .get("/student/viewcertificate")
      .set("auth-token", "somerandomjwttoken")
      .send({});

    expect(400);
  });
  // });

  // describe('Test API and mock NPM Modules', () => {
  it("Student views Course List for next SEM after successful Login ", async () => {
    student = await loginStudent(initialStudents[0]);
    console.log(student);
    const res = await api
      .get("/student/courseregn")
      .set("auth-token", student)
      .send({});

    expect(200);
  });

  it("ERROR: Student tries to view Course List for next SEM after unsuccessful Login ", async () => {
    const res = await api
      .get("/student/courseregn")
      .set("auth-token", "somerandomjwttoken")
      .send({});

    expect(400);
  });
  // });

  // describe('Test API and mock NPM Modules', () => {
  it("Student views Registered Course List for next SEM after successful Login ", async () => {
    student = await loginStudent(initialStudents[0]);
    console.log(student);
    const res = await api
      .get("/student/courseregn/opted/list")
      .set("auth-token", student)
      .send({});

    expect(200);
  });

  it("ERROR: Student tries to view Registered Course List for next SEM after unsuccessful Login ", async () => {
    const res = await api
      .get("/student/courseregn/opted/list")
      .set("auth-token", "somerandomjwttoken")
      .send({});

    expect(400);
  });
  // });

  // describe('Test API and mock NPM Modules', () => {
  it("Student views their Attendance after successful Login ", async () => {
    student = await loginStudent(initialStudents[0]);
    console.log(student);
    const res = await api
      .get("/student/attendance")
      .set("auth-token", student)
      .send({});

    expect(200);
  });

  it("ERROR: Student tries to view Attendance after unsuccessful Login ", async () => {
    const res = await api
      .get("/student/attendance")
      .set("auth-token", "somerandomjwttoken")
      .send({});

    expect(400);
  });
  // });

  // describe('Test API and mock NPM Modules', () => {
  it("Student has paid fees after successful Login ", async () => {
    student = await loginStudent(initialStudents[0]);
    console.log(student);
    const res = await api
      .get("/student/feestatus")
      .set("auth-token", student)
      .send({});

    expect(200);
  });

  it("ERROR: Student tries to access fees page after unsuccessful Login ", async () => {
    const res = await api
      .get("/student/feestatus")
      .set("auth-token", "somerandomjwttoken")
      .send({});

    expect(400);
  });
});

describe("Test API (POST Routes) ", () => {
  it("ERROR: Student tries to access fees page after unsuccessful Login ", async () => {
    const res = await api
      .post("/student/send")
      .set("auth-token", student)
      .send({});

    expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
