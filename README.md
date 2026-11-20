# 19 November 2026 — one image

An entry for make.fun's daily news-image contest: a program that writes one 1024×1024
poster summing up Thursday 19 November 2026, and a repo holding the poster it copies.

[![make.fun competition](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/c/news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/egirasyid/news-image-19nov-2026/rank.svg)](https://make.fun/c/news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/egirasyid/news-image-19nov-2026/reward.svg)](https://make.fun/c/news-image-20261119)

## What it is

`entry.png` is a dark editorial poster titled **19 NOVEMBER 2026** with six cards, one per
story of the day:

- **The Hague** — the ICJ found Myanmar committed genocide against the Rohingya, the first
  such ruling against a state.
- **Shenzhen · APEC** — Trump, Xi and Putin held their first trilateral summit; the joint
  statement promised more oil and formal nuclear talks.
- **Riyadh** — a Houthi attack damaged a tower in the capital's financial district; civil
  defence reported no casualties.
- **Markets** — Anthropic's record IPO, the largest listing on record, while the Nasdaq
  still fell 2.2%.
- **Antalya · COP31** — Tuvalu's Maina Talia pressed the climate summit on the stakes as a
  row over delayed IPCC reports deepened.
- **Nairobi** — Kenya contained its first Ebola outbreak, its last patient discharged 37
  days after the first case.

## How it runs

`main.ts` (Node 22, standard library only) checks that `entry.png` is a whole PNG within the
1 MiB and 1024×1024 limits and writes those exact bytes to `/output/entry.png`. It makes no
network calls, and two runs write the same bytes.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
