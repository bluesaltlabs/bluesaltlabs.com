
import {
  HomeIcon,
  IdentificationIcon,
  NewspaperIcon,
  BeakerIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline'


// Route Components
import Layout from '../layout/Layout'
import Home from '../pages/home';
import About from '../pages/about';
import Projects from '../pages/projects';
import Journal from '../pages/journal';
import Toys from '../pages/toys';
import NoMatch from '../pages/noMatch';
import Error from '../pages/error';

export const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "projects/:id",
        element: <Projects />,
      },
      {
        path: "toys",
        element: <Toys />,
      },
      {
        path: "journal",
        element: <Journal />,
      },
      {
        path: "journal/:id",
        element: <Journal />,
      },
      {
        path: "*",
        element: <NoMatch />,
      }
    ]
  },
  {
    path: "*",
    element: <NoMatch />,
  }
];

export const navLinks = [
  {
    to: "/",
    title: "Home",
    Icon: HomeIcon,
  },
  {
    to: "/about",
    title: "About",
    Icon: IdentificationIcon,
  },
  {
    to: "/projects",
    title: "Projects",
    Icon: CommandLineIcon,
  },
  {
    to: "/toys",
    title: "Toys",
    Icon: BeakerIcon,
  },
  {
    to: "/journal",
    title: "Journal",
    Icon: NewspaperIcon,
  }
];
