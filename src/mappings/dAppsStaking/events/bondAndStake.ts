import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { UnknownVersionError } from '../../../common/errors'
import { encodeEvm, encodeId } from '../../../common/helpers'
import { BondType } from '../../../model'
import { DappsStakingBondAndStakeEvent } from '../../../types/events'
import { processStakeChange } from '../utils/actions'

interface EventData {
    amount: bigint
    account: Uint8Array
    smartContract: Uint8Array
}

function getEventData(ctx: EventHandlerContext<Store>): EventData {
    const event = new DappsStakingBondAndStakeEvent(ctx)

    if (event.isV4) {
        const [account, smartContract, amount] = event.asV4
        return {
            account,
            amount,
            smartContract: smartContract.value,
        }
    }
    ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
    try {
        const [account, smartContract, amount] = ctx._chain.decodeEvent(ctx.event)
        return {
            account,
            amount,
            smartContract: smartContract.value,
        }
    } catch {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export async function handleBond(ctx: EventHandlerContext<Store>) {
    const data = getEventData(ctx)
    await processStakeChange(ctx, encodeId(data.account), encodeEvm(data.smartContract), BondType.BOND, data.amount)
}
