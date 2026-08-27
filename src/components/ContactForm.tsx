import { Turnstile } from "@marsidev/react-turnstile";
import { Send } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { POST as sendContactMessage } from "@/server/api/contact"; // <-- YE CHANGE

export function ContactForm({ onSuccess }: { onSuccess: () => void }) {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const turnstileRef = useRef<any>(null);

  const update = (key: keyof typeof fields, value: string) =>
    setFields((current) => ({ ...current, [key]: value }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (fields.website) return; // honeypot
    if (!token) return setStatus("Please complete the captcha.");

    setLoading(true);
    setStatus(null);
    const toastId = toast.loading("Sending your message...");

    try {
      const result = await sendContactMessage({
        // <-- YE CHANGE: postData ki jagah
        data: {
          name: fields.name,
          email: fields.email,
          message: `Subject: ${fields.subject}\n\n${fields.message}`,
          turnstileToken: token,
          website: fields.website,
        },
      });

      // Server se error aya to
      if ("error" in result) {
        throw new Error(result.error);
      }

      toast.success("Message sent successfully.", { id: toastId });
      setFields({ name: "", email: "", subject: "", message: "", website: "" });
      setToken("");
      turnstileRef.current?.reset();
      onSuccess();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send your message.";
      toast.error(message, { id: toastId });
      setStatus(message);
      turnstileRef.current?.reset();
      setToken("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <input
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={fields.website}
        onChange={(event) => update("website", event.target.value)}
        className="absolute -left-[9999px] h-px w-px"
        name="website"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="space-y-1.5 text-xs font-bold text-foreground/80">
          Full Name
          <input
            required
            value={fields.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Your Name"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-normal focus:border-royal focus:outline-none focus:ring-1 focus:ring-royal"
          />
        </label>
        <label className="space-y-1.5 text-xs font-bold text-foreground/80">
          Email Address
          <input
            required
            type="email"
            value={fields.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="yourname@domain.com"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-normal focus:border-royal focus:outline-none focus:ring-1 focus:ring-royal"
          />
        </label>
      </div>

      <label className="block space-y-1.5 text-xs font-bold text-foreground/80">
        Subject
        <input
          required
          value={fields.subject}
          onChange={(event) => update("subject", event.target.value)}
          placeholder="How can we help you?"
          className="w-full rounded-xl border-border bg-background px-4 py-2.5 text-sm font-normal focus:border-royal focus:outline-none focus:ring-1 focus:ring-royal"
        />
      </label>

      <label className="block space-y-1.5 text-xs font-bold text-foreground/80">
        Message Description
        <textarea
          required
          rows={5}
          value={fields.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder="Detail your inquiry here..."
          className="w-full resize-none rounded-xl border-border bg-background px-4 py-2.5 text-sm font-normal focus:border-royal focus:outline-none focus:ring-1 focus:ring-royal"
        />
      </label>

      <Turnstile
        ref={turnstileRef}
        siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
        onSuccess={setToken}
        onError={() => setStatus("Captcha failed to load. Please refresh and try again.")}
        options={{
          sandbox: "allow-scripts allow-same-origin",
        }}
      />

      {status && (
        <p role="alert" className="text-xs font-bold text-destructive">
          {status}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 rounded-full bg-royal px-6 py-3.5 text-xs font-bold text-primary-foreground transition-all hover:bg-royal-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="h-3.5 w-3.5" />
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
