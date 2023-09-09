const newBlogPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const description = document.querySelector('#post-description').value.trim();
  
    if (title && description) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        const errorMessage = await response.json();
        alert(errorMessage.message);
      }
    }
  };
  
  const deleteBlogPostHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const postId = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        // Display an alert with the error message if post deletion fails
        const errorMessage = await response.json();
        alert(errorMessage.message);
      }
    }
  };
  
  // Add event listener for new blog post submission
  document.querySelector('.new-blog-post-form').addEventListener('submit', newBlogPostHandler);
  
  // Add event listener for blog post deletion
  document.querySelector('.blog-post-list').addEventListener('click', deleteBlogPostHandler);