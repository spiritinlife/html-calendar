!(function(){
  
  //library starts here
  var SSCalendar = (function() {
   
    var SSCalendar = function(options){
      
      //this is where the user can create events
      // Define a function that takes (num,day,mon,year) and go nuts
      SSCalendar.calendarDayStub= options.createCalendarDay || calendarDayStub;
      
      //this is used for month control
      SSCalendar.date = options.date || new Date();
      SSCalendar.date.setDate(1);
    }
    
    
    //expose next/prev months to be used as click events
    SSCalendar.nextMonth = nextMonth;
    SSCalendar.prevMonth = previousMonth;
    
    
    window.onload = function(){
      SSCalendar.calendar = document.getElementById('sscalendar');
      //clear all html
      SSCalendar.calendar.innerHTML = '';

      //start the calendar
      // TODO maybe give the user the choice to start the calendar
      createMonth();
    }
    
    

    
    /**
    *   Private Methods
    *     ( HELPERS )
    */
    
    //today kept here
    today = new Date();

    
    /**
    *   Creates the specified month of SSCalendar.date
    */
    function createMonth() {
      
      //create a temporary variable matching the SSCalendar.date
      var dateObject = new Date();
      dateObject.setDate(SSCalendar.date.getDate());
      dateObject.setMonth(SSCalendar.date.getMonth());
      dateObject.setYear(SSCalendar.date.getFullYear());
      
      var dayString = dayWeekReadable(dateObject.getDay());
      var monthString = monthReadable(dateObject.getMonth());
      
      // we need to create the first date of each month out of the loop  
      createCalendarDay(dateObject.getDate(),dayString, monthString, dateObject.getFullYear());
      
      //increase the date by 1
      dateObject.setDate(dateObject.getDate() + 1);

        while (dateObject.getDate() != 1) {
          
            dayString = dayWeekReadable(dateObject.getDay());
          
            //create next date
            createCalendarDay(dateObject.getDate(),dayString, monthString, dateObject.getFullYear());

            //increase the date by 1
            dateObject.setDate(dateObject.getDate() + 1);
        }

        // Set the text to the correct month
        var currentMonthText = document.getElementById('current-month');
        currentMonthText.innerHTML = monthString + ' ' + dateObject.getFullYear();
        
        

        //find and set the classname of the current date
        setCurrentDay();
    }
    
    
    /**
    * 
    *   This is used internally to create a day of a month
    *   It calls the calendarDayStub which shoulb be overriden by the user
    */
    function createCalendarDay(num, day, mon, year) {
        var currentCalendar = document.getElementById('calendar');

        var newDay = document.createElement('div');
        var dateInfo = document.createElement('div');
        dateInfo.innerHTML = '<p>'+num+'</p>'+'<p>'+day+'</p>';
      
        var dayEvent = SSCalendar.calendarDayStub(num,day,mon,year);

        newDay.className = 'calendar-day ';
        dateInfo.className = 'calendar-day-info ';
        
        
        // Set ID of element as date formatted '8-January' etc 
        newDay.id = num + '-' + mon + '-' +year;
        
        
        newDay.appendChild(dateInfo);
        newDay.appendChild(dayEvent);
      
      
        SSCalendar.calendar.appendChild(newDay);
    }
    
    
    
    function setCurrentDay() {
      var todayDate = today.getDate();
      var currentMonth = today.getMonth();
      var currentYear = today.getFullYear();
      var thisMonth = monthReadable(currentMonth);
      // Find element with the ID for today
      currentDay = document.getElementById(todayDate + '-' + thisMonth + '-' + currentYear);
      if (currentDay != null)
        currentDay.className = 'calendar-day today';
    }

    // Clears the calendar and shows the next month
    function nextMonth() {
      
        //clear the calendar
        SSCalendar.calendar.innerHTML = '';
        SSCalendar.date.setMonth(SSCalendar.date.getMonth() + 1);
        console.log( "NextMonth " + SSCalendar.date.getMonth());

        createMonth();
    }

    // Clears the calendar and shows the previous month
    function previousMonth() {
      
        //clear calendar
        SSCalendar.calendar.innerHTML = '';
      
        SSCalendar.date.setMonth(SSCalendar.date.getMonth() - 1);
        
        createMonth();
    }


    
    /**
    *  Gets the index of the day and
    *  returns the human readbale format
    *  @param dayIndex should be from 0-6
    *  @return String 
    */
    function dayWeekReadable(dayIndex){
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayIndex];
    }
    
    /**
    *  Gets the index of the month and
    *  returns the human readbale format
    *  @param dayIndex should be from 0-11
    *  @return String 
    */
    function monthReadable(monthIndex) {
        return ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][monthIndex];
    }

    /**
    *   Default day event creator 
    *   This is called by createCalendarDay for each day of displayed month and it should be overriden 
    *   @return a div with appropiate html
    */
    function calendarDayStub(num,day,mon,year){
      
      var dateEvent = document.createElement('div');
      
      
      var dateEventCounter = document.createElement('p');
      var dateEventCounterCtrlUp = document.createElement('p');
      var dateEventCounterCtrlDown = document.createElement('p');

  
      dateEventCounterCtrlUp.onclick = function() {
        var newCounter = parseInt(dateEventCounter.getAttribute('frinks')) + 1 ;
        dateEventCounter.setAttribute('frinks',newCounter);
        dateEventCounter.innerHTML = newCounter + ' fr';
      }

      dateEventCounterCtrlDown.onclick = function() {
        var newCounter = parseInt(dateEventCounter.getAttribute('frinks')) - 1 ;
        dateEventCounter.setAttribute('frinks',newCounter);
        dateEventCounter.innerHTML = newCounter + ' fr';
      }

      dateEventCounter.innerHTML = "10 fr";
      dateEventCounter.setAttribute('frinks',10);
      dateEventCounterCtrlUp.innerHTML = '^';
      dateEventCounterCtrlDown.innerHTML = 'v';

      dateEvent.appendChild(dateEventCounterCtrlUp);
      dateEvent.appendChild(dateEventCounter);
      dateEvent.appendChild(dateEventCounterCtrlDown);


      dateEvent.className = 'calendar-day-event ';
  
      return dateEvent;      
    }
    
    
    return SSCalendar;
  })();
  
  
  //expose the class to the world
  window.SSCalendar = SSCalendar;
  
  
})();
