"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import FadeContent from "../blocks/Animations/FadeContent/FadeContent";
import { Button } from "../ui/button";
import { SendIcon, LoaderCircle } from "lucide-react";
import ContactImage from "../../assets/contact-image.jpg";
import Avatar1 from "../../assets/avatar01.jpg";
import Avatar2 from "../../assets/avatar02.jpg";
import Avatar3 from "../../assets/avatar03.jpg";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState("");
    const [isSending, setIsSending] = useState(false);

    // Clear status message after 5 seconds
    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => {
                setStatus("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        setStatus("");

        emailjs
            .send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
                formData,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
            )
            .then(
                () => {
                    setStatus("Email sent successfully!");
                    setFormData({ first_name: "", email: "", message: "" });
                },
                (error) => {
                    setStatus("Failed to send email. Try again later.");
                    console.error("EmailJS error:", error);
                }
            )
            .finally(() => setIsSending(false));
    };

    const avatars = [
        { src: Avatar1, alt: "Team member 1" },
        { src: Avatar2, alt: "Team member 2" },
        { src: Avatar3, alt: "Team member 3" },
    ];

    return (
        <div
            className="text-primary-color py-3 md:py-12 bg-background-black min-h-screen"
            id="contact"
        >
            <div className="mx-auto px-4 md:px-6">
                <div className="mb-8 md:mb-12">
                    <FadeContent className="uppercase tracking-wide text-gray-500 text-base sm:text-lg md:text-xl">
                        Get in Touch
                    </FadeContent>

                    <FadeContent
                        duration={1200}
                        delay={200}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-2"
                    >
                        Let&apos;s Connect
                    </FadeContent>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12 lg:gap-16">
                    {/* Contact Form - Left Side */}
                    <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
                        <FadeContent
                            duration={1200}
                            delay={300}
                            className="text-xl sm:text-2xl font-semibold mb-2"
                        >
                            Send Us a Message
                        </FadeContent>

                        {status && (
                            <div
                                className={`p-3 rounded-lg ${status.includes("success")
                                        ? "bg-green-600/20 text-green-400 border border-green-500/30"
                                        : "bg-red-600/20 text-red-400 border border-red-500/30"
                                    }`}
                            >
                                {status}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <FadeContent duration={1300} delay={400}>
                                <div className="space-y-2">
                                    <label htmlFor="first_name" className="block text-sm">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        required
                                        disabled={isSending}
                                        className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors disabled:opacity-60"
                                        placeholder="Umair Niazi"
                                    />
                                </div>
                            </FadeContent>

                            <FadeContent duration={1300} delay={500}>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={isSending}
                                        className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors disabled:opacity-60"
                                        placeholder="umairniaziofficial@gmail.com"
                                    />
                                </div>
                            </FadeContent>

                            <FadeContent duration={1300} delay={600}>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="block text-sm">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        disabled={isSending}
                                        rows={5}
                                        className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors resize-none disabled:opacity-60"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>
                            </FadeContent>

                            <FadeContent duration={1300} delay={700}>
                                <Button
                                    type="submit"
                                    className="w-full sm:w-auto flex items-center justify-center gap-2"
                                    disabled={isSending}
                                >
                                    {isSending ? (
                                        <>
                                            <LoaderCircle className="animate-spin h-4 w-4" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <SendIcon size={16} />
                                        </>
                                    )}
                                </Button>
                            </FadeContent>
                        </form>
                    </div>

                    {/* Testimonial Image - Right Side */}
                    <FadeContent className="w-full md:w-1/2">
                        <div className="relative h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px]">
                            <Image
                                src={ContactImage}
                                width={1920}
                                height={1080}
                                className="w-full h-full object-cover rounded-xl sm:rounded-2xl md:rounded-3xl contrast-[1.1] shadow-xl"
                                alt="Our team ready to help you"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent rounded-xl sm:rounded-2xl md:rounded-3xl">
                                <div className="absolute bottom-0 w-full p-4 sm:p-6 md:p-8">
                                    <FadeContent duration={1200} delay={400}>
                                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                                            We&apos;re Here to Support You
                                        </h2>
                                        <p className="text-sm md:text-base text-gray-300 max-w-lg">
                                            Our team of experts is ready to answer your questions and
                                            help you succeed in your startup journey. Reach out today!
                                        </p>
                                        <div className="mt-4 flex items-center">
                                            <div className="flex -space-x-2">
                                                {avatars.map((avatar, i) => (
                                                    <div
                                                        key={i}
                                                        className="w-8 h-8 rounded-full border-2 border-background-black overflow-hidden"
                                                    >
                                                        <Image
                                                            src={avatar.src}
                                                            alt={avatar.alt}
                                                            width={32}
                                                            height={32}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="ml-3 text-sm text-gray-300">
                                                Join our growing community
                                            </span>
                                        </div>
                                    </FadeContent>
                                </div>
                            </div>
                        </div>
                    </FadeContent>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
