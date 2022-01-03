---
title: 'How to build a Chrome extension'
excerpt: "Learn how to make a Chrome extension with HTML, CSS, and Vanilla JavaScript that reminds the user to drink water every X minutes."
coverImage: '/assets/blog/how-to-build-a-chrome-extension/islands.jpg'
date: '2022-01-03T06:00:00.000Z'
author:
  name: 'sandypockets'
  picture: '/assets/blog/authors/sandypockets_avatar.jpg'
ogImage:
  url: '/assets/blog/how-to-build-a-chrome-extension/islands.jpg'
---

In this guide, we'll build a simple Chrome extension from scratch. The extension will have a popup, where the user can click a button to set a timer. When the timer goes off, the user receives a browser notification with a message reminding them to drink water. 

If you just want to see an example of the extension, you can see a [finished version of the project on GitHub](https://github.com/sandypockets/sip-station). The extension is also [published in the Chrome Web Store](https://chrome.google.com/webstore/detail/sip-station/cedealgnjccghookodhjapfacclidlcm) if you want to try it out. Otherwise, let's get started.

> Before adding any files, be sure to create a new folder containing everything for the project. In the examples below, the project folder is called `chrome-extension-timer/`

### Step 1: manifest.json
Create a new file in your `chrome-extension-timer/` folder called `manifest.json`. 

The `manifest.json` file contains basic information about your extension, like the name, version, and what sort of permissions it has access to. Open the `manifest.json` file in an editor, and copy and paste the following information into your newly created file.

```json
{
  "name": "Water Reminder Extension",
  "description": "A popup reminder to drink water throughout the day.",
  "version": "1.0",
  "manifest_version": 3,
  "permissions": [
    "alarms",
    "notifications",
    "storage"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_title": "Water Reminder Extension",
    "default_popup": "popup.html"
  },
  "icons": {
    "16": "images/water16.png",
    "24": "images/water24.png",
    "32": "images/water32.png",
    "48": "images/water48.png",
    "64": "images/water64.png",
    "96": "images/water96.png",
    "128": "images/water128.png",
    "192": "images/water192.png",
    "256": "images/water256.png",
    "512": "images/water512.png"
  }
}
```

Reading through that file, you might be wondering about `background.js` and `popup.html`. And what the heck is a service worker? We’ll get into that shortly. First, let’s create the `popup.html` file, so we can work with something a bit easier to visualize, which will make things much easier when creating the JavaScript files after.

### Step 2:  popup.html

First, create a new file called `popup.html`, and paste in the code below.

```html
<html>
  <head>
    <title>Water Reminder</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./popup.css">
  </head>
  <body>
    <img src='images/water-drop256.png' id='heroimage'>
    <h1>Water Reminder</h1>
    <p>Remind me to drink water every...</p>
    <div class="button-group">
      <button id='15min' value='15'>15 Minutes</button>
      <button id='30min' value='30'>30 Minutes</button>
      <button id='1hr' value='60'>1 Hour</button>
      <button id='turnOff'>Turn off</button>
    </div>
    <!-- link to non-persistent background script -->
    <script src="popup.js"></script>
  </body>
</html>
```

We’ve already included a few things like fonts and classes that we’ll target with our CSS in the next step. 

You might have noticed the `link to non-persistent background script` comment in the code above too. It will make more sense as we go on, but `non-persistent` is the thing to note here, and is the primary difference between the `popup.js` script and the `background.js` script. `popup.js` runs _within_ `popup.html`, and only runs when the popup is open. `background.js` on the other hand, uses a service worker (as specified in the `manifest.json`), which is able to persist, even when the popup is closed.

Also take note of how the buttons are configured, since that’s where all the extension’s functionality stems from. We’ve added a `value` attribute with a number that corresponds to the duration of time clicking each button will result in. There’s also an `id` attribute, which will be used in `popup.js` to select those buttons on the page, and make them interactive.

### Step 3: popup.css

Create a new file called `popup.css`, and paste in the code below. Feel free to modify the CSS to suit your style.

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800;900&display=swap');

html {
    height: auto;
    width: 275px;
    font-family: Inter, sans-serif;
}

body {
    text-align: center;
    background: linear-gradient(to left bottom, rgb(56, 189, 248), rgb(103, 232, 249));
}

#heroimage {
    width: 100px;
    margin: 5px;
    filter: invert(1);
}

h1 {
    color: white;
    font-weight: 900;
    font-size: 26px;
    margin: 0 3px;
    padding: 0 0 3px 0;
}

p {
    color: white;
    font-weight: 400;
    font-size: 16px;
}

button {
    margin: 5px 10px;
    outline: none;
    background: white;
    border: none;
    border-radius: 10px;
    color: rgb(14, 59, 79);
    padding: 4px 5px;
    font-weight: 500;
    letter-spacing: 0.030em;
}

button:hover {
    background: linear-gradient(to right bottom, rgb(56, 189, 248), rgb(59, 130, 246));
    color: white;
    font-weight: 500;
    transition-property: background;
    transition-duration: 200ms;
}

div.button-group {
    display: flex;
    flex-direction: column;
}
```

### Step 3: popup.js

Create a new file called `popup.js`. This JavaScript file is what makes the buttons in `popup.html` interactive.

Paste the following code into your new `popup.js` file.

```javascript
function setAlarm(event) {
  let minutes = parseFloat(event.target.value);
  chrome.action.setBadgeText({ text: 'ON' });
  chrome.alarms.create({ delayInMinutes: minutes });
  chrome.storage.sync.set({ minutes: minutes });
  window.close();
}

function clearAlarm() {
  chrome.action.setBadgeText({ text: '' });
  chrome.alarms.clearAll();
  window.close();
}

