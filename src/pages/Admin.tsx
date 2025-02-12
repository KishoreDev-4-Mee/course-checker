
import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, BookOpen, PlusCircle, Edit, Trash2, User } from "lucide-react";
import { mockCourses, mockStudents } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

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

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'students' | 'courses'>('dashboard');

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
            variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
            className="w-full justify-start px-4 py-2 mb-2"
            onClick={() => setCurrentPage('dashboard')}
          >
            <LayoutDashboard className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Dashboard</span>}
          </Button>
          <Button
            variant={currentPage === 'students' ? 'default' : 'ghost'}
            className="w-full justify-start px-4 py-2 mb-2"
            onClick={() => setCurrentPage('students')}
          >
            <Users className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Students</span>}
          </Button>
          <Button
            variant={currentPage === 'courses' ? 'default' : 'ghost'}
            className="w-full justify-start px-4 py-2 mb-2"
            onClick={() => setCurrentPage('courses')}
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
          {currentPage === 'dashboard' && <AdminDashboard />}
          {currentPage === 'students' && <StudentsPage />}
          {currentPage === 'courses' && <CoursesPage />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
