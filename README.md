🔗 Shaik Saida Vali | Cybersecurity & Cloud Portfolio Dashboard

This repository contains the source code for a modern, responsive single-page profile dashboard showcasing the academic history, professional certifications, and technical skills of Shaik Saida Vali, with a specialization in Cybersecurity and Cloud Architecture (GCP/AWS).

The dashboard is designed with a sleek, highly-transparent Glassmorphism style, featuring dynamic content views and a real-time search utility.

✨ Features

Responsive Design: Fully adaptive layout for mobile, tablet, and desktop viewing.

Glassmorphism UI: Modern, blurred-glass effect over a custom background image, enhancing the visual appeal.

Theme Toggle: Supports seamless switching between Light and Dark mode, with local storage persistence for user preference.

Animated Tab Navigation: Smooth transitions between core sections:

👤 Personal Info

🎓 Education (Kakinada Institute of Engineering & Technology)

🔗 Career & Links (Certifications, Internships, Social Media)

Global Search: Real-time keyword search functionality that highlights matches across all content areas and automatically switches to the relevant tab.

Certificate Links: Direct links to proofs and certificates for all listed academic and professional accomplishments.

🛠️ Tech Stack

This project utilizes a minimal and modern set of web technologies, all contained within a single HTML file:

HTML5: Structure and Semantics.

Tailwind CSS (CDN): Utility-first styling for rapid, responsive design.

Custom CSS: Implements the Glassmorphism effects, variable-based theming, and custom entrance animations (fadeInUp, slideInLeft).

Vanilla JavaScript: Powers the tab switching logic, theme toggle, and the advanced search/highlighting feature using XPath and Regular Expressions.

Font: Google Font Josefin Sans for a contemporary aesthetic.

🚀 Setup and Usage

Since this is a single HTML file with external resource links (Tailwind, Josefin Sans, images), deployment is extremely simple.

Clone the Repository:

git clone [https://github.com/urstrulysaida/shaiksaidavali.in](https://github.com/urstrulysaida/shaiksaidavali.in)
cd shaiksaidavali.in


View the Dashboard:
Simply open the index.html file in any modern web browser.

open index.html
# or
start index.html


Deployment:
The file can be hosted instantly on services like GitHub Pages, Netlify, or Vercel by pushing the index.html file.

🎨 Design Overview

The design is built around a variable-based color palette to handle the theme changes efficiently:

CSS Variable

Default (Light Mode)

Dark Mode

Description

--color-accent

#00a859

#00a859

Primary vibrant green accent.

--color-card-bg

rgba(255, 255, 255, 0.05)

rgba(0, 0, 0, 0.05)

Highly transparent card background.

--color-border

rgba(255, 255, 255, 0.3)

rgba(255, 255, 255, 0.10)

Subtle border for the glass effect.

--bg-image-*

Custom Light Image URL

Custom Dark Image URL

Switches the main background image based on the theme.

The main Glassmorphism effect is achieved through the CSS property:

backdrop-filter: blur(45px);


applied to the main container and content cards, creating a deep, blurred effect over the background image.
