class LoginScreen {
    private loginHeading: string;
    private emailField: string;
    private passwordField: string;
    private loginButton: string;

    constructor() {
        const isAndroid = driver.isAndroid;

        this.loginHeading = isAndroid
            ? '//android.widget.TextView[@resource-id="login-heading"]'
            : '-ios predicate string:type == "XCUIElementTypeStaticText" AND name == "login-heading"';

        this.emailField = isAndroid
            ? '//android.widget.EditText[@text="ignite@infinite.red"]'
            : '-ios predicate string:type == "XCUIElementTypeOther" AND name == "Email"';

        this.passwordField = isAndroid
            ? '//android.widget.EditText[@text="•••••••••••••••"]'
            : '-ios predicate string:type == "XCUIElementTypeOther" AND name == "Password"';

        this.loginButton = isAndroid
            ? 'android=new UiSelector().text("Tap to log in!")'
            : '-ios predicate string:type == "XCUIElementTypeButton" AND name == "login-button"';
    }

    getWhatToSeek(): string {
        return this.loginHeading;
    }

    getWhereToWrite(field: string): string {
        switch (field.toLowerCase()) {
            case "email":
                return this.emailField;
            case "password":
                return this.passwordField;
            default:
                throw new Error(`Field "${field}" not found`);
        }
    }

    getWhereToTapOn(button: string): string {
        if (button.toLowerCase() === "login") {
            return this.loginButton;
        }
        throw new Error(`Button "${button}" not found`);
    }
}

export default LoginScreen;
