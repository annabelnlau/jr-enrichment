const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const db = require('./db').db;
const Student = require('./db').Student;
const Teacher = require('./db').Teacher;

app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json());

let PORT = 8080;

app.get("/test", (req, res, next) => {
	// Visit http://localhost:8080/test to see the message!
	res.send("Hello GET Route!")
})
/* 
 Your Route Code Here
*/

app.get("/students", (req, res, next) => {
	Student.findAll()
		.then(allTheStudents => {
			res.json(allTheStudents)
		})
		.catch(next)
})

app.get("/students/:id", (req, res, next) => {
	Student.findById(req.params.id)
		.then(studentID => {
			res.json(studentID)
		})
		.catch(next)
})


app.post("/students/:id", (req, res, next) => {
	Student.create(req.body)
	.then(createdStudent => {
		res.json(createdStudent)
	})
	.catch(next)
})

app.delete("/students/:id", (req, res, next) => {
	Student.destroy({
		where: {
			id: req.params.id 
		}
	})
	.then(function(){
		res.sendStatus(202)
	})
	.catch(next)
})

app.put("/students/:id/", (req, res, next) => {
	Student.findOne({
		where: {
			id: req.params.id
		}
	})
	.then(foundStudent => {
		foundStudent.update(req.body)
	})
	.then(function(){
		res.sendStatus(204)
	})
	.catch(next)
})

app.get("/students/:id/getGrade", (req, res, next) => {
	Student.findOne({
		where: {
			id: req.params.id
		}
	})
	.then(retrievedStudent => {
		getLetterGrade(retrievedStudent.getDataValue("GPA"))
	})
	.then(function(){
		res.send(getLetterGrade(retrievedStudent.getDataValue("GPA")))
	})
	.catch(next)
})

app.get("/getPerfectStudents", (req, res, next) => {
	Student.getPerfectStudents()
	.then(gotPerfectStudents => {
		res.json(gotPerfectStudents)
	})
	.catch(next)
})

app.get("/teachers", (req, res, next) => {
	Teacher.findAll()
		.then(allTheTeachers => {
			res.json(allTheTeachers)
		})
		.catch(next)
})

app.get("/teachers/:id", (req, res, next) => {
	Teacher.findById(req.params.id)
		.then(teacherID => {
			res.json(teacherID)
		})
		.catch(next)
})

app.get("/teachers/:id/students", (req, res, next) => {
	Student.findAll({
		where: {
			teacherId: req.params.id
		}
	})
		.then(foundStudents => {
			res.json(foundStudents)
		})
		.catch(next)
})

app.post("/teachers/:id", (req, res, next) => {
	Teacher.create(req.body)
	.then(createdTeacher => {
		res.json(createdTeacher)
	})
	.catch(next)
})


db.sync(/*{ force: true }*/)
	.then(() => {
		console.log('db synced')
		app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
	});