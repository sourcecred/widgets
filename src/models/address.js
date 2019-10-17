// @flow

export function idFromGithubAddress(address: Array<string>): string {
  const [projectName, pluginName, likeWhat, _, id] = address;
  if (projectName !== "sourcecred") {
    throw new Error("Expecting sourcecred address");
  }
  if (pluginName !== "github") {
    throw new Error("Currently only supporting github addresses");
  }
  if (likeWhat !== "USERLIKE") {
    throw new Error("Expecting github address to be a USERLIKE");
  }
  // We're ignoring the exact subtype, so long as it's a USERLIKE.
  return id;
}
