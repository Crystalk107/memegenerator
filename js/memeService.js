let gImgs = [{ id: 1, url: 'img/square/One-Does-Not-Simply.jpg', keywords: ['happy'] }, { id: 2, url: 'img/square/meme1.jpg', keywords: ['happy'] } ];
let gMemes = [{
    selectedImgId: 1, selectedTxtIdx: 0, txts: [
        {
            line: 'One does not simply...', font: 'impact', size: 40, align: 'left', color: 'black', x: 20, y: 70
        },
        {
            line: 'input text here', font: 'impact', size: 40, align: 'left', color: 'black', x: 20, y: 400
        }
    ]
}, {

selectedImgId: 2, selectedTxtIdx: 0, txts: [
    {
        line: 'sample text', font: 'impact', size: '40', align: 'left', color: 'black' ,x: 20, y: 70
    },
    {
        line: 'input text here', font: 'impact', size: '40', align: 'left', color: 'black' ,x: 20, y: 400
    }
]
}];
let gMeme;
let gImgOnCanvas;
let gLastX, gLastY;
let gCtx;
let gWidth;
let gHeight;
let gCanvas;
let gMemeCurrTxts;

function moveLine(diff){
    gMemeCurrTxts.y += diff;
    renderCanvas();
}

function setLine(diff){
    
    let lineIdx = gMeme.selectedTxtIdx;
    if (lineIdx+diff < gMeme.txts.length && lineIdx+diff >= 0 ) {
        gMeme.selectedTxtIdx += diff;
    }
}

function setFontSize(diff){
    let lineIdx = gMeme.selectedTxtIdx;
    let memeLine = gMeme.txts[lineIdx];
    memeLine.size = +(memeLine.size)+diff;
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
    if (gImgOnCanvas != undefined && gImgOnCanvas.src === memeImage.url) {
        gCtx.drawImage(gImgOnCanvas, 0, 0, gImgOnCanvas.width, gImgOnCanvas.height);
    } else {
        gImgOnCanvas = new Image()
        gImgOnCanvas.src = memeImage.url;
        gImgOnCanvas.onload = () => {
            gHeight = gImgOnCanvas.height;
            gWidth = gImgOnCanvas.width;
            gCanvas.height = gHeight;
            gCanvas.width = gWidth;
            gCtx.drawImage(gImgOnCanvas, 0, 0, gImgOnCanvas.width, gImgOnCanvas.height);
            showText();
            gMemeCurrTxts = gMeme.txts[gMeme.selectedTxtIdx];
        }
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


function getBookIdx(bookId) {
    var index = gBooks.findIndex(function (book) {
        return book.id === bookId;
    });
    return index;
}


function drawText(txt, x, y) {
    gCtx.save();
    gCtx.fillStyle = 'white';
    gCtx.strokeStyle = gMeme.txts[gMeme.selectedTxtIdx].color;
    gCtx.lineWidth = 2;
    let fontSize = gMeme.txts[gMeme.selectedTxtIdx].size;
    let fontStyle = gMeme.txts[gMeme.selectedTxtIdx].font;
    gCtx.font = fontSize+'px'+' '+fontStyle;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
    gCtx.restore();
}

function getCurrLine(){
    return gMeme.txts[gMeme.selectedTxtIdx].line;
}

function showText(){
    let texts = gMeme.txts;
    let text = texts.forEach(function (txt){
        return drawText(txt.line, txt.x, txt.y)
    }) 
    return text;
}

function updateText(text) {
    let txt = gMeme.txts[gMeme.selectedTxtIdx]
    txt.line = text;
    renderCanvas();
    drawText(txt.line, txt.x, txt.y);
}

function intialText() {
    let line1 = getCurrLine();
    drawText(line1.line, line1.x, line1.y);
    gMeme.selectedTxtIdx = 1;
    let line2 = getCurrLine();
    drawText(line2.line, line2.x, line2.y);
    gMeme.selectedTxtIdx = 0;
    
}


function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'mymeme.jpg'
}