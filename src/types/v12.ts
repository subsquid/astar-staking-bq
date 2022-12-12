import type {Result, Option} from './support'

export type SmartContract = SmartContract_Evm | SmartContract_Wasm

export interface SmartContract_Evm {
  __kind: 'Evm'
  value: Uint8Array
}

export interface SmartContract_Wasm {
  __kind: 'Wasm'
  value: Uint8Array
}
