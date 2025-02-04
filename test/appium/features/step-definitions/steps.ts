import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'
import { LoginScreen } from '../screen-objects/login.screen';

const isAndroid = driver.isAndroid;

interface Status {
    screen?: string;
}
const status: Status = {};

Given("The app is displaying the login page with credentials included", async () => {
    status.screen = "login";

    console.log("Checking Login Screen is displayed");
    const whatToSeek = LoginScreen[status.screen].getWhatToSeek();
    const findWhatToSeek = await $(whatToSeek);
    await expect(findWhatToSeek).toBeDisplayed();

    console.log("Checking Email Field is displayed");
    const emailField = await $(LoginScreen[status.screen].getWhereToWrite("email"));
    await expect(emailField).toBeDisplayed();

    console.log("Checking Password Field is displayed");
    const passwordField = await $(LoginScreen[status.screen].getWhereToWrite("password"));
    await expect(passwordField).toBeDisplayed();

    console.log("Checking Login Button is displayed");
    const loginButton = await $(LoginScreen[status.screen].getWhereToTapOn("login"));
    await expect(loginButton).toBeDisplayed();
});

When('I click the Continue button', async () => {

    const loginButton = isAndroid
    ? $(`android=new UiSelector().text("Tap to log in!")`)
    : $('-ios predicate string:type == "XCUIElementTypeButton" AND name == "login-button"');

    await loginButton.click();
});

Then('I should be redirected to', async () => {

    const capabilities = browser.capabilities;

    console.log('CAPABILITIES', capabilities)

})
