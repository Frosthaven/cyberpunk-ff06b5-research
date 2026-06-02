image     := "cyberpunk-ff06b5-docs"
container := "cyberpunk-ff06b5-docs-dev"
port      := "8000"

# Start the local dev server (default).
default: dev

# Build the docker image (mkdocs-material + glightbox plugin).
build:
    docker build -t {{image}} .

# Serve the docs locally with live reload, opening http://localhost:{{port}}
dev: build
    #!/usr/bin/env sh
    URL="http://localhost:{{port}}"
    printf '\n  📖  Docs serving at \033[1;36m%s\033[0m  (Ctrl+C to stop)\n\n' "$URL"
    # Open the browser shortly after the server comes up (cross-platform, best-effort).
    ( sleep 4 && just open ) >/dev/null 2>&1 &
    docker run --rm -it \
        --name {{container}} \
        -p {{port}}:8000 \
        -v "{{justfile_directory()}}":/docs \
        {{image}} serve --livereload --dev-addr 0.0.0.0:8000

# Open the running docs in your default browser (mac/linux/windows).
open:
    #!/usr/bin/env sh
    URL="http://localhost:{{port}}"
    if command -v xdg-open >/dev/null 2>&1; then xdg-open "$URL";        # linux
    elif command -v open >/dev/null 2>&1; then open "$URL";              # macos
    elif command -v explorer.exe >/dev/null 2>&1; then explorer.exe "$URL";  # windows (wsl/git-bash)
    elif command -v start >/dev/null 2>&1; then start "" "$URL";         # windows (cmd)
    else echo "Could not detect a browser opener — visit $URL manually."; fi

# Stop the running dev server container.
shutdown:
    -docker stop {{container}}

# Build the static site into ./site (gitignored).
site: build
    docker run --rm -it \
        -v "{{justfile_directory()}}":/docs \
        {{image}} build

# Deploy is intentionally disabled locally — publish via the "Deploy docs"
# GitHub Action so we never push uncommitted local changes to the live site.
# To run it from the terminal:  gh workflow run "Deploy docs"
#
# If you ever need a manual local deploy, uncomment the recipe below. It mounts
# your SSH keys + git config so the container can push over git@github.com, and
# it will deploy your WORKING TREE (including uncommitted edits).
# deploy: build
#     docker run --rm -it \
#         -v "{{justfile_directory()}}":/docs \
#         -v "$HOME/.ssh":/root/.ssh:ro \
#         -v "$HOME/.gitconfig":/root/.gitconfig:ro \
#         {{image}} gh-deploy --force
