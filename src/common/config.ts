import { lookupArchive } from '@subsquid/archive-registry'

const config = {
    chainName: 'astar',
    prefix: 'astar',
    dataSource: {
        chain: 'wss://rpc.astar.network',
    },
    typesBundle: 'astar',
    batchSize: 100,
    blockRange: {
        from: 0,
    },
    decimals: 10e18
}

export default config
