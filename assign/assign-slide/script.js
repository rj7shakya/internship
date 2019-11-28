mainCont = document.getElementsByClassName("carousel-container");
imgCont = document.getElementsByClassName("carousel-image-wrapper");
imgCont[0].style.transition = 'left '+0.5+'s';

var HEIGHT = 100;
var WIDTH =100;
var l= false;

function setWidth(slideIndex){
    imgCont[0].style.width = WIDTH*slideIndex +'px';
}

var tag = document.getElementsByTagName('img');
var slideIndex=1;

// for a tag
var left = document.createElement('a');
left.innerHTML = '&#10094;';
mainCont[0].appendChild(left);
left.onclick =function(){
    slide(-1);
};
left.style.cursor='pointer';
left.style.position = 'absolute';
left.style.left = 0+'px';
left.style.top = 50+'%';

var right = document.createElement('a');
right.innerHTML = '&#10095;';
mainCont[0].appendChild(right);
right.onclick =function(){slide(1)};
right.style.cursor='pointer';
right.style.position = 'absolute';
right.style.right = 0+'px';
right.style.top = 50+'%';

var indicat = document.createElement('div');
indicat.className = 'ind';
mainCont[0].appendChild(indicat);
indicat.style.width = 100+'%';
indicat.style.height = 15+'px';
indicat.style.position ='absolute';
indicat.style.bottom ='0px';
indicat.style.textAlign = 'center';

for(var i=0;i<tag.length;i++){
    tag[i].style.position = 'absolute';
    tag[i].style.left = i*WIDTH +'px';
    var dot = document.createElement('span');
    dot.className='dot';
    indicat.appendChild(dot); 
    dot.style.cursor='pointer';
    dot.style.height=10+'px';
    dot.style.width=10+'px';
    dot.style.margin=0+' 2'+'px';
    dot.style.backgroundColor='red';
    dot.style.borderRadius=50+'%';
    dot.style.display='inline-block';
    dot.style.onclick= function(){
        slide(i+1);
    };
    dot.style.bottom=0+'px';
}

function change(n){
    slideIndex = n;
    if(slideIndex < tag.length && slideIndex >0){
        slideIndex++;
    }else if(slideIndex >= tag.length){
        slideIndex = 1;
    }else if(slideIndex <= 1){
        slideIndex =tag.length;
    }

    imgCont[0].style.left = -(slideIndex-1)*100 +'px';
}

var auto =  setInterval(function(){change(slideIndex)},3000);
var btn;
function slide(n){
    slideIndex+=n-1;
    clearInterval(auto);
    clearInterval(btn);
    change(slideIndex);
    btn= setInterval(function(){change(slideIndex)},3000);
}
change(1);

