
import {
  HomeIcon,
  IdentificationIcon,
  NewspaperIcon,
  BeakerIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline'


// Route Components
import Home from '../pages/home';
import About from '../pages/about';
import Projects from '../pages/projects';
import Journal from '../pages/Journal';
import Toys from '../pages/Toys';
import NoMatch from '../pages/noMatch';

// todo : use this video to convert this to the new format, but figure out why I'm doing this first:
//       https://www.youtube.com/watch?v=5s57C7leXc4&list=PL4cUxeGkcC9iVKmtNuCeIswnQ97in2GGf&index=3

// todo: combine the routes and navLinks into one object, and use that to generate the navLinks and routes
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
  "toys": {
    key: "toys",
    path: "/toys",
    element: <Toys />,
  },
  "projects": {
    key: "projects",
    path: "/projects",
    element: <Projects />,
  },
  "journal": {
    key: "journal",
    path: "/journal",
    element: <Journal />,
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
    to: routes.toys.path,
    title: "Toys",
    Icon: BeakerIcon,
  },
  {
    to: routes.journal.path,
    title: "Journal",
    Icon: NewspaperIcon,
  },
];
