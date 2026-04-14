import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-20 py-10 bg-black text-gray-400">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm">
          © 2026 UptimeFlow. Tüm hakları saklıdır.
        </div>
        
        <div className="flex gap-8 text-sm">
          <Link href="/terms" className="hover:text-white transition-colors">
            Kullanım Koşulları
          </Link>
          <Link href="/privacy" className="hover:text-white transition-colors">
            Gizlilik Politikası
          </Link>
          <Link href="/refund" className="hover:text-white transition-colors">
            İade Politikası
          </Link>
        </div>
      </div>
    </footer>
  );
}