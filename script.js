document.addEventListener("DOMContentLoaded", () => {

    /*
    ==========================================
    PAGE LOADER
    ==========================================
    */

    document.body.classList.add("loading");

    window.addEventListener("load", () => {

        setTimeout(() => {

            const loader = document.querySelector(".page-loader");

            if (loader) {
                loader.classList.add("hidden");
            }

            document.body.classList.remove("loading");

        }, 500);

    });



    /*
    ==========================================
    SCROLL PROGRESS + HEADER
    ==========================================
    */

    const progress = document.querySelector(".scroll-progress");
    const header = document.querySelector(".site-header");

    function updateScroll() {

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

            if (scrollTop > 30) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        }

    }

    window.addEventListener("scroll", updateScroll, {
        passive: true
    });

    updateScroll();



    /*
    ==========================================
    MOBILE MENU
    ==========================================
    */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileMenu =
        document.querySelector(".mobile-menu");


    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                mobileMenu.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });


        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    mobileMenu.classList.remove("open");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                });

            });

    }



    /*
    ==========================================
    SCROLL REVEAL
    ==========================================
    */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });



    /*
    ==========================================
    FAQ
    ==========================================
    */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");


        question.addEventListener("click", () => {

            const wasActive =
                item.classList.contains("active");


            faqItems.forEach(other => {

                other.classList.remove("active");

                const otherAnswer =
                    other.querySelector(".faq-answer");

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }

            });


            if (!wasActive) {

                item.classList.add("active");

                answer.style.maxHeight =
                    `${answer.scrollHeight}px`;

            }

        });

    });



    /*
    ==========================================
    SERVICE → CONTACT FORM
    ==========================================
    */

    const serviceSelect =
        document.querySelector("#service");


    document
        .querySelectorAll("[data-service]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const service =
                    button.getAttribute("data-service");

                if (serviceSelect && service) {

                    serviceSelect.value = service;

                }

            });

        });



    /*
    ==========================================
    SMOOTH ANCHOR SCROLL
    ==========================================
    */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

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


                const headerOffset = 75;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerOffset;


                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            });

        });



    /*
    ==========================================
    WHATSAPP SMART BUTTONS
    ==========================================
    */

    const whatsappNumber =
        "919310151087";


    const whatsappMessages = {

        "New Website":
            "Hi VELORA.STUDIO, I'm interested in booking a new website.",

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
            "Hi VELORA.STUDIO, I'd like to add animations and interactions to my website.",

        "Website Optimization":
            "Hi VELORA.STUDIO, I'd like to discuss optimizing my website.",

        "Website Maintenance":
            "Hi VELORA.STUDIO, I'd like to discuss website maintenance."

    };


    document
        .querySelectorAll("[data-service]")
        .forEach(button => {

            button.addEventListener("contextmenu", () => {
                // Keeps normal browser behavior.
            });

        });



    /*
    ==========================================
    BOOKING / CONTACT OPTIONS
    ==========================================
    */

    const contactButtons =
        document.querySelectorAll(".button-primary");


    contactButtons.forEach(button => {

        const service =
            button.getAttribute("data-service");


        if (!service) {
            return;
        }


        button.addEventListener("click", () => {

            const select =
                document.querySelector("#service");

            if (select) {
                select.value = service;
            }

        });

    });



    /*
    ==========================================
    CONTACT FORM
    ==========================================
    */

    const form =
        document.querySelector("#project-form");


    if (form) {

        form.addEventListener("submit", event => {

            event.preventDefault();


            const name =
                document.querySelector("#name").value.trim();

            const email =
                document.querySelector("#email").value.trim();

            const service =
                document.querySelector("#service").value;

            const budget =
                document.querySelector("#budget").value;

            const message =
                document.querySelector("#message").value.trim();


            if (!name || !email || !service || !message) {
                return;
            }


            const subject =
                `New VELORA.STUDIO Project Enquiry — ${service}`;


            const body =
`Hello VELORA.STUDIO,

I would like to discuss a website project.

Name:
${name}

Email:
${email}

Service:
${service}

Approximate Budget:
${budget || "Not specified"}

Project Details:
${message}

Thank you.`;


            const mailto =
                `mailto:golobbygamerz@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;


            const success =
                document.querySelector("#form-success");


            if (success) {
                success.classList.add("show");
            }


            window.location.href = mailto;

        });

    }



    /*
    ==========================================
    FLOATING CONTACT
    ==========================================
    */

    const floatingContact =
        document.querySelector(".floating-contact");

    const floatingButton =
        document.querySelector(".floating-contact-button");


    if (floatingContact && floatingButton) {

        floatingButton.addEventListener("click", () => {

            const isOpen =
                floatingContact.classList.toggle("open");


            floatingButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });


        document.addEventListener("click", event => {

            if (
                !floatingContact.contains(event.target)
            ) {

                floatingContact.classList.remove("open");

                floatingButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }



    /*
    ==========================================
    MAGNETIC BUTTONS
    ==========================================
    */

    const magneticButtons =
        document.querySelectorAll(".magnetic");


    if (
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        magneticButtons.forEach(button => {

            button.addEventListener("mousemove", event => {

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
                    `translate(${x * 0.12}px, ${y * 0.12}px)`;

            });


            button.addEventListener("mouseleave", () => {

                button.style.transform = "";

            });

        });

    }



    /*
    ==========================================
    CUSTOM CURSOR
    ==========================================
    */

    const cursorDot =
        document.querySelector(".cursor-dot");

    const cursorRing =
        document.querySelector(".cursor-ring");


    if (
        cursorDot &&
        cursorRing &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let ringX = 0;
        let ringY = 0;


        document.addEventListener("mousemove", event => {

            mouseX = event.clientX;
            mouseY = event.clientY;


            cursorDot.style.left =
                `${mouseX}px`;

            cursorDot.style.top =
                `${mouseY}px`;

        });


        function animateCursor() {

            ringX +=
                (mouseX - ringX) * 0.12;

            ringY +=
                (mouseY - ringY) * 0.12;


            cursorRing.style.left =
                `${ringX}px`;

            cursorRing.style.top =
                `${ringY}px`;


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();


        document
            .querySelectorAll("a, button, .service-card, .project-preview")
            .forEach(element => {

                element.addEventListener("mouseenter", () => {

                    document.body.classList.add(
                        "cursor-hover"
                    );

                });


                element.addEventListener("mouseleave", () => {

                    document.body.classList.remove(
                        "cursor-hover"
                    );

                });

            });

    }



    /*
    ==========================================
    HERO PARALLAX
    ==========================================
    */

    const heroVisual =
        document.querySelector(".hero-visual");


    if (
        heroVisual &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        document.addEventListener("mousemove", event => {

            const x =
                (event.clientX / window.innerWidth - 0.5);

            const y =
                (event.clientY / window.innerHeight - 0.5);


            heroVisual.style.transform =
                `translate(${x * 8}px, ${y * 8}px)`;

        });

    }



    /*
    ==========================================
    ESCAPE KEY
    ==========================================
    */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (mobileMenu) {
                mobileMenu.classList.remove("open");
            }

            if (floatingContact) {
                floatingContact.classList.remove("open");
            }

        }

    });

});