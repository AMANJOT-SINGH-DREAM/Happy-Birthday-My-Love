/* ==========================================================
   RAMANPREET BIRTHDAY INVITATION
   script.js
   PART 1 - SECTION A
========================================================== */

"use strict";

/*=========================
GLOBAL SELECTORS
==========================*/

const body = document.body;

const loader = document.getElementById("loader");
const loaderBar = document.getElementById("loaderBar");

const welcome = document.getElementById("welcome");

const giftBox = document.getElementById("giftBox");

const cinematic = document.getElementById("cinematic");
const introVideo = document.getElementById("introVideo");
const skipIntro = document.getElementById("skipIntro");

const mainSite = document.getElementById("mainSite");

const cursorGlow = document.getElementById("cursorGlow");

const scrollBar = document.getElementById("scrollBar");

const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

let invitationOpened = false;


/*=========================
LOADER
==========================*/

window.addEventListener("load", () => {

    let progress = 0;

    const interval = setInterval(() => {

        progress++;

        loaderBar.style.width = progress + "%";

        if (progress >= 100) {

            clearInterval(interval);

            setTimeout(() => {

                loader.classList.add("is-hidden");

            }, 400);

        }

    }, 18);

});


/*=========================
CURSOR GLOW
==========================*/

window.addEventListener("mousemove", (e) => {

    cursorGlow.style.left = e.clientX + "px";

    cursorGlow.style.top = e.clientY + "px";

});


document.addEventListener("mouseleave", () => {

    cursorGlow.style.opacity = 0;

});

document.addEventListener("mouseenter", () => {

    cursorGlow.style.opacity = 1;

});


/*=========================
SCROLL PROGRESS
==========================*/

window.addEventListener("scroll", () => {

    const scrollTop = window.pageYOffset;

    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const percent = (scrollTop / height) * 100;

    scrollBar.style.width = percent + "%";

});


/*=========================
BACKGROUND MUSIC
==========================*/

const savedMusic = localStorage.getItem("birthday_music");

if (savedMusic === "playing") {

    musicBtn.classList.add("is-playing");

}

function playMusic() {

    bgMusic.play()
    .then(()=>{

        musicBtn.classList.add("is-playing");

        localStorage.setItem("birthday_music","playing");

    })
    .catch(()=>{});

}

function pauseMusic(){

    bgMusic.pause();

    musicBtn.classList.remove("is-playing");

    localStorage.setItem("birthday_music","paused");

}

musicBtn.addEventListener("click",()=>{

    if(bgMusic.paused){

        playMusic();

    }else{

        pauseMusic();

    }

});


/*=========================
GIFT OPEN
==========================*/

giftBox.addEventListener("click",()=>{

    if(invitationOpened) return;

    invitationOpened=true;

    giftBox.classList.add("is-open");

    playMusic();

    setTimeout(()=>{

        welcome.classList.add("is-leaving");

    },1000);

    setTimeout(()=>{

        cinematic.classList.add("is-active");

        introVideo.play();

    },1600);

});


/*=========================
INTRO VIDEO
==========================*/

function closeIntro(){

    cinematic.classList.add("is-leaving");

    setTimeout(()=>{

        cinematic.style.display="none";

        mainSite.scrollIntoView({

            behavior:"smooth"

        });

    },800);

}

skipIntro.addEventListener("click",()=>{

    introVideo.pause();

    closeIntro();

});

introVideo.addEventListener("ended",()=>{

    closeIntro();

});


/*=========================
FIRST CLICK MUSIC FIX
==========================*/

document.addEventListener("click",()=>{

    if(localStorage.getItem("birthday_music")==="playing"){

        playMusic();

    }

},{once:true});

/* ==========================================================
   PART 2 - SECTION B
   Reveal Animation
   Countdown
   Navigation
   Smooth Scroll
==========================================================*/


/*=========================
REVEAL ANIMATION
==========================*/

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("is-visible");

            revealObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.15
});

revealItems.forEach(item=>{

    revealObserver.observe(item);

});


/*=========================
REVEAL LINE
==========================*/

const revealLines=document.querySelectorAll(".reveal-line");

const lineObserver=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("is-visible");

        }

    });

},{
    threshold:0.25
});

revealLines.forEach(item=>{

    lineObserver.observe(item);

});


/*=========================
COUNTDOWN
==========================*/

const cdDays=document.getElementById("cdDays");
const cdHours=document.getElementById("cdHours");
const cdMins=document.getElementById("cdMins");
const cdSecs=document.getElementById("cdSecs");

const targetDate=new Date("July 22, 2026 18:00:00").getTime();

function updateCountdown(){

    const now=new Date().getTime();

    const distance=targetDate-now;

    if(distance<0){

        cdDays.textContent="00";
        cdHours.textContent="00";
        cdMins.textContent="00";
        cdSecs.textContent="00";
        return;
    }

    const days=Math.floor(distance/(1000*60*60*24));

    const hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));

    const mins=Math.floor((distance%(1000*60*60))/(1000*60));

    const secs=Math.floor((distance%(1000*60))/1000);

    cdDays.textContent=String(days).padStart(2,"0");

    cdHours.textContent=String(hours).padStart(2,"0");

    cdMins.textContent=String(mins).padStart(2,"0");

    cdSecs.textContent=String(secs).padStart(2,"0");

}

