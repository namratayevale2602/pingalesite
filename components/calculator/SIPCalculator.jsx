"use client";
import { useState, useEffect, useCallback } from "react";
import { TrendingUp, Wallet, Calendar, Percent, Target } from "lucide-react";

const SIPCalculator = () => {
  // Default values
  const [formData, setFormData] = useState({
    monthlySIP: 5000,
    sipPeriod: 10,
    expectedReturn: 12,
  });

  // Separate state for input fields to prevent re-renders during typing
  const [inputFields, setInputFields] = useState({
    monthlySIP: "5000",
    sipPeriod: "10",
    expectedReturn: "12",
  });

  const [futureValue, setFutureValue] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [wealthGained, setWealthGained] = useState(0);
  const [errors, setErrors] = useState({});

  // Validation limits
  const limits = {
    monthlySIP: { min: 500, max: 10000000, default: 5000 },
    sipPeriod: { min: 1, max: 40, default: 10 },
    expectedReturn: { min: 6, max: 20, default: 12 },
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

  // Calculate monthly rate
  const calculateMonthlyRate = (annualRate) => {
    return Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  };

  // Future Value calculation for SIP (beginning of period)
  const calculateFutureValue = (rate, nper, pmt) => {
    if (rate === 0) {
      return pmt * nper;
    }

    const factor = Math.pow(1 + rate, nper);
    // Payments at beginning of period
    const fv = pmt * (1 + rate) * ((factor - 1) / rate);
    return fv;
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
        [field]: `Minimum value is ${field === 'expectedReturn' ? '' : '₹'}${limit.min}${field === 'expectedReturn' ? '%' : ''}`
      }));
      return;
    }
    
    if (numValue > limit.max) {
      setErrors(prev => ({
        ...prev,
        [field]: `Maximum value is ${field === 'expectedReturn' ? '' : '₹'}${limit.max}${field === 'expectedReturn' ? '%' : ''}`
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
      monthlySIP: limits.monthlySIP.default,
      sipPeriod: limits.sipPeriod.default,
      expectedReturn: limits.expectedReturn.default
    };
    
    setFormData(defaults);
    setInputFields({
      monthlySIP: defaults.monthlySIP.toString(),
      sipPeriod: defaults.sipPeriod.toString(),
      expectedReturn: defaults.expectedReturn.toString()
    });
    setErrors({});
  };

  // Calculate wealth
  useEffect(() => {
    const { monthlySIP, sipPeriod, expectedReturn } = formData;

    const months = sipPeriod * 12;
    const monthlyRate = calculateMonthlyRate(expectedReturn);

    // Calculate future value of SIP
    const totalFV = calculateFutureValue(monthlyRate, months, monthlySIP);
    const totalInvestment = monthlySIP * months;
    
    setFutureValue(totalFV);
    setTotalInvested(totalInvestment);
    setWealthGained(totalFV - totalInvestment);
  }, [formData]);

  // Format display value
  const formatDisplayValue = (value, field) => {
    if (field === 'expectedReturn') return `${value}%`;
    if (field === 'sipPeriod') return `${value} years`;
    
    const absValue = Math.abs(value);
    if (absValue >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (absValue >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
    if (absValue >= 1000) return `₹${(value / 1000).toFixed(1)} K`;
    return `₹${value.toLocaleString('en-IN')}`;
  };

  // Calculate ROI
  const roi = totalInvested > 0 ? ((wealthGained / totalInvested) * 100).toFixed(1) : 0;
  const multiple = totalInvested > 0 ? (futureValue / totalInvested).toFixed(2) : 0;
  const monthlyRate = calculateMonthlyRate(formData.expectedReturn) * 100;

  return (
    <div className=" p-4">
      <div className="max-w-6xl mx-auto">
       

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2 bg-gray-100 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-[#074a6b] mb-6 flex items-center gap-2">
              Investment Parameters
            </h2>
            
            {/* Monthly SIP */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-medium flex items-center gap-2">
                  Monthly SIP Amount
                </label>
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
                  <span className="text-[#074a6b] font-semibold w-20 text-right">
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
                step={500}
                value={formData.monthlySIP}
                onChange={(e) => handleSliderChange('monthlySIP', e.target.value)}
                className="w-full accent-[#1a729e]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹500</span>
                <span>₹1 Cr</span>
              </div>
            </div>

            {/* Investment Period */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-medium flex items-center gap-2">
                  Investment Period (Years)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={inputFields.sipPeriod}
                    onChange={(e) => handleInputChange('sipPeriod', e.target.value)}
                    onBlur={() => handleInputBlur('sipPeriod')}
                    className={`w-36 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.sipPeriod ? 'border-red-500' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                    placeholder="Years"
                  />
                  <span className="text-[#1a729e] font-semibold w-20 text-right">
                    {formData.sipPeriod} years
                  </span>
                </div>
              </div>
              {errors.sipPeriod && (
                <p className="text-red-500 text-sm mb-2">{errors.sipPeriod}</p>
              )}
              <input
                type="range"
                min={limits.sipPeriod.min}
                max={limits.sipPeriod.max}
                step={1}
                value={formData.sipPeriod}
                onChange={(e) => handleSliderChange('sipPeriod', e.target.value)}
                className="w-full accent-[#1a729e]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 Year</span>
                <span>40 Years</span>
              </div>
            </div>

            {/* Expected Return */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-medium flex items-center gap-2">
                  Expected Annual Return (%)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={inputFields.expectedReturn}
                    onChange={(e) => handleInputChange('expectedReturn', e.target.value)}
                    onBlur={() => handleInputBlur('expectedReturn')}
                    className={`w-36 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.expectedReturn ? 'border-red-500' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                    placeholder="%"
                  />
                  <span className="text-[#1a729e] font-semibold w-20 text-right">
                    {formData.expectedReturn}%
                  </span>
                </div>
              </div>
              {errors.expectedReturn && (
                <p className="text-red-500 text-sm mb-2">{errors.expectedReturn}</p>
              )}
              <input
                type="range"
                min={limits.expectedReturn.min}
                max={limits.expectedReturn.max}
                step={0.5}
                value={formData.expectedReturn}
                onChange={(e) => handleSliderChange('expectedReturn', e.target.value)}
                className="w-full accent-[#1a729e]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>6%</span>
                <span>20%</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 bg-[#1a729e] text-white font-semibold rounded-lg"
            >
              Reset to Default Values
            </button>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-[#1a729e] rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-lg mb-2">Future Value After {formData.sipPeriod} Years</h3>
              <div className="text-3xl md:text-4xl font-bold mb-2">{formatCurrency(futureValue)}</div>
              <p className="text-sm">Total amount after {formData.sipPeriod} years of SIP</p>
            </div>

            <div className="bg-[#1a729e] text-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                Total Amount Invested
              </h3>
              <div className="text-3xl md:text-4xl font-bold mb-2">{formatCurrency(totalInvested)}</div>
              <p className="text-sm">₹{formData.monthlySIP.toLocaleString('en-IN')} × {formData.sipPeriod * 12} months</p>
            </div>

            <div className="bg-[#1a729e] text-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                Wealth Gained
              </h3>
              <div className="text-3xl md:text-4xl font-bold mb-2">{formatCurrency(wealthGained)}</div>
              <p className="text-sm">Returns through compounding</p>
            </div>

         
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default SIPCalculator;