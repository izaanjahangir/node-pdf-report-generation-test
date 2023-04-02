const PdfPrinter = require("pdfmake");
const fs = require("fs");

const {generateBarChart} = require("./chart3");
// const { generateBarChart, generateLineChart } = require("./chart");
const { createImage } = require("./chartjsnode");
const fonts = {
  Roboto: {
    normal: "./fonts/Roboto-Regular.ttf",
    bold: "./fonts/Roboto-Medium.ttf",
    italics: "./fonts/Roboto-Italic.ttf",
    bolditalics: "./fonts/Roboto-MediumItalic.ttf",
  },
};
const printer = new PdfPrinter(fonts);

exports.generatePdf = async () => {
  // const width = 500,
  //   height = 300,
  //   chartFontSize = 40;
  // const barChart = generateBarChart({
  //   width: width * 5,
  //   height: height * 5,
  //   chartFontSize,
  // });
  // const lineChart = generateLineChart({
  //   width: width * 5,
  //   height: height * 5,
  //   chartFontSize,
  // });

  // const newImage = await createImage({
  //   width: width * 5,
  //   height: height * 5,
  //   chartFontSize,
  // });
  const image = await generateBarChart();

  const docDefinition = {
    content: [
      { text: "Tables", style: "header" },
      "Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.",
      {
        style: "tableExample",
        table: {
          widths: [100, "*", 200, "*"],
          headerRows: 1,
          body: [
            ["width=100", "star-sized", "width=200", "star-sized"],
            [
              "fixed-width cells have exactly the specified width",
              {
                text: "nothing interesting here",
                italics: true,
                color: "gray",
              },
              {
                text: "nothing interesting here",
                italics: true,
                color: "gray",
              },
              {
                text: "nothing interesting here",
                italics: true,
                color: "gray",
              },
            ],
          ],
        },
      },

      {
        image: `data:image/jpeg;base64,${image}`,
        width: 500,
        margin: [0, 10, 0, 0],
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
      },
    },
    defaultStyle: {
      // alignment: 'justify'
    },
  };

  const options = {};

  const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  pdfDoc.pipe(fs.createWriteStream("document.pdf"));
  pdfDoc.end();
};
