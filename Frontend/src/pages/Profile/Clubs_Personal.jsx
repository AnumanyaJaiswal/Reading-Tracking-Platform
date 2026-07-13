import { useEffect, useState } from "react";
import { getMyClubs } from "../../services/clubs";
import ClubCard from "../../Components/Clubs/ClubCard";
import { Sparkles, Castle } from "lucide-react";
import { motion } from "framer-motion";


function Clubs_personal() {

    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchClubs = async () => {

            try {

                const data = await getMyClubs();
                setClubs(data);

            } catch (error) {

                console.log(error.message);

            } finally {
                setLoading(false)
            }

        }


        fetchClubs();

    }, [])

    if(loading) {

        return (

          <div className="m-1">
            Loading Clubs...
          </div>

        )

    }

    return (

        <div
            className="
                relative
                max-w-7xl
                mx-auto
                px-5
                sm:px-8
                py-10
                min-h-screen
            "
        >

            {/* Background glow */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -top-20
                    right-0
                    w-96
                    h-96
                    rounded-full
                    blur-3xl
                    opacity-30
                    -z-10
                "
                style={{
                    background:
                    "radial-gradient(circle,#D8C4FF,transparent)"
                }}
            />


            {/* Header */}

            <motion.div

                initial={{
                    opacity:0,
                    y:20
                }}

                animate={{
                    opacity:1,
                    y:0
                }}

                transition={{
                    duration:0.5
                }}

                className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-end
                    justify-between
                    gap-5
                "
            >

                <div>
                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-[#8B7BB5]
                            mb-3
                        "
                    >

                        <Sparkles size={18}/>

                        <span
                            className="
                                uppercase
                                tracking-[0.25em]
                                text-xs
                                font-medium
                            "
                        >
                            Your Realm
                        </span>

                    </div>


                    <h1
                        className="
                            text-4xl
                            sm:text-5xl
                            font-serif
                            font-bold
                            text-[#4C3D63]
                        "
                    >
                        My Clubs ✨
                    </h1>

                    <p
                        className="
                            mt-3
                            text-[#6B5A7A]
                            max-w-xl
                        "
                    >
                        Manage the reading circles you have created
                        and continue building magical communities.
                    </p>


                </div>

                <div
                    className="
                        flex
                        items-center
                        gap-3
                        px-5
                        py-3
                        rounded-2xl
                        bg-white/70
                        backdrop-blur-xl
                        border
                        border-[#ECE3FA]
                        shadow-sm
                        text-[#6B5A7A]
                    "
                >

                    <Castle size={20}/>

                    <span className="font-semibold">
                        {clubs.length} Clubs
                    </span>

                </div>

            </motion.div>

            {/* Clubs Grid */}

            {
                clubs.length > 0 ? (

                    <motion.div

                        initial={{
                            opacity:0
                        }}

                        animate={{
                            opacity:1
                        }}

                        transition={{
                            delay:0.2
                        }}

                        className="
                            grid
                            sm:grid-cols-2
                            lg:grid-cols-3
                            gap-8
                            mt-12
                        "
                    >
                        {
                            clubs.map((club)=>(

                                <motion.div

                                    key={club.id}

                                    whileHover={{
                                        y:-6
                                    }}

                                    transition={{
                                        duration:0.2
                                    }}

                                >

                                    <ClubCard
                                        club={club}
                                    />

                                </motion.div>

                            ))
                        }

                    </motion.div>

                ) : (


                    <motion.div

                        initial={{
                            opacity:0,
                            scale:0.95
                        }}

                        animate={{
                            opacity:1,
                            scale:1
                        }}

                        className="
                            mt-20
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-center
                            py-20
                            rounded-3xl
                            bg-white/60
                            backdrop-blur-xl
                            border
                            border-[#ECE3FA]
                        "
                    >

                        <Castle
                            size={45}
                            className="text-[#B08DFF]"
                        />


                        <h2
                            className="
                                mt-5
                                text-2xl
                                font-serif
                                font-bold
                                text-[#4C3D63]
                            "
                        >
                            No Clubs Created Yet
                        </h2>

                        <p
                            className="
                                mt-2
                                text-[#8A7B9E]
                                max-w-md
                            "
                        >
                            Create your first reading circle and invite
                            fellow book lovers into your world.
                        </p>

                    </motion.div>

                )
            }

        </div>
    )
}

export default Clubs_personal;