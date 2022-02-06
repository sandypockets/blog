---
title: 'Hiding the Cart Icon on Shopify’s Dawn theme'
excerpt: "Learn how to add a setting to the Theme Editor to hide or show the cart icon in the header."
coverImage: '/assets/blog/2022/ottawa-office.jpg'
date: '2022-02-05T06:00:00.000Z'
author:
  name: 'sandypockets'
  picture: '/assets/blog/authors/sandypockets_avatar.jpg'
ogImage:
  url: '/assets/blog/2022/ottawa-office.jpg'
---


The Dawn theme completely changed the way Shopify themes are built. It added more granular control than we’ve had before, making it a better fit for a wider range of purposes. But some businesses (or soon-to-be businesses!) just don’t need that cart functionality yet, or at all. 

In those cases, thanks to Online Store 2.0, we can remove some parts without adjusting any code at all. But to remove the cart icon from the header at the top of the page, we'll need to make some changes to the code. 

## Hide the add to cart button
One of the benefits of Dawn is that we now have control of individual elements within a particular section. Together, blocks are grouped into sections, and sections make up templates, like the product template that is responsible for the product page. Below is an example of the default blocks on the product page in Dawn.

![product theme blocks](/assets/blog/2022/shopify-theme-blocks-dawn.png)

Using these blocks, we can easily hide the add to cart buttons, quantity selector, or price.

![toggle theme block visibility](/assets/blog/2022/hidden-blocks-dawn.png)

As we can see, blocks make themes more adaptable, with a lot less effort. But we're still stick with the cart icon in the header. To do away with that, we'll need to edit the theme code directly. 

## Removing the cart icon from the header
Before diving into the code, finding the cart icon, and deleting it, consider the possibility that you might want that cart icon in the header again in the future. It would be pain to rewrite a bunch of code that we purposely deleted. To avoid that outcome, we will instead add a checkbox setting to the theme editor that toggles on and off to show or hide the cart icon. 

### Adding a setting to the theme editor
Open the `header.liquid` section file, and go to the last schema setting at the very bottom of the file.

You should see a some code that looks like this:

```liquid
    {
      "type": "checkbox",
      "id": "show_line_separator",
      "default": true,
      "label": "t:sections.header.settings.show_line_separator.label"
    },
    {
      "type": "checkbox",
      "id": "enable_sticky_header",
      "default": true,
      "label": "t:sections.header.settings.enable_sticky_header.label",
      "info": "t:sections.header.settings.enable_sticky_header.info"
    }
  ]
}
{% endschema %}

```

Add the following object to the end of the array:

```json
{
  "type": "checkbox",
  "id": "show_cart_icon",
  "default": true,
  "label": "Show cart icon"
}
```

So that the end of the file now looks like this:

```liquid
    {
      "type": "checkbox",
      "id": "show_line_separator",
      "default": true,
      "label": "t:sections.header.settings.show_line_separator.label"
    },
    {
      "type": "checkbox",
      "id": "enable_sticky_header",
      "default": true,
      "label": "t:sections.header.settings.enable_sticky_header.label",
      "info": "t:sections.header.settings.enable_sticky_header.info"
    },
    {
      "type": "checkbox",
      "id": "show_cart_icon",
      "default": true,
      "label": "Show cart icon"
    }
  ]
}
{% endschema %}

```

With that saved, we now have a checkbox setting in the header section of the theme editor.

![checkbox theme setting](/assets/blog/2022/shopify-dawn-hide-cart-icon-theme-setting.jpg)

### Showing the cart icon conditionally
We have a setting in the theme editor, but it doesn’t actually do anything yet. Let’s fix that.

Back in the `header.liquid` section file, and find the following snippet of code (around line 492, depending on your version of Dawn):

```liquid
<a href="{{ routes.cart_url }}" class="header__icon header__icon--cart link focus-inset" id="cart-icon-bubble">
  {%- liquid
    if cart == empty
      render 'icon-cart-empty'
    else
      render 'icon-cart'
    endif
  -%}
  <span class="visually-hidden">{{ 'templates.cart.cart' | t }}</span>
  {%- if cart != empty -%}
    <div class="cart-count-bubble">
      {%- if cart.item_count < 100 -%}
        <span aria-hidden="true">{{ cart.item_count }}</span>
      {%- endif -%}
      <span class="visually-hidden">{{ 'sections.header.cart_count' | t: count: cart.item_count }}</span>
    </div>
  {%- endif -%}
</a>
```

Above it add:

```liquid
{%- if section.settings.show_cart_icon -%}
```

And below it add:

```liquid
{%- endif -%}
```

So that the code now looks like this:

```liquid
{%- if section.settings.show_cart_icon -%}
  <a href="{{ routes.cart_url }}" class="header__icon header__icon--cart link focus-inset" id="cart-icon-bubble">
    {%- liquid
      if cart == empty
        render 'icon-cart-empty'
      else
        render 'icon-cart'
      endif
    -%}
    <span class="visually-hidden">{{ 'templates.cart.cart' | t }}</span>
    {%- if cart != empty -%}
      <div class="cart-count-bubble">
        {%- if cart.item_count < 100 -%}
          <span aria-hidden="true">{{ cart.item_count }}</span>
        {%- endif -%}
        <span class="visually-hidden">{{ 'sections.header.cart_count' | t: count: cart.item_count }}</span>
      </div>
    {%- endif -%}
  </a>
{%- endif -%}
```

And that’s it. Now, the code above will only run if the checkbox setting we added is checked (truthy). If it’s not, the code won’t run, and the cart icon won’t be displayed in the header.

![toggle cart icon gif](/assets/blog/2022/hide-cart-icon-shopify-dawn.gif)

Check out the working example in my GitHub repo [here](https://github.com/sandypockets/dawn).

### Liquid tutorials
- [Debut Theme - Shopify Product Reviews App layout customization](https://sandypockets.dev/posts/shopify-product-reviews-app-layout)
- [Dawn Theme - Add theme setting to round buttons](https://sandypockets.dev/posts/customizing-shopifys-dawn-theme)

### Further reading
- [Shopify Theme Architecture - Sections](https://shopify.dev/themes/architecture/sections)
- [Shopify Theme Input Settings](https://shopify.dev/themes/architecture/settings/input-settings)
- Sign up for [Liquid Weekly](https://liquidweekly.com/), a free newsletter for Shopify theme developers

Cover photo credit: [Alesia Kazantceva](https://unsplash.com/@alesiaskaz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
  