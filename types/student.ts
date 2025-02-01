export interface Student {
  id: number
  name: string
  avatar?: string
  indexNumber: string
  dateOfBirth: string
  guardianName: string
  phoneNumber: string
  grade: number
  class: string
  gender: "MALE" | "FEMALE"
  address: string
}

export interface FilterState {
  grade: string
  class: string
  gender: string
}

