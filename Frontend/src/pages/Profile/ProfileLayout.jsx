import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import ProfileTab from "../../Components/ProfileTab";
import Footer from "../../Components/Footer";

function ProfileLayout() {
  return (
    <div className="min-h-screen bg-[#FFF9F6] flex flex-col">

      {/* Main Section */}
      <div className="flex flex-1">

        <Sidebar />

        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1
              className="
                text-4xl
                font-serif
                font-bold
                text-[#4C3D63]
              "
            >
              My Profile
            </h1>
          </div>

          <div
            className="
              inline-flex
              gap-2
              p-2
              rounded-full
              bg-[#F4EDFF]
              border border-[#F0E5FF]
              mb-8
            "
          >
            <ProfileTab to="/profile/stats" label="Stats" />
            <ProfileTab to="/profile/lists" label="Lists" />
            <ProfileTab to="/profile/reviews" label="Reviews" />
            <ProfileTab to="/profile/clubs" label="Clubs" />
          </div>

          <Outlet />
        </main>
      </div>

      {/* Full Width Footer */}
      <Footer />
    </div>
  );
}

export default ProfileLayout;