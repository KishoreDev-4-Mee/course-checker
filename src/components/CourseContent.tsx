
import { Check, X } from "lucide-react";
import { CourseContent as CourseContentType } from "../types";
import { motion } from "framer-motion";

interface CourseContentProps {
  content: CourseContentType;
  onMarkComplete: (contentId: string) => void;
}

export const CourseContent = ({ content, onMarkComplete }: CourseContentProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "rejected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-between p-4 rounded-lg bg-white shadow-sm mb-3 ${
        content.status === "completed" ? "border-l-4 border-green-500" : ""
      }`}
    >
      <div className="flex items-center space-x-4">
        {content.status === "completed" ? (
          <Check className="w-5 h-5 text-green-500" />
        ) : content.status === "rejected" ? (
          <X className="w-5 h-5 text-red-500" />
        ) : (
          <div
            className="w-5 h-5 rounded-full border-2 border-gray-300 cursor-pointer hover:border-primary transition-colors"
            onClick={() => onMarkComplete(content.id)}
          />
        )}
        <span
          className={`font-medium ${getStatusColor(content.status)}`}
        >
          {content.title}
        </span>
      </div>
      {content.status === "pending" && (
        <button
          onClick={() => onMarkComplete(content.id)}
          className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-md transition-colors"
        >
          Mark as Complete
        </button>
      )}
    </motion.div>
  );
};
