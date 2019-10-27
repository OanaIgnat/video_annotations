let output = {};
const progress_bar = document.getElementById("myBar");
let progress = 0;
const miniclipFileNameToUrl = miniclip_filename => 'miniclips/' + miniclip_filename;
const channel_playlist = "5p0";

function main() {
    let start_time = 0.0;
    let end_time = 0.0;
    let video_src = null;

    const $actions = document.getElementById('actions');
    const $video = document.getElementsByTagName('video')[0];

    $video.addEventListener('keydown', e => {
        const current_time = $video.currentTime.toPrecision(2);
        switch (e.code) {
            case "KeyS":
                start_time = current_time;
                $video.pause();
                break;
            case "KeyE":
                end_time = current_time;
                $video.play();
                output[$actions.value + ", " + getSelectedOption($actions).innerText] = [start_time, end_time];
                $actions.selectedIndex++;
                load_video();
                progress_bar.style.width = progress + '%';
                break;
            case "KeyN":
                end_time = current_time;
                $video.play();
                output[$actions.value + ", " + getSelectedOption($actions).innerText] = ["not visible"];
                $actions.selectedIndex++;
                load_video();
                progress_bar.style.width = progress + '%';
                break;
            case "KeyC":
                end_time = current_time;
                $video.play();
                output[$actions.value + ", " + getSelectedOption($actions).innerText] = ["could be"];
                $actions.selectedIndex++;
                load_video();
                progress_bar.style.width = progress + '%';
                break;

        }

        const nb_actions = $actions.innerText.trim().split(/\r?\n/).length;
        progress = Math.floor($actions.selectedIndex * 100 / nb_actions);
        progress_bar.textContent = progress + '%';

    });


    $video.addEventListener('play', () => $video.focus());
    fetch('miniclip_jsons/miniclip_actions_' + channel_playlist + '.json')
        .then(response => response.json())
        .then(miniclips => {
            miniclips.forEach(miniclip_actions => {
                $video.src = miniclipFileNameToUrl(miniclip_actions.miniclip);
                miniclip_actions.actions.forEach(action => {
                    const $action = document.createElement('option');
                    $action.innerText = action;
                    $action.value = miniclip_actions.miniclip;
                    $actions.appendChild($action);
                });
            });
        });

    $actions.addEventListener('change', load_video);

    function load_video() {
        let new_video_src = miniclipFileNameToUrl(getSelectedOption($actions).value);
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
    a.download = "results" + channel_playlist + ".json";
    a.href = url;
    a.textContent = "Download";
    document.getElementById('content').appendChild(a);
}

window.addEventListener('DOMContentLoaded', () => main());