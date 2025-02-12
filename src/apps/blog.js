import { marked } from 'marked';

import posts from '@/data/posts.json';
import post1 from '@/data/posts/1.md?raw';
import post2 from '@/data/posts/2.md?raw';
import post3 from '@/data/posts/3.md?raw';
import post4 from '@/data/posts/4.md?raw';
import post5 from '@/data/posts/5.md?raw';
import post6 from '@/data/posts/6.md?raw';
import post7 from '@/data/posts/7.md?raw';
import post8 from '@/data/posts/8.md?raw';
import post9 from '@/data/posts/9.md?raw';
import post10 from '@/data/posts/10.md?raw';
import post11 from '@/data/posts/11.md?raw';
import post12 from '@/data/posts/12.md?raw';
import post13 from '@/data/posts/13.md?raw';
import post14 from '@/data/posts/14.md?raw';
import post15 from '@/data/posts/15.md?raw';
import post16 from '@/data/posts/16.md?raw';
import post17 from '@/data/posts/17.md?raw';

const getPostContentByID = (postID) => {

  // todo: this is hacky, but it works for now;
  switch (postID) {
    case 1: return post1; break;
    case 2: return post2; break;
    case 3: return post3; break;
    case 4: return post4; break;
    case 5: return post5; break;
    case 6: return post6; break;
    case 7: return post7; break;
    case 8: return post8; break;
    case 9: return post9; break;
    case 10: return post10; break;
    case 11: return post11; break;
    case 12: return post12; break;
    case 13: return post13; break;
    case 14: return post14; break;
    case 15: return post15; break;
    case 16: return post16; break;
    case 17: return post17; break;
    default: return `No Content!`
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
/* ## Initializes loads posts.                                                */
/*  todo                                                                      */
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
        <div id="post-content_${post.id}">${postContent}</div>
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
