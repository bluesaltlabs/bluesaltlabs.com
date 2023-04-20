import {
  PhoneIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline'


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";


function ContactCard({ vCard }) {
  

  // //save to file
  // // vCard?.saveToFile('./luke-sontrop.vcf');

  // get as formatted string
  console.debug(vCard?.getFormattedString());
  
  {/* Contact Card */}
  return (
    <div className="contact-card flex my-5 mx-1 p-3 rounded bg-slate-200/50 dark:bg-slate-800/50">
      
      {/* Contact Card Photo */}
      <div className="contact-card-photo m-3">
        <img src={vCard?.photo?.url} alt={vCard?.formattedName} />

      </div>

      {/* Contact Card Info */}
      <div className="contact-card-info m-3">
        <h2 className="text-2xl font-bold">{vCard?.formattedName}</h2>
        <p className="text-xl">{vCard?.title}</p>
        <p className="text-xl">{vCard?.organization}</p>


        <div className="flex">
          <PhoneIcon width={16} className="mr-3" />
          <a
            href={`tel:${vCard?.workPhone}`}
            className="p-1 block hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded"
          >
            {vCard?.workPhone}
          </a>
        </div>
        
        <div className="flex">
          <EnvelopeIcon width={16} className="mr-3" />
          <a
            href={`mailto:${vCard?.email}`}
            className="p-1 block hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded"
          >
            {vCard?.email}
          </a>
        </div>

        <div className="flex">
          <div className="flex text-3xl">
            <a href={vCard?.socialUrls?.github} className="px-2 py-1 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded">
              <FontAwesomeIcon icon={faGithubSquare} />
            </a>
          </div>

          <div className="flex text-3xl">
            <a href={vCard?.socialUrls?.twitter} className="px-2 py-1 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded">
              <FontAwesomeIcon icon={faTwitterSquare} />
            </a>
          </div>
        </div>

      </div>      
    
    </div>
  );
}

export default ContactCard;