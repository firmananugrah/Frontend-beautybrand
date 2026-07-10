import { FaBars } from "react-icons/fa";

const ChatHeader = ({
  user,
  navigate,
  openSidebar,
}) => {
  const initial =
    user?.username?.charAt(0).toUpperCase() || "U";

  const profilePhoto =
    localStorage.getItem("profilePhoto");

  return (
    <header className="h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 lg:px-8">

      {/* Left */}

      <div className="flex items-center gap-4">

        {/* Hamburger Mobile */}

        <button
          onClick={openSidebar}
          className="lg:hidden text-[#1A237E] text-xl"
        >
          <FaBars />
        </button>

        <div>

          <h1 className="text-lg md:text-xl font-bold text-[#1A237E]">
            BeautyBrain 
          </h1>

          <p className="hidden sm:block text-sm text-gray-500">
            Skincare Recommendation Assistant
          </p>

        </div>

      </div>

      {/* Right */}

      <button
        onClick={() => navigate("/profile")}
        className="flex items-center gap-3 hover:bg-gray-100 rounded-xl px-2 md:px-3 py-2 transition"
      >

        <div className="hidden md:block text-right">

          <h3 className="font-semibold text-gray-700">
            {user?.username}
          </h3>

          <p className="text-xs text-gray-400">
            My Profile
          </p>

        </div>

        {profilePhoto ? (

          <img
            src={profilePhoto}
            alt="Profile"
            className="w-11 h-11 rounded-full object-cover border-2 border-[#1A237E]"
          />

        ) : (

          <div className="w-11 h-11 rounded-full bg-[#1A237E] text-white flex items-center justify-center font-bold text-lg">

            {initial}

          </div>

        )}

      </button>

    </header>
  );
};

export default ChatHeader;