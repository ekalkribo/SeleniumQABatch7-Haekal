const { Builder } = require('selenium-webdriver');
const LoginPage = require('./WebComponent/LoginPage');
const DashboardPage = require('./WebComponent/DashboardPage');
const assert = require('assert');
const fs = require('fs');

const screenshotDir = './screenshots/';
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

describe('SauceDemo TestCase', function () {
    this.timeout(40000);
    let driver;

    // Setup driver sebelum setiap test
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    // Test sebelum setiap test, login dulu
    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    // Login dan verifikasi dashboard
    it('Login successfully and verify dashboard', async function () {
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.IsOnDashboard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title to be Products');
    });

    //menambahkan 2 item ke keranjang dan verifikasi
    it('Add 2 items to cart and verify in cart', async function () {
        const dashboardPage = new DashboardPage(driver);
        
        // Menambahkan item pertama ke keranjang
        await dashboardPage.addItemToCart(1);
        
        // Menambahkan item kedua ke keranjang
        await dashboardPage.addItemToCart(2);

        // 2 item ada di keranjang
        const numberOfItemsInCart = await dashboardPage.verifyItemsInCart();
        assert.strictEqual(numberOfItemsInCart, 2, 'Expected 2 items in the cart');
    });

    // checkout dan verifikasi halaman checkout
    it('Checkout 2 items and verify checkout page', async function () {
        const dashboardPage = new DashboardPage(driver);
        
        // Menambahkan item pertama dan kedua
        await dashboardPage.addItemToCart(1);
        await dashboardPage.addItemToCart(2);
        
        // item ada di keranjang
        const numberOfItemsInCart = await dashboardPage.verifyItemsInCart();
        assert.strictEqual(numberOfItemsInCart, 2, 'Expected 2 items in the cart');
        
        // Melakukan checkout
        await dashboardPage.checkout();
        
        // Isi informasi checkout
        await dashboardPage.fillCheckoutInformation('Haekal', 'Santuy', '15411');
        
        // Verifikasi halaman checkout
        const checkoutTitle = await dashboardPage.IsOnCheckoutPage();
        assert.strictEqual(checkoutTitle, 'Checkout: Your Information', 'Expected checkout page title to be Checkout: Your Information');
        
        //  mengonfirmasi checkout
        await dashboardPage.checkout(); // Konfirmasi checkout
        
        const checkoutCompleteTitle = await dashboardPage.IsOnCheckoutCompletePage();
        assert.strictEqual(checkoutCompleteTitle, 'THANK YOU FOR YOUR ORDER', 'Expected completion message after checkout');
        
        // Ambil screenshot setelah selesai checkout
        const screenshotComplete = await driver.takeScreenshot();
        const filepathComplete = `${screenshotDir}Checkout_complete_${Date.now()}.png`;
        fs.writeFileSync(filepathComplete, screenshotComplete, 'base64');
    });

    // Keluar setelah melakukan transaksi
    after(async function () {
        await driver.quit();
    });
});
