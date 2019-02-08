var foodList = document.getElementById("Foodlist");
console.log(foodList);

// Dagens mat och nästa mat
async function getData() {
    return await fetch('https://skolmaten.se/api/openmeal/v2/meals.json?distributorID=5998825718153216').then(response => response.json());
}

var weekdayMap = [
    "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"
];

Date.prototype.getWeekNumber = function() {
    var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
};

getData().then(result => {

    console.log(result);
    var meals = result.data[0].meals;
    console.log(meals);
    var currentDate = new Date();
    var startWeek = currentDate.getWeekNumber();

    var element = document.createElement("h1");
    element.classList.add("weekDisplay");
    element.innerHTML += "Den här veckan: " + startWeek;
    foodList.appendChild(element);
    var nextweek = false;
    meals.forEach(meal => {
        var div = document.createElement("div");
        var date = new Date(meal.date);

        if (date.getWeekNumber() != startWeek && !nextweek) {
            var element = document.createElement("h1");
            element.innerHTML += "Nästa vecka: " + date.getWeekNumber();
            element.classList.add("weekDisplay");
            foodList.appendChild(element);
            nextweek = true;
        }

        if (date.getDate() == currentDate.getDate()) {

            div.innerHTML += "<p>Idag:</p>";
        } else {

            div.innerHTML += "<p>" + weekdayMap[date.getDay() - 1] + ":</p>";
        }
        div.classList.add("dayMeal");
        var string = "";
        var firstCourse = null;
        for (var i = 0; i < meal.courses.length; i++) {
            if (firstCourse == null) {
                firstCourse = meal.courses[i].name;
            } else if (firstCourse == meal.courses[i].name) {
                continue;
            }
            string += "<li>" + meal.courses[i].name + "</li>";
        }
        div.innerHTML += "<ul>" + string;

        console.log(meal);



        div.innerHTML += "</ul>";

        console.log(div.innerHTML);


        foodList.appendChild(div);
    });


});