// GET  /api/leaderboard            -> top 25 fastest complete missions
// POST /api/leaderboard {pid,name,minutes,food,trips,lvl,mode} -> keeps each player's best time
const { pipeline, cleanId, cleanName, send, body } = require('./_redis');

async function top() {
  const [z] = await pipeline([['ZRANGE', 'lb', 0, 24, 'WITHSCORES']]);
  const ids = [], scores = [];
  for (let i = 0; i < (z || []).length; i += 2) { ids.push(z[i]); scores.push(Number(z[i + 1])); }
  if (!ids.length) return [];
  const [info] = await pipeline([['HMGET', 'lbinfo', ...ids]]);
  return ids.map((id, i) => { let d = {}; try { d = JSON.parse(info[i] || '{}'); } catch (_) {} return { id, minutes: scores[i], ...d }; });
}

module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') return send(res, 200, { rows: await top() });
    if (req.method !== 'POST') return send(res, 405, { error: 'Use GET or POST' });
    const b = body(req);
    const pid = cleanId(b.pid); if (!pid) return send(res, 400, { error: 'Missing pid' });
    const minutes = Math.round(Number(b.minutes));
    // a full 20-crate mission can't be done in under 5 mission hours
    if (!(minutes >= 300 && minutes < 100000)) return send(res, 400, { error: 'That time doesn’t look possible.' });
    const row = { name: cleanName(b.name), food: Math.max(0, Math.min(500, Math.round(Number(b.food) || 0))),
      trips: Math.max(0, Math.min(99, Math.round(Number(b.trips) || 0))), lvl: Math.max(0, Math.min(3, Math.round(Number(b.lvl) || 0))),
      mode: b.mode === 'multi' ? 'multi' : 'solo', at: new Date().toISOString().slice(0, 10) };
    const [old] = await pipeline([['ZSCORE', 'lb', pid]]);
    const oldN = old == null ? null : Number(old);
    let saved = false;
    if (oldN == null || minutes < oldN) {
      await pipeline([['ZADD', 'lb', minutes, pid], ['HSET', 'lbinfo', pid, JSON.stringify(row)]]);
      saved = true;
    }
    const best = saved ? minutes : oldN;
    const [better] = await pipeline([['ZCOUNT', 'lb', '-inf', '(' + best]]);
    send(res, 200, { saved, best, old: oldN, rank: Number(better) + 1 });
  } catch (e) { send(res, 500, { error: String(e.message || e) }); }
};
