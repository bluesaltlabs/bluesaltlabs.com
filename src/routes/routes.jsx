
import {
  HomeIcon,
  IdentificationIcon,
  ChatBubbleLeftRightIcon,
  NewspaperIcon,
  BriefcaseIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline'


// Route Components
import Home from '../pages/home';
import About from '../pages/about';
import Projects from '../pages/projects';
import Blog from '../pages/blog';
import NoMatch from '../pages/noMatch';

// todo : use this video to convert this to the new format, but figure out why I'm doing this first:
//       https://www.youtube.com/watch?v=5s57C7leXc4&list=PL4cUxeGkcC9iVKmtNuCeIswnQ97in2GGf&index=3
export const routes = {
  "home": {
    path: "/",
    element: <Home />,
  },
  "about": {
    key: "about",
    path: "/about",
    element: <About />,
  },
  "projects": {
    key: "projects",
    path: "/projects",
    element: <Projects />,
  },
  "blog": {
    key: "blog",
    path: "/blog",
    element: <Blog />,
  },
  "noMatch": {
    path: "*",
    element: <NoMatch />,
  }
};

export const navLinks = [
  {
    to: routes.home.path,
    title: "Home",
    Icon: HomeIcon,
  },
  {
    to: routes.about.path,
    title: "About",
    Icon: IdentificationIcon,
  },
  {
    to: routes.projects.path,
    title: "Projects",
    Icon: CommandLineIcon,
  },
  {
    to: routes.blog.path,
    title: "Blog",
    Icon: NewspaperIcon,
  },
];
