import { useEffect } from "react";

function AddToListModal({ open, onClose, onSelect }) {

    if (!open) return null;

    const options = [
        {
            label: "🌙 Want To Read",
            value: "WANT_TO_READ",
        },
        {
            label: "📖 Currently Reading",
            value: "CURRENTLY_READING",
        },
        {
            label: "🏆 Finished",
            value: "FINISHED",
        },
    ];

    useEffect(() => {
        if (open) {
            const pageHeight = document.documentElement.scrollHeight;
            const viewportHeight = window.innerHeight;
            window.scrollTo({
                top: pageHeight / 2 - viewportHeight / 2,
                behavior: "smooth",
            });
        }
    }, [open]);

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl p-8 w-100 shadow-2xl ">

                <h2 className="text-2xl font-bold text-[#4C3D63] mb-6 text-center">
                    ✨ Choose Your Reading Journey
                </h2>

                <div className="space-y-4">

                    {options.map((option) => (

                        <button
                            key={option.value}
                            onClick={() => onSelect(option.value)}
                            className="
                                w-full
                                py-4
                                rounded-2xl
                                bg-[#F8F4FF]
                                hover:bg-[#EADFFF]
                                transition
                            "
                        >
                            {option.label}
                        </button>

                    ))}

                </div>

                <button
                    onClick={onClose}
                    className="mt-6 w-full text-[#6B5A7A]"
                >
                    Cancel
                </button>

            </div>

        </div>
    );
}

export default AddToListModal;