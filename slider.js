const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll(".imgContainer")[0],
arrowIcons = document.querySelectorAll("#slider i");


let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
const showHideIcons = function (){
    // Showing and Hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth// getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}


arrowIcons.forEach(function(icon){
    icon.addEventListener("click",function(){
        let firstImgWidth = firstImg.clientWidth + 50; // getting first img width & adding 50 margin value
        // if clicked icon is left , reduce width value from the carousel scroll left else add to it 
        carousel.scrollLeft += icon.id == "left"? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(),60);// calling showIcons after 60ms
    })
});


const autoSlide = function (){
    // if there is no img left to scroll then return from here
    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;

    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 50;

    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;
    if(carousel.scrollLeft > prevScrollLeft){
        // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;


}


const dragStart = function(e) {
    // Updating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging =function(e) {
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}


const dragStop = function(){
   isDragStart = false;
   carousel.classList.remove("dragging");

   if(!isDragging) return;
   isDragging = false;
   autoSlide();
}

carousel.addEventListener("mousedown",dragStart);
carousel.addEventListener("touchstart",dragStart);

carousel.addEventListener("mousemove",dragging);
carousel.addEventListener("touchmove",dragging);

carousel.addEventListener("mouseup",dragStop);
carousel.addEventListener("mouseleave",dragStop);
carousel.addEventListener("touchend",dragStop);