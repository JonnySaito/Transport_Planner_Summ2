
var vehicles = [
    {
        type: 'motorbike',
        peopleMin: 1,
        peopleMax: 2,
        dailyRate: 129,
        daysMin: 1,
        daysMax: 10,
        gasRate: 8.5
    },
    {
        type: 'smallCar',
        peopleMin: 1,
        peopleMax: 2,
        dailyRate: 129,
        daysMin: 1,
        daysMax: 10,
        gasRate: 8.5
    },
    {
        type: 'largeCar',
        peopleMin: 1,
        peopleMax: 5,
        dailyRate: 144,
        daysMin: 3,
        daysMax: 10,
        gasRate: 9.7
    },
    {
        type: 'motorhome',
        peopleMin: 2,
        peopleMax: 6,
        dailyRate: 200,
        daysMin: 2,
        daysMax: 15,
        gasRate: 17
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
        $("#page2").fadeIn(1000);
        getHeightForNextPage();
    });
// CLICK BACK ARROW TO RETURN TO PAGE 1
    $(".goBackIcon").click(function(){
        getHeight();
        $("#page2").hide();
        $(".helpIconBox").hide();
        $("#page1").fadeIn(1000);
        getHeightForNextPage();
    });
// CLICK ? ICON TO GO TO PAGE 3 (HELP PAGE)
    $(".helpIconBox").click(function(){
        getHeight();
        currentPageElement.hide();
        $(".helpIconBox").show();
        $("#helpContainer").fadeIn(1000);
        getHeightForNextPage();
    });
// CLICK X ICON TO RETURN TO PAGE 2 (KIA ORA PAGE)
    $(".closeButton").click(function(){
        $("#helpContainer").hide();
        currentPageElement.fadeIn(1000);
    });
//ENTER NUMBER OF PEOPLE THEN PROCEED TO PAGE 4 (NUMBER OF DAYS)

        $("#peopleOK").click(function(){
            // console.log("clicked people OK button");
            numberPeople = parseInt($("#people").val());
            console.log(numberPeople);
        });
        // numberPeople = parseInt($("#people").val());
        // console.log(numberPeople);
        // if(numberPeople < 1 || numberPeople > 6) {
        //     // tell user to input a number 1-6
        //     $()
        // }


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
        }, 1000);
    }
});

// var numberPeople = $("#people").val();
