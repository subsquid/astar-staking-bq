import * as ss58 from '@subsquid/ss58'
import config from './config'
import { getAddress } from '@ethersproject/address'
import { toHex } from '@subsquid/substrate-processor'
import { Big } from 'big.js'

export function encodeId(id: Uint8Array) {
    return ss58.codec(config.prefix).encode(id)
}

export function decodeId(id: string) {
    return ss58.codec(config.prefix).decode(id)
}

export function isAdressSS58(address: Uint8Array) {
    switch (address.length) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 32:
        case 33:
            return true
        default:
            return false
    }
}

export function encodeEvm(id: Uint8Array): string {
    return getAddress(toHex(id))
}

export const toRealValue = (planks: bigint | number, precision = 12) =>
    new Big(planks.toString()).div(config.decimals).toFixed(precision).toString()
