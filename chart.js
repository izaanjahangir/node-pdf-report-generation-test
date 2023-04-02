const ChartJSImage = require("chart.js-image");
const { getRandomInt } = require("./utils");
exports.generateLineChart = (options = {}) => {
  const { width = 500, height = 300, chartFontSize = 16 } = options;
  const xAxesLabels = new Array(31).fill(0).map((_, index) => index + 1);
  const data = new Array(31).fill(0).map(() => getRandomInt(1000, 6000));

  return ChartJSImage()
    .chart({
      type: "line",
      data: {
        labels: xAxesLabels,
        datasets: [
          {
            label: "",
            data: data,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        legend: {
          display: false,
          labels: {
            fontSize: chartFontSize,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
          yAxes: [
            {
              ticks: {
                fontSize: chartFontSize,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontSize: chartFontSize,
              },
            },
          ],
        },
      },
    })
    .backgroundColor("white")
    .width(width)
    .height(height);
};

exports.generateBarChart = (options = {}) => {
  const { width = 500, height = 300, chartFontSize = 16 } = options;
  const xAxesLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data1 = new Array(12).fill(0).map(() => getRandomInt(10, 60));
  const data2 = new Array(12).fill(0).map(() => getRandomInt(10, 60));

  return ChartJSImage()
    .chart({
      type: "bar",
      data: {
        labels: xAxesLabels,
        datasets: [
          {
            label: "",
            data: data1,
            backgroundColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
          },
          {
            label: "",
            data: data2,
            backgroundColor: "rgba(153, 102, 255, 1)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        legend: {
          display: false,
          labels: {
            fontSize: chartFontSize,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
          yAxes: [
            {
              ticks: {
                fontSize: chartFontSize,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontSize: chartFontSize,
              },
            },
          ],
        },
      },
    })
    .backgroundColor("white")
    .width(width)
    .height(height);
};
