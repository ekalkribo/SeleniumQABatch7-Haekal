const { Builder, By, Key, until } = require('selenium-webdriver');

async function exampleTest() {
  // membuat koneksi dengan Browser Driver
  let driver;

  //Exception handling & Conclusion
  try { 
    //Buka URL di browser
    await driver.get("https://www.google.com");
  } finally {
    
  }
}

exampleTest();