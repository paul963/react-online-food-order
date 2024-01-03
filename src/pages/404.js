import { useEffect } from 'react';

import classes from './404.module.css';

function NotFound() {
  useEffect(() => {
    document.title = '404 - Page Not Found';
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Page does not exist.';
    document.head.appendChild(metaDescription);
  }, []);

  return (
    <div className={classes.errorContainer}>
      <h1>An error occurred!</h1>
      <h2>Page does not exist.</h2>
    </div>
  );
}

export default NotFound;