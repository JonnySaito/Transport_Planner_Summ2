var vehicles = [
    {
        type: 'motorbike',
        peopleMin: 1,
        peopleMax: 1,
        dailyRate: 109,
        daysMin: 1,
        daysMax: 5,
        gasRate: 3.7,
    },
    {
        type: 'smallCar',
        peopleMin: 1,
        peopleMax: 2,
        dailyRate: 129,
        daysMin: 1,
        daysMax: 10,
        gasRate: 8.5,
    },
    {
        type: 'largeCar',
        peopleMin: 1,
        peopleMax: 5,
        dailyRate: 144,
        daysMin: 3,
        daysMax: 10,
        gasRate: 9.7,
    },
    {
        type: 'motorhome',
        peopleMin: 2,
        peopleMax: 6,
        dailyRate: 200,
        daysMin: 2,
        daysMax: 15,
        gasRate: 17,
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

// CLICK X ICON TO RETURN TO PAGE 2 (KIA ORA PAGE)
$(".closeButton").click(function(){
    $("#helpContainer").hide();
    currentPageElement.fadeIn(800);
});

//ENTER NUMBER OF PEOPLE THEN PROCEED TO PAGE 3 (NUMBER OF DAYS)
// $("#peopleOK").click(function(){
//     numberPeople = parseInt($("#people").val());
//     console.log(numberPeople);
//     if(numberPeople < 1 || numberPeople > 6 || !numberPeople){
//         $('#peopleValidation').text("ENTER A NUMBER (1 - 6)");
//     } else{
//         getHeight();
//         currentPageElement = $("#page3");
//         $("#page2").hide();
//         $(".helpIconBox").show();
//         $("#page3").fadeIn(800);
//         getHeightForNextPage();
//     };
// });

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
    };
});

// GENERATE VEHICLE OPTIONS
var vehicleOptions = [];

if((numberPeople == 1) && (numberDays < 3)){
    vehicleOptions = [vehicles.type('motorbike', 'smallCar')];
} else if((numberPeople == 1) && (numberDays < 6)){
    vehicleOptions = [vehicles.type('motorbike','smallCar', 'largeCar')];
} else if ((numberPeople == 1) && (numberDays < 11)){
    vehicleOptions = [vehicles.type('smallCar', 'largeCar')];
} else if ((numberPeople == 2) && (numberDays == 1)){
    vehicleOptions = [vehicles.type('smallCar')];
} else if ((numberPeople == 2) && (numberDays == 2)){
    vehicleOptions = [vehicles.type('smallCar', 'motorhome')];
} else if ((numberPeople == 2) && (numberDays < 11)){
    vehicleOptions = [vehicles.type('smallCar', 'largeCar', 'motorhome')];
} else if ((numberPeople == 2) && (numberDays < 16)){
    vehicleOptions = [vehicles.type('motorhome')];
} else if ((numberPeople < 6) && (numberDays == 2)){
    vehicleOptions = [vehicles.type('motorhome')];
} else if ((numberPeople < 6) && (numberDays < 11)){
    vehicleOptions = [vehicles.type('largeCar', 'motorhome')];
} else if ((numberPeople < 6) && (numberDays < 16)){
    vehicleOptions = [vehicles.type('motorhome')];
} else if ((numberPeople == 6) && (numberDays < 16)){
    vehicleOptions = [vehicles.type('motorhome')];
}

//  
// SHOW VEHICLE OPTIONS



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
