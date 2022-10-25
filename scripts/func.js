// 형제node 
function sSiblings(t) {
  const children = t.parentElement.children;
  const tempArr = [];

  for (let i = 0; i < children.length; i++) {    
    tempArr.push(children[i]);
  }
  
  return tempArr.filter(function(e){
    return e != t;
  });
}

// 선택한 모든 element에서 클래스삭제
function sRemoveClass(t, removeClass) {  
  for (let i = 0; i < t.length; i++) {    
    t[i].classList.remove(removeClass);
  }  
}

// 해당요소의 str문자열을 포함한 id가 있는 부모노드찾기
function sfindParentNode(el, str) {
  var pNode = el.parentElement;
  while (pNode!=null) {    
    const strId = pNode.getAttribute("id");    
    if (strId!=null && strId.startsWith(str)) return pNode;
    pNode = pNode.parentElement;
  }  
}

// footer load
function loadFooter(str) {
  fetch(str)
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("footer").innerHTML = data;
  });
}

function onlynumber(str) {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g,'$1');
}

function inputOnlyNumberFormat(obj) {
  obj.value = onlynumber(uncomma(obj.value));
}

function inputNumberFormat(obj) {
  obj.value = comma(uncomma(obj.value));
}

function comma(str) {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function uncomma(str) {
  str = String(str);
  return str.replace(/[^\d]+/g, '');
}

// calendar
function calendarInit() {

  // 날짜 정보 가져오기
  var date = new Date(); // 현재 날짜(로컬 기준) 가져오기
  var utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
  var kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
  var today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)

  var thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  // 달력에서 표기하는 날짜 객체

  
  var currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
  var currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월
  var currentDate = thisMonth.getDate(); // 달력에서 표기하는 일

  // kst 기준 현재시간
  // console.log(thisMonth);

  // 캘린더 렌더링
  renderCalender(thisMonth);

  function renderCalender(thisMonth) {

      // 렌더링을 위한 데이터 정리
      currentYear = thisMonth.getFullYear();
      currentMonth = thisMonth.getMonth();
      currentDate = thisMonth.getDate();

      // 이전 달의 마지막 날 날짜와 요일 구하기
      var startDay = new Date(currentYear, currentMonth, 0);
      var prevDate = startDay.getDate();
      var prevDay = startDay.getDay();

      // 이번 달의 마지막날 날짜와 요일 구하기
      var endDay = new Date(currentYear, currentMonth + 1, 0);
      var nextDate = endDay.getDate();
      var nextDay = endDay.getDay();

      // console.log(prevDate, prevDay, nextDate, nextDay);

      // 현재 월 표기
      // $('.year-month').text(currentYear + '.' + (currentMonth + 1));
      document.querySelector('.year-month').innerHTML = currentYear + '.' + (currentMonth + 1);

      // 렌더링 html 요소 생성
      calendar = document.querySelector('.dates')
      calendar.innerHTML = '';
      
      // 지난달
      for (var i = prevDate - prevDay + 1; i <= prevDate; i++) {
          calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable">' + i + '</div>'
      }
      // 이번달
      for (var i = 1; i <= nextDate; i++) {
          calendar.innerHTML = calendar.innerHTML + '<div class="day current">' + i + '<div class="marker"></div></div>'
      }
      // 다음달
      for (var i = 1; i <= (7 - nextDay == (7|0)? 0 : 7 - nextDay); i++) {        
          calendar.innerHTML = calendar.innerHTML + '<div class="day next disable">' + i + '</div>'
      }

      // 오늘 날짜 표기
      if (today.getMonth() == currentMonth) {
          todayDate = today.getDate();
          var currentMonthDate = document.querySelectorAll('.dates .current');
          currentMonthDate[todayDate -1].classList.add('today');
      }
  }

  // 이전달로 이동
  document.querySelector('.go-prev').addEventListener('click', () => { 
    thisMonth = new Date(currentYear, currentMonth - 1, 1);
      renderCalender(thisMonth);  
  }) 

  // $('.go-prev').on('click', function() {
  //     thisMonth = new Date(currentYear, currentMonth - 1, 1);
  //     renderCalender(thisMonth);
  // });

  // 다음달로 이동
  document.querySelector('.go-next').addEventListener('click', () => { 
    thisMonth = new Date(currentYear, currentMonth + 1, 1);
      renderCalender(thisMonth);  
  }) 

} 

