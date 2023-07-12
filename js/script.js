// select elements

// get data
const dataURL = "../data.json";
const priceCharts = document.querySelector(".price-chart");
const chartSection = document.querySelector(".price-chart-stn");

// console.log(chartData.length);
window.addEventListener("DOMContentLoaded", function () {
  fetch(dataURL)
    .then(function (resp) {
      return resp.json();
    })
    .then((chartData) => {
      let priceChart = chartData
        .map((data) => {
          return ` <div class="weekdays">
                <div class="chart-bar"></div>
                <div class="amount-spent-ctn">
                  $<span class="amount-spent">${data.amount}</span>
                </div>
                <p class="weekday">${data.day}</p>
              </div>`;
        })
        .join(" ");
      priceCharts.innerHTML = priceChart;

      // dynamically height of chart bars
      const weekdays = [...document.querySelectorAll(".weekdays")];
      weekdays.forEach(function (weekday) {
        let chartbar = weekday.querySelector(".chart-bar");
        let amount = weekday.querySelector(".amount-spent");
        let curWeekday = weekday.querySelector(".weekday");
        amount = amount.textContent * 2.5;
        chartbar.style.height = `${amount}px`;

        // display price on mouseover
        chartbar.addEventListener("mouseover", () => {
          weekdays.forEach((otherDays) => {
            if (otherDays !== chartbar) {
              otherDays.classList.remove("view-price");
            }
          });
          weekday.classList.add("view-price");
        });

        // remove price display
        chartSection.addEventListener("mouseover", (e) => {
          if (!e.target.classList.contains("chart-bar")) {
            weekday.classList.remove("view-price");
          }
        });

        //   highlight current day
        // get days array
        let daysArray = chartData.map((data) => {
          return `${data.day}`;
        });
        const date = new Date();
        const currentDay = date.getDay() - 1;
        if (curWeekday.textContent === daysArray[currentDay]) {
          weekday.classList.add("currentDay");
        }
      });
    })
    .catch(function (error) {
      console.error("Couldn't retrieve data");
      console.error(error);
    });
});
