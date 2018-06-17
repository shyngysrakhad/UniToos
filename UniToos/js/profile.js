var day = document.getElementById("day");
for (var i = 1; i <= 31; i++) {
	var options = document.createElement("option");
	options.innerText = i;
	if (i<=9) {
		options.value = "0" + i;
	}else{
		options.value = i;
	}
	day.appendChild(options);
}
var year = document.getElementById("year");
for (var i = 2002; i >= 1997; i--) {
	var options = document.createElement("option");
	options.innerText = i;
	options.value = i;
	year.appendChild(options);
}
var month = document.getElementById("month");