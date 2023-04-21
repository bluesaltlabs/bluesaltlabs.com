import PageSection from "../components/PageSection";
import PageTitle from "../components/PageTitle";
import PageSubtitle from "../components/PageSubtitle";
import PageDescription from "../components/PageDescription";
import { useLoaderData } from "react-router-dom";

import ContactCard from "../components/ContactCard";
import vCardsJS from "vcards-js";

export function aboutLoader() {

  // create a new vCard
  const vCard = vCardsJS();

  // set properties
  vCard.firstName = 'Luke';
  vCard.middleName = 'R';
  vCard.lastName = 'Sontrop';
  vCard.email = 'luke@bluesaltlabs.com';
  vCard.formattedName = 'Luke Sontrop';
  vCard.organization = 'BlueSalt Labs';
  vCard.photo.attachFromUrl('https://avatars.githubusercontent.com/u/72760763?s=300&v=4', 'JPEG');
  vCard.title = 'Software Developer';
  vCard.url = 'https://bluesaltlabs.com';
  vCard.socialUrls.github = 'https://github.com/bluesaltlabs';
  vCard.socialUrls.linkedin = 'https://www.linkedin.com/in/lukesontrop/';
  //vCard.socialUrls.twitter = 'https://twitter.com/bluesaltlabs';
  //vCard.socialUrls.facebook = 'https://www.facebook.com/bluesaltlabs';

  return { vCard };
}


function About() {
  const { vCard } = useLoaderData();

  return (
    <PageSection>

      <PageTitle>About</PageTitle>
      <ContactCard vCard={vCard} />

    </PageSection>
  )
}

export default About;
