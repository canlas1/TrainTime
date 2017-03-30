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

    firebase.initializeApp(config);

    var dataRef = firebase.database();
    //on click function to add values


    $("#submitForm").on("click", function(event) {
        event.preventDefault();


        var trainName = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTrain = $("#first-train-input").val().trim();
        var frequency = $("#frequency-min-input").val().trim();
        console.log(frequency);
        // alert("test")

        // At the initial load, get a snapshot of the current data.
        dataRef.ref().push({

            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            firstTrainAdded: firebase.database.ServerValue.TIMESTAMP
        });


    });

    // $("#submitForm")[0].reset();

    dataRef.ref().limitToLast(2).on("child_added", function(childSnapshot) {

        var currentTime = moment();
        // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        var tFrequency = childSnapshot.val().frequency;
        console.log(tFrequency)

        // pushed back 1 year to make sure it comes before current time
        var convertedDate = moment(childSnapshot.val().firstTrain, 'hh:mm').subtract(1, 'years');
        
        var firstTime = moment(convertedDate).format('HH:mm');

        console.log(firstTime);

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        //time remaining WTF
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);


        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);


        //solved
        var nextTrain = moment().add(tMinutesTillTrain, 'minutes').format('HH:mm')
        console.log(nextTrain);


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
