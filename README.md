# Prez

A Padlet-style classroom board: draggable blocks, fullscreen present mode, save/load.

## Run locally

```bash
cd /Users/niccomino/Desktop/prez
python3 -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080)

Or open `index.html` directly in Chrome/Edge (fullscreen works best with a local server).

## Shortcuts

| Key | Action |
|-----|--------|
| `P` | Present selected block (or first block) |
| `←` `→` | Previous / next block in present mode |
| `Esc` | Exit present mode |
| `Delete` | Delete selected block |

## Save

- **Save** — downloads a `.prez.json` file to your machine
- **Open** — loads a saved board
- Boards also auto-save in browser `localStorage`
