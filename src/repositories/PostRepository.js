

class BlogPostRepository {
    constructor(data) {
        this.data = data;
    }

    getAllPosts() {
        return this.data;
    }

    getPostById(id) {
        return this.data.find(post => post.id === id)
    }
}

// Example usage:
const exampleData = [
    { id: 1, title: 'First Post', content: 'This is the first blog post.' },
    { id: 2, title: 'Second Post', content: 'This is the second blog post.' }
]

const repository = new BlogPostRepository(exampleData)

// console.log(repository.getAllPosts());
// console.log(repository.getPostById(1));
