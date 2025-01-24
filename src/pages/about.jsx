import PageSection from "../components/PageSection";
import PageTitle from "../components/PageTitle";
//import PageSubtitle from "../components/PageSubtitle";
//import PageDescription from "../components/PageDescription";
import { useLoaderData } from "react-router-dom";

import ContactCard from "../components/ContactCard";
import vCardsJS from "vcards-js";

export function aboutLoader() {

  // create a new vCards
  const vCards = [(new vCardsJS()), (new vCardsJS())];  
  
  // Set BlueSalt Labs vCard Properties ( vCards[0] )
  vCards[0].firstName = 'Luke';
  vCards[0].middleName = 'R';
  vCards[0].lastName = 'Sontrop';
  vCards[0].email = 'luke@bluesaltlabs.com';
  vCards[0].formattedName = 'Luke Sontrop';
  vCards[0].organization = 'BlueSalt Labs';
  vCards[0].photo.attachFromUrl('https://avatars.githubusercontent.com/u/72760763?s=300&v=4', 'JPEG');
  vCards[0].title = 'Full Stack Software Developer';
  vCards[0].url = 'https://bluesaltlabs.com';
  vCards[0].socialUrls.github = 'https://github.com/bluesaltlabs';
  //vCards[0].socialUrls.facebook = 'https://www.facebook.com/bluesaltlabs';
  //vCards[0].socialUrls.twitter = 'https://twitter.com/bluesaltlabs';
  
  // Set Luke Sontrop vCard Properties ( vCards[1] )
  vCards[1].firstName = 'Luke';
  vCards[1].middleName = 'R';
  vCards[1].lastName = 'Sontrop';
  vCards[1].email = 'lukerz8@gmail.com';
  vCards[1].formattedName = 'Luke Sontrop';
  vCards[1].organization = '';
  vCards[1].photo.attachFromUrl('https://0.gravatar.com/userimage/100813990/d2033651f6c3ecdd2198e81f4d5dee4f?size=300', 'JPEG');
  vCards[1].title = 'Full Stack Software Developer';
  vCards[1].url = 'https://bluesaltlabs.com';
  vCards[1].socialUrls.github = 'https://github.com/lukerz8';
  vCards[1].socialUrls.linkedin = 'https://www.linkedin.com/in/lukesontrop';
  vCards[1].socialUrls.stackoverflow = 'https://stackoverflow.com/users/5121100/luke-sontrop';
  vCards[1].socialUrls.facebook = 'https://www.facebook.com/lukerz8';
  vCards[1].socialUrls.twitter = 'https://www.twitter.com/lukerz8';
  vCards[1].socialUrls.instagram = 'https://www.instagram.com/lukerz8';
  vCards[1].socialUrls.aboutme = 'https://about.me/luke.sontrop';
  
  return { vCards };
}


function About() {
  const { vCards } = useLoaderData();

  return (
    <PageSection>

      <PageTitle>About</PageTitle>

      <div className="flex flex-col lg:flex-row">
        {vCards.map((vCard, index) => (
          <ContactCard
            key={index}
            vCard={vCard}
          />
        ))}
      </div>

    </PageSection>
  )
}

export default About;
