
import { useState } from "react";
import { Edit, PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Course } from "@/types";
import { mockCourses } from "@/data/mockData";

const CoursesPage = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const handleAddCourse = () => {
    setShowForm(true);
    setEditingCourse(null);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleDeleteCourse = (courseId: string) => {
    toast({
      title: "Course Deleted",
      description: "Course has been removed successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
        <Button onClick={handleAddCourse}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingCourse ? "Edit Course" : "Add New Course"}
          </h2>
          <div className="space-y-4">
            <Input
              placeholder="Course Title"
              defaultValue={editingCourse?.title}
            />
            <Input
              placeholder="Description"
              defaultValue={editingCourse?.description}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button>Save</Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-sm p-6 space-y-4"
          >
            <h3 className="font-semibold text-gray-900">{course.title}</h3>
            <p className="text-sm text-gray-500">{course.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500">
                  {course.progress}% Complete
                </span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditCourse(course)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
