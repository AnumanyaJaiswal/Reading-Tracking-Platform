import { useNavigate } from "react-router-dom";
function MembersPreview({members,totalMembers, clubId}) {
    const navigate = useNavigate();
    return (
        <div
            className="
                bg-white
                rounded-3xl
                border
                border-[#ECE3FA]
                shadow-xl
                p-8
            "
        >

            {/* Header */}

            <div className="flex justify-between items-center">

                <div>

                    <h2 className="
                        text-2xl
                        font-bold
                        text-[#4C3D63]
                    ">
                        👥 Club Members
                    </h2>


                    <p className="
                        text-[#8A7B9E]
                        mt-1
                    ">
                        {totalMembers} readers in this club
                    </p>

                </div>


                <button
                    onClick={() => navigate(`/clubs/${clubId}/members`)}
                    className="
                        text-[#B08DFF]
                        font-semibold
                        hover:underline
                        cursor-pointer
                    "
                >
                    View all
                </button>

            </div>



            {/* Members */}

            <div
                className="
                    mt-8
                    flex
                    flex-wrap
                    gap-5
                "
            >

                {
                    members
                    .slice(0,5)
                    .map((member)=>(
                        <div
                            key={member.id}
                            className="
                                flex
                                items-center
                                gap-3
                                bg-[#F8F3FF]
                                px-4
                                py-3
                                rounded-2xl
                            "
                        >

                            {/* Avatar */}

                            <div
                                className="
                                    w-10
                                    h-10
                                    rounded-full
                                    bg-[#B08DFF]
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                    font-bold
                                "
                            >
                                {member.username[0].toUpperCase()}
                            </div>


                            <span
                                className="
                                    text-[#4C3D63]
                                    font-medium
                                "
                            >
                                {member.username}
                            </span>


                        </div>
                    ))
                }


                {
                    totalMembers > members.length && (

                        <div
                            className="
                                flex
                                items-center
                                px-5
                                py-3
                                rounded-2xl
                                bg-[#FFF7EA]
                                text-[#8A6FB0]
                                font-semibold
                            "
                        >
                            + {totalMembers-members.length} more
                        </div>

                    )
                }


            </div>


        </div>
    )
}

export default MembersPreview;