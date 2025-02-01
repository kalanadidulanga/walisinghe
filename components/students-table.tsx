"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { Edit2, Trash2 } from "lucide-react"
import { deleteStudent } from "@/app/actions/student-actions"
import { useState } from "react"
import { EditStudentDialog } from "./edit-student-dialog"
import toast from "react-hot-toast"

interface Student {
  id: number
  name: string
  indexNumber: string
  dateOfBirth: Date
  guardianName: string
  phoneNumber: string
  grade: number
  class: string
  gender: "MALE" | "FEMALE"
  address: string
}

interface StudentsTableProps {
  students: Student[]
  onRefresh: () => void
}

export function StudentsTable({ students,onRefresh }: StudentsTableProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this student?")) {
      const result = await deleteStudent(id)
      if (!result.success) {
        toast.error("Failed to delete student")
      }
      onRefresh()
    }
  }

  const handleEdit = (student: Student) => {
    setSelectedStudent(student)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Index Number</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Guardian</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.indexNumber}</TableCell>
              <TableCell>{format(new Date(student.dateOfBirth), "PP")}</TableCell>
              <TableCell>{student.guardianName}</TableCell>
              <TableCell>{student.phoneNumber}</TableCell>
              <TableCell>{student.grade}</TableCell>
              <TableCell>{student.class}</TableCell>
              <TableCell>{student.gender}</TableCell>
              <TableCell>{student.address}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(student)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(student.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedStudent && (
        <EditStudentDialog student={selectedStudent} open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} onRefresh={onRefresh} />
      )}
    </div>
  )
}

