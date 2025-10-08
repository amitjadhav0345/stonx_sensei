import Link from "next/link";
import Image from "next/image";
import React from "react";
import { auth } from "@/lib/better-auth/auth";
import {headers} from "next/headers";
import { redirect } from "next/navigation";

// Mark the component as async
const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth.api.getSession({ headers: await headers() });

    // Optional: redirect if user is logged in
    if (session?.user) redirect("/dashboard");

    return (
        <main className="auth-layout">
            <section className="auth-left-section scrollbar-hide-default">
                <Link href="/" className="auth-logo">
                    <Image
                        src="/assets/icons/logo.svg"
                        alt="Stonx Sensei Logo"
                        width={240}
                        height={190}
                        className="h-12 w-auto cursor-pointer"
                    />
                </Link>

                <div className="pb-6 lg:pb-8 flex-1">{children}</div>
            </section>

            <section className="auth-right-section">
                <div className="z-10 relative lg:mt-4 lg:mb-16">
                    <blockquote className="auth-blockquote">
                        Stonx Sensei has completely changed the way I track stocks! The
                        real-time alerts are super accurate, and I love the AI insights —
                        they actually make sense. The interface is clean and fun to use.
                        Great job team!
                    </blockquote>
                    <div className="flex items-center justify-between">
                        <div>
                            <cite className="auth-testimonial-author">
                                - Amit Jagannath Jadhav
                            </cite>
                            <p className="max-md:text-xs text-gray-500">Vibe Coder</p>
                        </div>

                        <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Image
                                    src="/assets/icons/star.svg"
                                    alt="Star"
                                    key={star}
                                    width={20}
                                    height={20}
                                    className="w-5 h-5"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <Image
                        src="/assets/images/dashboard.png"
                        alt="Dashboard Preview"
                        width={1440}
                        height={1150}
                        className="auth-dashboard-preview absolute top-0"
                    />
                </div>
            </section>
        </main>
    );
};

export default Layout;
