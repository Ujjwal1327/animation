function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
init();

const cursor = document.querySelector(".cursor");
var main = document.querySelector(".main");
var video = document.querySelector(".page1 video");
document.addEventListener("mousemove", function (det) {
  cursor.style.left = det.x + 10 + "px";
  cursor.style.top = det.y + 10 + "px";
});

const rowImg = document.querySelectorAll(".img-row");
rowImg.forEach(function (elem) {
  elem.addEventListener("mouseenter", function () {
    var src = elem.getAttribute("src");
    cursor.style.height = "300px";
    cursor.style.width = "300px";
    cursor.style.borderRadius = "0px";
    cursor.style.zIndex = 20;
    cursor.style.backgroundImage = `url(${src})`;
    cursor.style.mixBlendMode = `normal`;
  });
  elem.addEventListener("mouseleave", function () {
    cursor.style.height = "15px";
    cursor.style.width = "15px";
    cursor.style.borderRadius = "50%";
    cursor.style.backgroundImage = `none`;
    cursor.style.mixBlendMode = `difference`;
  });
});

// gsap , scolltrigger and locomotive...

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 > h1",
    scroller: ".main",
    start: "top 25%",
    end: "top 2%",
    scrub: 2,
  },
});
tl.to(
  ".page1>h1",
  {
    x: -120,
    transform: "rotate(-10deg)",
    opacity: 0,
  },
  "anim"
);
tl.to(
  ".page1>h2",
  {
    x: 120,
    transform: "rotate(-10deg)",
    opacity: 0,
  },
  "anim"
);

tl.to(
  ".page1 video",
  {
    width: "95%",
  },
  "anim"
);

const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 > h1",
    scroller: ".main",
    start: "top -100%",
    end: "top -120%",
    scrub: 2,
  },
});
tl2.to(".main", {
  backgroundColor: "#fff",
});

const tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 > h1",
    scroller: ".main",
    start: "top -480%",
    end: "top -315%",
    scrub: 2,
  },
});
tl3.to(".main", {
  backgroundColor: "#0f0d0d",
});
const menuItem = document.querySelectorAll("#nav h4");
const ppl = document.querySelector("#purple");
menuItem.forEach(function (elem) {
  elem.addEventListener("mouseenter", function () {
    ppl.style.display = "block";
    purple.style.opacity = "1";
    purple.innerHTML = `<h1>${elem.innerText}<h1/>`;
  });
});
const nav = document.querySelector("#nav");
nav.addEventListener("mouseleave", function () {
  ppl.style.display = "none";
  purple.style.opacity = "0";
});
