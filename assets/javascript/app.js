// /Initialize Firebase
var Config = {
    apiKey: "AIzaSyAE_Y7YtxbLONdomtX0e1sYQRqC3hMJhxU",
    authDomain: "train-schedule-91a40.firebaseapp.com",
    databaseURL: "https://train-schedule-91a40.firebaseio.com",
    projectId: "train-schedule-91a40",
    storageBucket: "",
    messagingSenderId: "946229504191",
    appId: "1:946229504191:web:492ac76e91d71d4d4afe0a"
  };
    // Initialize Firebase
    firebase.initializeApp(Config);
  
    
    var trainData = firebase.database();
  
    $("#addTrainBtn").on("click", function() {
     var trainName = $("#trainNameInput").val().trim();
      var destination= $("#destinationInput").val().trim();
      var firstTrain= moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
      var frequency = $("#frequencyInput").val().trim();
      
     console.log(firstTrain);
     return false;

    });
    trainData.ref().on("child_added", function(snapshot){
        var name =snapshot.val().name;
        var destination =snapshot.val().destination;
        var frequency =snapshot.val().frequency;
        var firstTrain =snapshot.val().firstTrain;

        var remainder =moment().diff(moment.unix(firstTrain),"minutes")%frequency;
        var minutes = frequency -remainder;
        var arrival = moment().add(minutes,"m").format("hh:mm A");

        console.log(remainder);
        console.log(minutes);
        console.log(arrival);

        $("#trainTable >tBody").append("<tr><td>"+name+"</td><td>"+destination+ "</td><td>" +frequency+ "</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
    })