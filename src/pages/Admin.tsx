
import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, BookOpen, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminDashboard from "@/components/admin/AdminDashboard";
import StudentsPage from "@/components/admin/StudentsPage";
import CoursesPage from "@/components/admin/CoursesPage";
import { useAuth } from "@/context/AuthContext";

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'students' | 'courses'>('dashboard');
  const { logout } = useAuth();

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
        <div className="mt-auto border-t pt-4">
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "Collapse" : "Expand"}
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-2 text-red-500 hover:text-red-600"
            onClick={logout}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </Button>
        </div>
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
