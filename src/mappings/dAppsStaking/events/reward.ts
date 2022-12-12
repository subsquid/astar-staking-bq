import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { RewardsBatch } from '../../../common/entity-batches'
import { UnknownVersionError } from '../../../common/errors'
import { encodeEvm, encodeId, toRealValue } from '../../../common/helpers'
import { Reward } from '../../../model'
import { DappsStakingRewardEvent } from '../../../types/events'

export interface EventData {
    amount: bigint
    account: Uint8Array
    smartContract: Uint8Array
    era: number
}

function getEventData(ctx: EventHandlerContext<Store>): EventData {
    const event = new DappsStakingRewardEvent(ctx)
    if (event.isV4) {
        const [account, smartContract, era, amount] = event.asV4
        return {
            account,
            amount,
            smartContract: smartContract.value,
            era,
        }
    }
    ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
    try {
        const [account, smartContract, era, amount] = ctx._chain.decodeEvent(ctx.event)
        return {
            account,
            amount,
            smartContract: smartContract.value,
            era,
        }
    } catch {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export async function handleReward(ctx: EventHandlerContext<Store>) {
    ctx.log.debug(`REWARD CALL ${ctx.event.call?.name}`)
    const data = getEventData(ctx as EventHandlerContext<Store>)
    const reward = new Reward({
        id: ctx.event.id,
        accountId: encodeId(data.account),
        timestamp: new Date(ctx.block.timestamp),
        blockNumber: ctx.block.height,
        extrinsicHash: ctx.event.extrinsic?.hash,
        amount: toRealValue(data.amount),
        era: data.era,
        contractAddress: encodeEvm(data.smartContract),
    })

    ctx.log.debug(`[REWARD] ${reward.id} ${reward.accountId} ${reward.contractAddress} ${reward.amount}`)

    RewardsBatch.add(reward)
}
