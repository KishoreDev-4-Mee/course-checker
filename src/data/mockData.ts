
import { Course, Student } from "../types";

export const mockStudents: Student[] = [
  {
    id: "1",
    studentId: "STU001",
    name: "John Doe",
    email: "john@example.com",
    enrolledCourses: ["1", "2"],
  },
  {
    id: "2",
    studentId: "STU002",
    name: "Jane Smith",
    email: "jane@example.com",
    enrolledCourses: ["1"],
  },
];

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "React Fundamentals",
    description: "Master the basics of React development",
    progress: 30,
    contents: [
      { id: "1-1", title: "Introduction to React", status: "completed" },
      { id: "1-2", title: "Components and Props", status: "pending" },
      { id: "1-3", title: "State and Lifecycle", status: "pending" },
    ],
  },
  {
    id: "2",
    title: "Advanced JavaScript",
    description: "Deep dive into JavaScript concepts",
    progress: 60,
    contents: [
      { id: "2-1", title: "Closures", status: "completed" },
      { id: "2-2", title: "Promises", status: "completed" },
      { id: "2-3", title: "Async/Await", status: "pending" },
    ],
  },
];
