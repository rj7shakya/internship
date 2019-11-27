mainCont = document.getElementsByClassName("carousel-container");
imgCont = document.getElementsByClassName("carousel-image-wrapper");

var HEIGHT = 100;
var WIDTH =100;

imgCont[0].style.width = WIDTH+'px';
imgCont[0].style.height = HEIGHT+'px';

var tag = document.getElementsByTagName('img')
// var left = imgCont[0].style.left;
var slideIndex=0;
console.log(imgCont);

for(var i=0;i<tag.length;i++){
    tag[i].style.position = 'relative';
    tag[i].style.display = 'none';
}
change(0);
function slidemove(n){
    change(n);
}

function change(n){
    // imgCont[0].style.width = slideIndex *WIDTH +'px';
    slideIndex = n;
    for(var i=0;i<tag.length;i++){
        if(slideIndex == i){
            tag[i].style.display = 'block';
        }else{
            tag[i].style.display = 'none';
        }
        console.log(slideIndex,i)
    }
    if(slideIndex < tag.length-1){
        slideIndex++;
    }else{
        slideIndex=0;
    }
    setTimeout("change(slideIndex)",2000);
}

// change(2);