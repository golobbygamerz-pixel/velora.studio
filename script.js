/* =========================================================
   VELORA.STUDIO
   INTERACTIONS & FUNCTIONALITY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= ELEMENTS ================= */

    const header = document.querySelector(".site-header");
    const progressBar = document.querySelector(".scroll-progress");
    const cursorGlow = document.querySelector(".cursor-glow");

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    const floatingContact = document.querySelector(".floating-contact");
    const floatingButton = document.querySelector(".floating-contact-button");

    const projectForm = document.querySelector("#project-form");
    const serviceSelect = document.querySelector("#service");


    /* ================= SCROLL EFFECTS ================= */

    function handleScroll() {

        const scrollTop = window.scrollY;
        const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        /* Navigation */

        if (scrollTop > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }


        /* Scroll progress */

        if (documentHeight > 0) {

            const progress =
                (scrollTop / documentHeight) * 100;

            progressBar.style.width = `${progress}%`;
        }
    }

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });

    handleScroll();


    /* ================= SCROLL REVEAL ================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* ================= MOBILE MENU ================= */

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");
            mobileMenu.classList.toggle("active");

            const isOpen =
                mobileMenu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            document.body.style.overflow =
                isOpen ? "hidden" : "";
        });


        /* Close menu after clicking a link */

        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    menuToggle.classList.remove("active");
                    mobileMenu.classList.remove("active");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    document.body.style.overflow = "";

                });

            });

    }


    /* ================= FAQ ACCORDION ================= */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");


        question.addEventListener("click", () => {

            const wasActive =
                item.classList.contains("active");


            /* Close all other FAQ items */

            faqItems.forEach(otherItem => {

                otherItem.classList.remove("active");

            });


            /* Toggle current item */

            if (!wasActive) {
                item.classList.add("active");
            }

        });

    });


    /* ================= CURSOR GLOW ================= */

    const finePointer =
        window.matchMedia("(pointer: fine)").matches;


    if (finePointer && cursorGlow) {

        document.addEventListener("mousemove", event => {

            cursorGlow.style.left =
                `${event.clientX}px`;

            cursorGlow.style.top =
                `${event.clientY}px`;

            cursorGlow.style.opacity = "1";

        });

        document.addEventListener("mouseleave", () => {

            cursorGlow.style.opacity = "0";

        });

    }


    /* ================= MAGNETIC BUTTONS ================= */

    if (finePointer) {

        const magneticElements =
            document.querySelectorAll(".magnetic");


        magneticElements.forEach(element => {

            element.addEventListener("mousemove", event => {

                const rect =
                    element.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                element.style.transform =
                    `translate(${x * 0.12}px, ${y * 0.12}px)`;

            });


            element.addEventListener("mouseleave", () => {

                element.style.transform =
                    "translate(0, 0)";

            });

        });

    }


    /* ================= HERO PARALLAX ================= */

    const heroInterface =
        document.querySelector(".hero-interface");


    if (finePointer && heroInterface) {

        document.addEventListener("mousemove", event => {

            const x =
                (event.clientX / window.innerWidth - 0.5);

            const y =
                (event.clientY / window.innerHeight - 0.5);


            heroInterface.style.setProperty(
                "--mouse-x",
                `${x * 18}px`
            );

            heroInterface.style.setProperty(
                "--mouse-y",
                `${y * 18}px`
            );

        });

    }


    /* ================= SERVICE → FORM ================= */

    const serviceButtons =
        document.querySelectorAll("[data-service]");


    serviceButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedService =
                button.getAttribute("data-service");


            if (serviceSelect && selectedService) {

                serviceSelect.value =
                    selectedService;

            }

        });

    });


    /* ================= SMOOTH ANCHOR LINKS ================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");

                if (!targetId || targetId === "#") {
                    return;
                }


                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });


    /* ================= FLOATING CONTACT ================= */

    if (floatingButton && floatingContact) {

        floatingButton.addEventListener("click", () => {

            floatingContact.classList.toggle("open");

        });


        /* Close when clicking outside */

        document.addEventListener("click", event => {

            if (
                !floatingContact.contains(event.target)
            ) {

                floatingContact.classList.remove("open");

            }

        });

    }


    /* ================= PROJECT FORM ================= */

    if (projectForm) {

        projectForm.addEventListener("submit", event => {

            event.preventDefault();


            const formData =
                new FormData(projectForm);


            const name =
                formData.get("name")?.trim() || "";

            const business =
                formData.get("business")?.trim() || "";

            const email =
                formData.get("email")?.trim() || "";

            const phone =
                formData.get("phone")?.trim() || "";

            const website =
                formData.get("website")?.trim() || "";

            const service =
                formData.get("service") || "Not specified";

            const budget =
                formData.get("budget") || "Not specified";

            const details =
                formData.get("details")?.trim() || "";


            /* Basic validation */

            if (!name || !email || !details) {

                alert(
                    "Please fill in your name, email, and project details."
                );

                return;

            }


            /* Email subject */

            const subject =
                encodeURIComponent(
                    `New Velora Studio Project Inquiry — ${name}`
                );


            /* Email body */

            const body =
                encodeURIComponent(
`Hello Velora Studio,

I'd like to discuss a website project.

NAME
${name}

BUSINESS / BRAND
${business || "Not provided"}

EMAIL
${email}

PHONE
${phone || "Not provided"}

CURRENT WEBSITE
${website || "Not provided"}

SERVICE
${service}

BUDGET
${budget}

PROJECT DETAILS
${details}

Looking forward to discussing the project.

Regards,
${name}`
                );


            /*
             * Frontend-only submission:
             * Opens the visitor's email client.
             */

            window.location.href =
                `mailto:golobbygamerz@gmail.com?subject=${subject}&body=${body}`;


            /* Visual confirmation */

            const submitButton =
                projectForm.querySelector(".form-submit");


            if (submitButton) {

                const originalText =
                    submitButton.innerHTML;


                submitButton.innerHTML =
                    "Opening Email Client ✓";


                setTimeout(() => {

                    submitButton.innerHTML =
                        originalText;

                }, 3000);

            }

        });

    }


    /* ================= ESC KEY ================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            mobileMenu?.classList.remove("active");
            menuToggle?.classList.remove("active");
            floatingContact?.classList.remove("open");

            document.body.style.overflow = "";

        }

    });


    /* ================= INITIAL STATE ================= */

    document
        .querySelectorAll(".reveal")
        .forEach(element => {

            /*
             * Elements already visible on initial load
             * should animate in naturally.
             */

            const rect =
                element.getBoundingClientRect();

            if (rect.top < window.innerHeight * 0.9) {

                element.classList.add("visible");

            }

        });


    console.log(
        "VELORA.STUDIO — Digital experience initialized."
    );

});