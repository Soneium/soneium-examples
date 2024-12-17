import { Transfer as TransferEvent } from "../generated/DemoNFT/DemoNFT";
import { DemoNFT } from "../generated/schema";

export function handleTransferEvent(event: TransferEvent): void {
  // find from DemoNFT entity if it exists
  let entity = DemoNFT.load(event.params.tokenId.toString());

  if (entity) {
    // update the owner field
    entity.owner = event.params.to;

    // save the entity
    entity.save();

    return;
  }

  // create a new entity
  entity = new DemoNFT(event.params.tokenId.toString());

  // set the owner field
  entity.owner = event.params.to;

  // save the entity
  entity.save();
}
