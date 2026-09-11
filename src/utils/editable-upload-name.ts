const selector = "form .mt-4.w-full p:first-child";

function makeEditable(root: ParentNode) {
  root.querySelectorAll<HTMLElement>(selector).forEach((element) => {
    if (element.dataset.editableUploadName === "true") return;
    element.dataset.editableUploadName = "true";
    element.contentEditable = "true";
    element.spellcheck = false;
    element.setAttribute("role", "textbox");
    element.setAttribute("aria-label", "Nama file");
  });
}

makeEditable(document);
new MutationObserver((mutations) => {
  mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
    if (node instanceof HTMLElement) makeEditable(node);
  }));
}).observe(document.body, { childList: true, subtree: true });
