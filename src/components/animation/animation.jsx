import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const wrapCharacters = (text) => {
    return text.split(' ').map((word, index) => {
        const wordWrapped = word.split('').map((char) => {
            return `<span class="char inline-block">${char}</span>`;
        }).join('');
        return `<span class="word inline-block" data-word-index="${index}">${wordWrapped}</span>`;
    }).join(' ');
}


const animateText = (selector, delay) => {
    const header = document.querySelector(selector);
    if (!header) return;
    header.innerHTML = wrapCharacters(header.textContent);
    console.log(header.innerHTML);

    gsap.fromTo(`${selector} .char`, {
        x: 10,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        delay: delay ? delay : 0,
        duration: 0.2,
        stagger: 0.05,
        scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'restart none none reverse'
        }
    })
}

const slideUpAnimation = (selector, delay) => {
    gsap.fromTo(selector, {
        y: 40,
        filter: 'blur(3px)',
        opacity: 0
    }, {
        y: 0,
        filter: 'blur(0px)',
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        delay: delay ? delay : 0,
        scrollTrigger: {
            trigger: selector,
            start: 'top 80%',
            toggleActions: 'restart none none reverse'
        }
    })
}

const slideDownAnimation = (selector, delay) => {
    gsap.fromTo(selector, {
        y: "-40",
        filter: 'blur(3px)',
        opacity: 0
    }, {
        y: "0",
        filter: 'blur(0px)',
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        delay: delay ? delay : 0,
        scrollTrigger: {
            trigger: selector,
            start: 'top 80%',
            toggleActions: 'restart none none reverse'
        }
    })
}

const headerAnimation = (selector, delay) => {
    const elements = gsap.utils.toArray(selector);
    if (elements.length === 0) return;
    elements.forEach((element) => {
        gsap.fromTo(element, {
            y: "-100%",
            opacity: 0
        }, {
            y: "0",
            opacity: 1,
            duration: 2,
            delay: delay ? delay : 0,
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'restart none none reverse'
            }
        })
    })
}

const zoomOutAnimation = (selector, delay) => {
    gsap.fromTo(selector, {
        scale: 1.2,
        filter: 'blur(3px)',
    }, {
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.5,
        delay: delay ? delay : 0,
        scrollTrigger: {
            trigger: selector,
            start: 'top 80%',
            scrub: true,
            toggleActions: 'restart none none reverse'
        }
    })
}

const swipeLeftAnimation = (selector, delay) => {
    gsap.fromTo(selector, {
        x: -100,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        delay: delay ? delay : 0,
        scrollTrigger: {
            trigger: selector,
            start: 'top 80%',
            toggleActions: 'restart none none reverse'
        }
    })
}
const swipeRightAnimation = (selector, delay) => {
    gsap.fromTo(selector, {
        x: 100,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        delay: delay ? delay : 0,
        scrollTrigger: {
            trigger: selector,
            start: 'top 80%',
            toggleActions: 'restart none none reverse'
        }
    })
}

const Animation = ({ children }) => {
    useEffect(() => {
        slideUpAnimation('.hero_header', 0.5);

        headerAnimation('.hero-title-prefix', 0.5);
        animateText('.hero-title', 0.5);
        slideUpAnimation('.hero-desc', 0.5);
        slideUpAnimation('.hero-action-btn.first', 1.5);
        slideUpAnimation('.hero-action-btn.second', 2);

        slideUpAnimation('.ritual-sec', 0.5);
        headerAnimation('.ritual-title-prefix', 0.5);
        slideUpAnimation('.ritual-heading', 0.5);
        slideDownAnimation('.ritual-heading .inner-img', 0.3);

        slideDownAnimation('.about_img', 0.5);
        headerAnimation('.about_title_prefix', 0.5);
        animateText('.about-title', 0.5);
        slideUpAnimation('.about-desc', 0.5);
        slideUpAnimation('.about-action-btn', 0.5);
        swipeLeftAnimation('.about-img1', 0.5);
        swipeRightAnimation('.about-img2', 0.5);

        slideUpAnimation('.product-card', 0.5);
        slideDownAnimation('.product-title', 0.5);
        slideUpAnimation('.product-desc', 0.3);
        slideUpAnimation('.product-action-btn', 0.5);
        zoomOutAnimation('.product-img', 0.5);

        slideUpAnimation('.service-card', 0.5);

        headerAnimation('.collection-title-prefix', 0.5);
        animateText('.collection_title1', 0.5);
        animateText('.collection_title2', 0.5);
        animateText('.collection_title3', 0.5);
        animateText('.collection_title4', 0.5);

        slideUpAnimation('.testimonial-sec', 0.5);
        slideUpAnimation('.quote-img', 0.5);
        slideUpAnimation('.review-desc', 0.5);
        slideUpAnimation('.profile-img', 0.5);
        slideUpAnimation('.user-name', 0.5);

        animateText('.team-title', 0.5);
        slideUpAnimation('.team-desc', 0.5);
        slideUpAnimation('.team-card', 0.5);

        animateText('.skincare-title', 0.5);
        slideUpAnimation('.video-card', 0.5);

        slideUpAnimation('.showcase-sec', 0.5);
        animateText('.showcase-title', 0.5);
        slideUpAnimation('.showcase-desc', 0.5);
        slideUpAnimation('.showcase-action-btn', 0.5);

        animateText('.arrival-title', 0.5);
        slideUpAnimation('.arrival-card', 0.5);
        slideDownAnimation('.arrival-item-title', 0.5);
        slideUpAnimation('.arrival-item-desc', 0.5);
        slideUpAnimation('.arrival-item-btn', 0.5);

        slideUpAnimation('.benefit-card', 0.5);
        slideDownAnimation('.benefit-img', 0.5);
        slideUpAnimation('.benefit-title', 0.5);
        slideUpAnimation('.benefit-desc', 0.5);

        slideUpAnimation('.newsletter-sec', 0.5);
        animateText('.newsletter-title', 0.5);
        slideUpAnimation('.newsletter-desc', 0.5);
        slideUpAnimation('.newsletter-input', 0.5);

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }
    }, [])
    return (
        <>
            {children}
        </>
    )
}

export default Animation

