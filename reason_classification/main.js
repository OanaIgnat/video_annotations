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
    // fetch('../data/reason/input.json')
    //     .then(response => response.json())
    //     .then(miniclips => {
    //         miniclips.forEach(data => {
    //             $video.src = miniclipFileNameToUrl(data.miniclip);
    //             data.sentences.forEach(elem => {
    //                 const $var = document.createElement('option');
    //                 $var.innerText = elem;
    //                 $var.value = data.miniclip;
    //                 $sentences.appendChild($var);
    //             });
    //
    //             data.reasons.forEach(elem => {
    //                 const $var = document.createElement('option');
    //                 $var.innerText = elem;
    //                 $var.value = data.miniclip;
    //                 $reasons.appendChild($var);
    //             });
    //
    //             data.actions.forEach(elem => {
    //                 const $var = document.createElement('option');
    //                 $var.innerText = elem;
    //                 $var.value = data.miniclip;
    //                 $actions.appendChild($var);
    //             });
    //         });
    //     });

    fetch('../data/reason/input2.json')
        .then(response => response.json())
        // .then(data => {
        //     data.entries.forEach(([key, value]) => {
        //         console.log(key, value);
        //     });
        .then(data => {
            // var mydata = JSON.parse(data)
            // var actions = Object.keys(data);
            for (var action in data) {
                const $var = document.createElement('option');

                $var.innerText = action;
                $var.value = data[action];
                $actions.appendChild($var);
                console.log(action +': '+ data[action]);
                console.log(action +': '+ data[action].reasons);

                // if (data.hasOwnProperty(action)) { // this will check if key is owned by data object and not by any of it's ancestors
                //     sentences = data[action].sentences;
                //     reasons = data[action].reasons;
                //
                //     console.log(action +': '+ reasons);
                //     // // console.log(action +': '+ sentences);
                //     // sentences.forEach(elem => {
                //     //
                //     //     console.log(action +': '+ elem.sentence + " ; " + elem.miniclip);
                //     // });
                // }
            }
            // actions.forEach(elem => {
            //     const $var = document.createElement('option');
            //     $var.innerText = elem;
            //     $var.value = data.elem;
            //     $actions.appendChild($var);
            // });

        });

    $actions.addEventListener('change', show_sentences_reasons);
    $sentences.addEventListener('change', load_video);
    $reasons.addEventListener('change', save_reasons);
    $text_reasons.addEventListener('change', save_reasons2);

    function show_sentences_reasons(){
        reasons = getSelectedOption($actions).value;
        console.log(reasons);
        // var array = JSON.parse("[" + reasons + "]");

        // console.log(array);
        // for (var reason in array) {
        //     console.log(reason);
        //     const $var = document.createElement('option');
        //     $var.innerText = reason;
        //     // $var.value = data.miniclip;
        //     $reasons.appendChild($var);
        // }
        // sentences = reasons_sentences.sentences;
        // reasons = reasons_sentences.reasons;
        // console.log(reasons);
    }

    function save_reasons() {

        let new_reason = getSelectedOption($reasons).innerText;
        let key = $sentences.value + ", " + getSelectedOption($sentences).innerText;
        output.push({
            key:   key,
            value: new_reason
        });
        console.log(output)

    }

    function save_reasons2() {

        let new_reason = "new: " + $text_reasons.value;
        let key = $sentences.value + ", " + getSelectedOption($sentences).innerText;
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