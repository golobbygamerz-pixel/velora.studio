document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* =========================================
     BASIC SETTINGS
  ========================================= */

  const WHATSAPP_NUMBER = "919310151087";
  const EMAIL = "golobbygamerz@gmail.com";

  const reducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const finePointer =
    window.matchMedia &&
    window.matchMedia("(pointer: fine)").matches;


  /* =========================================
     PAGE LOADER
  ========================================= */

  document.body.classList.add("loading");

  const hideLoader = () => {
    const loader = document.querySelector(".page-loader");

    if (loader) {
      loader.classList.add("hidden");
    }

    document.body.classList.remove("loading");
  };

  if (document.readyState === "complete") {
    setTimeout(hideLoader, 350);
  } else {
    window.addEventListener(
      "load",
      () => {
        setTimeout(hideLoader, 350);
      },
      { once: true }
    );
  }


  /* =========================================
     SCROLL PROGRESS + HEADER
  ========================================= */

  const progress =
    document.querySelector(".scroll-progress");

  const header =
    document.querySelector(".site-header");

  let scrollTicking = false;

  const updateScroll = () => {

    const scrollTop = window.scrollY;

    const pageHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const percentage =
      pageHeight > 0
        ? (scrollTop / pageHeight) * 100
        : 0;

    if (progress) {
      progress.style.width = `${percentage}%`;
    }

    if (header) {
      header.classList.toggle(
        "scrolled",
        scrollTop > 30
      );
    }

    scrollTicking = false;
  };


  window.addEventListener(
    "scroll",
    () => {

      if (!scrollTicking) {
        window.requestAnimationFrame(updateScroll);
        scrollTicking = true;
      }

    },
    { passive: true }
  );


  updateScroll();


  /* =========================================
     MOBILE MENU
  ========================================= */

  const menuToggle =
    document.querySelector(".menu-toggle");

  const mobileMenu =
    document.querySelector(".mobile-menu");


  const closeMobileMenu = () => {

    if (!mobileMenu || !menuToggle) {
      return;
    }

    mobileMenu.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );
  };


  if (menuToggle && mobileMenu) {

    menuToggle.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();

        const isOpen =
          mobileMenu.classList.toggle("open");

        menuToggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

      }
    );


    mobileMenu
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          closeMobileMenu
        );

      });

  }


  /* =========================================
     SCROLL REVEAL
  ========================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  if (
    reducedMotion ||
    !("IntersectionObserver" in window)
  ) {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  } else {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -30px 0px"
        }
      );


    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  }


  /* =========================================
     FAQ
  ========================================= */

  const faqItems =
    document.querySelectorAll(".faq-item");


  faqItems.forEach(item => {

    const question =
      item.querySelector(".faq-question");

    const answer =
      item.querySelector(".faq-answer");


    if (!question || !answer) {
      return;
    }


    question.addEventListener(
      "click",
      () => {

        const wasActive =
          item.classList.contains("active");


        faqItems.forEach(other => {

          other.classList.remove("active");

          const otherQuestion =
            other.querySelector(".faq-question");

          const otherAnswer =
            other.querySelector(".faq-answer");


          if (otherQuestion) {
            otherQuestion.setAttribute(
              "aria-expanded",
              "false"
            );
          }


          if (otherAnswer) {
            otherAnswer.style.maxHeight = null;
          }

        });


        if (!wasActive) {

          item.classList.add("active");

          question.setAttribute(
            "aria-expanded",
            "true"
          );

          answer.style.maxHeight =
            `${answer.scrollHeight}px`;

        }

      }
    );

  });


  /* =========================================
     WHATSAPP
  ========================================= */

  const whatsappMessages = {

    "New Website":
      "Hi VELORA.STUDIO, I'd like to book a new website project.",

    "Website Design":
      "Hi VELORA.STUDIO, I'd like to discuss website design.",

    "Website Development":
      "Hi VELORA.STUDIO, I'd like to discuss website development.",

    "Website Redesign":
      "Hi VELORA.STUDIO, I'd like to discuss redesigning my website.",

    "Landing Page":
      "Hi VELORA.STUDIO, I'm interested in a landing page.",

    "E-commerce":
      "Hi VELORA.STUDIO, I'd like to discuss an e-commerce website.",

    "UI/UX Design":
      "Hi VELORA.STUDIO, I'd like to discuss UI/UX design.",

    "Animations & Interactions":
      "Hi VELORA.STUDIO, I'd like to discuss animations and interactions for my website.",

    "Website Optimization":
      "Hi VELORA.STUDIO, I'd like to discuss optimizing my website.",

    "Website Maintenance":
      "Hi VELORA.STUDIO, I'd like to discuss website maintenance."

  };


  const openWhatsApp = (
    service = "New Website",
    extraMessage = ""
  ) => {

    const baseMessage =
      whatsappMessages[service] ||
      whatsappMessages["New Website"];


    const finalMessage =
      extraMessage
        ? `${baseMessage}\n\n${extraMessage}`
        : baseMessage;


    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMessage)}`;


    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

  };


  /* =========================================
     SERVICE CTA BUTTONS
  ========================================= */

  document
    .querySelectorAll("[data-service]")
    .forEach(button => {

      button.addEventListener(
        "click",
        event => {

          const service =
            button.getAttribute("data-service");

          if (!service) {
            return;
          }


          event.preventDefault();

          openWhatsApp(service);

        }
      );

    });


  /* =========================================
     CONTACT FORM
  ========================================= */

  const form =
    document.querySelector("#project-form");

  const success =
    document.querySelector("#form-success");


  if (form) {

    form.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }


        const name =
          document
            .querySelector("#name")
            ?.value
            .trim() || "";


        const email =
          document
            .querySelector("#email")
            ?.value
            .trim() || "";


        const service =
          document
            .querySelector("#service")
            ?.value || "";


        const budget =
          document
            .querySelector("#budget")
            ?.value || "Not specified";


        const message =
          document
            .querySelector("#message")
            ?.value
            .trim() || "";


        const projectDetails =
`Name: ${name}
Email: ${email}
Service: ${service}
Approximate Budget: ${budget}

