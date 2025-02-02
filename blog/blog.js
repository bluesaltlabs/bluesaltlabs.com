
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
        */
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
      */
  // mount the app to the page



  // steps:
  // 0. load HTML page with static loading inidicator
  // 1. load javascript, init app. replace loading inidcator to show this state change

}

document.addEventListener("DOMContentLoaded", blog);
