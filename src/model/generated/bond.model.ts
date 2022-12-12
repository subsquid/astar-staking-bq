import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import {BondType} from "./_bondType"

@Entity_()
export class Bond {
  constructor(props?: Partial<Bond>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("timestamp with time zone", {nullable: false})
  timestamp!: Date

  @Index_()
  @Column_("int4", {nullable: true})
  blockNumber!: number | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  extrinsicHash!: string | undefined | null

  @Column_("text", {nullable: false})
  accountId!: string

  @Column_("text", {nullable: false})
  amount!: string

  @Column_("varchar", {length: 6, nullable: false})
  type!: BondType

  @Column_("text", {nullable: false})
  contractAddress!: string
}
