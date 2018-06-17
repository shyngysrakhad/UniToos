var config = {
    apiKey: "AIzaSyBFQPgX8nnELMVnySO2pVib40x5uhNqUcU",
    authDomain: "myapplication-990e5.firebaseapp.com",
    databaseURL: "https://myapplication-990e5.firebaseio.com",
    projectId: "myapplication-990e5",
    storageBucket: "myapplication-990e5.appspot.com",
    messagingSenderId: "808428718422"
  };
  firebase.initializeApp(config);

const database = firebase.database().ref();
var finalArray = {};
var array = [];
var currentExam = "";
var currentImage = "";
var currentId = "";
const choose = document.getElementById('chooser');
const div = document.getElementById("list");
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
const callResult = document.getElementById('callResult');
const prog = document.getElementById('progressDiv');
const result = document.getElementById('result');
callResult.addEventListener('click', function(){
	$('#exampleModal').modal('show');
});
result.addEventListener('click', function(){
	database.child('User/Chinga').set(finalArray);
	alert('Chinga');
});
const score = document.getElementById('overallScore');
const send = document.getElementById('send2');
const image = document.getElementById('img');
const certificateName = document.getElementById('certificate');
const progressBar = document.getElementById('progressBar');
var filer;
database.child('Innopolis/requirements').on('child_added', snap => {
	const exam = document.createElement('h1');
	const h2 = document.createElement('h2');
	h2.id = snap.child('name').val() + "my";
	const span = document.createElement('span');
	span.className = "badge badge-secondary";
	span.innerText = snap.child('recommend').val();
	const certificate = document.createElement("button");
	const state = document.createElement('h2');
	const line = document.createElement('hr');
	state.id = snap.child('name').val()+"state";
	certificate.innerText = "Upload certificate";
	certificate.id = snap.child('name').val() + "button";
	exam.innerText = snap.child('name').val() + " ";
	certificate.className = "btn btn-default";
	div.appendChild(exam);
	exam.appendChild(span);
	div.appendChild(h2);
	div.appendChild(certificate);
	div.appendChild(state);
	callResult.style.display = "block";
	div.appendChild(line);
	const loader = document.getElementById('loader');
	loader.style.display = 'none';
	certificate.addEventListener('click', function(){
		$('#myModal').modal('show');
		currentExam = snap.child('name').val();
		currentId = snap.key;
	});
});
choose.addEventListener("change", function(e){
			const succesAlert = document.getElementById('succesAlert');
  			var file = e.target.files[0];
  			var storage = firebase.storage().ref('university_list/applications/'+currentExam);
            var task = storage.put(file);
            task.on('state_changed',
        		function progress(snapshot){
        			var percentage = (snapshot.bytesTransferred / 
        				snapshot.totalBytes) * 100;
        			$('.progress-bar').css('width', percentage+'%').attr('aria-valuenow', percentage);   
        			$('.progress-bar').text(percentage + "%");
        		},
        		function error(e){
        			console.log("error");
        		},
        		function(){
        			succesAlert.style.display = "block";
        			currentImage = task.snapshot.downloadURL;
        		});
  			
  			if (choose.files && choose.files[0]) {
            var reader = new FileReader();
            prog.style.display = "block";
            reader.onload = function (e) {
                $('#image').attr('src', e.target.result);
                var files = e.target.result;
                
            }
            reader.readAsDataURL(choose.files[0]);
        	}
  		});
$("#overallScore").on('change keydown paste input', function(){
      dangerAlert.style.display = "none";
});
send.addEventListener('click', function(){

		if (score.value!="") {
			writeJson(currentId, currentExam, currentImage, score.value);
			const current = document.getElementById(currentExam + "my");
			const button = document.getElementById(currentExam + "button");
			button.innerText = "Edit score";
			current.innerText = "Certificate is uploaded\nYour score is: " + score.value;
			$('#image').attr('src', 'format.png');
			score.value = "";
			succesAlert.style.display = "none";
			dangerAlert.style.display = "none";
			prog.style.display = "none";
			$('#myModal').modal('hide');
		}else{
			const dangerAlert = document.getElementById('dangerAlert');
			dangerAlert.style.display = "block";
		}
});



span.onclick = function() {
    modal.style.display = "none";
}
function writeJson(id, name, image, score){
        finalArray[id] = {
        	"name": name,
        	"image": image, 
        	"score": score
        };
}