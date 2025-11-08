<script>
    document.addEventListener('DOMContentLoaded', () => {
        const navLinks = document.querySelectorAll('.nav-link');
        const contentSections = document.querySelectorAll('.content-section');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const body = document.body;

        // --- Theme Toggle Logic (NEW) ---
        const toggleButtons = [
            { btn: document.getElementById('theme-toggle-desktop'), text: document.getElementById('toggle-text-desktop'), sun: document.getElementById('sun-icon-desktop'), moon: document.getElementById('moon-icon-desktop') },
            { btn: document.getElementById('theme-toggle-mobile'), text: document.getElementById('toggle-text-mobile'), sun: document.getElementById('sun-icon-mobile'), moon: document.getElementById('moon-icon-mobile') }
        ].filter(obj => obj.btn); // Filter out nulls for responsive design

        /**
         * Applies the chosen theme and updates the UI elements.
         * @param {boolean} isLight - True for light mode, false for dark mode.
         */
        const applyTheme = (isLight) => {
            if (isLight) {
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.remove('light-mode');
                localStorage.setItem('theme', 'dark');
            }

            // Update text and icons for all toggles
            toggleButtons.forEach(obj => {
                if (obj.text) {
                    obj.text.textContent = isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';
                }
                if (obj.sun && obj.moon) {
                    obj.sun.classList.toggle('hidden', !isLight);
                    obj.moon.classList.toggle('hidden', isLight);
                }
            });
        };

        // Initialize theme from localStorage or default to system/dark
        const savedTheme = localStorage.getItem('theme');
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

        if (savedTheme === 'light' || (savedTheme === null && prefersLight)) {
            applyTheme(true);
        } else {
            applyTheme(false);
        }

        // Add listeners to toggle buttons
        toggleButtons.forEach(obj => {
            obj.btn.addEventListener('click', () => {
                const isLight = body.classList.contains('light-mode');
                applyTheme(!isLight);
            });
        });
        // -------------------------------------------------------------------


        // --- Intersection Observer Setup for Scroll Animations ---
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.1 // trigger when 10% of item is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Use a short timeout to help stagger animations slightly,
                    // especially for items loaded at the same time.
                    const delay = entry.target.dataset.index * 100 || 0;
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                        // Ensure the initial-hidden styling is quickly transitioned
                        entry.target.style.transform = 'translateY(0) scale(1.0)';
                        entry.target.style.opacity = '1';
                    }, delay);
                    
                    observer.unobserve(entry.target); // Stop observing once it's animated
                }
            });
        }, observerOptions);

        // Give elements a data-index property for minor animation delay staggering
        let indexCounter = 0;
        document.querySelectorAll('.initial-hidden').forEach(el => {
            el.dataset.index = indexCounter++;
            observer.observe(el);
        });
        // ------------------------------------------------------------------------

        /**
         * Sets the 'active' class on the correct navigation link for the current section.
         * @param {string} targetId - The ID of the current active content section.
         */
        const setActiveLink = (targetId) => {
            navLinks.forEach(link => {
                // Finds the closest element for consistent styling (handles desktop <li> and mobile <a>)
                const navItem = link.closest('li')?.querySelector('.nav-link-item') || link;
                
                if (link.getAttribute('data-target') === targetId) {
                    navItem.classList.add('active');
                } else {
                    navItem.classList.remove('active');
                }
            });
        };
        
        /**
         * Triggers the CSS animation for a section's main title.
         * @param {HTMLElement} sectionElement - The active content section element.
         */
        const animateTitles = (sectionElement) => {
            const title = sectionElement.querySelector('.animated-title');
            if (title) {
                // Remove and re-add animation class to force restart (CSS trick)
                title.classList.remove('animated-title');
                void title.offsetWidth; // Force reflow/repaint
                title.classList.add('animated-title');
            }
        };

        /**
         * Switches the display to the target content section with transition.
         * @param {string} targetId - The ID of the section to show.
         */
        const showSection = (targetId) => {
            const currentActive = document.querySelector('.content-section.active');
            
            // 1. Deactivate old section
            if (currentActive) {
                currentActive.classList.remove('active');
                currentActive.style.display = 'none';
                
                // Unobserve all elements in the old section to reset their state
                currentActive.querySelectorAll('.initial-hidden.animate-in').forEach(el => {
                    observer.unobserve(el);
                });
            }

            // 2. Activate new section
            const newSection = document.getElementById(targetId);
            if (newSection) {
                newSection.style.display = 'block';
                newSection.offsetWidth; // Force a reflow/repaint
                newSection.classList.add('active');
                
                // Re-observe elements in the new section, resetting them to initial-hidden state
                newSection.querySelectorAll('.initial-hidden').forEach(el => {
                    el.classList.remove('animate-in'); // Remove previous animation class
                    el.style.transform = ''; // Reset inline styles for opacity/transform
                    el.style.opacity = '';
                    observer.observe(el);
                });

                animateTitles(newSection);
            }

            setActiveLink(targetId);
            // Scroll to top of main content area (important for mobile)
            document.querySelector('main').scrollTo(0, 0);
        };

        // Event listener for navigation clicks
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-target');
                showSection(targetId);
                window.history.pushState(null, '', `#${targetId}`); // Use pushState for cleaner URL history
                
                // Hide mobile menu after clicking a link, and update the button icon
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.innerHTML = '&#9776;'; // Reset to hamburger icon
                }
            });
        });

        // Mobile menu toggle logic
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle between hamburger (&#9776;) and close icon (&#10005;)
            const isHidden = mobileMenu.classList.contains('hidden');
            mobileMenuButton.innerHTML = isHidden ? '&#9776;' : '&#10005;';
        });

        // Initial load based on URL hash or default to 'home'
        const hash = window.location.hash.substring(1);
        const initialSection = hash && document.getElementById(hash) ? hash : 'home';
        showSection(initialSection);
    });
</script>
