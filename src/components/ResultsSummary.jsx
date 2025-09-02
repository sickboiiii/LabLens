import { Clock, TrendingUp, TrendingDown, CheckCircle } from 'lucide-react';

const ResultsSummary = ({ results, timestamp }) => {
  const counts = {
    high: results.filter(r => r.status === 'high').length,
    low: results.filter(r => r.status === 'low').length,
    normal: results.filter(r => r.status === 'normal').length,
  };

  const total = results.length;
  const abnormal = counts.high + counts.low;

  return (
    <div className="bg-card border border-border rounded-radius-lg p-6 shadow-card animate-fade-in">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-poppins font-bold text-foreground mb-2">
          Here's what we found
        </h2>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{timestamp}</span>
        </div>
        
        {abnormal > 0 ? (
          <p className="text-sm text-muted-foreground mt-2">
            {abnormal} result{abnormal > 1 ? 's' : ''} need attention — we'll explain what this means
          </p>
        ) : (
          <p className="text-sm text-success mt-2">
            All results are within normal ranges
          </p>
        )}
      </div>

      {/* Status Pills */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {counts.high > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-destructive-light rounded-radius-pill">
            <TrendingUp className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">
              {counts.high} High
            </span>
          </div>
        )}
        
        {counts.low > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-warning-light rounded-radius-pill">
            <TrendingDown className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium text-warning">
              {counts.low} Low
            </span>
          </div>
        )}
        
        {counts.normal > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-success-light rounded-radius-pill">
            <CheckCircle className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-success">
              {counts.normal} Normal
            </span>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Based on standard adult reference ranges • Total tests: {total}
        </p>
      </div>
    </div>
  );
};

export default ResultsSummary;