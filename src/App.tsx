import { AuthProvider } from "./context/AuthContext";
import './App.css'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router";
import RegisterPage from "./pages/authentication/RegisterPage";

function App() {
  return ( 
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                {/* <Route path="login" element={<LoginPage/>} /> */}
                <Route path="register" element={<RegisterPage/>} />
                {/* <Route path="forgot-password" element={<ForgotPage/>} /> */}
                {/* <Route path="dashboard" element={<DashboardPage/>} /> */}
                {/* <Route path="tools" element={<ToolsPage/>} /> */}
                {/* <Route path="profile" element={<ProfilePage/>} /> */}
            </Routes>
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
