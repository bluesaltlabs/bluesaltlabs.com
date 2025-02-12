

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
    this.posts = [];
  }

  loadAppState(mountPointID) {
    this.sendDebugMsg("---- Loading app state: Start ----");
    this.app = {
      mountPointID: mountPointID,
      path: window.location.pathname,
    };
    this.sendDebugMsg("---- Loading app state: End ------");
  }

  handleEvent(event = undefined) {
    console.log("blog app is handling an event:", { event: event ?? undefined });
  }

  handleError(message = "DEBUG MESSAGE", data = undefined) {
    console.error("blog app is handling an event:", { event: event ?? undefined });
  }

  sendDebugMsg(message = "DEBUG MESSAGE", data = undefined) {
    if(this.debug === true) {
      if(!data) { console.debug(message); }
      else { console.debug(message, data); }
    }
  }

  // todo: move this to a repository service class instead of hard-coding it here.
  async fetchPosts() {
    this.sendDebugMsg("---- Fetching Posts: Start ----");
    let posts = undefined;

    await fetch('/data/posts.json')
      .then(response => response.json() )
      .then(json => posts = json )
    ;
    this.posts = posts;
    this.sendDebugMsg("---- Fetching Posts: Done. ----");
  }

  // todo: this is not a good way to do this - fix it.
  async fetchPostContent(postID = null) {
    let postContent = undefined;
    const cleanID = parseInt(`${postID}`);

    await fetch(`/data/posts/${cleanID}.md`)
      .then(response => response.text() )
      .then(text => postContent = text )

    return postContent;
  }

/* ************************************************************************** */
  async __init() {
    // Fetch posts
    await this.fetchPosts();

    const template = document.createElement('div');


    // todo: get post content for each post
    // todo: error checking if no posts are retrieved.
    this.posts.sort((a, b) => (b.id - a.id))
    .map(post => {

      const postContentArticle = document.createElement('article');

      this.fetchPostContent(post.id)
        .then(content => {
          postContentArticle.innerHTML = `
            <h2 class="post-title" id="post-title_${post.id}">${post.title}</h2>
            <div><code><pre>${content}</pre></code></div>
            <hr />
          `;
        })
      ;

      template.appendChild(postContentArticle)
    })


    // Create the element to mount

    //template.innerHTML = `
    //  <pre><code>${JSON.stringify(this.posts, null, 2)}</pre></code>
    //`

    try {
      const mountPoint = document.getElementById(this.app.mountPointID);
      mountPoint.innerHTML = ``; // clear the mount point content.
      mountPoint.appendChild(template);
    } catch (e) {
      console.error(
        `Could not mount blog app - '${e?.message ?? 'Unknown Error'}'.\nPlease check that the specified mountPointID exists.`
      );
    }

    document.dispatchEvent( new Event(EVENT_TYPE_INIT) ); // todo: nothing is listening to this.
  }

  load(mountPointID) {
    this.loadAppState(mountPointID);

    // todo: any other tasks to complete before mounting DOM.

    // Mount elements to the page once the DOM Content has been loaded.
    document.addEventListener("DOMContentLoaded", (e) => { this.__init(); }, { once: true });
    document.dispatchEvent( new Event(EVENT_TYPE_LOAD) ); // todo: nothing is listening to this.
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
