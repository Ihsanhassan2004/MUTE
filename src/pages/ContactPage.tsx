import React, { useState } from 'react';
import { Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';

export const ContactPage: React.FC = () => {
  const [inquiryType, setInquiryType] = useState('General Concierge');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="pt-28 pb-24 bg-[#050607] text-[#F3F3F0] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="font-mono text-[10px] text-[#8E9399] tracking-[0.35em] uppercase">
            01 // COMMUNICATIONS
          </span>
          <h1 className="font-display font-light text-3xl sm:text-5xl tracking-tight text-[#F3F3F0] uppercase">
            CONTACT CONCIERGE
          </h1>
          <p className="text-xs sm:text-sm text-[#8E9399] font-light">
            We respond within 24 hours. No urgent notifications.
          </p>
        </div>

        {/* Contact Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Left Info Column */}
          <div className="md:col-span-5 bg-[#0A0C0E] border border-[#20242A] p-6 sm:p-8 space-y-8">
            <div>
              <span className="font-mono text-[10px] text-[#8E9399] uppercase tracking-widest block mb-1">
                DIRECT CHANNELS
              </span>
              <p className="text-sm font-mono text-[#F3F3F0]">concierge@drinkmute.com</p>
              <p className="text-xs text-[#6B7280] mt-1 font-light">For customer support, order inquiries & subscriptions.</p>
            </div>

            <div>
              <span className="font-mono text-[10px] text-[#8E9399] uppercase tracking-widest block mb-1">
                PRESS & PARTNERSHIPS
              </span>
              <p className="text-sm font-mono text-[#F3F3F0]">press@drinkmute.com</p>
              <p className="text-xs text-[#6B7280] mt-1 font-light">Editorial requests, wholesale reserves & brand collaborations.</p>
            </div>

            <div className="pt-4 border-t border-[#14171A] space-y-3 text-xs text-[#8E9399] font-light">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#8E9399]" />
                <span>Response window: 24 business hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#8E9399]" />
                <span>Zero marketing automation drip campaigns</span>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="md:col-span-7 bg-[#0A0C0E] border border-[#20242A] p-6 sm:p-8">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="inline-flex p-3 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="font-mono text-sm uppercase tracking-wider text-[#F3F3F0]">
                  DISPATCH RECEIVED
                </h3>
                <p className="text-xs text-[#8E9399] font-light max-w-xs mx-auto">
                  Your message has been delivered to our concierge team. We will reply calmly within 24 hours.
                </p>
                <div className="pt-2">
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                    Send Another Note
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-[#8E9399] uppercase tracking-wider">
                    Inquiry Type
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-[#121518] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] font-mono focus:outline-none"
                  >
                    <option value="General Concierge">General Concierge</option>
                    <option value="Order & Delivery Tracking">Order & Delivery Tracking</option>
                    <option value="Wholesale & Retail Stockist">Wholesale & Retail Stockist</option>
                    <option value="Press & Media Inquiries">Press & Media Inquiries</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-[#8E9399] uppercase tracking-wider">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Julian Vance"
                    className="w-full bg-[#121518] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] placeholder-[#4A4E54] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-[#8E9399] uppercase tracking-wider">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="julian@drinkmute.com"
                    className="w-full bg-[#121518] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] placeholder-[#4A4E54] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-[#8E9399] uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us how we can assist your pause..."
                    className="w-full bg-[#121518] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] placeholder-[#4A4E54] focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    size="md"
                    icon={<Send size={13} />}
                  >
                    SEND DISPATCH →
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
