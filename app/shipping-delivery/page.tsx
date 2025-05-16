"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ShippingDeliveryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Shipping & Delivery Policy</h1>

          <div className="prose prose-lg dark:prose-invert">
            <p>Last updated: April 22, 2025</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Shipping Information</h2>
            <p>
              At RUNAWAY, we strive to provide reliable and efficient shipping services to ensure your orders reach you
              in perfect condition and in a timely manner. Please review our shipping policy below:
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">1.1 Processing Time</h3>
            <p>
              All orders are processed within 1-2 business days (excluding weekends and holidays) after receiving your
              order confirmation email. If we are experiencing high volume, this time may be slightly extended. We will
              notify you if there are any delays.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">1.2 Shipping Methods and Timeframes</h3>
            <p>We offer the following shipping options:</p>
            <table className="min-w-full border border-border my-4">
              <thead>
                <tr className="bg-muted/30">
                  <th className="border border-border p-2 text-left">Shipping Method</th>
                  <th className="border border-border p-2 text-left">Estimated Delivery Time</th>
                  <th className="border border-border p-2 text-left">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Standard Shipping</td>
                  <td className="border border-border p-2">3-5 business days</td>
                  <td className="border border-border p-2">₹299 (Free for orders over ₹5,000)</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Express Shipping</td>
                  <td className="border border-border p-2">1-2 business days</td>
                  <td className="border border-border p-2">₹599</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">International Shipping</td>
                  <td className="border border-border p-2">7-14 business days</td>
                  <td className="border border-border p-2">Calculated at checkout based on location</td>
                </tr>
              </tbody>
            </table>
            <p>
              Please note that these are estimated delivery times and may vary depending on your location and other
              factors beyond our control.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">1.3 Shipping Carriers</h3>
            <p>We use the following carriers to deliver our orders:</p>
            <ul className="list-disc pl-6 my-4">
              <li>Delhivery</li>
              <li>BlueDart</li>
              <li>DTDC</li>
              <li>FedEx (for international orders)</li>
              <li>DHL (for international orders)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Tracking Information</h2>
            <p>
              Once your order has been shipped, you will receive a shipping confirmation email with a tracking number.
              You can use this tracking number to monitor the status of your delivery on our website or directly on the
              carrier's website.
            </p>
            <p>
              If you do not receive tracking information within 3 business days after your order confirmation, please
              contact our customer service team.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Shipping Restrictions</h2>
            <p>
              We currently ship to most locations within India and select international destinations. However, there may
              be some restrictions for remote areas or certain international locations. If we are unable to ship to your
              location, we will notify you promptly.
            </p>
            <p>
              For international orders, please note that you may be responsible for duties, taxes, and customs clearance
              fees. These charges vary by country and are not included in the purchase price or shipping cost.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Delivery Information</h2>

            <h3 className="text-xl font-bold mt-6 mb-3">4.1 Delivery Confirmation</h3>
            <p>
              All deliveries require a signature confirmation to ensure that your package is delivered securely. If no
              one is available to sign for the package, the carrier may leave a delivery attempt notice and will attempt
              delivery again on the next business day.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">4.2 Address Accuracy</h3>
            <p>
              It is your responsibility to provide accurate and complete shipping information. We are not responsible
              for orders that are delayed or delivered to incorrect addresses due to inaccurate information provided by
              the customer.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">4.3 Delivery Issues</h3>
            <p>
              If you experience any issues with your delivery, such as damaged packages, missing items, or significant
              delays, please contact our customer service team immediately. We will work with you and the shipping
              carrier to resolve the issue as quickly as possible.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Order Changes</h2>
            <p>
              If you need to change your shipping address or make any other modifications to your order, please contact
              us as soon as possible. We can only accommodate changes if the order has not yet been shipped.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Contact Us</h2>
            <p>If you have any questions about our Shipping & Delivery Policy, please contact us at:</p>
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
