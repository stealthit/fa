const menuList = document.querySelectorAll('.menu-list > li');

// footer load
loadFooter();
calendarInit();

// button event
document.getElementById("btnSideOpen").onclick = function() {
  document.getElementById("wrapper").classList.toggle("menuOpen");
  sRemoveClass(menuList,'on');
};

// side menu click -> depth2 display
menuList.forEach( (list) => {
  list.addEventListener('click', () => {    
    sRemoveClass(sSiblings(list),'on');
    list.classList.add('on');
  });
});


/****/
var body = document.querySelector("body");
body.addEventListener('click', clickBodyEvent);
 
function clickBodyEvent(event) {
  var target = event.target;           
  if((target.parentElement.className == 'menu-depth2') 
      || (target.parentElement.className == 'menu-list')
      || (target.className == 'menu-item')
      || (target.parentElement.className == 'menu-item'))
    return ;      
    
  var onDepth2 = document.querySelector('.menu-list > li.on');
  if (onDepth2 != null) {
    onDepth2.classList.remove('on');    
  }
}

/*** Calendar ***/
var calendarEl = document.getElementById('calendar');
var calendar = new FullCalendar.Calendar(calendarEl, {
  headerToolbar: {
    // left: 'prev,next today',
    left: 'prev',
    center: 'title',
    right: 'next',
    // right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
  },  
  initialDate: '2022-10-03',
  navLinks: true, // can click day/week names to navigate views
  businessHours: true, // display business hours
  editable: true,
  selectable: true,  
  contentHeight:"auto",
  events: [
    {
      title: 'Business Lunch',
      start: '2020-09-03T13:00:00',
      constraint: 'businessHours'
    },
    {
      title: 'Meeting',
      start: '2020-09-13T11:00:00',
      constraint: 'availableForMeeting', // defined below
      color: '#257e4a'
    },
    {
      title: 'Conference',
      start: '2020-09-18',
      end: '2020-09-20'
    },
    {
      title: 'Party',
      start: '2020-09-29T20:00:00'
    },

    // areas where "Meeting" must be dropped
    {
      groupId: 'availableForMeeting',
      start: '2020-09-11T10:00:00',
      end: '2020-09-11T16:00:00',
      display: 'background'
    },
    {
      groupId: 'availableForMeeting',
      start: '2020-09-13T10:00:00',
      end: '2020-09-13T16:00:00',
      display: 'background'
    },

    // red areas where no events can be dropped
    {
      start: '2020-09-24',
      end: '2020-09-28',
      overlap: false,
      display: 'background',
      color: '#ff9f89'
    },
    {
      start: '2020-09-06',
      end: '2020-09-08',
      overlap: false,
      display: 'background',
      color: '#ff9f89'
    }
  ]
});
calendar.render();