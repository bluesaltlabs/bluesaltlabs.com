


// Route Components
import Home from './home';
import About from './about';
import Contact from './contact';
import Blog from './blog';
import Projects from './projects';
import Resume from './resume';
import NoMatch from './noMatch';

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/resume",
    element: <Resume />,
  },
  {
    path: "*",
    element: <NoMatch />,
  }

];
