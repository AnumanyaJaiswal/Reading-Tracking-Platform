import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'


function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            await login({ email: email.trim(), password });
            navigate("/profile");
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (

        <div className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-linear-to-b
            from-[#FFF9F6]
            via-[#FDF2F8]
            to-[#F4EDFF]
            px-4
        ">
            <div className="
                w-full
                max-w-md
                bg-white
                rounded-3xl
                border border-[#F0E5FF]
                shadow-[0_10px_30px_rgba(176,141,255,0.10)]
                p-8
            ">

                {
                    error && (
                        <div
                            className="
                            mb-6
                            px-4
                            py-3
                            rounded-2xl
                            bg-red-50
                            border
                            border-red-200
                            text-red-600
                            text-sm
                            text-center
                            font-medium
                            animate-pulse
                        "
                        >
                            ✦ {error}
                        </div>
                    )
                }

                <div className="text-center mb-8">

                    <div className="text-4xl mb-3">
                        🌙
                    </div>

                    <h1 className="
                        text-5xl
                        font-serif
                        font-bold
                        bg-linear-to-r
                        from-[#B08DFF]
                        via-[#F6B6D1]
                        to-[#E7C66D]
                        bg-clip-text
                        text-transparent
                    ">
                        Prophecy
                    </h1>

                    <p className="
                        mt-3
                        text-sm
                        tracking-[0.2em]
                        text-[#6B5A7A]
                    ">
                        EVERY BOOK HOLDS A PROPHECY
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>

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

                    <button
                        type='submit'
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
                            bg-linear-to-r
                            from-[#F6B6D1]
                            to-[#E7C66D]
                        "
                    >
                        {
                            submitting
                                ? "Entering Prophecy..."
                                : "✦ Return to Prophecy"
                        }
                    </button>

                </form>

                <div className="mt-6 text-center">

                    <p className="text-[#6B5A7A]">
                        New to Prophecy?
                    </p>

                    <Link
                        to="/signup"
                        className="
                            inline-block
                            mt-2
                            text-[#B08DFF]
                            font-semibold
                            hover:text-[#A17BFF]
                            transition
                        "
                    >
                        Create an Account
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Login