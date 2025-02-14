import { marked } from 'marked';
import PostRepository from '../repositories/PostRepository';

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
/* ## Initializes loads posts.                                                */
/*  todo                                                                      */
/*                                                                            */
/*                                                                            */
/******************************************************************************/

const POST_URL = 'https://bluesaltlabs.github.io/api/posts.json';
const POST_CONTENT_BASE_URL = 'https://bluesaltlabs.github.io/data/posts/';

const EVENT_TYPE_LOAD = 'blog_app__load';
const EVENT_TYPE_INIT = 'blog_app__init';

export class BlogApp {
  constructor() {
    // super();
    this.debug = true;
    this.postRepository = new PostRepository(POST_URL, POST_CONTENT_BASE_URL);
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


  sendDebugMsg(message = "DEBUG MESSAGE", data = undefined) {
    if(this.debug === true) {
      if(!data) { console.debug(message); }
      else { console.debug(message, data); }
    }
  }

  // todo: move this to a repository service class instead of hard-coding it here.
  async fetchPosts() {
    this.sendDebugMsg("---- Fetching Posts: Start ----");
    this.posts = await this.postRepository.getAll();
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
  // todo: implement error checking if no posts are retrieved.
  this.posts.sort((a, b) => (b.id - a.id))
    .filter((p) => (!!p.publishedAt))
    .map(async (post, postKey, posts) => {
      const postContentArticle = document.createElement('article');
      // todo: do this as a separate process so retrieving post content doesn't block the page from loading.
      //const postContent = await this.postRepository.getContentById(post.id);
      //const parsedPostContent = marked.parse(postContent);
      const parsedPostContent = marked.parse( await this.postRepository.getContentById(post.id) ?? '' );

      //postContentArticle.innerHTML = `
      //  <h2 class="post-title" id="post-title_${post.id}">${post.title}</h2>
      //  <div id="post-content_${post.id}"><loading-grid></loading-grid></div>
      //  ${postKey < (posts.length - 1) ? '<hr />' : '' }
      //`;

      postContentArticle.innerHTML = `
        <h2 class="post-title" id="post-title_${post.id}">${post.title}</h2>
        <div id="post-content_${post.id}">${parsedPostContent}</div>
        ${postKey < (posts.length - 1) ? '<hr />' : '' }
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

    // Mount elements to the page once the DOM Content has been loaded.
    document.addEventListener("DOMContentLoaded", (e) => { this.__init(); }, { once: true });
    document.dispatchEvent( new Event(EVENT_TYPE_LOAD) ); // todo: nothing is listening to this.
  }
}

let app = new BlogApp();
app.load("blog-app");
