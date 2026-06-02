# Cyberpunk 2077 FF06B5 Research Docs

This is a customized mkdocs instance for hosting my research notes on Cyberpunk 2077. The goal is to provide a more
organized and navigable experience for interested readers.

Hosted at [https://ff06b5.thedragon.dev](https://ff06b5.thedragon.dev)

# Subscribe to Changes

If you are here to subscribe to changes, follow the [gh-pages](https://github.com/Frosthaven/cyberpunk-ff06b5-research/tree/gh-pages) branch.

# How to Run

The site runs in Docker and is driven with [`just`](https://github.com/casey/just),
so the only things you need installed are **Docker** and **just**. The first
command builds a small image (MkDocs Material + the glightbox plugin) and caches
it for subsequent runs.

## just commands

| Command | What it does |
| --- | --- |
| `just` / `just dev` | Build the image and start the live-reload dev server, then open it in your browser. |
| `just open` | Open the running docs at <http://localhost:8000> in your default browser (mac/linux/windows). |
| `just shutdown` | Stop the running dev server container. |
| `just site` | Build the static site into `./site/` (gitignored) for self-hosting. |
| `just build` | (Re)build the Docker image only. |

Editing any file under `docs/` (or `mkdocs.yml`) live-reloads the open browser tab.

## start the dev server
```shell
just
```
Then visit <http://localhost:8000> (it also opens automatically).

# How to Deploy

Deployment publishes the built site to the `gh-pages` branch, which GitHub Pages
serves at <https://ff06b5.thedragon.dev>.

Deploy is done through the **"Deploy docs" GitHub Action**, not locally — this
guarantees the live site always matches committed-and-pushed content (a local
deploy would publish your uncommitted working-tree changes). So: **commit and
push first, then deploy.**

Trigger it either way:

- **GitHub UI:** Actions tab → "Deploy docs" → "Run workflow".
- **CLI:** `gh workflow run "Deploy docs"`

The workflow installs MkDocs and runs `mkdocs gh-deploy --force` using the
repo's `GITHUB_TOKEN` (no SSH keys or secrets to configure), and preserves the
custom domain via `docs/CNAME`.

> A local deploy recipe exists but is intentionally commented out in the
> `justfile`. Uncomment it only if you knowingly need to publish your local
> working tree.

# Running without Docker (optional)

You can also run MkDocs directly with a modern Python install:

```shell
pip install mkdocs mkdocs-material mkdocs-glightbox
mkdocs serve          # dev server
mkdocs build          # static build into ./site
mkdocs gh-deploy --force   # manual deploy (publishes your local working tree)
```
