const puppeteer = require("puppeteer");

exports.generateBarChart = async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage({});

    await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 5 });
    await page.goto(`http://localhost:5001/test3`, {});
    const element = await page.$("#myChart"); // declare a variable with an ElementHandle
    const image = await element.screenshot({
      encoding: "base64",
      type: "jpeg",
      quality: 100,
    });

    return image;
  } catch (e) {
    throw new Error(e);
  } finally {
    await browser.close();
  }
};
