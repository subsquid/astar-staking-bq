import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { BondsBatch } from '../../../common/entity-batches'
import { toRealValue } from '../../../common/helpers'
import { Bond, BondType } from '../../../model'

export async function processStakeChange(
    ctx: EventHandlerContext<Store, { event: { extrinsic: { hash: true } } }>,
    stakerId: string,
    contractAddress: string,
    type: BondType,
    amount: bigint
) {
    const finalAmount = type === BondType.BOND ? amount : -amount
    const bond = new Bond({
        id: ctx.event.id,
        timestamp: new Date(ctx.block.timestamp),
        blockNumber: ctx.block.height,
        extrinsicHash: ctx.event.extrinsic?.hash,
        accountId: stakerId,
        amount: toRealValue(finalAmount),
        type,
        contractAddress,
    })
    ctx.log.debug(`[BOND] ${bond.id} ${bond.accountId} ${contractAddress} ${amount}`)

    BondsBatch.add(bond)
}
