import { cn } from "../utils/cn";

const XIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicy({ isOpen, onClose }: PrivacyPolicyProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Privacy Policy</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
            aria-label="Close privacy policy"
          >
            <XIcon />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">
              <strong>Effective Date:</strong> January 1, 2024<br />
              <strong>Last Updated:</strong> January 1, 2024
            </p>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">1. Information We Collect</h3>
              <div className="text-gray-300 space-y-3">
                <p><strong>Personal Information:</strong> Name, phone number, location, scrap type, and estimated weight when you request a quote.</p>
                <p><strong>Communication Data:</strong> WhatsApp messages, call records, and correspondence for service delivery.</p>
                <p><strong>Technical Data:</strong> IP address, browser type, device information, and website usage analytics.</p>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">2. How We Use Your Information</h3>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>Provide scrap buying services and process transactions</li>
                <li>Schedule pickup appointments and coordinate logistics</li>
                <li>Send service updates and payment confirmations</li>
                <li>Improve our services and customer experience</li>
                <li>Comply with legal and regulatory requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">3. Information Sharing</h3>
              <div className="text-gray-300 space-y-3">
                <p>We do not sell or rent your personal information. We may share data with:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Service partners for pickup and logistics</li>
                  <li>Payment processors for transaction completion</li>
                  <li>Legal authorities when required by law</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">4. Data Security</h3>
              <p className="text-gray-300">
                We implement industry-standard security measures to protect your information including encryption, secure servers, and access controls. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">5. Your Rights</h3>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>Access and review your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">6. Contact Information</h3>
              <div className="text-gray-300">
                <p><strong>AbbroMetals</strong></p>
                <p>Proprietor: SYED RIZWAN HUSSAIN ABEDI</p>
                <p>Contact: Mohammed Salman</p>
                <p>Phone: +91 91103 55412</p>
                <p>WhatsApp: +91 91103 55412</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-white mb-4">7. Changes to Privacy Policy</h3>
              <p className="text-gray-300">
                We may update this privacy policy periodically. Changes will be posted on this page with an updated effective date.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}