updateCountdown();

setInterval(updateCountdown,1000);


/*=========================
SMOOTH MENU LINKS
==========================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


/*=========================
ACTIVE NAV LINK
==========================*/

const sections=document.querySelectorAll("section[id]");

const navLinks=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-140;

        if(window.pageYOffset>=top){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});


/*=========================
NAV HIDE / SHOW
==========================*/

const nav=document.getElementById("siteNav");

let lastScroll=0;

window.addEventListener("scroll",()=>{

    let current=window.pageYOffset;

    if(current>lastScroll && current>120){

        nav.style.transform="translateY(-100%)";

    }else{

        nav.style.transform="translateY(0)";

    }

    lastScroll=current;

});


/*=========================
BUTTON RIPPLE EFFECT
==========================*/

document.querySelectorAll(".btn,.surprise-btn").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.transform="translateY(-4px) scale(1.03)";

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.transform="";

    });

});


/*=========================
HERO IMAGE FLOAT
==========================*/

const heroFrame=document.querySelector(".hero-frame");

window.addEventListener("mousemove",(e)=>{

    if(!heroFrame) return;

    let x=(window.innerWidth/2-e.clientX)/40;

    let y=(window.innerHeight/2-e.clientY)/40;

    heroFrame.style.transform=`rotateY(${x}deg) rotateX(${-y}deg)`;

});


/*=========================
PAGE FADE
==========================*/

window.addEventListener("pageshow",()=>{

    body.style.opacity=1;

});

/* ==========================================================
   PART 3
   GALLERY + LIGHTBOX
==========================================================*/

/*=========================
GALLERY IMAGES
==========================*/

const galleryImages = [

"sl-1.jpg",
"sl-2.jpg",
"sl-8.jpeg",
"sl-4.jpg",
"sl-7.jpg",
"sl-5.jpg"

];

const carouselTrack = document.getElementById("carouselTrack");
const carouselDots = document.getElementById("carouselDots");

const carLeft = document.getElementById("carLeft");
const carRight = document.getElementById("carRight");

let currentSlide = 0;


/*=========================
CREATE SLIDES
==========================*/

galleryImages.forEach((img,index)=>{

    const image=document.createElement("img");

    image.src=img;

    image.loading="lazy";

    image.alt="Birthday Photo";

    if(index===0){

        image.classList.add("is-active");

    }

    carouselTrack.appendChild(image);

    image.addEventListener("click",()=>{

        openLightbox(index);

    });


    const dot=document.createElement("span");

    if(index===0){

        dot.classList.add("is-active");

    }

    dot.addEventListener("click",()=>{

        currentSlide=index;

        updateCarousel();

    });

    carouselDots.appendChild(dot);

});


const slides=document.querySelectorAll("#carouselTrack img");

const dots=document.querySelectorAll("#carouselDots span");


/*=========================
UPDATE CAROUSEL
==========================*/

function updateCarousel(){

    slides.forEach((slide,index)=>{

        slide.classList.remove("is-active");

        slide.style.display="none";

        if(index===currentSlide){

            slide.classList.add("is-active");

            slide.style.display="block";

        }

    });

    dots.forEach(dot=>{

        dot.classList.remove("is-active");

    });

    dots[currentSlide].classList.add("is-active");

}


/*=========================
NEXT
==========================*/

function nextSlide(){

    currentSlide++;

    if(currentSlide>=galleryImages.length){

        currentSlide=0;

    }

    updateCarousel();

}


/*=========================
PREVIOUS
==========================*/

function prevSlide(){

    currentSlide--;

    if(currentSlide<0){

        currentSlide=galleryImages.length-1;

    }

    updateCarousel();

}


carRight.addEventListener("click",nextSlide);

carLeft.addEventListener("click",prevSlide);


/*=========================
AUTO PLAY
==========================*/

let galleryAuto=setInterval(nextSlide,4000);

carouselTrack.addEventListener("mouseenter",()=>{

    clearInterval(galleryAuto);

});

carouselTrack.addEventListener("mouseleave",()=>{

    galleryAuto=setInterval(nextSlide,4000);

});


/*=========================
KEYBOARD
==========================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight"){

        nextSlide();

    }

    if(e.key==="ArrowLeft"){

        prevSlide();

    }

});


/*=========================
LIGHTBOX
==========================*/

const lightbox=document.getElementById("lightbox");

const lightboxImg=document.getElementById("lightboxImg");

const lightboxClose=document.getElementById("lightboxClose");


function openLightbox(index){

    lightbox.classList.add("is-active");

    lightboxImg.src=galleryImages[index];

}


lightboxClose.addEventListener("click",()=>{

    lightbox.classList.remove("is-active");

});


lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.classList.remove("is-active");

    }

});


document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        lightbox.classList.remove("is-active");

    }

});


/*=========================
MOBILE SWIPE
==========================*/

let startX=0;

carouselTrack.addEventListener("touchstart",(e)=>{

    startX=e.touches[0].clientX;

});


carouselTrack.addEventListener("touchend",(e)=>{

    let endX=e.changedTouches[0].clientX;

    let diff=startX-endX;

    if(diff>50){

        nextSlide();

    }

    if(diff<-50){

        prevSlide();

    }

});


updateCarousel();
