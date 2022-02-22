---
title: 'Checking PS5 Inventory with JavaScript'
excerpt: "Learn how to use JavaScript to check if a product is in stock online."
coverImage: '/assets/blog/2022/playstation-controller.jpg'
date: '2022-02-21T06:00:00.000Z'
author:
  name: 'sandypockets'
  picture: '/assets/blog/authors/sandypockets_avatar.jpg' 
ogImage:
  url: '/assets/blog/2022/playstation-controller.jpg'
---

Between a global chip shortage, and internet trolls scooping up consoles in droves to resell on the secondary market, obtaining a next-gen console like the PS5 has felt impossible. It always seems to be out of stock, despite hearing of others that manage to get one added to their cart and purchased before they sell out again and the add to cart button switches back to the dreaded ‘coming soon’.

If you’re having a hard time getting your hands on one of these consoles, it probably boils down to checking the product page too infrequently. But let’s be realistic. Checking the product page every day (or more) is a pain, and I know it’s not something I’ll be able to stick to long term. Instead, we’d be better off to write a little JavaScript to handle that monotony for us instead.

In the steps that follow, we’ll take a look at:
- Setting up an Express.js server
- A short script that uses the Puppeteer library to navigate some web pages
- A GitHub action, to run a cron job

### Set up an Express server
If you already have your own server hosted somewhere, go ahead and skip over to the next step. If not, continue below.

To continue you will need to have Node.js (and NPM) installed, as well as [`express-generator`](https://expressjs.com/en/starter/generator.html) installed. If you don’t have the Express Generator, you can install it globally by running the following command in your terminal. To install it for this project only, run it without the `-g` flag.

```shell
npm install -g express-generator
```

Use the generator to scaffold out a simple server by running the following command in your terminal.

```shell
npx express --no-view --git
```

### Create a new API route
In the newly created project, in the `routes/` directory, create a new route file called `stockalert.js`. We’ll come back to this file soon. First, we'll get the connections to the `stockalert.js` file ready.

In the `app.js` file, create a new `stockAlertRouter` by adding the following line near the top of the file:

```javascript
const stockCheckerRouter = require('./routes/stockalert');
```

Then, configure the server to use that route:

```javascript
app.use('/stockalert', stockCheckerRouter);
```

Install the `dotenv` package, which we’ll use to read some environment variables (for sending an SMS message) in a later step.

```shell
npm install dotenv
```

Lastly, require `dotenv` in the `app.js` file, near the top.

```javascript
require('dotenv').config()
```

Your `app.js` code should look something like this:

```javascript
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Require dotenv
require('dotenv').config()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// stockCheckerRouter initialized
const stockCheckerRouter = require('./routes/stockalert');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Configure server to use this the new router for the /stockalert route
app.use('/stockalert', stockCheckerRouter);

module.exports = app;

```

### Add Puppeteer to the route
Head back over to the empty `routes/stockAlert.js` file you created earlier, and paste the following code in:

```javascript
const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const toNumber = process.env.TO_PHONE_NUMBER
const toNumber = process.env.FROM_PHONE_NUMBER

router.get('/', function(req, res, next) {
  async function startBrowser(){
  let browser
  try {
      console.log("Opening the browser...")
      browser = await puppeteer.launch({
        headless: true,
        args: ["--disable-setuid-sandbox", "--no-sandbox"],
        'ignoreHTTPSErrors': true,
      })
    } catch (err) {
      console.error("Couldn't create browser instance: ", err)
    }
    return browser
  }

  function checkBestBuy() {
    const pageScraper = {
      url: `https://www.bestbuy.ca/en-ca/product/playstation-5-console/15689336`,
      async scraper(browser) {
        let counter = 0
        let page = await browser.newPage()
        await page.setDefaultNavigationTimeout(0);
        console.log(`Navigating to ${this.url}...`)
        await page.goto(this.url)
        const addToCartClassList = await page.$eval("button.addToCartButton", el => el.classList)
        for (let classItem in addToCartClassList) {
          const classNameText = addToCartClassList[classItem].split('_')[0]
          if (classNameText === 'disabled') {
            console.log("PS5 is still out of stock at BestBuy. ", new Date().toLocaleDateString('en-CA'))
            counter++;
            await page.close()
          }
        }
        if (counter === 0) {
          const dateToday = new Date().toLocaleDateString('en-CA')
          console.log("PS5 is in stock at Best Buy. ", dateToday)
          client.messages
            .create({
              body: `PS5 is in stock at BestBuy.ca ${dateToday}`,
              from: fromNumber,
              to: toNumber
            })
            .then(message => console.log(message.sid));
        }
      }
    }
    async function scrapeAll(browserInstance, pageScraper){
      let browser
      try{
        browser = await browserInstance
        await pageScraper.scraper(browser)
      }
      catch(err){
        console.log("Could not resolve the browser instance: ", err)
      }
    }
    let browserInstance = startBrowser()
    return scrapeAll(browserInstance, pageScraper)
  }
  
  res.status(200).send("Checking inventory...")
  console.log("Beginning stock check...")
  checkBestBuy()
});

