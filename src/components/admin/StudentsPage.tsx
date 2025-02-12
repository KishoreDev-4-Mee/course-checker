
import { useState } from "react";
import { Edit, PlusCircle, Trash2, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Student } from "@/types";
import { mockStudents } from "@/data/mockData";

const StudentsPage = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleAddStudent = () => {
    setShowForm(true);
    setEditingStudent(null);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleDeleteStudent = (studentId: string) => {
    toast({
      title: "Student Deleted",
      description: "Student has been removed successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        <Button onClick={handleAddStudent}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingStudent ? "Edit Student" : "Add New Student"}
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Student ID"
                defaultValue={editingStudent?.studentId}
              />
              <Input
                placeholder="Full Name"
                defaultValue={editingStudent?.name}
              />
              <Input
                placeholder="Email"
                type="email"
                defaultValue={editingStudent?.email}
              />
            </div>
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
        {mockStudents.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-lg shadow-sm p-6 space-y-4"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{student.name}</h3>
                <p className="text-sm text-gray-500">{student.studentId}</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <p className="text-sm text-gray-500">{student.email}</p>
              <p className="text-sm text-gray-500">
                {student.enrolledCourses.length} Courses Enrolled
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEditStudent(student)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteStudent(student.id)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsPage;
