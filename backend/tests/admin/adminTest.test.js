const supertest = require("supertest");
const app = require("../../app");
// const Student = require("../../models/Student");
const mongoose = require("mongoose");
const Student = require("../../model/Student");
const Log = require("../../model/log");
const { course_summary, droppedcourses, notifs, attend } = require("../../model/marks");
const viewprof = require("../../model/facultyList");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { studentRegisterValid, studentLoginValid } = require("../../controllers/validation");

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
const faketoken=invalidToken("sadjkch_chvofuih043");

it('Should save user to database', async () => {
  const res = await api.post('/student/register')
    .send(initialStudents[0])
    expect(201).toBeTruthy();
});

it('Should Login Student if details are correct', async() => {
  // student = await loginStudent(initialStudents[0]);
  const studentres = await api.post('/student/login')
  .send({
    email: initialStudents[0].email,
    password: "password",
  })
  expect(200).toBeTruthy();
});

it('Should give 403 Invalid Password if password is Wrong', async() => {
  // student = await loginStudent(initialStudents[0]);
  const studentres = await api.post('/student/login')
  .send({
    email: initialStudents[0].email,
    password: "pswd",
  })
  expect(403).toBeTruthy();
});

// it('Can view Notifs ?', async() => {
//   const {user,usertoken} = await loginStudent(initialStudents[0]);
//   api.get('/student/notifications')
//   .set("auth-token", faketoken)
//   .expect(200);
// });

// it('Can view Notifs ?', async() => {
//   const student = await loginStudent(initialStudents[0]);
//   const studentres = await api.get('/student/notifications', invalidToken("sadjkch_chvofuih043"))
//   .set('auth-token', invalidToken("sadjkch_chvofuih043"))
//       .expect(200);
// });
describe('Test API and mock NPM Modules', () => {
  it('It should verify the access token and respond with status 200', async () => {
    
    student=await loginStudent(initialStudents[0]);
    console.log(student);
    const res = await api
        .get('/student/notifications')
        .set('auth-token',student)
        .send({});

    expect(200);

  });


  it('It should not verify the access token and respond with status 401', async () => {
 

    const res = await api
        .get('/student/notifications')
        .set('auth-token', 'somerandomjwttoken')
        .send({});

    expect(400);

  });
});



afterAll(() => { 
  mongoose.connection.close()
})