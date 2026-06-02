"use client";

import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Check, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import styles from "./ContactMe.module.css";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/meoeyaeg";
const formspreeEndpoint =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? FORMSPREE_ENDPOINT;

const projectTypes = [
  "Visual Identity",
  "Website",
  "Web Application",
  "UI/UX Design",
  "Video/AI Content",
  "Full Package",
  "Other"
];

const budgetRanges = [
  "Under $500",
  "$500 - $1,000",
  "$1,000 - $3,000",
  "$3,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
  "Not Sure Yet",
];

type FormValues = {
  name: string;
  email: string;
  projectType: string;
  budgetRange: string;
  description: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  projectType: "",
  budgetRange: "",
  description: "",
};

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.projectType) {
    errors.projectType = "Please choose a project type.";
  }

  if (!values.budgetRange) {
    errors.budgetRange = "Please choose a budget range.";
  }

  if (!values.description.trim()) {
    errors.description = "Please describe your project.";
  } else if (values.description.trim().length < 20) {
    errors.description = "Please add at least 20 characters.";
  }

  return errors;
}

export default function ContactMe() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => {
      if (!current[name as keyof FormValues]) {
        return current;
      }

      const next = { ...current };
      delete next[name as keyof FormValues];
      return next;
    });

    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  const handleSelect = (name: "projectType" | "budgetRange", value: string) => {
    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const next = { ...current };
      delete next[name];
      return next;
    });

    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitStatus("idle");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitError("");

    try {
      const formData = new FormData(event.currentTarget);

      formData.set("name", values.name.trim());
      formData.set("email", values.email.trim());
      formData.set("_replyto", values.email.trim());
      formData.set("projectType", values.projectType);
      formData.set("budgetRange", values.budgetRange);
      formData.set("description", values.description.trim());
      formData.set("_subject", "New project inquiry from fatemeahmadi.com");

      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(getFormspreeError(result));
      }

      setValues(initialValues);
      setErrors({});
      setSubmitStatus("success");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Your message could not be sent right now."
      );
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contactSection} id="contact" aria-labelledby="contact-title">
      <div className={styles.contactIntro}>
        <h2 className={styles.contactTitle} id="contact-title">
          Got a New Idea?<br></br> Contact Me.
        </h2>
        <p className={styles.contactDescription}>
          Share the essentials and I will get back to you with the next steps.
        </p>
      </div>

      <form
        className={styles.contactForm}
        action={formspreeEndpoint}
        method="POST"
        onSubmit={handleSubmit}
        noValidate
        aria-describedby="contact-form-status"
      >
        <div className={styles.formGrid}>
          <Field
            id="contact-name"
            label="Name"
            error={errors.name}
          >
            <input
              className={styles.input}
              id="contact-name"
              name="name"
              type="text"
              placeholder="What should I call you?"
              value={values.name}
              onChange={handleChange}
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
            />
          </Field>

          <Field
            id="contact-email"
            label="Email Address"
            error={errors.email}
          >
            <input
              className={styles.input}
              id="contact-email"
              name="email"
              type="email"
              placeholder="Where can I reach you?"
              value={values.email}
              onChange={handleChange}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
            />
          </Field>

          <Field
            id="contact-project-type"
            label="Project Type"
            error={errors.projectType}
          >
            <AnimatedDropdown
              id="contact-project-type"
              name="projectType"
              placeholder="What are we creating?"
              options={projectTypes}
              value={values.projectType}
              error={errors.projectType}
              onChange={(value) => handleSelect("projectType", value)}
            />
          </Field>

          <Field
            id="contact-budget-range"
            label="Budget Range"
            error={errors.budgetRange}
          >
            <AnimatedDropdown
              id="contact-budget-range"
              name="budgetRange"
              placeholder="Choose a comfortable range"
              options={budgetRanges}
              value={values.budgetRange}
              error={errors.budgetRange}
              onChange={(value) => handleSelect("budgetRange", value)}
            />
          </Field>
        </div>

        <Field
          id="contact-description"
          label="Project Description"
          error={errors.description}
        >
          <textarea
            className={styles.textarea}
            id="contact-description"
            name="description"
            placeholder="Tell me about your idea, goals, timeline, and what success should look like."
            value={values.description}
            onChange={handleChange}
            rows={6}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? "contact-description-error" : undefined}
          />
        </Field>

        <div className={styles.formFooter}>
          <Button
            className={styles.submitButton}
            type="submit"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>

          <StatusMessage
            hasErrors={hasErrors}
            submitError={submitError}
            submitStatus={submitStatus}
          />
        </div>
      </form>
    </section>
  );
}

