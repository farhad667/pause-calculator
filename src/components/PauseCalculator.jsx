"use client"

import React, { useState, useEffect } from 'react';
import { Flame, DollarSign, Percent, ExternalLink } from 'lucide-react';

const PauseCalculator = () => {
  const [bmDays, setBmDays] = useState(2);
  const [customBmDays, setCustomBmDays] = useState('');
  const [netWorth, setNetWorth] = useState('');
  const [rateOption, setRateOption] = useState('15.98');
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
      
      const interest = pause * (parseFloat(rate) / 100);
      setGiftedInterest(Math.round(interest));
      
      const expenses = bmExpenses ? parseFloat(bmExpenses.replace(/[^0-9.-]+/g, '')) : 0;
      setPrincipledDonation(Math.round(interest - expenses));
    }
  }, [bmDays, customBmDays, netWorth, rateOption, customRate, bmExpenses]);

  return (
    <div className="min-h-screen bg-amber-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto bg-white shadow-xl border-2 border-amber-200 rounded-lg">
        <div className="p-4 md:p-6 lg:p-8">
          <div className="text-center mb-8">
            <h1 className="mb-2">
              <div className="text-3xl md:text-4xl font-bold text-amber-900">Burning Man</div>
              <div className="text-3xl md:text-4xl font-bold text-amber-900">Principled Pause Calculator</div>
            </h1>
            <p className="text-amber-700">Calculate your gifted interest amount based on your personal situation</p>
          </div>

          {/* Main content container */}
          <div className="space-y-6">
            {/* Form fields */}
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-lg font-medium text-amber-900 mb-2">
                  <Flame className="text-orange-500" />
                  Your Burning Man Days
                </label>
                <p className="text-sm text-amber-700 mb-2 ml-8">Minimum amount of this coming year that you plan to live by Burning Man's Principles</p>
                <div className="space-y-2">
                  {bmOptions.map((option) => (
                    <label key={option.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="bmDays"
                        value={option.value}
                        checked={!customBmDays && bmDays === option.value}
                        onChange={(e) => {
                          setBmDays(Number(e.target.value));
                          setCustomBmDays('');
                        }}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="bmDays"
                      checked={!!customBmDays}
                      onChange={() => {
                        if (!customBmDays) setCustomBmDays('');
                      }}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={customBmDays}
                        onChange={(e) => setCustomBmDays(e.target.value)}
                        onClick={() => {
                          setBmDays(0);
                        }}
                        placeholder="Custom"
                        className="w-24 px-2 py-1 border-2 border-amber-200 rounded-lg bg-white focus:border-orange-500 focus:outline-none text-lg transition-colors"
                      />
                      <span>%</span>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-lg font-medium text-amber-900 mb-2">
                  <DollarSign className="text-orange-500" />
                  Your Net Worth
                </label>
                <input
                  type="text"
                  value={netWorth}
                  onChange={handleNetWorthChange}
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg bg-white focus:border-orange-500 focus:outline-none text-lg transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-lg font-medium text-amber-900 mb-2">
                  <Percent className="text-orange-500" />
                  Your Rate of Return
                </label>
                <div className="space-y-2">
                  {rateOptions.map((option) => (
                    <label key={option.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="rateOption"
                        value={option.value}
                        checked={!customRate && Number(rateOption) === option.value}
                        onChange={(e) => {
                          setRateOption(e.target.value);
                          setCustomRate('');
                        }}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="rateOption"
                      checked={!!customRate}
                      onChange={() => {
                        if (!customRate) setCustomRate('');
                      }}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={customRate}
                        onChange={(e) => setCustomRate(e.target.value)}
                        onClick={() => {
                          setRateOption('0');
                        }}
                        placeholder="Custom"
                        className="w-24 px-2 py-1 border-2 border-amber-200 rounded-lg bg-white/50 focus:border-orange-500 focus:outline-none text-lg transition-colors"
                      />
                      <span>%</span>
                    </div>
                  </label>
                </div>
              </div>

              <div>
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
            </div>

            <div className="space-y-6">
              <div>
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

              <div>
                <label className="flex items-center gap-2 text-lg font-medium text-amber-900 mb-2">
                  <DollarSign className="text-orange-500" />
                  Your Burning Man Expenses
                </label>
                <p className="text-sm text-amber-700 mb-2 ml-8">include tickets, transport and camp fees and expenses</p>
                <input
                  type="text"
                  value={bmExpenses}
                  onChange={handleBmExpensesChange}
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg bg-white/50 focus:border-orange-500 focus:outline-none text-lg transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Full-width donation section at the bottom */}
          <div className="mt-8 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-6">
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-medium text-amber-900 mb-2">
                  Your Principled Donation
                </h2>
                <p className="text-sm text-amber-700 mb-2">
                  Your Gifted Interest Amount minus Your Burning Man Expenses
                </p>
                <div className="text-3xl md:text-4xl font-bold text-orange-600">
                  {!netWorth ? '--' : 
                    principledDonation > 0 
                      ? formatCurrency(principledDonation)
                      : "None. Thanks for all your efforts to get to BRC! ❤️ 🔥"}
                </div>
              </div>
              <a
                href="https://donate.burningman.org/give/508265/"
                target="_top"
                onClick={(e) => { e.preventDefault(); window.top.location.href = 'https://donate.burningman.org/give/508265/'; }}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 
                          rounded-lg transition-colors duration-200 
                          flex items-center justify-center gap-2 cursor-pointer border-none"
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
