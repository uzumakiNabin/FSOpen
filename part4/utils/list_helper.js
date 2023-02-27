const dummy = (blogs) => 1;

const totalLikes = (blogs) => (blogs.length === 0 ? 0 : blogs.reduce((acc, blog) => acc + blog.likes, 0));

const favouriteBlog = (blogs) => (blogs.length === 0 ? null : blogs.sort((first, second) => second.likes - first.likes)[0]);

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  let authorBlogCount = [];
  blogs.forEach((blog) => {
    let countIndex = authorBlogCount.findIndex((count) => blog.author === count.author);
    if (countIndex > -1) {
      let authorCount = authorBlogCount[countIndex];
      authorBlogCount[countIndex] = { ...authorCount, blogs: Number(authorCount.blogs + 1) };
    } else {
      authorBlogCount.push({ author: blog.author, blogs: 1 });
    }
  });
  return authorBlogCount.sort((first, second) => second.blogs - first.blogs)[0];
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  let authorBlogCount = [];
  blogs.forEach((blog) => {
    let countIndex = authorBlogCount.findIndex((count) => blog.author === count.author);
    if (countIndex > -1) {
      let authorCount = authorBlogCount[countIndex];
      authorBlogCount[countIndex] = { ...authorCount, likes: Number(authorCount.likes) + Number(blog.likes) };
    } else {
      authorBlogCount.push({ author: blog.author, likes: blog.likes });
    }
  });
  return authorBlogCount.sort((first, second) => second.likes - first.likes)[0];
};

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes };
