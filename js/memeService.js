let gImgs = [{ id: 1, url: 'img/square/One-Does-Not-Simply.jpg', keywords: ['happy'] }];
let gMemes = [{
    selectedImgId: 1, selectedTxtIdx: 0, txts: [
        {
            line: 'One does not simply...', size: '40px impact', align: 'left', color: 'black'
        }
    ]
}]
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

function getMeme(imgId){
    let meme = gMemes.find(function (meme) {
        return +(imgId) === +(meme.selectedImgId);
    })  
    return meme;    
}

function setMemeImg(meme) {
    debugger;
    let memeImage = getImgById(meme.selectedImgId);
        if (gImgOnCanvas != null){
            gCtx.drawImage(gImgOnCanvas, 0, 0,  gImgOnCanvas.width, gImgOnCanvas.height); 
            let texts = gMemes.txts[gMemes.selectedTxtIdx];
            drawText(texts.line, 20, 70)    
        } else {
        gImgOnCanvas = new Image()
        gImgOnCanvas.src = memeImage.url;
        gImgOnCanvas.onload = () => {
            gHeight = gImgOnCanvas.height;
            gWidth = gImgOnCanvas.width;
            gCanvas.height = gHeight;
            gCanvas.width = gWidth;
            gCtx.drawImage(gImgOnCanvas, 0, 0,  gImgOnCanvas.width, gImgOnCanvas.height); 
            let texts = gMemes.txts[gMemes.selectedTxtIdx];
            drawText(texts.line, 20, 70)    
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
    gCtx.fillStyle= 'white';
    gCtx.strokeStyle= gMemes.txts[gMemes.selectedTxtIdx].color;
    gCtx.lineWidth= 2;
    gCtx.font= gMemes.txts[gMemes.selectedTxtIdx].size;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
    gCtx.restore()
}



function updateText(text){
    gMemes.txts[gMemes.selectedTxtIdx].line = text;
    clearCanvas();
    drawText(text)
    
}





function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'mymeme.jpg'
}