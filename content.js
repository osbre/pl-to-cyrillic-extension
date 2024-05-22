(function () {
    const groupMapping = new Map([
        ["wsz", "вш"],
        ["sz", "ш"],
        ["cz", "ч"],
        ["rz", "ж"],
        ["ch", "х"],
        ["ci", "ці"],
        ["się", "шє"],
        ["si", "сі"],
        ["ni", "ні"],
        ["zi", "зі"],
        ["ia", "я"],
        ["ie", "є"],
        ["io", "йо"],
        ["iu", "ю"],
        ["Ja", "Я"],
        ["ja", "я"],
        ["ję", "єн"],
        ["je", "є"],
        ["ńe", "нє"]
    ]);

    const singleCharMapping = new Map([
        ["a", "а"], ["ą", "он"], ["b", "б"], ["c", "ц"], ["ć", "ч"], ["d", "д"], ["e", "е"], ["ę", "ен"], ["f", "ф"],
        ["g", "ґ"], ["h", "г"], ["i", "і"], ["j", "й"], ["k", "к"], ["l", "л"], ["ł", "л"], ["m", "м"], ["n", "н"],
        ["ń", "нь"], ["o", "о"], ["ó", "у"], ["p", "п"], ["r", "р"], ["s", "с"], ["ś", "ш"], ["t", "т"], ["u", "у"],
        ["w", "в"], ["y", "и"], ["z", "з"], ["ź", "ж"], ["ż", "ж"],
        ["A", "А"], ["Ą", "Он"], ["B", "Б"], ["C", "Ц"], ["Ć", "Ч"], ["D", "Д"], ["E", "Е"], ["Ę", "Ен"], ["F", "Ф"],
        ["G", "Ґ"], ["H", "Г"], ["I", "І"], ["J", "Й"], ["K", "К"], ["L", "Л"], ["Ł", "Л"], ["M", "М"], ["N", "Н"],
        ["Ń", "Нь"], ["O", "О"], ["Ó", "У"], ["P", "П"], ["R", "Р"], ["S", "С"], ["Ś", "Ш"], ["T", "Т"], ["U", "У"],
        ["W", "В"], ["Y", "И"], ["Z", "З"], ["Ź", "Ж"], ["Ż", "Ж"]
    ]);

    function transliterate(text) {
        let result = "";
        let i = 0;

        while (i < text.length) {
            let groupHandled = false;

            // Check for groups
            for (let [group, transliteration] of groupMapping) {
                if (text.startsWith(group, i)) {
                    result += transliteration;
                    i += group.length;
                    groupHandled = true;
                    break;
                }
            }

            // If no group matched, handle single character
            if (!groupHandled) {
                const char = text[i];
                result += singleCharMapping.get(char) || char;
                i++;
            }
        }

        return result;
    }

    function replaceTextContent(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.nodeValue = transliterate(node.nodeValue);
        } else {
            node.childNodes.forEach(replaceTextContent);
        }
    }

    replaceTextContent(document.body);
})();
