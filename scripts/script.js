const root = window.location.href.substring(0,window.location.href.indexOf("/pages"));
const menuLink = ['/pages/main.html', //대시보드
                  '/pages/counsel/counsel1.html', //고객상담
                  '', //마이워크
                  '/pages/reward.html', //보수내역
                  '/pages/client/client.html', //고객
                  '', //상품
                  '/pages/insight.html', //Insight                  
                  '/pages/myinfo.html'] //내정보

const menuList = document.querySelectorAll('.menu-list > li');
const tabMenuList = document.querySelectorAll('ul.tab-menu > li');

// footer load
// loadFooter("footer.html");

// button event
document.getElementById("btnSideOpen").onclick = (e) => {
  e.preventDefault();
  document.getElementById("wrapper").classList.toggle("menuOpen");
  sRemoveClass(menuList,'on');

  try {
    document.getElementById("floating-wrap").classList.toggle("side-open");
  } catch (error) {
    
  }
};

// side menu click -> depth2 display
menuList.forEach( (list, index) => {
  list.addEventListener('click', () => {    
    location.href = root + menuLink[index-1];        
    sRemoveClass(sSiblings(list),'on');
    list.classList.add('on');

    var depth1Top = list.getBoundingClientRect().top;    
    var elDepth2 = document.getElementById('menu-depth2');    
    elDepth2.style.display = "block";
    if ((depth1Top+elDepth2.offsetHeight) < window.innerHeight)
      elDepth2.style.top = depth1Top < 0 ? 0: depth1Top + 'px';
    else elDepth2.style.top = window.innerHeight - elDepth2.offsetHeight + 'px';

  });
});

document.getElementById("sideMenu").onscroll = (event) => { 
  e.preventDefault();
  var elDepth2 = document.getElementById('menu-depth2');
    elDepth2.style.display = "none";
};

// tab-menu
tabMenuList.forEach( (list) => {
  list.addEventListener('click', () => {    
    sRemoveClass(sSiblings(list),'active');
    list.classList.add('active');

    const tabId = list.getAttribute("data-tab");
    var sib = sSiblings(document.getElementById(tabId));
    sRemoveClass(sib,'active');    
    document.getElementById(tabId).classList.add("active");    
  });  
});


/****/
var body = document.querySelector("body");
body.addEventListener('click', clickBodyEvent);
 
function clickBodyEvent(event) {
  var target = event.target;      
  var miniMenu = document.querySelector(".mini-menu");

  if (target.className == 'name') return;
  if (miniMenu.classList.contains("on")) miniMenu.classList.remove("on");

  
  if((target.parentNode.id == 'menu-depth2') 
      || (target.parentElement.className == 'menu-list')
      || (target.className == 'menu-item')
      || (target.parentElement.className == 'menu-item'))
    return ;      
    
  var onDepth2 = document.querySelector('.menu-list > li.on');
  if (onDepth2 != null) {
    onDepth2.classList.remove('on');   
    document.getElementById('menu-depth2').style.display = "none";
  }
}

document.querySelectorAll('.ic-favorite').forEach( (list) => {
  list.addEventListener('click', () => {    
    list.classList.toggle('on')  ;
  });  
});

//close modal
document.querySelectorAll('.modal-close').forEach( (list) => {
  list.addEventListener('click', () => {    
    $parent = list.closest('.modal-con')
    if ($parent == null) return;
    $parent.classList.toggle('opaque');
    if (!($parent.classList.contains('opaque'))) 
      document.body.style.overflow = "overlay";
  
    $parent.addEventListener('transitionend', function(e){
      this.classList.toggle('unstaged');
      this.removeEventListener('transitionend',arguments.callee);
    });
  });
});




/*** Calendar ***/
// var calendarEl = document.getElementById('calendar');
// var calendar = new FullCalendar.Calendar(calendarEl, {
//   headerToolbar: {
//     // left: 'prev,next today',
//     left: 'prev',
//     center: 'title',
//     right: 'next',
//     // right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
//   },  
//   initialDate: '2022-10-03',
//   navLinks: true, // can click day/week names to navigate views
//   businessHours: true, // display business hours
//   editable: true,
//   selectable: true,  
//   contentHeight:"auto",
//   events: [
//     {
//       title: 'Business Lunch',
//       start: '2020-09-03T13:00:00',
//       constraint: 'businessHours'
//     },
//     {
//       title: 'Meeting',
//       start: '2020-09-13T11:00:00',
//       constraint: 'availableForMeeting', // defined below
//       color: '#257e4a'
//     },
//     {
//       title: 'Conference',
//       start: '2020-09-18',
//       end: '2020-09-20'
//     },
//     {
//       title: 'Party',
//       start: '2020-09-29T20:00:00'
//     },

//     // areas where "Meeting" must be dropped
//     {
//       groupId: 'availableForMeeting',
//       start: '2020-09-11T10:00:00',
//       end: '2020-09-11T16:00:00',
//       display: 'background'
//     },
//     {
//       groupId: 'availableForMeeting',
//       start: '2020-09-13T10:00:00',
//       end: '2020-09-13T16:00:00',
//       display: 'background'
//     },

//     // red areas where no events can be dropped
//     {
//       start: '2020-09-24',
//       end: '2020-09-28',
//       overlap: false,
//       display: 'background',
//       color: '#ff9f89'
//     },
//     {
//       start: '2020-09-06',
//       end: '2020-09-08',
//       overlap: false,
//       display: 'background',
//       color: '#ff9f89'
//     }
//   ]
// });
// calendar.render();
