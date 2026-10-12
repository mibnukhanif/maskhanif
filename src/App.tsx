/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';

interface PortfolioItem {
  id: number;
  image: string;
  title: string;
  category: string;
}

interface CertificateItem {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const portfolioList: PortfolioItem[] = [
  { id: 1, image: '/image/3.svg', title: 'Feed Medsos', category: 'Identitas Visual Kreatif' },
  { id: 2, image: '/image/4.svg', title: 'Feed Medsos', category: 'Identitas Visual Kreatif' },
  { id: 3, image: '/image/5.svg', title: 'Feed Medsos', category: 'Identitas Visual Kreatif' },
  { id: 4, image: '/image/6.svg', title: 'Feed Medsos', category: 'Identitas Visual Kreatif' },
  { id: 5, image: '/image/7.svg', title: 'Poster & Label', category: 'Desain Pemasaran' },
  { id: 6, image: '/image/8.svg', title: 'Dekorasi Marketplace', category: 'Desain Pemasaran' },
  { id: 7, image: '/image/9.svg', title: 'Dekorasi Marketplace', category: 'Desain Pemasaran' },
  { id: 8, image: '/image/10.svg', title: 'Dekorasi Marketplace', category: 'Desain Pemasaran' },
  { id: 9, image: '/image/11.svg', title: 'Dekorasi Marketplace', category: 'Desain Pemasaran' },
  { id: 10, image: '/image/12.svg', title: 'Brosur & Stand Banner', category: 'Desain Promosi' },
];

const certificates: CertificateItem[] = [
  {
    id: 1,
    image: '/image/13.svg',
    title: 'Kursus Aplikasi Perkantoran',
    subtitle: 'Level 3 KKNI',
  },
  {
    id: 2,
    image: '/image/14.svg',
    title: 'Sertifikat Desain Grafis',
    subtitle: 'My Skill',
  },
  {
    id: 3,
    image: '/image/15.svg',
    title: 'Kompetisi Desain Gratitude Box',
    subtitle: 'Burger Bangor',
  },
];

const faqData: FAQItem[] = [
  {
    id: 1,
    question: 'Apakah desain bisa custom?',
    answer: 'Ya. Semua desain dapat disesuaikan dengan kebutuhan, konsep, warna, maupun identitas bisnis Anda.',
  },
  {
    id: 2,
    question: 'Berapa lama proses pengerjaan?',
    answer: 'Tergantung tingkat kesulitan desain. Umumnya antara 1–5 hari kerja.',
  },
  {
    id: 3,
    question: 'Apakah bisa revisi?',
    answer: 'Bisa. Revisi tersedia sesuai paket yang dipilih untuk memastikan hasil maksimal.',
  },
  {
    id: 4,
    question: 'Bagaimana cara melakukan pemesanan?',
    answer: 'Klik tombol "Pesan Sekarang", kemudian konsultasikan kebutuhan desain melalui WhatsApp. Setelah konsep disepakati, proses desain akan segera dikerjakan.',
  },
  {
    id: 5,
    question: 'Apakah menerima desain untuk percetakan?',
    answer: 'Ya. File akan disiapkan dalam format siap cetak (CMYK, resolusi tinggi) dengan kualitas terbaik.',
  },
  {
    id: 6,
    question: 'File apa saja yang akan diterima?',
    answer: 'PNG, JPG, PDF, SVG serta file editable (CDR, PSD, CANVA) sesuai paket yang dipilih.',
  },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Slider state
  const [portfolioIndex, setPortfolioIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Scroll detection for Navbar and BackToTop
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ESC key for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-scroll slider
  useEffect(() => {
    const interval = setInterval(() => {
      setPortfolioIndex((prev) => (prev + 1) % portfolioList.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setPortfolioIndex((prev) => (prev + 1) % portfolioList.length);
  };

  const prevSlide = () => {
    setPortfolioIndex((prev) => (prev - 1 + portfolioList.length) % portfolioList.length);
  };

  const toggleFaq = (id: number) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen text-[#222222] bg-[#f8f8f8] selection:bg-[#fdb60c] selection:text-[#222222]">
      {/* HEADER / NAVBAR */}
      <header
        id="navbar"
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'navbar-scrolled' : 'navbar-glass'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
          <a
            href="#"
            className="font-heading font-bold text-2xl tracking-tighter text-[#222222] flex items-center gap-2"
          >
            <span className="bg-[#fdb60c] text-white w-10 h-10 rounded-xl flex items-center justify-center font-black">
              IK
            </span>
            Khanif<span className="text-[#fdb60c]">.</span>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-8 font-medium text-sm">
            <a href="#beranda" className="hover:text-[#fdb60c] transition-colors">
              Beranda
            </a>
            <a href="#tentang" className="hover:text-[#fdb60c] transition-colors">
              Tentang
            </a>
            <a href="#jasa-unggulan" className="hover:text-[#fdb60c] transition-colors">
              Jasa
            </a>
            <a href="#portofolio" className="hover:text-[#fdb60c] transition-colors">
              Portofolio
            </a>
            <a href="#faq" className="hover:text-[#fdb60c] transition-colors">
              FAQ
            </a>
          </nav>

          <a
            href="https://wa.me/6285155284564"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-block bg-[#222222] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]"
          >
            Hubungi Saya
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-2xl text-[#222222] focus:outline-none p-1 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
            <nav className="flex flex-col px-6 py-4 gap-4 font-medium">
              <a
                href="#beranda"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#fdb60c] py-1"
              >
                Beranda
              </a>
              <a
                href="#tentang"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#fdb60c] py-1"
              >
                Tentang
              </a>
              <a
                href="#jasa-unggulan"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#fdb60c] py-1"
              >
                Jasa
              </a>
              <a
                href="#portofolio"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#fdb60c] py-1"
              >
                Portofolio
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#fdb60c] py-1"
              >
                FAQ
              </a>
              <a
                href="https://wa.me/6285155284564"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-[#fdb60c] text-[#222222] text-center py-3 rounded-xl font-bold mt-2"
              >
                Hubungi Saya
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section
        id="beranda"
        className="hero-bg min-h-[90vh] flex items-center pt-28 pb-16 relative overflow-hidden"
      >
        <div className="absolute w-[400px] h-[400px] -top-[100px] -right-[100px] rounded-full bg-white/10 pointer-events-none"></div>
        <div className="absolute w-[250px] h-[250px] bottom-[50px] -left-[50px] rounded-full bg-white/10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-pattern opacity-20 pointer-events-none"></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <span className="inline-block py-1 px-3 rounded-full bg-white/30 text-[#222222] text-sm font-semibold mb-4 backdrop-blur-sm border border-white/50">
              👋 Halo, Selamat Datang
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#222222] leading-tight mb-6 font-heading">
              Solusi Desain Grafis Profesional Untuk{' '}
              <span className="text-white drop-shadow-md">Bisnis Anda</span>
            </h1>
            <p className="text-[#222222]/90 text-base md:text-lg mb-8 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
              Bangun identitas visual yang kuat bersama Ibnu Khanif. Mulai dari logo, branding, media
              sosial, banner, kemasan produk hingga berbagai kebutuhan desain digital maupun cetak
              dengan hasil profesional, cepat, dan berkualitas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#jasa-unggulan"
                className="btn-hover bg-[#222222] text-white px-8 py-4 rounded-xl font-bold text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                Pesan Sekarang
              </a>
              <a
                href="#portofolio"
                className="btn-hover bg-white text-[#222222] border-2 border-transparent px-8 py-4 rounded-xl font-bold text-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:border-[#222222] transition-all"
              >
                Lihat Portofolio
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full lg:w-1/2 flex justify-center relative">
            <div className="relative w-full max-w-[450px]">
              <img
                src="/image/1.svg"
                alt="Ibnu Khanif - Desainer Grafis"
                className="w-full h-auto drop-shadow-2xl object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: Tentang Saya */}
      <section id="tentang" className="py-24 bg-white relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              {/* Profile Picture */}
              <div className="bg-[#f8f8f8] rounded-[30px] p-4 md:p-6 relative flex justify-center items-center aspect-[4/5] md:h-[450px]">
                <div className="absolute inset-0 bg-[#fdb60c] opacity-5 rounded-[30px] transform rotate-3"></div>
                <img
                  src="/image/2.svg"
                  alt="Foto Ibnu Khanif"
                  className="w-full h-full object-cover rounded-2xl relative z-10 shadow-xl"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-1 bg-[#fdb60c] rounded-full"></span>
                <span className="font-bold text-[#fdb60c] uppercase tracking-wider text-sm">
                  Profil
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 text-[#222222]">
                Tentang Saya
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Saya merupakan pelaku usaha di bidang desain grafis yang telah berpengalaman
                menangani berbagai kebutuhan branding digital maupun media visual cetak.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Fokus utama saya adalah membantu individu, UMKM, hingga instansi membangun identitas
                visual yang kuat, profesional, dan mampu meningkatkan kepercayaan pelanggan melalui
                desain yang menarik, efektif, dan sesuai kebutuhan.
              </p>

              <div className="flex gap-6">
                <div>
                  <h4 className="text-3xl font-bold text-[#222222] font-heading">5+</h4>
                  <p className="text-sm text-gray-500 font-medium mt-1">Tahun Pengalaman</p>
                </div>
                <div className="w-px bg-gray-200"></div>
                <div>
                  <h4 className="text-3xl font-bold text-[#222222] font-heading">500+</h4>
                  <p className="text-sm text-gray-500 font-medium mt-1">Proyek Selesai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Jasa Unggulan */}
      <section id="jasa-unggulan" className="py-24 bg-[#222222] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#fdb60c] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#fdb60c] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Jasa Unggulan</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Paket lengkap desain grafis untuk memenuhi segala kebutuhan visual bisnis Anda dalam
              satu layanan.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-[24px] p-8 md:p-12 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center gap-10">
              {/* Info Kiri */}
              <div className="w-full md:w-1/2 text-center md:text-left border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-10">
                <div className="inline-block bg-[#fdb60c] text-[#222222] font-bold px-4 py-1.5 rounded-full text-sm mb-6">
                  Best Seller
                </div>
                <h3 className="text-3xl md:text-4xl font-bold font-heading mb-2">Desain Grafis</h3>
                <p className="text-gray-400 mb-6">All-in-one design service</p>

                <div className="mb-8">
                  <p className="text-sm text-gray-400 mb-1">Harga Mulai Dari</p>
                  <div className="flex items-baseline justify-center md:justify-start gap-1">
                    <span className="text-2xl font-bold text-[#fdb60c]">Rp</span>
                    <span className="text-5xl font-bold font-heading text-[#fdb60c]">75.000</span>
                  </div>
                </div>

                <a
                  href="https://wa.me/6285155284564?text=Halo%20Ibnu,%20saya%20ingin%20memesan%20jasa%20Desain%20Grafis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block bg-[#fdb60c] hover:bg-yellow-400 text-[#222222] font-bold text-lg py-4 px-8 rounded-xl transition shadow-[0_10px_20px_-10px_rgba(253,182,12,0.5)] text-center"
                >
                  <i className="fab fa-whatsapp mr-2 text-xl"></i> Pesan Sekarang
                </a>
              </div>

              {/* List Kanan */}
              <div className="w-full md:w-1/2">
                <h4 className="font-bold text-lg mb-6 border-b border-white/10 pb-2">
                  Layanan Meliputi:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2">
                  {[
                    'Logo',
                    'Kemasan Produk',
                    'Banner',
                    'Kartu Nama',
                    'Poster',
                    'Sertifikat',
                    'Brosur',
                    'Thumbnail',
                    'Feed Instagram',
                    'Spanduk',
                  ].map((layanan, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <i className="fas fa-check-circle text-[#fdb60c]"></i>{' '}
                      <span className="text-gray-300 hover:text-white transition">{layanan}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Pilihan Jasa Lainnya */}
      <section id="jasa-lain" className="py-24 bg-[#f8f8f8]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#222222] mb-4">
              Pilihan Jasa Lainnya
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Selain desain grafis umum, kami juga menyediakan layanan khusus untuk momen spesial Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] card-hover border border-gray-100 flex flex-col h-full">
              <div className="w-14 h-14 bg-[#fdb60c]/10 rounded-xl flex items-center justify-center text-[#fdb60c] text-2xl mb-6">
                <i className="fas fa-globe"></i>
              </div>
              <h3 className="text-xl font-bold font-heading text-[#222222] mb-3">
                Website Undangan Pernikahan
              </h3>
              <p className="text-gray-600 mb-8 flex-grow leading-relaxed text-sm">
                Hadirkan momen pernikahan lebih berkesan melalui undangan digital berbasis website
                yang elegan, modern, mudah dibagikan, lengkap dengan galeri foto, peta lokasi, RSVP,
                countdown, hingga musik pilihan.
              </p>
              <a
                href="https://wa.me/6285155284564?text=Halo,%20saya%20ingin%20bertanya%20tentang%20Website%20Undangan%20Pernikahan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#fdb60c] font-bold hover:text-[#222222] transition flex items-center gap-2 mt-auto"
              >
                Lihat Detail <i className="fas fa-arrow-right text-sm"></i>
              </a>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] card-hover border border-gray-100 flex flex-col h-full">
              <div className="w-14 h-14 bg-[#fdb60c]/10 rounded-xl flex items-center justify-center text-[#fdb60c] text-2xl mb-6">
                <i className="fas fa-envelope-open-text"></i>
              </div>
              <h3 className="text-xl font-bold font-heading text-[#222222] mb-3">
                Undangan Cetak Pernikahan
              </h3>
              <p className="text-gray-600 mb-8 flex-grow leading-relaxed text-sm">
                Cetak undangan berkualitas premium dengan berbagai pilihan desain elegan, minimalis
                maupun custom sesuai konsep acara. Menggunakan material terbaik agar memberikan kesan
                istimewa kepada setiap tamu.
              </p>
              <a
                href="https://wa.me/6285155284564?text=Halo,%20saya%20ingin%20bertanya%20tentang%20Undangan%20Cetak"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#fdb60c] font-bold hover:text-[#222222] transition flex items-center gap-2 mt-auto"
              >
                Lihat Detail <i className="fas fa-arrow-right text-sm"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Portofolio Desain */}
      <section id="portofolio" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-8 h-1 bg-[#fdb60c] rounded-full"></span>
              <span className="font-bold text-[#fdb60c] uppercase tracking-wider text-sm">
                Karya Kami
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#222222]">
              Portofolio Desain
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 relative z-10">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-gray-200 bg-white hover:bg-[#fdb60c] hover:text-white hover:border-[#fdb60c] transition flex items-center justify-center text-[#fdb60c] shadow-sm cursor-pointer"
              aria-label="Previous portfolio item"
            >
              <i className="fas fa-chevron-left font-bold"></i>
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-gray-200 bg-white hover:bg-[#fdb60c] hover:text-white hover:border-[#fdb60c] transition flex items-center justify-center text-[#fdb60c] shadow-sm cursor-pointer"
              aria-label="Next portfolio item"
            >
              <i className="fas fa-chevron-right font-bold"></i>
            </button>
          </div>
        </div>

        {/* Portfolio Carousel Container */}
        <div className="container mx-auto px-6 lg:px-12">
          <div className="overflow-hidden" ref={sliderRef}>
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${portfolioIndex * (100 / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1))}%)`,
              }}
            >
              {portfolioList.map((item) => (
                <div
                  key={item.id}
                  className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
                  onClick={() => setLightboxImage(item.image)}
                >
                  <div className="portfolio-card group cursor-pointer relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-md">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/90 via-[#222222]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-white font-bold text-lg font-heading translate-y-4 group-hover:translate-y-0 transition-transform">
                        {item.title}
                      </h3>
                      <p className="text-white/80 text-sm translate-y-4 group-hover:translate-y-0 transition-transform delay-75">
                        {item.category}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {portfolioList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPortfolioIndex(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  portfolioIndex === idx ? 'w-8 bg-[#fdb60c]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: Sertifikat */}
      <section id="sertifikat" className="py-24 bg-white border-t border-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-8 h-1 bg-[#fdb60c] rounded-full"></span>
              <span className="font-bold text-[#fdb60c] uppercase tracking-wider text-sm">
                Pencapaian
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#222222] mb-4">
              Sertifikat &amp; Penghargaan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bukti kompetensi dan dedikasi kami dalam memberikan kualitas desain serta layanan
              profesional terbaik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setLightboxImage(cert.image)}
                className="bg-[#f8f8f8] rounded-xl p-4 shadow-sm hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition card-hover border border-gray-100 group cursor-pointer"
              >
                <div className="relative rounded-lg overflow-hidden bg-gray-200 mb-5 aspect-[4/3] shadow-inner">
                  <img
                    src={cert.image}
                    alt={`${cert.title} ${cert.subtitle}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-[#fdb60c] text-white rounded-full flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <i className="fas fa-search-plus text-xl"></i>
                    </div>
                  </div>
                </div>
                <h3 className="font-bold font-heading text-[#222222] text-center leading-snug px-2 pb-2">
                  {cert.title}
                  <br />
                  {cert.subtitle}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Kenapa Memilih Jasa Kami? */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#222222] mb-4">
              Kenapa Memilih Jasa Kami?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Keunggulan layanan yang membuat kami menjadi mitra terbaik untuk visual bisnis Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: 'fa-star',
                title: 'Berpengalaman',
                desc: 'Telah menangani berbagai kebutuhan desain untuk individu, UMKM hingga instansi.',
              },
              {
                icon: 'fa-palette',
                title: 'Desain Berkualitas',
                desc: 'Menghasilkan desain profesional, modern, dan sesuai identitas bisnis.',
              },
              {
                icon: 'fa-tags',
                title: 'Harga Terjangkau',
                desc: 'Layanan berkualitas dengan harga yang ramah untuk berbagai kalangan.',
              },
              {
                icon: 'fa-bolt',
                title: 'Pengerjaan Cepat',
                desc: 'Estimasi pengerjaan jelas dengan hasil maksimal tepat waktu.',
              },
              {
                icon: 'fa-sync-alt',
                title: 'Revisi Mudah',
                desc: 'Menyediakan revisi sesuai kesepakatan agar hasil benar-benar sesuai keinginan.',
              },
              {
                icon: 'fa-smile',
                title: 'Pelayanan Ramah',
                desc: 'Respon cepat, komunikatif, dan siap membantu dari awal hingga selesai.',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition border border-gray-50 group"
              >
                <div className="w-14 h-14 bg-[#fdb60c]/10 rounded-full flex items-center justify-center text-[#fdb60c] text-2xl mb-6 group-hover:bg-[#fdb60c] group-hover:text-white transition-colors duration-300">
                  <i className={`fas ${feature.icon}`}></i>
                </div>
                <h3 className="text-lg font-bold font-heading text-[#222222] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#222222] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">Pertanyaan yang sering diajukan seputar layanan kami.</p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-[#f8f8f8] rounded-xl border border-gray-100 overflow-hidden cursor-pointer"
                >
                  <div
                    onClick={() => toggleFaq(faq.id)}
                    className="flex justify-between items-center p-6 text-[#222222] font-bold select-none"
                  >
                    <h4>{faq.question}</h4>
                    <i
                      className={`fas fa-chevron-down text-[#fdb60c] transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    ></i>
                  </div>
                  {isOpen && (
                    <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#222222] text-white pt-16 pb-8 border-t-[6px] border-[#fdb60c]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <a
                href="#"
                className="font-heading font-bold text-3xl tracking-tighter text-white flex items-center gap-2 mb-4"
              >
                <span className="bg-[#fdb60c] text-[#222222] w-12 h-12 rounded-xl flex items-center justify-center font-black">
                  IK
                </span>
                Khanif<span className="text-[#fdb60c]">.</span>
              </a>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Melayani berbagai kebutuhan desain grafis profesional untuk bisnis, UMKM, organisasi,
                maupun kebutuhan personal.
              </p>
              {/* Socials */}
              <div className="flex gap-4">
                <a
                  href="https://wa.me/6285155284564"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#fdb60c] hover:text-[#222222] transition"
                  aria-label="WhatsApp"
                >
                  <i className="fab fa-whatsapp text-lg"></i>
                </a>
                <a
                  href="https://www.instagram.com/m.ibnukhanif"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#fdb60c] hover:text-[#222222] transition"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram text-lg"></i>
                </a>
                <a
                  href="https://www.facebook.com/fb.ibnukhanif/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#fdb60c] hover:text-[#222222] transition"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f text-lg"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold font-heading text-lg mb-6">Menu Cepat</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <a href="#tentang" className="hover:text-[#fdb60c] transition">
                    Tentang Saya
                  </a>
                </li>
                <li>
                  <a href="#jasa-unggulan" className="hover:text-[#fdb60c] transition">
                    Jasa Unggulan
                  </a>
                </li>
                <li>
                  <a href="#portofolio" className="hover:text-[#fdb60c] transition">
                    Portofolio
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#fdb60c] transition">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold font-heading text-lg mb-6">Kontak</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <i className="fab fa-whatsapp mt-1 text-[#fdb60c]"></i>
                  <a
                    href="https://wa.me/6285155284564"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    +62 851-5528-4564
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fas fa-envelope mt-1 text-[#fdb60c]"></i>
                  <a href="mailto:khanifibnu94@gmail.com" className="hover:text-white transition">
                    khanifibnu94@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fas fa-map-marker-alt mt-1 text-[#fdb60c]"></i>
                  <span>Tegal, Jawa Tengah</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
            <p>&copy;2026 Ibnu Khanif. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Image Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 text-white hover:text-[#fdb60c] text-5xl focus:outline-none z-[101] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            &times;
          </button>
          <img
            src={lightboxImage}
            alt="Portfolio Full Size"
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl cursor-default"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Floating Buttons */}

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/6285155284564?text=Halo%20Ibnu%20Khanif,%20saya%20tertarik%20dengan%20jasa%20desain%20Anda."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
        title="Chat di WhatsApp"
        aria-label="Chat di WhatsApp"
      >
        <i className="fab fa-whatsapp text-3xl"></i>
      </a>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-24 right-6 z-40 bg-[#222222] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-[#fdb60c] hover:text-[#222222] transition-all duration-300 cursor-pointer ${
          showBackToTop ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-5'
        }`}
        title="Kembali ke atas"
        aria-label="Kembali ke atas"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
}
