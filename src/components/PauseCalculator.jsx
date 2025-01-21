"use client"

import React, { useState, useEffect } from 'react';
import { Flame, DollarSign, Percent, ExternalLink } from 'lucide-react';

const PauseCalculator = () => {
  const [bmDays, setBmDays] = useState(2);
  const [customBmDays, setCustomBmDays] = useState('');
  const [netWorth, setNetWorth] = useState('');
  const [rateOption, setRateOption] = useState('15.98'); // Changed default to Mid
  const [customRate, setCustomRate] = useState('');
  const [pauseAmount, setPauseAmount] = useState(0);
  const [giftedInterest, setGiftedInterest] = useState(0);
  const [bmExpenses, setBmExpenses] = useState('');
  const [principledDonation, setPrincipledDonation] = useState(0);

  const bmOptions = [
    { value: 1, label: '1% - Burn Weekend only (3-4 days)' },
    { value: 2, label: '2% - Burning Man (7-8 days)' },
    { value: 4, label: '4% - Burning Man + Build / Strike (9-15 days)' }
  ];

  const rateOptions = [
    { value: 4.20, label: '4.20% - Min (1 year Treasury Bill Rate)' },
    { value: 15.98, label: '15.98% - Mid (SP 500 for last 4 years)' },
    { value: 45.20, label: '45.20% - High (FAANG Average Return for past 4 years)' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleNetWorthChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value) {
      value = formatCurrency(value);
    }
    setNetWorth(value);
  };

  const handleBmExpensesChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value) {
      value = formatCurrency(value);
    }
    setBmExpenses(value);
  };

  useEffect(() => {
    if (netWorth) {
      const worth = parseFloat(netWorth.replace(/[^0-9.-]+/g, ''));
      const rate = customRate || rateOption;
      const days = customBmDays || bmDays;
      const pause = worth * (parseFloat(days) / 100);
      setPauseAmount(Math.round(pause));
      
      // Calculate gifted interest
      const interest = pause * (parseFloat(rate) / 100);
      setGiftedInterest(Math.round(interest));
      
      // Calculate principled donation
      const expenses = bmExpenses ? parseFloat(bmExpenses.replace(/[^0-9.-]+/g, '')) : 0;
      setPrincipledDonation(Math.round(interest - expenses));
    }
  }, [bmDays, customBmDays, netWorth, rateOption, customRate, bmExpenses]);

  return (
    <div className="min-h-screen bg-amber-50 p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm shadow-xl border-2 border-amber-200 rounded-lg">
        <div className="p-6 pt-8">
          <div className="text-center mb-8">
            <h1 className="mb-2">
              <div className="text-4xl font-bold text-amber-900">Burning Man</div>
              <div className="text-4xl font-bold text-amber-900">Principled Pause Calculator</div>
            </h1>
            <p className="text-amber-700">Calculate your gifted interest amount based on your personal situation</p>
          </div>

          {/* Previous input sections remain the same until Your Principled Pause */}
          
          <div className="mb-8">
            <label className="flex items-center gap-2 text-lg font-medium text-amber-900 mb-2">
              <DollarSign className="text-orange-500" />
              Your Principled Pause
            </label>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-3 rounded-lg">
              <div className="text-2xl font-semibold text-orange-600">
                {netWorth ? formatCurrency(pauseAmount) : '--'}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="flex items-center gap-2 text-lg font-medium text-amber-900 mb-2">
              <DollarSign className="text-orange-500" />
              Your Gifted Interest
            </label>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-3 rounded-lg">
              <div className="text-2xl font-semibold text-orange-600">
                {netWorth ? formatCurrency(giftedInterest) : '--'}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="flex items-center gap-2 text-lg font-medium text-amber-900 mb-2">
              <DollarSign className="text-orange-500" />
              Your Burning Man Expenses
            </label>
            <input
              type="text"
              value={bmExpenses}
              onChange={handleBmExpensesChange}
              placeholder="Enter amount"
              className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg bg-white/50 focus:border-orange-500 focus:outline-none text-lg transition-colors"
            />
          </div>

          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-6">
            <div className="flex items-center gap-8">
              <div>
                <h2 className="text-xl font-medium text-amber-900 mb-2">
                  Your Principled Donation
                </h2>
                <p className="text-sm text-amber-700 mb-2">
                  (Your Gifted Interest Amount minus Your Burning Man Expenses)
                </p>
                <div className="text-4xl font-bold text-orange-600">
                  {formatCurrency(principledDonation)}
                </div>
              </div>
              <a
                href="https://donate.burningman.org/give/508265/"
                target="_top"
                onClick={(e) => { e.preventDefault(); window.top.location.href = 'https://donate.burningman.org/give/508265/'; }}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 
                          rounded-lg transition-colors transform hover:scale-105 duration-200 
                          flex items-center gap-2 cursor-pointer border-none"
                style={{ textDecoration: 'none' }}
              >
                Donate
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PauseCalculator;
