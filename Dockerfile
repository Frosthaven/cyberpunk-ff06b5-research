# Extends the official MkDocs Material image with the plugins this site uses.
# The base image already includes mkdocs + mkdocs-material + git/openssh
# (so `gh-deploy` works), but not the glightbox plugin from mkdocs.yml.
FROM squidfunk/mkdocs-material:latest

RUN pip install --no-cache-dir mkdocs-glightbox

# The base image sets WORKDIR /docs and ENTRYPOINT ["mkdocs"],
# so the container is driven by passing mkdocs subcommands (serve, gh-deploy, build).
