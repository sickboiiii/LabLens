export const demoResults = [
  {
    testId: 'hba1c',
    name: 'HbA1c (Hemoglobin A1c)',
    value: 8.2,
    unit: '%',
    range: { min: 4.0, max: 5.6 },
    status: 'high',
    severity: 'soon',
    explanation: 'Your HbA1c is higher than the typical adult range, which suggests your average blood sugar has been elevated over the past 2-3 months. This indicates diabetes or prediabetes.',
    nextSteps: 'Discuss this with an endocrinologist and consider a recheck in 3 months. Focus on dietary changes and monitor blood glucose regularly.',
    specialty: 'Endocrinology'
  },
  {
    testId: 'ldl',
    name: 'LDL Cholesterol',
    value: 165,
    unit: 'mg/dL',
    range: { min: 0, max: 100 },
    status: 'high',
    severity: 'soon',
    explanation: 'Your LDL ("bad") cholesterol is elevated, which increases your risk of heart disease and stroke. This level is considered high and needs attention.',
    nextSteps: 'Consider seeing a cardiologist. Dietary changes, exercise, and possibly medication may be recommended to lower your cholesterol.',
    specialty: 'Cardiology'
  },
  {
    testId: 'hdl',
    name: 'HDL Cholesterol',
    value: 38,
    unit: 'mg/dL',
    range: { min: 40, max: 100 },
    status: 'low',
    severity: 'monitor',
    explanation: 'Your HDL ("good") cholesterol is below the recommended level. HDL helps remove other forms of cholesterol from your bloodstream.',
    nextSteps: 'Increase physical activity, maintain a healthy weight, and consider foods rich in omega-3 fatty acids. Discuss with your primary care physician.',
    specialty: 'Internal Medicine'
  },
  {
    testId: 'tsh',
    name: 'TSH (Thyroid Stimulating Hormone)',
    value: 5.1,
    unit: 'mIU/L',
    range: { min: 0.4, max: 4.0 },
    status: 'high',
    severity: 'monitor',
    explanation: 'Your TSH level is slightly elevated, which may indicate an underactive thyroid (hypothyroidism). This can affect your metabolism and energy levels.',
    nextSteps: 'Follow up with your primary care doctor or an endocrinologist. Additional thyroid tests may be needed to confirm diagnosis.',
    specialty: 'Endocrinology'
  },
  {
    testId: 'hemoglobin',
    name: 'Hemoglobin',
    value: 13.8,
    unit: 'g/dL',
    range: { min: 12.0, max: 15.0 },
    status: 'normal',
    severity: 'monitor',
    explanation: 'Your hemoglobin level is within the normal range, indicating healthy red blood cell function and good oxygen-carrying capacity.',
    nextSteps: 'Continue maintaining a balanced diet rich in iron and vitamins. No immediate action needed.',
    specialty: null
  },
  {
    testId: 'triglycerides',
    name: 'Triglycerides',
    value: 180,
    unit: 'mg/dL',
    range: { min: 0, max: 150 },
    status: 'high',
    severity: 'monitor',
    explanation: 'Your triglyceride level is borderline high. Elevated triglycerides can increase your risk of heart disease, especially when combined with other risk factors.',
    nextSteps: 'Reduce refined carbohydrates and alcohol intake. Increase physical activity. Consider follow-up with a cardiologist if other heart disease risk factors are present.',
    specialty: 'Cardiology'
  }
];

export const getRecommendedSpecialties = (results) => {
  const specialties = new Set();
  
  results.forEach(result => {
    if (result.specialty && (result.status === 'high' || result.status === 'low')) {
      specialties.add(result.specialty);
    }
  });
  
  // Always include Internal Medicine as a safe option
  specialties.add('Internal Medicine');
  
  return Array.from(specialties);
};