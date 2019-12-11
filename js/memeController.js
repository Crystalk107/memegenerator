function init(){
    let canvas = document.querySelector('#meme-canvas');
    ctx = canvas.getContext('2d');
    setCanvas(ctx, canvas);
    
    
}


function onChangeTextLine(el){
    let input = document.querySelector('#memetext').value;
    updateText(input)
}

function clearCanvas(){
    setMemeImg();
}

function onMemePicked(el){
    let imgId = el.getAttribute('image-id');
    setMeme(imgId);
    setMemeImg()
    document.querySelector('#memetext').value = '';
}

