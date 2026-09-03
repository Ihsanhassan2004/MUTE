import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Package, User as UserIcon, MapPin, ExternalLink, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { Button } from '../components/common/Button';

export const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, updateShippingAddress } = useAuth();
  const { orders } = useOrders();

  const [activeTab, setActiveTab] = useState<'orders' | 'address'>('orders');

  // Address form local state
  const [address, setAddress] = useState({
    fullName: user?.shippingAddress?.fullName || user?.displayName || '',
    street: user?.shippingAddress?.street || '404 Quiet Avenue, Suite 10',
    apartment: user?.shippingAddress?.apartment || '',
    city: user?.shippingAddress?.city || 'San Francisco',
    state: user?.shippingAddress?.state || 'CA',
    postalCode: user?.shippingAddress?.postalCode || '94103',
    country: user?.shippingAddress?.country || 'United States',
    phone: user?.shippingAddress?.phone || '+1 (555) 892-0192',
  });

  const [saveToast, setSaveToast] = useState(false);

  if (!user) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center pt-28 pb-20 px-6 text-center space-y-4">
        <h2 className="text-2xl font-light text-[#F3F3F0] uppercase tracking-wide">
          MEMBER AUTHENTICATION REQUIRED
        </h2>
        <p className="text-xs text-[#8E9399]">
          Sign in to view your orders and manage your pause subscriptions.
        </p>
        <Button variant="primary" onClick={() => navigate('/login')}>
          SIGN IN TO MUTE
        </Button>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    updateShippingAddress(address);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="pt-28 pb-24 bg-[#050607] text-[#F3F3F0] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        {/* Profile Header Card */}
        <div className="bg-[#0A0C0E] border border-[#20242A] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[#14171A] border border-[#2A2F36] overflow-hidden flex items-center justify-center flex-shrink-0">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'Profile'} className="w-full h-full object-cover" />
              ) : (
                <UserIcon size={24} className="text-[#8E9399]" />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-display font-medium text-xl sm:text-2xl text-[#F3F3F0] uppercase tracking-wide">
                  {user.displayName || 'MUTE Member'}
                </h1>
                <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[9px] font-mono px-2 py-0.5 uppercase tracking-widest">
                  MEMBER
                </span>
              </div>
              <p className="text-xs font-mono text-[#8E9399]">{user.email}</p>
              <p className="text-[10px] font-mono text-[#5A606A] uppercase">
                MEMBER ID: {user.uid.slice(0, 16)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              icon={<LogOut size={13} />}
            >
              LOG OUT
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#1A1E23] gap-8 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`pb-4 uppercase tracking-widest transition-colors flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-b-2 border-[#F3F3F0] text-[#F3F3F0] font-medium'
                : 'text-[#6B7280] hover:text-[#8E9399]'
            }`}
          >
            <Package size={14} />
            <span>MY ORDERS ({orders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('address')}
            className={`pb-4 uppercase tracking-widest transition-colors flex items-center gap-2 ${
              activeTab === 'address'
                ? 'border-b-2 border-[#F3F3F0] text-[#F3F3F0] font-medium'
                : 'text-[#6B7280] hover:text-[#8E9399]'
            }`}
          >
            <MapPin size={14} />
            <span>SAVED ADDRESS</span>
          </button>
        </div>

        {/* TAB 1: ORDERS LIST */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-[#0A0C0E] border border-[#1A1E23] p-12 text-center space-y-4">
                <p className="text-sm font-mono text-[#8E9399] uppercase tracking-wider">
                  No orders placed yet.
                </p>
                <Link to="/shop">
                  <Button variant="primary" size="sm">
                    EXPLORE MUTE BATCHES
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-[#0A0C0E] border border-[#20242A] p-6 space-y-4 hover:border-[#2E343D] transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#14171A] pb-4 font-mono text-xs">
                      <div className="flex items-center gap-4">
                        <span className="text-[#F3F3F0] font-medium uppercase">
                          {order.orderNumber}
                        </span>
                        <span className="text-[#5A606A]">•</span>
                        <span className="text-[#8E9399]">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2.5 py-0.5 text-[10px] uppercase font-mono tracking-wider border ${
                            order.status === 'delivered'
                              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                              : 'bg-[#181B1F] text-[#F3F3F0] border-[#2A2F36]'
                          }`}
                        >
                          {order.status}
                        </span>
                        <span className="text-sm font-semibold text-[#F3F3F0]">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="divide-y divide-[#121518]">
                      {order.items.map((item) => (
                        <div key={item.id} className="py-2.5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-12 bg-[#121518] border border-[#1A1E23] p-1 flex items-center justify-center">
                              <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                            </div>
                            <div>
                              <p className="text-xs font-medium uppercase text-[#F3F3F0]">
                                {item.name} — {item.packName}
                              </p>
                              <p className="text-[10px] font-mono text-[#8E9399]">
                                Quantity: {item.quantity} × ${item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>

                          <span className="font-mono text-xs text-[#F3F3F0]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#14171A] text-xs font-mono text-[#8E9399]">
                      <span>Est: {order.estimatedDelivery}</span>
                      <Link
                        to={`/order-success/${order.id}`}
                        className="inline-flex items-center gap-1 text-[#F3F3F0] hover:underline uppercase tracking-wider text-[11px]"
                      >
                        <span>View Full Invoice</span>
                        <ExternalLink size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ADDRESS MANAGEMENT */}
        {activeTab === 'address' && (
          <form
            onSubmit={handleSaveAddress}
            className="bg-[#0A0C0E] border border-[#20242A] p-6 sm:p-8 space-y-6 max-w-2xl"
          >
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#F3F3F0]">
                DEFAULT DISPATCH ADDRESS
              </h3>
              <p className="text-xs text-[#8E9399] font-light mt-1">
                Used for 1-click checkout and automated recurring pause shipments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="font-mono text-[10px] text-[#8E9399] uppercase">Recipient Name</label>
                <input
                  type="text"
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full bg-[#121518] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="font-mono text-[10px] text-[#8E9399] uppercase">Street Address</label>
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="w-full bg-[#121518] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-[#8E9399] uppercase">City</label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full bg-[#121518] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-[#8E9399] uppercase">State</label>
                <input
                  type="text"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full bg-[#121518] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-[#8E9399] uppercase">Postal / PIN</label>
                <input
                  type="text"
                  value={address.postalCode}
                  onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                  className="w-full bg-[#121518] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-[#8E9399] uppercase">Phone</label>
                <input
                  type="text"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="w-full bg-[#121518] border border-[#20242A] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Button type="submit" variant="primary" size="md">
                SAVE ADDRESS
              </Button>
              {saveToast && (
                <span className="text-emerald-400 font-mono text-xs flex items-center gap-1.5">
                  <CheckCircle size={14} />
                  Address updated
                </span>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
