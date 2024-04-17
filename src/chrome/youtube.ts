import { hasArabic } from "../shared/hasArabic";

const targetNode = document.body;
const observer = new MutationObserver((mutationsList) => {
	for (let mutation of mutationsList) {
		if (mutation.type === 'childList') {
			for (let node of mutation.addedNodes) {
				if (node.nodeType !== Node.ELEMENT_NODE) continue;
				if (node.nodeName === "YTD-COMMENT-VIEW-MODEL") { updateComments(); }
				updateHeaders();
			}
		}
	}
});

const config = { childList: true, subtree: true };
observer.observe(targetNode, config);

function updateComments() {
	document.querySelectorAll("ytd-expander")
		.forEach((expander) => {
			const textElement = expander.querySelector(".yt-core-attributed-string");
			if (!textElement) return;
			const text = textElement.textContent;
			if (!text) return;
			if (!hasArabic(text)) return;
			expander.setAttribute("dir", "rtl");
		});
}

function updateHeaders() {
	document.querySelectorAll("h1, h3, #title-wrapper")
		.forEach((header) => {
			const text = header.textContent;
			if (!text) return;
			if (!hasArabic(text)) return;
			header.setAttribute("dir", "rtl");
		});
}
