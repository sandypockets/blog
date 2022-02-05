---
title: 'Reading and Writing Files with JavaScript'
excerpt: "Learn how to use Node.js File System to read a plain text file, modify some data, and write it to a new file."
coverImage: '/assets/blog/2022/winter-trees.jpg'
date: '2022-02-04T06:00:00.000Z'
author:
  name: 'sandypockets'
  picture: '/assets/blog/authors/sandypockets_avatar.jpg'
ogImage:
url: '/assets/blog/2022/winter-trees.jpg'
---

# Reading and writing files with JavaScript
I hang out in a lot of programming subs on Reddit, and always enjoy the opportunity to learn from, or help out another Redditor. I was recently presented with such an opportunity. The Redditor, let’s call them Bob, had a list of countries and corresponding IDs, in a text file. The key value pairs were separated only by a new line, and looked like the example below, but went on to list every county.

```markdown
1234 Afghanistan
1235 Albania
1236 Algeria
1237 Andorra
```

Bob needed to add quotes around each country name, and was trying to sort out a way they could select all countries at once, and add the quotes in one action. Their required output would look like this:

```markdown
1234 "Afghanistan"
1235 "Albania"
1236 "Algeria"
1237 "Andorra"
```

Many of the suggestions on Reddit still involved a lot of manual work to get the cursors into the right spots. The suggestions all attempted to solve the problem through the text editor’s GUI. But let’s consider the type of problem we’re tackling here:

- The task is monotonous
- The input and output are both clearly defined
- The input is already somewhat formatted, as each key-pair is on a separate line

Sounds like a perfect problem to solve programmatically!

### Writing the script
We know that Bob has everything in a file, already somewhat formatted. So let’s start by adding Node’s file system (`fs`) capabilities, and prepare some file names for our input and output files.

```javascript
const fs = require('fs');

const inputFileName = "./input.txt"
const outputFileName = "./output.txt"
```

Next we need to tell the script to actually read the file when we run it. We do that with the `fs` we just required. Since we want to _read_ the file, we’ll use the `readFile` method on `fs`.

```javascript
const fs = require('fs');

const inputFileName = "./input.txt"
const outputFileName = "./output.txt"

fs.readFile()
```


The `fs.readFile` method takes three arguments:
1. The path of the file to be read
2. The character set
3. A callback function, which handles what to do after the file is read

Let’s add that to the `fs.readFile` method now.

```javascript
const fs = require('fs');

const inputFileName = "./input.txt"
const outputFileName = "./output.txt"

fs.readFile(inputFileName, "utf8", function(err, data) {
  // This is where the callback function does stuff
})
```

In the example above, we’ve already added `err` and `data` parameters to the callback function too, which are what we’ll use to represent errors or the read file data, respectively. Let’s start with handling the errors, since we’ll want to know right away if things aren’t working.

```javascript
const fs = require('fs');

const inputFileName = "./input.txt"
const outputFileName = "./output.txt"

fs.readFile(inputFileName, "utf8", function(err, data) {
    // Print any errors out to the console
	if (err) console.error(err)
})

```

Now, assuming there weren’t any errors, let’s start manipulating the data that’s read from the file.

First, we’ll need to set a condition that checks if `data` contains any information. If it does, it’ll be truthy, and the script will continue. We’ll also need to create a reassignable variable for an `outputString`. The `outputString` is what we’ll use to represent each line in the file that’s being read. That way we can manipulate that line, save it, and move onto the next one.

```javascript
const fs = require('fs');

const inputFileName = "./input.txt"
const outputFileName = "./output.txt"

fs.readFile(inputFileName, "utf8", function(err, data) {
	if (err) console.error(err)
	// Continue only if there is data
	if (data) {
        let outputString = ""
	}
})

```

So how do we go about changing this data? We just have an empty output sting, that isn’t even coming from the input data.

Well, since we need to repeat the same process over and over, we’re going to use a loop. While we could probably loop over the current file contents as a string, it wouldn’t be very efficient, and a much less pleasant experience for us to code. Instead, let’s move all the data we need into an array.

```javascript
const fs = require('fs');

const inputFileName = "./input.txt"
const outputFileName = "./output.txt"

fs.readFile(inputFileName, "utf8", function(err, data) {
	if (err) console.error(err)
	if (data) {
        let outputString = ""
		// Add each line as an element to an array
		const dataArray = data.split("\n")
	}
})

```

Now for the fun part. Loops. I usually prefer to use a `for..in` loop, because it is more verbose, and often easier to read through than a C-style loop would be. But that’s just my personal preference, and you’ll find plenty of arguments about why you should use a c-style loop anyways. But I digress. This isn’t a production application, we’re simply trying to give Bob a hand with formatting a file.

