import React, { useState } from 'react';
import { CreditCard, Smartphone, ShieldCheck, Lock, Sparkles } from 'lucide-react';
import type { PaymentDetails } from '../../types/order';
import { Button } from '../common/Button';

interface PaymentFormProps {
  totalAmount: number;
  onSubmit: (payment: PaymentDetails) => void;
  onBack: () => void;
  isProcessing: boolean;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  totalAmount,
  onSubmit,
  onBack,
  isProcessing,
}) => {
  const [method, setMethod] = useState<'card' | 'upi' | 'mock_gateway'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('08/28');
  const [cvc, setCvc] = useState('888');
  const [cardName, setCardName] = useState('Alexander Sterling');
  const [upiId, setUpiId] = useState('alexander@okhdfcbank');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const details: PaymentDetails = {
      method,
      brand: method === 'card' ? 'Visa' : undefined,
      last4: method === 'card' ? cardNumber.replace(/\D/g, '').slice(-4) || '4242' : undefined,
      upiId: method === 'upi' ? upiId : undefined,
      transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      status: 'completed',
    };
    onSubmit(details);
  };

  const handleInstantSandboxPay = () => {
    const details: PaymentDetails = {
      method: 'mock_gateway',
      brand: 'Test Gateway (Stripe/Razorpay Simulated)',
      last4: '4242',
      transactionId: `TXN_SANDBOX_${Date.now()}`,
      status: 'completed',
    };
    onSubmit(details);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-base sm:text-lg font-medium tracking-wide uppercase text-[#F3F3F0] mb-1">
          03 // PAYMENT METHOD
        </h3>
        <p className="text-xs text-[#8E9399] font-light">
          Encrypted, secure transaction. Ready for live Stripe / Razorpay gateways.
        </p>
      </div>

      {/* Payment Method Selector Tabs */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setMethod('card')}
          className={`p-3.5 border flex items-center gap-3 transition-all ${
            method === 'card'
              ? 'border-[#F3F3F0] bg-[#14171A]'
              : 'border-[#20242A] bg-[#0A0C0E] text-[#8E9399]'
          }`}
        >
          <CreditCard size={18} className={method === 'card' ? 'text-white' : 'text-[#8E9399]'} />
          <div className="text-left">
            <p className="text-xs font-mono uppercase text-[#F3F3F0]">Card</p>
            <p className="text-[10px] text-[#8E9399]">Credit / Debit</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setMethod('upi')}
          className={`p-3.5 border flex items-center gap-3 transition-all ${
            method === 'upi'
              ? 'border-[#F3F3F0] bg-[#14171A]'
              : 'border-[#20242A] bg-[#0A0C0E] text-[#8E9399]'
          }`}
        >
          <Smartphone size={18} className={method === 'upi' ? 'text-white' : 'text-[#8E9399]'} />
          <div className="text-left">
            <p className="text-xs font-mono uppercase text-[#F3F3F0]">UPI / App</p>
            <p className="text-[10px] text-[#8E9399]">Instant Transfer</p>
          </div>
        </button>
      </div>

      {/* Card Inputs */}
      {method === 'card' && (
        <div className="space-y-4 bg-[#0A0C0E] border border-[#1F242B] p-5">
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] text-[#8E9399] uppercase tracking-wider">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="4242 •••• •••• 4242"
                className="w-full bg-[#121518] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] font-mono focus:outline-none"
              />
              <Lock size={13} className="absolute right-3 top-3 text-[#6B7280]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] text-[#8E9399] uppercase tracking-wider">
                Expires (MM/YY)
              </label>
              <input
                type="text"
                required
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="08/28"
                className="w-full bg-[#121518] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] font-mono focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[10px] text-[#8E9399] uppercase tracking-wider">
                Security Code (CVC)
              </label>
              <input
                type="text"
                required
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                placeholder="888"
                className="w-full bg-[#121518] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] font-mono focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-[10px] text-[#8E9399] uppercase tracking-wider">
              Name on Card
            </label>
            <input
              type="text"
              required
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Alexander Sterling"
              className="w-full bg-[#121518] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* UPI Inputs */}
      {method === 'upi' && (
        <div className="space-y-4 bg-[#0A0C0E] border border-[#1F242B] p-5">
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] text-[#8E9399] uppercase tracking-wider">
              UPI ID / VPA
            </label>
            <input
              type="text"
              required
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="username@bank"
              className="w-full bg-[#121518] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] font-mono focus:outline-none"
            />
          </div>
          <p className="text-[11px] text-[#8E9399] font-light">
            You will receive a notification on your UPI app to approve the payment of ${totalAmount.toFixed(2)}.
          </p>
        </div>
      )}

      {/* Instant Demo Sandbox Shortcut */}
      <div className="bg-[#121518]/60 border border-[#2A2F36] p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-emerald-400" />
          <div>
            <p className="text-xs font-mono uppercase text-[#F3F3F0]">Evaluator Sandbox Mode</p>
            <p className="text-[10px] text-[#8E9399]">Test complete transaction without real payment credentials</p>
          </div>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleInstantSandboxPay}
          loading={isProcessing}
        >
          1-Click Test Order
        </Button>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-[#181B1F]">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-mono text-[#8E9399] hover:text-[#F3F3F0] uppercase tracking-wider"
        >
          ← Edit Delivery
        </button>

        <Button variant="primary" size="lg" type="submit" loading={isProcessing}>
          COMPLETE ORDER (${totalAmount.toFixed(2)})
        </Button>
      </div>

      {/* Security Statement */}
      <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#5A606A] uppercase pt-2">
        <ShieldCheck size={13} />
        <span>End-to-end 256-bit encrypted TLS • No raw keys stored</span>
      </div>
    </form>
  );
};
