const { By, until } = require('selenium-webdriver');

class DashboardPage {
    constructor(driver) {
        this.driver = driver;
    }

    // Verifikasi apakah kita berada di halaman dashboard
    async IsOnDashboard() {
        const title = await this.driver.findElement(By.xpath("//span[@class='title']"));
        return title.getText();
    }

    // Menambahkan item ke keranjang berdasarkan indeks
    async addItemToCart(index) {
        const addToCartButton = await this.driver.findElement(By.xpath(`(//button[contains(@class, 'btn_inventory')])[${index}]`));
        await addToCartButton.click();
    }

    // Verifikasi jumlah item dalam keranjang
    async verifyItemsInCart() {
        const cartIcon = await this.driver.findElement(By.className('shopping_cart_link'));
        const cartCount = await cartIcon.getText(); // Mendapatkan jumlah item dalam keranjang
        return parseInt(cartCount, 10); // Mengembalikan jumlah item yang ada di keranjang
    }

    // Mengklik ikon keranjang untuk melanjutkan ke checkout
    async checkout() {
        const cartIcon = await this.driver.findElement(By.className('shopping_cart_link'));
        await cartIcon.click();
        const checkoutButton = await this.driver.findElement(By.id('checkout'));
        await checkoutButton.click();
    }

    // Mengisi informasi checkout
    async fillCheckoutInformation(firstName, lastName, zipCode) {
        const firstNameField = await this.driver.findElement(By.id('first-name'));
        await firstNameField.sendKeys(firstName);
        const lastNameField = await this.driver.findElement(By.id('last-name'));
        await lastNameField.sendKeys(lastName);
        const zipCodeField = await this.driver.findElement(By.id('postal-code'));
        await zipCodeField.sendKeys(zipCode);
        const continueButton = await this.driver.findElement(By.id('continue'));
        await continueButton.click();
    }

    // Verifikasi berada di halaman checkout
    async IsOnCheckoutPage() {
        const title = await this.driver.findElement(By.className('title'));
        return title.getText();
    }

    // Verifikasi halaman checkout setelah selesai
    async IsOnCheckoutCompletePage() {
        const title = await this.driver.findElement(By.className('complete-header'));
        return title.getText();
    }
}

module.exports = DashboardPage;
