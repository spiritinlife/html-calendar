/**
* Converts a day number to a string.
*
* @method dayOfWeekAsString
* @param {number} dayIndex
* @return {Number} Returns day as number
*/


var date = new Date();
date.setDate(1);
date.setMonth(0);

window.onload = function() {
  createMonth();
};

// Converts day ids to the relevant string
function dayOfWeekAsString(dayIndex) {
  return ["Sun", "Mon","Tue","Wed","Thu","Fri","Sat"][dayIndex];
}
// Converts month ids to the relevant string
function monthsAsString(monthIndex) {
  return ["January", "Febuary","March","April","May","June","July", "August", "September", "October", "November", "December"][monthIndex];
}

// Creates a day element
function createCalendarDay(num, day) {
  var currentCalendar = document.getElementById("calendar");

  var newDay = document.createElement("div");
  var date = document.createElement("p");
  date.innerHTML = num;

  var dayElement = document.createElement("p");
  dayElement.innerHTML = day;

  newDay.className = "calendar-day";
  newDay.appendChild(date);
  newDay.appendChild(dayElement);

  currentCalendar.appendChild(newDay);
}

// Clears all days from the calendar
function clearCalendar() {
  var currentCalendar = document.getElementById("calendar");

  currentCalendar.innerHTML = "";

}

// Clears the calendar and shows the next month
function nextMonth() {
  clearCalendar();

  date.setMonth(date.getMonth() + 1);

  createMonth(date.getMonth());
}

// Clears the calendar and shows the previous month
function previousMonth() {
  clearCalendar();

  date.setMonth(date.getMonth() - 1);
  var val = date.getMonth();
  createMonth(date.getMonth());
}

// Creates and populates all of the days to make up the month
function createMonth() {
  var currentCalendar = document.getElementById("calendar");

  var dateObject = new Date();
  dateObject.setDate(date.getDate());
  dateObject.setMonth(date.getMonth());
  dateObject.setYear(date.getFullYear());

  createCalendarDay(dateObject.getDate(), dayOfWeekAsString(dateObject.getDay()));
  dateObject.setDate(dateObject.getDate() + 1);

  while (dateObject.getDate() != 1) {
    createCalendarDay(dateObject.getDate(), dayOfWeekAsString(dateObject.getDay()));
    dateObject.setDate(dateObject.getDate() + 1);
  }


  var currentMonthText = document.getElementById("current-month");
  currentMonthText.innerHTML = monthsAsString(date.getMonth()) + " " + date.getFullYear();


}