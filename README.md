# Cyberpunk 2077 FF06B5 Research Docs

This is a customized mkdocs instance for hosting my research notes on Cyberpunk 2077. The goal is to provide a more
organized and navigable experience for interested readers.

Hosted at [https://ff06b5.thedragon.dev](https://ff06b5.thedragon.dev)

# Subscribe to Changes

If you are here to subscribe to changes, follow the [gh-pages](https://github.com/Frosthaven/cyberpunk-ff06b5-research/tree/gh-pages) branch.

# How to Run
You will need a modern version of python installed.

## install mkdocs-material
```shell
pip install mkdocs mkdocs-material mkdocs-glightbox
```

## start dev server
```shell
mkdocs serve
```

## build and deploy docs to github pages
You may need to use the `--force` flag if you are overwriting an existing
deployment.
```shell
mkdocs gh-deploy --force
```

## build docs locally for self-hosting
```shell
mkdocs build
```
