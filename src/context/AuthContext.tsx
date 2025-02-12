
import { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, role: UserRole, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users for demo
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    role: "admin" as UserRole,
    name: "Admin User"
  },
  {
    id: "2",
    email: "student@example.com",
    password: "student123",
    role: "student" as UserRole,
    name: "Student User"
  }
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (!mockUser) {
      throw new Error("Invalid credentials");
    }
    const { password: _, ...userWithoutPassword } = mockUser;
    setUser(userWithoutPassword as User);
  };

  const signup = async (email: string, password: string, role: UserRole, name: string) => {
    const exists = MOCK_USERS.some(u => u.email === email);
    if (exists) {
      throw new Error("User already exists");
    }
    const newUser: User = {
      id: String(MOCK_USERS.length + 1),
      email,
      role,
      name
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
