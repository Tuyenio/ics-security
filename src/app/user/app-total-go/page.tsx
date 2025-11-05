'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Upload } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function AppTotalGoPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-white mb-2">AppTotalGo</h1>
        <p className="text-slate-400">
          Comprehensive app scanning and analysis platform for threat detection.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card glass>
          <CardHeader>
            <CardTitle>App Security Scanning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-orange-400" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Upload Application</p>
                  <p className="text-sm text-slate-400">Scan your app for security vulnerabilities</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle>Scan History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Shield className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">No scans performed yet</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
