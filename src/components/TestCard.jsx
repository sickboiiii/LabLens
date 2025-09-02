import { Info, ExternalLink, Copy } from 'lucide-react';
import { useState } from 'react';

const TestCard = ({ 
  testId, 
  name, 
  value, 
  unit, 
  range, 
  status, 
  severity, 
  explanation, 
  nextSteps, 
  specialty 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getStatusColor = () => {
    switch (status) {
      case 'high': return severity === 'prompt' ? 'destructive' : 'warning';
      case 'low': return 'warning';
      default: return 'success';
    }
  };

  const getStatusText = () => {
    if (status === 'normal') return 'Normal';
    if (status === 'high') return 'High';
    if (status === 'low') return 'Low';
    return 'Unknown';
  };

  const getSeverityText = () => {
    switch (severity) {
      case 'prompt': return 'Prompt attention';
      case 'soon': return 'Follow up soon';
      case 'monitor': return 'Monitor';
      default: return '';
    }
  };

  const getRangePosition = () => {
    if (!range || !value) return 50;
    const { min, max } = range;
    const position = ((value - min) / (max - min)) * 100;
    return Math.max(0, Math.min(100, position));
  };

  const copyCard = () => {
    const cardText = `${name}: ${value} ${unit}\nStatus: ${getStatusText()}\n${explanation}\n${nextSteps}`;
    navigator.clipboard.writeText(cardText);
  };

  const statusColor = getStatusColor();

  return (
    <div className={`status-card ${status === 'normal' ? 'status-normal' : status === 'high' || status === 'low' ? (severity === 'prompt' ? 'status-high' : 'status-warning') : ''} animate-fade-in`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-poppins font-semibold text-lg text-foreground">
            {name}
          </h3>
          <div className="relative">
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="p-1 rounded-full hover:bg-muted transition-colors duration-200"
            >
              <Info className="w-4 h-4 text-muted-foreground" />
            </button>
            {showTooltip && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-foreground text-background text-xs rounded-radius whitespace-nowrap z-10">
                What this test measures
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={copyCard}
          className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
          title="Copy card details"
        >
          <Copy className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Value and Range */}
      <div className="space-y-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="text-3xl font-bold text-foreground">
            {value} <span className="text-lg font-normal text-muted-foreground">{unit}</span>
          </div>
          
          {/* Status Badge */}
          <div className={`
            px-3 py-1 rounded-radius-pill text-sm font-medium
            ${statusColor === 'success' ? 'bg-success text-success-foreground' : ''}
            ${statusColor === 'warning' ? 'bg-warning text-warning-foreground' : ''}
            ${statusColor === 'destructive' ? 'bg-destructive text-destructive-foreground' : ''}
          `}>
            {getStatusText()}
          </div>
        </div>

        {/* Range Bar */}
        {range && (
          <div className="space-y-2">
            <div className="range-bar">
              <div 
                className={`
                  range-indicator w-2 
                  ${statusColor === 'success' ? 'bg-success' : ''}
                  ${statusColor === 'warning' ? 'bg-warning' : ''}
                  ${statusColor === 'destructive' ? 'bg-destructive' : ''}
                `}
                style={{ left: `${getRangePosition()}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{range.min} {unit}</span>
              <span className="text-center">Reference Range</span>
              <span>{range.max} {unit}</span>
            </div>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="space-y-3 mb-4">
        <div>
          <h4 className="font-medium text-foreground mb-1">What this means:</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {explanation}
          </p>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-1">What to do next:</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {nextSteps}
          </p>
        </div>
      </div>

      {/* Severity and Specialist */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border">
        {severity && severity !== 'monitor' && (
          <div className={`
            trust-badge
            ${severity === 'prompt' ? 'text-destructive bg-destructive-light' : ''}
            ${severity === 'soon' ? 'text-warning bg-warning-light' : ''}
          `}>
            {getSeverityText()}
          </div>
        )}

        {specialty && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Recommended: <strong>{specialty}</strong>
            </span>
            <button className="text-primary hover:text-primary-hover transition-colors duration-200">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCard;