import React from "react";
import {
  Shield,
  Lock,
  Key,
  AlertCircle,
  Fingerprint,
  Bell,
  Eye,
  CheckCircle2,
} from "lucide-react";

const SecurityFeature = ({ icon, title, description }) => (
  <div className="flex gap-4 p-6 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:bg-zinc-900 transition-colors">
    <div className="flex-shrink-0">
      <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
        {React.cloneElement(icon, { className: "text-yellow-500", size: 24 })}
      </div>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-zinc-200 mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const SecurityPage = () => {
  const features = [
    {
      icon: <Shield />,
      title: "Bank-Level Encryption",
      description:
        "Your data is protected with AES-256 encryption, the same security standard used by leading financial institutions worldwide.",
    },
    {
      icon: <Lock />,
      title: "Zero Liability Protection",
      description:
        "You're protected against unauthorized transactions. Our fraud detection system monitors your account 24/7.",
    },
    {
      icon: <Key />,
      title: "Two-Factor Authentication",
      description:
        "Add an extra layer of security to your account with biometric verification and SMS/email authentication.",
    },
    {
      icon: <AlertCircle />,
      title: "Real-Time Fraud Detection",
      description:
        "Advanced AI algorithms monitor transactions in real-time to detect and prevent suspicious activities.",
    },
    {
      icon: <Fingerprint />,
      title: "Biometric Security",
      description:
        "Access your account securely using fingerprint or face recognition on supported devices.",
    },
    {
      icon: <Bell />,
      title: "Instant Notifications",
      description:
        "Receive immediate alerts for all account activities, keeping you informed of every transaction.",
    },
  ];

  const certifications = [
    "PCI DSS Level 1 Certified",
    "SOC 2 Type II Compliant",
    "ISO 27001 Certified",
    "GDPR Compliant",
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-200">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-zinc-900/50 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Bank-Grade Security for Your
              <span className="text-yellow-500"> Digital Assets</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Your security is our top priority. We employ multiple layers of
              protection to ensure your money and data are safe at all times.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, index) => (
            <SecurityFeature key={index} {...feature} />
          ))}
        </div>

        {/* Certifications Section */}
        <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-8">
          <h2 className="text-2xl font-bold mb-6">Security Certifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-zinc-300"
              >
                <CheckCircle2 className="text-yellow-500" size={20} />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Security Info */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Your Security Dashboard</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
            Monitor your account security status, manage authentication methods,
            and view security activity logs all in one place.
          </p>
          <button className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-medium hover:bg-yellow-400 transition-colors">
            View Security Settings
          </button>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Security FAQs</h2>
          <div className="grid gap-4">
            {[
              {
                q: "What happens if I lose my device?",
                a: "You can instantly lock your account from any device. Contact our 24/7 support team to secure your account and restore access.",
              },
              {
                q: "How are my virtual cards protected?",
                a: "Each virtual card has unique security features including dynamic CVV, transaction limits, and merchant-specific restrictions.",
              },
              {
                q: "Can I use biometric authentication?",
                a: "Yes, you can secure your account with fingerprint or face recognition on supported devices for quick and secure access.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="p-6 bg-zinc-900/50 rounded-xl border border-zinc-800"
              >
                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                <p className="text-zinc-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
