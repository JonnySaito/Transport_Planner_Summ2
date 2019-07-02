var vehicles = [
    {
        type: "motorbike",
        title: "MOTORBIKE",
        peopleMin: 1,
        peopleMax: 1,
        dailyRate: 109,
        daysMin: 1,
        daysMax: 5,
        gasRate: 3.7,
        iconGrey: "motorbikeGrey.png",
        iconWhite: "motorbikeWhite.png",
        luggage: 100,
    },
    {
        type: "smallCar",
        title: "SMALL CAR",
        peopleMin: 1,
        peopleMax: 2,
        dailyRate: 129,
        daysMin: 1,
        daysMax: 10,
        gasRate: 8.5,
        iconGrey: "smallCarGrey.png",
        iconWhite: "smallCarWhite.png",
        luggage: 280,
    },
    {
        type: "largeCar",
        title: "LARGE CAR",
        peopleMin: 1,
        peopleMax: 5,
        dailyRate: 144,
        daysMin: 3,
        daysMax: 10,
        gasRate: 9.7,
        iconGrey: "suvGrey.png",
        iconWhite: "suvWhite.png",
        luggage: 550,
    },
    {
        type: "motorhome",
        title: "MOTORHOME",
        peopleMin: 2,
        peopleMax: 6,
        dailyRate: 200,
        daysMin: 2,
        daysMax: 15,
        gasRate: 17,
        iconGrey: "camperVanGrey.png",
        iconWhite: "camperVanWhite.png",
        luggage: 300,
    },
];

// LOCATIONS
var allLocations = [
    { id: 1,
      title: "Auckland",
      lat: -36.848461,
      lng: 174.763336,
    },
    { id: 2,
      title: "Rotorua",
      lat: -38.136848,
      lng: 176.249741,
    },
    { id: 3,
      title: "Wellington",
      lat: -41.286461,
      lng: 174.776230,
    },
    { id: 4,
      title: "Christchurch",
      lat: -43.532055,
      lng: 172.636230,
    },
    { id: 5,
      title: "Queenstown",
      lat: -45.032700,
      lng: 168.658005,
    },
    { id: 6,
      title: "Dunedin",
      lat: -45.878761,
      lng: 170.502792,
    },

];

// GLOBAL VARIABLES
var height;
var width;
var element;
var currentPageElement;
var numberPeople;
var numberDays;



// PAGE LOADING + CLICK TO START
$(document).ready(function(){
    $(".letsGoBox").click(function(){
        getHeight();
        currentPageElement = $("#page2");
        $("#page1").hide();
        $(".helpIconBox").show();
        $("#page2").fadeIn(800);
        getHeightForNextPage();
    });
});

// CLICK BACK ARROW TO RETURN TO PAGE 1
$(".goBackIcon").click(function(){
    getHeight();
    currentPageElement.hide();
    $(".helpIconBox").hide();
    $("#vehicleCard").hide();
    for (var i = 0; i < okVehicles.length; i++) {
        var selectableVehicle = $("#"+okVehicles[i].type);
        selectableVehicle.attr("src", "images/"+okVehicles[i].iconGrey).removeClass('okVehicles');
    }
    $("#page1").fadeIn(800);
    getHeightForNextPage();
    $("#people").val("");
    $("#journeyDays").val("");
    okVehicles = [];
});

// CLICK ? ICON TO GO TO HELP PAGE
$(".helpIconBox").click(function(){
    getHeight();
    currentPageElement.hide();
    $(".helpIconBox").show();
    $("#helpContainer").fadeIn(800);
    getHeightForNextPage();
});

// CLICK X ICON TO RETURN TO CURRENT PAGE
$(".closeButton").click(function(){
    $("#helpContainer").hide();
    currentPageElement.fadeIn(800);
});

//ENTER NUMBER OF PEOPLE THEN PROCEED TO PAGE 3 (NUMBER OF DAYS)
$("#peopleOK").click(function(){
    numberPeople = parseInt($("#people").val());
    if(numberPeople < 1 || numberPeople > 6 || !numberPeople){
        Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Please enter a number from 1 to 6",
            timer: "4000",
            heightAuto: false,
        });
    } else{
        getHeight();
        currentPageElement = $("#page3");
        $("#page2").hide();
        $(".helpIconBox").show();
        $("#page3").fadeIn(800);
        getHeightForNextPage();
    };
});

