---
title: 'Why I use Tailwind CSS'
excerpt: 'It comes down to flexibility, and the developer experience.'
coverImage: '/assets/blog/why-i-use-tailwind-css/tree-minimal.jpg'
date: '2021-06-28T05:00:00.000Z'
author:
  name: sandypockets
  picture: '/assets/blog/authors/sandypockets_avatar.jpg'
ogImage:
  url: '/assets/blog/why-i-use-tailwind-css/tree-minimal.jpg'
---

Soon after learning CSS basics, I started working with Sass. As a JavaScript developer, the concept of imports, variables, and using scope within nested selectors felt intuitive, and was a great way to keep unruly CSS files DRY. It was easy to navigate, and still readable to anyone familiar with CSS. It was my stylistic weapon of choice.

A few months later, I found myself working on a larger, more complex project. A full stack Ruby on Rails blogging platform with dozens of unique pages. What started off as modest directory of well organized Sass files quickly grew to an unruly 31% of the project’s codebase. We’re talking +1500 lines of Sass. Nested styles upon nested styles. What once felt like my secret weapon had grown unwieldy.

Now what? Back to CSS? Many of the CSS problems that Sass solved have been addressed. My experience was better. Sass helped sharpen my skills, but CSS still didn’t click for me. It felt like I had to step outside my code to wrangle finicky selectors. Getting the styles right was rewarding, but writing CSS felt like a chore. I needed to be militant about keeping my CSS DRY, and endlessly policing and refactoring CSS files is not my idea of a good time.

That’s when I decided to give Bootstrap a go. It had some predefined UI elements, and offered some out-of-the-box classes that I could use to style things quickly in a readable way. But it didn’t go as expected. The framework felt restrictive. Too predefined. Of course, it’s possible to customize it to your liking, but then am I really saving much more time or effort than just writing the components and styles myself? I’m not knocking Bootstrap, it’s a great tool for quickly building out ideas; a lot of the classes are very readable (in my opinion, sometimes overly verbose), and there are a ton of apps that use it. It just didn’t resonate with me. I wanted a better developer experience, and Bootstrap felt like it added more complexity for less control.

Enter Tailwind CSS. I first encountered Tailwind sifting through projects on GitHub. I noticed it being used more and more in React components. I’d never worked with Tailwind before, but it felt very readable right away. That’s what drew me in. Tailwind classes are descriptive, but short. Their abbreviations make sense, and for most of the basics, you can just about guess the class name that you’re looking for.

Writing code with Tailwind feels fluid. I never leave my JavaScript, and it certainly doesn't feel I’m like writing CSS. Short class names keep component styles manageable, and readable. It’s clear which parts of the component are using which styles, making it easier to visualize a component from its code alone. It’s lightweight too. In production, it compiles down to raw CSS and strips away any unused classes. And, even in production, the HTML source still displays the Tailwind class names, making quick work of debugging.

Ultimately, CSS, Sass, Bootstrap, and Tailwind can all be great options for your project. But, like most development choices, which is the right one depends largely on your unique use case, and how you expect it to scale.