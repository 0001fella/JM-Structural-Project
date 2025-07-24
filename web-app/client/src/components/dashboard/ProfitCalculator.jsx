// src/components/quotation/ProfitCalculator.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { Info, TrendingUp, DollarSign } from 'lucide-react';

const ProfitCalculator = ({ baseCost, onTotalUpdate }) => {
  const [profitMargin, setProfitMargin] = useState([15]); // Using array for Slider
  const [overhead, setOverhead] = useState([8]); // Using array for Slider
  const [includeOverhead, setIncludeOverhead] = useState(true);

  // Calculate all values with commercial precision
  const calculateValues = () => {
    const profitMarginValue = profitMargin[0];
    const overheadValue = overhead[0];
    const overheadAmount = includeOverhead ? baseCost * (overheadValue / 100) : 0;
    const profitAmount = baseCost * (profitMarginValue / 100);
    const subtotal = baseCost + overheadAmount;
    const total = subtotal + profitAmount;

    return {
      overheadAmount,
      profitAmount,
      subtotal,
      total
    };
  };

  const { overheadAmount, profitAmount, subtotal, total } = calculateValues();

  // Format currency with construction industry standards
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card className="w-full shadow-sm border">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="mr-2 h-5 w-5" />
            Profit Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="profit-margin" className="font-medium flex items-center">
                  Profit Margin
                  <Info className="ml-2 h-3 w-3 text-muted-foreground" />
                </Label>
                <div className="flex items-center">
                  <Input
                    id="profit-margin"
                    type="number"
                    min="0"
                    max="100"
                    step="0.25"
                    className="w-20 text-right"
                    value={profitMargin[0]}
                    onChange={(e) => setProfitMargin([Number(e.target.value)])}
                  />
                  <span className="ml-1 text-muted-foreground">%</span>
                </div>
              </div>
              <Slider
                id="profit-margin-slider"
                min={0}
                max={50}
                step={0.25}
                value={profitMargin}
                onValueChange={setProfitMargin}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                aria-label="Profit Margin"
              />
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>0%</span>
                <span>10%</span>
                <span>20%</span>
                <span>30%</span>
                <span>40%</span>
                <span>50%</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Label htmlFor="include-overhead" className="font-medium flex items-center">
                Include Overhead
              </Label>
              <Switch
                id="include-overhead"
                checked={includeOverhead}
                onCheckedChange={setIncludeOverhead}
              />
            </div>

            {includeOverhead && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="overhead-percentage" className="font-medium flex items-center">
                    Overhead Percentage
                    <Info className="ml-2 h-3 w-3 text-muted-foreground" title="Overhead costs include administrative expenses" />
                  </Label>
                  <div className="flex items-center">
                    <Input
                      id="overhead-percentage"
                      type="number"
                      min="0"
                      max="50"
                      step="0.25"
                      className="w-20 text-right"
                      value={overhead[0]}
                      onChange={(e) => setOverhead([Number(e.target.value)])}
                    />
                    <span className="ml-1 text-muted-foreground">%</span>
                  </div>
                </div>
                <Slider
                  id="overhead-slider"
                  min={0}
                  max={30}
                  step={0.25}
                  value={overhead}
                  onValueChange={setOverhead}
                  className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                  aria-label="Overhead Percentage"
                />
              </div>
            )}
          </div>

          <div className="bg-muted rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b">
              <div className="text-muted-foreground">Base Cost:</div>
              <div className="font-medium">{formatCurrency(baseCost)}</div>
            </div>

            {includeOverhead && (
              <>
                <div className="flex justify-between items-center">
                  <div className="text-muted-foreground">Overhead ({overhead[0]}%):</div>
                  <div className="font-medium">{formatCurrency(overheadAmount)}</div>
                </div>

                <div className="flex justify-between items-center pb-2 border-b">
                  <div className="text-muted-foreground">Subtotal:</div>
                  <div className="font-medium">{formatCurrency(subtotal)}</div>
                </div>
              </>
            )}

            <div className="flex justify-between items-center">
              <div className="text-muted-foreground">Profit ({profitMargin[0]}%):</div>
              <div className="font-medium">{formatCurrency(profitAmount)}</div>
            </div>

            <div className="flex justify-between items-center pt-3 mt-2 border-t">
              <div className="font-semibold">Contract Sum:</div>
              <div className="font-bold text-xl text-primary">
                {formatCurrency(total)}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start">
            <DollarSign className="text-blue-600 dark:text-blue-400 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Increasing profit margin by 5% would add <span className="font-semibold">{formatCurrency(baseCost * 0.05)}</span> to your contract sum
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfitCalculator;