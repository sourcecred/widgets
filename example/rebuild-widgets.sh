#!/usr/bin/env bash

toplevel="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
example_dir="${toplevel}/example"
cd "${example_dir}"

die() {
    printf >&2 'fatal: %s\n' "$@"
    exit 1
}

# Check our dependencies.
[ -z "$(which node)" ] && die "Node must be installed and available in \$PATH"
[ -z "$(which yarn)" ] && die "Yarn must be installed and available in \$PATH"

# Make sure we have a token.
[ -z "${SOURCECRED_GITHUB_TOKEN}" ] && die "No SOURCECRED_GITHUB_TOKEN has been set."

# Find our repository list.
[ ! -e "repositories.txt" ] && die "A repositories.txt file is expected in the repository root."
REPOS="$(cat repositories.txt)"

# Rebuild sourcecred dependencies.
echo "Building SourceCred binaries."
cd "${example_dir}/sourcecred"
SOURCECRED_BIN="${example_dir}/sourcecred/bin"
yarn
yarn -s backend --output-path "${SOURCECRED_BIN}"

# Reload repository data.
echo "Loading repository data."
SOURCECRED_DIRECTORY="${example_dir}/sourcecred_data"
for repo in $REPOS; do
	SOURCECRED_DIRECTORY="${SOURCECRED_DIRECTORY}" node "${SOURCECRED_BIN}/sourcecred.js" load "${repo}" $WEIGHTS_OPT
done

# Copying static assets.
echo "Copying static assets"
target="${example_dir}/site"
[ -d "${target}" ] && rm -rf "${target}"
mkdir -p "${target}"
cp -r "${example_dir}/static/"* "${target}"

# Generate widgets.
echo "Generating widgets"
cd "${toplevel}"
yarn
for repo in $REPOS; do
	echo "Generating ${repo//\//-}-contributors.svg"
	SOURCECRED_DIRECTORY="${SOURCECRED_DIRECTORY}" node "${SOURCECRED_BIN}/sourcecred.js" scores "${repo}" | \
		./bin/contributor-wall-svg.js > "${target}/${repo//\//-}-contributors.svg"
done
