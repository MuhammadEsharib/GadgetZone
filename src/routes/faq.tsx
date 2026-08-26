import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, HelpCircle, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { LiveVisitors } from "@/components/store/LiveVisitors";
import { useCart } from "@/lib/cartStore";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQs — The Gadget Zone" },
      {
        name: "description",
        content:
          "Find quick answers about ordering, delivery, payments, warranties, and support at The Gadget Zone.",
      },
    ],
  }),
  component: FaqPage,
});

const faqGroups = [
  {
    title: "Orders and delivery",
    icon: Truck,
    questions: [
      {
        question: "How long does delivery take?",
        answer:
          "Orders usually arrive within 2 to 4 business days. Delivery times can vary slightly by location, and our team will share updates when your order is on the way.",
      },
      {
        question: "Do you deliver across Pakistan?",
        answer:
          "Yes. We deliver nationwide from our Karachi hub. Enter your complete address and contact number at checkout so the courier can reach you without delays.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Once your order is dispatched, contact our support desk on 0342 0024369 for the latest courier update and delivery status.",
      },
    ],
  },
  {
    title: "Products and payments",
    icon: ShieldCheck,
    questions: [
      {
        question: "Are your products original?",
        answer:
          "We source authentic products and check each item before listing it. Product details, condition, and included accessories are shown on the product page.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "Payment options are confirmed by our team when your order is placed. For help choosing an option, contact us through WhatsApp or the contact form.",
      },
      {
        question: "Do products include a warranty?",
        answer:
          "Warranty coverage depends on the product. Check the product details or ask our support team before ordering so we can confirm the exact coverage.",
      },
    ],
  },
  {
    title: "Returns and support",
    icon: HelpCircle,
    questions: [
      {
        question: "What if my order arrives damaged?",
        answer:
          "Contact us as soon as possible with your order number and clear photos of the packaging and item. We will review the issue and guide you through the next step.",
      },
      {
        question: "Can I get help setting up my gadget?",
        answer:
          "Yes. Our Karachi support desk can help with setup, pairing, and basic troubleshooting for the products we sell.",
      },
      {
        question: "Can I change or cancel an order?",
        answer:
          "Please contact us quickly after placing the order. We can check whether it has been dispatched and tell you what options are still available.",
      },
    ],
  },
];

function FaqPage() {
  const { cartCount } = useCart();
  const [toast, setToast] = useState<string | null>(null);

  const notify = useCallback((message: string) => setToast(message), []);

  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(timeout);
  }, [toast]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar cartCount={cartCount} onNotify={notify} />

      <main>
        <section className="relative isolate overflow-hidden bg-royal-deep px-4 pb-14 pt-28 text-primary-foreground sm:px-6 sm:pt-32 lg:px-8 lg:pb-20">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(98,157,250,0.45),transparent_38%),linear-gradient(135deg,#0B2545,#134074_55%,#2F73D9)]" />
          <div className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full border border-white/10 sm:h-96 sm:w-96" />
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-white/65">
              <Link to="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-white">FAQs</span>
            </div>
            <div className="mt-8 max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFC400]">
                <HelpCircle className="h-3.5 w-3.5" /> Quick answers
              </span>
              <h1 className="mt-5 font-display text-[clamp(2.5rem,7vw,4.75rem)] font-extrabold leading-[0.98]">
                Questions, made simpler.
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
                Find straightforward answers about delivery, product quality, payments, and support
                before you place an order.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(13rem,0.7fr)_minmax(0,1.5fr)] lg:gap-20 lg:px-8 lg:py-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-royal">
              Need to know?
            </p>
            <h2 className="mt-3 font-display text-2xl font-extrabold text-royal-deep sm:text-3xl">
              Everything important, in one place.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Open any question to see the details. If you need an answer tailored to your order,
              our local support team is only a message away.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-royal px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-royal-deep"
            >
              <MessageCircle className="h-4 w-4" /> Contact support
            </Link>
          </div>

          <div className="space-y-10">
            {faqGroups.map(({ title, icon: Icon, questions }) => (
              <section key={title} aria-labelledby={`faq-${title}`}>
                <div className="mb-3 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-royal/10 text-royal">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h2
                    id={`faq-${title}`}
                    className="font-display text-lg font-bold text-royal-deep"
                  >
                    {title}
                  </h2>
                </div>
                <Accordion type="single" collapsible className="border-t border-border/70">
                  {questions.map(({ question, answer }, index) => (
                    <AccordionItem key={question} value={`${title}-${index}`}>
                      <AccordionTrigger className="py-5 text-left text-sm font-bold text-foreground hover:no-underline sm:text-base">
                        {question}
                      </AccordionTrigger>
                      <AccordionContent className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        {answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}

            <div className="flex flex-col gap-4 rounded-2xl border border-royal/15 bg-sky-soft/50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <p className="font-display text-base font-bold text-royal-deep">
                  Still have a question?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  We are happy to help with a product or existing order.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-royal transition-colors hover:text-royal-deep"
              >
                Get in touch <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <LiveVisitors />

      {toast && (
        <div className="fixed bottom-5 right-4 z-[70] rounded-full bg-royal-deep px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-float)] sm:right-6">
          {toast}
        </div>
      )}
    </div>
  );
}
