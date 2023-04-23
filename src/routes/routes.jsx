
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

import Projects from '../pages/projects/projects';
import OpenEyeWebsite from '../pages/projects/openeye-website';
import TaylorStudyMethod from '../pages/projects/taylor-study-method';

import Journal, { journalLoader } from '../pages/journal/journal';
import JournalEntry, { journalEntryLoader } from '../pages/journal/entry';
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
        element: <Projects />,
        children: [
          {
            path: "taylor-study-method",
            element: <TaylorStudyMethod />,
          },
          {
            path: "openeye-website",
            element: <OpenEyeWebsite />,
          },
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
      },
      {
        path: "journal/:slug",
        loader: journalEntryLoader,
        element: <JournalEntry />,
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
