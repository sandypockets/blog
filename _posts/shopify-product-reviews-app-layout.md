---
title: 'Shopify Product Reviews App layout'
excerpt: "Tutorial: Add a theme editor setting to toggle product reviews between a list and grid layout."
coverImage: '/assets/blog/shopify-product-reviews-app-layout/reviews-pointing.jpg'
date: '2021-12-21T06:00:00.000Z'
author:
  name: 'sandypockets'
  picture: '/assets/blog/authors/sandypockets_avatar.jpg'
ogImage:
  url: '/assets/blog/shopify-product-reviews-app-layout/reviews-pointing.jpg'
---

When the Shopify Product Reviews app is first installed, reviews are displayed in a list. In this tutorial, we’ll look at adding some CSS to change that list into a grid. 

Although this series will typically focus on the Dawn theme (check out the previous [Dawn theme tutorial here](https://sandypockets.dev/posts/customizing-shopifys-dawn-theme)), we’ll use a vintage theme (Debut) for this tutorial. The reason being that Dawn, and other Online Store 2.0 themes, come with a built-in block for the Shopify Product Reviews app, while Debut, and other vintage themes, do not. 

If you're using a vintage theme, but not Debut, then this tutorial will still likely work, however the "Write a Review" button styling might need to be manually adjusted.

![/assets/blog/shopify-product-reviews-app-layout/product-reviews-grid-view.jpg](/assets/blog/shopify-product-reviews-app-layout/product-reviews-grid-view.jpg)

### Installing the Shopify Product Reviews App
Install the Shopify Product Reviews App into your store, then open the app. You’ll be presented with some installation instructions, asking you to copy a snippet of code (below), and paste it into your `sections/product-template.liquid` file. 

```liquid
<div id="shopify-product-reviews" data-id="{{product.id}}">{{ product.metafields.spr.reviews }}</div>
```

![/assets/blog/shopify-product-reviews-app-layout/add-reviews.jpg](/assets/blog/shopify-product-reviews-app-layout/add-reviews.jpg)

Instead, we’ll paste it in a slightly different spot than recommended in the app’s instructions. 

```liquid
		<div class="product-single__description rte">
          {{ product.description }}
        </div>

		// Area 1: Suggested to put snippet here

        {% if section.settings.show_share_buttons %}
          {% include 'social-sharing', share_title: product.title, share_permalink: product.url, share_image: product.featured_media %}
        {% endif %}
      </div>

      // Area 2: Put snippet here instead

    </div>
```

**Area 1**: where the Product Reviews app suggests placing the snippet, the product reviews will be contained within the product description’s width. That can work well in a lot of scenarios, but can also create some sometimes unwanted empty space to the left of it. 

**Area 2**: where this tutorial requires the snippet be placed, results in the product reviews extending the full width of the page, as shown below.

Your code should look similar to this:

```liquid
        </div>

        <div class="product-single__description rte">
          {{ product.description }}
        </div>

        {% if section.settings.show_share_buttons %}
          {% include 'social-sharing', share_title: product.title, share_permalink: product.url, share_image: product.featured_media %}
        {% endif %}
      </div>
      
      <div id="shopify-product-reviews" data-id="{{ product.id }}">{{ product.metafields.spr.reviews }}</div>
      
    </div>
```

Now that the app is installed, you’ll need to create a few reviews, so you have some visuals and can make sure your code is working as expected. Since we’ll be creating a grid with three columns, create at least three new reviews. You can always remove them afterwards, within the Product Reviews app. 

Once your reviews are created, you should see an output like this:

![/assets/blog/shopify-product-reviews-app-layout/shopify-product-reviews-rows.jpg](/assets/blog/shopify-product-reviews-app-layout/shopify-product-reviews-rows.jpg)

### Add a setting to the Theme Editor
Ideally, users should have the ability to easily turn as many settings in their theme on or off as needed, so let's ensure that's possible. 

Scroll to the bottom of the `sections/product-template.liquid` file. At the bottom of the schema, find the following code:

```json
    {
      "type": "checkbox",
      "id": "enable_video_looping",
      "label": {
        "cs": "Povolit smyčky videa",
        "da": "Aktivér looping af videoer",
        "de": "Videoschleife aktivieren",
        "en": "Enable video looping",
        "es": "Habilitar la reproducción de video en bucle",
        "fi": "Ota käyttöön videosilmukka",
        "fr": "Activer le bouclage de la vidéo",
        "it": "Abilita la riproduzione in loop dei video",
        "ja": "ビデオのループを有効にする",
        "ko": "동영상 루프",
        "nb": "Aktiver løkkeavspilling av video",
        "nl": "Video-looping inschakelen",
        "pl": "Włącz zapętlanie wideo",
        "pt-BR": "Habilitar loop de vídeo",
        "pt-PT": "Ativar ciclo de vídeo",
        "sv": "Aktivera video-loopning",
        "th": "เปิดใช้การวนซ้ำวิดีโอ",
        "tr": "Video döngüsünü etkinleştir",
        "vi": "Bật vòng lặp video",
        "zh-CN": "启用视频循环",
        "zh-TW": "啟用影片循環功能"
      },
      "default": false
    }
```

Add a comma to the final `}` bracket pictured above, like this:

```json
      },
      "default": false
    },
```

Then paste the following code on the next line:

```json
    {
      "type": "header",
      "content": {
        "en": "Product reviews"
      },
      "info": {
        "en": "Change the layout of the product reviews"
      }
    },
    {
      "type": "checkbox",
      "id": "spr_grid_view",
      "label": {
        "en": "Use grid view"
      },
      "default": false
    }
```

These JSON objects represent the settings in the Theme Editor. The code above adds a `header` with an `info` label to our new `checkbox` setting. 

The checkbox is a good use case here, because we just need to evaluate whether a single value is true or false—whether our reviews should be in a grid, or not. A `select` dropdown would work well too, but would need a slightly different logic than what is implemented below.

All together, with the checkbox settings added, the last bit of your schema should look like this:

```liquid
   {
      "type": "checkbox",
      "id": "enable_video_looping",
      "label": {
        "cs": "Povolit smyčky videa",
        "da": "Aktivér looping af videoer",
        "de": "Videoschleife aktivieren",
        "en": "Enable video looping",
        "es": "Habilitar la reproducción de video en bucle",
        "fi": "Ota käyttöön videosilmukka",
        "fr": "Activer le bouclage de la vidéo",
        "it": "Abilita la riproduzione in loop dei video",
        "ja": "ビデオのループを有効にする",
        "ko": "동영상 루프",
        "nb": "Aktiver løkkeavspilling av video",
        "nl": "Video-looping inschakelen",
        "pl": "Włącz zapętlanie wideo",
        "pt-BR": "Habilitar loop de vídeo",
        "pt-PT": "Ativar ciclo de vídeo",
        "sv": "Aktivera video-loopning",
        "th": "เปิดใช้การวนซ้ำวิดีโอ",
        "tr": "Video döngüsünü etkinleştir",
        "vi": "Bật vòng lặp video",
        "zh-CN": "启用视频循环",
        "zh-TW": "啟用影片循環功能"
      },
      "default": false
    },
    {
      "type": "header",
      "content": {
        "en": "Product reviews"
      },
      "info": {
        "en": "Change the layout of the product reviews"
      }
    },
    {
      "type": "checkbox",
      "id": "spr_grid_view",
      "label": {
        "en": "Use grid view"
      },
      "default": false
    }
  ]
}
{% endschema %}
```

Refresh your Theme Editor, and you should see the new settings in the Product Template now, although the settings won't have any effect yet.

![/assets/blog/shopify-product-reviews-app-layout/product-reviews-settings.jpg](/assets/blog/shopify-product-reviews-app-layout/product-reviews-settings.jpg)

### Adding CSS for the grid
We want to use this CSS conditionally, based on the setting added in the last step. To do that, the CSS styles are wrapped in a Liquid conditional `if` statement. 

If the condition is `true` (meaning the checkbox setting is checked), then the CSS is applied. If it's `false` (the checkbox is unchecked), then the CSS isn't applied. 

In the `sections/product-template.liquid` file, paste the following code at the top.

```liquid
{% if section.settings.spr_grid_view %}
  {% style %}
    div.spr-container {
      border: none;
    }

    div.spr-reviews {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 2rem;
    }

    div.spr-review:first-child {
      margin-top: 0;
    }

    div.spr-review-header {
      text-align: center;
    }

    div.spr-review {
      border: 1px solid;
      padding: 1.5rem;
    }

    div.spr-pagination {
      grid-column: 2;
    }

    h2.spr-header-title {
      display: flex;
      justify-content: center;
    }

    div.spr-summary {
      display: flex;
      flex-direction: column;
    }

    span.spr-starrating.spr-summary-starrating {
      display: flex;
      justify-content: center;
      margin: 1rem 0 0.5rem 0;
    }

    span.spr-summary-caption {
      display: flex;
      justify-content: center;
      margin: 1rem 0 2rem 0;
    }

    span.spr-summary-actions {
      display: flex;
      justify-content: center;
      margin: 1rem 0 2rem 0;
    }

    a.spr-summary-actions-newreview {
      -moz-user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      display: inline-block;
      width: auto;
      text-decoration: none;
      text-align: center;
      vertical-align: middle;
      cursor: pointer;
      border: 1px solid transparent;
      border-radius: 2px;
      padding: 10px 18px;
      background-color: var(--color-btn-primary);
      color: var(--color-btn-primary-text);
      font-family: var(--font-stack-header);
      font-style: var(--font-style-header);
      font-weight: var(--font-weight-header);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      white-space: normal;
      font-size: calc(((var(--font-size-base) - 2) / (var(--font-size-base))) * 1em);
    }
    
    @media only screen and (max-width: 940px) {
      div.spr-reviews {
        grid-template-columns: 1fr 1fr;
      }
      div.spr-pagination {
        grid-column: 1 / span 2;
      }
    }

    @media only screen and (max-width: 620px) {
      div.spr-reviews {
        display: flex;
        flex-direction: column;
      }
    }
  {% endstyle %}
{% endif %}
```

Lastly, one line of CSS need to be modified in the `assets/theme.css` file. Around line `1405`, look for a bit of code like this:

```css
.rte a:not(.btn) {
  border-bottom: 1px solid currentColor;
  padding-bottom: 1px; }
```

This rule prevents the “Write a Review” button from displaying its full size. Fix it by adding `a:not(.spr-summary-actions-newreview)` after the `a:not(.btn)` so that it looks like this:

```css
.rte a:not(.btn) a:not(.spr-summary-actions-newreview) {
  border-bottom: 1px solid currentColor;
  padding-bottom: 1px; }
```

### Toggling between styles
In the Theme Editor, the checkbox setting added in the earlier step now works. However, in most cases you’ll need to save, or navigate away from the page and back to see the changes take effect, as there’s quite a bit of new CSS that needs to be loaded onto elements that are dynamically added by the app.

![/assets/blog/shopify-product-reviews-app-layout/product-reviews-settings-example.gif](/assets/blog/shopify-product-reviews-app-layout/product-reviews-settings-example.gif)
