"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

          <div className="prose prose-lg dark:prose-invert">
            <p>Last updated: April 22, 2025</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to RUNAWAY ("we," "our," or "us"). We are committed to protecting your privacy and personal
              information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website www.runawayofficial.shop, including any other media form, media channel, mobile
              website, or mobile application related or connected thereto (collectively, the "Site").
            </p>
            <p>
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy,
              please do not access the Site.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-bold mt-6 mb-3">Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you register on the Site,
              express an interest in obtaining information about us or our products and services, when you participate
              in activities on the Site, or otherwise when you contact us. The personal information we collect may
              include:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Mailing address</li>
              <li>Phone number</li>
              <li>Billing information</li>
              <li>Account credentials</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-3">Automatically Collected Information</h3>
            <p>
              When you visit our Site, we may automatically collect certain information about your device, including
              information about your web browser, IP address, time zone, and some of the cookies that are installed on
              your device. Additionally, as you browse the Site, we collect information about the individual web pages
              or products that you view, what websites or search terms referred you to the Site, and information about
              how you interact with the Site.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including:</p>
            <ul className="list-disc pl-6 my-4">
              <li>To provide and maintain our Site</li>
              <li>To process and fulfill your orders</li>
              <li>To send you order confirmations and updates</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To send you marketing and promotional communications</li>
              <li>To improve our Site and product offerings</li>
              <li>To protect against fraud and unauthorized transactions</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our Site and hold certain
              information. Cookies are files with a small amount of data which may include an anonymous unique
              identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
              sent.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Third-Party Services</h2>
            <p>
              We may use third-party service providers to help us operate our business and the Site or administer
              activities on our behalf, such as sending out newsletters or surveys. We may share your information with
              these third parties for those limited purposes.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Security</h2>
            <p>
              We use commercially reasonable methods to secure your personal information, but we cannot guarantee its
              absolute security. The safety and security of your information also depends on you. Where we have given
              you (or where you have chosen) a password for access to certain parts of our Site, you are responsible for
              keeping this password confidential.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, such as the
              right to access, correct, or delete your personal information, or to object to or restrict certain
              processing of your personal information.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
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
