// The text to be "typed out" with inline HTML and CSS.
// Using a template literal (backticks) to allow multi-line string input.
const fullText = `<style>
food {
  color:orange;
  align-self:center;
}
</style>
<p>Super cool paragraph!</p><br>
Want more? Visit <a href="example.com">example.com</a><br><br>
They are super awesome!
but never... <a style="color:red;">here</a>...
<food>EEEEEEEEEEEe</food>`;

// Remove the <style> block from the fullText to prevent it from being typed out
const filteredText = fullText.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

// Split the filtered text into lines
const lines = filteredText.split('\n');

const preElem = document.getElementById('typewriter');
const renderedElem = document.getElementById('rendered');
let currentLine = 0;
let currentIndex = 0;

// Function to type out one line at a time
function typeLine() {
  if (currentLine < lines.length) {
    const line = lines[currentLine];
    // Append the next character as plain text
    preElem.textContent += line.charAt(currentIndex);
    currentIndex++;

    // If there are more characters, schedule the next one
    if (currentIndex < line.length) {
      setTimeout(typeLine, 30);
    } else {
      // Once the line is complete, move to the next line
      currentLine++;
      currentIndex = 0;
      preElem.textContent += '\n'; // Add a newline for the next line
      // Immediately render the current line in the rendered container
      renderedElem.innerHTML += line + '<br>';
      setTimeout(typeLine, 500); // Wait before typing the next line
    }
  } else {
    // Once all lines are typed, copy the text and set as innerHTML so inline HTML renders
    renderedElem.innerHTML = preElem.textContent;
  }
}

// Start the typewriter effect
typeLine();
