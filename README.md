# Syam Sundar - Portfolio Website

A modern, glassmorphism-styled portfolio website showcasing my work as a Software Developer.

## Features

- 🎨 **Glassmorphism Design** - Beautiful glass-like UI elements with backdrop blur effects
- 🌙 **Dark Theme** - Modern dark color scheme with gradient accents
- 📱 **Fully Responsive** - Optimized for all device sizes
- ⚡ **Fast Performance** - Built with Vite and React for optimal loading speeds
- 🎭 **Smooth Animations** - Framer Motion animations for engaging user experience
- 🎯 **Production Ready** - Clean code structure and best practices

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **CSS3** - Custom styling with glassmorphism effects

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfoli
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
portfoli/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   └── glass-card.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Customization

### Update Personal Information

1. **Hero Section** (`src/components/Hero.jsx`):
   - Update name, title, and description
   - Modify social media links

2. **About Section** (`src/components/About.jsx`):
   - Update bio and personal information

3. **Skills Section** (`src/components/Skills.jsx`):
   - Add/remove skills and adjust proficiency levels

4. **Projects Section** (`src/components/Projects.jsx`):
   - Replace with your actual projects
   - Update GitHub and demo links

5. **Contact Section** (`src/components/Contact.jsx`):
   - Update contact information
   - Configure form submission handler

### Color Scheme

Modify CSS variables in `src/index.css`:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #ec4899;
  /* ... */
}
```

## License

This project is open source and available under the MIT License.

## Contact

Syam Sundar - Software Developer

- Email: syam@example.com
- GitHub: [@yourusername](https://github.com)
- LinkedIn: [Your Profile](https://linkedin.com)

---

Built with ❤️ using React and Vite

