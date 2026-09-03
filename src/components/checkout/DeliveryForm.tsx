import React from 'react';
import type { ShippingAddress } from '../../types/order';
import { Button } from '../common/Button';

interface DeliveryFormProps {
  initialAddress: ShippingAddress;
  onSubmit: (address: ShippingAddress) => void;
  onBack: () => void;
}

export const DeliveryForm: React.FC<DeliveryFormProps> = ({
  initialAddress,
  onSubmit,
  onBack,
}) => {
  const [address, setAddress] = React.useState<ShippingAddress>(initialAddress);
  const [errors, setErrors] = React.useState<Partial<Record<keyof ShippingAddress, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof ShippingAddress, string>> = {};
    if (!address.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!address.email.trim() || !address.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!address.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!address.addressLine1.trim()) newErrors.addressLine1 = 'Street address is required';
    if (!address.city.trim()) newErrors.city = 'City is required';
    if (!address.state.trim()) newErrors.state = 'State / Province is required';
    if (!address.postalCode.trim()) newErrors.postalCode = 'Postal / PIN Code is required';
    if (!address.country.trim()) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(address);
    }
  };

  const handleChange = (field: keyof ShippingAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-base sm:text-lg font-medium tracking-wide uppercase text-[#F3F3F0] mb-1">
          02 // DELIVERY ADDRESS
        </h3>
        <p className="text-xs text-[#8E9399] font-light">
          Discreet, carbon-neutral shipping in matte black protective packaging.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="sm:col-span-2 space-y-1.5">
          <label className="font-mono text-[10px] text-[#8E9399] uppercase tracking-wider">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={address.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="Julian Vance"
            className="w-full bg-[#0A0C0E] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] placeholder-[#4A4E54] focus:outline-none transition-colors"
          />
          {errors.fullName && <p className="text-[10px] text-red-400 font-mono">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="font-mono text-[10px] text-[#8E9399] uppercase tracking-wider">
            Contact Email *
          </label>
          <input
            type="email"
            required
            value={address.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="julian@drinkmute.com"
            className="w-full bg-[#0A0C0E] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] placeholder-[#4A4E54] focus:outline-none transition-colors"
          />
          {errors.email && <p className="text-[10px] text-red-400 font-mono">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="font-mono text-[10px] text-[#8E9399] uppercase tracking-wider">
            Mobile Number *
          </label>
          <input
            type="tel"
            required
            value={address.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 019-2834"
            className="w-full bg-[#0A0C0E] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] placeholder-[#4A4E54] focus:outline-none transition-colors"
          />
          {errors.phone && <p className="text-[10px] text-red-400 font-mono">{errors.phone}</p>}
        </div>

        {/* Street Address */}
        <div className="sm:col-span-2 space-y-1.5">
          <label className="font-mono text-[10px] text-[#8E9399] uppercase tracking-wider">
            Street Address *
          </label>
          <input
            type="text"
            required
            value={address.addressLine1}
            onChange={(e) => handleChange('addressLine1', e.target.value)}
            placeholder="404 Quiet Boulevard"
            className="w-full bg-[#0A0C0E] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] placeholder-[#4A4E54] focus:outline-none transition-colors"
          />
          {errors.addressLine1 && <p className="text-[10px] text-red-400 font-mono">{errors.addressLine1}</p>}
        </div>

        {/* Apartment / Suite */}
        <div className="sm:col-span-2 space-y-1.5">
          <label className="font-mono text-[10px] text-[#8E9399] uppercase tracking-wider">
            Apartment / Suite / Floor (Optional)
          </label>
          <input
            type="text"
            value={address.addressLine2 || ''}
            onChange={(e) => handleChange('addressLine2', e.target.value)}
            placeholder="Apt 12B"
            className="w-full bg-[#0A0C0E] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] placeholder-[#4A4E54] focus:outline-none transition-colors"
          />
        </div>

        {/* City */}
        <div className="space-y-1.5">
          <label className="font-mono text-[10px] text-[#8E9399] uppercase tracking-wider">
            City *
          </label>
          <input
            type="text"
            required
            value={address.city}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder="San Francisco"
            className="w-full bg-[#0A0C0E] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] placeholder-[#4A4E54] focus:outline-none transition-colors"
          />
          {errors.city && <p className="text-[10px] text-red-400 font-mono">{errors.city}</p>}
        </div>

        {/* State */}
        <div className="space-y-1.5">
          <label className="font-mono text-[10px] text-[#8E9399] uppercase tracking-wider">
            State / Province *
          </label>
          <input
            type="text"
            required
            value={address.state}
            onChange={(e) => handleChange('state', e.target.value)}
            placeholder="CA"
            className="w-full bg-[#0A0C0E] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] placeholder-[#4A4E54] focus:outline-none transition-colors"
          />
          {errors.state && <p className="text-[10px] text-red-400 font-mono">{errors.state}</p>}
        </div>

        {/* Postal / PIN Code */}
        <div className="space-y-1.5">
          <label className="font-mono text-[10px] text-[#8E9399] uppercase tracking-wider">
            Postal / PIN Code *
          </label>
          <input
            type="text"
            required
            value={address.postalCode}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            placeholder="94103"
            className="w-full bg-[#0A0C0E] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] placeholder-[#4A4E54] focus:outline-none transition-colors"
          />
          {errors.postalCode && <p className="text-[10px] text-red-400 font-mono">{errors.postalCode}</p>}
        </div>

        {/* Country */}
        <div className="space-y-1.5">
          <label className="font-mono text-[10px] text-[#8E9399] uppercase tracking-wider">
            Country *
          </label>
          <select
            value={address.country}
            onChange={(e) => handleChange('country', e.target.value)}
            className="w-full bg-[#0A0C0E] border border-[#20242A] focus:border-[#F3F3F0] px-3 py-2.5 text-xs text-[#F3F3F0] focus:outline-none transition-colors"
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Germany">Germany</option>
            <option value="Japan">Japan</option>
            <option value="Australia">Australia</option>
            <option value="India">India</option>
            <option value="Singapore">Singapore</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-[#181B1F]">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-mono text-[#8E9399] hover:text-[#F3F3F0] uppercase tracking-wider"
        >
          ← Back to Account
        </button>

        <Button variant="primary" size="md" type="submit">
          PROCEED TO PAYMENT →
        </Button>
      </div>
    </form>
  );
};
