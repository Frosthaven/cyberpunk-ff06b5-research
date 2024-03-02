# install mkdocs-material
```shell
pip install mkdocs-material mkdocs-glightbox
```

# start dev server
```shell
docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material
```

# build docs
```shell
docker run --rm -it -v ${PWD}:/docs squidfunk/mkdocs-material build
```

# deploy docs to github pages
```shell
docker run --rm -it -v ~/.ssh:/root/.ssh -v ${PWD}:/docs squidfunk/mkdocs-material gh-deploy
```
# same as the above but sets --ssh default
```shell
docker run --rm -it -v ${PWD}:/docs squidfunk/mkdocs-material gh-deploy --ssh
```
