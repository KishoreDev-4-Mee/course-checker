
export type ContentStatus = "pending" | "completed" | "rejected";

export interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  enrolledCourses: string[];
  avatar?: string;
}

export interface CourseContent {
  id: string;
  title: string;
  status: ContentStatus;
  completedAt?: Date;
  rejectionReason?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  contents: CourseContent[];
}
