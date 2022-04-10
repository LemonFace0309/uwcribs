import { Builder, By, until } from "selenium-webdriver";

export const buildChromeDriver = () => {
  return new Builder().forBrowser("chrome").build();
};

export const driver = buildChromeDriver();

export const logIntoFacebook = async (driver) => {
  await driver.get("https://mobile.facebook.com/");
  await driver.wait(until.titleIs("Facebook - Log In or Sign Up"), 1000);
  await driver
    .findElement(By.id("m_login_email"))
    .sendKeys(process.env.FB_EMAIL);
  await driver
    .findElement(By.id("m_login_password"))
    .sendKeys(process.env.FB_PASSWORD);
  await driver.findElement(By.name("login")).click();
  await driver.wait(until.titleIs("Facebook"), 1000000);
};

export const startup = async () => {
  logIntoFacebook(driver);
};
