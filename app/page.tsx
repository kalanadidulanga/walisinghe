"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { StudentFilters } from "@/components/student-filters"
import { StudentsTable } from "@/components/students-table"
import { AddStudentDialog } from "@/components/add-student-dialog"
import { students } from "@/data/students"
import type { FilterState } from "@/types/student"
import { Plus } from "lucide-react"

export default function StudentList() {
  const [filters, setFilters] = useState<FilterState>({
    grade: "all",
    class: "all",
    gender: "all",
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleAddStudent = async (data: any) => {
    // Here you would typically make an API call to add the student
    console.log("Adding student:", data)
    // After successfully adding the student, you might want to refresh the students list
  }

  const filteredStudents = students.filter((student) => {
    if (filters.grade !== "all" && student.grade.toString() !== filters.grade) return false
    if (filters.class !== "all" && student.class !== filters.class) return false
    if (filters.gender !== "all" && student.gender.toLowerCase() !== filters.gender) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* <div className="mx-auto max-w-7xl"> */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Student List</h1>
          <Button className="bg-[#4318FF] hover:bg-[#3A16E0]" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>

        <StudentFilters filters={filters} onFilterChange={handleFilterChange} />

        <StudentsTable students={filteredStudents} />

        <AddStudentDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onSubmit={handleAddStudent} />
      {/* </div> */}
    </div>
  )
}

