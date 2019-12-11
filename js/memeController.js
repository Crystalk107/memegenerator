function init(){
    let canvas = document.querySelector('#meme-canvas');
    ctx = canvas.getContext('2d');
    setCanvas(ctx, canvas);
    
    
}


function onChangeTextLine(el){
    let input = document.querySelector('#memetext').value;
    updateText(input)
}

function renderCanvas(){
    setMemeImg();
}

function onMemePicked(el){
    let imgId = el.getAttribute('image-id');
    setMeme(imgId);
    setMemeImg();
    intialText();
    document.querySelector('#memetext').value = getCurrLine();
}

function onChangeFontSize(diff){
    setFontSize(diff);
    renderCanvas();
}

function onChangeLine(diff){
    setLine(diff);
    document.querySelector('#memetext').value = getCurrLine();

}

function onMoveLine(diff){
    moveLine(diff);

}