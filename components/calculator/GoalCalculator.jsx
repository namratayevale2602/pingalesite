"use client";
import { useState, useEffect } from "react";
import {
  Calculator,
  Target,
  TrendingUp,
  IndianRupee,
  Calendar,
  Percent,
  Zap,
  ArrowUp,
  Wallet,
  Landmark,
  TrendingDown,
  Moon,
  Sunrise,
  AlertCircle,
} from "lucide-react";

const GoalCalculator = () => {
  // Default values
  const [formData, setFormData] = useState({
    amountRequiredToday: 5000000,
    yearsLeft: 15,
    yearlyInflation: 7,
    expectedReturn: 13,
    currentInvestment: 2000000,
  });

  // Separate state for input fields to prevent re-renders during typing
  const [inputFields, setInputFields] = useState({
    amountRequiredToday: "5000000",
    yearsLeft: "15",
    yearlyInflation: "7",
    expectedReturn: "13",
    currentInvestment: "2000000",
  });

  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});
  const [paymentType, setPaymentType] = useState("beginning"); // 'beginning' or 'end'

  // Validation limits
  const limits = {
    amountRequiredToday: { min: 100000, max: 1000000000, default: 5000000 },
    yearsLeft: { min: 1, max: 40, default: 15 },
    yearlyInflation: { min: 2, max: 15, default: 7 },
    expectedReturn: { min: 6, max: 20, default: 13 },
    currentInvestment: { min: 0, max: 100000000, default: 2000000 },
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

  // Auto-calculate on formData or paymentType change
  useEffect(() => {
    // Check if there are any validation errors
    const hasValidationErrors = Object.keys(formData).some(field => {
      const value = formData[field];
      const limit = limits[field];
      return value < limit.min || value > limit.max;
    });

    if (!hasValidationErrors) {
      calculateResults();
    }
  }, [formData, paymentType]);

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
        [field]: `Minimum value is ${field.includes('Return') || field.includes('Inflation') ? '' : '₹'}${limit.min}${field.includes('Return') || field.includes('Inflation') ? '%' : ''}`
      }));
      return;
    }
    
    if (numValue > limit.max) {
      setErrors(prev => ({
        ...prev,
        [field]: `Maximum value is ${field.includes('Return') || field.includes('Inflation') ? '' : '₹'}${limit.max}${field.includes('Return') || field.includes('Inflation') ? '%' : ''}`
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
      amountRequiredToday: limits.amountRequiredToday.default,
      yearsLeft: limits.yearsLeft.default,
      yearlyInflation: limits.yearlyInflation.default,
      expectedReturn: limits.expectedReturn.default,
      currentInvestment: limits.currentInvestment.default,
    };
    
    setFormData(defaults);
    setInputFields({
      amountRequiredToday: defaults.amountRequiredToday.toString(),
      yearsLeft: defaults.yearsLeft.toString(),
      yearlyInflation: defaults.yearlyInflation.toString(),
      expectedReturn: defaults.expectedReturn.toString(),
      currentInvestment: defaults.currentInvestment.toString(),
    });
    setErrors({});
    setResults(null);
  };

  // Calculate results
  const calculateResults = () => {
    const {
      amountRequiredToday,
      yearsLeft,
      yearlyInflation,
      expectedReturn,
      currentInvestment,
    } = formData;

    // Step 1: Calculate future goal value adjusted for inflation
    const futureGoalValue = amountRequiredToday * 
      Math.pow(1 + yearlyInflation / 100, yearsLeft);

    // Step 2: Calculate future value of current investment
    const futureValueOfCurrent = currentInvestment * 
      Math.pow(1 + expectedReturn / 100, yearsLeft);

    // Step 3: Calculate additional amount needed
    const additionalAmountNeeded = Math.max(0, futureGoalValue - futureValueOfCurrent);

    // Step 4: Calculate monthly SIP needed
    let monthlySIP = 0;
    
    if (additionalAmountNeeded > 0) {
      // Convert annual return to effective monthly rate
      const monthlyRate = Math.pow(1 + expectedReturn / 100, 1/12) - 1;
      const totalMonths = yearsLeft * 12;
      
      // Future value factor for annuity
      const fvFactor = (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
      
      // Adjust for payment timing
      if (paymentType === "beginning") {
        monthlySIP = additionalAmountNeeded / (fvFactor * (1 + monthlyRate));
      } else {
        monthlySIP = additionalAmountNeeded / fvFactor;
      }
    }

    // Step 5: Calculate real return (adjusted for inflation)
    const realReturn = ((1 + expectedReturn/100) / (1 + yearlyInflation/100) - 1) * 100;

    // Step 6: Calculate goal progress
    const progress = (futureValueOfCurrent / futureGoalValue) * 100;

    setResults({
      futureGoalValue: Math.round(futureGoalValue),
      futureValueOfCurrent: Math.round(futureValueOfCurrent),
      additionalAmountNeeded: Math.max(0, Math.round(additionalAmountNeeded)),
      monthlySIP: Math.round(monthlySIP),
      yearsLeft: yearsLeft,
      realReturn: realReturn,
      inflationMultiplier: Math.pow(1 + yearlyInflation/100, yearsLeft),
      progress: Math.min(100, progress),
      isGoalAchievable: futureValueOfCurrent >= futureGoalValue,
      monthlyRate: Math.pow(1 + expectedReturn / 100, 1/12) - 1,
    });
  };

  // Format display value
  const formatDisplayValue = (value, field) => {
    if (field === 'yearlyInflation' || field === 'expectedReturn') return `${value}%`;
    if (field === 'yearsLeft') return `${value} years`;
    
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
            <h2 className="text-2xl font-bold text-[#074a6b] mb-6 flex items-center gap-2">
              Goal Parameters
            </h2>

      
            
            {/* Amount Required Today */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-medium flex items-center gap-2">
                  Amount Required Today
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={inputFields.amountRequiredToday}
                    onChange={(e) => handleInputChange('amountRequiredToday', e.target.value)}
                    onBlur={() => handleInputBlur('amountRequiredToday')}
                    className={`w-36 px-3 py-2 pl-7 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.amountRequiredToday ? 'border-red-500' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                    placeholder="Amount"
                  />
                  <span className="text-[#1a729e] font-semibold w-20 text-right">
                    {formatDisplayValue(formData.amountRequiredToday, 'amountRequiredToday')}
                  </span>
                </div>
              </div>
              {errors.amountRequiredToday && (
                <p className="text-red-500 text-sm mb-2">{errors.amountRequiredToday}</p>
              )}
              <input
                type="range"
                min={limits.amountRequiredToday.min}
                max={limits.amountRequiredToday.max}
                step={100000}
                value={formData.amountRequiredToday}
                onChange={(e) => handleSliderChange('amountRequiredToday', e.target.value)}
                className="w-full accent-[#1a729e]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹1 L</span>
                <span>₹100 Cr</span>
              </div>
            </div>

            {/* Years Left */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-medium flex items-center gap-2">
                  Years Left to Achieve Goal
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={inputFields.yearsLeft}
                    onChange={(e) => handleInputChange('yearsLeft', e.target.value)}
                    onBlur={() => handleInputBlur('yearsLeft')}
                    className={`w-36 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.yearsLeft ? 'border-red-500' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                    placeholder="Years"
                  />
                  <span className="text-[#1a729e] font-semibold w-20 text-right">
                    {formData.yearsLeft} years
                  </span>
                </div>
              </div>
              {errors.yearsLeft && (
                <p className="text-red-500 text-sm mb-2">{errors.yearsLeft}</p>
              )}
              <input
                type="range"
                min={limits.yearsLeft.min}
                max={limits.yearsLeft.max}
                step={1}
                value={formData.yearsLeft}
                onChange={(e) => handleSliderChange('yearsLeft', e.target.value)}
                className="w-full accent-[#1a729e]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 Year</span>
                <span>40 Years</span>
              </div>
            </div>

            {/* Yearly Inflation */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-medium flex items-center gap-2">
                  Yearly Inflation Assumed (%)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={inputFields.yearlyInflation}
                    onChange={(e) => handleInputChange('yearlyInflation', e.target.value)}
                    onBlur={() => handleInputBlur('yearlyInflation')}
                    className={`w-36 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.yearlyInflation ? 'border-red-500' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                    placeholder="%"
                  />
                  <span className="text-[#1a729e] font-semibold w-20 text-right">
                    {formData.yearlyInflation}%
                  </span>
                </div>
              </div>
              {errors.yearlyInflation && (
                <p className="text-red-500 text-sm mb-2">{errors.yearlyInflation}</p>
              )}
              <input
                type="range"
                min={limits.yearlyInflation.min}
                max={limits.yearlyInflation.max}
                step={0.5}
                value={formData.yearlyInflation}
                onChange={(e) => handleSliderChange('yearlyInflation', e.target.value)}
                className="w-full accent-[#1a729e]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>2%</span>
                <span>15%</span>
              </div>
            </div>

            {/* Expected Return */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-medium flex items-center gap-2">
                  Returns Expected on Investment (%)
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

            {/* Current Investment */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-medium flex items-center gap-2">
                  Current Investment for Goal
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={inputFields.currentInvestment}
                    onChange={(e) => handleInputChange('currentInvestment', e.target.value)}
                    onBlur={() => handleInputBlur('currentInvestment')}
                    className={`w-36 px-3 py-2 pl-7 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.currentInvestment ? 'border-red-500' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                    placeholder="Amount"
                  />
                  <span className="text-[#1a729e] font-semibold w-20 text-right">
                    {formatDisplayValue(formData.currentInvestment, 'currentInvestment')}
                  </span>
                </div>
              </div>
              {errors.currentInvestment && (
                <p className="text-red-500 text-sm mb-2">{errors.currentInvestment}</p>
              )}
              <input
                type="range"
                min={limits.currentInvestment.min}
                max={limits.currentInvestment.max}
                step={100000}
                value={formData.currentInvestment}
                onChange={(e) => handleSliderChange('currentInvestment', e.target.value)}
                className="w-full accent-[#1a729e]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹0</span>
                <span>₹10 Cr</span>
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
                {/* Goal Value Result */}
                <div className="bg-[#1a729e] rounded-2xl shadow-xl p-6 text-white">
                  <h3 className="text-lg opacity-90 mb-2 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Future Goal Value
                  </h3>
                  <div className="text-3xl md:text-4xl font-bold mb-2">{formatCurrency(results.futureGoalValue)}</div>
                  <p className="opacity-90 text-sm">After {results.yearsLeft} years (with {formData.yearlyInflation}% inflation)</p>
                  <p className="opacity-75 text-xs mt-2">
                    Today's value: {formatCurrency(formData.amountRequiredToday)}
                  </p>
                </div>

                {/* Monthly Investment Required */}
                <div className={`rounded-2xl shadow-xl p-6 text-white bg-[#1a729e]`}>
                  <h3 className="text-lg opacity-90 mb-2 flex items-center gap-2">
                    <ArrowUp className="w-5 h-5" />
                    {results.isGoalAchievable ? 'Goal Achievable!' : 'Monthly Investment Required'}
                  </h3>
                  {results.isGoalAchievable ? (
                    <>
                      <div className="text-2xl font-bold mb-2">You're on track!</div>
                      <p className="opacity-90 text-sm">
                        Your current investment of {formatCurrency(formData.currentInvestment)} will grow to {formatCurrency(results.futureValueOfCurrent)}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="text-3xl md:text-4xl font-bold mb-2">{formatCurrency(results.monthlySIP)}</div>
                      <p className="opacity-90 text-sm">
                        {paymentType === 'beginning' ? 'Beginning' : 'End'} of month SIP for {results.yearsLeft} years
                      </p>
                    </>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Goal Progress</h3>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span className="font-semibold">{results.progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-[#1a729e] h-3 rounded-full transition-all duration-500"
                        style={{ width: `${results.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-3">
                    <span>Current: {formatCurrency(results.futureValueOfCurrent)}</span>
                    <span>Goal: {formatCurrency(results.futureGoalValue)}</span>
                  </div>
                </div>

            

               
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center justify-center min-h-100">
                <div className="text-center">
                  <Target className="w-16 h-16 mx-auto text-blue-300 mb-4" />
                  <h3 className="text-lg font-medium text-[#074a6b] mb-2">
                    Adjust Parameters
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Adjust the parameters above to see your goal analysis
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

export default GoalCalculator;

// Helper function for formatting short currency
const formatShortCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN").format(Math.round(amount));
};