const { CanvasRenderService } = require("chartjs-node-canvas");
const ChartJS = require("chart.js");
const { getRandomInt } = require("./utils");
// const width = 1000; // define width and height of canvas
// const height = 1000;
const chartCallback = (ChartJS) => {
  console.log("chart built");

  return ChartJS;
};
const chartJsFactory = (Chart) => {
  require("chartjs-plugin-datalabels");
  delete require.cache[require.resolve("chart.js")];
  delete require.cache[require.resolve("chartjs-plugin-datalabels")];
  return ChartJS;
};

var xLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

const createImage = async (options = {}) => {
  const { width = 500, height = 300, chartFontSize = 16 } = options;
  const xAxesLabels = new Array(31).fill(0).map((_, index) => index + 1);
  const data = new Array(31).fill(0).map(() => getRandomInt(1000, 6000));

  const canvasRenderService = new CanvasRenderService(
    width,
    height,
    undefined,
    undefined,
    chartJsFactory
  );

  const configuration = {
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
        yAxis: {
          ticks: {
            fontSize: chartFontSize,
          },
        },
        xAxis: {
          ticks: {
            fontSize: chartFontSize,
          },
        },
      },
    },
  };

  const dataUrl = await canvasRenderService.renderToDataURL(configuration); // converts chart to image
  return dataUrl;
};

module.exports = {
  createImage, //for exporting to another file
};
