export interface ServiceCategory {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  services: {
    title: string;
    description: string;
    details: string[];
  }[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'skilled-nursing',
    title: 'Skilled Nursing',
    icon: '🏥',
    shortDescription: 'Professional nursing care and specialized medical services',
    fullDescription: 'Our skilled registered nurses provide comprehensive medical care including wound care, IV medication administration, disease management, and diabetic care in the comfort of your home.',
    services: [
      {
        title: 'Skilled Nursing',
        description: 'Professional nursing care by licensed registered nurses providing comprehensive health assessments, post-surgical care, and complex medical condition management.',
        details: [
          'Licensed registered nurses (RNs)',
          'Comprehensive health assessments',
          'Post-surgical care and monitoring',
          'Complex medical condition management',
          '24/7 on-call nursing support'
        ]
      },
      {
        title: 'Wound Care',
        description: 'Expert wound care management for acute and chronic wounds using advanced techniques to promote healing and prevent infection.',
        details: [
          'Surgical wound care',
          'Pressure ulcer treatment',
          'Diabetic wound management',
          'Dressing changes and wound monitoring',
          'Infection prevention'
        ]
      },
      {
        title: 'IV Medication Administration',
        description: 'Safe intravenous medication delivery at home with skilled nurses ensuring sterile administration.',
        details: [
          'IV medication administration',
          'Central line care',
          'PICC line management',
          'Infusion therapy',
          'Medication monitoring and adjustment'
        ]
      },
      {
        title: 'Diabetic Management',
        description: 'Comprehensive diabetes care including blood glucose monitoring, insulin management, and education.',
        details: [
          'Blood glucose monitoring',
          'Insulin administration and management',
          'Diabetic foot care',
          'Nutrition counseling',
          'Diabetes education and self-care training'
        ]
      },
      {
        title: 'Disease Management',
        description: 'Personalized programs to help manage chronic conditions effectively while maintaining quality of life.',
        details: [
          'Chronic disease monitoring',
          'Symptom management',
          'Health status tracking',
          'Medication coordination',
          'Lifestyle guidance and support'
        ]
      }
    ]
  },
  {
    id: 'therapy-services',
    title: 'Therapy Services',
    icon: '🏃',
    shortDescription: 'Physical, speech, occupational therapy and fall prevention',
    fullDescription: 'Licensed therapists provide personalized rehabilitation programs to help you regain strength, improve mobility, communication, and prevent falls in the comfort of your home.',
    services: [
      {
        title: 'Physical Therapy',
        description: 'Personalized rehabilitation programs to regain strength, improve mobility, and recover from injuries or surgeries.',
        details: [
          'Mobility and strength training',
          'Pain management',
          'Balance and coordination exercises',
          'Post-surgical rehabilitation',
          'Assistive device training'
        ]
      },
      {
        title: 'Speech Therapy',
        description: 'Restore communication skills, improve swallowing function, and enhance cognitive-linguistic abilities.',
        details: [
          'Speech and language therapy',
          'Swallowing therapy (dysphagia treatment)',
          'Cognitive-linguistic therapy',
          'Voice therapy',
          'Communication device training'
        ]
      },
      {
        title: 'Occupational Therapy',
        description: 'Regain independence in daily living activities from dressing to cooking.',
        details: [
          'Activities of daily living (ADL) training',
          'Fine motor skills development',
          'Adaptive equipment training',
          'Home modification recommendations',
          'Cognitive rehabilitation'
        ]
      },
      {
        title: 'Fall Prevention',
        description: 'Comprehensive fall prevention including home safety assessments, mobility assistance, and education.',
        details: [
          'Home safety assessments',
          'Mobility assistance',
          'Balance and strength exercises',
          'Safety equipment recommendations',
          'Fall risk education'
        ]
      }
    ]
  },
  {
    id: 'personal-care',
    title: 'Personal Care',
    icon: '🏠',
    shortDescription: 'Daily living assistance and personal care support',
    fullDescription: 'Compassionate personal care assistance to help you maintain independence and comfort at home.',
    services: [
      {
        title: 'Home Health Aid',
        description: 'Assistance with bathing, grooming, light housekeeping, and daily living activities.',
        details: [
          'Bathing and personal hygiene assistance',
          'Light housekeeping',
          'Meal preparation',
          'Laundry assistance',
          'Companionship and socialization'
        ]
      }
    ]
  },
  {
    id: 'clinical-lab',
    title: 'Clinical & Lab Services',
    icon: '🩸',
    shortDescription: 'Medication management and in-home lab services',
    fullDescription: 'Comprehensive medication management and convenient lab services in the comfort of your home.',
    services: [
      {
        title: 'Medication Management & Education',
        description: 'Safe medication administration, monitoring, and education to ensure you understand and safely take your medications.',
        details: [
          'Medication administration',
          'Medication reconciliation',
          'Drug interaction monitoring',
          'Medication education and counseling',
          'Compliance support'
        ]
      },
      {
        title: 'In-Home Blood Draws & Lab Services',
        description: 'Professional phlebotomy services at home for all your lab needs. No need to travel - we come to you.',
        details: [
          'Blood draws for all lab tests',
          'Specimen collection',
          'Lab result coordination',
          'Fasting blood work',
          'Multiple lab panel testing'
        ]
      }
    ]
  },
  {
    id: 'care-coordination',
    title: 'Care Coordination',
    icon: '📋',
    shortDescription: 'Healthcare coordination and social services support',
    fullDescription: 'We serve as a vital link between you, your doctors, and community resources to ensure coordinated, comprehensive care.',
    services: [
      {
        title: 'Social Services',
        description: 'Emotional support, resource connections, and assistance navigating healthcare systems and community resources.',
        details: [
          'Emotional and psychological support',
          'Resource and benefit coordination',
          'Family counseling and support',
          'Advance directive assistance',
          'Community resource referrals'
        ]
      },
      {
        title: 'Doctor Communication & Coordination',
        description: 'Clear communication between you and your doctors, ensuring coordinated care and timely updates.',
        details: [
          'Regular updates to your physicians',
          'Care plan coordination',
          'Test result communication',
          'Medication change notifications',
          'Symptom and status reporting'
        ]
      }
    ]
  },
  {
    id: 'other-services',
    title: 'Other Services',
    icon: '➕',
    shortDescription: 'Additional specialized services as needed',
    fullDescription: 'We provide additional specialized services tailored to your unique healthcare needs.',
    services: []
  }
]