```javascript
const fs = require('fs');

const inputFileName = "./input.txt"
const outputFileName = "./output.txt"

fs.readFile(inputFileName, "utf8", function(err, data) {
	if (err) console.error(err)
	if (data) {
        let outputString = ""
		const dataArray = data.split("\n")
		// Loop over each element in the array
		for (const item in dataArray) {
            // Do stuff in the loop
        }
	}
})

```

Let’s take a look at what to add to the inside of that loop, in the “Do stuff” section, to get the data formatted in a way that we can manipulate it to produce the output we need.

1. Split up each key value pair within each element in the array, and storing it in a constant variable.

```javascript
// That way we can take a long, improperly formatted array like this:
["1234 Afghanistan", "1235 Albania"]

// and format it properly so each key value pair is its own array
["1234", "Afghanistan"]
["1235", "Albania"]
```

2. Then we can store each part of the array in another constant, which we’ll use in the next step to format the output of the file.

With those two steps, your code should look like this:

```javascript
const fs = require('fs');

const inputFileName = "./input.txt"
const outputFileName = "./output.txt"

fs.readFile(inputFileName, "utf8", function(err, data) {
	if (err) console.error(err)
	if (data) {
        let outputString = ""
		const dataArray = data.split("\n")
		for (const item in dataArray) {
			// Split up each key value pair
			const singleItemArray = dataArray[item].split(' ')
			// Store the country ID to a constant variable
            const countryId = singleItemArray[0]
			// Store the country name to a constant variable
            const countryName = singleItemArray[1]
        }
	}
})
```

We’re almost done! Time to set the output formatting that we’d like to see for each line. Remember, we’re just adding quotations around the country names. And since we already have all the info from each line stored in a separate variable, we can use a template literal to format it exactly how we want.

```javascript
const fs = require('fs');

const inputFileName = "./input.txt"
const outputFileName = "./output.txt"

fs.readFile(inputFileName, "utf8", function(err, data) {
	if (err) console.error(err)
	if (data) {
        let outputString = ""
		const dataArray = data.split("\n")
		for (const item in dataArray) {
			const singleItemArray = dataArray[item].split(' ')
            const countryId = singleItemArray[0]
            const countryName = singleItemArray[1]
			// Format each line of data
			const outputData = `${countryId} "${countryName}"\n`
			// One the line is formatted, add it to a string
            outputString += outputData
        }
	}
})

```

With this, at the end of the loop, we’ll have a wildly long string in the correct formatting. The `\n` at the end of the `outputData` line results in a new line of the string. At this point, we’ve almost achieved our goal. The data has been formatted perfectly. All we’re left to do is write the string to a new file, and we’re done!

We write to files using `fs` similarly to how we read them. It still needs a file path, a character set, and a callback function. However there are a few key differences:

1. Use `fs.writeFile` instead of `fs.readFile`
2. Use the `outputFileName` instead of the `inputFileName`
3. The callback function handles errors with the `err` parameter, but since it isn’t reading anything, it doesn’t need a `data` parameter.

```javascript
const fs = require('fs');

const inputFileName = "./input.txt"
const outputFileName = "./output.txt"

fs.readFile(inputFileName, "utf8", function(err, data) {
	if (err) console.error(err)
	if (data) {
        let outputString = ""
		const dataArray = data.split("\n")
		for (const item in dataArray) {
			const singleItemArray = dataArray[item].split(' ')
            const countryId = singleItemArray[0]
            const countryName = singleItemArray[1]
			const outputData = `${countryId} "${countryName}"\n`
            outputString += outputData
        }

		// Create a new file with the formatted output string
		fs.writeFile(outputFileName, outputString, function(err) {
            // Check for errors
			if (err) {
                console.error("There was an error!", err)
            } else {
				// If no errors, success messages are printed to the console
                console.log("New file written successfully\n");
                console.log("The new file has the following contents:");
                console.log(fs.readFileSync(outputFileName, "utf8"));
            }
        })


	}
})

```

Now if we were to run the file (assuming that the data to be input actually lives at `./input.txt`), we should see the success messages printed to the console, and a brand new file titled `output.txt` will be created in the same folder as the script.

While this script was quite simple, it was still a lot of fun to write, and thankfully was able to save an internet stranger quite a bit of time. 

### Further reading

- [Node.js Docs - fs.readfile](https://nodejs.org/api/fs.html#fsreadfilepath-options-callback)
- [Node.js Docs - fs.writefile](https://nodejs.org/api/fs.html#fswritefilefile-data-options-callback)
- [MDN - for...in loops](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)