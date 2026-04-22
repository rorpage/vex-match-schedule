export function checkApiToken(req, res) {
  const apiToken = process.env.API_TOKEN;
  if (apiToken && req.headers['x-api-token'] !== apiToken) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}

export function getRobotEventsToken(res) {
  const token = process.env.ROBOTEVENTS_TOKEN;
  if (!token) {
    res.status(500).json({ error: 'ROBOTEVENTS_TOKEN env var not set' });
    return null;
  }
  return token;
}

export function requireQueryParams(req, res, ...params) {
  const missing = params.filter(p => !req.query[p]);
  if (missing.length) {
    res.status(400).json({ error: `${missing.join(', ')} query param(s) are required` });
    return false;
  }
  return true;
}

export function createHandler(transform) {
  return async function handler(req, res) {
    if (!checkApiToken(req, res)) return;
    const token = getRobotEventsToken(res);
    if (!token) return;
    if (!requireQueryParams(req, res, 'teamId', 'eventId')) return;

    const { teamId, eventId } = req.query;
    const matches = await fetchMatchesFromApi(teamId, eventId, token, res);
    if (!matches) return;

    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
    return res.status(200).json(transform(matches));
  };
}

export async function fetchMatchesFromApi(teamId, eventId, token, res) {
  const url = `https://www.robotevents.com/api/v2/teams/${encodeURIComponent(teamId)}/matches?event[]=${encodeURIComponent(eventId)}`;
  try {
    const upstream = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    });
    if (!upstream.ok) {
      res.status(upstream.status).json({ error: `RobotEvents API error: ${upstream.status}` });
      return null;
    }
    const data = await upstream.json();
    return data.data ?? [];
  } catch (err) {
    res.status(502).json({ error: 'Failed to reach RobotEvents API', detail: err.message });
    return null;
  }
}
