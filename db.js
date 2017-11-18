const Sequelize = require('sequelize');


const db = new Sequelize('postgres://localhost/juniorenrichment', {
  logging: false
});


const Student = db.define("student" , {
	name: {
		type: Sequelize.STRING
	},
	GPA: {
		type: Sequelize.DECIMAL
	},
})


Student.getPerfectStudents = function(){
	return this.findAll({
		where: {
			GPA: {
				$eq: 4.0
			}
		}
	})
}

Student.prototype.getLetterGrade = function(){
	const studentsGPA = this.getDataValue("GPA");
	if(studentsGPA >= 4.0){
		return "A"
	} else if (studentsGPA < 4.0 && studentsGPA >= 3.0){
		return "B"
	} else if (studentsGPA < 3.0 && studentsGPA >= 2.0){
		return "C"
	} else if (studentsGPA < 2.0 && studentsGPA >= 1.0){
		return "D"
	} else {
		return "F"
	}
}
	

const Teacher = db.define('teacher', {
	name: {
		type: Sequelize.STRING
	},
	subject: {
		type: Sequelize.STRING
	}

});

Student.belongsTo(Teacher)

module.exports = {db, Student, Teacher}