#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

export PATH="/opt/homebrew/opt/ruby/bin:/opt/homebrew/bin:$PATH"
export LANG="en_US.UTF-8"
export LC_ALL="en_US.UTF-8"
export LC_CTYPE="en_US.UTF-8"

if ! command -v bundle >/dev/null 2>&1; then
  echo "Bundler was not found. Install Homebrew Ruby with: brew install ruby" >&2
  exit 1
fi

bundle check >/dev/null 2>&1 || bundle install

exec bundle exec jekyll serve --livereload --host 127.0.0.1 --port "${PORT:-4000}"
