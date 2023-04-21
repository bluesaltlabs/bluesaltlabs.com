
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
import About, { aboutLoader } from '../pages/about';
import Projects, { projectsLoader } from '../pages/projects';
import Journal, { journalLoader } from '../pages/journal';
import Toys, { toysLoader } from '../pages/toys';
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
        loader: aboutLoader,
      },
      {
        path: "projects",
        loader: projectsLoader,
        element: <Projects />,
        children: [
          {
            path: ":slug",
            element: <Projects />,
          }
        ]
      },
      {
        path: "toys",
        loader: toysLoader,
        element: <Toys />,
        children: [
          {
            path: ":slug",
            element: <Toys />,
          }
        ]
      },
      {
        path: "journal",
        loader: journalLoader,
        element: <Journal />,
        children: [
          {
            path: ":slug",
            element: <Journal />,
          }
        ]
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
