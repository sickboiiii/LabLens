import { useState } from 'react';
import { MapPin, ExternalLink, Stethoscope } from 'lucide-react';

const SpecialistSection = ({ recommendedSpecialties = [] }) => {
  const [city, setCity] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const allSpecialties = [
    'Endocrinology',
    'Cardiology', 
    'Internal Medicine',
    'Hepatology',
    'Hematology',
    'Nephrology'
  ];

  const specialties = recommendedSpecialties.length > 0 
    ? recommendedSpecialties 
    : ['Internal Medicine'];

  const handleFindSpecialist = () => {
    const specialty = selectedSpecialty || specialties[0];
    const location = city || 'near me';
    
    // Create search query for external booking sites
    const query = `${specialty} doctor ${location}`;
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    
    window.open(searchUrl, '_blank');
  };

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode this to get city name
          setCity('Current Location');
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  };

  return (
    <div className="bg-card border border-border rounded-radius-lg p-6 shadow-card">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Stethoscope className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-poppins font-bold text-foreground mb-2">
          Ready to talk to a clinician?
        </h3>
        <p className="text-muted-foreground">
          We'll help you find the right specialist in your area
        </p>
      </div>

      <div className="space-y-6">
        {/* Location Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Your location
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
                className="w-full pl-10 pr-4 py-3 border border-border rounded-radius
                         focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                         bg-background text-foreground"
              />
            </div>
            <button
              onClick={requestLocation}
              className="px-4 py-3 border border-border rounded-radius hover:bg-muted 
                       transition-colors duration-200 text-sm font-medium"
              title="Use current location"
            >
              <MapPin className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Specialty Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Recommended specialties based on your results
          </label>
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(
                  selectedSpecialty === specialty ? '' : specialty
                )}
                className={`
                  px-4 py-2 rounded-radius-pill text-sm font-medium border transition-all duration-200
                  ${selectedSpecialty === specialty || (!selectedSpecialty && specialty === specialties[0])
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-background text-foreground border-border hover:border-primary hover:text-primary'
                  }
                `}
              >
                {specialty}
              </button>
            ))}
          </div>
          
          {/* Show all specialties option */}
          <details className="mt-3">
            <summary className="text-sm text-primary cursor-pointer hover:text-primary-hover">
              See all specialties
            </summary>
            <div className="flex flex-wrap gap-2 mt-2">
              {allSpecialties.filter(s => !specialties.includes(s)).map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={`
                    px-3 py-1.5 rounded-radius text-xs font-medium border transition-all duration-200
                    ${selectedSpecialty === specialty
                      ? 'bg-secondary text-secondary-foreground border-secondary' 
                      : 'bg-background text-muted-foreground border-border hover:border-muted-foreground'
                    }
                  `}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </details>
        </div>

        {/* Find Button */}
        <button
          onClick={handleFindSpecialist}
          className="btn-hero w-full"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Find and Book Appointment
        </button>

        {/* Note */}
        <p className="text-xs text-muted-foreground text-center">
          We'll open a trusted search with your specialty and city prefilled. 
          You can then choose from available providers and booking options.
        </p>
      </div>
    </div>
  );
};

export default SpecialistSection;