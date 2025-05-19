# Filmema <img src="public/favicon.svg" alt="Filmema Logo" width="30" />
  
## Overview  
  
Filmema is a comprehensive movie database and discovery platform that allows users to search, explore, and view detailed information about movies. Built with modern web technologies, Filmema provides an intuitive interface for movie enthusiasts to discover new films and explore their favorite content.  
  
## Features  
  
- **Movie Discovery**: Browse through curated collections of movies  
- **Search Functionality**: Find specific movies by title or keywords  
- **Detailed Movie Information**: View comprehensive details about movies including cast, crew, ratings, and more  
- **Internationalization**: Full support for multiple languages (English, Spanish, and Catalan)  
- **Responsive Design**: Optimized viewing experience across all devices  
- **Media Gallery**: Browse through movie images and videos  
- **Upcoming Movies**: Stay updated with upcoming movie releases  
- **Now Playing**: See what's currently showing in theaters  
  
## Technology Stack  
  
Filmema is built using the following technologies:  
  
- **Core**: React 19, TypeScript  
- **State Management**: Redux Toolkit  
- **Routing**: React Router  
- **UI Framework**: Material UI  
- **Styling**: Emotion  
- **Internationalization**: i18next  
- **Media Components**: lite-youtube  
- **Layout**: React Responsive Masonry  
- **Slider**: Swiper  
- **Build Tool**: Vite  
  
## System Architecture  
  
Filmema follows a modern front-end architecture using React with TypeScript, organized into several interconnected systems:  
  
- **Application Entry**: Main entry point that sets up the core application  
- **Routing System**: Handles navigation between different pages  
- **Internationalization**: Manages multiple language support  
- **Panel System**: Provides modal/dialog functionality  
- **Theme System**: Supports theme switching (light/dark modes)  
- **Data Services**: Connects to TMDB API to fetch movie data  
  
## Getting Started  
  
### Prerequisites  
  
- Node.js (latest LTS version recommended)  
- npm or yarn  
  
### Installation  
  
1. Clone the repository  
```bash  
git clone https://github.com/DavidVazquezRivas/Filmema.git  
cd Filmema
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## Available Scripts  
  
- `npm run dev` - Start the development server  
- `npm run build` - Build the application for production  
- `npm run lint` - Run ESLint to check for code issues  
- `npm run preview` - Preview the production build locally

## Data Source  
  
Filmema uses The Movie Database (TMDB) API to fetch movie data. The application transforms this data through adapter functions to match the application's data models.

## Internationalization  
  
Filmema supports multiple languages through the i18next library:  
- English  
- Spanish (fallback language)  
- Catalan  
  
Browser language detection is enabled to automatically select the initial language.

## Accessibility  
  
Filmema implements various accessibility features to ensure the application is usable by everyone:  
- Semantic HTML structure  
- Accessible text components  
- Proper ARIA labels

## License  
  
This project is licensed under the MIT License - see the LICENSE file for details.

## Author  
  
David Vázquez Rivas
