module.exports = {
    format_date: (date) => {
      // Format date as MMMM Do, YYYY
      return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    },
  };