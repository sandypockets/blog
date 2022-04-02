---
title: "Github Copilot: Your AI Pair Programmer"
excerpt: "Some first impressions of GitHub Copilot, touted as 'Your AI pair programmer'. How well Copilot is able to anticipate what I want to write (in most cases) is uncanny."
coverImage: "/assets/blog/2022/robot-hand.jpg"
date: "2022-04-02T13:36:13.338Z"
author:
  name: "sandypockets"
  picture: "/assets/blog/authors/sandypockets_avatar.jpg"
ogImage:
  url: "/assets/blog/2022/robot-hand.jpg"
---

# GitHub Copilot
GitHub Copilot is advertised by GitHub as _Your AI pair programmer_. After giving the extension a try for the day (in Webstorm), I have to say I agree with that sentiment.

## The suggestions are actually good
How well Copilot was able to anticipate what I wanted to write (in most cases) was uncanny. I’m not sure how much it relies on _all_ the code it has analyzed versus the code in your project, but it seemed to follow the conventions in my project quite well. It became clear fairly quickly that the more descriptive my function and variable names were, the more easily it was able to discern what I wanted to do with them.

To me, this is mostly a good thing, as it subconsciously trains developers that are working with Copilot to create well named, human-readable code. The flip side of that is that we risk catering to Copilot, in the hopes that it will make a better suggestion with fewer key presses from us. I’m all for human-readable code, but it’s important to strike a balance between brevity and verbosity.

## Hello TDD
If you’re like me, you very much understand the importance of tests, but they’re (unfortunately) often an afterthought. Seeing all those green checkmarks pop up as each test passes is a great little dopamine boost. But the truth of the matter is writing those tests is often not considered the fun part of developing software. In my eyes, it’s far from it. And it’s not that _thinking_ about the tests is bad. Hell, I actually really enjoy that part. Considering all the different angles a function or component might get used outside what you initially envisioned is a great, and often eye-opening exercise. It’s the actual writing of the tests that sucks. And some testing frameworks suck a lot more (to write) than others.

The good news is that I’ve found tests are where GitHub Copilot really shines. Not only does writing tests feel like the least creative parts of my application (that I’m more than willing to share with an AI pair programmer), they’re also, by nature, the least abstracted part of the application. All those `test("here is me describing what the test should do in plain English", function() {` bits are basically like writing out a little Google search for Copilot. Up until now, Copilot has done a pretty good job at guessing functions, but this time, you’ve gone ahead and told it exactly what you want. And while the predictive text for functions is already impressive, the autocompletion for tests is incredible.

Now, tests are much less of a chore. Instead of chaining a bunch of matchers together into a dotted run-on sentence, I can focus on the fun parts. And that's why we all got into development in the first place isn't it?

## Copilot is human(ish)
Copilot isn’t human, of course, but it does exhibit a very human quality: it makes mistakes. 

The danger of Copilot is that you trust it too much. You didn’t write Copilot’s code, but you’re most certainly the one who has to debug it. More than once, Copilot tried to add statements that would technically work, but just weren’t very readable; checking for falsy values when it would make much more sense to check for a truthy one instead.

Ultimately, it’s important to remember what a Copilot is: a copilot. You’re still the captain, so to speak. And you’re still responsible for making the code run. Copilot is merely bringing what it’s observed to your attention. It is still up to you to decide if the code will work, and if it can be further improved.

## But you’re not a real programmer if you use GitHub Copilot
This is just plain false. Anyone who says this likely falls into the crowd of ‘not a real programmer unless you use Vim’ too. 

Programmers, like the practitioners of any craft, are not defined by their tools. Don’t take that the wrong way, I’m a big fan of idioms like ‘a poor workman blames their tools’, as I truly believe that the tool should not make or break the skill of the individual. However, I see nothing wrong with using tools we have at our disposal to be more efficient. It is only with such tools can we expect to churn out higher quality applications, in less time than before.

If you disagree, I ask, _would you fault_:
- a cabinetmaker for using an electric tool?
- a traveller for using a plane instead of a boat?

These are simply people using more advanced technology, to complete their work more efficiently, and to a greater degree of quality. Like an IDE, or a linter, GitHub Copilot is nothing more than another tool in our ever-growing toolbox. And that’s one of the most fun parts of being a developer, isn’t it? We get to create more tools for our own industry than any other, simply because that’s the exact business we’re in: creating tools.

## No, AI isn’t going to take your job
If Copilot is this good, then I should be concerned about it taking my job, no? 

No. The AI is good. It feels a bit like dark magic when you use it. But, as we've highlighted above, it makes mistakes. It’s still no better than a human, and it's capabilities likely scale down significantly as complexity scales up. 

And isn’t that what it comes down to when we think of replacing humans? It needs to be at least as good, or wildly more efficient. It’s good, but it doesn’t check enough boxes to have me worried. And to be frank, I don’t think it will for quite some time. AI just doesn’t have the same decision-making abilities that you, or I do.

But, if you’re really worried, what will take Copilot longest is learning how to teach itself. Sure, it can absorb data, but it doesn't write its own code. For a long time, I reckon a very, very long time, Copilot (and other tools like it) will be developed and maintained by humans. 

## Getting access to GitHub Copilot
If you’re sold on Copilot, and want to give it a try yourself, you’ll need to [add your name to the wait-list](https://github.com/features/copilot/signup) of GitHub’s closed preview. There isn't a promised timeline, but I was granted access within a few days of signing up. 

## Final thoughts
Overall, I’m impressed. Copilot is a hell of a lot better than I expected it would be. There are still some clear pain points, but I’m overall really happy with the product, and recommend everyone gives it a try at some point, even just for a bit of fun.

Would I use Copilot in my day-to-day? Probably not. I found the predictive text to be distracting when writing out more complex functionality. I noticed myself constantly pressing escape, or turning it off and on, which got pretty annoying. 

However, will I use Copilot whenever I’m writing tests? You bet. Writing tests requires a bit of creativity to consider _what_ you’ll test, but writing the test itself is usually mundane. Like IRL, I’d rather push monotony from my own todo list to the computer’s.

## Further reading
- [Github copilot website](https://copilot.github.com/)
- [Testing with Jest](https://jestjs.io/)

Photo credit goes to [Possessed Photography](https://unsplash.com/@possessedphotography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on Unsplash.