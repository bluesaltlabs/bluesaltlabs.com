import PageSection from "../components/PageSection";
import PageTitle from "../components/PageTitle";
import PageSubtitle from "../components/PageSubtitle";
import PageDescription from "../components/PageDescription";

import ContactCard from "../components/ContactCard";
import vCardsJS from "vcards-js";


function About() {

  // DEMO!!

  // create a new vCard
  // https://github.com/enesser/vCards-js
  const vCard = vCardsJS();


  //set properties
  vCard.firstName = 'Luke';
  vCard.middleName = 'R';
  vCard.lastName = 'Sontrop';
  vCard.email = 'luke@bluesaltlabs.com';
  vCard.formattedName = 'Luke Sontrop';
  vCard.organization = 'BlueSalt Labs';
  vCard.photo.attachFromUrl('https://avatars.githubusercontent.com/u/72760763?s=200&v=4', 'JPEG');
  //vCard.workPhone = '555-555-5555';
  vCard.birthday = new Date(1990, 11, 11);
  vCard.title = 'Software Developer';
  vCard.url = 'https://bluesaltlabs.com';
  vCard.socialUrls.twitter = 'https://twitter.com/bluesaltlabs';
  vCard.socialUrls.github = 'https://github.com/bluesaltlabs';

  return (
    <PageSection>
  
      <PageTitle>About</PageTitle>
      <PageSubtitle></PageSubtitle>
      <PageDescription></PageDescription>

      <ContactCard vCard={vCard} />

    </PageSection>
  )
}

export default About;
