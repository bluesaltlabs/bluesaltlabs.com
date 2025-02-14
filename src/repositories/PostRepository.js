
class PostRepository {
  constructor(url, contentBaseUrl) {
    // super();
    this.url = url;
    this.contentBaseUrl = contentBaseUrl
    this.posts = [];
    this.postContent = [];
  }

  async getAll() {
    return await fetch(this.url)
      .then(response => response.json())
      .then(data => {
        //console.debug("fetched post data", { data })
        this.posts = data.posts;
        return this.posts;
      })
      .catch(error => console.error("Error Fetching Posts: ", { error }))
  }

  async getPublished() {
    if(!this.posts || this.posts.length === 0) {
      this.posts = await this.getAll();
    }

    return this.posts.filter((p) => (!!p.publishedAt));
  }

  async getById(id) {
    if(!this.posts || this.posts.length === 0 || !this.posts[id]) {
      this.posts = await this.getAll();
    }

    return this.posts.filter((p) => (p.id === parseInt(id)))[0] ?? undefined;
  }

  // todo: update this function and the data so it retrieves the URL from the post data and not here manually.
  // get[attribute]ById(id) {}
  async getContentById(id) {
    if(!this.postContent[id]) {
      return await fetch(`${this.contentBaseUrl}/${id}.md`)
        .then(response => response.text())
        .then(text => {
          //console.debug("fetched post content data", { text })
          this.postContent[id] = text;
          return this.postContent[id];
        })
        .catch(error => console.error("Error Fetching Post content: ", { error }))
    }

    return this.postContent[id];
  }
}

export default PostRepository;
