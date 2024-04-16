const targetNode = document.body;

const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            for (let node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === "YTD-COMMENT-THREAD-RENDERER") {
                    update();
                }
            }
        }
    }
});

const config = { childList: true, subtree: true };
observer.observe(targetNode, config);

function update() {
    document.querySelectorAll("ytd-expander")
        .forEach((expander) => {
            const textElement = expander.querySelector(".yt-core-attributed-string");
            if (!textElement) return;
            const text = textElement.textContent;
            if (!text) return;
            if (!hasArabicOrHebrew(text)) return;
            expander.setAttribute("dir", "rtl");
        });
}

const arabicChars = "ءآأؤإئابةتثجچحخدذرزسشصضطظعغفقكگکالمنهوىيًٌٍَُِّْٕٖٜٟٓٔٗ٘ٙٚٛٝٞ٠١٢٣٤٥٦٧٨٩";
const hebrewChars = "אבגדהוזחטיכלמנסעפצקרשתםןףץ";

function hasArabicOrHebrew(text: string) {
    return text.split("").some((char) => arabicChars.includes(char) || hebrewChars.includes(char));
}
