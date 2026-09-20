import { createHandler } from './_utils.js';

export default createHandler((matches, query) => {
  const teamId = parseInt(query.teamId, 10);
  const now = new Date();

  const next = matches
    .filter(m => !m.started && m.scheduled && new Date(m.scheduled) > now)
    .sort((a, b) => new Date(a.scheduled) - new Date(b.scheduled))[0];

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
}, ['teamId']);
