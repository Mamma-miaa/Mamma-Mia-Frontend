import type { components } from "@/apis/schema"

export type StoreStatus = "NORMAL" | "CHALLENGE"
export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"

export interface BasicFormState {
  storeId: string
  name: string
  status: StoreStatus
  category: string
  stationName: string
  address: string
  latitude: string
  longitude: string
  comment: string
}

export interface BusinessHourState {
  dayOfWeek: DayOfWeek
  openTime: string
  closeTime: string
  breakStart: string
  breakEnd: string
  lastOrder: string
  closed: boolean
}

export interface FacilitiesState {
  parking: boolean
  takeout: boolean
  delivery: boolean
  indoorRestroom: boolean
  outdoorRestroom: boolean
  groupSeating: boolean
}

export interface MenuState {
  id: string
  name: string
  price: string
  imageUrl: string
  imageFile: File | null
}

export const DAY_ORDER: { code: DayOfWeek; label: string }[] = [
  { code: "MONDAY", label: "월요일" },
  { code: "TUESDAY", label: "화요일" },
  { code: "WEDNESDAY", label: "수요일" },
  { code: "THURSDAY", label: "목요일" },
  { code: "FRIDAY", label: "금요일" },
  { code: "SATURDAY", label: "토요일" },
  { code: "SUNDAY", label: "일요일" },
]

export type StoreListItem = components["schemas"]["Store"]
