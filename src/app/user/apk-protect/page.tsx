'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Upload, Download } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function APKProtectPage() {
  const [timesRemaining, setTimesRemaining] = useState(45);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-white mb-2">APK Protect</h1>
        <p className="text-slate-400">
          Advanced Android application protection with anti-tampering and obfuscation.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card glass>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Protect Android Application</CardTitle>
                <CardDescription>Remaining Times: {timesRemaining}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-12 text-center hover:border-green-500 transition-colors">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Upload APK File</p>
                  <p className="text-sm text-slate-400">Drag and drop or click to upload</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle>Protection History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Shield className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">No protected applications yet</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
