const ARABIC_CHARS =
    "ﺁﺁﺂﺂﺃﺃﺄﺄﺅﺅﺆﺆﺇﺇﺈﺈﺉﺋﺌﺊﺍﺍﺎﺎﺏﺑﺒﺐﺓﺓﺔﺔﺕﺗﺘﺖﺙﺛﺜﺚﺝﺟﺠﺞﺡﺣﺤﺢﺥﺧﺨﺦﺩﺩﺪﺪﺫﺫﺬﺬﺭﺭﺮﺮﺯﺯﺰﺰﺱﺳﺴﺲﺵﺷﺸﺶﺹﺻﺼﺺﺽﺿﻀﺾﻁﻃﻄﻂﻅﻇﻈﻆﻉﻋﻌﻊﻍﻏﻐﻎﻑﻓﻔﻒﻕﻗﻘﻖﻙﻛﻜﻚﻝﻟﻠﻞﻡﻣﻤﻢﻥﻧﻨﻦﻩﻫﻬﻪﻭﻭﻮﻮﻯﻯﻰﻰﻱﻳﻴﻲﻵﻵﻶﻶﻷﻷﻸﻸﻹﻹﻺﻺﻻﻻﻼﻼ" +
    "ًٌٍَُِّْْئءؤرلاىةوزظشسيبلاتنمكطضصثقفغعهخحجدذْلآآلأأـلإإ،؟";
const ARABIC_NUMBERS = "٠١٢٣٤٥٦٧٨٩";
const ARABIC_HARAKAT = "ًٌٍَُِّْْ";

type Options = { count: number | null };

export function isArabic(text: string, options?: Options): boolean {
    const opts = {
        count: null,
        ...options,
    };
    validateOptions(opts);
    const _text = text.replace(/\s/gm, "");
    const _chars = _text.split("");
    const charsLen = _chars.length;
    let matchCount = 0;
    let ArabicCharsMatchCount = 0;
    for (let i = 0; i < charsLen; i++) {
        const char = _chars[i];
        if (isHaraka(char)) {
            matchCount++;
            ArabicCharsMatchCount++;
            if (opts.count && ArabicCharsMatchCount >= opts.count) {
                return true;
            }
            continue;
        }
        if (isArabicNumber(char)) {
            matchCount++;
            ArabicCharsMatchCount++;
            if (opts.count && ArabicCharsMatchCount >= opts.count) {
                return true;
            }
            continue;
        }
        if (isArabicChar(char)) {
            matchCount++;
            ArabicCharsMatchCount++;

            if (opts.count && ArabicCharsMatchCount >= opts.count) {
                return true;
            }

            continue;
        }
    }
    return charsLen === matchCount;
}

function validateOptions(opts: Options) {
    if (typeof opts.count !== "number") {
        throw new TypeError("Please enter a valid number for count option.");
    }
}

function isHaraka(char: string) {
    return ARABIC_HARAKAT.indexOf(char) >= 0;
}

function isArabicNumber(char: string) {
    return ARABIC_NUMBERS.indexOf(char) >= 0;
}

function isArabicChar(char: string) {
    return ARABIC_CHARS.indexOf(char) >= 0;
}
