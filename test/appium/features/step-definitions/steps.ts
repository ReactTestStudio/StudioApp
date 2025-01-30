import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'

const isAndroid = driver.isAndroid;


Given('The app is displaying the login page with credentials included', async () => {    

    const loginHeading = isAndroid
        ? $('//android.widget.TextView[@resource-id="login-heading"]')
        : $('-ios predicate string:type == "XCUIElementTypeStaticText" AND name == "login-heading"');

    expect(await loginHeading.isDisplayed()).toBe(true);

    const emailField = isAndroid
    ? $('//android.widget.EditText[@text="ignite@infinite.red"]')
    : $('-ios predicate string:type == "XCUIElementTypeOther" AND name == "Email"');

    expect(await emailField.isDisplayed()).toBe(true);

    const passwordField = isAndroid
    ? $('//android.widget.EditText[@text="•••••••••••••••"]')
    : $('-ios predicate string:type == "XCUIElementTypeOther" AND name == "Password"');

    expect(await passwordField.isDisplayed()).toBe(true);

    const loginButton = isAndroid
    ? $(`android=new UiSelector().text("Tap to log in!")`)
    : $('-ios predicate string:type == "XCUIElementTypeButton" AND name == "login-button"');
    
    expect(await loginButton.isDisplayed()).toBe(true);
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
