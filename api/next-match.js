import { createHandler, getNextMatch } from './_utils.js';

export default createHandler(matches => {
  const next = getNextMatch(matches);
  return next ? [next] : [];
});
