import { JSX } from 'react'

export interface InfoItem {
  title: string
  values: JSX.Element[]
  seeAll?: boolean
  onSeeAll?: () => void
  seeAllText?: string
}
