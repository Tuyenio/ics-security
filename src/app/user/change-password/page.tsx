'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ChangePasswordPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const passwordRequirements = [
    { regex: /.{8,}/, text: t('user.changePassword.requirements.minLength') },
    { regex: /[A-Z]/, text: t('user.changePassword.requirements.uppercase') },
    { regex: /[a-z]/, text: t('user.changePassword.requirements.lowercase') },
    { regex: /[0-9]/, text: t('user.changePassword.requirements.number') },
    { regex: /[^A-Za-z0-9]/, text: t('user.changePassword.requirements.special') },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = t('user.changePassword.errors.currentRequired');
    }

    if (!formData.newPassword) {
      newErrors.newPassword = t('user.changePassword.errors.newRequired');
    } else if (!passwordRequirements.every(req => req.regex.test(formData.newPassword))) {
      newErrors.newPassword = t('user.changePassword.errors.invalidRequirements');
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = t('user.changePassword.errors.mismatch');
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        const error = await response.json();
        setErrors({ currentPassword: error.message || t('user.changePassword.errors.failed') });
      }
    } catch (error) {
      setErrors({ currentPassword: t('user.changePassword.errors.failed') });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-white mb-2">{t('user.changePassword.title')}</h1>
        <p className="text-slate-400">{t('user.changePassword.subtitle')}</p>
      </motion.div>

      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-center gap-3"
        >
          <CheckCircle className="w-5 h-5 text-green-400" />
          <p className="text-green-400">{t('user.changePassword.successMessage')}</p>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card glass>
          <CardHeader>
            <CardTitle>{t('user.changePassword.securitySettings')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <Input
                  type={showPasswords.current ? 'text' : 'password'}
                  label={t('user.changePassword.currentPassword')}
                  placeholder={t('user.changePassword.currentPasswordPlaceholder')}
                  icon={<Lock className="w-5 h-5" />}
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  error={errors.currentPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                  className="absolute right-3 top-[42px] text-slate-400 hover:text-white"
                >
                  {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="relative">
                <Input
                  type={showPasswords.new ? 'text' : 'password'}
                  label={t('user.changePassword.newPassword')}
                  placeholder={t('user.changePassword.newPasswordPlaceholder')}
                  icon={<Lock className="w-5 h-5" />}
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  error={errors.newPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                  className="absolute right-3 top-[42px] text-slate-400 hover:text-white"
                >
                  {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium text-slate-300 mb-2">{t('user.changePassword.requirements.title')}</p>
                {passwordRequirements.map((req, index) => {
                  const isValid = req.regex.test(formData.newPassword);
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        isValid ? 'bg-green-500' : 'bg-slate-700'
                      }`}>
                        {isValid && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`text-sm ${isValid ? 'text-green-400' : 'text-slate-500'}`}>
                        {req.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="relative">
                <Input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  label={t('user.changePassword.confirmPassword')}
                  placeholder={t('user.changePassword.confirmPasswordPlaceholder')}
                  icon={<Lock className="w-5 h-5" />}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  error={errors.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                  className="absolute right-3 top-[42px] text-slate-400 hover:text-white"
                >
                  {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
                {t('user.changePassword.updatePassword')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
