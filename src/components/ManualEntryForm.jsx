import { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';

const ManualEntryForm = ({ onSubmit, onCancel }) => {
  const [entries, setEntries] = useState([
    { test: '', value: '', unit: '' }
  ]);

  const commonTests = [
    { name: 'HbA1c', unit: '%' },
    { name: 'Fasting Glucose', unit: 'mg/dL' },
    { name: 'LDL Cholesterol', unit: 'mg/dL' },
    { name: 'HDL Cholesterol', unit: 'mg/dL' },
    { name: 'Total Cholesterol', unit: 'mg/dL' },
    { name: 'Triglycerides', unit: 'mg/dL' },
    { name: 'TSH', unit: 'mIU/L' },
    { name: 'Hemoglobin', unit: 'g/dL' },
    { name: 'ALT', unit: 'U/L' },
    { name: 'AST', unit: 'U/L' },
  ];

  const addEntry = () => {
    setEntries([...entries, { test: '', value: '', unit: '' }]);
  };

  const removeEntry = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const updateEntry = (index, field, value) => {
    const updated = entries.map((entry, i) => {
      if (i === index) {
        const newEntry = { ...entry, [field]: value };
        
        // Auto-suggest unit when test is selected
        if (field === 'test') {
          const testInfo = commonTests.find(t => t.name === value);
          if (testInfo) {
            newEntry.unit = testInfo.unit;
          }
        }
        
        return newEntry;
      }
      return entry;
    });
    setEntries(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validEntries = entries.filter(entry => 
      entry.test && entry.value && !isNaN(entry.value)
    );
    
    if (validEntries.length === 0) {
      alert('Please enter at least one valid test result.');
      return;
    }
    
    onSubmit(validEntries);
  };

  const hasValidEntries = entries.some(entry => 
    entry.test && entry.value && !isNaN(entry.value)
  );

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-radius-lg shadow-elevated w-full max-w-2xl max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-poppins font-bold text-foreground">
              Quick Add Results
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              If upload parsing fails, enter a few values. We'll do the rest.
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {entries.map((entry, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 border border-border rounded-radius">
                {/* Test Selection */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Test
                  </label>
                  <select
                    value={entry.test}
                    onChange={(e) => updateEntry(index, 'test', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-radius
                             focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                             bg-background text-foreground"
                  >
                    <option value="">Select a test...</option>
                    {commonTests.map((test) => (
                      <option key={test.name} value={test.name}>
                        {test.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Value Input */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Value
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={entry.value}
                    onChange={(e) => updateEntry(index, 'value', e.target.value)}
                    placeholder="0.0"
                    className="w-full px-3 py-2 border border-border rounded-radius
                             focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                             bg-background text-foreground"
                  />
                  {entry.value && isNaN(entry.value) && (
                    <p className="text-xs text-destructive mt-1">Please enter a number</p>
                  )}
                </div>

                {/* Unit Input */}
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Unit
                    </label>
                    <input
                      type="text"
                      value={entry.unit}
                      onChange={(e) => updateEntry(index, 'unit', e.target.value)}
                      placeholder="mg/dL"
                      className="w-full px-3 py-2 border border-border rounded-radius
                               focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                               bg-background text-foreground"
                    />
                  </div>
                  
                  {entries.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEntry(index)}
                      className="p-2 text-destructive hover:bg-destructive-light rounded-radius transition-colors duration-200"
                      title="Remove entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Another Button */}
          <button
            type="button"
            onClick={addEntry}
            className="mt-4 flex items-center gap-2 px-4 py-2 text-primary hover:text-primary-hover border border-dashed border-primary rounded-radius hover:bg-primary/5 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            Add Another Test
          </button>

          {/* Actions */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-border">
            <button
              type="submit"
              disabled={!hasValidEntries}
              className="btn-hero flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Preview Results
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary px-6"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManualEntryForm;