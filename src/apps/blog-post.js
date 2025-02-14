import { marked } from 'marked';
import PostRepository from '@/repositories/PostRepository';

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

const EVENT_TYPE_LOAD = 'blog_post_app__load';
const EVENT_TYPE_INIT = 'blog_post_app__init';

export class BlogPostApp {
  constructor(mountPointID) {
    // super();
    this.post_id = 0;
    this.debug = true;
    this.postRepository = new PostRepository(POST_URL, POST_CONTENT_BASE_URL);
    this.app = {
      mountPointID: mountPointID,
    };
    this.post = [];
  }

  sendDebugMsg(message = "DEBUG MESSAGE", data = undefined) {
    if(this.debug === true) {
      if(!data) { console.debug(message); }
      else { console.debug(message, data); }
    }
  }

  async fetchPost() {
    this.sendDebugMsg("---- Fetching Post: Start ----------------");
    const post = await this.postRepository.getById(this.post_id);
    // todo: error checking if post doesn't exist
    this.post = post;
    this.sendDebugMsg("---- Fetching Post: Done -----------------");
    return post;
  }

  // todo: move this to a helper file.
  getFormattedDateString(dateValue) {
    const pub = new Date(dateValue);

    const y = pub.getFullYear();
    const m = `${pub.getMonth() + 1}`.padStart(2, '0');
    const d =`${pub.getDate()}`.padStart(2, '0');

    return `${y}.${m}.${d}`;
  }

  // todo: figure out a better name for this function.
  fetchPostID() {
    const path = window.location.pathname;
    const pathArray = window.location.pathname.split('/');

    console.debug("fetchPostID", { path, pathArray });

    // this should be /blog/posts/:id
    if (pathArray.length >= 3 && pathArray[0] === 'blog' && pathArray[1].includes('posts')) {
      this.post_id = pathArray[2];
    } else {
      // attempt to retrieve from query params instead
      this.post_id = new URLSearchParams(window.location.search).get('id');
    }

      // todo: error checking
  }

/* ************************************************************************** */

  async __init() {
    // Fetch post
    await this.fetchPost();

    const postContentArticle = document.createElement('article');
    const publishedAtString = this.getFormattedDateString(this.post.publishedAt);
    const content = marked.parse(
      await this.postRepository.getContentById(this.post.id) ?? ''
    ) ?? "!!";
    // todo: load this from a template instead of hard-coding it in 2 places
    postContentArticle.innerHTML = `
      <h2 class="post-title" id="post-title_${this.post.id}">${this.post.title}</h2>
      <h3 class="post-subtitle" id="${publishedAtString}">Posted - <code>${publishedAtString}</code></h3>
      <div class="post-content" id="post-content_${this.post.id}">${content}</div>
    `;

    const mountPoint = document.getElementById(this.app.mountPointID);
    mountPoint.innerHTML = `<article>${postContentArticle.innerHTML}</article>`;

    document.dispatchEvent( new Event(EVENT_TYPE_INIT) ); // todo: nothing is listening to this.
  }

  load() {
    this.fetchPostID();

    // Mount elements to the page once the DOM Content has been loaded.
    document.addEventListener("DOMContentLoaded", (e) => { this.__init(); }, { once: true });
    document.dispatchEvent( new Event(EVENT_TYPE_LOAD) ); // todo: nothing is listening to this.
  }
}

let app = new BlogPostApp("blog-post-app");
app.load();
