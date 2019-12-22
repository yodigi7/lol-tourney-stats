import { expect } from "chai";
import { RiotMatch } from "../src/riotInterfaces";
import { riotMatch1, person1match1 } from "./mock-matches";
import { MatchParser } from "../src/match-parser";
import "mocha";

describe("Match Parser", () => {
  it("riotMatchToPersonStatistics() correctly maps", () => {
    let mockRiotMatch: RiotMatch = riotMatch1;
    let result: any = MatchParser.riotMatchToPersonStatistics(mockRiotMatch);
    result = result[0];
    expect(result).to.deep.equal(person1match1);
  });

  it("");
});
