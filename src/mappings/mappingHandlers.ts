import { Event, Message, Block, Transaction } from "../types";
import {
  CosmosEvent,
  CosmosBlock,
  CosmosMessage,
  CosmosTransaction,
} from "@subql/types-cosmos";


export async function handleBlock(block: CosmosBlock): Promise<void> {
  const blockRecord = Block.create({
    id: block.block.id,
    height: BigInt(block.block.header.height),
  });
  await blockRecord.save();
}

export async function handleTransaction(tx: CosmosTransaction): Promise<void> {
  const transactionRecord = Transaction.create({
    id: tx.hash,
    blockHeight: BigInt(tx.block.block.header.height),
    timestamp: tx.block.block.header.time,
  });
  await transactionRecord.save();
}


export async function handleMessage(msg: CosmosMessage): Promise<void> {
  const messageRecord = Message.create({
    id: `${msg.tx.hash}-${msg.idx}`,
    blockHeight: BigInt(msg.block.block.header.height),
    txHash: msg.tx.hash,
    message: JSON.stringify(msg.msg),
  });
  await messageRecord.save();
}

export async function handleEvent(event: CosmosEvent): Promise<void> {
  const eventRecord = Event.create({
    id: `${event.tx.hash}-${event.msg.idx}-${event.idx}`,
    blockHeight: BigInt(event.block.block.header.height),
    txHash: event.tx.hash,
    message: JSON.stringify(event.msg),
    object: JSON.stringify(event.event),
  });

  await eventRecord.save();
}
