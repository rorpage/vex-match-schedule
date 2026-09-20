import { createHandler, getNextMatch } from './_utils.js';

export default createHandler((matches, query) => {
  const teamId = parseInt(query.teamId, 10);
  const next = getNextMatch(matches);

  if (!next) {
    return { color: null, name: null, field: null, time: null };
  }

  const alliance = next.alliances.find(a => a.teams.some(t => t.team.id === teamId));

  return {
    color: alliance?.color ?? null,
    name: next.name,
    field: next.field,
    time: next.scheduled,
  };
});
