import { Download, Copy, RotateCcw, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const ActionsBar = ({ results, onStartOver }) => {
  const [copied, setCopied] = useState(false);

  const generateSummaryText = () => {
    const timestamp = new Date().toLocaleString();
    let summary = `LabLens Results Summary - ${timestamp}\n\n`;
    
    results.forEach((result, index) => {
      summary += `${index + 1}. ${result.name}\n`;
      summary += `   Value: ${result.value} ${result.unit}\n`;
      summary += `   Status: ${result.status.charAt(0).toUpperCase() + result.status.slice(1)}\n`;
      summary += `   Reference Range: ${result.range?.min || 'N/A'} - ${result.range?.max || 'N/A'} ${result.unit}\n`;
      summary += `   Explanation: ${result.explanation}\n`;
      summary += `   Next Steps: ${result.nextSteps}\n`;
      if (result.specialty) {
        summary += `   Recommended Specialist: ${result.specialty}\n`;
      }
      summary += '\n';
    });
    
    summary += '\nDisclaimer: This summary is for educational purposes only and does not constitute medical advice. Always consult with a qualified healthcare professional for medical decisions.\n';
    
    return summary;
  };

  const handleDownloadPDF = () => {
    // In a real app, this would generate a proper PDF
    // For demo, we'll create a text file
    const summaryText = generateSummaryText();
    const blob = new Blob([summaryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LabLens-Results-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopySummary = async () => {
    try {
      const summaryText = generateSummaryText();
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-card border border-border rounded-radius-lg p-6 shadow-card">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Primary Actions */}
        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownloadPDF}
            className="btn-hero flex-1"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Summary
          </button>
          
          <button
            onClick={handleCopySummary}
            className={`btn-secondary flex-1 ${copied ? 'bg-success text-success-foreground' : ''}`}
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Summary
              </>
            )}
          </button>
        </div>

        {/* Secondary Action */}
        <button
          onClick={onStartOver}
          className="btn-secondary px-6"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Start Over
        </button>
      </div>
      
      {/* Mobile Sticky Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border z-40">
        <div className="flex gap-2">
          <button
            onClick={handleDownloadPDF}
            className="btn-hero flex-1"
          >
            <Download className="w-4 h-4 mr-1" />
            Download
          </button>
          <button
            onClick={() => window.scrollTo({ top: document.getElementById('specialist-section')?.offsetTop, behavior: 'smooth' })}
            className="btn-secondary flex-1"
          >
            Find Specialist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionsBar;