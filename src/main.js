const { invoke } = window.__TAURI__.tauri;

let directoryInputEl;
let directoryMsgEl;
let currentDir = "";

async function fetchdir() {
  try {
    if (!directoryInputEl || !directoryMsgEl) {
      console.error("Elements not properly initialized.");
      return;
    }

    const dirPath = directoryInputEl.value;
    console.log("Fetching directory:", dirPath);
    currentDir = normalizePath(dirPath); // Update the current directory here
    console.log(currentDir)
    const dirContents = await invoke("fetchdir", { dir: dirPath });
    console.log("Directory contents:", dirContents);
    
    // Convert directory contents to list items
    const listItems = [
      `<li id="back" style="font-weight: bold;">..</li>`, // ".." to go back
      ...dirContents
        .split("\n")
        .map(
          (item) =>
            `<li id="folder">${item}</li>`
        ),
    ].join("");

    // Display as a list
    directoryMsgEl.innerHTML = `<ul>${listItems}</ul>`;

    // Add event listeners to the list items
    const listElements = directoryMsgEl.querySelectorAll("#folder");
    listElements.forEach((li) => {
      li.addEventListener("click", () => {
        openfolder(li.textContent.trim()); // Call openfolder() with the clicked directory
      });
    });

    // Add event listeners to the back button
    const goBackButton = directoryMsgEl.querySelector("#back");
    if(goBackButton){
      goBackButton.addEventListener("click", () => {
        goback();
      })
    }


  } catch (error) {
    console.error("Error fetching directory:", error);
    directoryMsgEl.textContent = `Error fetching directory: ${error}`;
  }
}

function openfolder(directory) {
  console.log("Opening directory:", directory);
  directoryInputEl.value = normalizePath(directory); // Set the input field value to the clicked directory
  fetchdir(); // Fetch the contents of the new directory
}

function goback()
{
  const pathParts = currentDir.split(/[/\\]/).filter(part => part.trim() !== '');
  console.log(pathParts);
  console.log(`The folder you're in: ${pathParts.pop()}`);
  console.log("length: " + pathParts.length);
  console.log(pathParts.join('/'))
  console.log(normalizePath(pathParts.join('/')))

  // if (pathParts.length > 1) {
  //   pathParts.pop(); // Remove the last part of the path
  //   const newPath = pathParts.join("/");
  //   directoryInputEl.value = normalizePath(newPath); // Normalize and set the path
  //   fetchdir();
  // }
  // else if (pathParts.length === 1) {
  //   // Handle case where the path is a single part (e.g., "D:")
  //   directoryInputEl.value = "";
  //   currentDir = ""; // Clear the current directory
  //   fetchdir();
  // }
  // else {
  //   // Handle case where the path is empty
  //   directoryInputEl.value = "";
  //   currentDir = "";
  //   fetchdir();
  // }
}

function normalizePath(path) {
  // Convert Windows-style backslashes to forward slashes
  path = path.replace(/\\/g, '/');
  
  // Add a slash after the drive letter if not present
  if (/^[a-zA-Z]:[^/]/.test(path)) {
    path = path.replace(/^([a-zA-Z]):([^/])/, '$1:/$2');
  }
  
  return path;
}

window.addEventListener("DOMContentLoaded", () => {
  directoryInputEl = document.querySelector("#dir-input");
  directoryMsgEl = document.querySelector("#dir-msg");

  document.querySelector("#dir-form").addEventListener("submit", (e) => {
    e.preventDefault();
    fetchdir();
  });
});
