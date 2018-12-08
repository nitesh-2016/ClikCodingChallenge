// Algorithm to generate sample input for Shortlists of companies and student's Preferences.

/**
 * Import Modules.
 */
var fs = require("fs");

/**
 * Assumption -
 * Students - s1 to s30 - Total 30
 * Companies - c1 to c3 - Total 3
 * Each company is shortlisting at least 20 students
 * Each student is being shortlisted in at least 1 company
 */
// Sample names of students.
var students = [
  "s1", "s2", "s3", "s4", "s5",
  "s6", "s7", "s8", "s9", "s10",
  "s11", "s12", "s13", "s14", "s15",
  "s16", "s17", "s18", "s19", "s20",
  "s21", "s22", "s23", "s24", "s25",
  "s26", "s27", "s28", "s29", "s30"
];
var remainingStudents = {}; // Remaining students after others being shortlisted in at least 1 company.
var studentsPreferences = {}; // It will store the company preference list of each student.
students.forEach(function (student) {
  /**
   * Initialize studentsPreferences with blank array.
   * It will look like -
   * {s1: [], s2: []}
   */
  studentsPreferences[student] = [];
  /**
   * Create a hash of student names, to track which student is remaining to be shortlisted.
   * It will look like -
   * {s1: "s1", s2: "s2"}
   */
  remainingStudents[student] = student;
});

// Sample names of companies.
var companies = ["c1", "c2", "c3"];
var companiesShortlists = {}; // It will store the names of shortlisted students for each company.
companies.forEach(function (value) {
  /**
   * Initialize companiesShortlists with blank array.
   * It will look like -
   * {c1: [], c2: []}
   */
  companiesShortlists[value] = [];
});

/**
 * Function to check whether the student's name is inserted in company's shortlist randomly.
 * It will insert the name in the list, if not present already and track the same.
 * @param companyPref - company's preference list(shortlist).
 */
function checkAndInsertCompanyPref(companyPref) {
  var isChecking = true;
  while (isChecking) {
    var randomIndex = Math.floor(Math.random() * students.length);
    var student = students[randomIndex];
    if (companyPref.indexOf(student) < 0) {
      companyPref.push(student);
      // Just to have a note that student is being shortlisted in at least 1 company.
      if (remainingStudents[student]) {
        delete remainingStudents[student];
      }
      isChecking = false;
    }
  }
}

// Generate preferences of all the companies.
for (var company in companiesShortlists) {
  // Each company is having at least 20 students shortlisted.
  for (var i = 0; i < 20; i++) {
    checkAndInsertCompanyPref(companiesShortlists[company]);
  }
}

/**
 * Function to check whether the company's name is inserted in student's preference list randomly.
 * It will insert the name in the list, if not present already.
 * @param studentPref - Student's preference list.
 */
function checkAndInsertStudentPref(studentPref) {
  var isChecking = true;
  while (isChecking) {
    var randomIndex = Math.floor(Math.random() * companies.length);
    var company = companies[randomIndex];
    if (studentPref.indexOf(company) < 0) {
      studentPref.push(company);
      isChecking = false;
    }
  }
}

// Generate preferences of all the students.
for (var student in studentsPreferences) {
  // Each student is giving preferences of all the companies.
  for (var i = 0; i < companies.length; i++) {
    checkAndInsertStudentPref(studentsPreferences[student]);
  }
}

// Insert remaining students(which are not yet shortlisted) in third company's(c3's) shortlist.
for (var student in remainingStudents) {
  companiesShortlists.c3.push(student);
}

// Total no of shortlisted students in each company.
// Note:- Just for debugging purpose.
for (var company in companiesShortlists) {
  console.log(company, " - ", companiesShortlists[company].length);
}

// Write both of the lists in separate files.
// Which will be used in the main algorithm.
fs.writeFileSync("companiesShortlists.json", JSON.stringify(companiesShortlists));
fs.writeFileSync("studentsPreferences.json", JSON.stringify(studentsPreferences));

// Note:- Just for debugging purpose.
console.log(JSON.stringify(companiesShortlists));
console.log(JSON.stringify(studentsPreferences));