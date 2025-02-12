
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, LayoutDashboard, Users, BookOpen } from "lucide-react";
import { mockCourses } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleApprove = (courseId: string, contentId: string) => {
    toast({
      title: "Progress Approved",
      description: "Student's progress has been approved.",
    });
  };

  const handleReject = (courseId: string, contentId: string) => {
    toast({
      title: "Progress Rejected",
      description: "Student's progress has been rejected.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarOpen ? 240 : 80 }}
        className="bg-white border-r border-gray-200 py-6 flex flex-col"
      >
        <div className="px-4 mb-8 flex items-center">
          <LayoutDashboard className="w-6 h-6 text-primary" />
          {sidebarOpen && (
            <span className="ml-3 font-semibold text-gray-900">Admin Panel</span>
          )}
        </div>
        <nav className="flex-1">
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-2 mb-2"
          >
            <LayoutDashboard className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Dashboard</span>}
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-2 mb-2"
          >
            <Users className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Students</span>}
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-2 mb-2"
          >
            <BookOpen className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Courses</span>}
          </Button>
        </nav>
        <Button
          variant="ghost"
          className="mx-4"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "Collapse" : "Expand"}
        </Button>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            Pending Approvals
          </h1>
          <div className="bg-white rounded-lg shadow-sm">
            <div className="divide-y divide-gray-200">
              {mockCourses.map((course) =>
                course.contents
                  .filter((content) => content.status === "pending")
                  .map((content) => (
                    <div
                      key={content.id}
                      className="p-4 flex items-center justify-between"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {content.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Course: {course.title}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApprove(course.id, content.id)}
                          className="flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleReject(course.id, content.id)}
                          className="flex items-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
