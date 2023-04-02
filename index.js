const path = require("path");
// const puppeteer = require("puppeteer");
// const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const Mustache = require("mustache");

const express = require("express");
// const { generateBarChart } = require("./chart3");
// const { generateLineChart, generateBarChart } = require("./chart");
const { generatePdf } = require("./pdf");
const { getRandomInt } = require("./utils");
const app = express();

app.use("/template", express.static(path.join(__dirname, "template")));
// require("./chart2");

// app.get("/test", async (req, res) => {
//   try {
//     const image = await generateBarChart();

//     return res.status(200).json({ data: image });
//   } catch (e) {
//     return res.status(500).json({ message: e.message });
//   }
// });

app.get("/test2", async (req, res) => {
  try {
    await generatePdf();

    res.json({ message: "Success" });
  } catch (e) {
    console.log("e =>", e);
    return res.status(500).json({ message: e.message });
  }
});

app.get("/test3", async (req, res) => {
  try {
    const data = {
      labels: [
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
      ],
      datasets: [
        {
          label: "Active users",
          data: new Array(12).fill(0).map(() => getRandomInt(1000, 3000)),
          borderWidth: 1,
        },
        {
          label: "Total users",
          data: new Array(12).fill(0).map(() => getRandomInt(3000, 6000)),
          borderWidth: 1,
        },
      ],
    };

    const view = {
      name: "Izaan Jahangir",
      data: JSON.stringify(data),
    };

    const htmlPath = path.resolve("./template/index.mustache");
    const htmlFile = fs.readFileSync(htmlPath, { encoding: "utf-8" });

    console.log("htmlFile =>", htmlFile);

    var output = Mustache.render(htmlFile, view);
    res.setHeader("content-type", "text/html");
    res.send(output);
  } catch (e) {
    console.log("e =>", e);
    return res.status(500).json({ message: e.message });
  }
});

app.listen(5001, () => {
  console.log("Server is running on PORT 5001");
});
