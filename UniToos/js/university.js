var config = {
    apiKey: "AIzaSyCD_QEIXNyQ4pB_twG_3bYFFiU9IoG5bio",
    authDomain: "unitoos-6045f.firebaseapp.com",
    databaseURL: "https://unitoos-6045f.firebaseio.com",
    projectId: "unitoos-6045f",
    storageBucket: "unitoos-6045f.appspot.com",
    messagingSenderId: "237773795918"
  };
  firebase.initializeApp(config);

const database = firebase.database().ref();
const universityList = document.getElementById('universityList');
database.child('university_list').on('child_added', snap => {
      if (snap.child('state').val() == "ready") {
          loadData(snap);
    }
});
database.child('university_list').on('child_changed', snap => {
  if (snap.child('state').val() == "ready") {
      loadData(snap);
    }if (snap.child('state').val() == 'posting') {
        $("#"+snap.child('name').val()).remove();
    }
});
function loadData(snap){
          const card = document.createElement('div'),
          cardHeader = document.createElement('div'),
          type = document.createElement('span'),
          marked = document.createElement('img'),
          row = document.createElement('div'),
          col7 = document.createElement('div'),
          cardBody = document.createElement('div'),
          univerName = document.createElement('h4'),
          line1 = document.createElement('hr'),
          description = document.createElement('h5'),
          line2 = document.createElement('hr'),
          location = document.createElement('h6'),
          faculties = document.createElement('h6'),
          requirements = document.createElement('h6'),
          line3 = document.createElement('hr'),
          buttonMore = document.createElement('button'),
          buttonApply = document.createElement('button'),
          col5 = document.createElement('div'),
          univerImage = document.createElement('img');
          card.className = "card univerCard " + snap.child('keys').val();
          card.style.marginBottom = "10px";
          card.id = snap.child('name').val();
          cardHeader.className = "card-header";
          type.innerText = snap.child('type').val();
          marked.src = "img/images/unmarked.png";
          marked.style.width = "30px";
          requirements.innerHTML = "<span class=\"text-muted\">Requirements: </span>" + "None";
          marked.align = "right";
          row.className = "row";
          col7.className = "col-7";
          cardBody.className = "card-body";
          type.innerText = "University";
          univerName.className = "card-title univerName";
          univerName.innerText = snap.child('name').val();
          univerImage.src = snap.child('image').val();
          description.className = "card-text";
          description.innerText = snap.child('description').val();
          location.className = "card-title city";
          location.innerHTML = "<span class=\"text-muted\">Location: </span>" + snap.child('country').val();
          faculties.className = "card-text";
          faculties.innerHTML = "<span class=\"text-muted\">Faculties: </span>" + "Not now";
          buttonMore.type = "button";
          buttonMore.className = "btn btn-primary";
          buttonMore.innerText = "More";
          buttonApply.type = "button";
          buttonApply.className = "btn btn-link";
          buttonApply.innerText = "Apply";
          col5.className = "col-5";
          univerImage.className = "w-100 p-3";
          universityList.appendChild(card);
          card.appendChild(cardHeader);
          card.appendChild(row);
          cardHeader.appendChild(type);
          cardHeader.appendChild(marked);
          row.appendChild(col7);
          row.appendChild(col5);
          col7.appendChild(cardBody);
          cardBody.appendChild(univerName);
          cardBody.appendChild(line1);
          cardBody.appendChild(description);
          cardBody.appendChild(line2);
          cardBody.appendChild(location);
          cardBody.appendChild(faculties);
          cardBody.appendChild(requirements);
          cardBody.appendChild(line3);
          cardBody.appendChild(buttonMore);
          cardBody.appendChild(buttonApply);
          col5.appendChild(univerImage);
          database.child('Users/Chinga').once('value', function(snapshot){
              if (snapshot.hasChild('marked')) {
                if (snapshot.child('marked').hasChild(snap.child('name').val())) {
                  marked.src = "img/images/marked.png";
                  card.className += " " + "marked";
                }
              }
          });
          marked.addEventListener('click', function(){
            if (marked.getAttribute('src')=="img/images/unmarked.png") {
              marked.src = "img/images/marked.png";
              database.child('Users/Chinga/marked').child(snap.child('name').val()).set(snap.child('name').val());
              card.className += " " + "marked";
            }else{
              marked.src = "img/images/unmarked.png"
              database.child('Users/Chinga/marked').child(snap.child('name').val()).remove();
              var state = card.className.replace("marked", "");
              card.className = state;
            }
          });
}
function myFunction() {
  var input = document.getElementById("Search");
  var filter = input.value.toLowerCase();
  var nodes = document.getElementsByClassName('univerName');
  var card = document.getElementsByClassName('univerCard');
  var check = document.getElementsByClassName('check');
  $(".check").map(function() {
    this.checked = false;
  });
  for (i = 0; i < nodes.length; i++) {
    if (nodes[i].innerText.toLowerCase().includes(filter)) {
      card[i].style.display = "block";
    } else {
      card[i].style.display = "none";
    }
  }
}
function change() {
  var markedCbs = document.querySelectorAll(".state input[type='checkbox']");
     var educationCbs = document.querySelectorAll(".education input[type='checkbox']");
  	var modelCbs = document.querySelectorAll(".region input[type='checkbox']");
  	var processorCbs = document.querySelectorAll(".faculty input[type='checkbox']");
  	var filters = {
      marked: getClassOfCheckedCheckboxes(markedCbs),
  		education: getClassOfCheckedCheckboxes(educationCbs),
    	models: getClassOfCheckedCheckboxes(modelCbs),
    	processors: getClassOfCheckedCheckboxes(processorCbs)
  };

  filterResults(filters);
}
function informationClick() {
    window.open("information.html");
}
function applicationClick(){
    window.open("application.html");
} 
function getClassOfCheckedCheckboxes(checkboxes) {
  var classes = [];

  if (checkboxes && checkboxes.length > 0) {
    for (var i = 0; i < checkboxes.length; i++) {
      var cb = checkboxes[i];

      if (cb.checked) {
        classes.push(cb.getAttribute("rel"));
      }
    }
  }

  return classes;
}

