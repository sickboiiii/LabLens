import { useState, useRef } from 'react';
import { Upload, FileText, Type, CheckCircle } from 'lucide-react';

const UploadPanel = ({ onDemoClick, onManualEntry }) => {
  const [dragOver, setDragOver] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [consentChecked, setConsentChecked] = useState(true);
  const fileInputRef = useRef(null);
  const pasteRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file) => {
    // For demo purposes, just show the demo results
    setTimeout(() => {
      onDemoClick();
    }, 1000);
  };

  const handlePasteSubmit = () => {
    if (pasteText.trim()) {
      // For demo purposes, process any pasted text as demo results
      onDemoClick();
    }
  };

  return (
    <div className="space-y-8">
      {/* Primary Demo CTA */}
      <div className="text-center">
        <button
          onClick={onDemoClick}
          className="btn-hero text-lg px-8 py-4 animate-scale-in"
        >
          Try Demo
        </button>
        <p className="text-sm text-muted-foreground mt-2">
          See sample results instantly
        </p>
      </div>

      {/* Upload Options */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* File Upload */}
        <div className="space-y-4">
          <h3 className="font-poppins font-semibold text-lg">Upload Report</h3>
          
          <div
            className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="text-center space-y-3 cursor-pointer">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  Drop your lab PDF or click to upload
                </p>
                <p className="text-sm text-muted-foreground">
                  PDF files up to 10MB
                </p>
              </div>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            className="hidden"
          />
        </div>

        {/* Paste Text */}
        <div className="space-y-4">
          <h3 className="font-poppins font-semibold text-lg">Paste Results</h3>
          
          <div className="space-y-3">
            <textarea
              ref={pasteRef}
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              placeholder="Paste your lab report text here..."
              className="w-full h-32 p-4 border border-border rounded-radius resize-none 
                       focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                       bg-background text-foreground"
            />
            
            <button
              onClick={handlePasteSubmit}
              disabled={!pasteText.trim()}
              className="btn-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileText className="w-4 h-4 mr-2" />
              Process Text
            </button>
          </div>
        </div>
      </div>

      {/* Manual Entry Option */}
      <div className="text-center border-t border-border pt-6">
        <button
          onClick={onManualEntry}
          className="btn-secondary"
        >
          <Type className="w-4 h-4 mr-2" />
          Manual Entry
        </button>
        <p className="text-sm text-muted-foreground mt-2">
          Enter values manually if upload fails
        </p>
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-radius">
        <button
          onClick={() => setConsentChecked(!consentChecked)}
          className="flex-shrink-0 mt-0.5"
        >
          <CheckCircle 
            className={`w-5 h-5 ${
              consentChecked 
                ? 'text-success fill-success/20' 
                : 'text-muted-foreground'
            }`} 
          />
        </button>
        <div className="text-sm">
          <p className="text-foreground font-medium">
            Process locally for demo; do not store my data
          </p>
          <p className="text-muted-foreground mt-1">
            Your data stays on your device and is not sent to our servers during demo mode.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadPanel;