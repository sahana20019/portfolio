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