module.exports = router;
```

In this script, we’re checking if the PS5 add to cart button is disabled. If it is, the server writes a log to the console stating that the PS5 is still out of stock. If it’s _not_ disabled, then the add to cart button is active, and the server uses Twilio’s API to send an SMS message and notify the user that the product is finally available.

That’s all the server code we’ll need to write, and we don't need to write any frontend code at all. But it won’t work just yet. As you might have seen, we’re using a couple packages, [Puppeteer](https://www.npmjs.com/package/puppeteer) and [Twilio](https://www.npmjs.com/package/twilio), that we haven’t set up yet. Let’s go ahead and install both now with the following commands:

```shell
npm install puppeteer
npm install twilio
```

We’ll also need to set up some aforementioned environment variables. Create a new file called `.env` and paste the following information in, replacing the placeholders with your actual values.

```javascript
TWILIO_ACCOUNT_SID=123456789
TWILIO_AUTH_TOKEN=123456789
TO_PHONE_NUMBER=123456789
FROM_PHONE_NUMBER=123456789
```

You can gather all of these numbers (except the `TO_PHONE_NUMBER`, which you can set to whatever you’d like) from within your Twilio account.

### Create a cron job with GitHub actions
While everything will work as is, the one thing it won't do for us is check the availablility automatically. We'll have to manually trigger the script to run by visiting the `/stockalert` route ourselves. Let's automate that to run daily using a cron job. 

Create a new directory called `.github`. In it, create another new directory called `workflows`. In that, create a file called `cron.yml`, and paste in the following code:

```yaml

name: Cron

# Controls when the workflow will run
on:
  schedule:
    # * is a special character in YAML so you have to quote this string
    - cron: '20 4 * * *'

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

jobs:
  # This workflow contains a single job called "check-due-date"
  check-availability:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2

      # Runs a single command using the runners shell
      # run: command will need updated URL once live
      - name: Run a one-line script
        run: curl --location --request GET 'https://your-server-url.com/stockalert'

```

You can get the full run down of what’s in this file in the [GitHub Cron Docs](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#scheduled-events), but essentially what is happening here is:
1. We’re running an action called “Cron”
2. It runs on a schedule, on the 20th minute of the 4th hour of each day, in Zulu (GMT) time.
3. And the job we want to run on said schedule is a one-line script. The script is an HTTP request, which triggers the Puppeteer code we’ve written in the `stockalert` route.

And that's it. The code on your server now runs on a schedule, and will check the inventory of said PS5 each day for you automatically. 

### Further reading
- Learn more about[GitHub Actions](https://docs.github.com/en/actions)
- Read and write cron dates easily with [Crontab Guru](https://crontab.guru/#20_4_*_*_*)
- [Cron Jobs](https://en.wikipedia.org/wiki/Cron) on Wikipedia

Cover image from [Andreas Haslinger](https://unsplash.com/@andreas_haslinger?utm_source=unsplash&utm_medium=referral&utm_content=sandypockets) on Unsplash