'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  Code, 
  Smartphone,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Globe,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Zap,
  TrendingUp,
  Award,
  Users,
  Target,
  Sparkles,
  Server,
  Building
} from 'lucide-react';
import Logo from '@/components/Logo';
import Button from '@/components/ui/Button';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitch from '@/components/LanguageSwitch';

function LandingContent() {
  const { t } = useLanguage();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: Shield,
      title: t('services.items.apk.title'),
      description: t('services.items.apk.description'),
      color: 'from-blue-600 to-cyan-500',
      features: ['services.items.apk.features.0', 'services.items.apk.features.1', 'services.items.apk.features.2']
    },
    {
      icon: Lock,
      title: t('services.items.ios.title'),
      description: t('services.items.ios.description'),
      color: 'from-purple-600 to-pink-500',
      features: ['services.items.ios.features.0', 'services.items.ios.features.1', 'services.items.ios.features.2']
    },
    {
      icon: Code,
      title: t('services.items.sourceCode.title'),
      description: t('services.items.sourceCode.description'),
      color: 'from-green-600 to-emerald-500',
      features: ['services.items.sourceCode.features.0', 'services.items.sourceCode.features.1', 'services.items.sourceCode.features.2']
    },
    {
      icon: Eye,
      title: t('services.items.malware.title'),
      description: t('services.items.malware.description'),
      color: 'from-orange-600 to-red-500',
      features: ['services.items.malware.features.0', 'services.items.malware.features.1', 'services.items.malware.features.2']
    },
    {
      icon: Smartphone,
      title: t('services.items.appTotal.title'),
      description: t('services.items.appTotal.description'),
      color: 'from-indigo-600 to-blue-500',
      features: ['services.items.appTotal.features.0', 'services.items.appTotal.features.1', 'services.items.appTotal.features.2']
    },
    {
      icon: AlertTriangle,
      title: t('services.items.vulnerability.title'),
      description: t('services.items.vulnerability.description'),
      color: 'from-yellow-600 to-orange-500',
      features: ['services.items.vulnerability.features.0', 'services.items.vulnerability.features.1', 'services.items.vulnerability.features.2']
    },
  ];

  const stats = [
    { value: '5000+', label: t('stats.apps'), icon: Shield },
    { value: '99.9%', label: t('stats.reliability'), icon: TrendingUp },
    { value: '24/7', label: t('stats.support'), icon: Phone },
    { value: '100+', label: t('stats.clients'), icon: Award },
  ];

  const features = [
    'about.features.0',
    'about.features.1',
    'about.features.2',
    'about.features.3',
    'about.features.4',
    'about.features.5',
    'about.features.6',
    'about.features.7'
  ];

  const whyChooseUs = [
    {
      icon: Target,
      title: t('about.whyChooseUs.missionCritical.title'),
      description: t('about.whyChooseUs.missionCritical.description')
    },
    {
      icon: Users,
      title: t('about.whyChooseUs.expertTeam.title'),
      description: t('about.whyChooseUs.expertTeam.description')
    },
    {
      icon: Sparkles,
      title: t('about.whyChooseUs.cuttingEdge.title'),
      description: t('about.whyChooseUs.cuttingEdge.description')
    },
    {
      icon: Server,
      title: t('about.whyChooseUs.scalable.title'),
      description: t('about.whyChooseUs.scalable.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 shadow-2xl' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="cursor-pointer" onClick={() => window.location.href = '/landing#home'}>
              <Logo size="md" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-slate-300 hover:text-white transition-colors font-medium">
                {t('nav.home')}
              </a>
              <a href="#services" className="text-slate-300 hover:text-white transition-colors font-medium">
                {t('nav.services')}
              </a>
              <a href="#about" className="text-slate-300 hover:text-white transition-colors font-medium">
                {t('nav.about')}
              </a>
              <a href="#contact" className="text-slate-300 hover:text-white transition-colors font-medium">
                {t('nav.contact')}
              </a>
              <LanguageSwitch />
              <Button
                variant="primary"
                onClick={() => router.push('/auth/login')}
                className="shadow-lg shadow-blue-500/20"
              >
                {t('nav.signIn')}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-slate-900/98 backdrop-blur-lg border-t border-slate-800"
          >
            <div className="px-4 py-6 space-y-4">
              <a 
                href="#home" 
                className="block text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </a>
              <a 
                href="#services" 
                className="block text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.services')}
              </a>
              <a 
                href="#about" 
                className="block text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.about')}
              </a>
              <a 
                href="#contact" 
                className="block text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.contact')}
              </a>
              <div className="flex justify-center py-2">
                <LanguageSwitch />
              </div>
              <Button
                variant="primary"
                className="w-full"
                onClick={() => {
                  router.push('/auth/login');
                  setIsMobileMenuOpen(false);
                }}
              >
                {t('nav.signIn')}
              </Button>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            style={{ opacity, scale }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl"
          />
          <motion.div 
            style={{ opacity, scale }}
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-600/20 to-pink-600/20 rounded-full blur-3xl"
          />
          
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-500/30 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-8"
            >
              <div className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 text-sm font-semibold">
                    {t('hero.badge')}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight"
            >
              {t('hero.title')}
              <span className="block mt-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {t('hero.titleGradient')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push('/auth/login')}
                className="px-10 py-5 text-xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
              >
                <span className="flex items-center gap-3">
                  {t('hero.getStarted')}
                  <ArrowRight className="w-6 h-6" />
                </span>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 text-xl"
              >
                {t('hero.contactSales')}
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16 flex flex-wrap items-center justify-center gap-8 text-slate-400"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>{t('hero.certifications.iso')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>{t('hero.certifications.owasp')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>{t('hero.certifications.uptime')}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50 backdrop-blur-sm border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-blue-400" />
                    </div>
                  </div>
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-base md:text-lg font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
              <span className="text-blue-400 font-semibold">{t('services.badge')}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t('services.title')}
              <span className="block mt-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {t('services.titleGradient')}
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              {t('services.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 hover:border-blue-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-3">
                    {service.features.map((featureKey, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span>{t(featureKey)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-2xl group-hover:w-32 group-hover:h-32 transition-all" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section - Premium Redesign */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent"></div>
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
              <span className="text-blue-400 font-semibold">{t('about.badge')}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t('about.title')}
              <span className="block mt-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {t('about.titleGradient')}
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              {t('about.description')}
            </p>
          </motion.div>

          {/* Company Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 hover:border-blue-500/50 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mb-6">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">{t('about.stats.years.title')}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {t('about.stats.years.description')}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 hover:border-purple-500/50 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">{t('about.stats.experts.title')}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {t('about.stats.experts.description')}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 hover:border-green-500/50 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">{t('about.stats.certified.title')}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {t('about.stats.certified.description')}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Why Choose Us */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all group"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-10"
          >
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              {t('about.featuresTitle')} <span className="text-blue-400">{t('about.featuresTitleGradient')}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((featureKey, index) => (
                <motion.div
                  key={featureKey}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all group"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-slate-200 text-sm font-medium">{t(featureKey)}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Premium Redesign */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-slate-900 to-cyan-950/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
              <span className="text-blue-400 font-semibold">{t('contact.badge')}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t('contact.title')}
              <span className="block mt-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {t('contact.titleGradient')}
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              {t('contact.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <motion.div 
                whileHover={{ scale: 1.02, x: 10 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{t('contact.info.office.title')}</h3>
                      <p className="text-slate-300 leading-relaxed">
                        {t('contact.info.office.address')}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02, x: 10 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-green-500/50 transition-all">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{t('contact.info.phone.title')}</h3>
                      <p className="text-slate-300 mb-1">
                        {t('contact.info.phone.office')}: <a href="tel:0931487231" className="hover:text-blue-400 transition-colors font-medium">0931.487.231</a>
                      </p>
                      <p className="text-slate-300">
                        {t('contact.info.phone.hotline')}: <a href="tel:0707806860" className="hover:text-blue-400 transition-colors font-medium">0707.806.860</a>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02, x: 10 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{t('contact.info.email.title')}</h3>
                      <a href="mailto:info@icss.com.vn" className="text-slate-300 hover:text-blue-400 transition-colors font-medium">
                        info@icss.com.vn
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02, x: 10 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-orange-500/50 transition-all">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-600 to-red-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Globe className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{t('contact.info.website.title')}</h3>
                      <a 
                        href="https://www.icss.com.vn" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-300 hover:text-blue-400 transition-colors font-medium flex items-center gap-2"
                      >
                        www.icss.com.vn
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-500/10 rounded-3xl blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm border border-slate-700 rounded-3xl p-10 shadow-2xl">
                <h3 className="text-3xl font-bold text-white mb-8">
                  {t('contact.form.title')} <span className="text-blue-400">{t('contact.form.titleGradient')}</span>
                </h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-300 mb-2 font-medium">{t('contact.form.fullName')}</label>
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-4 bg-slate-800/70 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-500"
                        placeholder={t('contact.form.placeholders.fullName')}
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2 font-medium">{t('contact.form.company')}</label>
                      <input
                        type="text"
                        className="w-full px-5 py-4 bg-slate-800/70 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-500"
                        placeholder={t('contact.form.placeholders.company')}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-300 mb-2 font-medium">{t('contact.form.email')}</label>
                      <input
                        type="email"
                        required
                        className="w-full px-5 py-4 bg-slate-800/70 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-500"
                        placeholder={t('contact.form.placeholders.email')}
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2 font-medium">{t('contact.form.phone')}</label>
                      <input
                        type="tel"
                        className="w-full px-5 py-4 bg-slate-800/70 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-500"
                        placeholder={t('contact.form.placeholders.phone')}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2 font-medium">{t('contact.form.service')}</label>
                    <select className="w-full px-5 py-4 bg-slate-800/70 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                      <option value="">{t('contact.form.serviceOptions.select')}</option>
                      <option value="apk">{t('contact.form.serviceOptions.apk')}</option>
                      <option value="ios">{t('contact.form.serviceOptions.ios')}</option>
                      <option value="source">{t('contact.form.serviceOptions.source')}</option>
                      <option value="malware">{t('contact.form.serviceOptions.malware')}</option>
                      <option value="apptotal">{t('contact.form.serviceOptions.apptotal')}</option>
                      <option value="vulnerability">{t('contact.form.serviceOptions.vulnerability')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2 font-medium">{t('contact.form.message')}</label>
                    <textarea
                      rows={5}
                      required
                      className="w-full px-5 py-4 bg-slate-800/70 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-500 resize-none"
                      placeholder={t('contact.form.placeholders.message')}
                    ></textarea>
                  </div>

                  <Button 
                    variant="primary" 
                    className="w-full py-4 text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50" 
                    type="submit"
                  >
                    {t('contact.form.submit')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer - Redesigned */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* Company Info */}
            <div>
              <Logo size="md" className="mb-4" />
              <p className="text-slate-400 text-sm leading-relaxed">
                {t('footer.description')}
              </p>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-white font-bold mb-4">{t('footer.services')}</h3>
              <ul className="space-y-2">
                <li><a href="#services" className="text-slate-400 text-sm hover:text-white transition-colors inline-block">{t('services.items.apk.title')}</a></li>
                <li><a href="#services" className="text-slate-400 text-sm hover:text-white transition-colors inline-block">{t('services.items.ios.title')}</a></li>
                <li><a href="#services" className="text-slate-400 text-sm hover:text-white transition-colors inline-block">{t('services.items.sourceCode.title')}</a></li>
                <li><a href="#services" className="text-slate-400 text-sm hover:text-white transition-colors inline-block">{t('services.items.malware.title')}</a></li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h3 className="text-white font-bold mb-4">{t('footer.company')}</h3>
              <ul className="space-y-2 mb-4">
                <li><a href="#about" className="text-slate-400 text-sm hover:text-white transition-colors inline-block">{t('footer.links.aboutUs')}</a></li>
                <li><a href="#contact" className="text-slate-400 text-sm hover:text-white transition-colors inline-block">{t('footer.links.contact')}</a></li>
                <li><a href="/auth/login" className="text-slate-400 text-sm hover:text-white transition-colors inline-block">{t('footer.links.signIn')}</a></li>
              </ul>
              <div className="text-slate-400 text-sm">
                <p className="mb-1">Email: <a href="mailto:info@icss.com.vn" className="hover:text-white transition-colors">info@icss.com.vn</a></p>
                <p>Website: <a href="https://www.icss.com.vn" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">www.icss.com.vn</a></p>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} {t('footer.copyright')}
            </p>
            <div className="flex gap-6 text-slate-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">{t('footer.legal.privacy')}</a>
              <a href="#" className="hover:text-white transition-colors">{t('footer.legal.terms')}</a>
              <a href="#" className="hover:text-white transition-colors">{t('footer.legal.sitemap')}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function LandingPage() {
  return (
    <LanguageProvider>
      <LandingContent />
    </LanguageProvider>
  );
}
