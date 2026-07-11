import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Crown } from "lucide-react";
import { useEffect, useState } from "react";
import { getClubDetails } from "../services/clubs";
import Loader from "../Components/Loader";


function ClubMembers(){

    const {clubId}=useParams();

    const navigate = useNavigate();

    const [members,setMembers]=useState([]);
    const [club,setClub]=useState(null);


    useEffect(()=>{

        const fetchMembers=async()=>{

            try{

                const data=await getClubDetails(clubId);

                setMembers(data.members);
                setClub(data);

            }catch(error){
                console.log(error);
            }

        }

        fetchMembers();

    },[clubId])


    if(!club){
        return <Loader/>
    }


    return (

        <div className="
            max-w-5xl
            mx-auto
            px-8
            py-10
        ">


            {/* Header */}

            <div className="
                flex
                items-center
                gap-4
                mb-10
            ">


                <button
                    onClick={()=>navigate(-1)}
                    className="
                        p-3
                        rounded-full
                        bg-[#F8F3FF]
                        cursor-pointer
                    "
                >
                    <ArrowLeft/>
                </button>


                <div>

                    <h1 className="
                        text-4xl
                        font-serif
                        font-bold
                        text-[#4C3D63]
                    ">
                        👥 {club.name} Members
                    </h1>


                    <p className="
                        text-[#8A7B9E]
                        mt-2
                    ">
                        {members.length} readers are part of this club
                    </p>

                </div>


            </div>



            {/* Members */}

            <div className="
                bg-white
                rounded-3xl
                border
                border-[#ECE3FA]
                shadow-xl
                p-8
                space-y-5
            ">


            {
                members.map((member)=>(
                    
                    <div
                        key={member.id}
                        className="
                            flex
                            items-center
                            justify-between
                            p-4
                            rounded-2xl
                            bg-[#FFF9F6]
                        "
                    >


                        <div className="
                            flex
                            items-center
                            gap-4
                        ">


                            <div
                                className="
                                    w-12
                                    h-12
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


                            <div>

                                <h3 className="
                                    font-semibold
                                    text-[#4C3D63]
                                ">
                                    {member.username}
                                </h3>


                                <p className="
                                    text-sm
                                    text-[#9A8CA6]
                                ">
                                    Joined{" "}
                                    {new Date(member.joinedAt)
                                    .toLocaleDateString()}
                                </p>

                            </div>


                        </div>



                        {
                            member.id === club.owner.id && (

                                <Crown
                                    className="text-[#E7C66D]"
                                />

                            )
                        }


                    </div>

                ))
            }


            </div>


        </div>

    )

}


export default ClubMembers;