import type { Student } from "@/types/student"

export const students: Student[] = [
  {
    id: "1",
    name: "Didul Adeesha",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-s0XoQB0GMdhNO0nJkNqlE4ORpJ73Nj.png",
    grade: 10,
    class: "A",
    indexNo: 25066,
    dateOfBirth: "20005/08/21",
    guardianName: "Kalana Didulanga",
    phoneNumber: "+33757005467",
    gender: "Male",
  },
  // Duplicate the same student data for demonstration
  {
    id: "2",
    name: "Didul Adeesha",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-s0XoQB0GMdhNO0nJkNqlE4ORpJ73Nj.png",
    grade: 10,
    class: "A",
    indexNo: 25066,
    dateOfBirth: "20005/08/21",
    guardianName: "Kalana Didulanga",
    phoneNumber: "+33757005467",
    gender: "Male",
  },
  // Add more sample data as needed...
]

