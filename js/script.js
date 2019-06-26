var motorbike = {
    peopleMin: 1,
    peopleMax: 1,
    dailyRate: 109,
    minimumDays: 1,
    maximumDays: 5,
    gasRate: 3.7
};

var smallCar = {
    peopleMin: 1,
    peopleMax: 2,
    dailyRate: 129,
    minimumDays: 1,
    maximumDays: 10,
    gasRate: 8.5
};

var largeCar = {
    peopleMin: 1,
    peopleMax: 5,
    dailyRate: 144,
    minimumDays: 3,
    maximumDays: 10,
    gasRate: 9.7
};

var motorhome = {
    peopleMin: 2,
    peopleMax: 6,
    dailyRate: 200,
    minimumDays: 2,
    maximumDays: 15,
    gasRate: 17
};

$(document).ready(function(){
    $(".letsGoBox").click(function(){
        $(".mainContainer").hide();
        $(".helpIconBox").show();
        $(".kiaOraBox").show();
        $(".goBackIcon").click(function(){
            $(".helpIconBox").hide();
            $(".kiaOraBox").hide();
            $(".mainContainer").show();
        });
        $(".helpIcon").click(function(){
            $(".mainContainer").hide();
            $(".kiaOraBox").hide();
            $(".helpContainer").show();
        });
    });
});
