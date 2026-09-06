import { Send } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

export function ContactForm({
  onSuccess,
  selectedTopic,
}: {
  onSuccess: () => void;
  selectedTopic?: string;
}) {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    subject: selectedTopic ? `[${selectedTopic}] ` : "",
    message: "",
    website: "",
  });

  // Sync selected topic if parent changes it
  useEffect(() => {
    if (selectedTopic) {
      setFields((prev) => ({
        ...prev,
        subject: prev.subject && !prev.subject.startsWith("[")
          ? `[${selectedTopic}] ${prev.subject}`
          : `[${selectedTopic}] Inquiry`,
      }));
    }
  }, [selectedTopic]);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const update = (key: keyof typeof fields, value: string) =>
    setFields((current) => ({ ...current, [key]: value }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (fields.website) return; // honeypot

    if (!fields.name.trim() || !fields.email.trim() || !fields.message.trim()) {
      setStatus("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setStatus(null);
    const toastId = toast.loading("Sending your message...");

    try {
      const fullMessage = fields.phone.trim()
        ? `[Phone: ${fields.phone.trim()}]\n\n${fields.message.trim()}`
        : fields.message.trim();

      const result = await api.submitContact({
        name: fields.name.trim(),
        email: fields.email.trim(),
        subject: fields.subject.trim() || "Website Inquiry",
        message: fullMessage,
      });

      if (!result || !result.success || result.error) {
        throw new Error(result?.error || "Failed to send message.");
      }

      toast.success("Message sent successfully.", { id: toastId });
      setFields({ name: "", email: "", phone: "", subject: "", message: "", website: "" });
      onSuccess();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send your message.";
      toast.error(message, { id: toastId });
      setStatus(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 sm:space-y-5">
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
        <label className="space-y-1.5 text-xs font-bold text-foreground">
          Full Name <span className="text-red-500">*</span>
          <input
            required
            value={fields.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="e.g. Muhammad Ali"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium transition-all focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/20 placeholder:text-muted-foreground/60 shadow-inner"
          />
        </label>
        <label className="space-y-1.5 text-xs font-bold text-foreground">
          Email Address <span className="text-red-500">*</span>
          <input
            required
            type="email"
            value={fields.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="name@example.com"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium transition-all focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/20 placeholder:text-muted-foreground/60 shadow-inner"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="space-y-1.5 text-xs font-bold text-foreground">
          Phone / WhatsApp <span className="text-muted-foreground font-normal text-[11px]">(Optional)</span>
          <input
            type="tel"
            value={fields.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="03XX XXXXXXX"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium transition-all focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/20 placeholder:text-muted-foreground/60 shadow-inner"
          />
        </label>
        <label className="space-y-1.5 text-xs font-bold text-foreground">
          Subject <span className="text-red-500">*</span>
          <input
            required
            value={fields.subject}
            onChange={(event) => update("subject", event.target.value)}
            placeholder="e.g. Order status, Warranty claim..."
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium transition-all focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/20 placeholder:text-muted-foreground/60 shadow-inner"
          />
        </label>
      </div>

      <label className="block space-y-1.5 text-xs font-bold text-foreground">
        Message Details <span className="text-red-500">*</span>
        <textarea
          required
          rows={5}
          value={fields.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder="Please describe how we can assist you..."
          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium transition-all focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/20 placeholder:text-muted-foreground/60 shadow-inner"
        />
      </label>

      {status && (
        <p role="alert" className="text-xs font-bold text-destructive">
          {status}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-royal hover:bg-royal-deep px-8 py-3.5 text-xs font-bold text-white transition-all shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
      >
        <Send className="h-3.5 w-3.5 text-gold" />
        <span>{loading ? "Transmitting..." : "Send Message"}</span>
      </button>
    </form>
  );
}
