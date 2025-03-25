import { SelectOption } from './selectOption'

export enum FilterTypeEnum {
  range = 'range',
  number = 'number',
  combobox = 'combobox',
  rating = 'rating',
}

export interface BaseFilter {
  key: string
  title: string
}

export interface RangeFilter extends BaseFilter {
  type: FilterTypeEnum.range
  min: number
  max: number
}

export interface NumberFilter extends BaseFilter {
  type: FilterTypeEnum.number
  min: number
  max: number
}
export interface RatingFilter extends BaseFilter {
  type: FilterTypeEnum.rating
  max: number
}

export interface ComboboxFilter extends BaseFilter {
  type: FilterTypeEnum.combobox
  options: SelectOption[]
}

export type FilterType =
  | RangeFilter
  | NumberFilter
  | ComboboxFilter
  | RatingFilter

export type NumberResult = number
export type RatingResult = number
export type RangeResult = { min: number; max: number }
export type SelectResult = SelectOption[]

export interface FilterResult {
  [key: string]: NumberResult | RatingResult | RangeResult | SelectResult
}
