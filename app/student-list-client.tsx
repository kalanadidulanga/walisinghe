"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { StudentFilters } from "@/components/student-filters"
import { StudentsTable } from "@/components/students-table"
import { AddStudentDialog } from "@/components/add-student-dialog"
import type { FilterState, Student } from "@/types/student"
import { Plus } from "lucide-react"

interface StudentListClientProps {
  initialStudents: Student[]
}

export default function StudentListClient({ initialStudents }: StudentListClientProps) {
  const [students, setStudents] = useState(initialStudents)
  const [filters, setFilters] = useState<FilterState>({
    grade: "all",
    class: "all",
    gender: "all",
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

//   const handleAddStudent = async (data: Student) => {
//     // Here you would typically make an API call to add the student
//     console.log("Adding student:", data)
//     // After successfully adding the student, update the local state
//     setStudents((prevStudents) => [...prevStudents, data])
//   }

  const filteredStudents = students.filter((student) => {
    if (filters.grade !== "all" && student.grade.toString() !== filters.grade) return false
    if (filters.class !== "all" && student.class !== filters.class) return false
    if (filters.gender !== "all" && student.gender.toLowerCase() !== filters.gender.toLowerCase()) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Student List</h1>
          <Button className="bg-[#4318FF] hover:bg-[#3A16E0]" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>

        {/* <StudentFilters filters={filters} onFilterChange={handleFilterChange} /> */}

        {/* <StudentsTable students={filteredStudents} /> */}

        <AddStudentDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
      </div>
    </div>
  )
}

