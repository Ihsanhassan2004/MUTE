import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import { SoundProvider } from './context/SoundContext';
import { Layout } from './components/layout/Layout';
import { ScrollToTop } from './components/common/ScrollToTop';
import { CinematicLoader } from './components/common/CinematicLoader';

import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { AccountPage } from './pages/AccountPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminPage } from './pages/AdminPage';

export function App() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      {!loaderDone && (
        <CinematicLoader onComplete={() => setLoaderDone(true)} />
      )}
      <AuthProvider>
        <OrderProvider>
          <SoundProvider>
            <HashRouter>
              <ScrollToTop />
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<Navigate to="/" replace />} />
                  <Route path="/product" element={<Navigate to="/" replace />} />
                  <Route path="/cart" element={<Navigate to="/" replace />} />
                  <Route path="/checkout" element={<Navigate to="/" replace />} />
                  <Route path="/order-success/:orderId" element={<Navigate to="/" replace />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/about" element={<Navigate to="/" replace />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/admin/subscribers" element={<AdminPage />} />
                  <Route path="/mute-admin" element={<AdminPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            </HashRouter>
          </SoundProvider>
        </OrderProvider>
      </AuthProvider>
    </>
  );
}

export default App;
