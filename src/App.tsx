import { AuthProvider } from "./context/AuthContext";
import './App.css'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router";
import RegisterPage from "./pages/authentication/RegisterPage";
import LoginPage from "./pages/authentication/LoginPage"
import Tools from './pages/Menu/Tools';
import DocumentSummarizer from './pages/Menu/DocumentSummarizer';  
import AudioVideoTranscription from './pages/Menu/AudioVideoTranscription';  

function App() {
  return ( 
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<LoginPage/>} />
                <Route path="register" element={<RegisterPage/>} />
                {/* <Route path="forgot" element={<ForgotPage/>} /> */}
                {/* <Route path="dashboard" element={<DashboardPage/>} /> */}
                {/* <Route path="tools" element={<ToolsPage/>} /> */}
                <Route path="/Tools" element={<Tools />} />
                <Route path="/document-summarizer" element={<DocumentSummarizer />} />
                <Route path="/audio-video-transcription" element={<AudioVideoTranscription />} />
                {/* <Route path="profile" element={<ProfilePage/>} /> */}
            </Routes>
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