document.getElementById('15min').addEventListener('click', setAlarm);
document.getElementById('30min').addEventListener('click', setAlarm);
document.getElementById('1hr').addEventListener('click', setAlarm);
document.getElementById('turnOff').addEventListener('click', clearAlarm);
```

Let’s dive into what’s happening with this script a bit further. Since the interactivity is managed by the event listeners at the bottom of the file, it’s easiest to explain what’s happening by examining those first.

We start by getting each button element from our `popup.html` file using the `id` attribute, which we’ve set up to correspond to the duration between alarms. Then, an event listener is added to each element, which will listen for `click` events. When a `click` event occurs, the `setAlarm` function from the top of the file is called.

The `setAlarm` function uses the button's `value` attribute from `popup.html`, which corresponds to the number of minutes the alarm should go off in, and then takes the following actions:

1. Uses `action.setBadgeText({ text: 'ON' })` to display a small “ON” label on the Chrome extension icon in the browser. This ensures the user can easily see whether their extension is active or not, which is important user feedback for any extensions that will run in the background after the popup is closed.
2. Creates the alarm with `alarms.create({ delayInMinutes: minutes })`, using the button's `value` attribute on `popup.html` as `minutes`
3. Adds the alarm minutes to the browser’s local storage with `storage.sync.set({ minutes: minutes })`.
4. The `window.close()` method closes the popup, so the user doesn’t need to manually close it after setting their timer.

### Step 4: background.js

The `popup.js` file provides interactivity in the popup itself, but much of the functionality behind the timer uses a service worker in `background.js`

The code below doesn’t look dissimilar from `popup.js`, and it isn’t. You might be wondering why we don’t combine those two files. It’s the same reason that was explained in that HTML comment back in Step 2.

```html
<!-- link to non-persistent background script -->
    <script src="popup.js"></script>
```

Since `popup.js` runs within `popup.html`, it isn’t persistent. It stops running as soon as the popup is closed. That means we can create an alarm (a timer), but can’t _listen_ for it to go off to take an action.

With `background.js`, we can run the script constantly. This means that any event listeners (in this case, alarm listeners) in the script will continue to listen, even after the popup closes.

Create a new file called `background.js`. Paste in the following code:

```javascript
chrome.alarms.onAlarm.addListener(function() {
  chrome.action.setBadgeText({text: ''});
  const options = {
    type:     'basic',
    iconUrl:  'images/water256.png',
    title:    'Water Reminder Extension',
    message:  'Drink water!',
    requireInteraction: true,
    priority: 0
  }

  chrome.notifications.create(options)
  chrome.storage.sync.get(['minutes'], function(item) {
    chrome.action.setBadgeText({ text: 'ON' });
    chrome.alarms.create({ delayInMinutes: item.minutes });
  });
});

chrome.notifications.onButtonClicked.addListener(function() {
  chrome.action.setBadgeText({ text: '' });
  chrome.alarms.clearAll();
  window.close();
});
```

While Chrome’s API is fairly verbose, it could be better documented. Let’s unpack what this `background.js` script is doing.

The `chrome.alarms.onAlarm.addListener` function is an event listener, that listens for Chrome alarms, like the ones we set in `popup.js`. When an alarm event happens, the function:

1. Sets the badge text to an empty string, which removes the “ON” label from the icon in the browser.
2. We define an options object, which is then passed into the notification that is created to be displayed to the user. With these options, the notification will have a small icon, and will include some text telling the user to “Drink water!”
3. We use `chrome.storage.sync.get` to check the browser’s local storage to retrieve the timer duration, so it can be reset without any user action. In `popup.js`, we defined the browser storage key as `minutes`. We can access that storage by passing the key in an array, with a callback.

```javascript
chrome.storage.sync.get(['minutes'], function(item) {
  // Do stuff
});
```

4. Now, with the duration of minutes for the next alarm, the extension turns itself back on. The badge text is set to “ON”, and the callback in the previous step sets a new alarm with the stored minutes with `chrome.alarms.create({ delayInMinutes: item.minutes })`

But what about that last bit of code?

```javascript
chrome.notifications.onButtonClicked.addListener(function() {
  chrome.action.setBadgeText({ text: '' });
  chrome.alarms.clearAll();
  window.close();
});
```

As you’ll see when running the extension or testing out the demo from the web store, the user can stop the alarm from the notification itself, without navigating back to the browser.

### Step 5: Images
Lastly, we need to add some images to our project, which we’ll use for the icons. We’ve already specified the file path and names in the `manifest.json` file, so while it’s no problem to name your files differently, or include more or fewer sizes, just be sure to adjust your `manifest.json` file accordingly.

Create a new folder called `images`.

Then, you can either upload you own images, or you can [download the images from the example repo](https://github.com/sandypockets/sip-station/tree/main/images) instead.

### Step 6: Load the extension into your browser
It's time to load your extension into your browser, and test it out. In your Chrome browser:

1. Open the Extension Management page by navigating to [`chrome://extensions`](chrome://extensions). 
2. Enable Developer Mode by clicking the toggle switch next to `Developer mode`.
3. Click the Load unpacked button and select the `chrome-extension-timer/` folder containing all the project files created above.

### Next steps
- [Chrome Docs: Publish your extension to the Chrome Web Store](https://developer.chrome.com/docs/webstore/publish/)
- Try out my new  [quick start template for building Chrome extensions with React.js and Tailwind CSS](https://github.com/sandypockets/chrome-extension-template)
- Try a [demo of this extension in the Chrome Web Store](https://chrome.google.com/webstore/detail/sip-station/cedealgnjccghookodhjapfacclidlcm)
