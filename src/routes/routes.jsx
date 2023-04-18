
import {
  HomeIcon,
  IdentificationIcon,
  ChatBubbleLeftRightIcon,
  NewspaperIcon,
  BriefcaseIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline'


// Route Components
import Home from './home';
import About from './about';
import Contact from './contact';
import Blog from './blog';
import Projects from './projects';
import Resume from './resume';
import NoMatch from './noMatch';

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
  "contact": {
    key: "contact",
    path: "/contact",
    element: <Contact />,
  },
  "blog": {
    key: "blog",
    path: "/blog",
    element: <Blog />,
  },
  "projects": {
    key: "projects",
    path: "/projects",
    element: <Projects />,
  },
  "resume": {
    key: "resume",
    path: "/resume",
    element: <Resume />,
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
    to: routes.blog.path,
    title: "Blog",
    Icon: NewspaperIcon,
  },
  {
    to: routes.projects.path,
    title: "Projects",
    Icon: CommandLineIcon,
  },
  {
    to: routes.resume.path,
    title: "Resume",
    Icon: BriefcaseIcon,
  },
  {
    to: routes.contact.path,
    title: "Contact",
    Icon: ChatBubbleLeftRightIcon,
  },
];

console.debug(navLinks);