function AnimatedDropdown({
  id,
  name,
  placeholder,
  options,
  value,
  error,
  onChange,
}: {
  id: string;
  name: "projectType" | "budgetRange";
  placeholder: string;
  options: string[];
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listboxId = `${id}-listbox`;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((current) => !current);
    }
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <input type="hidden" name={name} value={value} />
      <button
        className={`${styles.dropdownButton} ${!value ? styles.dropdownPlaceholder : ""}`}
        id={id}
        type="button"
        role="combobox"
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onClick={() => setIsOpen((current) => !current)}
        onKeyDown={handleKeyDown}
      >
        <span>{value || placeholder}</span>
        <motion.span
          className={styles.dropdownChevron}
          aria-hidden="true"
          animate={{ rotate: isOpen ? 225 : 45 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={styles.dropdownMenu}
            id={listboxId}
            role="listbox"
            aria-labelledby={id}
            initial={{ opacity: 0, y: -8, scaleY: 0.96 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.97 }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 34,
              mass: 0.7,
            }}
            style={{ transformOrigin: "top" }}
          >
            {options.map((option) => {
              const isSelected = option === value;

              return (
                <li
                  className={`${styles.dropdownOption} ${isSelected ? styles.dropdownOptionSelected : ""}`}
                  key={option}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={0}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onChange(option);
                      setIsOpen(false);
                    }
                  }}
                >
                  <span>{option}</span>
                  {isSelected && <Check aria-hidden="true" size={16} strokeWidth={2.4} />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusMessage({
  hasErrors,
  submitError,
  submitStatus,
}: {
  hasErrors: boolean;
  submitError: string;
  submitStatus: "idle" | "success" | "error";
}) {
  if (submitStatus === "success") {
    return (
      <div
        className={`${styles.statusCard} ${styles.statusSuccess}`}
        id="contact-form-status"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className={styles.statusIcon} aria-hidden="true" size={22} />
        <div>
          <strong>Message sent successfully.</strong>
          <span>
            Thanks for reaching out. I have received your project details and will get back to you as soon as possible.
          </span>
        </div>
      </div>
    );
  }

  if (submitStatus === "error") {
    return (
      <div
        className={`${styles.statusCard} ${styles.statusError}`}
        id="contact-form-status"
        role="alert"
        aria-live="assertive"
      >
        <AlertTriangle className={styles.statusIcon} aria-hidden="true" size={22} />
        <div>
          <strong>Something went wrong.</strong>
          <span>
            {submitError ||
              "Your message could not be sent right now. Please try again in a moment or contact me directly by email."}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.statusMessage}
      id="contact-form-status"
      role="status"
      aria-live="polite"
    >
      {hasErrors && "Please fix the highlighted fields before sending."}
    </div>
  );
}

function getFormspreeError(result: unknown) {
  if (
    result &&
    typeof result === "object" &&
    "errors" in result &&
    Array.isArray(result.errors) &&
    result.errors.length > 0
  ) {
    const firstError = result.errors[0];

    if (
      firstError &&
      typeof firstError === "object" &&
      "message" in firstError &&
      typeof firstError.message === "string"
    ) {
      return firstError.message;
    }
  }

  return "Formspree rejected the submission. Check that the endpoint is correct and verified.";
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {children}
      <p className={styles.errorText} id={`${id}-error`} aria-live="polite">
        {error ?? ""}
      </p>
    </div>
  );
}
