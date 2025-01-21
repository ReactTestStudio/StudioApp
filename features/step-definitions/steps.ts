import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'

Given(/^I am on the (\w+) page$/, async (page) => {
    await browser.url(`https://the-internet.herokuapp.com/${page}`);
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await $('#username').setValue(username);
    await $('#password').setValue(password);
    await $('button[type="submit"]').click();
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    await expect($('#flash')).toBeExisting();
    await expect($('#flash')).toHaveText(expect.stringContaining(message));
});

Given('The app is loaded', async () => {
    await driver.pause(8000);

    // const elements = await driver.findElements('class name', 'android.view.View');

    // for (const element of elements) {
        // const elementId = element.elementId; // ID interno del elemento
        // const text = await driver.getElementText(elementId); // Texto del elemento
        // const resourceId = await driver.getElementAttribute(elementId, 'resource-id'); // resource-id del elemento
        // const className = await driver.getElementAttribute(elementId, 'class'); // Clase del elemento

        // console.log(`Elemento encontrado:
        // - ID: ${elementId}
        // - Texto: ${text}
        // - Resource ID: ${resourceId}
        // - Clase: ${className}`);
        // }
});

When('I click the Continue button', async () => {
    const continueButton = await $('-android uiautomator', 'new UiSelector().text("Continue")');

    const isDisplayed = await continueButton.isDisplayed();
    if (!isDisplayed) {
        throw new Error('El botón "Continue" no está visible en la pantalla.');
    }

    await continueButton.click();
});





