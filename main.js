function main() {
    let start_time = 0.0;
    let end_time = 0.0;

    const $actions = document.getElementById('actions');
    const $video = document.getElementsByTagName('video')[0];

    $video.addEventListener('keydown', e => {
        const current_time = $video.currentTime.toPrecision(2);
        switch (e.code) {
            case "KeyS":
                start_time = current_time;
                $video.pause();
                console.log('abc');
                break;
            case "KeyE":
                end_time = current_time;
                $video.play();
                console.log($actions.value + " " + start_time + " " + end_time);
                $actions.selectedIndex++;
                break;
        }
    });

    $video.addEventListener('play', () => {
        console.log("video playing...");
        $video.focus();
    });

    fetch('actions.txt')
        .then(response => response.text())
        .then(actions_text => actions_text.trim().split(/\r?\n/))
        .then(actions => {
            actions.forEach(action => {
                const $action = document.createElement('option');
                $action.innerText = action;
                $actions.appendChild($action);
            });
        });

    $actions.addEventListener('change', () => $video.play());
}

window.addEventListener('DOMContentLoaded', () => main());
