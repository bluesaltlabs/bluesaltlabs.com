import {
  PhoneIcon,
  EnvelopeIcon,
  LinkIcon,
} from '@heroicons/react/24/outline'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faFacebook,
  faLinkedin,
  faStackOverflow,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import PreloadedImage from './PreloadedImage';

function ContactCard({ vCard, className }) {

  const photoSize = 250;

  return (
    <div className="contact-card flex flex-col md:flex-row lg:flex-col xl:flex-row my-5 mx-1 p-3 items-center rounded bg-slate-200/50 dark:bg-slate-800/50 shadow-lg">
      
      {/* Contact Card Photo */}
      <div className={`flex-shrink w-auto md:w-64 lg:w-auto bg-gray-300/50 dark:bg-gray-500/50 rounded p-2${className ? ` ${className}` : ''}`}>
        <PreloadedImage
          src={vCard?.photo?.url}
          alt={vCard?.formattedName}
          className={`object-contain max-w-[${photoSize}px]`}
          height={photoSize}
          width={photoSize}
        />
      </div>

      {/* Contact Card Info */}
      <div className="flex-grow contact-card-info m-2 px-2 md:px-4">
        <h2 className="text-2xl font-bold">{vCard?.formattedName ?? `${vCard?.firstName} ${vCard?.lastName}`}</h2>
        <h3 className="text-xl">{vCard?.title}</h3>
        <h3 className="text-xl text-slate-800 dark:text-slate-200">{vCard?.organization}</h3>

        <hr className="my-2 border-slate-200 dark:border-slate-600" />

        {/* Website */}
        <ContactLinkButton
          url={vCard?.url}
          HeroIcon={LinkIcon}
          title={`${vCard?.url}`.replace(/^https?\:\/\//i, "")}
        />

        {/* Work Phone */}
        <ContactLinkButton
          phoneNumber={vCard?.workPhone}
          HeroIcon={PhoneIcon}
          title={vCard?.workPhone}
        />

        {/* Mobile Phone */}
        <ContactLinkButton
          phoneNumber={vCard?.mobilePhone}
          HeroIcon={PhoneIcon}
          title={vCard?.mobilePhone}
        />

        {/* Email */}
        <ContactLinkButton
          email={vCard?.email}
          HeroIcon={EnvelopeIcon}
          title={vCard?.email}
        />
        
        {/* Social Links */}
        <div className="flex my-2">

          {/* GitHub */}
          <SocialIconButton
            url={vCard?.socialUrls?.github}
            title="GitHub"
            faIcon={faGithub}
          />

          {/* Stack Overflow */}
          <SocialIconButton
            url={vCard?.socialUrls?.stackoverflow}
            title="Stack Overflow"
            faIcon={faStackOverflow}
          />

          {/* LinkedIn */}
          <SocialIconButton
            url={vCard?.socialUrls?.linkedin}
            title="LinkedIn"
            faIcon={faLinkedin}
          />

          {/* Facebook */}
          <SocialIconButton
            url={vCard?.socialUrls?.facebook}
            title="Facebook"
            faIcon={faFacebook}
          />

          {/* Twitter */}
          <SocialIconButton
            url={vCard?.socialUrls?.twitter}
            title="Twitter"
            faIcon={faTwitter}
          />

          {/* Instagram */}
          <SocialIconButton
            url={vCard?.socialUrls?.instagram}
            title="Instagram"
            faIcon={faInstagram}
          />

        </div>
      </div>
    </div>
  );
}

function ContactLinkButton({ url, title, HeroIcon, phoneNumber, email }) {
  if (!url && !email && !phoneNumber) return null;

  return (
    <div className="flex">
      <HeroIcon width={16} className="mr-3" />
      <a
        href={`${phoneNumber ? `tel:${phoneNumber}` ? email : `${email}` : url}`}
        className="px-2 py-1 hover:bg-slate-500/50 dark:hover:bg-slate-400/50 hover:shadow rounded"
      >
        {title}
      </a>
    </div>
  );
}

function SocialIconButton({ url, faIcon, title }) {
  if (!url || !faIcon) return null;
  
  return (
    <div className="flex mx-1 text-xl">
      <a
        href={url}
        target="_blank"
        className="px-2 py-1 bg-slate-500/50 hover:bg-slate-200/50 dark:hover:bg-slate-100/50 hover:shadow rounded"
      >
        <FontAwesomeIcon icon={faIcon} title={title ?? url} />
      </a>
    </div>
  );
}

export default ContactCard;
