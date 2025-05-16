"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CancellationRefundPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Cancellation & Refund Policy</h1>

          <div className="prose prose-lg dark:prose-invert">
            <p>Last updated: April 22, 2025</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Order Cancellation</h2>
            <p>
              At RUNAWAY, we understand that circumstances may arise where you need to cancel your order. Please review
              our cancellation policy below:
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">1.1 Cancellation Before Shipping</h3>
            <p>
              You may cancel your order at any time before it has been shipped. To cancel an order, please contact our
              customer service team immediately via email at shaikrohaz@gmail.com or call us at +91 9505956681. Please
              provide your order number and the reason for cancellation.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">1.2 Cancellation After Shipping</h3>
            <p>
              Once your order has been shipped, it cannot be cancelled. However, you may refuse to accept the delivery
              or return the product as per our return policy.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Return Policy</h2>
            <p>
              We want you to be completely satisfied with your purchase. If you are not satisfied for any reason, you
              may return the product according to the following terms:
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">2.1 Return Eligibility</h3>
            <p>To be eligible for a return, your item must be:</p>
            <ul className="list-disc pl-6 my-4">
              <li>Unused and in the same condition that you received it</li>
              <li>In the original packaging</li>
              <li>Returned within 30 days of delivery</li>
              <li>Accompanied by the original receipt or proof of purchase</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-3">2.2 Non-Returnable Items</h3>
            <p>The following items cannot be returned:</p>
            <ul className="list-disc pl-6 my-4">
              <li>Items that have been worn, washed, or altered</li>
              <li>Items marked as "Final Sale" or "Non-Returnable"</li>
              <li>Gift cards</li>
              <li>Personalized or custom-made items</li>
              <li>Intimate apparel for hygiene reasons</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-3">2.3 Return Process</h3>
            <p>To initiate a return, please follow these steps:</p>
            <ol className="list-decimal pl-6 my-4">
              <li>Contact our customer service team at shaikrohaz@gmail.com to request a return authorization.</li>
              <li>Pack the item securely in its original packaging along with the return authorization form.</li>
              <li>Ship the package to the address provided by our customer service team.</li>
              <li>
                We recommend using a trackable shipping service and purchasing shipping insurance, as we cannot be
                responsible for items lost or damaged in transit.
              </li>
            </ol>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Refund Policy</h2>

            <h3 className="text-xl font-bold mt-6 mb-3">3.1 Refund Processing</h3>
            <p>
              Once your return is received and inspected, we will send you an email to notify you that we have received
              your returned item. We will also notify you of the approval or rejection of your refund.
            </p>
            <p>
              If approved, your refund will be processed, and a credit will automatically be applied to your original
              method of payment within 7-14 business days, depending on your card issuer's policies.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">3.2 Refund Methods</h3>
            <p>Refunds will be issued using the same payment method used for the original purchase:</p>
            <ul className="list-disc pl-6 my-4">
              <li>Credit/Debit Card: Refunded to the original card</li>
              <li>Net Banking: Refunded to the original bank account</li>
              <li>UPI: Refunded to the original UPI ID</li>
              <li>Cash on Delivery: Refunded via bank transfer (you will need to provide your bank details)</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-3">3.3 Partial Refunds</h3>
            <p>Partial refunds may be granted in the following cases:</p>
            <ul className="list-disc pl-6 my-4">
              <li>Items returned with signs of use or wear</li>
              <li>Items returned without original packaging</li>
              <li>Items returned after the 30-day return window but within 45 days</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-3">3.4 Refund for Damaged or Defective Items</h3>
            <p>
              If you receive a damaged or defective item, please contact our customer service team immediately. We will
              arrange for a return and issue a full refund, including shipping costs, or send a replacement at our
              discretion.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Exchanges</h2>
            <p>
              We do not offer direct exchanges. If you wish to exchange an item, please return the original item for a
              refund and place a new order for the desired item.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Shipping Costs for Returns</h2>
            <p>
              Customers are responsible for return shipping costs unless the return is due to our error (you received an
              incorrect or defective item). In such cases, we will provide a prepaid shipping label or reimburse your
              shipping costs.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Contact Us</h2>
            <p>If you have any questions about our Cancellation & Refund Policy, please contact us at:</p>
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
