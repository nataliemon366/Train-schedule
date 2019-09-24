// /Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAE_Y7YtxbLONdomtX0e1sYQRqC3hMJhxU",
    authDomain: "train-schedule-91a40.firebaseapp.com",
    databaseURL: "https://train-schedule-91a40.firebaseio.com",
    projectId: "train-schedule-91a40",
    storageBucket: "",
    messagingSenderId: "946229504191",
    appId: "1:946229504191:web:492ac76e91d71d4d4afe0a"
  };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  
    
    var database = firebase.database();
  
    $("#submit").on("click", function(event) {
      event.preventDefault();
    
      var empName = $("#name-input").val().trim();
      var empRole = $("#role-input").val().trim();
      // var empStart = moment($("#date-input").val().trim(), "DD/MM/YY").format("X");
      var empRate = $("#rate-input").val().trim();
      var newEmp = {
        name: empName,
        role: empRole,
        // start: empStart,
        rate: empRate
      };
    
      database.ref().push(newEmp);
    
      $("#name-input").val("");
      $("#role-input").val("");
      $("#date-input").val("");
      $("#rate-input").val("");
  
    });
    
    database.ref().on("child_added", function(childSnapshot) {
    
  
      // var empName = childSnapshot.val().name;
      // var empRole = childSnapshot.val().role;
      // var empStart = childSnapshot.val().start;
      // var empRate = childSnapshot.val().rate;
    
      // var empStartClean = moment.unix(empStart).format("MM/DD/YY");
    
      // var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
    
      // var empBilled = empMonths * empRate;
    
      // $("#table-employee > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
      // empStartClean + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
    });