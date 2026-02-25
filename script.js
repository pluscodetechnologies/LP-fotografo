document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.getElementById("nav-menu");

  if (mobileMenu) {
    mobileMenu.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });
  }

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      mobileMenu.classList.remove("active");
    });
  });

  const fadeElements = document.querySelectorAll(".fade-in");

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -50px 0px" },
  );

  fadeElements.forEach((el) => fadeObserver.observe(el));

  const filtroBotoes = document.querySelectorAll(".filtro-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filtroBotoes.forEach((btn) => {
    btn.addEventListener("click", () => {
      filtroBotoes.forEach((b) => b.classList.remove("ativo"));
      btn.classList.add("ativo");

      const categoria = btn.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        if (
          categoria === "todos" ||
          item.getAttribute("data-categoria") === categoria
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeLightbox = document.querySelector(".lightbox-close");

  portfolioItems.forEach((item) => {
    item.addEventListener("click", function () {
      const img = this.querySelector("img");
      const legend =
        this.querySelector(".portfolio-legend")?.innerText || "Sem legenda";

      lightboxImg.src = img.src;
      lightboxCaption.innerText = legend;
      lightbox.classList.add("active");
    });
  });

  closeLightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      lightbox.classList.remove("active");
    }
  });

  const slider = document.getElementById("slider");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  const dotsContainer = document.getElementById("sliderDots");

  let currentIndex = 0;
  const totalSlides = slides.length;

  function createDots() {
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.dataset.index = i;
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
    updateDots();
  }

  function updateDots() {
    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    goToSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(currentIndex);
  }

  if (slides.length > 0) {
    createDots();
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    let slideInterval = setInterval(nextSlide, 5000);

    [prevBtn, nextBtn, ...document.querySelectorAll(".dot")].forEach((el) => {
      el.addEventListener("click", () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
      });
    });
  }

  const formContato = document.getElementById("formContato");
  const formMessage = document.getElementById("formMessage");

  formContato.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (nome === "" || email === "" || mensagem === "") {
      formMessage.textContent = "Por favor, preencha todos os campos.";
      formMessage.style.color = "#e6b17e";
      return;
    }

    if (!isValidEmail(email)) {
      formMessage.textContent = "Por favor, insira um e-mail válido.";
      formMessage.style.color = "#e6b17e";
      return;
    }

    formMessage.textContent =
      "Mensagem enviada com sucesso! Em breve entrarei em contato.";
    formMessage.style.color = "#d4af37";
    formContato.reset();
  });

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero");
    if (hero) {
      const scrolled = window.scrollY;
      hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
  });
});
