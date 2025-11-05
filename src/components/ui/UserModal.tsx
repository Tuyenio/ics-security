'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Building2, MapPin, Smartphone, Shield, Key } from 'lucide-react';
import Button from './Button';
import Input from './Input';

interface UserFormData {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  role: 'admin' | 'user';
  country: string;
  companyName: string;
  position: string;
  mobile: string;
  androidTimes: number;
  iosTimes: number;
}

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => Promise<void>;
  user?: UserFormData & { id: string };
  mode: 'create' | 'edit';
}

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  user,
  mode,
}) => {
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    role: 'user',
    country: 'Vietnam',
    companyName: '',
    position: '',
    mobile: '',
    androidTimes: 50,
    iosTimes: 50,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && mode === 'edit') {
      setFormData({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        country: user.country,
        companyName: user.companyName,
        position: user.position,
        mobile: user.mobile,
        androidTimes: user.androidTimes,
        iosTimes: user.iosTimes,
      });
    } else {
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        role: 'user',
        country: 'Vietnam',
        companyName: '',
        position: '',
        mobile: '',
        androidTimes: 50,
        iosTimes: 50,
      });
    }
  }, [user, mode, isOpen]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';

    if (mode === 'create' && !formData.password) {
      newErrors.password = 'Password is required';
    } else if (mode === 'create' && formData.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl my-8"
            >
              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="h-1 bg-gradient-to-r from-blue-600 to-cyan-500"></div>

                <div className="p-6 border-b border-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <User className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          {mode === 'create' ? 'Create New User' : 'Edit User'}
                        </h2>
                        <p className="text-slate-400 text-sm">
                          {mode === 'create' 
                            ? 'Add a new user to the system' 
                            : 'Update user information'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Email"
                      type="email"
                      placeholder="user@example.com"
                      icon={<Mail className="w-5 h-5" />}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      error={errors.email}
                      disabled={mode === 'edit'}
                    />

                    {mode === 'create' && (
                      <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        icon={<Key className="w-5 h-5" />}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        error={errors.password}
                      />
                    )}

                    <Input
                      label="First Name"
                      placeholder="John"
                      icon={<User className="w-5 h-5" />}
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      error={errors.firstName}
                    />

                    <Input
                      label="Last Name"
                      placeholder="Doe"
                      icon={<User className="w-5 h-5" />}
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      error={errors.lastName}
                    />

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Role
                      </label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <select
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'user' })}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                    </div>

                    <Input
                      label="Country"
                      placeholder="Vietnam"
                      icon={<MapPin className="w-5 h-5" />}
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    />

                    <Input
                      label="Company Name"
                      placeholder="Tech Corp"
                      icon={<Building2 className="w-5 h-5" />}
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />

                    <Input
                      label="Position"
                      placeholder="Developer"
                      icon={<User className="w-5 h-5" />}
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    />

                    <Input
                      label="Mobile"
                      placeholder="+84 xxx xxx xxx"
                      icon={<Smartphone className="w-5 h-5" />}
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    />

                    <Input
                      label="Android Times"
                      type="number"
                      placeholder="50"
                      value={formData.androidTimes.toString()}
                      onChange={(e) => setFormData({ ...formData, androidTimes: parseInt(e.target.value) || 0 })}
                    />

                    <Input
                      label="iOS Times"
                      type="number"
                      placeholder="50"
                      value={formData.iosTimes.toString()}
                      onChange={(e) => setFormData({ ...formData, iosTimes: parseInt(e.target.value) || 0 })}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-6 pt-6 border-t border-slate-800">
                    <Button
                      type="button"
                      onClick={onClose}
                      variant="outline"
                      className="flex-1"
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      isLoading={isLoading}
                      disabled={isLoading}
                    >
                      {mode === 'create' ? 'Create User' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UserModal;
