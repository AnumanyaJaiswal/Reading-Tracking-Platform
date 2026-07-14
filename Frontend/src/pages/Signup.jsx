import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

function Signup() {

    const navigate = useNavigate();
    const { register } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {

            await register({
                username: username.trim(),
                email: email.trim(),
                password,
            });
            navigate('/profile');

        } catch (error) {

            setError(error.message);

        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div
            className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-linear-to-b
            from-[#FFF9F6]
            via-[#FDF2F8]
            to-[#F4EDFF]
            px-4
        "
        >
            <div
                className="
                w-full
                max-w-md
                bg-white
                rounded-3xl
                border border-[#F0E5FF]
                shadow-[0_10px_30px_rgba(176,141,255,0.10)]
                p-8
            "
            >
                <div className="text-center mb-8">

                    <div className="text-4xl mb-3">
                        ✦
                    </div>

                    <h1
                        className="
                        text-5xl
                        font-serif
                        font-bold
                        bg-linear-to-r
                        from-[#B08DFF]
                        via-[#F6B6D1]
                        to-[#E7C66D]
                        bg-clip-text
                        text-transparent
                    "
                    >
                        Prophecy
                    </h1>

                    <p
                        className="
                        mt-3
                        text-sm
                        tracking-[0.2em]
                        text-[#6B5A7A]
                    "
                    >
                        BEGIN YOUR READING DESTINY
                    </p>

                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>

                    <div>
                        <label
                            htmlFor="username"
                            className="
                            block
                            mb-2
                            text-[#4C3D63]
                            font-medium
                        "
                        >
                            Username
                        </label>

                        <input
                            required
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="
                            w-full
                            px-4
                            py-3
                            rounded-xl
                            border
                            border-[#F0E5FF]
                            bg-[#FFF9F6]
                            outline-none
                            focus:border-[#B08DFF]
                            focus:ring-2
                            focus:ring-[#D8C4FF]
                            transition
                        "
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="
                            block
                            mb-2
                            text-[#4C3D63]
                            font-medium
                        "
                        >
                            Email
                        </label>

                        <input
                            required
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="
                            w-full
                            px-4
                            py-3
                            rounded-xl
                            border
                            border-[#F0E5FF]
                            bg-[#FFF9F6]
                            outline-none
                            focus:border-[#B08DFF]
                            focus:ring-2
                            focus:ring-[#D8C4FF]
                            transition
                        "
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="
                            block
                            mb-2
                            text-[#4C3D63]
                            font-medium
                        "
                        >
                            Password
                        </label>

                        <input
                            required
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="
                            w-full
                            px-4
                            py-3
                            rounded-xl
                            border
                            border-[#F0E5FF]
                            bg-[#FFF9F6]
                            outline-none
                            focus:border-[#B08DFF]
                            focus:ring-2
                            focus:ring-[#D8C4FF]
                            transition
                        "
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={submitting}

                        className="
                        w-full
                        py-3
                        rounded-full
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                        hover:scale-[1.02]
                        hover:shadow-[0_0_25px_rgba(246,182,209,0.4)]
                        bg-linear-to-r
                        from-[#F6B6D1]
                        to-[#E7C66D]
                    "
                    >
                        {submitting ? "Creating Account..." : "✦ Begin Your Journey"}
                    </button>

                </form>

                <div className="mt-6 text-center">

                    <p className="text-[#6B5A7A]">
                        Already have an account?
                    </p>

                    <Link
                        to="/login"
                        className="
                        inline-block
                        mt-2
                        text-[#B08DFF]
                        font-semibold
                        hover:text-[#A17BFF]
                        transition
                    "
                    >
                        Login
                    </Link>

                </div>

            </div>
        </div>
    )
}

export default Signup