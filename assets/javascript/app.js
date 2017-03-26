$(document).ready(function() {

    // Initialize Firebase
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

     dataRef.ref().on("child_added", function(childSnapshot) {

            // Log everything that's coming out of snapshot
            
            console.log(childSnapshot.val());
            // console.log(childSnapshot.val().Role);
            // console.log(childSnapshot.val().StartDate);
            // console.log(childSnapshot.val().MonthlyRate);

            //   // full list of items to the well

            $(".table tbody").append("<tr><td id='train-name-display'> " + childSnapshot.val().trainName +
                "</td><td id='destination-display'>" + childSnapshot.val().destination +
                "</td><td id='frequency-display'>" + childSnapshot.val().frequency +
                "</td><td id='minutes-away-display'>" + childSnapshot.val().minAway);
        });

    $("#submitForm").on("click", function(event) {
        event.preventDefault();


        var name = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTrain = $("#first-train-input").val().trim();
        var minAway = $("#minAway-input").val().trim();
        // alert("test")

        // At the initial load, get a snapshot of the current data.
        dataRef.ref().push({

            //JOES WORK BELOW
            // name: name,
            // email: email, 
            // age: age, 
            // comment: comment, 
            // firstTrainAdded: firebase.database.ServerValue.TIMESTAMP

            MonthlyRate: rate,
            Role: role,
            StartfirstTrain: firstTrain,
            eName: name,
        });

        //Firebase water + initial loader HINK: this code behaves similarly to .on("value")
       

        // dataRef.ref().limitToLast(1).on("child_added", function(snapshot){

        // 	 $(".table tbody").append("<tr><td id='name-display'> " + snapshot.val().eName +
        //         "</td><td id='role-display'>" + snapshot.val().Role +
        //         "</td><td id='firstTrain-display'>" + snapshot.val().StartfirstTrain +
        //         "</td><td id='month-display'>" + snapshot.val().MonthlyRate);
        // })

    });

    // // Handle the errors
    // }, function(errorObject) {
    //   console.log("Errors handled: " + errorObject.code);
    // });

    // dataRef.ref().orderByChild("firstTrainAdded").limitToLast(1).on("child_added", function(snapshot) {

    //   // Change the HTML to reflect
    //   $("#name-display").html(snapshot.val().name);
    //   $("#email-display").html(snapshot.val().email);
    //   $("#age-display").html(snapshot.val().age);
    //   $("#comment-display").html(snapshot.val().comment);
    // });


    //                 // full list of items to the well
    //             	//Joes Code
    //                 // $("#full-member-list").append("<div class='well'><td id='name'>") + 
    //                 // childSnapShot.val().name + 
    //                 // <td id = 'name' > ") + childSnapShot.val().name +
    //                 // <td id='name'>") + childSnapShot.val().name + 
    //                 // <td id = 'name' > ") + childSnapShot.val().name+ 


    //             var tr = $("<tr>");
    //             var tdName = $("<td>");
    //             var tdRole = $("<td>");
    //             var tdfirstTrain = $("<td>");
    //             var tdRate = $("<td>");
    //             var tdMonth = $("<td>");
    //             var tdBilled = $("<td>")

    //             tdName.attr("id", "name-display"); tdRole.attr("id", "role-display"); tdfirstTrain.attr("id", "firstTrain-display"); tdMonth.attr("id", "month-display"); tdRate.attr("id", "rate-display"); tdbilled.attr("id", "billed-display");

    //             tr.append(tdName); tr.append(tdRole); tr.append(tdfirstTrain); tr.append(tdRate); tr.append(tdMonth); tr.append(tdBilled);
    //             // <tr>
    //     <td id="name display">John</td>
    //     <td id="role-display">PM</td>
    //     <td id="firstTrain-display">01/01/01</td>
    //     <td id="month-display">10</td>
    //     <td id="rate-display">100</td>
    //     <td id="billed-display">1000</td>
    // </tr>


}); // !!!!!!!!!!!!!!!!!!!!END OF!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! $(document).ready(function()
