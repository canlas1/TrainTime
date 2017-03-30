$(document).ready(function() {

    moment().format("[today]");
    console.log(moment().format('LLLL'));

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCliC0LIfdWG6-rUAiwr_RMO0a3OE6ydN0",
        authDomain: "train-time-homework-af222.firebaseapp.com",
        databaseURL: "https://train-time-homework-af222.firebaseio.com",
        storageBucket: "train-time-homework-af222.appspot.com",
        messagingSenderId: "773830722332"
    };

    // Initializing app using config variable
    firebase.initializeApp(config);

    var dataRef = firebase.database();
    

    //.val("") is needed to clear to an empty string
    function clearMyInput() {
        var trainName = $("#train-name-input").val("");
        var destination = $("#destination-input").val("");
        var firstTrain = $("#first-train-input").val("");
        var frequency = $("#frequency-min-input").val("");
    }
    //on click function to add values
    $("#submitForm").on("click", function(event) {
        event.preventDefault();

        //.val().trim is needed to take whitespace
        var trainName = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTrain = $("#first-train-input").val().trim();
        var frequency = $("#frequency-min-input").val().trim();
        // console.log(frequency);
        // console.log(trainName);
        // console.log(destination);
        // console.log(firstTrain);


        // At the initial load, get/pusha snapshot of the current data.
        dataRef.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            firstTrainAdded: firebase.database.ServerValue.TIMESTAMP
        });

        // CLEARS INPUTS!
        clearMyInput();
    });

    //max 2 lines with limitToLast that shows when app starts
    dataRef.ref().limitToLast(2).on("child_added", function(childSnapshot) {

        var currentTime = moment();
        // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        var tFrequency = childSnapshot.val().frequency;
        //console.log(tFrequency)

        // pushed back 1 year to make sure it comes before current time for the firstTrain input
        var convertedDate = moment(childSnapshot.val().firstTrain, 'hh:mm').subtract(1, "years");
        
        //format the time of the firstTrain start a year ago
        var firstTime = moment(convertedDate).format('HH:mm');

        console.log(firstTime);

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        //console.log(firstTimeConverted);

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        //console.log("DIFFERENCE IN TIME: " + diffTime);

        //time remaining modelus is the remainder b/w the diffTime and frequency of train
        
        var tRemainder = diffTime % tFrequency;
        //console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        //solved
        var nextTrain = moment().add(tMinutesTillTrain, 'minutes').format('HH:mm')
        //console.log(nextTrain);


        // Log everything that's coming out of snapshot

        console.log(childSnapshot.val());
        console.log(childSnapshot.val().trainName);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().firstTrain);
        console.log(childSnapshot.val().frequency);


        // full list of items to the well and adding it appending to the DOM via JQuery
        $(".table tbody").append("<tr><td id='train-name-display'> " + childSnapshot.val().trainName +
            "</td><td id='destination-display'>" + childSnapshot.val().destination +
            "</td><td id='frequency-display'>" + childSnapshot.val().frequency +
            "</td><td id='next-arival-display'>" + nextTrain + "</td><td id='minutes-away-display'>" + tMinutesTillTrain);

    });



}); // !!!!!!!!!!!!!!!!!!!!END OF!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! $(document).ready(function()
