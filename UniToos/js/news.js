$('.id').click(function(){
	var e = $(this).text().toLowerCase();
	$('.check').prop('checked', false);
	$('#' + e + 'Box').prop('checked', true);
	change();
 	return false; 
});
$('.function').click(function(e){
 	alert($(this).text().toLowerCase());
 	return false; 
});

function sortDescending(a, b) {
    var date1 = $(a).find(".year").text();
    date1 = date1.split('.');
    date1 = new Date(date1[2], date1[1] - 1, date1[0]);
    var date2 = $(b).find(".year").text();
    date2 = date2.split('.');
    date2 = new Date(date2[2], date2[1] - 1, date2[0]);

    return date1 < date2;
};

$(document).ready(function() {
    $('#results .card').sort(sortDescending).appendTo('#results');
});

function myFunction() {
  var input = document.getElementById("Search");
  var filter = input.value.toLowerCase();
  var nodes = document.getElementsByClassName('univerName');
  var card = document.getElementsByClassName('card');
  var check = document.getElementsByClassName('check');
  $(".check").map(function() {
    this.checked = false;
  });
  for (i = 0; i < card.length; i++) {
    if (card[i].className.trim().toLowerCase().includes(filter)) {
      card[i].style.display = "inline-block";
    } else {
      card[i].style.display = "none";
    }
  }
}
function change() {
    
    var educationCbs = document.querySelectorAll(".education input[type='checkbox']");
  	var filters = {
  		education: getClassOfCheckedCheckboxes(educationCbs)
  };

  filterResults(filters);
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
  var rElems = document.querySelectorAll(".card-columns > div");
  var hiddenElems = [];

  if (!rElems || rElems.length <= 0) {
    return;
  }

  for (var i = 0; i < rElems.length; i++) {
    var el = rElems[i];

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
  }

  for (var i = 0; i < rElems.length; i++) {
    rElems[i].style.display = "inline-block";
  }

  if (hiddenElems.length <= 0) {
    return;
  }

  for (var i = 0; i < hiddenElems.length; i++) {
    hiddenElems[i].style.display = "none";
  }
}
change();