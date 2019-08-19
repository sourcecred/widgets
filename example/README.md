# SourceCred Widgets example

## Usage

```sh
export SOURCECRED_GITHUB_TOKEN=YOUR_GITHUB_TOKEN
./rebuild-widgets.sh
```

Then commit the output `site` directory to GitHub pages.

## Tweaking

The `repositories.txt` file contains a line-separated list of repositories to generate the widgets for.

If you'd like to add a `CNAME` file to the output, you can create it in the `static` folder, as this will be copied.

Changing parameters of the widgets invocation should be done in the `rebuild-widgets.sh` script, or by exporting the variables beforehand.
For example:

```sh
export SOURCECRED_GITHUB_TOKEN=YOUR_GITHUB_TOKEN
export SVG_MIN_CRED=4.5
export SVG_MAX_USERS=100
./rebuild-widgets.sh
```
