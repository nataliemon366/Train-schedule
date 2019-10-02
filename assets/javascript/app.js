// /Initialize Firebase
var config = {
  apiKey: "AIzaSyBeAXTYszBs_aIy5un3KPwahhI4BtGlfPM",
  authDomain: "trainschedule-c3172.firebaseapp.com",
  databaseURL: "https://trainschedule-c3172.firebaseio.com",
  projectId: "trainschedule-c3172",
  storageBucket: "trainschedule-c3172.appspot.com",
  messagingSenderId: "366682047633"
};
firebase.initializeApp(config)
var dataRef = firebase.database();

var trainObject = {
  name: "",
  destination: "",
  frequency: "",
  nextArrival: "",
  minutesAway: "",
  initialize: function (name, destination, frequency, nextArrival, minutesAway) {
    this.name = name;
    this.destination = destination;
    this.frequency = frequency;
    this.nextArrival = nextArrival;
    this.minutesAway = minutesAway;
  }
}

function updateDisplay(trainObject) {
  var addedRow = $("<tr>")
  debugger
  for (key in trainObject) {
    var addedEntry = $("<td>");
    addedEntry.text(trainObject[key]);
    addedRow.append(addedEntry);
  }
  $("#trainList").append(addedRow);
}
$("#toAddButton").on("click", function (event) {
  event.preventDefault();
  debugger;
  var name = $("#addedTrainName").val().trim();
  var destination = $("#addedDestination").val().trim();
  var frequency = $("#addedFrequency").val().trim();
  var time = $("#addedTime").val().trim();
  dataRef.ref().push({

    name: name,
    destination: destination,
    frequency: frequency,
    time: time,
  });
  $("#addedTrainName").val("");
  $("#addedDestination").val("");
  $("#addedFrequency").val("");
  $("#addedTime").val("");

  var trainToBeAdded = mathMagic(name, destination, frequency, time);
})

function mathMagic(name, destination, frequency, time) {
  var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = currentTime.diff(firstTimeConverted, "minutes");
  var minutesAway = diffTime % frequency;
  var tMinutesTillTrain = frequency - minutesAway;
  var nextArrival = moment().add(tMinutesTillTrain, "minutes");
  var trainToBeAdded = new trainObject.initialize(name, destination, frequency, nextArrival.format("hh:mm", "a"), tMinutesTillTrain);
  return trainToBeAdded;
}
dataRef.ref().on("child_added", function (childSnapshot) {
  var storedTrain = mathMagic(childSnapshot.val().name, childSnapshot.val().destination, childSnapshot.val().frequency, childSnapshot.val().time);
  updateDisplay(storedTrain);
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
setInterval(function () {
  $("#trainList").empty();
  dataRef.ref().on("child_added", function (childSnapshot) {
    var storedTrain = mathMagic(childSnapshot.val().name, childSnapshot.val().destination, childSnapshot.val().frequency, childSnapshot.val().time);
    updateDisplay(storedTrain);
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

}, 60000)