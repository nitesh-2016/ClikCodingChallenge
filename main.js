// Main algorithm to prepare the best priority order, based on both company's and student's preferences.

/**
 * Import modules.
 */
var studentsPreferences = require("./studentsPreferences.json");
var companiesShortlist = require("./companiesShortlists.json");

/**
 * no of shortlisted students per company
 * It will look like -
 * {c1: 20, c2: 20, c3: 20}
 */
var shortListsPerCompany = {};
for (var company in companiesShortlist) {
  shortListsPerCompany[company] = companiesShortlist[company].length;
}

/**
 * Function to prepare the best priority order of companies interviewing students
 * @returns bestPriorityOrder
 */
function prepareBestPriorityOrder() {
  var bestPriorityOrder = {};
  for (var student in studentsPreferences) {
    var bestScore = 0;
    var bestMatchWithCompany = "";
    var studentPrefList = studentsPreferences[student];
    var noOfStudPref = studentPrefList.length;
    for (var studPrefIndex = 0; studPrefIndex < noOfStudPref; studPrefIndex++) {
      /**
       * Example - for first index of studentPrefList
       * studentPrefScore = 3 - 0 = 3
       */
      var studentPrefScore = noOfStudPref - studPrefIndex;
      var preferableCompany = studentPrefList[studPrefIndex];
      // Index of student in company's shortlist
      var studentPrefOfCompany = companiesShortlist[preferableCompany].indexOf(student);
      var companyPrefScore = 0;
      // If the company has shortlisted that particular student,
      // then the index will be greater than or equals to zero
      if (studentPrefOfCompany >= 0) {
        /**
         * Example - for first index of studentPrefList
         * companyPrefScore = 20 - 10 = 10
         */
        companyPrefScore = shortListsPerCompany[preferableCompany] - companiesShortlist[preferableCompany].indexOf(student);
      }
      /**
       * tentativeScore - Score which may or may not be the best score.
       * Example - For first index of studentPrefList
       * tentativeScore = 3 * 10 = 30
       * @type {number}
       */
      var tentativeScore = studentPrefScore * companyPrefScore;
      if (tentativeScore > bestScore) {
        bestScore = tentativeScore; // Replace the bestScore with tentativeScore
        bestMatchWithCompany = preferableCompany; // Replace the bestMatchWithCompany with preferableCompany
      }
    }
    bestPriorityOrder[student] = bestMatchWithCompany;
  }
  return bestPriorityOrder;
}

console.log(prepareBestPriorityOrder());
/**
 * Sample output will look like -
 { s1: 'c2',
  s2: 'c3',
  s3: 'c3',
  s4: 'c1',
  s5: 'c2',
  s6: 'c1',
  s7: 'c2',
  s8: 'c2',
  s9: 'c2',
  s10: 'c1',
  s11: 'c2',
  s12: 'c1',
  s13: 'c3',
  s14: 'c2',
  s15: 'c2',
  s16: 'c3',
  s17: 'c3',
  s18: 'c3',
  s19: 'c3',
  s20: 'c1',
  s21: 'c3',
  s22: 'c1',
  s23: 'c2',
  s24: 'c2',
  s25: 'c2',
  s26: 'c3',
  s27: 'c1',
  s28: 'c1',
  s29: 'c3',
  s30: 'c3' }
 */