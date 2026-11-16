# Supply Run to Bravo: data and references

These are the real-world data, missions and documents behind the numbers and facts in the game (`index.html`). The game shows most of them in its **Mars data** card (Help → Mars data). Numbers are simplified for learning. This is not a mission-planning tool, and it is not produced or endorsed by NASA or the CSA.

Links marked ✔ were checked on 16 November 2026. Links marked *(unverified)* still need to be checked.

### Key sources

- ✔ [NASA Mars Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/marsfact.html) (NSSDC): gravity, solar irradiance (586.2 W/m², which the game rounds to about 590), atmosphere. The fact sheet gives mean surface gravity as 3.73 m/s². The game uses 3.71 m/s², the equatorial value often quoted by NASA.
- ✔ [Life Support Baseline Values and Assumptions Document (BVAD), NASA/TP-2015-218570/REV1, 2018](https://ntrs.nasa.gov/citations/20180001338): oxygen use per crew member.
- ✔ [Hassler et al. 2014, "Mars' Surface Radiation Environment Measured with the Mars Science Laboratory's Curiosity Rover", *Science* 343](https://ntrs.nasa.gov/citations/20180007641) (doi:10.1126/science.1244797): surface radiation dose.
- ✔ [NASA CCMC DONKI space weather database](https://kauai.ccmc.gsfc.nasa.gov/DONKI): solar flares and space weather events.
- ✔ [Canadian Space Agency: Growing healthy food in space and in remote areas](https://www.asc-csa.gc.ca/eng/sciences/food-production/growing-healthy-food-in-space-and-remote-areas.asp): food production on the Moon and in remote communities, which is background for the food-supply mission.
- *(unverified)* Zeitlin et al. 2013, "Measurements of Energetic Particle Radiation in Transit to Mars on the Mars Science Laboratory", *Science* 340: cruise radiation dose.
- *(unverified)* NASA-STD-3001 Vol. 1 (crew health standard): career radiation limit.

## 1. Numbers that drive the simulation

| Data | Value in game | Used for | Source |
|---|---|---|---|
| Mars surface gravity | 3.71 m/s² (38% of Earth) | Rover physics, jumps off the crater rim | NASA Mars Fact Sheet ✔ |
| Oxygen use per person | 0.84 kg/day (2 crew) | Oxygen gauge drain, tank planning, "Fresh Air" badge | NASA BVAD ✔ |
| Sunlight at Mars | about 590 W/m² above the atmosphere (43% of Earth) | Solar panel power; dust opacity τ reduces it | NASA Mars Fact Sheet ✔ (586.2 W/m²) |
| Surface radiation | 0.67 mSv/day | Background radiation dose on every drive | Curiosity RAD, Hassler et al. 2014 ✔ |
| Astronaut career radiation limit | 600 mSv | Radiation context, "Radiation Safe" badge | NASA-STD-3001 *(unverified)* |
| Food per person | 1.8 kg/day incl. packaging | Crates, crew-days of food | ISS figure. **Needs a citation**: check the BVAD food tables |
| Cruise radiation | 1.8 mSv/day inside the spacecraft | Flight-to-Mars mini-game | Curiosity RAD in cruise, Zeitlin et al. 2013 *(unverified)* |

## 2. Real events the game re-creates

| Event | Where in the game | Source named in game |
|---|---|---|
| Solar flares: X9.0 (3 Oct 2024), X8.7 (14 May 2024), X6.3 (22 Feb 2024), X8.2 (10 Sep 2017), X9.3 (6 Sep 2017) | The particle storm (flare) event picks one of these real flares | NASA/NOAA flare records (see DONKI ✔) |
| Sept 2017 event more than doubled surface radiation at Curiosity; MAVEN saw a planet-wide aurora | Flare card text | Curiosity RAD, MAVEN (NASA) |
| May 2024 storm: Curiosity measured 8,100 micrograys (about 30 chest X-rays) | Flare card text | Curiosity RAD (NASA, 2024) |
| 2018 planet-wide dust storm, τ about 10.8; Opportunity went silent 10 June 2018 | Dust storm cards, storm darkness | NASA Opportunity mission |
| Planet-wide storms about every 3 Mars years | Second storm card | NASA (general) |
| Spirit stuck at "Troy" (2009); Opportunity's five weeks in "Purgatory" dune (2005) | Getting-stuck message | NASA MER mission |
| Curiosity's aluminum wheels punctured by rocks from 2013 | Rocky plain warning, wheel damage | NASA MSL mission |
| Dust devils cleaned Spirit's and Opportunity's panels | Dust devil event cleans the panels | NASA MER mission |
| Phoenix found perchlorate (about 0.5%) in soil (2008) | Mars data card | NASA Phoenix mission |
| Perseverance: launched 30 July 2020, landed 18 Feb 2021 (203 days); entry at about 20,000 km/h, about 1,300 °C heat shield, parachute at about Mach 1.7 | Flight and landing mini-game | NASA Mars 2020 mission |
| Earth-Mars launch windows about every 26 months | Flight intro | NASA (general) |

## 3. Science facts in messages and building

- **Mars Reconnaissance Orbiter (MRO):** radar found buried ice (icy lowland zone), opal found in 2008 (cave mineral), and pits/"skylights" on Arsia Mons that may lead to lava tubes (lava tube zone).
- **Opportunity:** hematite "blueberries" at Meridiani Planum (iron ore block).
- **Curiosity:** "Egg Rock" iron meteorite, 2016 (meteorite block).
- **Ilmenite** (iron-titanium mineral) in Mars basalt (titanium ore).
- **Silica aerogel** insulated Sojourner, Spirit and Opportunity (opal message).
- **Rover parts:** rocker-bogie suspension (all NASA rovers since Sojourner), Apollo moon buggy wire-mesh wheels, NASA Glenn shape-memory (nickel-titanium) tires, NASA Kilopower/KRUSTY reactor test (2018, 1 to 10 kW).
- **Habitats:** ICON's 3D-printed Mars Dune Alpha for NASA's CHAPEA analog in Houston; NASA Langley's "Mars Ice Home" concept.
- **Environment:** about 95% CO₂ air at under 1% of Earth's pressure; about −60 °C average; blue sunsets; storm winds about 100 km/h that feel like a breeze; radio delay of several minutes.

## 4. Numbers that still need a source

- **Food 1.8 kg/person/day:** described as an ISS figure, but no document is named.
- **Average temperature −60 °C:** no source named.
- **The 2018 storm τ ≈ 10.8, cruise dose 1.8 mSv/day and the May 2024 measurement of 8,100 µGy:** the missions are named, but not the papers or news releases.
- **Game-design choices, not real data:** the 24 km route, rover part masses, battery sizes and the 2,300 kg launch limit.
