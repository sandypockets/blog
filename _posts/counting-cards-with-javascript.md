---
title: 'Counting cards with JavaScript'
excerpt: "Learn how to use simple JavaScript functions to count cards in Blackjack."
coverImage: '/assets/blog/counting-cards-with-javascript/birds.jpg'
date: '2021-09-04T06:00:00.000Z'
author:
  name: 'sandypockets'
  picture: '/assets/blog/authors/sandypockets_avatar.jpg'
ogImage:
  url: '/assets/blog/counting-cards-with-javascript/birds.jpg'
---

Counting cards might sound like it’s complex, but it’s actually quite simple; for Blackjack, at least. Almost too simple to justify writing a program for it. But, JavaScript is always (usually) a good time, and this is a good practical example (that should never actually be used) for beginners.

Contrary to what most people might think, you’re not keeping direct track of the cards themselves, but are instead keeping track of a tally, based on values assigned to each card. And even that remains pretty simple too. Each card can have one of three values: minus one, zero, or plus one. The card’s suit doesn’t matter in Blackjack, and it doesn’t matter here either.

The card values go like this:

* 2, 3, 4, 5 are assigned  `+1`
* 6, 7, 8, 9 are assigned `0`
* 10, J, Q, K, A are assigned `-1`

If you can remember that, then the hardest part about counting cards is behind us. Now that the cards have been assigned a value, we need a way to track that value. That’s done with a tally, referred to as a _running count_ , which starts at 0. Then, for each card on the table, the running count is adjusted, based on the card’s value. Low cards make the running count go up, and high cards make the running count go down.

But what does that tell us?

A high running count means a lot of low cards have been played. A low count means a lot of high cards (face cards) have been played. From there, we can start to make assumptions about what kind of cards are left in the deck, and therefore, whether the next card is likely to be high or low. So, if your running count is high, then it’s likely the next card will be high too, since many low cards have already been played. If your running count is low, then the next card will likely be low as well.

As you can see, counting cards in Blackjack is a lot less complex than it seems. Let’s take a look at what this might look like in JavaScript.

There are 52 cards in a deck: 13 different cards for each suit. Since we can forget about the suit, we need a good way to store 13 values to represent those cards. In this case an object is a good fit.

```javascript
const cards = {
  two: 1,
  three: 1,
  four: 1,
  five: 1,
  six: 1,
  seven: 0,
  eight: 0,
  nine: 0,
  ten: -1,
  jack: -1,
  queen: -1,
  king: -1,
  ace: -1,
}
```

Now that we have each of the cards created and assigned a value, we can write our functions to manage the running count.

Something that we’ll have to take into consideration is the possibility (likelihood) that there will be more than one deck of cards in play. Often times up to six decks are used to help make predicting what will come next more challenging. The workaround is to use the running count _and_ the estimated number of decks to determine the _true count_. Before we can start setting up functions, we’ll need to declare the three variables needed for this program.

```javascript
const numOfDecks = 1
let runningCount = 0
let trueCount = 0
```

Next, we can set up a function that returns the true count, based on the running count and number of decks.

```javascript
const findTrueCount = (runCount, decks) => {
  return trueCount = runCount / decks
}
```

Then set up a function that adjusts the running count for each card played.

```javascript
const countCards = (card) => {
  return runningCount += card
}
```

And that’s basically it. Two incredibly simple functions. How you put it together beyond that ultimately depends on how you want to take input from the user. But as long as you run `countCards` then run `findTrueCount`, then you’ll always have the a fairly accurate picture.

If you want to test it out in the terminal, you might assign a played card to a variable, then run a couple console logs to check out the results.

```javascript
const cardPlayed = cards.queen
console.log(countCards(cardPlayed)) // Prints -1
console.log(findTrueCount(runningCount, numOfDecks)) // Prints -1, since only one deck is in use
```

If you want to simulate a few cards being played in a row, then store the played cards in an array, and add a loop to the function.

```javascript
const playedCards = [cards.ace, cards.two, cards.three, cards.ten, cards.seven, cards.nine, cards.queen]

const countCardsList = (cardsArray) => {
  for (let card of cardsArray) {
    runningCount += card
  }
  return findTrueCount(runningCount, numOfDecks)
}

console.log(countCardsList(playedCards)) // Prints the true count, which is -1
```
