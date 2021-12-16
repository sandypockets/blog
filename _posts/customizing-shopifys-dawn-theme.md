---
title: 'Customizing Shopify’s Dawn theme'
excerpt: "The start of a short series of tutorials for customizing Shopify's newest theme, Dawn."
coverImage: '/assets/blog/counting-cards-with-javascript/birds.jpg'
date: '2021-12-15T06:00:00.000Z'
author:
  name: 'sandypockets'
  picture: '/assets/blog/authors/sandypockets_avatar.jpg'
ogImage:
  url: '/assets/blog/customizing-shopifys-dawn-theme/computer-code.jpg'
---

Shopify’s newest theme, Dawn, is fast, beautifully designed, and comes with a solid range of settings right out of the box. Still, even with such great flexibility built into the theme editor, some businesses might still need to make additional adjustments. In this short blog series, I’ll walk through building out small features, and adding controllable settings to theme editor to manage them.

## Button rounding, with settings, in 2 steps
Button shapes typically come in three varieties: square corners, soft corners, and a pill. The Dawn theme uses square corners by default, but doesn’t include any settings to round those corners without writing code. Let’s add some code to allow the user to toggle button rounding on and off, as well as manage the rounding amount.

### Step 1  - Add some CSS
Open the `theme.liquid` file. Add a new line above the `{% endstyle %}` liquid tag. Then create a new CSS rule to round the buttons.

Shopify uses anchor elements, with a `.button` class for most navigational buttons, however the add to cart form uses an actual `<button>` element. Additionally, the “Buy it now” button (if enabled) has some extra classes, so you need to make sure you’re being specific enough with your CSS for the change to take effect.

And since we want the user to be able to control the button radius themselves from the theme editor, we’ll use some Liquid to represent the actual radius value.

The CSS rule should look something like this:

```liquid
a.button, button.button, button.shopify-payment-button__button {
	border-radius: {{ settings.button_border_radius }}px;
}
```

a.button, button.button, button.shopify-payment-button__button {
border-radius: {{ settings.button_border_radius }}px;
}

### Step 2
Next up, let’s add a setting to the schema, so we can give that `{{ settings.button_border_radius }}` a value.

In the `config` folder, open the `settings_schema.json` file. Create a new line after the closing curly bracket of the first object in the settings array. In `Dawn version 2.4.0`, it’s on line 9.

Then, paste the following settings onto the new line you created.

```json
  {
    "name": "Custom",
    "settings": [
      {
        "type": "header",
        "content": "Button rounding"
      },
      {
        "type": "range",
        "id": "button_border_radius",
        "min": 0,
        "max": 30,
        "step": 5,
        "unit": "px",
        "label": "Button border radius",
        "default": 0
      }
    ]
  },
```

This will create a new settings section in the theme editor’s Theme Settings area. The new settings section will be titled “Custom”, and within it we’ll have a section for “Button rounding”.

![theme settings](/assets/blog/customizing-shopifys-dawn-theme/theme-settings.png)

Then, if you need to add any new settings that impact the theme globally, you can add them to the `settings` array, in the same `Custom` object we created above.

```json
  {
    "name": "Custom",
    "settings": [
      {
        "type": "header",
        "content": "Button rounding"
      },
      {
        "type": "range",
        "id": "button_border_radius",
        "min": 0,
        "max": 30,
        "step": 5,
        "unit": "px",
        "label": "Button border radius",
        "default": 0
      },
	  {
        "type": "header",
        "content": "Some new heading title"
      },
      {
        "type": "checkbox",
        "id": "some_new_id",
        "label": "This checkbox does something",
        "default": false
      }
    ]
  },
```
