"use client";
import { useState, useEffect } from "react";
import {
  Calculator,
  TrendingUp,
  IndianRupee,
  Calendar,
  Percent,
  Target,
  ArrowUp,
  ArrowDown,
  Wallet,
  Coins,
  Landmark,
} from "lucide-react";

const SIPtoSWPCalculator = () => {
  // Default values
  const [formData, setFormData] = useState({
    monthlySIP: 5000,
    sipPeriod: 20,
    withdrawalPeriod: 20,
    sipReturn: 12,
    swpReturn: 8,
  });

  // Separate state for input fields to prevent re-renders during typing
  const [inputFields, setInputFields] = useState({
    monthlySIP: "5000",
    sipPeriod: "20",
    withdrawalPeriod: "20",
    sipReturn: "12",
    swpReturn: "8",
  });

  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});

  // Validation limits
  const limits = {
    monthlySIP: { min: 500, max: 10000000, default: 5000 },
    sipPeriod: { min: 1, max: 50, default: 20 },
    withdrawalPeriod: { min: 1, max: 50, default: 20 },
    sipReturn: { min: 4, max: 18, default: 12 },
    swpReturn: { min: 4, max: 18, default: 8 },
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

  // Calculate monthly withdrawal for SWP
  const calculateMonthlyWithdrawal = (rate, nper, pv) => {
    if (rate === 0) {
      return pv / nper;
    }

    const factor = Math.pow(1 + rate, nper);
    const pmt = (pv * rate * factor) / (factor - 1);
    return pmt;
  };

  // Calculate results automatically
  useEffect(() => {
    // Check if there are any errors before calculating
    const hasErrors = Object.values(errors).some(error => error !== '');
    if (!hasErrors) {
      calculateResults();
    }
  }, [formData]);

  // Handle input change - SIMPLE AND SMOOTH
  const handleInputChange = (field, value) => {
    setInputFields(prev => ({
      ...prev,
      [field]: value
    }));

    setErrors(prev => ({
      ...prev,
      [field]: ''
    }));
  };

  // Handle input blur - validate and update formData
  const handleInputBlur = (field) => {
    const value = inputFields[field];
    
    if (value === '') {
      setInputFields(prev => ({
        ...prev,
        [field]: formData[field].toString()
      }));
      return;
    }

    const numValue = Number(value);
    
    if (isNaN(numValue)) {
      setErrors(prev => ({
        ...prev,
        [field]: 'Please enter a valid number'
      }));
      return;
    }

    const limit = limits[field];
    if (numValue < limit.min) {
      setErrors(prev => ({
        ...prev,
        [field]: `Minimum value is ${field.includes('Return') ? '' : '₹'}${limit.min}${field.includes('Return') ? '%' : ''}`
      }));
      return;
    }
    
    if (numValue > limit.max) {
      setErrors(prev => ({
        ...prev,
        [field]: `Maximum value is ${field.includes('Return') ? '' : '₹'}${limit.max}${field.includes('Return') ? '%' : ''}`
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  // Handle slider change
  const handleSliderChange = (field, value) => {
    const numValue = Number(value);
    
    setFormData(prev => ({
      ...prev,
      [field]: numValue
    }));
    
    setInputFields(prev => ({
      ...prev,
      [field]: numValue.toString()
    }));

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
      withdrawalPeriod: limits.withdrawalPeriod.default,
      sipReturn: limits.sipReturn.default,
      swpReturn: limits.swpReturn.default
    };
    
    setFormData(defaults);
    setInputFields({
      monthlySIP: defaults.monthlySIP.toString(),
      sipPeriod: defaults.sipPeriod.toString(),
      withdrawalPeriod: defaults.withdrawalPeriod.toString(),
      sipReturn: defaults.sipReturn.toString(),
      swpReturn: defaults.swpReturn.toString()
    });
    setErrors({});
  };

  // Calculate results
  const calculateResults = () => {
    const { monthlySIP, sipPeriod, withdrawalPeriod, sipReturn, swpReturn } = formData;

    // SIP Phase Calculations
    const sipMonths = sipPeriod * 12;
    const rSipMonthly = calculateMonthlyRate(sipReturn);
    const totalCorpus = calculateFutureValue(rSipMonthly, sipMonths, monthlySIP);
    const totalInvested = monthlySIP * sipMonths;
    const wealthGained = totalCorpus - totalInvested;

    // SWP Phase Calculations
    const withdrawalMonths = withdrawalPeriod * 12;
    const rSwpMonthly = calculateMonthlyRate(swpReturn);
    const monthlyWithdrawal = calculateMonthlyWithdrawal(rSwpMonthly, withdrawalMonths, totalCorpus);

    setResults({
      totalCorpus,
      totalInvested,
      wealthGained,
      monthlyWithdrawal,
      sipPeriod,
      withdrawalPeriod,
      sipReturn,
      swpReturn
    });
  };

  // Format display value
  const formatDisplayValue = (value, field) => {
    if (field.includes('Return')) return `${value}%`;
    if (field === 'sipPeriod' || field === 'withdrawalPeriod') return `${value} years`;
    
    const absValue = Math.abs(value);
    if (absValue >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (absValue >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
    if (absValue >= 1000) return `₹${(value / 1000).toFixed(1)} K`;
    return `₹${value.toLocaleString('en-IN')}`;
  };

  // Calculate additional metrics
  const roi = results ? ((results.wealthGained / results.totalInvested) * 100).toFixed(1) : 0;
  const multiple = results ? (results.totalCorpus / results.totalInvested).toFixed(2) : 0;
  const withdrawalRate = results ? ((results.monthlyWithdrawal * 12 / results.totalCorpus) * 100).toFixed(1) : 0;

  return (
    <div className=" p-4">
      <div className="max-w-6xl mx-auto">
        

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2 bg-gray-100 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-[#074a6b] mb-6 flex items-center gap-2">
              Investment Parameters
            </h2>
            
            {/* SIP Phase */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <ArrowUp className="w-5 h-5 text-green-600" />
                Accumulation Phase (SIP)
              </h3>

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

              {/* SIP Period */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-gray-700 font-medium flex items-center gap-2">
                    SIP Period (Years)
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
                  <span>50 Years</span>
                </div>
              </div>

              {/* SIP Return */}
              <div className="mb-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-gray-700 font-medium flex items-center gap-2">
                    Expected Return During SIP (%)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={inputFields.sipReturn}
                      onChange={(e) => handleInputChange('sipReturn', e.target.value)}
                      onBlur={() => handleInputBlur('sipReturn')}
                      className={`w-36 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.sipReturn ? 'border-red-500' : 'border-gray-300 focus:ring-blue-200'
                      }`}
                      placeholder="%"
                    />
                    <span className="text-[#1a729e] font-semibold w-20 text-right">
                      {formData.sipReturn}%
                    </span>
                  </div>
                </div>
                {errors.sipReturn && (
                  <p className="text-red-500 text-sm mb-2">{errors.sipReturn}</p>
                )}
                <input
                  type="range"
                  min={limits.sipReturn.min}
                  max={limits.sipReturn.max}
                  step={0.5}
                  value={formData.sipReturn}
                  onChange={(e) => handleSliderChange('sipReturn', e.target.value)}
                  className="w-full accent-[#1a729e]"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>4%</span>
                  <span>18%</span>
                </div>
              </div>
            </div>

            {/* SWP Phase */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <ArrowDown className="w-5 h-5 text-red-600" />
                Withdrawal Phase (SWP)
              </h3>

              {/* Withdrawal Period */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-gray-700 font-medium flex items-center gap-2">
                    Withdrawal Period (Years)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={inputFields.withdrawalPeriod}
                      onChange={(e) => handleInputChange('withdrawalPeriod', e.target.value)}
                      onBlur={() => handleInputBlur('withdrawalPeriod')}
                      className={`w-36 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.withdrawalPeriod ? 'border-red-500' : 'border-gray-300 focus:ring-blue-200'
                      }`}
                      placeholder="Years"
                    />
                    <span className="text-[#1a729e] font-semibold w-20 text-right">
                      {formData.withdrawalPeriod} years
                    </span>
                  </div>
                </div>
                {errors.withdrawalPeriod && (
                  <p className="text-red-500 text-sm mb-2">{errors.withdrawalPeriod}</p>
                )}
                <input
                  type="range"
                  min={limits.withdrawalPeriod.min}
                  max={limits.withdrawalPeriod.max}
                  step={1}
                  value={formData.withdrawalPeriod}
                  onChange={(e) => handleSliderChange('withdrawalPeriod', e.target.value)}
                  className="w-full accent-[#1a729e]"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 Year</span>
                  <span>50 Years</span>
                </div>
              </div>

              {/* SWP Return */}
              <div className="mb-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-gray-700 font-medium flex items-center gap-2">
                    Expected Return During Withdrawal (%)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={inputFields.swpReturn}
                      onChange={(e) => handleInputChange('swpReturn', e.target.value)}
                      onBlur={() => handleInputBlur('swpReturn')}
                      className={`w-36 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.swpReturn ? 'border-red-500' : 'border-gray-300 focus:ring-blue-200'
                      }`}
                      placeholder="%"
                    />
                    <span className="text-[#1a729e] font-semibold w-20 text-right">
                      {formData.swpReturn}%
                    </span>
                  </div>
                </div>
                {errors.swpReturn && (
                  <p className="text-red-500 text-sm mb-2">{errors.swpReturn}</p>
                )}
                <input
                  type="range"
                  min={limits.swpReturn.min}
                  max={limits.swpReturn.max}
                  step={0.5}
                  value={formData.swpReturn}
                  onChange={(e) => handleSliderChange('swpReturn', e.target.value)}
                  className="w-full accent-[#1a729e]"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>4%</span>
                  <span>18%</span>
                </div>
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
            {results ? (
              <>
                {/* Total Corpus */}
                <div className="bg-[#1a729e] rounded-2xl shadow-xl p-6 text-white">
                  <h3 className="text-lg opacity-90 mb-2 flex items-center gap-2">
                    <Landmark className="w-5 h-5" />
                    Total Accumulated Corpus
                  </h3>
                  <div className="text-3xl md:text-4xl font-bold mb-2">{formatCurrency(results.totalCorpus)}</div>
                  <p className="opacity-90 text-sm">After {results.sipPeriod} years of SIP</p>
                </div>

                {/* Monthly Withdrawal */}
                <div className="bg-[#1a729e] rounded-2xl shadow-xl p-6 text-white">
                  <h3 className="text-lg opacity-90 mb-2 flex items-center gap-2">
                    <Coins className="w-5 h-5" />
                    Monthly SWP Withdrawal
                  </h3>
                  <div className="text-3xl md:text-4xl font-bold mb-2">{formatCurrency(results.monthlyWithdrawal)}</div>
                  <p className="opacity-90 text-sm">For {results.withdrawalPeriod} years</p>
                </div>

            
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <Calculator className="w-16 h-16 mx-auto text-blue-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 mb-2">
                    No Results Yet
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Adjust the parameters to see your SIP to SWP journey
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default SIPtoSWPCalculator;