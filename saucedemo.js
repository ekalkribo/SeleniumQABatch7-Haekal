const { Builder, By, Key, until, Button} = require('selenium-webdriver');
const assert = requiere('assert');

async function sauceDemoLoginTest(){

    // Membuat koneksi dengan browser driver
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get("https://www.saucedemo.com");
    
        //masukan username dan password
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce');


        //click Button login
        await driver.findElement(By.xpath("//input[@id='login-button']")).click();


        //memastikan dasborad mencari judul "swag labs
        
        //memastikan dashboard dengan mencari "burger button"

    
    } finally {
        await driver.quit();
    }
}

sauceDemoLoginTest();