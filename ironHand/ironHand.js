// Mobile Navbar
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  const isExpanded = navLinks.classList.contains("active");
});

// Close menu when clicking nav link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  });
});
// Animation for testimonial section
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  if (!animatedElements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  animatedElements.forEach((el) => observer.observe(el));
});

// Scroll to top button
const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add("visible");
  } else {
    scrollToTopBtn.classList.remove("visible");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//Form submission handler
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    //Simple validation
    if (name && email && message) {
      //Show success message
      formMessage.textContent = `Thank you ${name}! We've received your request and will contact you at ${email} shortly.`;
      formMessage.className = `form-message success`;

      //Reset form
      contactForm.reset();

      //Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = "none";
        formMessage.className = "form-message";
      }, 5000);
    } else {
      //Show error message
      formMessage.textContent = `Please fill out fields before submitting.`;
      formMessage.className = `form-message error`;

      setTimeout(() => {
        formMessage.style.display = "none";
        formMessage.className = "form-message";
      }, 5000);
    }
  });
}

// Activate navigation link highlighting
const sections = document.querySelectorAll("section[id]");
const navLinksArray = document.querySelectorAll('.nav-links a[href^="#"]');

function highlightActiveSection() {
  const scrollPosition = window.pageYOffset + 150;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinksArray.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", highlightActiveSection);
window.addEventListener("load", highlightActiveSection);

// Smooth Page Transition
document.querySelectorAll("a").forEach((link) => {
  // Only apply to internal links (not anchors or external)
  if (
    link.hostname === window.location.hostname &&
    !link.getAttribute("href").startsWith("#")
  ) {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if it's the current page
      if (href && href !== window.location.pathname && href !== "#") {
        e.preventDefault();
        document.body.classList.add("page-exit");

        setTimeout(() => {
          window.location.href = href;
        }, 200);
      }
    });
  }
});
