import PageSection from "../components/PageSection";
import PageTitle from "../components/PageTitle";
import PageSubtitle from "../components/PageSubtitle";
//import PageDescription from "../components/PageDescription";
import CodePen from "../components/CodePen";
import BackNavButton from "../components/BackNavButton";

import { useLoaderData } from "react-router-dom";

import {
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'


// I also could have just used useParams here, but I wanted to learn how to use useLoaderData.
const codepenProjects = {
  "calculator": {
    title: "JavaScript Calculator (FreeCodeCamp)",
    embedUrl: "https://codepen.io/bluesaltlabs/embed/ZWwKVa",
    height: "525",
  },
  "breathing-timer": {
    title: "Breathing Timer",
    embedUrl: "https://codepen.io/bluesaltlabs/embed/ezXjLm",
    height: "525",
  },
  "pomodoro-clock": {
    title: "Pomodoro Clock (FreeCodeCamp)",
    embedUrl: "https://codepen.io/bluesaltlabs/embed/Ravzwb",
    height: "525",
  },
  "css-color-tool": {
    title: "Basic CSS Color Tool",
    embedUrl: "https://codepen.io/bluesaltlabs/embed/BzeXxq",
    height: "525",
  },
};

export function toysLoader({ params }) {
  const toySlug = params?.slug;
  let toys = [];

  if (toySlug) {
    toys = {}
    toys[toySlug] = codepenProjects[toySlug];
  } else {
    toys = codepenProjects;
  }
  
  return {
    toySlug,
    toys,
  };
}

function Toys() {
  const { toySlug, toys } = useLoaderData(toysLoader);
  
  return (
    <PageSection>
      <PageTitle>Toys</PageTitle>


      { !toySlug && Object.keys(toys).length > 1 && (
        <div className="flex flex-wrap">
          {Object.keys(toys).map((key) => (

            <div
              key={key}
              className="min-w-[400px] flex-grow m-2 p-1 bg-slate-200/50 hover:bg-slate-200/60 rounded shadow-lg hover:shadow-xl"
            >

              <h3 className="text-lg font-bold px-2 pt-1 mb-2">
                <a href={`/toys/${key}`} className="block">
                  {toys[key]?.title}
                </a>
              </h3>
              
              <CodePen
                title={toys[key]?.title || undefined}
                embedUrl={toys[key].embedUrl}
                height={toys[key]?.height || undefined}
                width="100%"
              />
            </div>
          ))}
        </div>
      )}
        
      {(toySlug && toys.hasOwnProperty(toySlug)) ? (
        <>
          <BackNavButton to="/toys">
            <ArrowLeftOnRectangleIcon width={16} className="inline-block mr-2" />
            <span>All Toys</span>
          </BackNavButton>

          <PageSubtitle>{toys[toySlug]?.title}</PageSubtitle>

          <div
            className="w-100 m-2 p-1 rounded shadow-xl bg-slate-200/50"
          >
            <CodePen
              title={toys[toySlug]?.title || undefined}
              embedUrl={toys[toySlug].embedUrl}
              height={toys[toySlug]?.height || undefined}
              width="100%"
            />
          </div>
        </>
      ) : null }

    </PageSection>
  )
}

export default Toys;


