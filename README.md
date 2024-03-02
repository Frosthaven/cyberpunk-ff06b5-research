# Cyberpunk 2077 FF06B5 Research Docs

This is a customized mkdocs instance for hosting my research notes on Cyberpunk 2077. The goal is to provide a more
organized and navigable experience for interested readers.

# How to Use
You will need a modern version of python installed.

## install mkdocs-material
```shell
pip install mkdocs mkdocs-material mkdocs-glightbox
```

## start dev server
```shell
docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material
```


## build and deploy docs to github pages
```shell
mkdocs gh-deploy
```

## build docs locally for self-hosting
```shell
mkdocs build
```
