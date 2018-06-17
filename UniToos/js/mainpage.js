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
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById("profileTrue").style.display = "block";
    document.getElementById("profileFalse").style.display = "none";
    database.child('Users/'+user.uid).on('value', function(snapshot){
        document.getElementById("username").innerText = snapshot.child('name').val() + " " + snapshot.child('surname').val();
    });
  } else {
    document.getElementById("profileTrue").style.display = "none";
    document.getElementById("profileFalse").style.display = "block";
  }
});
function signOut(){
  firebase.auth().signOut().then(function() {

  // Sign-out successful.

}).catch(function(error) {

  alert("There is problem");

});
}