//ENTER NUMBER OF DAYS THEN PROCEED TO PAGE 4 (SELECT VEHICLE)
$("#daysOK").click(function(){
    numberDays = parseInt($("#journeyDays").val());
    if(numberDays < 1 || numberDays > 15 || !numberDays) {
        Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Please enter a number from 1 to 15",
            timer: "4000",
            heightAuto: false,
        });
    } else if((numberPeople == 1) && (numberDays > 10)){
        Swal.fire({
            type: "error",
            title: "Too long!",
            text: "You can only book up to 10 days",
            timer: "4000",
            heightAuto: false,
        });
    } else if((numberPeople > 2) && (numberDays == 1)){
        Swal.fire({
            type: "error",
            title: "Too short!",
            text: "You need to book at least 2 days",
            timer: "4000",
            heightAuto: false,
        });
    } else{
        getHeight();
        currentPageElement = $("#page4");
        $("#page3").hide();
        $(".helpIconBox").show();
        $("#page4").fadeIn(800);
        getHeightForNextPage();
        vehicleOK();
    };
});

// GENERATE VEHICLE OPTIONS BASED ON PARAMETERS & USER INPUT

var selectableVehicle = [];
var okVehicles = [];
var vehicleOK = function(){
    // var okVehicles = [];
    if((numberPeople == 1) && (numberDays < 3)){
        okVehicles.push(vehicles[0], vehicles[1]);
    } else if((numberPeople == 1) && (numberDays < 6)){
        okVehicles.push(vehicles[0], vehicles[1], vehicles[2]);
    } else if ((numberPeople == 1) && (numberDays < 11)){
        okVehicles.push(vehicles[1], vehicles[2]);
    } else if ((numberPeople == 2) && (numberDays == 1)){
        okVehicles.push(vehicles[1]);
    } else if ((numberPeople == 2) && (numberDays == 2)){
        okVehicles.push(vehicles[1], vehicles[3]);
    } else if ((numberPeople == 2) && (numberDays < 11)){
        okVehicles.push(vehicles[1], vehicles[2], vehicles[3]);
    } else if ((numberPeople == 2) && (numberDays < 16)){
        okVehicles.push(vehicles[3]);
    } else if ((numberPeople < 6) && (numberDays == 2)){
        okVehicles.push(vehicles[3]);
    } else if ((numberPeople < 6) && (numberDays < 11)){
        okVehicles.push(vehicles[2], vehicles[3]);
    } else if ((numberPeople < 6) && (numberDays < 16)){
        okVehicles.push(vehicles[3]);
    } else if ((numberPeople == 6) && (numberDays < 16)){
        okVehicles.push(vehicles[3]);
    };
// FOR SELECTABLE VEHICLES, CHANGE ICON IMG SOURCE FROM GREY TO WHITE
    for (var i = 0; i < okVehicles.length; i++) {
        var selectableVehicle = $("#"+okVehicles[i].type);
        selectableVehicle.attr("src", "images/"+okVehicles[i].iconWhite).addClass('okVehicles');
    }
    // console.log('filtered vehicles below')
    // console.log(okVehicles);
    showVehicleCard();
};

// console.log(selectableVehicle);

var motorbike = $("#motorbike");
var smallCar = $("#smallCar");
var largeCar = $("#largeCar");;
var motorhome = $("#motorhome");;

$(".greyVehicleIcon").on("click",function(){
    $("#vehicleCardHead").text("");
    $("#vehicleCardInfo").text("");
  for (var i = 0; i < okVehicles.length; i++){
      if (okVehicles[i].type === "motorbike"){
          if (this.id == "motorbike") {
            showVehicleCard("motorbike");
          }
      } else if (okVehicles[i].type === "smallCar"){
          if (this.id == "smallCar"){
            showVehicleCard("smallCar");
          }
      } else if (okVehicles[i].type === "largeCar") {
          if (this.id == "largeCar"){
            showVehicleCard("largeCar");
          }
      } else if (okVehicles[i].type === "motorhome"){
          if (this.id == "motorhome"){
            showVehicleCard("motorhome");
          }
      }
  };
});

// SHOW INFORMATION FOR CLICKED VEHICLE
function showVehicleCard(clickedVehicle){
  document.getElementById("vehicleCardHead").innerHTML = "";
  document.getElementById("vehicleCardInfo").innerHTML = "";
  for (var j=0; j< okVehicles.length; j++) {
    // console.log(okVehicles[j], clickedVehicle)
    if (okVehicles[j].type ==clickedVehicle){
      document.getElementById("vehicleCard").style.display="block";
      document.getElementById("vehicleCardHead").innerHTML += "<h3>"+okVehicles[j].title+"</h3>";
      document.getElementById("vehicleCardInfo").innerHTML += "<p>Daily hire (with insurance): "+"$"+okVehicles[j].dailyRate+"</p>";
      document.getElementById("vehicleCardInfo").innerHTML += "<p>Luggage capacity: "+okVehicles[j].luggage+" litres</p>";
      document.getElementById("vehicleCardInfo").innerHTML += "<p>Fuel efficiency: "+okVehicles[j].gasRate+" litres per 100km</p>";
    }
  }
}
// USER CLICKS ON VEHICLE CARD TO CONFIRM CHOICE...
// ...AND GO TO ROUTE PLANNER PAGE
$("#vehicleOKbutton").click(function(){
    getHeight();
    currentPageElement = $("#page5");
    $("#page4").hide();
    $(".helpIconBox").show();
    $("#page5").fadeIn(800);
    getHeightForNextPage();
});

