function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotive();

function revealToSpan(){
    document.querySelectorAll(".reveal")
    .forEach(function(elem){
        var parent = document.createElement("span");
        var child = document.createElement("span");

        parent.classList.add("parent");
        child.classList.add("child");

        child.innerHTML = elem.innerHTML;

        parent.appendChild(child);

        elem.innerHTML = "";
        elem.appendChild(parent);
    })
}
revealToSpan();

var tl = gsap.timeline();

function textAnim(){
  tl
.from(".parent .child ",{
    y:"100%",
    duration:2,
    opacity:0.3,
    ease:Expo.easeInOut
})
.to("#page1-inner ",{
    scrollTrigger:{
        trigger:".fade",
        scroller:"#main",
        start:"top 20%",
        // markers:true,
        scrub:2
    },
    y:"-20%",
    ease:Circ.easeOut
})
document.querySelectorAll(".fade")
.forEach(function(elem){
  gsap.to(elem,{
    scrollTrigger:{
        trigger:elem,
        scroller:"#main",
        start:"top 20%",
        // markers:true,
        scrub:2
    },
    y:-50,
    opacity:0,
    ease:Expo.easeInOut
})

})

}
textAnim();

function menuToggle(){
  const menus = document.querySelectorAll(".menu-toggle");
      menus.forEach(function (menu) {
          const hambergerMenu = menu.querySelector(".hamberger-menu");
          menu.addEventListener("click", function () {
              hambergerMenu.classList.toggle("open");
          });
      });
      
}
menuToggle();
function menuReveal(){
  var menuToggle = document.querySelector("#menuToggle");
var tl = gsap.timeline({paused: true});
tl
.to('.fullpage-menu',{
  duration:0,
  display:"block",
  ease:"Expo.eseInOut",
});

tl
.from('.menu-bg span',{
  duration:1,
  x:"100%",
  stagger:0.1,
  ease:'Expo.easeInOut'
});
tl
.from('.main-menu li a',{
  duration:1.5,
  y:"100%",
  stagger:0.2,
  ease:'Expo.easeInOut'
},"-=0.5");


tl.from('.social-links li',{
  duration:1,
  y:"-100%",
  opacity:0,
  stagger:0.1,
  ease:'Expo.easeInOut'
},"-=0.5");
tl.reverse();

menuToggle.addEventListener('click',function(){
  tl.reversed(!tl.reversed());

})
}
menuReveal();





