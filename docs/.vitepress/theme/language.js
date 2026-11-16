const STORAGE_KEY = "open-logistics-language";

// Install tabs name package managers; treat them as the same language choice.
const LABEL_TO_LANGUAGE = {
  TypeScript: "TypeScript",
  Python: "Python",
  Rust: "Rust",
  npm: "TypeScript",
  pip: "Python",
  cargo: "Rust",
};

function storedLanguage() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

// Set the radio and the visible block directly. Calling label.click() runs
// VitePress's handler, which scrolls the tab into view and jumps the page when
// this runs on load. Always re-sync the classes: in dev, a hot reload resets
// the visible block to the first tab but leaves the radio checked.
function select(group, label) {
  const input = document.getElementById(label.htmlFor);
  const blocks = group.querySelector(".blocks");
  if (!input || !blocks) return;
  const index = [...group.querySelectorAll(".tabs input")].indexOf(input);
  input.checked = true;
  [...blocks.children].forEach((block, i) => {
    block.classList.toggle("active", i === index);
  });
}

export function applyLanguage(language) {
  if (!language) return;
  for (const group of document.querySelectorAll(".vp-code-group")) {
    for (const label of group.querySelectorAll(".tabs label[data-title]")) {
      if (LABEL_TO_LANGUAGE[label.dataset.title] === language) {
        select(group, label);
        break;
      }
    }
  }
}

export function applyStoredLanguage() {
  const language = storedLanguage();
  if (language) applyLanguage(language);
}

export function rememberLanguage(event) {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || input.type !== "radio") {
    return;
  }
  const group = input.closest(".vp-code-group");
  const label = [...(group?.querySelectorAll("label") ?? [])].find(
    (candidate) => candidate.htmlFor === input.id,
  );
  const language = label && LABEL_TO_LANGUAGE[label.dataset.title];
  if (!language) return;
  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // Storage can be disabled; the tab still switches for this page.
  }
  applyLanguage(language);
}
