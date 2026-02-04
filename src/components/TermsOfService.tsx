import { cn } from "../utils/cn";

const XIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface TermsOfServiceProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsOfService({ isOpen, onClose }: TermsOfServiceProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Terms of Service</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
            aria-label="Close terms of service"
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
              <h3 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h3>
              <p className="text-gray-300">
                By using AbbroMetals services, you agree to these Terms of Service. If you do not agree, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">2. Service Description</h3>
              <div className="text-gray-300 space-y-3">
                <p>AbbroMetals provides scrap metal buying services including:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Purchase of metal scrap, e-waste, and old appliances</li>
                  <li>Free doorstep pickup services</li>
                  <li>Digital weighing and transparent pricing</li>
                  <li>Instant payment via UPI, cash, or bank transfer</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">3. User Obligations</h3>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>Provide accurate information about scrap materials</li>
                <li>Ensure legal ownership of items being sold</li>
                <li>Allow access for pickup at scheduled times</li>
                <li>Comply with local laws and regulations</li>
                <li>Not misuse or abuse our services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">4. Pricing and Payment</h3>
              <div className="text-gray-300 space-y-3">
                <p>Pricing is determined based on current market rates and material quality. Final prices are confirmed after physical inspection and weighing.</p>
                <p>Payment methods include UPI, cash, and bank transfer. Payments are processed immediately upon completion of transaction.</p>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">5. Service Availability</h3>
              <p className="text-gray-300">
                Services are available across India (28+ states). Pickup scheduling depends on location and material quantity. We reserve the right to refuse service for materials that don't meet our criteria.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">6. Limitation of Liability</h3>
              <div className="text-gray-300 space-y-3">
                <p>AbbroMetals shall not be liable for:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Indirect, incidental, or consequential damages</li>
                  <li>Market price fluctuations</li>
                  <li>Delays due to circumstances beyond our control</li>
                  <li>Third-party actions or omissions</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">7. Intellectual Property</h3>
              <p className="text-gray-300">
                All content, trademarks, and intellectual property on this website belong to AbbroMetals. Users may not reproduce, distribute, or create derivative works without permission.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">8. Dispute Resolution</h3>
              <p className="text-gray-300">
                Any disputes will be resolved through negotiation. If unresolved, disputes will be subject to the jurisdiction of courts in the location of our registered office.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">9. Contact Information</h3>
              <div className="text-gray-300">
                <p><strong>AbbroMetals</strong></p>
                <p>Proprietor: SYED RIZWAN HUSSAIN ABEDI</p>
                <p>Contact: Mohammed Salman</p>
                <p>Phone: +91 91103 55412</p>
                <p>WhatsApp: +91 91103 55412</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-white mb-4">10. Changes to Terms</h3>
              <p className="text-gray-300">
                We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated effective date. Continued use constitutes acceptance of revised terms.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}