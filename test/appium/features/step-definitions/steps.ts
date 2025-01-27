import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'

Given('The app is displaying the login page with credentials included', async () => {
    
    const capabilities = browser.capabilities;

    console.log('CAPABILITIES', capabilities)

    const loginHeading = await $('//android.widget.TextView[@resource-id="login-heading"]');
    expect(await loginHeading.isDisplayed()).toBe(true);

    const emailField = await $('//android.widget.EditText[@text="ignite@infinite.red"]');
    expect(await emailField.isDisplayed()).toBe(true);
    expect(await emailField.getText()).toBe('ignite@infinite.red');

    const passwordField = await $('//android.widget.EditText[@text="•••••••••••••••"]');
    expect(await passwordField.isDisplayed()).toBe(true);

    const loginButton = await $(`android=new UiSelector().text("Tap to log in!")`);
    expect(await loginButton.isDisplayed()).toBe(true);
});

When('I click the Continue button', async () => {

    const loginButton = await $('//android.widget.Button[@content-desc="Tap to log in!"]');
    expect(await loginButton.isDisplayed()).toBe(true);

    await loginButton.click();
});

Then('I should be redirected to', async () => {

    const capabilities = browser.capabilities;

    console.log('CAPABILITIES', capabilities)

})
