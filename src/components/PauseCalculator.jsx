import React, { useState, useEffect } from 'react';
import { Flame, DollarSign, Percent, ExternalLink } from 'lucide-react';

const PauseCalculator = () => {
  const [bmDays, setBmDays] = useState(2);
  const [customBmDays, setCustomBmDays] = useState('');
  const [netWorth, setNetWorth] = useState('');
  const [rateOption, setRateOption] = useState('4.20');
  const [customRate, setCustomRate] = useState('');
  const [pauseAmount, setPauseAmount] = useState(0);

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

  useEffect(() => {
    if (netWorth) {
      const worth = parseFloat(netWorth.replace(/[^0-9.-]+/g, ''));
      const rate = customRate || rateOption;
      const days = customBmDays || bmDays;
      const amount = worth * (parseFloat(rate) / 100) * (parseFloat(days) / 100);
      setPauseAmount(Math.round(amount));
    }
  }, [bmDays, customBmDays, netWorth, rateOption, customRate]);

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

          <div className="mb-8">
            <label className="flex items-center gap-2 text-lg font-medium text-amber-900 mb-1">
              <Flame className="text-orange-500" />
              Burning Man Days
            </label>
            <p className="text-sm italic text-amber-700 mb-3 ml-8">
              % of this year that I pledge to fully abide by Burning Man's Principles.
            </p>
            <div className="space-y-3">
              {bmOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="bmDays"
                    value={option.value}
                    checked={bmDays === option.value && !customBmDays}
                    onChange={() => {
                      setBmDays(option.value);
                      setCustomBmDays('');
                    }}
                    className="w-4 h-4 text-orange-500 border-2 border-amber-200 focus:ring-orange-500"
                  />
                  <span className="text-amber-900">{option.label}</span>
                </label>
              ))}
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="bmDays"
                  checked={!!customBmDays}
                  onChange={() => setCustomBmDays(customBmDays || '')}
                  className="w-4 h-4 text-orange-500 border-2 border-amber-200 focus:ring-orange-500"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={customBmDays}
                    onChange={(e) => {
                      setCustomBmDays(e.target.value);
                      setBmDays(null);
                    }}
                    placeholder="Custom"
                    className="w-24 px-2 py-1 border-2 border-amber-200 rounded-lg focus:border-orange-500 focus:outline-none"
                  />
                  <span className="text-amber-900">%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="flex items-center gap-2 text-lg font-medium text-amber-900 mb-2">
              <DollarSign className="text-orange-500" />
              Your Net Worth
            </label>
            <input
              type="text"
              value={netWorth}
              onChange={handleNetWorthChange}
              placeholder="Enter amount"
              className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg bg-white/50 focus:border-orange-500 focus:outline-none text-lg transition-colors"
            />
          </div>

          <div className="mb-8">
            <label className="flex items-center gap-2 text-lg font-medium text-amber-900 mb-2">
              <Percent className="text-orange-500" />
              Your Rate of Return
            </label>
            <div className="space-y-3">
              {rateOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="rateOption"
                    value={option.value}
                    checked={parseFloat(rateOption) === option.value && !customRate}
                    onChange={() => {
                      setRateOption(option.value.toString());
                      setCustomRate('');
                    }}
                    className="w-4 h-4 text-orange-500 border-2 border-amber-200 focus:ring-orange-500"
                  />
                  <span className="text-amber-900">{option.label}</span>
                </label>
              ))}
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="rateOption"
                  checked={!!customRate}
                  onChange={() => setCustomRate(customRate || '')}
                  className="w-4 h-4 text-orange-500 border-2 border-amber-200 focus:ring-orange-500"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={customRate}
                    onChange={(e) => {
                      setCustomRate(e.target.value);
                      setRateOption(null);
                    }}
                    placeholder="Custom"
                    className="w-24 px-2 py-1 border-2 border-amber-200 rounded-lg focus:border-orange-500 focus:outline-none"
                  />
                  <span className="text-amber-900">%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="flex items-center gap-2 text-lg font-medium text-amber-900 mb-2">
              <DollarSign className="text-orange-500" />
              Your Principled Pause
            </label>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-3 rounded-lg">
              <div className="text-2xl font-semibold text-orange-600">
                {netWorth ? formatCurrency(parseFloat(netWorth.replace(/[^0-9.-]+/g, '')) * ((customBmDays || bmDays) / 100)) : '--'}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-6">
            <div className="flex items-center gap-8">
              <div>
                <h2 className="text-xl font-medium text-amber-900 mb-2">
                  Your Gifted Interest
                </h2>
                <div className="text-4xl font-bold text-orange-600">
                  {formatCurrency(pauseAmount)}
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