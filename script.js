function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
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
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function loadingAnimation() {
  let tl = gsap.timeline();
  tl.from(".line h1", {
    y: 150,
    stagger: 0.1,
    opacity: 0,
    duration: 2.5,
    delay: 0.2,
  });

  tl.from("#line1-part1", {
    opacity: 0,
    onStart: function () {
      let h5Timer = document.querySelector("#line1-part1 h5");
      let grow = 0;
      setInterval(() => {
        if (grow < 100) {
          h5Timer.textContent = grow++;
        } else {
          h5Timer.textContent = grow;
        }
      }, 10);
    },
  });

  tl.to(".line h2", {
    AnimationName: "anime",
    opacity: 1,
  });

  tl.to("#loader", {
    opacity: 0,
    duration: 1,
    // duration: 3,
    delay: 0,
    // delay: 2,
  });

  tl.from("#page1", {
    delay: 0.2,
    y: 1600,
    opacity: 0,
    duration: 0.5,
    // ease:power4
  });

  tl.to("#loader", {
    display: "none",
  });

  //! Nav loader
  tl.from("#nav", {
    opacity: 0,
  });

  //! page1 loader
  tl.from("#hero1 h1, #hero2 h1, #hero3 h2, #hero4 h1", {
    y: 150,
    stagger: 0.2,
    opacity: 0,
    duration: 0.6,
  });
  tl.from(
    "#hero1, #page2",
    {
      opacity: 0,
    },
    "-=1.2"
  );
}

function cursorAnimation() {
  Shery.mouseFollower({
    //Parameters are optional.
    skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });

  Shery.makeMagnet("#nav-part2 h4" /* Element to target.*/);

  var videoContainer = document.querySelector("#video-container");
  let video = document.querySelector("#video-container video");

  videoContainer.addEventListener("mouseenter", function () {
    videoContainer.addEventListener("mousemove", function (dets) {
      gsap.to("#video-cursor", {
        left: dets.x - 450,
        y: dets.y - 30,
      });
      gasp.to(".mousefollower", {
        display: "none",
      });
    });
  });

  videoContainer.addEventListener("mouseleave", () => {
    gsap.to(".mousefollower", {
      display: "intial",
    });
    gsap.to("#video-cursor", {
      left: "80%",
      top: "-12%",
    });
  });

  let flag = 0;
  videoContainer.addEventListener("click", function () {
    if (flag == 0) {
      video.play();
      video.style.opacity = 1;
      document.querySelector(
        "#video-cursor"
      ).innerHTML = `<i class="ri-pause-line"></i>`;
      gsap.to("#video-cursor", {
        scale: 0.5,
      });
      flag = 1
    } 
     else{
      video.pause();
      video.style.opacity = 0 ;
      document.querySelector(
        "#video-cursor"
      ).innerHTML = `<i class="ri-play-mini-fill"></i>`;
      gsap.to("#video-cursor", {
        scale: 1,
      });
      flag = 0

    }
  });
}
function imageAnimation() {
  Shery.imageEffect(".image-div", {
    style: 5,
    // debug:true,
    config: {
      a: { value: 2, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7272749998247967 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.3, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 0 },
      noise_speed: { value: 0.69, range: [0, 10] },
      metaball: { value: 0.4, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.45, range: [0, 2] },
      noise_scale: { value: 12.98, range: [0, 100] },
    },
    gooey: true,
  });
}

loadingAnimation();
cursorAnimation();
locomotiveAnimation();
imageAnimation();


document.addEventListener("mousemove", function (dets) {
  gsap.to("#flag",{
    x:dets.x,
    y:dets.y,
  });
});

document.querySelector("#hero3").addEventListener("mouseenter",function() {
  gsap.to("#flag",{
    opacity: 1,
    });
})
document.querySelector("#hero3").addEventListener("mouseleave",function() {
  gsap.to("#flag",{
    opacity: 0,
    });
})


