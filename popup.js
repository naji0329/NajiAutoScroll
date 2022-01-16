var pixels,waitTime,timeout, sliderVal;
var startScroll = document.getElementById('startScroll');
var stopScroll  = document.getElementById('stopScroll');
var slider      = document.getElementById("myRange");

startScroll.style.backgroundColor   = '#00FF7F';
stopScroll.style.backgroundColor    = '#FF007F';

//Scroll object
startScroll.onclick = setSlider;
slider.onchange     = setSlider;

stopScroll.onclick = function(){
    pixels = 0;
};

document.onreadystatechange = function() {
    console.log("local storage");
    var saved_timeout;
    var saved_pixel;
    var saved_slider;

    saved_timeout   = localStorage.getItem("timeout");
    saved_pixel     = localStorage.getItem("pixel");
    saved_slider    = localStorage.getItem("slider");

    if(saved_timeout)   timeout     = saved_timeout;
    if(saved_pixel)     pixels      = saved_pixel;
    if(saved_slider)    sliderVal   = saved_slider;
};
slider.value = 300;
setSlider();
function setSlider(){
    clearTimeout(timeout);
    if (slider.value < 300)
        waitTime = 300 - slider.value;
    else
        waitTime = 1;

    pixels = 1;
    if (slider.value >= 300)
        pixels = 2;
    else if (slider.value >= 350)
        pixels = 3;
    else if (slider.value >= 400)
        pixels = 4;
    else if (slider.value >= 450)
        pixels = 5;
    else if (slider.value >= 500)
        pixels = 6;

    timeout = setInterval(scroll, waitTime);

    localStorage.setItem("pixels",  JSON.stringify(pixels));
    localStorage.setItem("timeout", JSON.stringify(timeout));
    localStorage.setItem("slider",  JSON.stringify(slider.value));
}

function scroll(element) {
    chrome.tabs.executeScript({
        code: returnScript()
    });
}

function returnScript(){
    var script = [
        'if(document.title.includes(\'Google Sheets\')){',

        '}else if(document.title.includes(\'Google Doc\')){',

        '}else{',
            'window.scrollBy(0, ', pixels, ');',
        '}'
    ];

    var joinedScript = script.join('');
    console.log(joinedScript);

    return joinedScript;
}