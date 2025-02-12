import { marked } from 'marked';


import posts from '@/data/posts.json';
import post1 from '@/data/posts/1.md?raw';
import post2 from '@/data/posts/2.md?raw';

const getPostContentByID = (postID) => {

  // todo: this is hacky, but it works for now;
  switch (postID) {
    case 1: return post1; break;
    case 2: return post2; break;
  }
};

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
    this.posts = {};
  }

  loadAppState(mountPointID) {
    this.sendDebugMsg("---- Loading app state: Start ----");
    this.app = {
      mountPointID: mountPointID,
      path: window.location.pathname,
    };
    this.sendDebugMsg("---- Loading app state: End ------");
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
    this.posts = posts.posts;
    this.sendDebugMsg("---- Fetching Posts: Done. ----");
  }

  // todo: this is not a good way to do this - fix it.
  async fetchPostContent(postID = null) {
    let postContent = undefined;

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
      .filter((p) => (!!p.publishedAt))
      .map((post, postKey, posts) => {
        const postContentArticle = document.createElement('article');
        const postContent = marked.parse(getPostContentByID(post.id));

        postContentArticle.innerHTML = `
          <h2 class="post-title" id="post-title_${post.id}">${post.title}</h2>
          <div id="post-content_${post.id}>${postContent}</div>
          ${postKey < posts.length - 1 ? '<hr />' : '' }
        `;

        template.appendChild(postContentArticle)
      });

    try {
      const mountPoint = document.getElementById(this.app.mountPointID);
      mountPoint.innerHTML = ``; // clear the mount point content. todo: don't do this, assign in one go instead.
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
