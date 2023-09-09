const commentFormHandler = async (event) => {
    console.log("Comment form is being submitted!");
    event.preventDefault();
  
    const postId = document.querySelector('#comment-form').getAttribute('data-id');
    const commentDescription = document.querySelector('#comment-text').value.trim();
    console.log('Comment Data:', { text: commentDescription, postId });
  
    if (commentDescription && postId) {
      // Send a POST request to the create comment API endpoint
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ text: commentDescription }),
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
  
    