// POST /api/sync  {id, mode:'menu'|'solo'|'multi', p:{...presence}, ed:[[x,y,tile],...], cursor}
// Saves this player's presence and block edits; returns counts, other multiplayer players and new edits.
const { pipeline, cleanId, cleanName, send, body, readPlayers } = require('./_redis');
const TILES = new Set([0, 2, 3, 4, 5, 13, 14, 15, 16, 17, 19, 23]);
// atomically number the edits and append them to the shared world log (last 4000 kept)
const APPEND = `local by=ARGV[1]
local n=(#ARGV-1)/3
local last=redis.call('INCRBY',KEYS[2],n)
local first=last-n+1
local items={}
for i=0,n-1 do
  items[#items+1]='{"s":'..(first+i)..',"by":"'..by..'","x":'..ARGV[2+i*3]..',"y":'..ARGV[3+i*3]..',"t":'..ARGV[4+i*3]..'}'
end
redis.call('RPUSH',KEYS[1],unpack(items))
redis.call('LTRIM',KEYS[1],-4000,-1)
return last`;

module.exports = async (req, res) => {
  if (req.method !== 'POST') return send(res, 405, { error: 'Use POST' });
  try {
    const b = body(req);
    const id = cleanId(b.id); if (!id) return send(res, 400, { error: 'Missing id' });
    const mode = ['menu', 'solo', 'multi'].includes(b.mode) ? b.mode : 'menu';
    let p = (b.p && typeof b.p === 'object' && !Array.isArray(b.p)) ? b.p : {};
    if (JSON.stringify(p).length > 3000) p = {};
    if (p.n) p.n = cleanName(p.n);
    const cursor = Math.max(0, Math.floor(Number(b.cursor) || 0));
    const ed = (Array.isArray(b.ed) ? b.ed.slice(0, 40) : [])
      .filter(e => Array.isArray(e) && e.length === 3)
      .map(e => e.map(v => Math.floor(Number(v))))
      .filter(([x, y, t]) => x > 0 && x < 1400 && y > 0 && y < 94 && TILES.has(t));
    const writes = [['HSET', 'players', id, JSON.stringify({ mode, ts: Date.now(), p })]];
    if (ed.length && mode === 'multi') writes.push(['EVAL', APPEND, 2, 'edits', 'editseq', id, ...ed.flat().map(String)]);
    await pipeline(writes);
    const want = mode === 'multi';
    const { count, multi, peers } = await readPlayers(want);
    let edits = [];
    if (want) {
      const [list] = await pipeline([cursor === 0 ? ['LRANGE', 'edits', 0, -1] : ['LRANGE', 'edits', -500, -1]]);
      edits = (list || []).map(s => { try { return JSON.parse(s); } catch (_) { return null; } }).filter(e => e && e.s > cursor);
    }
    send(res, 200, { count, multi, peers, edits });
  } catch (e) { send(res, 500, { error: String(e.message || e) }); }
};
