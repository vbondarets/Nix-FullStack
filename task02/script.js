const currentDay = new Date().getDate();

const currentMonth = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(
    new Date(),
);
const currentYear = new Date().getFullYear();
const date = currentMonth +", "+ currentDay;
document.getElementById("bg_description").innerHTML = document.getElementById("bg_description").innerHTML + date;
document.getElementById("current_date").innerHTML = currentDay +" "+currentMonth+" "+currentYear;