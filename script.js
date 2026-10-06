/* =========================================================
   NANCY BIRTHDAY WEBSITE
   Full Screen / No Scroll / Page Navigation
========================================================= */


/* =========================================================
   PAGE NAVIGATION
========================================================= */

const pages =
    document.querySelectorAll(".page");

let currentPage = 0;

let isTransitioning = false;


/* =========================================================
   INITIAL PAGE
========================================================= */

pages.forEach((page, index) => {

    page.classList.remove(
        "active",
        "previous"
    );

    if (index === 0) {

        page.classList.add(
            "active"
        );

    }

});


/* =========================================================
   GO TO PAGE
========================================================= */

function goToPage(targetId) {

    if (isTransitioning) return;

    const target =
        document.getElementById(
            targetId
        );

    if (!target) return;

    const targetIndex =
        Array.from(pages)
            .indexOf(target);

    if (targetIndex === -1) return;

    if (targetIndex === currentPage) {
        return;
    }


    isTransitioning = true;


    const oldPage =
        pages[currentPage];


    /*
     * Remove active state
     */

    oldPage.classList.remove(
        "active"
    );

    oldPage.classList.add(
        "previous"
    );


    /*
     * Activate new page
     */

    target.classList.remove(
        "previous"
    );

    target.classList.add(
        "active"
    );


    currentPage =
        targetIndex;


    /*
     * Fireworks when entering
     * wishing page.
     */

    if (targetId === "wishing") {

        setTimeout(() => {

            startFireworks();

        }, 300);

    }


    /*
     * Allow another navigation.
     */

    setTimeout(() => {

        isTransitioning = false;

    }, 700);

}


/* =========================================================
   NEXT BUTTONS
========================================================= */

document
    .querySelectorAll("[data-next]")
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                goToPage(
                    button.dataset.next
                );

            }
        );

    });


/* =========================================================
   FIREWORKS
========================================================= */

const fireworks =
    document.getElementById(
        "fireworks"
    );

let fireworksTimer = null;

let fireworksRunning = false;


function createFirework() {

    if (!fireworks) return;


    const wishing =
        document.getElementById(
            "wishing"
        );


    if (
        !wishing ||
        !wishing.classList.contains(
            "active"
        )
    ) {

        return;

    }


    const firework =
        document.createElement(
            "div"
        );


    firework.className =
        "firework";


    /*
     * Keep explosion within
     * the visible screen.
     */

    const x =
        Math.random() * 82 + 9;

    const y =
        Math.random() * 40 + 8;


    firework.style.left =
        `${x}%`;

    firework.style.top =
        `${y}%`;


    fireworks.appendChild(
        firework
    );


    /*
     * Different number of rays
     * makes explosions less artificial.
     */

    const rayCount =
        13 +
        Math.floor(
            Math.random() * 7
        );


    for (
        let i = 0;
        i < rayCount;
        i++
    ) {

        const ray =
            document.createElement(
                "span"
            );


        ray.className =
            "firework-spark";


        const angle =
            (360 / rayCount) * i;


        ray.style.setProperty(
            "--angle",
            `${angle}deg`
        );


        firework.appendChild(
            ray
        );

    }


    /*
     * Remove after animation.
     */

    setTimeout(() => {

        firework.remove();

    }, 1600);

}


function startFireworks() {

    if (fireworksRunning) {
        return;
    }


    fireworksRunning = true;


    /*
     * Opening sequence.
     */

    createFirework();

    setTimeout(
        createFirework,
        250
    );

    setTimeout(
        createFirework,
        650
    );

    setTimeout(
        createFirework,
        1050
    );


    /*
     * Continue gently.
     */

    fireworksTimer =
        setInterval(() => {

            const wishing =
                document.getElementById(
                    "wishing"
                );


            if (
                !wishing ||
                !wishing.classList.contains(
                    "active"
                )
            ) {

                clearInterval(
                    fireworksTimer
                );

                fireworksTimer =
                    null;

                fireworksRunning =
                    false;

                return;

            }


            createFirework();


        }, 1900);

}


/* =========================================================
   GIFT / MAGIC REVEAL
========================================================= */

const giftButton =
    document.getElementById(
        "giftButton"
    );

const giftHint =
    document.getElementById(
        "giftHint"
    );

const sisterReveal =
    document.getElementById(
        "sisterReveal"
    );


if (giftButton) {

    giftButton.addEventListener(
        "click",
        openGift
    );

}


function openGift() {

    if (!giftButton) return;


    giftButton.disabled = true;


    /*
     * Hide present.
     */

    giftButton.style.transform =
        "scale(0) rotate(35deg)";

    giftButton.style.opacity =
        "0";


    if (giftHint) {

        giftHint.style.opacity =
            "0";

    }


    /*
     * Explosion.
     */

    createMagicExplosion();


    /*
     * Reveal floating photos.
     */

    setTimeout(() => {

        if (sisterReveal) {

            sisterReveal.classList.add(
                "show"
            );

        }

    }, 350);

}


/* =========================================================
   MAGIC EXPLOSION
========================================================= */

function createMagicExplosion() {

    const area =
        document.querySelector(
            ".gift-area"
        );

    if (!area) return;


    for (
        let i = 0;
        i < 28;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.textContent =
            Math.random() > .4
                ? "✦"
                : "·";


        particle.style.position =
            "absolute";


        particle.style.left =
            "50%";


        particle.style.top =
            "40%";


        particle.style.zIndex =
            "100";


        particle.style.pointerEvents =
            "none";


        particle.style.color =
            Math.random() > .5
                ? "#ffe4a3"
                : "#ffffff";


        particle.style.fontSize =
            `${7 + Math.random() * 10}px`;


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            55 +
            Math.random() * 100;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        particle.animate(
            [
                {
                    transform:
                        "translate(-50%,-50%) scale(0)",

                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(1.2)
                        rotate(180deg)`,

                    opacity: 0
                }
            ],
            {
                duration:
                    750 +
                    Math.random() * 600,

                easing:
                    "cubic-bezier(.17,.84,.32,1.2)",

                fill:
                    "forwards"
            }
        );


        area.appendChild(
            particle
        );


        setTimeout(() => {

            particle.remove();

        }, 1500);

    }

}


/* =========================================================
   LETTER
========================================================= */

const letterButton =
    document.getElementById(
        "letterButton"
    );

const letterOverlay =
    document.getElementById(
        "letterOverlay"
    );

const closeLetter =
    document.getElementById(
        "closeLetter"
    );


function openLetter() {

    if (!letterOverlay) return;

    letterOverlay.classList.add(
        "open"
    );

}


function closeLetterModal() {

    if (!letterOverlay) return;

    letterOverlay.classList.remove(
        "open"
    );

}


if (letterButton) {

    letterButton.addEventListener(
        "click",
        openLetter
    );

}


if (closeLetter) {

    closeLetter.addEventListener(
        "click",
        closeLetterModal
    );

}


/*
 * Click outside the paper.
 */

if (letterOverlay) {

    letterOverlay.addEventListener(
        "click",
        (event) => {

            if (
                event.target.classList.contains(
                    "letter-backdrop"
                )
            ) {

                closeLetterModal();

            }

        }
    );

}


/*
 * Escape key.
 */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeLetterModal();

        }

    }
);