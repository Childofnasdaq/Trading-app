import puppeteer from 'puppeteer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { login, password } = req.body;

        // Start Puppeteer and launch the browser
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // Open MetaTrader 5 Web Terminal
        await page.goto('https://web.metatrader.app/terminal/');

        // Wait for the login form to load and input credentials
        await page.waitForSelector('input[name="login"]');
        await page.type('input[name="login"]', login);
        await page.type('input[name="password"]', password);
        await page.click('button[type="submit"]');

        // Wait for the login process to complete
        await page.waitForNavigation();

        console.log('Logged in successfully!');

        // Example: Add further automation steps, like placing a trade
        // You can automate actions like opening a trade here
        // await page.click('buy-button-selector');
        
        await browser.close();

        // Respond with success message
        res.status(200).json({ message: 'Trading started successfully!' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
