"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Terms & Conditions</h1>

          <div className="prose prose-lg dark:prose-invert">
            <p>Last updated: April 22, 2025</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to RUNAWAY. These Terms and Conditions govern your use of our website www.runawayofficial.shop and
              the services offered through it. By accessing or using our website, you agree to be bound by these Terms
              and Conditions.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Definitions</h2>
            <p>
              "Website" refers to www.runawayofficial.shop
              <br />
              "User," "You," and "Your" refers to you, the person accessing this website and accepting these Terms and
              Conditions.
              <br />
              "Company," "We," "Our," and "Us" refers to RUNAWAY.
              <br />
              "Goods" refers to the items offered for sale on the Website.
              <br />
              "Service" refers to the services provided by the Website.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Account Registration</h2>
            <p>
              To access certain features of the Website, you may be required to register for an account. You agree to
              provide accurate, current, and complete information during the registration process and to update such
              information to keep it accurate, current, and complete.
            </p>
            <p>
              You are responsible for safeguarding the password that you use to access the Website and for any
              activities or actions under your password. We encourage you to use a strong password (using a combination
              of upper and lower case letters, numbers, and symbols) with your account.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Products and Pricing</h2>
            <p>
              All descriptions of products or product pricing are subject to change at any time without notice, at our
              sole discretion. We reserve the right to discontinue any product at any time. Any offer for any product or
              service made on this Website is void where prohibited.
            </p>
            <p>
              We do not warrant that the quality of any products, services, information, or other material purchased or
              obtained by you will meet your expectations, or that any errors in the Service will be corrected.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Orders and Payments</h2>
            <p>
              We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or
              cancel quantities purchased per person, per household, or per order. These restrictions may include orders
              placed by or under the same customer account, the same credit card, and/or orders that use the same
              billing and/or shipping address.
            </p>
            <p>
              Payment for all purchases must be made at the time of order. We accept various payment methods as
              indicated on our Website. You represent and warrant that you have the legal right to use any payment
              method(s) you provide in connection with your account.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Shipping and Delivery</h2>
            <p>
              Shipping and delivery times are estimates only and cannot be guaranteed. We are not liable for any delays
              in shipments. Risk of loss and title for items purchased from our Website pass to you upon delivery of the
              items to the carrier.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Intellectual Property</h2>
            <p>
              The Website and its original content, features, and functionality are and will remain the exclusive
              property of RUNAWAY and its licensors. The Website is protected by copyright, trademark, and other laws of
              both India and foreign countries. Our trademarks and trade dress may not be used in connection with any
              product or service without the prior written consent of RUNAWAY.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. User Conduct</h2>
            <p>You agree not to use the Website:</p>
            <ul className="list-disc pl-6 my-4">
              <li>In any way that violates any applicable national or international law or regulation.</li>
              <li>
                To transmit, or procure the sending of, any advertising or promotional material, including any "junk
                mail," "chain letter," "spam," or any other similar solicitation.
              </li>
              <li>
                To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other
                person or entity.
              </li>
              <li>
                To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Website, or
                which, as determined by us, may harm the Company or users of the Website or expose them to liability.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. Limitation of Liability</h2>
            <p>
              In no event shall RUNAWAY, nor its directors, employees, partners, agents, suppliers, or affiliates, be
              liable for any indirect, incidental, special, consequential or punitive damages, including without
              limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access
              to or use of or inability to access or use the Website.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">10. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India, without regard to its
              conflict of law provisions.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">11. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
              is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What
              constitutes a material change will be determined at our sole discretion.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">12. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p>
              Email: shaikrohaz@gmail.com
              <br />
              Phone: +91 9505956681
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
