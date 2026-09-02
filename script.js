document.addEventListener("DOMContentLoaded", () => {


    /* ==========================================
       PAGE LOADER
    ========================================== */

    document.body.classList.add("loading");

    const loader =
        document.querySelector(".page-loader");


    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {
                loader.classList.add("hidden");
            }

            document.body.classList.remove("loading");

        }, 700);

    });


    /* ==========================================
       SCROLL PROGRESS + HEADER
    ========================================== */

    const progress =
        document.querySelector(".scroll-progress");

    const header =
        document.querySelector(".site-header");


    function updateScroll() {

        const scrollTop =
            window.scrollY;

        const pageHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const percentage =
            pageHeight > 0
                ? (scrollTop / pageHeight) * 100
                : 0;


        if (progress) {

            progress.style.width =
                `${percentage}%`;

        }


        if (header) {

            header.classList.toggle(
                "scrolled",
                scrollTop > 30
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateScroll,
        { passive: true }
    );


    updateScroll();


    /* ==========================================
       MOBILE MENU
    ========================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileMenu =
        document.querySelector(".mobile-menu");


    if (
        menuToggle &&
        mobileMenu
    ) {

        menuToggle.addEventListener(
            "click",
            () => {

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
                    () => {

                        mobileMenu.classList.remove(
                            "open"
                        );

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            });

    }


    /* ==========================================
       SCROLL REVEAL
    ========================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

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
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element => {
                revealObserver.observe(element);
            }
        );

    } else {

        revealElements.forEach(
            element => {
                element.classList.add("visible");
            }
        );

    }


    /* ==========================================
       FAQ
    ========================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(item => {

        const question =
            item.querySelector(
                ".faq-question"
            );

        const answer =
            item.querySelector(
                ".faq-answer"
            );


        if (
            !question ||
            !answer
        ) {
            return;
        }


        question.addEventListener(
            "click",
            () => {

                const wasActive =
                    item.classList.contains(
                        "active"
                    );


                faqItems.forEach(
                    other => {

                        other.classList.remove(
                            "active"
                        );


                        const otherQuestion =
                            other.querySelector(
                                ".faq-question"
                            );


                        const otherAnswer =
                            other.querySelector(
                                ".faq-answer"
                            );


                        if (otherAnswer) {

                            otherAnswer.style.maxHeight =
                                null;

                        }


                        if (otherQuestion) {

                            otherQuestion.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }

                    }
                );


                if (!wasActive) {

                    item.classList.add(
                        "active"
                    );


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


    /* ==========================================
       SMOOTH ANCHOR SCROLL
    ========================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


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
                        window.innerWidth <= 760
                            ? 65
                            : 80;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerOffset;


                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }
            );

        });


    /* ==========================================
       BEFORE / AFTER SLIDER
    ========================================== */

    const comparisonFrame =
        document.querySelector(
            ".comparison-frame"
        );

    const comparisonAfter =
        document.querySelector(
            "#comparisonAfter"
        );

    const comparisonHandle =
        document.querySelector(
            "#comparisonHandle"
        );


    if (
        comparisonFrame &&
        comparisonAfter &&
        comparisonHandle
    ) {

        let dragging = false;


        function setSlider(percentage) {

            percentage =
                Math.max(
                    5,
                    Math.min(
                        95,
                        percentage
                    )
                );


            comparisonAfter.style.width =
                `${percentage}%`;


            comparisonHandle.style.left =
                `${percentage}%`;


            comparisonHandle.setAttribute(
                "aria-valuenow",
                Math.round(percentage)
            );


            /*
            Keep the AFTER website at the
            full comparison width instead
            of shrinking the iframe.
            */

            comparisonFrame.style
                .setProperty(
                    "--comparison-width",
                    `${comparisonFrame.clientWidth}px`
                );

        }


        function setSliderFromPointer(
            clientX
        ) {

            const rect =
                comparisonFrame
                    .getBoundingClientRect();


            const percentage =
                (
                    (clientX - rect.left) /
                    rect.width
                ) * 100;


            setSlider(percentage);

        }


        comparisonHandle.addEventListener(
            "pointerdown",
            event => {

                dragging = true;


                comparisonHandle.setPointerCapture(
                    event.pointerId
                );


                setSliderFromPointer(
                    event.clientX
                );

            }
        );


        comparisonFrame.addEventListener(
            "pointermove",
            event => {

                if (!dragging) {
                    return;
                }


                setSliderFromPointer(
                    event.clientX
                );

            }
        );


        comparisonHandle.addEventListener(
            "pointerup",
            () => {

                dragging = false;

            }
        );


        comparisonHandle.addEventListener(
            "pointercancel",
            () => {

                dragging = false;

            }
        );


        comparisonHandle.addEventListener(
            "keydown",
            event => {

                const current =
                    Number(
                        comparisonHandle
                            .getAttribute(
                                "aria-valuenow"
                            )
                    ) || 50;


                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    event.preventDefault();

                    setSlider(
                        current - 5
                    );

                }


                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    event.preventDefault();

                    setSlider(
                        current + 5
                    );

                }

            }
        );


        window.addEventListener(
            "resize",
            () => {

                comparisonFrame.style
                    .setProperty(
                        "--comparison-width",
                        `${comparisonFrame.clientWidth}px`
                    );

            }
        );


        setSlider(50);

    }


    /* ==========================================
       CONTACT FORM → WHATSAPP
    ========================================== */

    const form =
        document.querySelector(
            "#project-form"
        );


    if (form) {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.querySelector(
                        "#name"
                    )?.value.trim();


                const email =
                    document.querySelector(
                        "#email"
                    )?.value.trim();


                const service =
                    document.querySelector(
                        "#service"
                    )?.value;


                const budget =
                    document.querySelector(
                        "#budget"
                    )?.value;


                const message =
                    document.querySelector(
                        "#message"
                    )?.value.trim();


                if (
                    !name ||
                    !email ||
                    !service ||
                    !message
                ) {

                    form.reportValidity();

                    return;

                }


                const whatsappMessage =
`Hi VELORA.STUDIO 👋

I'd like to discuss a website project.

Name:
${name}

Email:
${email}

Service:
${service}

Approximate Budget:
${budget || "Not specified"}

Project Details:
${message}`;


                const whatsappURL =
                    `https://wa.me/919310151087?text=${encodeURIComponent(
                        whatsappMessage
                    )}`;


                const success =
                    document.querySelector(
                        "#form-success"
                    );


                if (success) {

                    success.classList.add(
                        "show"
                    );

                }


                window.open(
                    whatsappURL,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    }


    /* ==========================================
       FLOATING CONTACT
    ========================================== */

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


    /* ==========================================
       MAGNETIC BUTTONS
    ========================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".magnetic"
        );


    if (
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        magneticButtons.forEach(
            button => {

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
                            `translate(
                                ${x * 0.10}px,
                                ${y * 0.10}px
                            )`;

                    }
                );


                button.addEventListener(
                    "mouseleave",
                    () => {

                        button.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* ==========================================
       CUSTOM CURSOR
    ========================================== */

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
        cursorRing &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let ringX = 0;
        let ringY = 0;


        document.addEventListener(
            "mousemove",
            event => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;


                cursorDot.style.left =
                    `${mouseX}px`;

                cursorDot.style.top =
                    `${mouseY}px`;

            }
        );


        function animateCursor() {

            ringX +=
                (
                    mouseX -
                    ringX
                ) * 0.12;


            ringY +=
                (
                    mouseY -
                    ringY
                ) * 0.12;


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
            .querySelectorAll(
                "a, button, .service-card, .project-preview"
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


    /* ==========================================
       HERO PARALLAX
    ========================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    if (
        heroVisual &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        document.addEventListener(
            "mousemove",
            event => {

                const x =
                    event.clientX /
                    window.innerWidth -
                    0.5;


                const y =
                    event.clientY /
                    window.innerHeight -
                    0.5;


                heroVisual.style.transform =
                    `translate(
                        ${x * 8}px,
                        ${y * 8}px
                    )`;

            }
        );

    }


    /* ==========================================
       ESCAPE KEY
    ========================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) {
                return;
            }


            if (mobileMenu) {

                mobileMenu.classList.remove(
                    "open"
                );

            }


            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }


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