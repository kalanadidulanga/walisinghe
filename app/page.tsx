"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { StudentFilters } from "@/components/student-filters"
import { StudentsTable } from "@/components/students-table"
import { AddStudentDialog } from "@/components/add-student-dialog"
import type { FilterState } from "@/types/student"
import { Plus } from "lucide-react"
import { getAllStudents } from "./actions/student-actions"

export default function StudentList() {
  const [filters, setFilters] = useState<FilterState>({
    grade: "all",
    class: "all",
    gender: "all",
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [students, setStudents] = useState<any>([])

  const fetchStudents = async () => {
    const result = await getAllStudents()
    if (result.success) {
      console.log(result.data)
      setStudents(result.data)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const reFresh = () => {
    fetchStudents()
  }

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

        {/* <StudentFilters filters={filters} onFilterChange={handleFilterChange} /> */}

        <StudentsTable students={students} onRefresh={reFresh}/>

        <AddStudentDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onRefresh={reFresh} />
      {/* </div> */}
    </div>
  )
}

