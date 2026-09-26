import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { sendContactMessage } from "../services/api";

const contactItems = [
  {
    label: "Email",
    value: "niranjanreddynakkala@gmail.com",
    href: "mailto:niranjanreddynakkala@gmail.com",
    icon: "✉",
  },
  {
    label: "GitHub",
    value: "github.com/niranjanreddy18",
    href: "https://github.com/niranjanreddy18",
    icon: "↗",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/niranjanreddy18",
    href: "https://linkedin.com/in/niranjanreddy18",
    icon: "↗",
  },
  {
    label: "Portfolio",
    value: "niranjan.dev",
    href: "#home",
    icon: "★",
  },
];

export default function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email is required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setServerError("");
    setStatus("loading");

    try {
      await sendContactMessage(form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("idle");
      setServerError(err.message || "Failed to send message. Please try again later.");
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div ref={ref} className="reveal mb-10">
          <span className="section-label">Contact</span>
          <h2 className="section-title mt-1">
            Get In <span className="gradient-text">Touch</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Direct Links Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card p-6 space-y-3">
              <div className="font-mono text-xs text-sky-400 uppercase tracking-wider font-semibold mb-2">
                Direct Links &amp; Profiles
              </div>

              <div className="space-y-3">
                {contactItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-sky-400/40 hover:bg-slate-800/60 transition-all group"
                  >
                    <div>
                      <div className="font-mono text-xs text-slate-400">{item.label}</div>
                      <div className="text-sm font-medium text-slate-200 group-hover:text-white mt-0.5">
                        {item.value}
                      </div>
                    </div>
                    <span className="font-mono text-xs text-slate-400 group-hover:text-sky-400 transition-colors">
                      {item.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-10 gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 text-xl font-bold">
                  ✓
                </div>
                <div className="font-display font-bold text-white text-lg">Message Sent Successfully!</div>
                <p className="text-slate-400 text-sm max-w-sm">
                  Thank you for reaching out. I will respond to your message shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn-outline text-xs py-2 px-4 mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {serverError && (
                  <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs">
                    {serverError}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="font-mono text-xs text-slate-400 block mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Niranjan Reddy"
                      className={`w-full bg-slate-900/80 border rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none transition-all ${
                        errors.name ? "border-red-500/50" : "border-slate-800 focus:border-sky-400/50"
                      }`}
                    />
                    {errors.name && <p className="font-mono text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="font-mono text-xs text-slate-400 block mb-1.5">
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@example.com"
                      className={`w-full bg-slate-900/80 border rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none transition-all ${
                        errors.email ? "border-red-500/50" : "border-slate-800 focus:border-sky-400/50"
                      }`}
                    />
                    {errors.email && <p className="font-mono text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="font-mono text-xs text-slate-400 block mb-1.5">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Project Inquiry / Job Opportunity"
                    className={`w-full bg-slate-900/80 border rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none transition-all ${
                      errors.subject ? "border-red-500/50" : "border-slate-800 focus:border-sky-400/50"
                    }`}
                  />
                  {errors.subject && <p className="font-mono text-xs text-red-400 mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="contact-message" className="font-mono text-xs text-slate-400 block mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Hello Niranjan, I'd like to discuss..."
                    className={`w-full bg-slate-900/80 border rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none resize-none transition-all ${
                      errors.message ? "border-red-500/50" : "border-slate-800 focus:border-sky-400/50"
                    }`}
                  />
                  {errors.message && <p className="font-mono text-xs text-red-400 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary w-full py-3 text-sm font-semibold"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
