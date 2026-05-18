"use client"
import Link from 'next/link';
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const { error } = await authClient.signIn.email({
            email,
            password,
            callbackURL: "/"
        });

        if (!error) router.push('/');
    };

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/"
        });
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="card bg-base-100 w-full max-w-lg shadow-lg rounded-2xl">
                <div className="card-body px-10 py-10">
                    <h2 className="text-center text-3xl font-bold mb-4">Sign In</h2>

                    <form onSubmit={onSubmit} className="flex flex-col gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Email <span className="text-error">*</span></span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="john@example.com"
                                className="input input-bordered w-full rounded-xl"
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Password <span className="text-error">*</span></span>
                            </label>
                            <input
                                name="password"
                                type="password"
                                required
                                minLength={8}
                                placeholder="Enter your password"
                                className="input input-bordered w-full rounded-xl"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary rounded-full w-full mt-2">
                            Sign In
                        </button>
                    </form>

                    <div className="divider">OR</div>

                    <button
                        onClick={handleGoogleSignIn}
                        type="button"
                        className="btn btn-outline w-full rounded-full"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
                            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2v6h7.7c4.5-4.2 7.1-10.3 7.1-17.2z" />
                            <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.7-6c-2.1 1.4-4.9 2.3-8.2 2.3-6.3 0-11.6-4.2-13.5-9.9H2.6v6.2C6.5 42.7 14.7 48 24 48z" />
                            <path fill="#FBBC05" d="M10.5 28.6c-.5-1.4-.8-2.9-.8-4.6s.3-3.2.8-4.6v-6.2H2.6C.9 16.6 0 20.2 0 24s.9 7.4 2.6 10.8l7.9-6.2z" />
                            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.1 30.5 0 24 0 14.7 0 6.5 5.3 2.6 13.2l7.9 6.2C12.4 13.7 17.7 9.5 24 9.5z" />
                        </svg>
                        Sign In With Google
                    </button>

                    <div className="text-center mt-4">
                        <span className="text-sm">New user? </span>
                        <Link href={'/SignUP'} className="link link-primary text-sm">
                            Register here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;