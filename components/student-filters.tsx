"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterState {
  grade: string
  class: string
  gender: string
}

interface StudentFiltersProps {
  filters: FilterState
  onFilterChange: (key: keyof FilterState, value: string) => void
}

export function StudentFilters({ filters, onFilterChange }: StudentFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="w-full sm:w-48">
        <Select value={filters.grade} onValueChange={(value) => onFilterChange("grade", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Student Grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="10">Grade 10</SelectItem>
            <SelectItem value="11">Grade 11</SelectItem>
            <SelectItem value="12">Grade 12</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-48">
        <Select value={filters.class} onValueChange={(value) => onFilterChange("class", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Student Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="A">Class A</SelectItem>
            <SelectItem value="B">Class B</SelectItem>
            <SelectItem value="C">Class C</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-48">
        <Select value={filters.gender} onValueChange={(value) => onFilterChange("gender", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

