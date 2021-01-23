let loadedData;
var output = [];
const miniclipFileNameToUrl = miniclip_filename => '../data/reason/miniclips/' + miniclip_filename;


function main() {
    let video_src = null;

    const $sentences = document.getElementById('transcripts');
    const $reasons = document.getElementById('conceptnet');
    const $video = document.getElementsByTagName('video')[0];
    const $actions = document.getElementById('action');
    const $text_reasons = document.getElementById("searchTxt");

    $video.addEventListener('play', () => $video.focus());

    fetch('../data/reason/input.json')
        .then(response => response.json())
        .then(data => {
            loadedData = data;
            for (var action in data) {
                const $var = document.createElement('option');
                $var.innerText = action;
                $var.value = action;
                $actions.appendChild($var);
            }
        });

    $actions.addEventListener('change', show_sentences_reasons);
    $sentences.addEventListener('change', load_video);
    $reasons.addEventListener('change', save_reasons);
    $text_reasons.addEventListener('change', save_reasons_txt);

    function show_sentences_reasons(){
        const action = getSelectedOption($actions);
        // console.log(action.value);
        const reasons = loadedData[action.value].reasons
        const sentences = loadedData[action.value].sentences
        // console.log(reasons);
        // console.log(sentences);

        $sentences.innerHTML = "";
        sentences.forEach(elem => {
            const $var = document.createElement('option');
            $var.innerText = elem.sentence;
            $var.value = elem.miniclip;
            $sentences.appendChild($var);
        });

        $reasons.innerHTML = "";
        reasons.forEach(elem => {
            const $var = document.createElement('option');
            $var.innerText = elem;
            $var.value = elem;
            $reasons.appendChild($var);
        });

    }

    function save_reasons() {
        const action = getSelectedOption($actions);
        let new_reason = getSelectedOption($reasons).innerText;
        let key = action.value + ", " + $sentences.value + ", " + getSelectedOption($sentences).innerText;
        output.push({
            key:   key,
            value: new_reason
        });
        console.log(output)

    }

    function save_reasons_txt() {
        const action = getSelectedOption($actions);
        let new_reason = "new: " + $text_reasons.value;
        let key = action.value + ", " +$sentences.value + ", " + getSelectedOption($sentences).innerText;
        output.push({
            key:   key,
            value: new_reason
        });
        console.log(output)
    }


    function load_video() {
        let new_video_src = miniclipFileNameToUrl(getSelectedOption($sentences).value);
        if (video_src !== new_video_src) {  // Only set the source if it changes, to avoid reloading the same video.
            video_src = new_video_src;   // We save it to compare with the value assigned, not the post-processed URL.
            $video.src = new_video_src;
            $video.play();
        }
    }
}


function getSelectedOption($select) {
    for (let i = 0; i < $select.options.length; i++) {
        if ($select.options[i].selected) {
            return $select.options[i];
        }
    }
    return null;
}

function saveDynamicDataToFile() {
    const json = JSON.stringify(output);
    const blob = new Blob([json], {type: "application/json"});
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.download = "output.json";
    a.href = url;
    a.textContent = "Download";
    document.getElementById('content').appendChild(a);
}

window.addEventListener('DOMContentLoaded', () => main());