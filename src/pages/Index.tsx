
import { useState } from "react";
import { CourseCard } from "@/components/CourseCard";
import { CourseContent } from "@/components/CourseContent";
import { mockCourses } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Index = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const { toast } = useToast();

  const selectedCourse = mockCourses.find(
    (course) => course.id === selectedCourseId
  );

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
  };

  const handleMarkComplete = (contentId: string) => {
    toast({
      title: "Completion Request Sent",
      description: "Your progress has been submitted for approval.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-8 text-center"
        >
          My Courses
        </motion.h1>

        {!selectedCourse ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={handleCourseSelect}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-3xl mx-auto"
          >
            <button
              onClick={() => setSelectedCourseId(null)}
              className="mb-6 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Courses
            </button>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedCourse.title}
              </h2>
              <p className="text-gray-500 mb-6">{selectedCourse.description}</p>
              <div className="space-y-4">
                {selectedCourse.contents.map((content) => (
                  <CourseContent
                    key={content.id}
                    content={content}
                    onMarkComplete={handleMarkComplete}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
