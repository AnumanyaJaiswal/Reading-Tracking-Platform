import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import { useState } from "react";
import BookSelectionModal from "../Components/BookSelectionModal";
import { createClub } from "../services/clubs";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function CreateClub() {
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [creating, setCreating] = useState(false);
    const [description, setDescription] = useState("");
    const [coverImage, setCoverImage] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [showBookModal, setShowBookModal] = useState(false);

    const handleCreateClub = async () => {

        if (!name.trim()) {
            alert("Please enter a club name.");
            return;
        }

        if (!description.trim()) {
            alert("Please enter a description.");
            return;
        }

        if (!selectedBook) {
            alert("Please choose a current book.");
            return;
        }

        try {

            setCreating(true);

            const formData = new FormData();

            formData.append("name", name);
            formData.append("description", description);

            if (coverImage) {
                formData.append("coverImage", coverImage);
            }

            formData.append("googleBookId", selectedBook.id);
            formData.append("bookTitle", selectedBook.title);
            formData.append(
                "bookAuthors",
                JSON.stringify(selectedBook.authors || [])
            );
            formData.append(
                "bookThumbnail",
                selectedBook.thumbnail || ""
            );

            const data = await createClub(formData);

            alert("✨ Club created successfully!");

            navigate(`/clubs/${data.id}`);

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to create club."
            );

        } finally {

            setCreating(false);

        }

    };

    return (
        <div>
            <div className="flex">
                <Sidebar />

                <div className="md:ml-72 min-h-screen w-full bg-[#FFFDF8]">

                    <div className="max-w-4xl mx-auto pt-24 pb-12 px-4 sm:pt-16 sm:pb-16 sm:px-6 md:pt-16 md:px-8">

                        {/* Back button */}
                        <button
                            onClick={() => navigate(-1)}
                            className="
                                flex items-center gap-2
                                text-[#6B5A7A]
                                hover:text-[#4C3D63]
                                text-sm font-medium
                                mb-4
                                sm:mb-6
                                transition
                                cursor-pointer
                            "
                        >
                            <ArrowLeft size={18} />
                            Back
                        </button>

                        <div
                            className="
                             mt-6 sm:mt-10
                             bg-white/70
                              backdrop-blur-xl
                             rounded-3xl sm:rounded-4xl
                              shadow-xl
                             border border-white
                             p-5 sm:p-8 md:p-10
                         "
                        >

                            {/* Circle Name */}

                            <div className="mb-6 sm:mb-8">

                                <label className="block text-base sm:text-lg font-semibold text-[#4C3D63] mb-2">
                                    ✨ Circle Name
                                </label>

                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    placeholder="Enter your circle's name..."
                                    className="
                                    w-full
                                    rounded-2xl
                                    border
                                    border-[#E7D9FF]
                                    px-4
                                    py-3
                                    sm:px-5
                                    sm:py-4
                                    outline-none
                                    focus:ring-2
                                 focus:ring-[#B08DFF]
                                 bg-white
                                "
                                />

                            </div>

                            {/* Description */}

                            <div className="mb-6 sm:mb-8">

                                <label className="block text-base sm:text-lg font-semibold text-[#4C3D63] mb-2">
                                    📜 Description
                                </label>

                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="5"
                                    placeholder="Tell everyone what your circle is about..."
                                    className="
                                        w-full
                                        rounded-2xl
                                        border
                                     border-[#E7D9FF]
                                        px-4
                                        py-3
                                        sm:px-5
                                        sm:py-4
                                        outline-none
                                        resize-none
                                        focus:ring-2
                                        focus:ring-[#B08DFF]
                                     bg-white
                                    "
                                />

                            </div>

                            {/* Cover Image */}

                            <div className="mb-6 sm:mb-8">

                                <label className="block text-base sm:text-lg font-semibold text-[#4C3D63] mb-2">
                                    🖼 Cover Image
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setCoverImage(file);
                                    }}
                                    className="
                                        w-full
                                        rounded-2xl
                                        border
                                        border-[#E7D9FF]
                                        px-4
                                        py-3
                                        sm:px-5
                                        sm:py-4
                                        outline-none
                                        focus:ring-2
                                        focus:ring-[#B08DFF]
                                     bg-white
                                    "
                                />

                            </div>

                            {/* Book */}

                            <div className="mb-8 sm:mb-10">

                                <label className="block text-base sm:text-lg font-semibold text-[#4C3D63] mb-4">
                                    📖 Current Book
                                </label>

                                {
                                    selectedBook ? (

                                        <div
                                            className="
                                            flex
                                            flex-col
                                            sm:flex-row
                                            items-start
                                            sm:items-center
                                            justify-between
                                            gap-4
                                            p-4
                                            sm:p-5
                                            rounded-2xl
                                            bg-[#F8F2FF]                               
                                            border
                                            border-[#E7D9FF]
                                        "
                                        >

                                            <div className="flex gap-4">

                                                <img
                                                    src={selectedBook.thumbnail}
                                                    alt={selectedBook.title}
                                                    className="w-16 sm:w-20 rounded-xl shadow shrink-0"
                                                />

                                                <div>

                                                    <h3 className="text-base sm:text-lg font-semibold text-[#4C3D63]">
                                                        {selectedBook.title}
                                                    </h3>

                                                    <p className="text-sm sm:text-base text-[#7C6A9A]">
                                                        {selectedBook.authors?.join(", ")}
                                                    </p>

                                                </div>

                                            </div>

                                            <button
                                                onClick={() => setShowBookModal(true)}
                                                className="
                                                w-full
                                                sm:w-auto
                                                px-4
                                                py-2
                                                rounded-xl
                                                bg-[#B08DFF]
                                                 text-white
                                            "
                                            >
                                                Change
                                            </button>

                                        </div>

                                    ) : (

                                        <button
                                            onClick={() => setShowBookModal(true)}
                                            className="
                                            w-full
                                            py-4
                                            rounded-2xl
                                            border-2
                                            border-dashed
                                            border-[#B08DFF]
                                            text-[#6B5A7A]
                                            hover:bg-[#F8F2FF]
                                            transition
                                        "
                                        >
                                            ✨ Choose Current Book
                                        </button>

                                    )
                                }

                            </div>

                            {/* Submit */}

                            <button
                                onClick={handleCreateClub}
                                disabled={creating}
                                className="
                                    w-full
                                 py-3
                                 sm:py-4
                                    rounded-2xl
                                    bg-linear-to-r
                                 from-[#B08DFF]
                                 via-[#D6B3FF]
                                 to-[#F6B6D1]
                                 text-white
                                 font-semibold
                                    text-base
                                    sm:text-lg
                                    shadow-lg
                                    hover:scale-[1.02]
                                    transition
                             "
                            >
                                {
                                    creating
                                        ? "Creating..."
                                        : "✨ Create Circle"
                                }
                            </button>

                        </div>

                    </div>

                </div>
            </div>

            <BookSelectionModal
                isOpen={showBookModal}
                onClose={() => setShowBookModal(false)}
                onSelectBook={(book) => setSelectedBook(book)}
            />
            <Footer />
        </div>
    );
}

export default CreateClub;