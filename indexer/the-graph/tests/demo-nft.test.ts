import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  afterAll,
  assert,
  beforeAll,
  clearStore,
  describe,
  test,
} from "matchstick-as/assembly/index";
import { handleTransferEvent } from "../src/demo-nft";
import { createTransferEvent } from "./demo-nft-utils";

describe("Describe entity assertions", () => {
  beforeAll(() => {
    const from = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    const to = Address.fromString("0x0000000000000000000000000000000000000002");
    const tokenId = new BigInt(0);
    const newTransferEvent = createTransferEvent(from, to, tokenId);
    handleTransferEvent(newTransferEvent);
  });

  afterAll(() => {
    clearStore();
  });

  test("DemoNFT entity created and owner field set", () => {
    // Check that exactly 1 DemoNFT entity exists
    assert.entityCount("DemoNFT", 1);

    // Check the id field (tokenId as string)
    assert.fieldEquals("DemoNFT", "0", "id", "0");

    // Check that the DemoNFT entity has the correct id and owner address
    assert.fieldEquals(
      "DemoNFT",
      "0", // tokenId as string, which is the id of the entity
      "owner",
      "0x0000000000000000000000000000000000000002"
    );
  });
});
