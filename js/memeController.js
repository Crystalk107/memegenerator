function init() {
    let canvas = document.querySelector('#meme-canvas');
    document.querySelector('.gallery-link').classList.add("active");
    ctx = canvas.getContext('2d');
    setCanvas(ctx, canvas);
    createMemes()
    renderGallery()
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

function renderGallery() {
    let images = getImageData();
    let divs = images.map(function (image) {
        return `<img src="${image.url}" alt="meme" image-id="${image.id}" onclick="onMemePicked(this)">`
    })
    document.querySelector('.gallery-container').innerHTML = divs.join('');
}


function onMemePicked(el) {
    let imgId = el.getAttribute('image-id');
    setMeme(imgId);
    setMemeImg();
    document.querySelector('#memetext').placeholder = getCurrLine();
    document.querySelector('#memetext').value = '';
    document.querySelector('.gallery-link').classList.remove("active");
    document.querySelector('.about-link').classList.remove("active");
    hideGallery();
}

function hideGallery() {
    document.querySelector('.gallery-container').style.display = "none";
    document.querySelector('.about-container').style.display = "none";
    document.querySelector('.generator-container').style.display = "grid";
    document.querySelector('h2').style.display = "none";

}

function showGallery() {
    document.querySelector('.gallery-container').style.display = "grid";
    document.querySelector('.about-container').style.display = "grid";
    document.querySelector('.generator-container').style.display = "none";
    document.querySelector('.gallery-link').classList.add("active");
    document.querySelector('.about-link').classList.remove("active");
    document.querySelector('h2').style.display = "block";

}

function showAbout() {
    document.querySelector('.gallery-container').style.display = "grid";
    document.querySelector('.about-container').style.display = "grid";
    document.querySelector('.generator-container').style.display = "none";
    document.querySelector('.about-link').classList.add("active");
    document.querySelector('.gallery-link').classList.remove("active");

}

function onChangeFontSize(diff) {
    setFontSize(diff);
    renderCanvas();
}


function toggleMenu() {
    document.querySelector('.main-menu').classList.toggle('menu-open');
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
    document.querySelector('#memetext').value = '';
    document.querySelector('#memetext').placeholder = 'input text here';
    renderCanvas();
}

function onRemoveLine() {
    if (getCurrLine() !== null) {
        removeLine();
        onChangeLine(-1);
        document.querySelector('#memetext').placeholder = getCurrLine();
        if (getCurrLine() === null) {
            onAddLine()
        };
    }

    renderCanvas();
}

function onChangeLine(diff) {
    if (setLine(diff) !== null){
        document.querySelector('#memetext').value = '';
        document.querySelector('#memetext').placeholder = getCurrLine();
    }
    // setLine(diff);
}

function onMoveLine(diff) {
    moveLine(diff);
    renderCanvas();

}