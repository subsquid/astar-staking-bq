import { EventHandlerContext, SubstrateBatchProcessor, SubstrateEvent } from '@subsquid/substrate-processor'
import { Store, TypeormDatabase } from '@subsquid/typeorm-store'
import { bigQuery } from './common/big-query'
import { BondsBatch, RewardsBatch } from './common/entity-batches'
import * as mappings from './mappings'

// TODO PROPER DATASET NAME
const bq = bigQuery.dataset('dappstaking_astar')

const processor = new SubstrateBatchProcessor()
processor.setTypesBundle('astar')
processor.setDataSource({
    archive: 'https://astar.archive.subsquid.io/graphql',
    chain: 'wss://rpc.astar.network',
})

processor.addEvent('DappsStaking.Reward')
processor.addEvent('DappsStaking.BondAndStake')
processor.addEvent('DappsStaking.UnbondAndUnstake')
processor.addEvent('DappsStaking.UnbondUnstakeAndWithdraw')
processor.addEvent('DappsStaking.NominationTransfer')
processor.addEvent('DappsStaking.WithdrawFromUnregistered')

processor.run(new TypeormDatabase(), async (ctx) => {
    for (const block of ctx.blocks) {
        for (const item of block.items) {
            if (item.kind === 'event') {
                await processEventItems({
                    ...ctx,
                    block: block.header,
                    event: item.event as SubstrateEvent,
                })
            }
        }
    }

    const bqPromises: Promise<any>[] = []
    if (RewardsBatch.size > 0) bqPromises.push(bq.table('rewards').insert([...RewardsBatch]))
    if (BondsBatch.size > 0) bqPromises.push(bq.table('bonds').insert([...BondsBatch]))
    await Promise.all(bqPromises)
    RewardsBatch.clear()
    BondsBatch.clear()
})

async function processEventItems(ctx: EventHandlerContext<Store>) {
    ctx.log.debug(`!DEBGUG EVENT! ${ctx.event.id} ${ctx.event.name} ${ctx.event.args.toString()}`)
    switch (ctx.event.name) {
        case 'DappsStaking.Reward': {
            await mappings.dAppsStaking.events.handleReward(ctx)
            break
        }
        case 'DappsStaking.BondAndStake': {
            await mappings.dAppsStaking.events.handleBond(ctx)
            break
        }
        case 'DappsStaking.UnbondAndUnstake': {
            await mappings.dAppsStaking.events.handleUnbondAndUnstake(ctx)
            break
        }
        case 'DappsStaking.UnbondUnstakeAndWithdraw': {
            await mappings.dAppsStaking.events.handleUnbondUnstakeAndWithdrawn(ctx)
            break
        }
        case 'DappsStaking.NominationTransfer': {
            await mappings.dAppsStaking.events.handleNominationTransfer(ctx)
            break
        }
        case 'DappsStaking.WithdrawFromUnregistered': {
            await mappings.dAppsStaking.events.handleWithrawFromUnregistered(ctx)
            break
        }
        default:
    }
}
