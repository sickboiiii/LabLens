import { Upload, Search, Calendar } from 'lucide-react';

const StepIndicator = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, title: 'Upload', icon: Upload },
    { id: 2, title: 'Review Results', icon: Search },
    { id: 3, title: 'Book Specialist', icon: Calendar },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center space-x-4 md:space-x-8">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const Icon = step.icon;
          
          return (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <div className="flex items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    transition-all duration-200 border-2
                    ${isActive 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : isCompleted
                      ? 'bg-success border-success text-success-foreground'
                      : 'bg-muted border-border text-muted-foreground'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                </div>
                
                {/* Step Label */}
                <div className="ml-3 hidden sm:block">
                  <p className={`
                    text-sm font-medium
                    ${isActive 
                      ? 'text-primary' 
                      : isCompleted
                      ? 'text-success'
                      : 'text-muted-foreground'
                    }
                  `}>
                    {step.title}
                  </p>
                </div>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className={`
                  w-12 md:w-20 h-0.5 mx-4
                  ${isCompleted || (isActive && index === 0)
                    ? 'bg-success' 
                    : 'bg-border'
                  }
                `} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;