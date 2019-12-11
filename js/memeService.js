let gImgs = [{ id: 1, url: 'img/square/One-Does-Not-Simply.jpg', keywords: ['happy'] }, { id: 2, url: 'img/square/meme1.jpg', keywords: ['happy'] } ];
let gMemes = [{
    selectedImgId: 1, selectedTxtIdx: 0, txts: [
        {
            line: 'One does not simply...', size: '40px impact', align: 'left', color: 'black'
        },
        {
            line: 'input text here', size: '40px impact', align: 'left', color: 'black'
        }
    ]
}, {

selectedImgId: 2, selectedTxtIdx: 0, txts: [
    {
        line: 'sample text', size: '40px impact', align: 'left', color: 'black'
    },
    {
        line: 'input text here', size: '40px impact', align: 'left', color: 'black'
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
    if (gImgOnCanvas != null && gImgOnCanvas.src === memeImage.url) {
        gCtx.drawImage(gImgOnCanvas, 0, 0, gImgOnCanvas.width, gImgOnCanvas.height);
        intialText();
    } else {
        gImgOnCanvas = new Image()
        gImgOnCanvas.src = memeImage.url;
        gImgOnCanvas.onload = () => {
            gHeight = gImgOnCanvas.height;
            gWidth = gImgOnCanvas.width;
            gCanvas.height = gHeight;
            gCanvas.width = gWidth;
            gCtx.drawImage(gImgOnCanvas, 0, 0, gImgOnCanvas.width, gImgOnCanvas.height);
            intialText();
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
    gCtx.save()
    gCtx.fillStyle = 'white';
    gCtx.strokeStyle = gMeme.txts[gMeme.selectedTxtIdx].color;
    gCtx.lineWidth = 2;
    gCtx.font = gMeme.txts[gMeme.selectedTxtIdx].size;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
    gCtx.restore()
}



function updateText(text) {
    gMeme.txts[gMeme.selectedTxtIdx].line = text;
    clearCanvas();
    drawText(text)
}

function intialText() {
    let line1 = gMeme.txts[gMeme.selectedTxtIdx];
    let line2 = gMeme.txts[1];
    drawText(line1.line, 20, 70);
    drawText(line2.line, 20, 400);
}






function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'mymeme.jpg'
}