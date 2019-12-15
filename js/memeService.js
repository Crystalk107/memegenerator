
let gMeme;
let gImgOnCanvas;
let gLastX, gLastY;
let gCtx;
let gWidth;
let gHeight;
let gCanvas;
let gMemeCurrTxts;


window.onresize = function () {
    resizeCanvas()
    setMemeImg()

}

window.onresize = function () {
    var elContainer = document.querySelector('.canvas-container');
    if (elContainer.offsetWidth < gWidth) gCanvas.style.width = '80%';
}


function filterMemes(input) {
    input = input.toUpperCase();
    let filteredImgs = gImgs.filter(function (image) {
        let keywordsString = '';
        for (let i = 0; i < image.keywords.length; i++) {
            image.keywords[i] = image.keywords[i].toUpperCase();
            keywordsString += image.keywords[i]+' ';
        }
        return keywordsString.includes(input);
    });
    if (input === '') return filteredImgs = undefined;
    else return filteredImgs;
}


function createMeme() {
    let meme = {
        selectedImgId: gMemes.length + 1, selectedTxtIdx: 0, txts: [
            {
                line: '1st line', font: 'impact', size: 40, align: 'left', strokecolor: 'black', fillcolor: 'white', x: 25, y: 70
            },
            {
                line: '2nd line', font: 'impact', size: 40, align: 'left', strokecolor: 'black', fillcolor: 'white', x: 25, y: 400
            },
        ]
    }
    return meme;
}

function createMemes() {
    for (let i = 2; i <= gImgs.length; i++) {
        gMemes.push(createMeme());
    }
}

function getImageData() {
    return gImgs;
}
function setVars() {
    gMemeCurrTxts = gMeme.txts[gMeme.selectedTxtIdx];
}

function moveLine(diff) {
    let fontSize = gMeme.txts[gMeme.selectedTxtIdx].size;
    let fontStyle = gMeme.txts[gMeme.selectedTxtIdx].font;
    gCtx.font = fontSize + 'px' + ' ' + fontStyle;
    let lineMaxHeight = gCtx.measureText('M').width;
    let boundTop = lineMaxHeight + 30;
    let boundBot = gHeight - lineMaxHeight;
    let yPos = gMeme.txts[gMeme.selectedTxtIdx].y;
    if (yPos > boundTop && diff < 0) gMeme.txts[gMeme.selectedTxtIdx].y += -25
    else if (yPos < boundBot && diff > 0) gMeme.txts[gMeme.selectedTxtIdx].y += 25

}

function addLine() {
    gMeme.selectedTxtIdx = gMeme.txts.length;
    let texts = gMeme.txts;
    texts.push({ line: '', font: 'impact', size: 40, align: 'left', strokecolor: 'black', fillcolor: 'white', x: 25, y: gHeight / 2 });
}

function removeLine() {
    gMeme.txts.splice(gMeme.selectedTxtIdx, 1);
}

function getCurrLine() {
    if (gMeme.txts.length !== 0) return gMeme.txts[gMeme.selectedTxtIdx].line;
    else return null;
}

function setLine(diff) {

    let lineIdx = gMeme.selectedTxtIdx;
    if (lineIdx + diff < gMeme.txts.length && lineIdx + diff >= 0) {
        gMeme.selectedTxtIdx += diff;
    } else return null;

}

function alignText(num) {
    let lineText = gMeme.txts[gMeme.selectedTxtIdx].line;
    let fontSize = gMeme.txts[gMeme.selectedTxtIdx].size;
    let fontStyle = gMeme.txts[gMeme.selectedTxtIdx].font;
    gCtx.font = fontSize + 'px' + ' ' + fontStyle;
    let lineWidth = gCtx.measureText(lineText).width;



    if (num === -1) {
        gMeme.txts[gMeme.selectedTxtIdx].align = 'left';
        gMeme.txts[gMeme.selectedTxtIdx].x = (gWidth * 5) / 100;
    }

    if (num === 0) {
        gMeme.txts[gMeme.selectedTxtIdx].align = 'center';
        gMeme.txts[gMeme.selectedTxtIdx].x = (gWidth - lineWidth) / 2;
    }
    if (num === 1) {
        gMeme.txts[gMeme.selectedTxtIdx].align = 'right';
        gMeme.txts[gMeme.selectedTxtIdx].x = gWidth - ((gWidth * 5) / 100) - lineWidth;
    }
}

function setFontSize(diff) {
    gMemeCurrTxts = gMeme.txts[gMeme.selectedTxtIdx];
    gMemeCurrTxts.size += diff;
}
function setCanvas(ctx, canvas) {
    gCtx = ctx;
    gCanvas = canvas;
}

function setMeme(imgId) {
    let meme = gMemes.find(function (meme) {
        return +(imgId) === +(meme.selectedImgId);
    })
    return gMeme = meme;
}

function setMemeImg() {
    let memeImage = getImgById(gMeme.selectedImgId);
    gImgOnCanvas = new Image()
    gImgOnCanvas.src = memeImage.url;
    gImgOnCanvas.onload = () => {
        gHeight = gImgOnCanvas.height;
        gWidth = gImgOnCanvas.width;
        gCanvas.height = gHeight;
        gCanvas.width = gWidth;
        var elContainer = document.querySelector('.canvas-container');
        if (elContainer.offsetWidth < gWidth) gCanvas.style.width = '80%';

        gCtx.drawImage(gImgOnCanvas, 0, 0, gWidth, gHeight);

        setVars();
        showText();

    }
}




function getImgById(imgId) {
    var image = gImgs.find(function (image) {
        return image.id === imgId;
    });
    return image;
}

function getImgIdx(imgId) {
    var index = gImgs.findIndex(function (image) {
        return image.id === imgId;
    });
    return index;
}

function changeFillColor(selFillColor) {
    gMeme.txts[gMeme.selectedTxtIdx].fillcolor = selFillColor;
}

function changeStrokeColor(selStrokeColor) {
    gMeme.txts[gMeme.selectedTxtIdx].strokecolor = selStrokeColor;
}

function drawText(txt, x, y) {
    gCtx.save();
    gCtx.fillStyle = gMeme.txts[gMeme.selectedTxtIdx].fillcolor;
    gCtx.strokeStyle = gMeme.txts[gMeme.selectedTxtIdx].strokecolor;
    gCtx.lineWidth = 2;
    let fontSize = gMeme.txts[gMeme.selectedTxtIdx].size;
    let fontStyle = gMeme.txts[gMeme.selectedTxtIdx].font;
    gCtx.font = fontSize + 'px' + ' ' + fontStyle;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
    gCtx.restore();
}




function showText() {
    let texts = gMeme.txts;
    let currSelectedTxt = gMeme.selectedTxtIdx;
    for (var i = 0; i < texts.length; i++) {
        gMeme.selectedTxtIdx = i;
        drawText(texts[i].line, texts[i].x, texts[i].y);
    }
    gMeme.selectedTxtIdx = currSelectedTxt;
}

function updateText(text) {
    let txt = gMeme.txts[gMeme.selectedTxtIdx]
    txt.line = text;
    showText();

}

function updateLineFont(selFont) {
    gMeme.txts[gMeme.selectedTxtIdx].font = selFont;
}



function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'mymeme.jpg'
}