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

beforeEach(async () => {
    await Student.deleteMany({});
    await Student(initialStudents[0]).save();
});

describe("Test Register / Login ", () => {
  it("Should save user to database", async () => {
    const res = await api
      .post("/student/register")
      .send(initialStudents[0]);
      
    expect(201).toBeTruthy();
  }, 9999);

  it("Should Login Student if details are correct", async () => {
    // student = await loginStudent(initialStudents[0]);
    const studentres = await api
      .post("/student/login")
      .send({
        email: initialStudents[0].email,
        password: "password",
      });

    expect(200).toBeTruthy();
  });

  it("Should give 403 Invalid Password if password is Wrong", async () => {
    // student = await loginStudent(initialStudents[0]);
    const studentres = await api
      .post("/student/login")
      .send({
        email: initialStudents[0].email,
        password: "pswd",
      });
    
      expect(403).toBeTruthy();
  });
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
  it("Student views Calendar after successful Login ",async () => {
    student = await loginStudent(initialStudents[0]);
    // console.log(student);
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
    // console.log(student);
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
    // console.log(student);
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
    // console.log(student);
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
    // console.log(student);
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

  it("Student fees status : FALSE ", async () => {
    student = await loginStudent(initialStudents[0]);
    const decoded = jwt.verify(student, process.env.TOKEN_SECRET);  
    var userId = decoded._id  
    // console.log(userId) 
    const exists = await Student.findOne({_id: userId});
    const res = await api
      .post("/student/feestatus/update")
      .set("auth-token", student)
      .send({fees_paid: false});
      // .expect(200);
      // console.log(exists.fees_paid);
      expect(exists.fees_paid).toBe(false);
  });

  it("ERROR: Student fees status WRONG ", async () => {
    student = await loginStudent(initialStudents[0]);
    const decoded = jwt.verify(student, process.env.TOKEN_SECRET);  
    var userId = decoded._id  
    // console.log(userId) 
    const exists = await Student.findOne({_id: userId});
    const res = await api
      .post("/student/feestatus/update")
      .set("auth-token", student)
      .send({fees_paid: true});
      // console.log(res.body);
      
      expect(exists.fees_paid).toBe(false);
      // expect(200);
  });

  it("Student has opted subjects ", async () => {
    student = await loginStudent(initialStudents[0]);
    const decoded = jwt.verify(student, process.env.TOKEN_SECRET);  
    var userId = decoded._id  
    // console.log(userId) 
    const exists = await Student.findOne({_id: userId});
 
    const arr = ["1", "3"];
    const res =await api
      .post("/student/courseregn/opted")
      .set("auth-token", student)
      .send({course_opted: arr});
      // .expect(200);
      // console.log(exists.fees_paid);
      const exists1= await Student.findOne({_id: userId});
      // console.log(exists1);
         expect(exists1.registered_course).toHaveLength(2);
      
  });

  // it("ERROR: Student Student has opted WRONG subjects ", async () => {
  //   student = await loginStudent(initialStudents[0]);
  //   const decoded = jwt.verify(student, process.env.TOKEN_SECRET);  
  //   var userId = decoded._id  
  //   // console.log(userId) 
  //   const exists = await Student.findOne({_id: userId});
  //   const arr = ["1", "3"];
  //   const res = await api
  //     .post("/student/courseregn/opted")
  //     .set("auth-token", student)
  //     .send({course_opted: arr});
  //     // .expect(200);
  //     // console.log(exists.fees_paid);
  //     expect(exists.registered_course).toHaveLength(5);
  // });


});

afterAll(() => {
  mongoose.connection.close();
});
