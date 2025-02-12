
import { Course } from "../types";
import { motion } from "framer-motion";

interface CourseCardProps {
  course: Course;
  onClick: (courseId: string) => void;
}

export const CourseCard = ({ course, onClick }: CourseCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 cursor-pointer"
      onClick={() => onClick(course.id)}
    >
      <div className="space-y-4">
        <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-500 rounded-full"
            style={{ width: `${course.progress}%` }}
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
        <p className="text-sm text-gray-500">{course.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-primary">
            {course.progress}% Complete
          </span>
          <span className="text-sm text-gray-400">
            {course.contents.length} lessons
          </span>
        </div>
      </div>
    </motion.div>
  );
};
