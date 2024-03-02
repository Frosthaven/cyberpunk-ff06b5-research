# install mkdocs-material
```shell
pip install mkdocs mkdocs-material mkdocs-glightbox
```

# start dev server
```shell
docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material
```

# build docs locally for self-hosting
```shell
mkdocs build
```

# build and deploy docs to github pages
```shell
mkdocs gh-deploy
```
