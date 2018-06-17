var config = {
    apiKey: "AIzaSyCD_QEIXNyQ4pB_twG_3bYFFiU9IoG5bio",
    authDomain: "unitoos-6045f.firebaseapp.com",
    databaseURL: "https://unitoos-6045f.firebaseio.com",
    projectId: "unitoos-6045f",
    storageBucket: "unitoos-6045f.appspot.com",
    messagingSenderId: "237773795918"
  };
firebase.initializeApp(config);
var database = firebase.database().ref();
const reset = document.getElementById("resetForm");
const signin = document.getElementById("signinForm");
const signup = document.getElementById("signupForm");
function showSignup(){
	$("#signupForm").slideDown("slow");
	signin.style.display = "none";
	reset.style.display = "none";
}
function showSignin(){
	signup.style.display = "none";
	$("#signinForm").slideDown("slow");
	reset.style.display = "none";
}
function showReset(){
	signup.style.display = "none";
	signin.style.display = "none";
	$("#resetForm").slideDown("slow");
}
function login(button){
	const loadingLogin = document.getElementById("loadingLogin");
	const loginEmail = document.getElementById("loginEmail").value;
	const loginPassword = document.getElementById("loginPassword").value;
	loadingLogin.style.display = "inline-block";
	$(button).prop("disabled",true);
	firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword).then(function(user) {
   		alert("Successful");
   		loadingLogin.style.display = "none";
   		$(button).prop("disabled",false);
	}).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;

    if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
        loadingLogin.style.display = "none";
        $(button).prop("disabled",false);
    } else {
        alert(errorMessage);   
        loadingLogin.style.display = "none";  
        $(button).prop("disabled",false);
    }
    console.log(error);
	});
}
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
function registration(){
	var birthday = day.value + "." + month.value + "." + year.value;
	var name = document.getElementById("name").value,
	surname = document.getElementById("surname").value,
	education = document.getElementById("education").value,
	uin = document.getElementById("uin").value,
	email = document.getElementById("email").value,
	password = document.getElementById("password").value;
	if (name=="" || surname=="" || education=="" || uin=="" || email=="" || password=="") {
		alert("Please, fill the fields");
	}else{
		firebase.auth().createUserWithEmailAndPassword(email, password)
		  		.then(function(firebaseUser) {
		    	var user = firebase.auth().currentUser;
		    	database.child('Users/'+user.uid).set({
		    		name: name,
		    		surname: surname,
		    		birthday: birthday,
		    		education: education,
		    		uin: uin,
		    		uid: user.uid
		    	});
				user.sendEmailVerification().then(function() {
				$('#verificationDialog').modal('show');
				user.reload();
				}).catch(function(error) {

				  alert("Error, please, try soon");

				}); 
		   })
		  		.catch(function(error) {
		  alert("error");
			});
	}
}
function verify(){
	var user = firebase.auth().currentUser;
	user.reload();
	if (user.emailVerified) {
		document.getElementById("successAlert").style.display = "block";
		document.getElementById("dangerAlert").style.display = "none"
		$('#verificationDialog').modal('hide');
	}else{
		$('#verificationDialog').modal('show');
		document.getElementById("dangerAlert").style.display = "block";
	}
}