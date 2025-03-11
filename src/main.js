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
    currentDir = normalizePath(dirPath);
    console.log(currentDir);
    const dirContents = await invoke("fetchdir", { dir: dirPath });
    console.log("Directory contents:", dirContents);

    const listItems = [
      `<li id="back" style="font-weight: bold;">..</li>`,
      ...dirContents.split("\n").map((item) => `<li id="folder">${item}</li>`),
    ].join("");

    directoryMsgEl.innerHTML = `<ul>${listItems}</ul>`;

    const listElements = directoryMsgEl.querySelectorAll("#folder");
    listElements.forEach((li) => {
      li.addEventListener("click", () => {
        openfolder(li.textContent.trim());
      });
    });

    const goBackButton = directoryMsgEl.querySelector("#back");
    if (goBackButton) {
      goBackButton.addEventListener("click", () => {
        goback();
      });
    }
  } catch (error) {
    console.error("Error fetching directory:", error);
    directoryMsgEl.textContent = `Error fetching directory: ${error}`;
  }
}

function openfolder(directory) {
  console.log("Opening directory:", directory);
  directoryInputEl.value = normalizePath(directory);
  fetchdir();
}

function goback() {
  const pathParts = currentDir
    .split(/[/\\]/)
    .filter((part) => part.trim() !== "");
  console.log(pathParts.length);
  if (pathParts.length > 1) {
    console.log(pathParts);
    console.log(`The folder you're in: ${pathParts.pop()}`);
    directoryInputEl.value = normalizePath(pathParts.join("/"));
    fetchdir();
  } 
}

function normalizePath(path) {
  path = path.replace(/\\/g, "/");
  if (/^[a-zA-Z]:[^/]/.test(path)) {
    path = path.replace(/^([a-zA-Z]):([^/])/, "$1:/$2");
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
