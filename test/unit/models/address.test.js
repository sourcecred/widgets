"use strict";

const {idFromGithubAddress} = require("../../../lib/models/address");

test("Expect idFromGithubAddress to accept valid github user address", () => {
  // Given
  const address = ["sourcecred", "github", "USERLIKE", "USER", "credbot"];

  // When
  const id = idFromGithubAddress(address);

  // Then
  expect(id).toEqual("credbot");
});

test("Expect idFromGithubAddress to reject non github user addresses", async () => {
  // Given
  const unsupportedAddresses = [
    ["foo", "bar", "baz"],
    ["sourcecred", "totally-different-plugin", "USERLIKE", "USER", "credbot"],
    ["sourcecred", "github", "CANDYCANE", "sugar"],
  ];

  // When
  const fn = (address) => () => idFromGithubAddress(address);
  const run1 = fn(unsupportedAddresses[0]);
  const run2 = fn(unsupportedAddresses[1]);
  const run3 = fn(unsupportedAddresses[2]);

  // Then
  expect(run1).toThrow("Expecting sourcecred address");
  expect(run2).toThrow("Currently only supporting github addresses");
  expect(run3).toThrow("Expecting github address to be a USERLIKE");
});
