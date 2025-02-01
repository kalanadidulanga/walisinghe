"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const studentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  indexNumber: z.string().min(1, "Index number is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  guardianName: z.string().min(2, "Guardian name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 characters"),
  grade: z.number().int().positive(),
  class: z.string().min(1, "Class is required"),
  gender: z.enum(["MALE", "FEMALE"]),
  address: z.string().min(5, "Address must be at least 5 characters"),
})

export async function addStudent(data: z.infer<typeof studentSchema>) {
  const validatedData = studentSchema.parse(data)

  try {
    const student = await prisma.student.create({
      data: {
        ...validatedData,
        dateOfBirth: new Date(validatedData.dateOfBirth),
      },
    })
    revalidatePath("/students")
    return { success: true, data: student }
  } catch (error) {
    console.error("Failed to add student:", error)
    return { success: false, error: "Failed to add student" }
  }
}

export async function getAllStudents() {
  try {
    const students = await prisma.student.findMany({
      orderBy: { name: "asc" },
    })
    return { success: true, data: students }
  } catch (error) {
    console.error("Failed to fetch students:", error)
    return { success: false, error: "Failed to fetch students" }
  }
}

export async function deleteStudent(id: number) {
  try {
    await prisma.student.delete({
      where: { id },
    })
    revalidatePath("/students")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete student:", error)
    return { success: false, error: "Failed to delete student" }
  }
}

export async function editStudent(id: number, data: z.infer<typeof studentSchema>) {
  const validatedData = studentSchema.parse(data)

  try {
    const student = await prisma.student.update({
      where: { id },
      data: {
        ...validatedData,
        dateOfBirth: new Date(validatedData.dateOfBirth),
      },
    })
    revalidatePath("/students")
    return { success: true, data: student }
  } catch (error) {
    console.error("Failed to edit student:", error)
    return { success: false, error: "Failed to edit student" }
  }
}

export async function searchStudents(query: string) {
  try {
    const students = await prisma.student.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { indexNumber: { contains: query } },
          { guardianName: { contains: query } },
        ],
      },
      orderBy: { name: "asc" },
    })
    return { success: true, data: students }
  } catch (error) {
    console.error("Failed to search students:", error)
    return { success: false, error: "Failed to search students" }
  }
}

