// When user clicks Daily, grab info from data.json and display the DAILY info for "Work", "Play", "Study", "Exercise", "Social", and "Self Care"

// Step One: Pull data from JSON File
let getData = async function (selectedTime) {
  const response = await fetch("./data.json");
  const employeeData = await response.json();

  employeeInfo(employeeData, selectedTime);
};

// Step Two: Take the appropriate data and apply it to the innerText of HTML
const employeeInfo = function (employeeData, selectedTime) {
  for (let element of employeeData) {
    let card = document.querySelector(`[data-title="${element.title}"]`);
    let currentHours = card.querySelector(".current-hours");
    let previousHours = card.querySelector(".previous-hours");

    currentHours.textContent =
      element.timeframes[selectedTime].current + " hrs";
    previousHours.textContent =
      element.timeframes[selectedTime].previous + " hrs";
  }
};

// Step Three: Place event listeners on buttons
const buttons = document.querySelectorAll(".nav-links");

buttons.forEach(function (btn) {
  btn.addEventListener("click", () => {
    let selectedTime = btn.dataset.time;
    getData(selectedTime);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  getData("daily");
});