// highchart dummy
Highcharts.chart('container', {

  title: {
      text: ''
  },
  
  subtitle: {
      text: ''
  },
  
  yAxis: {
      title: {
          text: '(명)'
      }
  },
  
  xAxis: {
      accessibility: {
          rangeDescription: 'Range: 2010 to 2020'
      }
  },
  
  legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
  },
  
  plotOptions: {
      series: {
          label: {
              connectorAllowed: false
          },
          pointStart: 2010
      }
  },
  
  series: [{
      name: 'Installation & Developers',
      data: [43934, 48656, 65165, 81827, 112143, 142383,
          171533, 165174, 155157, 161454, 154610]
  }, {
      name: 'Manufacturing',
      data: [24916, 37941, 29742, 29851, 32490, 30282,
          38121, 36885, 33726, 34243, 31050]
  }, {
      name: 'Sales & Distribution',
      data: [11744, 30000, 16005, 19771, 20185, 24377,
          32147, 30912, 29243, 29213, 25663]
  }, {
      name: 'Operations & Maintenance',
      data: [null, null, null, null, null, null, null,
          null, 11164, 11218, 10077]
  }, {
      name: 'Other',
      data: [21908, 5548, 8105, 11248, 8989, 11816, 18274,
          17300, 13053, 11906, 10073]
  }],
  
  responsive: {
      rules: [{
          condition: {
              // maxWidth: 500
          },
          chartOptions: {
              legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
              }
          }
      }]
  }
  
  });
Highcharts.chart('container2', {

    title: {
        text: ''
    },
    
    subtitle: {
        text: ''
    },
    
    yAxis: {
        title: {
            text: '(명)'
        }
    },
    
    xAxis: {
        accessibility: {
            rangeDescription: 'Range: 2010 to 2020'
        }
    },
    
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    
    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },
    
    series: [{
        name: 'Installation & Developers',
        data: [43934, 48656, 65165, 81827, 112143, 142383,
            171533, 165174, 155157, 161454, 154610]
    }, {
        name: 'Manufacturing',
        data: [24916, 37941, 29742, 29851, 32490, 30282,
            38121, 36885, 33726, 34243, 31050]
    }, {
        name: 'Sales & Distribution',
        data: [11744, 30000, 16005, 19771, 20185, 24377,
            32147, 30912, 29243, 29213, 25663]
    }, {
        name: 'Operations & Maintenance',
        data: [null, null, null, null, null, null, null,
            null, 11164, 11218, 10077]
    }, {
        name: 'Other',
        data: [21908, 5548, 8105, 11248, 8989, 11816, 18274,
            17300, 13053, 11906, 10073]
    }],
    
    responsive: {
        rules: [{
            condition: {
                // maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
    
  });
Highcharts.chart('container3', {

  title: {
      text: ''
  },
  
  subtitle: {
      text: ''
  },
  
  yAxis: {
      title: {
          text: '(명)'
      }
  },
  
  xAxis: {
      accessibility: {
          rangeDescription: 'Range: 2010 to 2020'
      }
  },
  
  legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
  },
  
  plotOptions: {
      series: {
          label: {
              connectorAllowed: false
          },
          pointStart: 2010
      }
  },
  
  series: [{
      name: 'Installation & Developers',
      data: [43934, 48656, 65165, 81827, 112143, 142383,
          171533, 165174, 155157, 161454, 154610]
  }, {
      name: 'Manufacturing',
      data: [24916, 37941, 29742, 29851, 32490, 30282,
          38121, 36885, 33726, 34243, 31050]
  }, {
      name: 'Sales & Distribution',
      data: [11744, 30000, 16005, 19771, 20185, 24377,
          32147, 30912, 29243, 29213, 25663]
  }, {
      name: 'Operations & Maintenance',
      data: [null, null, null, null, null, null, null,
          null, 11164, 11218, 10077]
  }, {
      name: 'Other',
      data: [21908, 5548, 8105, 11248, 8989, 11816, 18274,
          17300, 13053, 11906, 10073]
  }],
  
  responsive: {
      rules: [{
          condition: {
              // maxWidth: 500
          },
          chartOptions: {
              legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
              }
          }
      }]
  }
  
  });  
  // search input close button display
  function searchInput() {
    const formSearchInput = document.querySelector('#search-text');
    const formSearchClose = document.querySelector('.btn-input-close');
   
    formSearchInput.addEventListener('keyup', () => {
      formSearchClose.style.display =  (formSearchInput.value == '') ? "none":"flex" ;    
    });
    
    formSearchClose.addEventListener('click',(e) => {
      e.currentTarget.style.display = "none";
    })
  } 

  function headerMiniMenu()  {
    document.querySelector(".name").onclick = (e) => {
      e.currentTarget.querySelector(".mini-menu").classList.add('on');
    }
  }