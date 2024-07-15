const { invoke } = window.__TAURI__.tauri;

let directoryInputEl;
let directoryMsgEl;

async function fetchdir() {
  try {
    if (!directoryInputEl || !directoryMsgEl) {
      console.error("Elements not properly initialized.");
      return;
    }
    
    const dirPath = directoryInputEl.value;
    console.log("Fetching directory:", dirPath);
    const dirContents = await invoke("fetchdir", { dir: dirPath });
    console.log("Directory contents:", dirContents);
    
    // Convert directory contents to list items
    const listItems = dirContents.split('\n').map(item => `<li onclick="openfolder('${item}')">${item}</li>`).join('');
    
    // Display as a list
    directoryMsgEl.innerHTML = `<ul>${listItems}</ul>`;
    
    // Add event listeners to the list items
    const listElements = directoryMsgEl.querySelectorAll('li');
    listElements.forEach(li => {
      li.addEventListener('click', () => {
        openfolder(li.textContent.trim()); // Call openfolder() with the clicked directory
      });
    });
  } catch (error) {
    console.error("Error fetching directory:", error);
    directoryMsgEl.textContent = `Error fetching directory: ${error}`;
  }
}

function openfolder(directory) {
  console.log("Opening directory:", directory);
  directoryInputEl.value = directory; // Set the input field value to the clicked directory
  fetchdir(); // Fetch the contents of the new directory
}

window.addEventListener("DOMContentLoaded", () => {
  directoryInputEl = document.querySelector("#dir-input");
  directoryMsgEl = document.querySelector("#dir-msg");
  
  document.querySelector("#dir-form").addEventListener("submit", (e) => {
    e.preventDefault();
    fetchdir();
  });
});
