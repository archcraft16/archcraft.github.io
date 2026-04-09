document.addEventListener("DOMContentLoaded", () => {

  // ------------------------------
  // PROJECT LIGHTBOX
  // ------------------------------
  const images = document.querySelectorAll("#projects img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("closeBtn");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  let currentIndex = 0;

  function showImage(index) {
    currentIndex = index;
    lightboxImg.src = images[index].src;
    lightbox.style.display = "flex";
    setTimeout(() => lightbox.classList.add("show"), 10);
  }

  function closeLightbox() {
    lightbox.classList.remove("show");
    setTimeout(() => lightbox.style.display = "none", 300);
  }

  images.forEach((img, i) => {
    img.addEventListener("click", () => showImage(i));
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (nextBtn) nextBtn.addEventListener("click", () => showImage((currentIndex + 1) % images.length));
  if (prevBtn) prevBtn.addEventListener("click", () => showImage((currentIndex - 1 + images.length) % images.length));

  document.addEventListener("keydown", e => {
    if (lightbox.style.display === "flex") {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextBtn.click();
      if (e.key === "ArrowLeft") prevBtn.click();
    }
  });

  // Swipe support
  let startX = 0;
  lightbox.addEventListener("touchstart", e => startX = e.touches[0].clientX);
  lightbox.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextBtn.click();
    if (endX - startX > 50) prevBtn.click();
  });


  // ------------------------------
  // STUDIO HIGHLIGHT COUNTER
  // ------------------------------
  const counters = document.querySelectorAll(".highlight-card .counter");
  counters.forEach(counter => {
    let count = 0;
    const target = +counter.getAttribute("data-target");
    const card = counter.parentElement;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const update = () => {
            const increment = Math.ceil(target / 120);
            count += increment;
            if (count < target) {
              counter.innerText = count + "+";
              requestAnimationFrame(update);
            } else {
              counter.innerText = target + "+";
            }
          };
          update();
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(card);
  });


  // ------------------------------
  // MOBILE NAVBAR (ADDED PROPERLY)
  // ------------------------------
  const toggle = document.getElementById("menu-toggle");
  const menu = document.querySelector(".menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });

    // Close menu when clicking a link
    document.querySelectorAll(".menu a").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("active");
      });
    });
  }

});
