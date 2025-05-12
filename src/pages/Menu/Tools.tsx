import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar"; // Import Navbar

const Tools = () => {
  return (
    <>
      {/* Menambahkan Navbar */}
      <Navbar currentPage="All Tools" />

      <div className="bg-gray-100 min-h-screen flex justify-center items-center"> {/* Menambahkan flex untuk memusatkan konten */}
        {/* Main Content */}
        <div className="flex justify-center space-x-20 p-12"> {/* Menambah jarak antar kartu dengan space-x-20 */}
          
          {/* Document Summarizer Card */}
          <div className="w-[400px] h-[400px] hover:bg-grey hover:cursor-pointer">
            <h3 className="text-center font-bold text-xl mb-4">Document Summarizer</h3>
            {/* Membungkus gambar dengan Link agar gambar bisa diklik */}
            <Link to="/document-summarizer">
              <img src="summarizer-icon.png" alt="Summarizer Icon" className="mx-auto my-4 w-24 h-24" /> {/* Membesarkan gambar */}
            </Link>
          </div>

          {/* Video or Audio Transcription Card */}
          <div className="w-[400px] h-[400px] hover:bg-grey hover:cursor-pointer">
            <h3 className="text-center font-bold text-xl mb-4">Video or Audio Transcription</h3>
            {/* Membungkus gambar dengan Link agar gambar bisa diklik */}
            <Link to="/audio-video-transcription">
              <img src="transcription-icon.png" alt="Transcription Icon" className="mx-auto my-4 w-24 h-24" /> {/* Membesarkan gambar */}
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default Tools;
