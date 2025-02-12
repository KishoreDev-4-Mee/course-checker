
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { mockCourses, mockStudents } from "@/data/mockData";

const AdminDashboard = () => {
  const { toast } = useToast();

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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Pending Approvals</h1>
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
                  <div className="flex items-center space-x-4">
                    <User className="w-8 h-8 text-gray-400" />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {mockStudents.find(s => s.enrolledCourses.includes(course.id))?.name} ({mockStudents.find(s => s.enrolledCourses.includes(course.id))?.studentId})
                      </h3>
                      <p className="text-sm text-gray-500">
                        Course: {course.title} - {content.title}
                      </p>
                    </div>
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
  );
};

export default AdminDashboard;
