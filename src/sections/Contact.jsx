import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Particles } from "../components/Particals"; // Assuming this is a valid component path

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [formStatus, setFormStatus] = useState({ submitted: false, message: '', success: false });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            setFormStatus({ submitted: true, message: 'Please fill out all fields.', success: false });
            return;
        }

        setIsLoading(true);
        setFormStatus({ submitted: false, message: '', success: false });

        try {
            await emailjs.send(
                "service_fp2oapg",
                "template_lkaeudv",
                {
                    from_name: formData.name,
                    to_name: "Arya Sharma",
                    from_email: formData.email,
                    message: formData.message,
                },
                "c-b7oLIhU791UFEJ8"
            );

            setFormStatus({ submitted: true, message: 'Message sent successfully! Thank you.', success: true });
            setFormData({ name: "", email: "", message: "" });

        } catch (error) {
            console.error("EmailJS failed to send:", error);
            setFormStatus({ submitted: true, message: 'Failed to send message. Please try again later.', success: false });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section 
          id="contact" // <-- ID ADDED HERE
          className="relative flex items-center c-space section-spacing"
        >
            <Particles
                className="absolute inset-0 -z-50"
                quantity={100}
                ease={80}
                color={"#ffffff"}
                refresh
            />
            <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">
                <div>
                    <h2 className="text-heading">INITIATE_HANDSHAKE</h2>
                    <p className="font-normal text-neutral-400">
                        System is ready for high-concurrency collaborations and architectural consulting.
                    </p>
                </div>
                <form className="w-full" onSubmit={handleSubmit} noValidate>
                    <div className="mb-5">
                        <label htmlFor="name" className="feild-lable">
                            SENDER_IDENTITY
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="field-input field-input-focus"
                            placeholder="What Should I Call You"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="feild-lable">
                            REPLY_VECTOR
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="field-input field-input-focus"
                            placeholder="Your Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="message" className="feild-lable">
                            MESSAGE_PAYLOAD
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className="field-input field-input-focus"
                            placeholder="What's on your mind?"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? "Sending..." : "TRANSMIT_PACKET"}
                    </button>

                    {formStatus.submitted && (
                        <p className={`mt-4 text-center ${formStatus.success ? 'text-green-500' : 'text-red-500'}`}>
                            {formStatus.message}
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
};

export default Contact;