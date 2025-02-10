

/******************************************************************************/
/* Blog App                                                                   */
/* BlueSalt Labs                                                              */
/*                                                                            */
/* todo: figure out how to make this a multi-page app.                        */
/*       the current vite setup will not allow dynamic routing.               */
/*       for now I can hard-code individual blog posts.                       */
/*                                                                            */
/* # Application Description                                                  */
/*                                                                            */
/* ## Initialize, determine page.                                             */
// ### List page
//   load
// ### Show page
//   ...
// Search page
//   ...
//
/*                                                                            */
/*                                                                            */
/*                                                                            */
/*                                                                            */
/*                                                                            */
/******************************************************************************/


const EVENT_TYPE_LOAD = 'blog_app__load';
const EVENT_TYPE_INIT = 'blog_app__init';

export class BlogApp {
  constructor() {
    // super();
    this.debug = true;
    this.app = {};

    document.dispatchEvent( new Event(EVENT_TYPE_LOAD) );
  }

  loadAppState(mountPointID) {
    if (this.debug) { console.debug("---- Loading app state: Start --------"); }
    this.app = {
      mountPointID: mountPointID,
      path: window.location.pathname,
    };
    if (this.debug) { console.debug("---- Loading app state: End ----------"); }
  }

  handleEvent(event) {
    console.log("blog app is handling an event:", { event: event ?? undefined })
  }

  init() {
    const template = document.createElement('div');
    template.innerHTML = `
      <div>Foobar this is JavaScript!</div>
    `

    try {
      const mountPoint = document.getElementById(this.app.mountPointID);
      mountPoint.innerHTML = ``; // clear the mount point content.
      mountPoint.appendChild(template);
    } catch (e) {
      console.error(
        `Could not mount blog app - '${e?.message ?? 'Unknown Error'}'.\nPlease check that the specified mountPointID exists.`
      );
    }


    // todo;

    document.dispatchEvent( new Event(EVENT_TYPE_INIT) );
  }

  load(mountPointID) {
    this.loadAppState(mountPointID);

    // todo: any other tasks to complete before mounting DOM.

    // Mount elements to the page once the DOM Content has been loaded.
    document.addEventListener("DOMContentLoaded", (e) => { this.init(); }, { once: true });
  }
}

let app = new BlogApp();
app.load("blog-app");



/*



const mountpointID = 'blog-app'
let posts = {}

const blog = async () => {

  const fetchPosts = async () => {
    fetch('/data/posts.json')
      .then((response) => response.json())
      .then((json) => posts = json)
      .then(() => console.debug("loaded posts", posts)) // debug
      ;

  }

  const getPostContent = (postID) => {
    // todo: wrape this in a try/catch. i.e. handle errors
    /*
      fetch('/data/1.md')
        .then((res) => res.text())
        .then((md) => console.log(md));
        * /
  }



  // Fetch blog post data

  // loop over posts, fetch markdown content


  // check which page the user is presently on. If index, show all blog posts
  // todo: this should probably only render like, 3. all for now is fine.
  if (posts?.length > 0) {

  } else {
    // todo: show "no posts" message.
  }





  const init = () => {
    const appDiv = document.getElementById(mountpointID)

    // todo: show loading state.

    //appDiv.innerHTML = getPageContent() // todo: handle routing?
  }


  /*
    fetch('/data/1.md')
      .then((res) => res.text())
      .then((md) => console.log(md));
      * /
  // mount the app to the page



  // steps:
  // 0. load HTML page with static loading inidicator
  // 1. load javascript, init app. replace loading inidcator to show this state change

}

document.addEventListener("DOMContentLoaded", blog);


*/
