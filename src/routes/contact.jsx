import PageSection from '../layouts/PageSection';
import ContactCard from '../Components/ContactCard';
import vCardsJS from 'vcards-js';




function Contact() {

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
  vCard.workPhone = '555-555-5555';
  vCard.birthday = new Date(1990, 11, 11);
  vCard.title = 'Software Developer';
  vCard.url = 'https://bluesaltlabs.com';
  vCard.socialUrls.twitter = 'https://twitter.com/bluesaltlabs';
  vCard.socialUrls.github = 'https://github.com/bluesaltlabs';

  return (
    <PageSection>
  
      <h1 className="text-4xl font-bold">Contact</h1>
      <hr />

        <ContactCard vCard={vCard} />
    </PageSection>
  )
}

export default Contact;
