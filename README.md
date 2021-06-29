<h1 align="center">
    STUDENT ACADEMIC MANAGEMENT PORTAL (SAMP)
</h1>

---

<h3 align="center">A student perspective portal to handle university academic affairs .</h3>

---

<br>

# About

<h4>
SAMP or Student Academic Management Portal is an application that offers a user friendly interface for the management of students academic affairs along with interaction with admin and/or faculties of their university. (IIITA in our case).
</h4>
<br>

The aim of our project is to create a student academic management portal which will enable students to :


* Register themselves to courses.
* Manage their academic profile.
* View notifications and announcements.
* Gauge their progress in the form of course summary. 
* Pay their fees online.
* View time table as well as academic calendar.  
* View faculty list and interact with them. 
* Request for certificate on course completion.


The portal also includes an admin login which will enable administrators of the website to :
* Grant/Revoke access to students from website.
* Edit student marks & profile.
* Send messages/notifications to students and faculty regarding updates.

<br>

# Installation

### System Package Dependencies

* NodeJs
* NPM
* MongoDB

<br>

```sh
git clone https://github.com/aarpit1010/Student-Acad-Management-System
```
Open 2 terminals in separate windows/tabs.

Terminal 1: Setting Up Backend 
```sh
cd backend
npm install
npm start
```

Terminal 2: Setting Up Frontend
```sh
cd frontend
npm install
npm start
```
Now, navigate to `localhost:3000` in your browser. 
The Backend API will be running at `localhost:3001`.

<br>

# Getting Started

When you have successfully installed and configured and loaded the website in the browser, you

will be on the homepage, where there will be two options for logging in : `Admin`, `Student`.

For logging in as an Admin, here are the credentials:

```sh
E-Mail ID : authority.iiita@gmail.com
Password : 1234
```

On successful login, you will be on Admin Dashboard & can proceed with its functionality.



For a Student, there is one option on the website homepage : Login
* If you want to login as an existing Student (already in database):

```sh
E-Mail ID : iit2019001@iiita.ac.in
Password : themachine
```

* For registering a new Student (advised), go to the Student Login page and click on the Register button.
* On successful login, you will be on Student Dashboard & can proceed with its functionality.

<br>

# Testing

Automatic unit testing has been done for all the routes and controllers of both student & admin, written using Jest and Supertest.

```sh
cd backend
npm install
```

Run all tests
```sh
npm run test
```

