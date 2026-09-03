import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Printer } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { Button } from '../components/common/Button';
import confetti from 'canvas-confetti';

export const OrderSuccessPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { getOrder, orders } = useOrders();

  const order = orderId ? getOrder(orderId) : orders[0];

  useEffect(() => {
    // Subtle, elegant particle burst (monochrome silver & white)
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F3F3F0', '#8E9399', '#383D45'],
      });
    } catch (e) {
      console.debug('Confetti effect skipped:', e);
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center pt-28 pb-20 text-center space-y-4 px-6">
        <h2 className="text-2xl font-light text-[#F3F3F0] uppercase tracking-wide">
          ORDER DETAILS NOT FOUND
        </h2>
        <p className="text-xs text-[#8E9399]">
          The requested stillness transaction could not be located.
        </p>
        <Button variant="primary" onClick={() => navigate('/shop')}>
          RETURN TO SHOP
        </Button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-28 pb-24 bg-[#050607] text-[#F3F3F0] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Success Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 pt-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] tracking-widest uppercase">
            <CheckCircle2 size={13} />
            <span>ORDER CONFIRMED & ALLOCATED</span>
          </div>

          <h1 className="font-display font-light text-4xl sm:text-6xl tracking-tight text-[#F3F3F0] uppercase">
            MUTE ACTIVATED.
          </h1>

          <p className="text-sm sm:text-base text-[#8E9399] font-light max-w-md mx-auto italic font-serif">
            "Your 10-minute shutdown starts now."
          </p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-[#0A0C0E] border border-[#20242A] p-6 sm:p-10 space-y-8"
        >
          {/* Order Meta Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-[#1A1E23] font-mono text-xs">
            <div>
              <span className="text-[10px] text-[#8E9399] tracking-wider uppercase block mb-1">
                ORDER NUMBER
              </span>
              <span className="text-[#F3F3F0] font-semibold">{order.orderNumber}</span>
            </div>

            <div>
              <span className="text-[10px] text-[#8E9399] tracking-wider uppercase block mb-1">
                DATE
              </span>
              <span className="text-[#F3F3F0]">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-[#8E9399] tracking-wider uppercase block mb-1">
                EST. DELIVERY
              </span>
              <span className="text-emerald-400 font-medium">{order.estimatedDelivery}</span>
            </div>

            <div>
              <span className="text-[10px] text-[#8E9399] tracking-wider uppercase block mb-1">
                TRACKING
              </span>
              <span className="text-[#8E9399]">{order.trackingNumber || 'MUTE-EXP-001'}</span>
            </div>
          </div>

          {/* Items Summary */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#8E9399]">
              DISPATCH ALLOCATION
            </h3>

            <div className="divide-y divide-[#14171A]">
              {order.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-14 bg-[#121518] border border-[#1F242A] p-1 flex-shrink-0 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-[#F3F3F0] uppercase tracking-wide">
                        {item.name} ({item.packName})
                      </h4>
                      <p className="text-[10px] font-mono text-[#8E9399]">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-xs text-[#F3F3F0]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Financial Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-[#1A1E23]">
            {/* Delivery Destination */}
            <div className="space-y-2 text-xs font-light text-[#8E9399]">
              <span className="font-mono text-[10px] text-[#8E9399] tracking-widest uppercase block mb-1">
                SHIPPING DESTINATION
              </span>
              <p className="text-[#F3F3F0] font-medium">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
              <p className="font-mono text-[11px] pt-1">{order.shippingAddress.email}</p>
            </div>

            {/* Total Math */}
            <div className="space-y-2 font-mono text-xs text-[#8E9399] sm:text-right">
              <span className="font-mono text-[10px] text-[#8E9399] tracking-widest uppercase block mb-1">
                PAYMENT BREAKDOWN
              </span>
              <div className="flex justify-between sm:justify-end sm:gap-8">
                <span>Subtotal:</span>
                <span className="text-[#F3F3F0]">${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between sm:justify-end sm:gap-8 text-emerald-400">
                  <span>Discount:</span>
                  <span>-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between sm:justify-end sm:gap-8">
                <span>Shipping:</span>
                <span>{order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between sm:justify-end sm:gap-8">
                <span>Tax:</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between sm:justify-end sm:gap-8 pt-2 border-t border-[#1C2025] text-sm text-[#F3F3F0] font-sans font-medium">
                <span className="uppercase tracking-wider">Total Paid:</span>
                <span className="font-mono text-base font-semibold text-white">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#1A1E23]">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 text-xs font-mono text-[#8E9399] hover:text-[#F3F3F0] uppercase tracking-wider"
            >
              <Printer size={14} />
              <span>Print Stillness Receipt</span>
            </button>

            <div className="flex items-center gap-3">
              <Link to="/account">
                <Button variant="secondary" size="md">
                  VIEW IN ACCOUNT
                </Button>
              </Link>
              <Link to="/">
                <Button variant="primary" size="md" icon={<ArrowRight size={14} />}>
                  BACK TO MUTE
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Post-order Ritual note */}
        <div className="text-center text-[11px] font-mono text-[#5A606A] tracking-wider uppercase space-y-1">
          <p>A confirmation email has been dispatched to your inbox without promotional noise.</p>
          <p>Thank you for choosing stillness.</p>
        </div>
      </div>
    </div>
  );
};
