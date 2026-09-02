document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* ==========================================
       BASIC HELPERS
    ========================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const finePointer = window.matchMedia(
        "(pointer: fine)"
    ).matches;


    /* ==========================================
       PAGE LOADER
    ========================================== */

    document.body.classList.add("loading");

    const hideLoader = () => {

        const loader = $(".page-loader");

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
            () => setTimeout(hideLoader, 350),
            { once: true }
        );

    }


    /* ==========================================
       SCROLL PROGRESS + HEADER
    ========================================== */

    const progress = $(".scroll-progress");
    const header = $(".site-header");

    const updateScrollUI = () => {

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

    };

    window.addEventListener(
        "scroll",
        updateScrollUI,
        { passive: true }
    );

    updateScrollUI();


    /* ==========================================
       MOBILE MENU
    ========================================== */

    const menuToggle = $(".menu-toggle");
    const mobileMenu = $(".mobile-menu");

    const closeMobileMenu = () => {

        if (!menuToggle || !mobileMenu) {
            return;
        }

        mobileMenu.classList.remove("open");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    };

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener(
            "click",
            () => {

                const open =
                    mobileMenu.classList.toggle("open");

                menuToggle.classList.toggle(
                    "active",
                    open
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    String(open)
                );

            }
        );

        $$(".mobile-menu a", mobileMenu)
            .forEach(link => {

                link.addEventListener(
                    "click",
                    closeMobileMenu
                );

            });

    }


    /* ==========================================
       SCROLL REVEAL
    ========================================== */

    const revealElements = $$(".reveal");

    if (
        !reducedMotion &&
        "IntersectionObserver" in window
    ) {

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
                    threshold: 0.08,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* ==========================================
       FAQ
    ========================================== */

    const faqItems = $$(".faq-item");

    const closeFaq = item => {

        item.classList.remove("active");

        const question =
            $(".faq-question", item);

        const answer =
            $(".faq-answer", item);

        if (question) {
            question.setAttribute(
                "aria-expanded",
                "false"
            );
        }

        if (answer) {
            answer.style.maxHeight = null;
        }

    };

    const openFaq = item => {

        item.classList.add("active");

        const question =
            $(".faq-question", item);

        const answer =
            $(".faq-answer", item);

        if (question) {
            question.setAttribute(
                "aria-expanded",
                "true"
            );
        }

        if (answer) {
            answer.style.maxHeight =
                `${answer.scrollHeight}px`;
        }

    };

    faqItems.forEach(item => {

        const question =
            $(".faq-question", item);

        if (!question) {
            return;
        }

        question.addEventListener(
            "click",
            () => {

                const active =
                    item.classList.contains("active");

                faqItems.forEach(other => {

                    if (other !== item) {
                        closeFaq(other);
                    }

                });

                if (active) {
                    closeFaq(item);
                } else {
                    openFaq(item);
                }

            }
        );

    });

    window.addEventListener(
        "resize",
        () => {

            const activeItem =
                $(".faq-item.active");

            if (!activeItem) {
                return;
            }

            const answer =
                $(".faq-answer", activeItem);

            if (answer) {
                answer.style.maxHeight =
                    `${answer.scrollHeight}px`;
            }

        },
        { passive: true }
    );


    /* ==========================================
       WHATSAPP
    ========================================== */

    const whatsappNumber =
        "919310151087";

    const whatsappMessages = {

        "New Website":
            "Hi VELORA.STUDIO, I'd like to book a website project.",

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
            "Hi VELORA.STUDIO, I'd like to discuss animations and interactions.",

        "Website Optimization":
            "Hi VELORA.STUDIO, I'd like to discuss website optimization.",

        "Website Maintenance":
            "Hi VELORA.STUDIO, I'd like to discuss website maintenance."

    };


    const createWhatsAppURL = (
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

        return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(finalMessage)}`;

    };


    const openWhatsApp = (
        service = "New Website",
        extraMessage = ""
    ) => {

        const url =
            createWhatsAppURL(
                service,
                extraMessage
            );

        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );

    };


    /* ==========================================
       SERVICE BUTTONS
    ========================================== */

    $$("[data-service]").forEach(button => {

        button.addEventListener(
            "click",
            event => {

                const service =
                    button.getAttribute(
                        "data-service"
                    );

                if (!service) {
                    return;
                }

                event.preventDefault();

                openWhatsApp(service);

            }
        );

    });


    /* ==========================================
       CONTACT FORM
    ========================================== */

    const form = $("#project-form");

    const formSuccess = $("#form-success");

    const emailProject = $("#email-project");

    const nameInput = $("#name");
    const emailInput = $("#email");
    const serviceSelect = $("#service");
    const budgetSelect = $("#budget");
    const messageInput = $("#message");


    const getFormData = () => {

        return {

            name:
                nameInput?.value.trim() || "",

            email:
                emailInput?.value.trim() || "",

            service:
                serviceSelect?.value || "",

            budget:
                budgetSelect?.value || "",

            message:
                messageInput?.value.trim() || ""

        };

    };


    const buildProjectMessage = data => {

        return [
            `Name: ${data.name}`,
            `Email: ${data.email}`,
            `Service: ${data.service}`,
            `Approximate Budget: ${data.budget || "Not specified"}`,
            "",
            "Project Details:",
            data.message
        ].join("\n");

    };


    if (form) {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                if (!form.checkValidity()) {

                    form.reportValidity();

                    return;

                }

                const data =
                    getFormData();

                const details =
                    buildProjectMessage(data);

                if (formSuccess) {

                    formSuccess.textContent =
                        "WhatsApp is opening with your project enquiry.";

                    formSuccess.classList.add("show");

                }

                openWhatsApp(
                    data.service || "New Website",
                    details
                );

            }
        );

    }


    /* ==========================================
       EMAIL ENQUIRY
    ========================================== */

    if (emailProject) {

        emailProject.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const data =
                    getFormData();

                const service =
                    data.service || "Website Project";

                const subject =
                    `VELORA.STUDIO Project Enquiry — ${service}`;

                const body = [
                    "Hello VELORA.STUDIO,",
                    "",
                    "I'd like to discuss a website project.",
                    "",
                    `Name: ${data.name || "Not provided"}`,
                    `Email: ${data.email || "Not provided"}`,
                    `Service: ${data.service || "Not specified"}`,
                    `Approximate Budget: ${data.budget || "Not specified"}`,
                    "",
                    "Project Details:",
                    data.message || "I'd like to discuss my website project."
                ].join("\n");

                window.location.href =
                    `mailto:golobbygamerz@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            }
        );

    }


    /* ==========================================
       BEFORE / AFTER SLIDER
    ========================================== */

    const comparison =
        $("[data-before-after]");

    if (comparison) {

        const stage =
            $(".before-after-stage", comparison);

        const handle =
            $(".comparison-handle", stage);

        const afterPane =
            $(".comparison-after", stage);

        if (stage && handle && afterPane) {

            let dragging = false;

            const clamp = (
                value,
                min,
                max
            ) => Math.min(
                Math.max(value, min),
                max
            );


            const setPosition = percentage => {

                const value =
                    clamp(
                        Number(percentage),
                        0,
                        100
                    );

                stage.style.setProperty(
                    "--split",
                    `${value}%`
                );

                afterPane.style.clipPath =
                    `inset(0 0 0 ${value}%)`;

                handle.style.left =
                    `${value}%`;

                stage.setAttribute(
                    "aria-valuenow",
                    String(Math.round(value))
                );

            };


            const updateFromPointer =
                clientX => {

                    const rect =
                        stage.getBoundingClientRect();

                    if (!rect.width) {
                        return;
                    }

                    const percentage =
                        ((clientX - rect.left) /
                            rect.width) *
                        100;

                    setPosition(percentage);

                };


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


            const startDrag = event => {

                dragging = true;

                stage.setPointerCapture?.(
                    event.pointerId
                );

                updateFromPointer(
                    event.clientX
                );

            };


            const drag = event => {

                if (!dragging) {
                    return;
                }

                updateFromPointer(
                    event.clientX
                );

            };


            const stopDrag = event => {

                dragging = false;

                try {

                    stage.releasePointerCapture?.(
                        event.pointerId
                    );

                } catch (error) {
                    // Pointer may already have been released.
                }

            };


            stage.addEventListener(
                "pointerdown",
                startDrag
            );

            stage.addEventListener(
                "pointermove",
                drag
            );

            stage.addEventListener(
                "pointerup",
                stopDrag
            );

            stage.addEventListener(
                "pointercancel",
                stopDrag
            );

            stage.addEventListener(
                "lostpointercapture",
                () => {
                    dragging = false;
                }
            );


            stage.addEventListener(
                "keydown",
                event => {

                    const current =
                        Number(
                            stage.getAttribute(
                                "aria-valuenow"
                            )
                        ) || 50;

                    if (
                        event.key === "ArrowLeft" ||
                        event.key === "ArrowRight"
                    ) {

                        event.preventDefault();

                        const direction =
                            event.key === "ArrowLeft"
                                ? -5
                                : 5;

                        setPosition(
                            current + direction
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


    /* ==========================================
       FLOATING CONTACT
    ========================================== */

    const floatingContact =
        $(".floating-contact");

    const floatingButton =
        $(".floating-contact-button");

    if (
        floatingContact &&
        floatingButton
    ) {

        floatingButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const open =
                    floatingContact.classList.toggle(
                        "open"
                    );

                floatingButton.setAttribute(
                    "aria-expanded",
                    String(open)
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


    /* ==========================================
       SMOOTH ANCHOR SCROLL
    ========================================== */

    $$('a[href^="#"]').forEach(link => {

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
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                const headerOffset =
                    window.innerWidth <= 900
                        ? 70
                        : 85;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerOffset;

                window.scrollTo({

                    top: Math.max(
                        targetPosition,
                        0
                    ),

                    behavior:
                        reducedMotion
                            ? "auto"
                            : "smooth"

                });

            }
        );

    });


    /* ==========================================
       MAGNETIC BUTTONS
    ========================================== */

    if (
        finePointer &&
        !reducedMotion
    ) {

        $$(".magnetic").forEach(button => {

            button.addEventListener(
                "pointermove",
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
                "pointerleave",
                () => {

                    button.style.transform = "";

                }
            );

        });

    }


    /* ==========================================
       CUSTOM CURSOR
    ========================================== */

    const cursorDot =
        $(".cursor-dot");

    const cursorRing =
        $(".cursor-ring");

    if (
        finePointer &&
        !reducedMotion &&
        cursorDot &&
        cursorRing
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let ringX = 0;
        let ringY = 0;

        document.addEventListener(
            "pointermove",
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
                (mouseX - ringX) * 0.14;

            ringY +=
                (mouseY - ringY) * 0.14;

            cursorRing.style.left =
                `${ringX}px`;

            cursorRing.style.top =
                `${ringY}px`;

            requestAnimationFrame(
                animateCursor
            );

        };

        animateCursor();


        $$(
            "a, button, .service-card, .project-preview, .before-after-stage"
        ).forEach(element => {

            element.addEventListener(
                "pointerenter",
                () => {

                    document.body.classList.add(
                        "cursor-hover"
                    );

                }
            );


            element.addEventListener(
                "pointerleave",
                () => {

                    document.body.classList.remove(
                        "cursor-hover"
                    );

                }
            );

        });

    }


    /* ==========================================
       HERO PARALLAX
    ========================================== */

    const heroVisual =
        $(".hero-visual");

    if (
        finePointer &&
        !reducedMotion &&
        heroVisual
    ) {

        let frameRequested = false;

        document.addEventListener(
            "pointermove",
            event => {

                if (frameRequested) {
                    return;
                }

                frameRequested = true;

                requestAnimationFrame(
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
                            `translate3d(${x * 7}px, ${y * 7}px, 0)`;

                        frameRequested = false;

                    }
                );

            },
            { passive: true }
        );

    }


    /* ==========================================
       ESCAPE KEY
    ========================================== */

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

                floatingButton?.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

});