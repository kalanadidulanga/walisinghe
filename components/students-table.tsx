import Image from "next/image"
import type { Student } from "@/types/student"

interface StudentsTableProps {
  students: Student[]
}

export function StudentsTable({ students }: StudentsTableProps) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Student Name</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Grade</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Class</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Index No.</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Date of Birth</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Guardian's Name</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Phone number</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Gender</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-b">
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  {/* <Image
                    src={student.avatar || "/placeholder.svg"}
                    alt={student.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  /> */}
                  <span className="font-medium">{student.name}</span>
                </div>
              </td>
              <td className="py-3 px-4">{student.grade}</td>
              <td className="py-3 px-4">{student.class}</td>
              <td className="py-3 px-4">{student.indexNo}</td>
              <td className="py-3 px-4">{student.dateOfBirth}</td>
              <td className="py-3 px-4">{student.guardianName}</td>
              <td className="py-3 px-4">{student.phoneNumber}</td>
              <td className="py-3 px-4">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                  {student.gender}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

