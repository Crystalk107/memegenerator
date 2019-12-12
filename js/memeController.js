function init() {
    let canvas = document.querySelector('#meme-canvas');
    ctx = canvas.getContext('2d');
    setCanvas(ctx, canvas);
}


function onChangeTextLine(el) {
    let input = document.querySelector('#memetext').value;
    updateText(input);
    renderCanvas();
}

function renderCanvas() {
    setMemeImg();
    showText();


}

function onMemePicked(el) {
    let imgId = el.getAttribute('image-id');
    setMeme(imgId);
    setMemeImg();
    document.querySelector('#memetext').value = getCurrLine();
    hideGallery();
}
function hideGallery() {
    document.querySelector('.gallery-container').style.display = "none";
    document.querySelector('.about-container').style.display = "none";
    document.querySelector('.generator-container').style.display = "grid";

}

function showGallery() {
    document.querySelector('.gallery-container').style.display = "grid";
    document.querySelector('.about-container').style.display = "grid";
    document.querySelector('.generator-container').style.display = "none";
}

function onChangeFontSize(diff) {
    setFontSize(diff);
    renderCanvas();
}

function onChangeLine(diff) {
    setLine(diff);
    document.querySelector('#memetext').value = getCurrLine();

}

function onMoveLine(diff) {
    moveLine(diff);
    renderCanvas();

}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
    if ((document.querySelector('.menu-open')) !== null) {
        document.querySelector('#menu-btn').innerText = "X";
    }
    else document.querySelector('#menu-btn').innerText = "☰";
}

function onSelectFontFamily() {
    var selector = document.getElementById('selectFontFamily');
    var fontFamily = selector.options[selector.selectedIndex].value;
    updateLineFont(fontFamily);
    renderCanvas();
}

function onChangeFillColor() {
    var selfillColor = document.querySelector('#fillcolor').value;
    changeFillColor(selfillColor);
    renderCanvas();
}

function onChangeStrokeColor() {
    var selstrokeColor = document.querySelector('#strokecolor').value;
    changeStrokeColor(selstrokeColor);
    renderCanvas();

}

function onAlignText(num) {
    alignText(num);
    renderCanvas();
}

function onAddLine() {
    addLine();
    renderCanvas();
    document.querySelector('#memetext').value = getCurrLine();
}

function onRemoveLine() {
    removeLine();
    onChangeLine(-1)
    renderCanvas();
}