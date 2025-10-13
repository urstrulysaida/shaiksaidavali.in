<script>
/* GSAP registration (Ensure this is run once at the start) */
gsap.registerPlugin(ScrollTrigger);

/* === Base Functionality === */

/* Mobile menu toggle */
const menuBtn = document.getElementById('menuToggle');
menuBtn && menuBtn.addEventListener('click', ()=> {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    // Toggles display property and applies a subtle fade-in effect via GSAP
    if (nav.style.display === 'flex') {
        gsap.to(nav, {opacity: 0, height: 0, duration: 0.3, onComplete: () => {
            nav.style.display = 'none';
            nav.style.height = 'auto'; // Reset height for next open
        }});
    } else {
        nav.style.display = 'flex';
        gsap.fromTo(nav, 
            {opacity: 0, height: 0}, 
            {opacity: 1, height: 'auto', duration: 0.3}
        );
    }
});

/* Smooth scroll for nav links */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
        const target = document.querySelector(a.getAttribute('href'));
        if(!target) return;
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
    });
});

/* Accessibility: reduce motion preference */
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    gsap.globalTimeline.timeScale(3);
}

/* === Initial GSAP Entrance Animations (Including your requested icon animation) === */

// 1. Initial Icon Animation (Your requested code for a staggered icon spin/fade-in)
document.querySelectorAll('.badge i').forEach((icon, i)=>{
    gsap.from(icon, {
        rotation: 180,
        opacity: 0,
        duration: 0.8,
        delay: 0.8 + (0.1 * i), // Added a base delay to run after the main hero intro
        ease: 'power3.out'
    });
});

// 2. Hero Section Entrance
gsap.from('.hero-left', {opacity:0, x:-30, duration:0.8, ease:'power3.out'});
gsap.from('.profile-img', {opacity:0, y:30, duration:0.9, delay:0.1});

// 3. Scroll-Triggered Entrance for Cards, Projects, and Timeline Entries
gsap.utils.toArray('.card, .project, .entry').forEach((el, i)=>{
    gsap.from(el, {
        scrollTrigger:{trigger:el, start:'top 90%'},
        opacity:0, y:18, duration:0.6, delay: i*0.05, ease:'power2.out'
    });
});

/* === Additional GSAP & Dynamic JavaScript Animations === */

// 4. Interactive Mouse Follow Effect for Hero Section (More animated!)
const heroCard = document.querySelector('.hero-card');
const profileImg = document.querySelector('.profile-img');

if (heroCard && profileImg) {
    document.querySelector('.hero').addEventListener('mousemove', (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const xPercent = (e.clientX - centerX) / rect.width;
        const yPercent = (e.clientY - centerY) / rect.height;

        gsap.to(heroCard, {
            rotationX: yPercent * -3,
            rotationY: xPercent * 3,
            scale: 1.005,
            duration: 1,
            ease: 'power1.out',
        });
        
        gsap.to(profileImg, {
            x: xPercent * 10,
            y: yPercent * 10,
            duration: 1,
            ease: 'power1.out',
        });
    });

    // Reset on mouse leave
    document.querySelector('.hero').addEventListener('mouseleave', () => {
        gsap.to([heroCard, profileImg], {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
        });
    });
}


// 5. Dynamic Contact Badge Icon Animation on Click (Micro-interaction)
// When a contact badge is clicked, briefly animate the icon to confirm the action.
document.querySelectorAll('.contact-badges .badge, .cta .badge').forEach(badge => {
    badge.addEventListener('click', (e) => {
        const icon = badge.querySelector('i');
        if (icon) {
            const tl = gsap.timeline({defaults: {ease: 'power2.out'}});

            tl.to(icon, {
                y: -5,
                rotation: 0,
                duration: 0.15,
            })
            .to(icon, {
                y: 0,
                duration: 0.3,
                ease: 'bounce.out'
            })
            .to(icon, {
                rotation: '+=5',
                x: '+=2',
                repeat: 3,
                yoyo: true,
                duration: 0.05
            }, "-=0.2")
            .set(icon, {x: 0, rotation: 0});
        }
    });
});


// 6. Sequential Skill Badge Entrance
// More distinct, staggered entry of the skill badges on scroll.
const skillBadges = gsap.utils.toArray('.skills .skill-img');
if (skillBadges.length > 0) {
    gsap.from(skillBadges, {
        opacity: 0,
        y: 10,
        stagger: 0.1,
        duration: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 85%',
        }
    });
}
</script>
