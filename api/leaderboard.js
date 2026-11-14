// GET  /api/leaderboard?diff=medium -> top 25 fastest complete missions on that difficulty
// POST /api/leaderboard {pid,name,minutes,food,trips,lvl,mode,diff} -> keeps each player's best time per difficulty
const { pipeline, cleanId, cleanName, send, body } = require('./_redis');
const DIFFS = ['easy', 'medium', 'hard'];
const okDiff = d => DIFFS.includes(d) ? d : 'medium';

async function top(diff) {
  const [z] = await pipeline([['ZRANGE', 'lb:' + diff, 0, 24, 'WITHSCORES']]);
  const ids = [], scores = [];
  for (let i = 0; i < (z || []).length; i += 2) { ids.push(z[i]); scores.push(Number(z[i + 1])); }
  if (!ids.length) return [];
  const [info] = await pipeline([['HMGET', 'lbinfo:' + diff, ...ids]]);
  return ids.map((id, i) => { let d = {}; try { d = JSON.parse(info[i] || '{}'); } catch (_) {} return { id, minutes: scores[i], ...d }; });
}

module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') { const u = new URL(req.url, 'http://x'); return send(res, 200, { rows: await top(okDiff(u.searchParams.get('diff'))) }); }
    if (req.method !== 'POST') return send(res, 405, { error: 'Use GET or POST' });
    const b = body(req);
    const diff = okDiff(b.diff);
    const pid = cleanId(b.pid); if (!pid) return send(res, 400, { error: 'Missing pid' });
    const minutes = Math.round(Number(b.minutes));
    // a full 20-crate mission can't be done in under 5 mission hours
    if (!(minutes >= 300 && minutes < 100000)) return send(res, 400, { error: 'That time doesn’t look possible.' });
    const row = { name: cleanName(b.name), food: Math.max(0, Math.min(500, Math.round(Number(b.food) || 0))),
      trips: Math.max(0, Math.min(99, Math.round(Number(b.trips) || 0))), lvl: Math.max(0, Math.min(3, Math.round(Number(b.lvl) || 0))),
      mode: b.mode === 'multi' ? 'multi' : 'solo', diff, at: new Date().toISOString().slice(0, 10) };
    const [old] = await pipeline([['ZSCORE', 'lb:' + diff, pid]]);
    const oldN = old == null ? null : Number(old);
    let saved = false;
    if (oldN == null || minutes < oldN) {
      await pipeline([['ZADD', 'lb:' + diff, minutes, pid], ['HSET', 'lbinfo:' + diff, pid, JSON.stringify(row)]]);
      saved = true;
    }
    const best = saved ? minutes : oldN;
    const [better] = await pipeline([['ZCOUNT', 'lb:' + diff, '-inf', '(' + best]]);
    send(res, 200, { saved, best, old: oldN, rank: Number(better) + 1 });
  } catch (e) { send(res, 500, { error: String(e.message || e) }); }
};
