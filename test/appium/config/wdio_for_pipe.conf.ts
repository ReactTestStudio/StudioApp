import { config as baseConfig } from "./wdio.conf.ts"
export const config: WebdriverIO.Config = {
  ...baseConfig,
  port: 4444,
}
//   capabilities: [
//     {
//       // capabilities for local Appium web tests on an Android Emulator
//       "platformName": "android",
//       "appium:deviceName": "automationTest",
//       "appium:platformVersion": "14.0",
//       "appium:automationName": "UiAutomator2",
//       "appium:app": path.join(
//         basePath,
//         "../../../android/app/build/outputs/apk/release/",
//         "app-release.apk",
//       ),
//       "appium:appPackage": "com.studioapp",
//       "appium:appActivity": "com.studioapp.MainActivity",
//       "appium:noReset": true,
//       "appium:fullReset": false,
//     },
//   ]
// }
