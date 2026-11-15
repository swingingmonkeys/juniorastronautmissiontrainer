# Supply Run to Bravo – Henhen Mars Mission Trainer

A Minecraft-style Mars survival and driving game by **Swinging Monkeys** for the NASA Space Apps Challenge 2026 challenge *Build a Junior Astronaut Mission Trainer*.

Base Alpha is shutting down. Your crew has to move all 20 crates of food 24 km across Mars to Base Bravo. The rover only carries 200 kg at a time and your pack holds just 40 items, so you make several trips (oxygen is refilled at each base), unless you explore deep caves for rare minerals and build a bigger rover.

## Use of Super Intelligence (SI)

**Concept and design by the Swinging Monkeys team**, the team members who took part in the project. The whole prototype was then **built with Super Intelligence (SI) assistance**: the code, the guide website and the documentation were generated and edited with **Claude (Anthropic)**, directed, tested and reviewed by the team. Every image, GIF and video in this repository has a visible "SI-generated" watermark (including the 30-second trailer on the guide page), every source file starts with an SI disclosure comment, and the HTML pages carry SI metadata tags. No NASA logos or branding are used. Full details: [AI_DISCLOSURE.md](AI_DISCLOSURE.md) (machine-readable: [ai-disclosure.json](ai-disclosure.json)).

## Play

Open `index.html` in any modern browser. It is a single file with no build step, server or installs. To host it free, turn on GitHub Pages for this repository (Settings → Pages → deploy from the `main` branch).

## Deploy with multiplayer on Vercel (public, free)

The `api/` folder holds three small serverless functions (`online`, `sync`, `leaderboard`) that give the public version live multiplayer, the online player count and the world leaderboard. They store data in a free Upstash Redis database. No npm packages are needed.

1. Put `index.html`, `README.md` and the whole `api` folder in this GitHub repository.
2. Sign in at [vercel.com](https://vercel.com) with GitHub, click **Add New → Project**, and import this repository. Keep the framework preset as **Other** and click **Deploy**.
3. In the new Vercel project, open the **Storage** tab, add **Upstash Redis** (free plan) and connect it to the project. This adds the database keys as environment variables automatically.
4. Go to **Deployments** and **Redeploy** so the functions pick up the keys.
5. Open your `https://<project-name>.vercel.app` link. The loading screen should show how many people are online, and the Multiplayer button should be enabled.

How it works: each player in multiplayer sends their rover position and block edits about three times a second, and gets back everyone else's. The shared world keeps the last 4,000 block edits, so builds stay even after players leave. Each player's best time is kept on the leaderboard; callsigns are filtered for bad words and impossible times are rejected.

Free-plan limits: polling uses a few database commands per player per second, which is fine for a class or hackathon but would need a paid plan (or a WebSocket service) for hundreds of players at once.

## Solo, multiplayer and the leaderboard

**Difficulty:** Solo can be Easy, Medium or Hard. Multiplayer is Medium or Hard only, and its storms are about 20% stronger (and last longer) than in solo play. Each difficulty has its own leaderboard.

**Lobbies:** multiplayer puts up to 5 astronauts in a lobby; when a lobby is full, the next player starts a new one.

**Badges:** finishing a mission (every crate delivered) earns badges for the difficulty, speed (under 36, 26 or 18 mission hours) and health (low radiation, oxygen never below 25%, hull never below 50%, no suit damage, 90% of food delivered), plus explorer badges. Badges are saved on the player's device.

A loading screen leads to a start screen where you pick **Solo** or **Multiplayer**. Every game uses the same map, so times are comparable: finish a mission that delivers every food crate and your mission time is posted to the **world leaderboard** of fastest crews (your best time is kept). The leaderboard and multiplayer work on the claude.ai version (signed in) and on a Vercel deployment (see above); on plain static hosting like GitHub Pages the game plays solo and remembers your best time on that device.

## Online multiplayer

When the game is opened on claude.ai by signed-in players, everyone playing at the same moment shares one Mars: you see each other's rovers and astronauts with callsigns, digging and building shows up for everyone online, and an **Online** counter shows how many astronauts are playing. Each crew runs its own food mission. Opened anywhere else (for example GitHub Pages or a downloaded copy) the game runs as single player, because online play uses claude.ai's live room service.

## What you do

- **Build your rover** from real-world-inspired parts: rocker-bogie suspension, Apollo-style wire-mesh wheels, NASA shape-memory tires, a Kilopower-style reactor, water-jacket radiation shielding and more, all under a launch mass limit.
- **Drive** with a physics engine: a rigid body on spring-and-damper suspension with rolling wheels. Hard landings crack food crates.
- **Survive Mars hazards:** dust storms, solar flares that scramble electronics, radiation, deep cold, toxic perchlorate dust and sharp rocks.
- **Dig, craft and build:** mine regolith, basalt, sand, ice and iron ore; craft bricks, glass, metal plates, airlock doors, ladders, lamps and outpost beacons; build sealed shelters before storms hit.
- **Explore caves** for rare titanium ore, opal and meteorite iron to build bigger cargo racks and better batteries.
- **Manage oxygen, power and food** using real consumption rates.

## Controls

| Key | Action |
| --- | --- |
| A / D | Drive or walk left / right |
| S / Space | Brake |
| U | Turn the rover around |
| E | Go outside (EVA) / climb back in |
| W / S on a ladder | Climb up / down |
| Click / tap | Dig a block |
| Right click, or Q for build mode | Place a block |
| 1–0, mouse wheel | Choose a block |
| I | Open or close the inventory |
| C | Fabricator (crafting) |
| F | Storm shelter and electronics safe mode |
| H / O / T | Cargo heater, stow panels, wait faster |
| M / P | Music, pause |

On phones and tablets, on-screen buttons cover the same controls.

## Real data used

The game runs on a snapshot of real numbers and events (1 real second = 1 mission minute):

- Mars gravity 3.71 m/s², about 590 W/m² of sunlight, air under 1% of Earth's pressure
- Oxygen use of 0.84 kg per person per day (NASA Baseline Values and Assumptions Document)
- Surface radiation of about 0.67 mSv per day measured by Curiosity's RAD (Hassler et al., 2014); NASA career limit of 600 mSv
- Real solar flares, such as the X9.0 flare of October 3, 2024 and the September 2017 event that more than doubled radiation at Curiosity
- The 2018 planet-wide dust storm (opacity τ ≈ 10.8) that ended the Opportunity mission
- Spirit stuck at "Troy" (2009), Curiosity wheel damage (2013), Phoenix perchlorate (2008), Opportunity's hematite "blueberries", MRO opal (2008), Curiosity's "Egg Rock" meteorite (2016), ICON's Mars Dune Alpha habitat, NASA Langley's Mars Ice Home concept

Numbers are simplified for learning. This is not a mission-planning tool, and it is not produced or endorsed by NASA.

## Tech

Plain HTML, CSS and JavaScript in one file. Graphics are drawn on a canvas, and the chiptune music is generated live with the Web Audio API, with no audio files.
