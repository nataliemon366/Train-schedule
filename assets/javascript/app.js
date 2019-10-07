// /Initialize Firebase
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyARwtpJS2WagtoRTEX9dUmCgui5X1pB1G8",
  authDomain: "mytrainchocho.firebaseapp.com",
  databaseURL: "https://mytrainchocho.firebaseio.com",
  projectId: "mytrainchocho",
  storageBucket: "",
  messagingSenderId: "103795711152",
  appId: "1:103795711152:web:d9ea214a1ff926d36d6f75"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture: imageUrl
  });
}

writeUserData("545", "Natalie", "nat@me.com", "http:/ualreadyknow.png")
//a variable to referance the database

var database = firebase.database();

//variables from form

var trainName = "";
var destination = "";
var firstTrain = 0;
var frequency = 0;
var currentTime = moment()

// updates clock

setInterval(function () {
  $("#current-time").html(moment(moment()).format("hh:mm:ss"));
}, 1000);

// 2. Button for adding Trains
$("#submit").on("click", function (event) {
  event.preventDefault();


  trainName = $("#trainName").val().trim();

  destination = $("#destination").val().trim();

  firstTrain = $("#firstTrain").val().trim();

  frequency = $("#frequency").val().trim();

  // Clears all of the text-boxes
  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrain").val("");
  $("#frequency").val("");

  //pushes to database
  database.ref().push({

    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency

  });
});

database.ref().on("child_added", function (childSnapshot) {

  //calculations needed

  var firstTimeConverted = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "days");

  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  //console.log("Difference in time: " + timeDiff);

  var remainder = timeDiff % childSnapshot.val().frequency;
  //console.log("Remainder: " + remainder);

  var minsUntilTrain = childSnapshot.val().frequency - remainder;
  //console.log("Time till Train: " + minsUntilTrain);

  var nextTrainTime = moment().add(minsUntilTrain, "minutes");
  //console.log("Next arrival: " + moment(nextTrainTime).format("hh:mm"));


  // Add each train's data into the table
  $("#schedule > tbody").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>" +
    childSnapshot.val().frequency + "</td><td>" + moment(nextTrainTime).format("hh:mm") + "</td><td>" + minsUntilTrain + "</td></tr>");

  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);

});