$("#routeOK").click(function(){
    getHeight();
    currentPageElement = $("#page6");
    $("#page5").hide();
    $(".helpIconBox").show();
    $("#page6").fadeIn(800);
    getHeightForNextPage();

//GETTING LATITUDE & LONGITUDE FOR START AND END LOCATIONS
    var startLoc = $("#startLocation").val();
    var endLoc = $("#endLocation").val();
    if (startLoc != endLoc){
        console.log(startLoc, endLoc);
        // console.log(allLocations);
        for(var i = 0; i < allLocations.length; i++){
            if (startLoc === allLocations[i].title) {
                 console.log("start location is ", allLocations[i].lat, allLocations[i].lng);
                var startLat = allLocations[i].lat;
                var startLong = allLocations[i].lng;
            }
            if (endLoc === allLocations[i].title) {
                console.log("end location is " , allLocations[i].lat, allLocations[i].lng);
                var endLat = allLocations[i].lat;
                var endLong = allLocations[i].lng;
           }
         }
           var map = new google.maps.Map(document.getElementById("page6"), {
             center: {lat: -41.286461, lng: 174.776230},
             zoom: 5,
             styles: [
               {
                   featureType: "water",
                   stylers: [
                       { color: "#232C43" }
                   ]
               },
               {
                   featureType: "road.arterial",
                   elementType: "geometry",
                   stylers: [
                         { color: "#eda72f" }
                     ]
               },
               {
                   featureType: "poi",
                   elementType: "labels.text.fill",
                   stylers: [{color: "#e0695e"}]
                   },
               {
                   featureType: "poi.park",
                   elementType: "geometry",
                   stylers: [{color: "#abf46b"}]
               },
               {
                   featureType: "poi.park",
                   elementType: "labels.text.fill",
                   stylers: [{color: "#888e87"}]
               },
               {
                   featureType: "landscape.man_made",
                   elementType: "geometry.fill",
                   stylers: [
                       {color: "#cbd1c5"}
                     ]
               },
               {
                   featureType: "transit",
                   elementType: "geometry.fill",
                   stylers: [
                       {color: "#56a82a"}
                     ]
               }
             ]
           });

// ADDING MAP MARKERS
           var marker1 = new google.maps.Marker({
               position: {
                   lat: startLat,
                   lng: startLong
               },
               map: map,
               animation: google.maps.Animation.DROP,
               // icon: 'images/greenmarker.png',
           });
           var marker2 = new google.maps.Marker({
               position: {
                 lat: endLat,
                 lng: endLong
               },
               map: map,
               animation: google.maps.Animation.DROP,
               // icon: 'images/redmarker.png',
           });

           console.log(marker1);

// FINDING DIRECTIONS AND DISTANCE
           var directionsService = new google.maps.DirectionsService();
           var directionsDisplay = new google.maps.DirectionsRenderer();

               directionsDisplay.setMap(map);

               directionsService.route({
                   origin: marker1.position,
                   destination: marker2.position,
                   travelMode: 'DRIVING'
               }, function(response, status){
                   if(status == 'OK'){
                       console.log(response.routes[0].legs[0].duration.text);
                       console.log(response.routes[0].legs[0].distance.text);
                       document.getElementById("mapResults").innerHTML = ("<p>Distance " + response.routes[0].legs[0].distance.text + "</p>");

                       directionsDisplay.setDirections(response);

                   } else if(status == 'NOT_FOUND'){
                     Swal.fire({
                         type: "error",
                         title: "Sorry!",
                         text: "Either your start or end point is invalid",
                         timer: "4000",
                         heightAuto: false,
                     });
                   } else if(status == 'ZERO_RESULTS'){
                     Swal.fire({
                         type: "error",
                         title: "Sorry!",
                         text: "No route available there",
                         timer: "4000",
                         heightAuto: false,
                     });
                   }
               })
        } else{
            Swal.fire({
                type: "error",
                title: "Oops...",
                text: "Your start and end points need to be different",
                timer: "4000",
                heightAuto: false,
              });
            }
});

// function initMap(sLat, sLong, eLat, eLong){
// };


// GET HEIGHT & WIDTH OF CURRENT PAGE
function getHeight(){
    element = $(".pageContainer");
    height = element.outerHeight();
    width = element.outerWidth();
    element.hide();
};
// GET HEIGHT & WIDTH OF NEXT PAGE
function getHeightForNextPage(){
    var height2 = element.outerHeight();
    var width2 = element.outerWidth();
    element.css({height: height, width: width});
    element.show();
    element.animate({height: height2, width: width2}, 500);
    setTimeout(function(){
        element.css({height: "", width: ""});
    }, 800);
};
