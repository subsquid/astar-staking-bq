import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result, Option} from './support'
import * as v4 from './v4'
import * as v12 from './v12'
import * as v17 from './v17'

export class DappsStakingBondAndStakeEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'DappsStaking.BondAndStake')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Account has bonded and staked funds on a smart contract.
   */
  get isV4(): boolean {
    return this._chain.getEventHash('DappsStaking.BondAndStake') === '042590a56807e3351faf948dab2a22fe138af945cd9e46b379a3f568ede79c4d'
  }

  /**
   * Account has bonded and staked funds on a smart contract.
   */
  get asV4(): [Uint8Array, v4.SmartContract, bigint] {
    assert(this.isV4)
    return this._chain.decodeEvent(this.event)
  }
}

export class DappsStakingNominationTransferEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'DappsStaking.NominationTransfer')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Nomination part has been transfered from one contract to another.
   * 
   * \(staker account, origin smart contract, amount, target smart contract\)
   */
  get isV17(): boolean {
    return this._chain.getEventHash('DappsStaking.NominationTransfer') === '4f17bfdd591d68aa34974d9299444b19ef6280de57f99b635a5179ef61aa5173'
  }

  /**
   * Nomination part has been transfered from one contract to another.
   * 
   * \(staker account, origin smart contract, amount, target smart contract\)
   */
  get asV17(): [Uint8Array, v17.SmartContract, bigint, v17.SmartContract] {
    assert(this.isV17)
    return this._chain.decodeEvent(this.event)
  }
}

export class DappsStakingRewardEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'DappsStaking.Reward')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Reward paid to staker or developer.
   */
  get isV4(): boolean {
    return this._chain.getEventHash('DappsStaking.Reward') === '8893e04840c35675d9756bedd440cb2cf3490c1aaae0bd1f0204c2fbcab411c8'
  }

  /**
   * Reward paid to staker or developer.
   */
  get asV4(): [Uint8Array, v4.SmartContract, number, bigint] {
    assert(this.isV4)
    return this._chain.decodeEvent(this.event)
  }
}

export class DappsStakingUnbondAndUnstakeEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'DappsStaking.UnbondAndUnstake')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Account has unbonded & unstaked some funds. Unbonding process begins.
   */
  get isV12(): boolean {
    return this._chain.getEventHash('DappsStaking.UnbondAndUnstake') === '042590a56807e3351faf948dab2a22fe138af945cd9e46b379a3f568ede79c4d'
  }

  /**
   * Account has unbonded & unstaked some funds. Unbonding process begins.
   */
  get asV12(): [Uint8Array, v12.SmartContract, bigint] {
    assert(this.isV12)
    return this._chain.decodeEvent(this.event)
  }
}

export class DappsStakingUnbondUnstakeAndWithdrawEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'DappsStaking.UnbondUnstakeAndWithdraw')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Account has unbonded, unstaked and withdrawn funds.
   */
  get isV4(): boolean {
    return this._chain.getEventHash('DappsStaking.UnbondUnstakeAndWithdraw') === '042590a56807e3351faf948dab2a22fe138af945cd9e46b379a3f568ede79c4d'
  }

  /**
   * Account has unbonded, unstaked and withdrawn funds.
   */
  get asV4(): [Uint8Array, v4.SmartContract, bigint] {
    assert(this.isV4)
    return this._chain.decodeEvent(this.event)
  }
}

export class DappsStakingWithdrawFromUnregisteredEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'DappsStaking.WithdrawFromUnregistered')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Account has fully withdrawn all staked amount from an unregistered contract.
   */
  get isV12(): boolean {
    return this._chain.getEventHash('DappsStaking.WithdrawFromUnregistered') === '042590a56807e3351faf948dab2a22fe138af945cd9e46b379a3f568ede79c4d'
  }

  /**
   * Account has fully withdrawn all staked amount from an unregistered contract.
   */
  get asV12(): [Uint8Array, v12.SmartContract, bigint] {
    assert(this.isV12)
    return this._chain.decodeEvent(this.event)
  }
}
