var vehicles = [
    {
        type: 'motorbike',
        peopleMin: 1,
        peopleMax: 1,
        dailyRate: 109,
        daysMin: 1,
        daysMax: 5,
        gasRate: 3.7,
        iconGrey: 'motorbikeGrey.png',
        iconWhite: 'motorbikeWhite.png',
    },
    {
        type: 'smallCar',
        peopleMin: 1,
        peopleMax: 2,
        dailyRate: 129,
        daysMin: 1,
        daysMax: 10,
        gasRate: 8.5,
        iconGrey: 'smallCarGrey.png',
        iconWhite: 'smallCarWhite.png',
    },
    {
        type: 'largeCar',
        peopleMin: 1,
        peopleMax: 5,
        dailyRate: 144,
        daysMin: 3,
        daysMax: 10,
        gasRate: 9.7,
        iconGrey: 'suvGrey.png',
        iconWhite: 'suvWhite.png',
    },
    {
        type: 'motorhome',
        peopleMin: 2,
        peopleMax: 6,
        dailyRate: 200,
        daysMin: 2,
        daysMax: 15,
        gasRate: 17,
        iconGrey: 'camperVanGrey.png',
        iconWhite: 'camperVanWhite.png',
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
    $("#page1").fadeIn(800);
    getHeightForNextPage();
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
        // $("#daysValidation").text("ENTER A NUMBER (1 - 15)")
    } else if((numberPeople == 1) && (numberDays > 10)){
        Swal.fire({
            type: "error",
            title: "Too long!",
            text: "You can only book up to 10 days",
            timer: "4000",
            heightAuto: false,
        });
        // $("#daysValidation").text("TOO LONG. TRY AGAIN!")
    } else if((numberPeople > 2) && (numberDays == 1)){
        Swal.fire({
            type: "error",
            title: "Too short!",
            text: "You need to book at least 2 days",
            timer: "4000",
            heightAuto: false,
        });
        // $("#daysValidation").text("TOO SHORT. TRY AGAIN!")
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

// GENERATE VEHICLE OPTIONS

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
        selectableVehicle.attr("src", "images/"+okVehicles[i].iconWhite);   
    }
    console.log('filtered vehicles below')
    console.log(okVehicles);
    showVehicleCard();
};

// console.log(selectableVehicle);

var motorbike = $("#motorbike");
var smallCar = $("#smallCar");
var largeCar = $("#largeCar");;
var motorhome = $("#motorhome");;

function showVehicleCard(){
    console.log(okVehicles);
    // $(".bigVehicleIcon").click(function(){
    // console.log('you clicked on a vehicle');
    // }
    for (var i = 0; i < okVehicles.length; i++) {
        if (okVehicles[i].type === "motorbike"){
            console.log("motorbike is in the array")
            break
        } 
        else{
            console.log("motorbike is not in the array")
        }
    }; 
     $(motorbike).click(function(){
        console.log('you clicked on an available vehicle');
    // });

    // console.log('you clicked on something unique (show object properties)');
    // });
}; 




// GET HEIGHT & WIDTH OF CURRENT PAGE
function getHeight(){
    element = $(".pageContainer");
    height = element.outerHeight();
    width = element.outerWidth();
    element.hide();
}
// GET HEIGHT & WIDTH OF NEXT PAGE
function getHeightForNextPage(){
    var height2 = element.outerHeight();
    var width2 = element.outerWidth();
    element.css({height: height, width: width});
    element.show();
    element.animate({height: height2, width: width2}, 500);
    setTimeout(function(){
        element.css({height: '', width: ''});
    }, 800);
};
