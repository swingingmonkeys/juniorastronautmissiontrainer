// Super Intelligence (SI) disclosure (NASA Space Apps Challenge 2026): concept and design by
// the Swinging Monkeys team; this code was generated with SI assistance (Claude by Anthropic) and
// reviewed by the team. See AI_DISCLOSURE.md.
// GET /api/online -> how many people have the game open, and how many are in multiplayer
const { send, readPlayers } = require('./_redis');
module.exports = async (req, res) => {
  try { const { count, multi } = await readPlayers(false); send(res, 200, { count, multi }); }
  catch (e) { send(res, 500, { error: String(e.message || e) }); }
};
