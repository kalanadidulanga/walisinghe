export interface Student {
    id: string
    name: string
    avatar: string
    grade: number
    class: string
    indexNo: number
    dateOfBirth: string
    guardianName: string
    phoneNumber: string
    gender: "Male" | "Female"
  }
  
  export interface FilterState {
    grade: string
    class: string
    gender: string
  }
  
  