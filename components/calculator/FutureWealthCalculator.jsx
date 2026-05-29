// FutureWealthCalculator.jsx - SIMPLE FIX for Next.js JavaScript
"use client";
import { useState, useEffect, useCallback } from 'react';

const FutureWealthCalculator = () => {
  // Default values
  const [formData, setFormData] = useState({
    currentPortfolio: 2500000,
    lumpSum: 300000,
    monthlySIP: 20000,
    portfolioReturn: 13,
    years: 20
  });

  // Separate state for input fields to prevent re-renders during typing
  const [inputFields, setInputFields] = useState({
    currentPortfolio: '2500000',
    lumpSum: '300000',
    monthlySIP: '20000',
    portfolioReturn: '13',
    years: '20'
  });

  const [futureValue, setFutureValue] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [wealthGained, setWealthGained] = useState(0);
  const [errors, setErrors] = useState({});

  // Validation limits
  const limits = {
    currentPortfolio: { min: 0, max: 1000000000, default: 2500000 },
    lumpSum: { min: 0, max: 10000000, default: 300000 },
    monthlySIP: { min: 0, max: 5000000, default: 20000 },
    portfolioReturn: { min: 5, max: 20, default: 13 },
    years: { min: 5, max: 60, default: 20 }
  };

  // Format currency
  const formatCurrency = (value) => {
    if (Math.abs(value) < 0.01) return '₹0';
    const formatter = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    return `₹${formatter.format(Math.round(value))}`;
  };

  // Handle input change - SIMPLE AND SMOOTH
  const handleInputChange = (field, value) => {
    // Update input field immediately (this doesn't trigger calculation)
    setInputFields(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field
    setErrors(prev => ({
      ...prev,
      [field]: ''
    }));
  };

  // Handle input blur - validate and update formData
  const handleInputBlur = (field) => {
    const value = inputFields[field];
    
    // If empty, reset to current formData value
    if (value === '') {
      setInputFields(prev => ({
        ...prev,
        [field]: formData[field].toString()
      }));
      return;
    }

    // Convert to number
    const numValue = Number(value);
    
    // Check if valid number
    if (isNaN(numValue)) {
      setErrors(prev => ({
        ...prev,
        [field]: 'Please enter a valid number'
      }));
      return;
    }

    // Check limits
    const limit = limits[field];
    if (numValue < limit.min) {
      setErrors(prev => ({
        ...prev,
        [field]: `Minimum value is ${field.includes('return') ? '' : '₹'}${limit.min}${field.includes('return') ? '%' : ''}`
      }));
      return;
    }
    
    if (numValue > limit.max) {
      setErrors(prev => ({
        ...prev,
        [field]: `Maximum value is ${field.includes('return') ? '' : '₹'}${limit.max}${field.includes('return') ? '%' : ''}`
      }));
      return;
    }

    // Valid value - update formData (this triggers calculation)
    setFormData(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  // Handle slider change
  const handleSliderChange = (field, value) => {
    const numValue = Number(value);
    
    // Update both states
    setFormData(prev => ({
      ...prev,
      [field]: numValue
    }));
    
    setInputFields(prev => ({
      ...prev,
      [field]: numValue.toString()
    }));

    // Clear error
    setErrors(prev => ({
      ...prev,
      [field]: ''
    }));
  };

  // Reset to defaults
  const handleReset = () => {
    const defaults = {
      currentPortfolio: limits.currentPortfolio.default,
      lumpSum: limits.lumpSum.default,
      monthlySIP: limits.monthlySIP.default,
      portfolioReturn: limits.portfolioReturn.default,
      years: limits.years.default
    };
    
    setFormData(defaults);
    setInputFields({
      currentPortfolio: defaults.currentPortfolio.toString(),
      lumpSum: defaults.lumpSum.toString(),
      monthlySIP: defaults.monthlySIP.toString(),
      portfolioReturn: defaults.portfolioReturn.toString(),
      years: defaults.years.toString()
    });
    setErrors({});
  };

  // Calculate wealth
  useEffect(() => {
    const { currentPortfolio, lumpSum, monthlySIP, portfolioReturn, years } = formData;

    const months = years * 12;
    const annualRate = portfolioReturn / 100;
    const monthlyRate = Math.pow(1 + annualRate, 1/12) - 1;

    // Future value calculations
    const fvCurrentPortfolio = currentPortfolio * Math.pow(1 + annualRate, years);
    
    const annualGrowthFactor = Math.pow(1 + annualRate, years);
    const fvAnnualLumpsum = lumpSum * (1 + annualRate) * 
      (annualGrowthFactor - 1) / annualRate;

    const monthlyGrowthFactor = Math.pow(1 + monthlyRate, months);
    const fvMonthlySIP = monthlySIP * (1 + monthlyRate) * 
      (monthlyGrowthFactor - 1) / monthlyRate;

    const totalFV = fvCurrentPortfolio + fvAnnualLumpsum + fvMonthlySIP;
    const totalInvestment = currentPortfolio + (lumpSum * years) + (monthlySIP * months);
    
    setFutureValue(totalFV);
    setTotalInvested(totalInvestment);
    setWealthGained(totalFV - totalInvestment);
  }, [formData]);

  // Format display value
  const formatDisplayValue = (value, field) => {
    if (field === 'portfolioReturn') return `${value}%`;
    if (field === 'years') return `${value} years`;
    
    const absValue = Math.abs(value);
    if (absValue >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (absValue >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
    if (absValue >= 1000) return `₹${(value / 1000).toFixed(1)} K`;
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto">
       

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2 bg-gray-100 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-[#074a6b] mb-6">Investment Parameters</h2>
            
            {/* Current Portfolio */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-medium">Current Portfolio Value</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={inputFields.currentPortfolio}
                    onChange={(e) => handleInputChange('currentPortfolio', e.target.value)}
                    onBlur={() => handleInputBlur('currentPortfolio')}
                    className={`w-36 px-3 py-2 pl-7 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.currentPortfolio ? 'border-red-500' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                    placeholder="Amount"
                  />
                  <span className="text-[#1a729e] font-semibold w-20 text-right">
                    {formatDisplayValue(formData.currentPortfolio, 'currentPortfolio')}
                  </span>
                </div>
              </div>
              {errors.currentPortfolio && (
                <p className="text-red-500 text-sm mb-2">{errors.currentPortfolio}</p>
              )}
              <input
                type="range"
                min={limits.currentPortfolio.min}
                max={limits.currentPortfolio.max}
                step={100000}
                value={formData.currentPortfolio}
                onChange={(e) => handleSliderChange('currentPortfolio', e.target.value)}
                className="w-full accent-[#1a729e]"
              />
            </div>

            {/* Annual Lump Sum */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-medium">Annual Lump Sum</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={inputFields.lumpSum}
                    onChange={(e) => handleInputChange('lumpSum', e.target.value)}
                    onBlur={() => handleInputBlur('lumpSum')}
                    className={`w-36 px-3 py-2 pl-7 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.lumpSum ? 'border-red-500' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                    placeholder="Amount"
                  />
                  <span className="text-[#1a729e] font-semibold w-20 text-right">
                    {formatDisplayValue(formData.lumpSum, 'lumpSum')}
                  </span>
                </div>
              </div>
              {errors.lumpSum && (
                <p className="text-red-500 text-sm mb-2">{errors.lumpSum}</p>
              )}
              <input
                type="range"
                min={limits.lumpSum.min}
                max={limits.lumpSum.max}
                step={50000}
                value={formData.lumpSum}
                onChange={(e) => handleSliderChange('lumpSum', e.target.value)}
                className="w-full accent-[#1a729e]"
              />
            </div>

            {/* Monthly SIP */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-medium">Monthly SIP</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={inputFields.monthlySIP}
                    onChange={(e) => handleInputChange('monthlySIP', e.target.value)}
                    onBlur={() => handleInputBlur('monthlySIP')}
                    className={`w-36 px-3 py-2 pl-7 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.monthlySIP ? 'border-red-500' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                    placeholder="Amount"
                  />
                  <span className="text-[#1a729e] font-semibold w-20 text-right">
                    {formatDisplayValue(formData.monthlySIP, 'monthlySIP')}
                  </span>
                </div>
              </div>
              {errors.monthlySIP && (
                <p className="text-red-500 text-sm mb-2">{errors.monthlySIP}</p>
              )}
              <input
                type="range"
                min={limits.monthlySIP.min}
                max={limits.monthlySIP.max}
                step={10000}
                value={formData.monthlySIP}
                onChange={(e) => handleSliderChange('monthlySIP', e.target.value)}
                className="w-full accent-[#1a729e]"
              />
            </div>

            {/* Portfolio Return */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-medium">Annual Return (%)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={inputFields.portfolioReturn}
                    onChange={(e) => handleInputChange('portfolioReturn', e.target.value)}
                    onBlur={() => handleInputBlur('portfolioReturn')}
                    className={`w-36 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.portfolioReturn ? 'border-red-500' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                    placeholder="%"
                  />
                  <span className="text-[#1a729e] font-semibold w-20 text-right">
                    {formData.portfolioReturn}%
                  </span>
                </div>
              </div>
              {errors.portfolioReturn && (
                <p className="text-red-500 text-sm mb-2">{errors.portfolioReturn}</p>
              )}
              <input
                type="range"
                min={limits.portfolioReturn.min}
                max={limits.portfolioReturn.max}
                step={0.5}
                value={formData.portfolioReturn}
                onChange={(e) => handleSliderChange('portfolioReturn', e.target.value)}
                className="w-full accent-[#1a729e]"
              />
            </div>

            {/* Years */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-medium">Investment Period (Years)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={inputFields.years}
                    onChange={(e) => handleInputChange('years', e.target.value)}
                    onBlur={() => handleInputBlur('years')}
                    className={`w-36 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.years ? 'border-red-500' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                    placeholder="Years"
                  />
                  <span className="text-[#1a729e] font-semibold w-20 text-right">
                    {formData.years} years
                  </span>
                </div>
              </div>
              {errors.years && (
                <p className="text-red-500 text-sm mb-2">{errors.years}</p>
              )}
              <input
                type="range"
                min={limits.years.min}
                max={limits.years.max}
                step={1}
                value={formData.years}
                onChange={(e) => handleSliderChange('years', e.target.value)}
                className="w-full accent-[#1a729e]"
              />
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 bg-[#1a729e] text-white font-semibold rounded-lg "
            >
              Reset to Default Values
            </button>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-[#1a729e] rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-lg opacity-90 mb-2">Future Value After {formData.years} Years</h3>
              <div className="text-3xl md:text-4xl font-bold mb-2">{formatCurrency(futureValue)}</div>
              <p className="opacity-90 text-sm">Total amount after {formData.years} years</p>
            </div>

            <div className="bg-[#1a729e] rounded-2xl text-white shadow-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Total Amount Invested</h3>
              <div className="text-3xl md:text-4xl font-bold mb-2">{formatCurrency(totalInvested)}</div>
              <p className="text-sm">Sum of all your contributions</p>
            </div>

            <div className="bg-[#1a729e] text-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Wealth Gained</h3>
              <div className="text-3xl md:text-4xl font-bold mb-2">{formatCurrency(wealthGained)}</div>
              <p className="text-sm">Returns through compounding</p>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureWealthCalculator;