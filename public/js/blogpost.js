const commentFormHandler = async (event) => {
    console.log("Comment form is being submitted!");
    event.preventDefault();
  
    const postId = document.querySelector('#comment-form').getAttribute('data-id');
    const commentText = document.querySelector('#comment-text').value.trim();
    console.log('Comment Data:', { text: commentText, postId });
  
    if (commentText && postId) {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ text: commentText }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to submit comment');
      }
    }
  };
  
  document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);
  
    