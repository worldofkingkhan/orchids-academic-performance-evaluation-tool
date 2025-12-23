"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  fullName: z.string().min(2, "Name is too short"),
  role: z.enum(["Professor", "PhD Student"]),
  university: z.string().min(2, "University is required"),
  facultyDepartment: z.string().min(2, "Faculty/Department is required"),
  academicYear: z.string().min(4, "Academic year is required"),
  evaluationPhase: z.enum(["Before Training", "After Training"]),
  teachingQuality: z.coerce.number().min(0).max(25),
  scientificOutput: z.coerce.number().min(0).max(25),
  trainingProgress: z.coerce.number().min(0).max(25),
  academicSupervision: z.coerce.number().min(0).max(25),
})

export function EvaluationForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      university: "",
      facultyDepartment: "",
      academicYear: "2023-2024",
      teachingQuality: 0,
      scientificOutput: 0,
      trainingProgress: 0,
      academicSupervision: 0,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const akiScore = 
      values.teachingQuality + 
      values.scientificOutput + 
      values.trainingProgress + 
      values.academicSupervision

    const { error } = await supabase.from("evaluations").insert({
      full_name: values.fullName,
      role: values.role,
      university: values.university,
      faculty_department: values.facultyDepartment,
      academic_year: values.academicYear,
      evaluation_phase: values.evaluationPhase,
      teaching_quality: values.teachingQuality,
      scientific_output: values.scientificOutput,
      training_progress: values.trainingProgress,
      academic_supervision: values.academicSupervision,
      aki_score: akiScore,
    })

    if (error) {
      toast.error("Failed to submit evaluation")
      console.error(error)
      return
    }

    toast.success("Evaluation submitted successfully")
    router.push("/dashboard")
  }

  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-card p-8 shadow-sm">
      <div className="mb-8 space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Academic Performance Evaluation</h2>
        <p className="text-muted-foreground">Enter the candidate's details and performance indicators.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Dr. John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Professor">Professor</SelectItem>
                      <SelectItem value="PhD Student">PhD Student</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="university"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University</FormLabel>
                  <FormControl>
                    <Input placeholder="University of Algiers" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="facultyDepartment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Faculty / Department</FormLabel>
                  <FormControl>
                    <Input placeholder="Computer Science" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="academicYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Academic Year</FormLabel>
                  <FormControl>
                    <Input placeholder="2023-2024" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="evaluationPhase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Evaluation Phase</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select phase" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Before Training">Before Training</SelectItem>
                      <SelectItem value="After Training">After Training</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 rounded-lg bg-zinc-50 p-6 dark:bg-zinc-900">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Performance Indicators (0-25)</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="teachingQuality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teaching Quality</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="25" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scientificOutput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scientific Output</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="25" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="trainingProgress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Training Progress</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="25" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="academicSupervision"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Academic Supervision</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="25" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">Submit Evaluation</Button>
        </form>
      </Form>
    </div>
  )
}
