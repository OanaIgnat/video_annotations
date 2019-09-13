let video = document.getElementById('vid');
let start_time = 0;
let end_time = 0;
var poemDisplay = document.querySelector('a');

let iframe = document.getElementById("myFrame");

console.log(iframe);

video.addEventListener('keydown', e => {
    let curtime = video.currentTime.toPrecision(1);

    if (e.code === "KeyS")
        start_time = curtime;

    else if (e.code === "KeyE")
        end_time = curtime;

    else if (e.code === "ArrowUp")
        console.log("ArrowUp" + curtime);

    else if (e.code === "ArrowDown")
        console.log("ArrowDown" + curtime);

    // console.log("start_time: " + start_time);
    // console.log("end_time: "+ end_time);
});

video.addEventListener('play', () => {
    console.log("test");
    document.getElementById("vid").focus();
});
