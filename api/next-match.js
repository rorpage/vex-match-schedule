import { createHandler } from './_utils.js';

export default createHandler(matches => {
  const now = new Date();
  return matches
    .filter(m => !m.started && m.scheduled && new Date(m.scheduled) > now)
    .sort((a, b) => new Date(a.scheduled) - new Date(b.scheduled))
    .slice(0, 1);
});
