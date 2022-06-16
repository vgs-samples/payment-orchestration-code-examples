import { BrowserInfo } from "./api/interface";

export const collectBrowserInfo = (): BrowserInfo => ({
  colorDepth: window.screen.colorDepth,
  javaEnabled: navigator.javaEnabled(),
  language: window.navigator.language,
  screenHeight: window.screen.height,
  screenWidth: window.screen.width,
  timeZoneOffset: new Date().getTimezoneOffset(),
  userAgent: window.navigator.userAgent,
});