function filterResults(filters) {
  var rElems = document.querySelectorAll(".result > div");
  var hiddenElems = [];

  if (!rElems || rElems.length <= 0) {
    return;
  }

  for (var i = 0; i < rElems.length; i++) {
    var el = rElems[i];

if (filters.marked.length > 0) {
      var isHidden = true;

      for (var j = 0; j < filters.marked.length; j++) {
        var filter = filters.marked[j];

        if (el.classList.contains(filter)) {
          isHidden = false;
          break;
        }
      }

      if (isHidden) {
        hiddenElems.push(el);
      }
    }

if (filters.education.length > 0) {
      var isHidden = true;

      for (var j = 0; j < filters.education.length; j++) {
        var filter = filters.education[j];

        if (el.classList.contains(filter)) {
          isHidden = false;
          break;
        }
      }

      if (isHidden) {
        hiddenElems.push(el);
      }
    }

    if (filters.models.length > 0) {
      var isHidden = true;

      for (var j = 0; j < filters.models.length; j++) {
        var filter = filters.models[j];

        if (el.classList.contains(filter)) {
          isHidden = false;
          break;
        }
      }

      if (isHidden) {
        hiddenElems.push(el);
      }
    }

    if (filters.processors.length > 0) {
      var isHidden = true;

      for (var j = 0; j < filters.processors.length; j++) {
        var filter = filters.processors[j];

        if (el.classList.contains(filter)) {
          isHidden = false;
          break;
        }
      }

      if (isHidden) {
        hiddenElems.push(el);
      }
    }
  }

  for (var i = 0; i < rElems.length; i++) {
    rElems[i].style.display = "block";
  }

  if (hiddenElems.length <= 0) {
    return;
  }

  for (var i = 0; i < hiddenElems.length; i++) {
    hiddenElems[i].style.display = "none";
  }
}
change();
function alertDialog(img){
    if (img.getAttribute('src') == "img/images/unmarked.png") {
        img.src = "img/images/marked.png";
    }else{
        img.src = "img/images/unmarked.png";
    }
}