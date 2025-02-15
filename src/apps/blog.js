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

const EVENT_TYPE_LOAD = 'blog_app__load';
const EVENT_TYPE_INIT = 'blog_app__init';
const EVENT_TYPE_CONTENT_LOADED = 'blog_app__content_loaded';

export class BlogApp {
  constructor(mountPointID) {
    // super();
    this.debug = true;
    this.postRepository = new PostRepository(POST_URL, POST_CONTENT_BASE_URL);
    this.app = {
      mountPointID: mountPointID,
    };
    this.posts = [];
  }

  sendDebugMsg(message = "DEBUG MESSAGE", data = undefined) {
    if(this.debug === true) {
      if(!data) { console.debug(message); }
      else { console.debug(message, data); }
    }
  }

  async fetchPosts() {
    this.sendDebugMsg("---- Fetching Posts: Start ----------------");
    this.posts = await this.postRepository.getPublished();
    this.sendDebugMsg("---- Fetching Posts: Done. Sorting ... ----");
    this.posts = this.posts.sort((a, b) => (b.id - a.id));
    this.sendDebugMsg("---- Done sorting fetched posts. ---------");
  }

  // todo: move this to a helper file.
  getFormattedDateString(dateValue) {
    const pub = new Date(dateValue);

    const y = pub.getFullYear();
    const m = `${pub.getMonth() + 1}`.padStart(2, '0');
    const d =`${pub.getDate()}`.padStart(2, '0');

    return `${y}.${m}.${d}`;
  }

/* ************************************************************************** */

  async __init() {
    // Fetch posts
    await this.fetchPosts();

    const template = document.createElement('div');

    // todo: implement error checking if no posts are retrieved.
    this.posts.map(async (post, postKey, posts) => {
      const postContentArticle = document.createElement('article');
      const publishedAtString = this.getFormattedDateString(post.publishedAt);
      // todo: load this from a template instead of hard-coding it in 2 places
      postContentArticle.innerHTML = `
        <h2 class="post-title" id="post-title_${post.id}">
          <a href="/blog/posts.html?id=${post.id}">${post.title}</a>
        </h2>
        <h3 class="post-subtitle" id="${publishedAtString}">
          <span>Posted - <code>${publishedAtString}</code></span><br />
        </h3>
        ${postKey === 0 ?
        `<div class="post-content" id="post-content_${post.id}"><loading-grid></loading-grid></div>`
        :
        `<div class="post-excerpt" id="post-excerpt_${post.id}">${post.excerpt ?? post.description}</div>`
        }
        ${postKey < (posts.length - 1) ? '<hr />' : '' }
      `;

      template.appendChild(postContentArticle);
    });

    const mountPoint = document.getElementById(this.app.mountPointID);
    mountPoint.innerHTML = template.innerHTML;

    document.dispatchEvent( new Event(EVENT_TYPE_INIT) ); // todo: nothing is listening to this.

    // Retrieve the content for the most recent post.
    if( this.posts.length > 0) {
      const contentContainer = document.getElementById(`post-content_${this.posts[0].id}`);

      contentContainer.innerHTML = marked.parse(
        await this.postRepository.getContentById(this.posts[0].id) ?? ''
      ) ?? "";
    }

    document.dispatchEvent( new Event(EVENT_TYPE_CONTENT_LOADED) ); // todo: nothing is listening to this.
  }

  load() {
    // Mount elements to the page once the DOM Content has been loaded.
    document.addEventListener("DOMContentLoaded", (e) => { this.__init(); }, { once: true });
    document.dispatchEvent( new Event(EVENT_TYPE_LOAD) ); // todo: nothing is listening to this.
  }
}

let app = new BlogApp("blog-app");
app.load();
