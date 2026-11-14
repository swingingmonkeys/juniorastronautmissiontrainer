// Tiny helper for Upstash Redis over its REST API (no npm packages needed).
// Vercel's Upstash Redis integration adds one of these pairs of environment variables.
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function pipeline(cmds) {
  if (!URL_ || !TOKEN) throw new Error('Redis is not connected. Add Upstash Redis to this Vercel project (Storage tab), then redeploy.');
  const r = await fetch(URL_.replace(/\/$/, '') + '/pipeline', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmds),
  });
  if (!r.ok) throw new Error('Redis error ' + r.status);
  const out = await r.json();
  return out.map(o => { if (o && o.error) throw new Error(o.error); return o ? o.result : null; });
}

const BAD = ['fuck','shit','bitch','cunt','dick','cock','pussy','nigg','fag','slut','whore','rape','nazi','porn','sex','penis','vagina','asshole','bastard','retard'];
function cleanName(s) {
  let n = String(s || '').replace(/[^A-Za-z0-9 _.\-]/g, '').replace(/\s+/g, ' ').trim().slice(0, 16);
  const flat = n.toLowerCase().replace(/[^a-z]/g, '').replace(/0/g, 'o').replace(/1/g, 'i').replace(/3/g, 'e');
  if (!n || BAD.some(w => flat.includes(w))) n = 'Astronaut';
  return n;
}
const cleanId = s => String(s || '').replace(/[^A-Za-z0-9-]/g, '').slice(0, 48);

function send(res, code, body) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}
function body(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch (_) { return {}; } }
  return req.body;
}
// count players seen in the last 12 seconds; optionally return the presences of one multiplayer lobby
async function readPlayers(withPeers, lobby) {
  const [flat] = await pipeline([['HGETALL', 'players']]);
  const now = Date.now(), peers = [], stale = [], lobbies = {};
  let count = 0, multi = 0;
  for (let i = 0; i < (flat || []).length; i += 2) {
    try {
      const v = JSON.parse(flat[i + 1]);
      if (now - v.ts > 12000) { stale.push(flat[i]); continue; }
      count++;
      if (v.mode === 'multi') {
        multi++;
        if (v.lobby) lobbies[v.lobby] = (lobbies[v.lobby] || 0) + 1;
        if (withPeers && v.lobby && v.lobby === lobby) peers.push({ id: flat[i], p: v.p || {} });
      }
    } catch (_) { stale.push(flat[i]); }
  }
  if (stale.length) pipeline([['HDEL', 'players', ...stale.slice(0, 200)]]).catch(() => {});
  return { count, multi, peers, lobbies };
}
module.exports = { pipeline, cleanName, cleanId, send, body, readPlayers };
