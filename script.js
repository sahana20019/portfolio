<<<<<<< HEAD
/* ================= YEAR ================= */
document.getElementById("year").textContent = new Date().getFullYear();

/* ================= THEME TOGGLE LOGIC ================= */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const body = document.body;

// Check Local Storage or System Preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

/* ================= MOBILE MENU ================= */
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

/* ================= TYPEWRITER EFFECT ================= */
const roles = ["Computer Science Engineering Student", "AI Enthusiast", "Web Developer", "Data Analyst"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 100;
const deleteSpeed = 50;
const pauseTime = 2000;
const typeTarget = document.getElementById("typewriter");

function typeWriter() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typeTarget.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeTarget.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeDelay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
        typeDelay = pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeWriter, typeDelay);
}

// Start typewriter on load
document.addEventListener('DOMContentLoaded', typeWriter);

/* ================= 3D TILT EFFECT FOR CARDS ================= */
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

/* ================= SCROLL TO TOP BUTTON ================= */
const scrollBtn = document.getElementById("scrollTopBtn");

// Listen to scroll on the currently active slide
function updateScrollButton() {
    const active = document.querySelector('.slide.active');
    if (active) {
        if (active.scrollTop > 300) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    }
}

// Add scroll listeners to all slides
document.querySelectorAll('.slide').forEach(slide => {
    slide.addEventListener('scroll', updateScrollButton);
});

function scrollToTop() {
    const active = document.querySelector('.slide.active');
    if (active) {
        active.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/* ================= SLIDE LOGIC ================= */
function switchSlide(slideId) {
    const slides = document.querySelectorAll('.slide');
    const navItems = document.querySelectorAll('.nav-link');
    
    const targetSlide = document.getElementById(slideId);
    const activeSlide = document.querySelector('.slide.active');

    if (targetSlide === activeSlide) {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        return;
    }

    // Close mobile menu
    navLinks.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');

    navItems.forEach(item => {
        item.classList.remove('active');
        if(item.getAttribute('onclick').includes(slideId)) {
            item.classList.add('active');
        }
    });

    // Updated Array Order: Home, Education, Skills, Internship, Achievements, Projects, Certificates, Contact
    const allSlideIds = ['home', 'education', 'skills', 'internship', 'achievements', 'projects', 'certificates', 'contact'];
    const currentIndex = allSlideIds.indexOf(activeSlide.id);
    const targetIndex = allSlideIds.indexOf(slideId);
    const direction = targetIndex > currentIndex ? 'next' : 'prev';

    if (direction === 'next') {
        activeSlide.style.transform = 'translateX(-50px)';
        activeSlide.style.opacity = '0';
        
        targetSlide.style.transform = 'translateX(50px)';
        targetSlide.style.transition = 'none';
        
        void targetSlide.offsetWidth; // Trigger reflow
        
        targetSlide.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        targetSlide.style.transform = 'translateX(0)';
        targetSlide.style.opacity = '1';

    } else {
        activeSlide.style.transform = 'translateX(50px)';
        activeSlide.style.opacity = '0';
        
        targetSlide.style.transform = 'translateX(-50px)';
        targetSlide.style.transition = 'none';
        
        void targetSlide.offsetWidth; // Trigger reflow
        
        targetSlide.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        targetSlide.style.transform = 'translateX(0)';
        targetSlide.style.opacity = '1';
    }

    activeSlide.classList.remove('active');
    targetSlide.classList.add('active');
    targetSlide.scrollTop = 0;

    // Reset scroll top button state
    scrollBtn.style.display = "none";

    // Re-trigger animations
    resetAnimations(targetSlide);
}

function resetAnimations(slide) {
    const animatedElements = slide.querySelectorAll('.animate-up');
    animatedElements.forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight; /* trigger reflow */
        el.style.animation = null; 
    });
}

/* ================= FORM HANDLING ================= */
const form = document.getElementById("contactForm");
const status = document.getElementById("form-status");

if (form) {
    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        status.textContent = "Sending...";
        status.className = "form-status";

        const data = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                status.innerHTML = "✅ Message sent successfully!";
                status.classList.add("success");
                form.reset();
            } else {
                status.innerHTML = "❌ Oops! There was a problem.";
                status.classList.add("error");
            }
        } catch (error) {
            status.innerHTML = "⚠️ Network error.";
            status.classList.add("error");
        }
    });
}
=======
// Current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// Contact form status messages
const form = document.getElementById("contactForm");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "Sending...";

  try {
    let response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      status.textContent = "✅ Message sent!";
      form.reset();
    } else {
      status.textContent = "❌ Error. Try again.";
    }
  } catch (error) {
    status.textContent = "⚠️ Network error.";
  }
});

// Modal logic
const modal = document.getElementById("certificateModal");
const frame = document.getElementById("certificateFrame");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".certificate-link, .internship-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    frame.src = link.getAttribute("href");
    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  frame.src = "";
});

window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
    frame.src = "";
  }
});

// HOMEPAGE SLIDESHOW - All Sections (About, Internship, Education, Achievements, Certificates, Contact, Projects)
(function(){
  const container = document.getElementById('homepage-slideshow');
  if (!container) return;
  let slideIndex = 1;
  let autoTimer = null;
  const slides = container.querySelectorAll('.slide');
  const dots = container.querySelectorAll('.dot');
  function showSlides(n, addFade=true) {
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    slides.forEach((slide,i)=>{
      slide.style.display = 'none';
      slide.classList.remove('active','fade-in');
    });
    dots.forEach(dot=>dot.classList.remove('active'));
    slides[slideIndex-1].style.display = 'block';
    slides[slideIndex-1].classList.add('active');
    dots[slideIndex-1].classList.add('active');
    if (addFade) {
      setTimeout(()=>{
        slides[slideIndex-1].classList.add('fade-in');
        setTimeout(()=>slides[slideIndex-1].classList.remove('fade-in'),690);
      },12);
    }
  }
  function plusSlides(n){ showSlides(slideIndex += n); resetAuto(); }
  function currentSlide(n){ showSlides(slideIndex = n); resetAuto(); }
  window.plusSlides = plusSlides;
  window.currentSlide = currentSlide;
  // Map nav bar to slides (Order: About, Internship, Education, Achievements, Certificates, Contact, Projects)
  const navLinks = document.querySelectorAll('.nav-link');
  const navSlideMap = { '#about':1,'#internship':2,'#education':3,'#achievements':4,'#certificates':5,'#contact':6,'#projects':7 };
  navLinks.forEach(link=>{
    link.addEventListener('click',function(e){
      const idx = navSlideMap[this.getAttribute('href')];
      if(idx) { e.preventDefault(); currentSlide(idx); }
    });
  });
  function startAuto(){
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(()=>showSlides(++slideIndex),6000);
  }
  function resetAuto(){ startAuto(); }
  container.addEventListener('mouseenter',()=>clearInterval(autoTimer));
  container.addEventListener('mouseleave',startAuto);
  document.addEventListener('DOMContentLoaded',()=>showSlides(slideIndex));
  showSlides(slideIndex);
  startAuto();
})();
>>>>>>> 812c557996cf373fefbc288600ca22bde9593954
