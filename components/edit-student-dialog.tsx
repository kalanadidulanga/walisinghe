"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-modal"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { editStudent } from "@/app/actions/student-actions"
import toast from "react-hot-toast"
import { format } from "date-fns"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  indexNumber: z.string().min(1, "Index number is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  guardianName: z.string().min(2, "Guardian name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 characters"),
  grade: z.string().min(1, "Grade is required"),
  class: z.string().min(1, "Class is required"),
  gender: z.enum(["MALE", "FEMALE"]),
  address: z.string().min(5, "Address must be at least 5 characters"),
})

type FormValues = z.infer<typeof formSchema>

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

interface EditStudentDialogProps {
  student: Student
  open: boolean
  onOpenChange: (open: boolean) => void
  onRefresh: () => void
}

export function EditStudentDialog({ student, open, onOpenChange, onRefresh }: EditStudentDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: student.name,
      indexNumber: student.indexNumber,
      dateOfBirth: format(new Date(student.dateOfBirth), "yyyy-MM-dd"),
      guardianName: student.guardianName,
      phoneNumber: student.phoneNumber,
      grade: student.grade.toString(),
      class: student.class,
      gender: student.gender,
      address: student.address,
    },
  })

  const handleSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      const result = await editStudent(student.id, {
        ...data,
        grade: Number.parseInt(data.grade, 10),
      })
      if (result.success) {
        toast.success("Student updated successfully")
        onOpenChange(false)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Error updating student:", error)
      toast.error("Failed to update student. Please try again.")
    } finally {
      setIsSubmitting(false)
      onRefresh()
    }
  }

  return (
    <ResponsiveModal open={open} onOpenChange={onOpenChange}>
      <ResponsiveModalContent className="sm:max-w-[425px]">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Edit Student</ResponsiveModalTitle>
        </ResponsiveModalHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="indexNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Index Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter index number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guardianName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guardian's Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter guardian's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[6, 7, 8, 9, 10, 11, 12, 13].map((grade) => (
                          <SelectItem key={grade} value={grade.toString()}>
                            {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map((className) => (
                          <SelectItem key={className} value={className}>
                            {className}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter full address" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ResponsiveModalDescription className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button type="submit" className="bg-[#4318FF] hover:bg-[#3A16E0]" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </ResponsiveModalDescription>
          </form>
        </Form>
      </ResponsiveModalContent>
    </ResponsiveModal>
  )
}