Project Details:
${message}`;


        if (success) {

          success.textContent =
            "Opening WhatsApp with your project enquiry…";

          success.classList.add("show");

        }


        openWhatsApp(
          service || "New Website",
          projectDetails
        );

      }
    );

  }


  /* =========================================
     EMAIL FORM FALLBACK
  ========================================= */

  const emailProject =
    document.querySelector("#email-project");


  if (emailProject && form) {

    emailProject.addEventListener(
      "click",
      event => {

        event.preventDefault();


        const name =
          document
            .querySelector("#name")
            ?.value
            .trim() || "";


        const email =
          document
            .querySelector("#email")
            ?.value
            .trim() || "";


        const service =
          document
            .querySelector("#service")
            ?.value || "Website Project";


        const budget =
          document
            .querySelector("#budget")
            ?.value || "Not specified";


        const message =
          document
            .querySelector("#message")
            ?.value
            .trim() || "";


        const subject =
          `VELORA.STUDIO Project Enquiry — ${service}`;


        const body =
`Hello VELORA.STUDIO,

I'd like to discuss a website project.

Name:
${name}

Email:
${email}

Service:
${service}

Approximate Budget:
${budget}

Project Details:
${message}

Thank you.`;


        window.location.href =
          `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      }
    );

  }


  /* =========================================
     SMOOTH ANCHOR SCROLL
  ========================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute("href");


          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(targetId);


          if (!target) {
            return;
          }


          event.preventDefault();


          const headerHeight =
            header
              ? header.offsetHeight
              : 76;


          const targetTop =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            12;


          window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: reducedMotion
              ? "auto"
              : "smooth"
          });


          closeMobileMenu();

        }
      );

    });


  /* =========================================
     BEFORE / AFTER SLIDER
  ========================================= */

  const comparison =
    document.querySelector("[data-before-after]");


  if (comparison) {

    const stage =
      comparison.querySelector(
        ".before-after-stage"
      );


    if (stage) {

      let dragging = false;


      const setPosition = percentage => {

        const value =
          Math.max(
            0,
            Math.min(100, percentage)
          );


        stage.style.setProperty(
          "--split",
          `${value}%`
        );


        stage.setAttribute(
          "aria-valuenow",
          String(Math.round(value))
        );

      };


      const getPercentage = event => {

        const rect =
          stage.getBoundingClientRect();


        const x =
          event.clientX - rect.left;


        return (
          (x / rect.width) * 100
        );

      };


      const moveSlider = event => {

        if (!dragging) {
          return;
        }


        setPosition(
          getPercentage(event)
        );

      };


      stage.addEventListener(
        "pointerdown",
        event => {

          dragging = true;

          stage.setPointerCapture?.(
            event.pointerId
          );


          setPosition(
            getPercentage(event)
          );

        }
      );


      stage.addEventListener(
        "pointermove",
        moveSlider
      );


      const stopDragging = event => {

        if (!dragging) {
          return;
        }


        dragging = false;

        try {
          stage.releasePointerCapture?.(
            event.pointerId
          );
        } catch (_) {
          // Safe fallback.
        }

      };


      stage.addEventListener(
        "pointerup",
        stopDragging
      );


      stage.addEventListener(
        "pointercancel",
        stopDragging
      );


      stage.addEventListener(
        "pointerleave",
        event => {

          if (
            dragging &&
            event.pointerType !== "touch"
          ) {
            stopDragging(event);
          }

        }
      );


      stage.addEventListener(
        "keydown",
        event => {

          const current =
            parseFloat(
              stage.getAttribute(
                "aria-valuenow"
              ) || "50"
            );


          if (event.key === "ArrowLeft") {

            event.preventDefault();

            setPosition(
              current - 5
            );

          }


          if (event.key === "ArrowRight") {

            event.preventDefault();

            setPosition(
              current + 5
            );

          }


          if (event.key === "Home") {

            event.preventDefault();

            setPosition(0);

          }


          if (event.key === "End") {

            event.preventDefault();

            setPosition(100);

          }

        }
      );


      const resizePreview = () => {

        const width =
          stage.clientWidth;


        const scale =
          Math.min(
            width / 1440,
            1
          );


        stage.style.setProperty(
          "--preview-scale",
          String(scale)
        );

      };


      if ("ResizeObserver" in window) {

        const resizeObserver =
          new ResizeObserver(
            resizePreview
          );

        resizeObserver.observe(stage);

      } else {

        window.addEventListener(
          "resize",
          resizePreview,
          { passive: true }
        );

      }


      setPosition(50);

      resizePreview();

    }

  }


  /* =========================================
     FLOATING CONTACT
  ========================================= */

  const floatingContact =
    document.querySelector(
      ".floating-contact"
    );


  const floatingButton =
    document.querySelector(
      ".floating-contact-button"
    );


  if (
    floatingContact &&
    floatingButton
  ) {

    floatingButton.addEventListener(
      "click",
      event => {

        event.stopPropagation();


        const isOpen =
          floatingContact.classList.toggle(
            "open"
          );


        floatingButton.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

      }
    );


    document.addEventListener(
      "click",
      event => {

        if (
          !floatingContact.contains(
            event.target
          )
        ) {

          floatingContact.classList.remove(
            "open"
          );

          floatingButton.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      }
    );

  }


  /* =========================================
     MAGNETIC BUTTONS
  ========================================= */

  if (
    finePointer &&
    !reducedMotion
  ) {

    document
      .querySelectorAll(".magnetic")
      .forEach(button => {

        button.addEventListener(
          "mousemove",
          event => {

            const rect =
              button.getBoundingClientRect();


            const x =
              event.clientX -
              rect.left -
              rect.width / 2;


            const y =
              event.clientY -
              rect.top -
              rect.height / 2;


            button.style.transform =
              `translate(${x * 0.08}px, ${y * 0.08}px)`;

          }
        );


        button.addEventListener(
          "mouseleave",
          () => {

            button.style.transform = "";

          }
        );

      });

  }


  /* =========================================
     CUSTOM CURSOR
  ========================================= */

  if (
    finePointer &&
    !reducedMotion
  ) {

    const cursorDot =
      document.querySelector(
        ".cursor-dot"
      );


    const cursorRing =
      document.querySelector(
        ".cursor-ring"
      );


    if (
      cursorDot &&
      cursorRing
    ) {

      let mouseX = 0;
      let mouseY = 0;

      let ringX = 0;
      let ringY = 0;


      document.addEventListener(
        "mousemove",
        event => {

          mouseX = event.clientX;
          mouseY = event.clientY;


          cursorDot.style.left =
            `${mouseX}px`;


          cursorDot.style.top =
            `${mouseY}px`;

        },
        { passive: true }
      );


      const animateCursor = () => {

        ringX +=
          (mouseX - ringX) * 0.12;


        ringY +=
          (mouseY - ringY) * 0.12;


        cursorRing.style.left =
          `${ringX}px`;


        cursorRing.style.top =
          `${ringY}px`;


        window.requestAnimationFrame(
          animateCursor
        );

      };


      animateCursor();


      document
        .querySelectorAll(
          "a, button, .service-card, .project-card"
        )
        .forEach(element => {

          element.addEventListener(
            "mouseenter",
            () => {
              document.body.classList.add(
                "cursor-hover"
              );
            }
          );


          element.addEventListener(
            "mouseleave",
            () => {
              document.body.classList.remove(
                "cursor-hover"
              );
            }
          );

        });

    }

  }


  /* =========================================
     HERO PARALLAX
  ========================================= */

  const heroVisual =
    document.querySelector(
      ".hero-visual"
    );


  if (
    heroVisual &&
    finePointer &&
    !reducedMotion
  ) {

    let parallaxFrame = false;


    document.addEventListener(
      "mousemove",
      event => {

        if (parallaxFrame) {
          return;
        }


        parallaxFrame = true;


        window.requestAnimationFrame(
          () => {

            const x =
              event.clientX /
              window.innerWidth -
              0.5;


            const y =
              event.clientY /
              window.innerHeight -
              0.5;


            heroVisual.style.transform =
              `translate3d(${x * 8}px, ${y * 8}px, 0)`;


            parallaxFrame = false;

          }
        );

      },
      { passive: true }
    );

  }


  /* =========================================
     CURRENT YEAR
  ========================================= */

  const year =
    document.querySelector(
      "#current-year"
    );


  if (year) {
    year.textContent =
      new Date().getFullYear();
  }


  /* =========================================
     ESCAPE KEY
  ========================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key !== "Escape") {
        return;
      }


      closeMobileMenu();


      if (floatingContact) {

        floatingContact.classList.remove(
          "open"
        );

      }


      if (floatingButton) {

        floatingButton.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );

});
const aiButton = document.getElementById("veloraAIButton");
const aiWindow = document.getElementById("veloraAIWindow");
const aiClose = document.getElementById("veloraAIClose");
const aiForm = document.getElementById("veloraAIForm");
const aiInput = document.getElementById("veloraAIInput");
const aiMessages = document.getElementById("veloraAIMessages");

aiButton.addEventListener("click", () => {
  aiWindow.classList.add("active");
  aiInput.focus();
});

aiClose.addEventListener("click", () => {
  aiWindow.classList.remove("active");
});

aiForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = aiInput.value.trim();

  if (!text) return;

  addAIMessage(text, "user");
  aiInput.value = "";

  setTimeout(() => {
    addAIMessage(
      "Thanks! I'm ready to help. Our AI backend isn't connected yet, so this is currently the chat interface. In the next step, we'll connect me to the actual AI.",
      "bot"
    );
  }, 600);
});

function addAIMessage(text, type) {
  const message = document.createElement("div");

  message.className = `velora-ai-message ${type}`;
  message.textContent = text;

  aiMessages.appendChild(message);
  aiMessages.scrollTop = aiMessages.scrollHeight;
}