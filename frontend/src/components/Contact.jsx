import { useState } from "react";
import { useReveal } from "../hooks/useReveal";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

/* Reusable form field component */
const Field = ({ name, label, type = "text", rows, form, setForm, errors }) => (
  <div>
    <label htmlFor={`contact-${name}`} className="font-mono text-xs text-white/40 block mb-2">{label}</label>
    {rows ? (
      <textarea
        id={`contact-${name}`}
        name={name}
        rows={rows}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        className={`w-full glass border rounded-xl px-4 py-3 font-mono text-sm text-white/80 bg-transparent focus:outline-none resize-none transition-all ${
          errors[name] ? "border-red-400/40" : "border-white/10 focus:border-cyan-400/40"
        }`}
        placeholder={`Enter ${label.toLowerCase()}...`}
      />
    ) : (
      <input
        id={`contact-${name}`}
        type={type}
        name={name}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        className={`w-full glass border rounded-xl px-4 py-3 font-mono text-sm text-white/80 bg-transparent focus:outline-none transition-all ${
          errors[name] ? "border-red-400/40" : "border-white/10 focus:border-cyan-400/40"
        }`}
        placeholder={`Enter ${label.toLowerCase()}...`}
      />
    )}
    {errors[name] && <p className="font-mono text-xs text-red-400/80 mt-1">{errors[name]}</p>}
  </div>
);

export default function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch(`${API_URL}/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-cyan-400/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="reveal mb-16">
          <span className="section-label">05. Contact</span>
          <h2 className="section-title mt-3">
            Let's Build<br />
            <span className="gradient-text">Something</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: info */}
          <div className="space-y-8">
            <p className="text-white/50 text-lg leading-relaxed">
              I'm actively looking for opportunities as a Full Stack Developer or Backend Developer.
              Whether you have a project, an internship, or a full-time role — I'd love to hear from you.
            </p>

            <div className="space-y-4">
              {[
                // TODO: Replace placeholder values with your real contact links
                { icon: "✉", label: "Email", val: "YOUR_EMAIL@gmail.com", href: "mailto:YOUR_EMAIL@gmail.com" },
                { icon: "GH", label: "GitHub", val: "github.com/YOUR_GITHUB_USERNAME", href: "https://github.com/YOUR_GITHUB_USERNAME" },
                { icon: "LI", label: "LinkedIn", val: "linkedin.com/in/YOUR_LINKEDIN_ID", href: "https://linkedin.com/in/YOUR_LINKEDIN_ID" },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 glass rounded-xl p-4 border border-white/5 hover:border-cyan-400/20 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg glass-strong border border-white/10 flex items-center justify-center font-mono text-xs text-white/50 group-hover:text-cyan-400 group-hover:border-cyan-400/20 transition-all">
                    {c.icon}
                  </div>
                  <div>
                    <div className="font-mono text-xs text-white/30">{c.label}</div>
                    <div className="font-display font-semibold text-white/70 group-hover:text-white/90 transition-colors text-sm">{c.val}</div>
                  </div>
                  <span className="ml-auto text-white/20 group-hover:text-cyan-400/60 transition-colors">↗</span>
                </a>
              ))}
            </div>

            {/* Availability badge */}
            <div className="glass rounded-xl p-5 border border-green-400/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <div>
                  <div className="font-display font-bold text-white/80 text-sm">Open to Opportunities</div>
                  <div className="font-mono text-xs text-white/40">Looking for fresher roles, internships & freelance work</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="glass rounded-2xl p-8 border border-white/5">
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 gap-4">
                <div className="w-16 h-16 rounded-full bg-green-400/10 border border-green-400/20 flex items-center justify-center text-2xl">✓</div>
                <div className="font-display font-bold text-white/90 text-xl">Message Sent!</div>
                <p className="text-white/40 text-sm">I'll get back to you as soon as possible.</p>
                <button onClick={() => setStatus("idle")} className="btn-outline text-sm py-2 px-6 mt-2">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field name="name" label="Name" form={form} setForm={setForm} errors={errors} />
                  <Field name="email" label="Email" type="email" form={form} setForm={setForm} errors={errors} />
                </div>
                <Field name="subject" label="Subject" form={form} setForm={setForm} errors={errors} />
                <Field name="message" label="Message" rows={5} form={form} setForm={setForm} errors={errors} />

                {status === "error" && (
                  <p className="font-mono text-xs text-red-400/80 text-center">
                    Something went wrong. Try emailing me directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary w-full py-3.5 relative"
                >
                  <span className="relative z-10">
                    {status === "loading" ? "Sending..." : "Send Message →"}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
