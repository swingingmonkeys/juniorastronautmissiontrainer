# Use of Super Intelligence (SI)

This file is the Super Intelligence (SI) disclosure for **Supply Run to Bravo**, our entry to the NASA Space Apps Challenge 2026 challenge *Build a Junior Astronaut Mission Trainer*. A machine-readable copy is in [`ai-disclosure.json`](ai-disclosure.json).

## Who did what

- **Concept and design: the Swinging Monkeys team.** The game idea, the mission (moving food from Base Alpha to Base Bravo), the gameplay, the learning goals and the choice of real Mars data were created by the team members who took part in the project.
- **Implementation: SI-assisted.** The whole prototype was built with SI assistance. The team described what it wanted and an AI assistant (**Claude, by Anthropic**, a large language model) generated and edited the code. The team directed the work, tested the game and decided what to keep.

## Where SI was used

| Part of the project | Files | How SI was used |
| --- | --- | --- |
| Game code (HTML, CSS, JavaScript, canvas graphics, Web Audio music) | `index.html`, and earlier versions `lebron.html`, `lebron3.0.html`, `lebron4.0.html`, `lebron5.0.html` | Generated and edited with Claude from the team's design |
| Multiplayer and leaderboard server code | `api/_redis.js`, `api/leaderboard.js`, `api/online.js`, `api/sync.js` | Generated with Claude |
| How-to-play guide website (text, layout and code) | `guide/index.html` | Written with Claude |
| Guide clips and screenshots | `guide/gifs/*.gif`, `guide/gifs/*.jpg`, `guide/img/*.jpg` | Recorded automatically by Claude from the SI-assisted game, with SI-written captions |
| Game screenshot | `lebron2.0.png` | Capture of the SI-assisted game |
| Documentation | `README.md`, this file | Drafted with Claude |

The game's graphics and music are drawn and synthesized by the SI-generated code at run time; there are no separate image or audio asset files in the game. No audio files are included in the project.

## How it is marked

- **Images and videos:** every image and animated GIF in the repository carries a visible "SI-generated · AI-assisted (Claude)" watermark in the bottom-right corner. Each file also carries the disclosure in its metadata (EXIF ImageDescription and Artist for JPEGs, a comment block for GIFs, text chunks for PNGs).
- **Code:** every source file starts with a short SI disclosure comment. The HTML pages also carry `si-generated` and `ai-disclosure` meta tags that link to `ai-disclosure.json`.
- **In the game:** the title screen shows "Concept and design by the Swinging Monkeys team. Code built with Super Intelligence (SI) assistance (Claude by Anthropic)." The guide's footer has a matching note.

## NASA branding

The project does not use, contain or modify any NASA logos, insignia, flags or mission identifiers. The text mentions NASA only as a source of real data (for example oxygen use from NASA's Baseline Values and Assumptions Document) and by the name of the event, NASA Space Apps Challenge 2026. The game is not produced or endorsed by NASA.
