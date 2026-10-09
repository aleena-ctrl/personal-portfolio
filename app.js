// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// ==========================================
// CLOSE MENU AFTER CLICK
// ==========================================

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
  });
});

// ==========================================
// ABOUT SECTION SCROLL REVEAL
// ==========================================

const aboutElements = document.querySelectorAll(
  ".about-visual, .about-content",
);

const aboutObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  },
);

aboutElements.forEach((element) => {
  aboutObserver.observe(element);
});

// =========================================
// EDUCATION & SKILLS ANIMATION
// =========================================

const skillItems = document.querySelectorAll(".skill-item");

const skillObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const skill = entry.target;
      const target = Number(skill.dataset.progress);
      const percentText = skill.querySelector(".skill-percent");

      // Prevent invalid percentages
      if (!Number.isFinite(target) || target < 0 || target > 100) {
        return;
      }

      // Set progress bar width
      skill.style.setProperty("--skill-width", `${target}%`);

      // Start the animation
      skill.classList.add("is-visible");

      // Animate percentage counter
      const duration = 1200;
      const startTime = performance.now();

      function updatePercentage(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth ease-out effect
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(target * easedProgress);

        percentText.textContent = `${currentValue}%`;

        if (progress < 1) {
          requestAnimationFrame(updatePercentage);
        } else {
          percentText.textContent = `${target}%`;
        }
      }

      requestAnimationFrame(updatePercentage);

      // Animate only once
      observer.unobserve(skill);
    });
  },
  {
    threshold: 0.35,
  },
);

skillItems.forEach((skill) => {
  skillObserver.observe(skill);
});
// =========================
// PROJECTS HORIZONTAL SLIDER
// =========================
const projectsSlider = document.getElementById("projectsSlider");
const projectPrev = document.getElementById("projectPrev");
const projectNext = document.getElementById("projectNext");
const sliderProgress = document.getElementById("sliderProgress");

if (projectsSlider && projectPrev && projectNext) {
  function updateProjectSlider() {
    const maxScroll = projectsSlider.scrollWidth - projectsSlider.clientWidth;

    const currentScroll = projectsSlider.scrollLeft;

    // Update progress bar
    if (sliderProgress) {
      const progress = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 100;

      sliderProgress.style.width = `${progress}%`;
    }

    // Disable arrows at the beginning and end
    projectPrev.disabled = currentScroll <= 2;
    projectNext.disabled = currentScroll >= maxScroll - 2;
  }

  function scrollProjects(direction) {
    const firstCard = projectsSlider.querySelector(".project-card");

    if (!firstCard) return;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(projectsSlider).columnGap) || 0;

    projectsSlider.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth",
    });
  }

  projectPrev.addEventListener("click", () => {
    scrollProjects(-1);
  });

  projectNext.addEventListener("click", () => {
    scrollProjects(1);
  });

  projectsSlider.addEventListener("scroll", updateProjectSlider);
  window.addEventListener("resize", updateProjectSlider);

  updateProjectSlider();
}
// =========================
// PROJECTS SCROLL ANIMATION
// =========================

const projectElements = document.querySelectorAll(".reveal-project");

if ("IntersectionObserver" in window) {
  const projectObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  projectElements.forEach((element, index) => {
    element.style.transitionDelay = `${(index % 3) * 100}ms`;
    projectObserver.observe(element);
  });
} else {
  projectElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}
// =========================
// PLACEHOLDER LINKS
// =========================

document.querySelectorAll(".project-placeholder").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
  });
});
document.getElementById("currentYear").textContent = new Date().getFullYear();
