// Initialize Firebase

var config = {
  apiKey: "AIzaSyCfm_4IbTuvZojfZT4RVfqZGKgEjqmRPY4",
  authDomain: "charrunleagu.firebaseapp.com",
  databaseURL: "https://charrunleagu.firebaseio.com",
  projectId: "charrunleagu",
  storageBucket: "charrunleagu.appspot.com",
  messagingSenderId: "481277311171"
};
firebase.initializeApp(config);
//reg
function register () {
let email = $("#regUn").val()
let password = $("#regPw").val()
console.log(email, password);
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
// Handle Errors here.
var errorCode = error.code;
var errorMessage = error.message;
window.alert("Error : " + errorMessage)
});
}
//singout
function singOut() {
firebase.auth().signOut().catch(function(error) {
var errorMessage = error.message;
window.alert(errorMessage);
});
}
//login fun
function login () {
let email = $("#un").val()
let password = $("#pw").val()
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
// Handle Errors here.
var errorCode = error.code;
var errorMessage = error.message;
window.alert("Error : " + errorMessage)

// ...
});
}
//after login
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
  let user = firebase.auth().currentUser;
  let name, uid;
  email = user.email;
  uid = user.uid;
  console.log("logged", email);
  location.href = "#main";
  $("#welcome").text("Welcome " + email + "!");}
 else {
  console.log("don't logged");
  location.href = "#loginPage";
}
});

function loadRaces() {
const list = $("#raceList");
list.contents().remove();
const dbRefRaces = firebase.database().ref().child("races/");
//pick races of logged user
const user = firebase.auth().currentUser;
const uid = user.uid;
// console.log(uid);
const dbRefUserRaces = dbRefRaces.child(uid);
let uRace = {};
//do I need it? or only fo load into cache?
dbRefUserRaces.on("value", snap => {
});
//listener for all races of this user
dbRefUserRaces.on ("child_added", snap => {
  uRace.raceID = snap.key;
  const race = $("<tr class = 'ui-btn'></tr>")
  list.append(race);
  //itirate thgought races obj
  snap.forEach (childSnap => {
  uRace[childSnap.key] = childSnap.val()
  });
  const raceDet = $('<td class = "name">'+ uRace.name + '</td><td class = "location">'  + uRace.location + '</td><td class = "date">' + uRace.date + '</td><td class = "distance">' + uRace.distance + '</td>');
  race.append(raceDet);
  });
};

function addRace () {
const dbRefRaces = firebase.database().ref().child("races/");
//pick races of logged user
const user = firebase.auth().currentUser;
const uid = user.uid;
// console.log(uid);
const dbRefUserRaces = dbRefRaces.child(uid);
const newRaceRef = dbRefUserRaces.push();
let uRace = {};
uRace.name = $("#form-race-name").val();
uRace.date = $("#form-race-date").val();
uRace.location = $("#form-race-location").val();
uRace.distance = $("#form-race-distance").val();
console.log(uRace.distance, uRace.date, uRace.name)
newRaceRef.set({
  name : uRace.name,
  distance : uRace.distance,
  date: uRace.date,
  location : uRace.location
});
console.log("race added");
(loadRaces());
};

function addCalendar() {
const list = $("#raceCalend");
list.contents().remove();
//ref for user's races and for reces calend
const dbRefRaces = firebase.database().ref().child("races/");
const dbRefCalend = firebase.database().ref().child("testcalend/");
//pick races of logged user
const user = firebase.auth().currentUser;
const uid = user.uid;
// console.log(uid);
const dbRefUserRaces = dbRefRaces.child(uid);
let uRace = {};
//do I need it? or only fo load into cache?
dbRefCalend.on("value", snap => {
});
//listener for all races of this user
dbRefCalend.on ("child_added", snap => {
  uRace.raceID = snap.key;
  const race = $("<tr class = 'ui-btn'></tr>")
  list.append(race);
  //itirate thgought races obj
  snap.forEach (childSnap => {
  uRace[childSnap.key] = childSnap.val()
  });
  const raceDet = $("<td>"+ uRace.name + " | "  + uRace.location + " | " + uRace.date + " | " + uRace.distance + " " + " </td>")
  race.append(raceDet);
  });
};
