const fillSpatialCapitalForm= require('./spatialCapitalForm');

const testFormData = {
   first_name: 'asdasd',
   last_name: 'asdasd',
   email: 'asdsads@gmail.com',
   phone_number: '+141574711231',
   relationship: 'Founder',
   other_relationship: 'null',
   working_full_time: 'Yes',
   full_time_duration: '24-36 Months',
   company_name: 'dasdad',
   one_line_description: 'hjhjhj',
   company_description: 'qweqwe',
   company_solution: 'qweqwe',
   pitch_description: 'qweqweqw',
   target_customer: 'qwewq',
   customer_acquisition: '["Direct Sales","Events","Partnerships"]',
   other_customer_acquisition: 'null',
   date_founded: '2024-11-04',
   product_status: 'MVP built, < 3 months in market',
   active_customers: 'Yes',
   how_many_users: '51-100',
   industry: '["AdTech","Agtech"]',
   liberty_ventures_industry: 'Animation',
   other_industry: 'null',
   product: '["Software - Infrastructure (API"," cloud"," etc.)","Software - Other"]',
   other_product: 'null',
   business_model: '["B2B2C","C2B"]',
   other_business_model: 'null',
   company_website: 'https://asdas.com',
   pitch_deck: 'https://asdasd.com',
   pitch_deck_file_name: 'archlinux-512.webp',
   headquartered: 'Asia - Southeast Asia',
   headquartered_precursor: 'Outside of North America',
   customers_based: 'Asia - India / Pakistan / Bangladesh',
   other_customers_based: 'null',
   specific_location: 'New York',
   other_specific_location: 'null',
   legal_structure: 'Non-profit',
   other_legal_structure: 'null',
   raising_round: 'Series A',
   beyond_series_a_round: 'null',
   earning_amount: '$1000-$4,999',
   raising_amount: '13121',
   earning_revenue: 'Yes',
   source_of_revenue: 'Subscription',
   other_source_of_revenue: 'null',
   pre_money_valuation: '12321',
   post_money_valuation: '232',
   capital_to_raise: '12312',
   prev_experience: 'Created more than 3 startups',
   team_description: 'sdadasdas',
   company_linkedin: 'https://asdasd.com',
   ceo_linkedin: 'https://asdas.com',
   founder2_linkedin: 'https://asdasd.com',
   founder3_linkedin: '',
   cto_linkedin: 'https://asdsa.com',
   founder_video_url: 'https://asdas.com',
   vision: 'sdasda',
   pitching_live: 'yes',
   share_submission: 'No',
   investors_participating: 'asdasdas',
   want_us_to_know: 'adadsa',
   value_of_team: 'asdsadsa',
   industryString: 'AdTech; Agtech',
   productString: 'Software - Infrastructure (API;  cloud;  etc.); Software - Other',
   customer_acquisitionString: 'Direct Sales; Events; Partnerships',
   selectedForms: [
     '2048 Ventures',
     'Boost Ventures',
     'Everywhere Ventures',
     'Hustle Fund',
     'Incisive Ventures',
     'Liberty Ventures',
     'Path Ventures',
     'Precursor Ventures',
     'Spatial Capital',
     'Wischoff Ventures'
   ]
};
  
  
        
    

fillSpatialCapitalForm(testFormData)
    .then(() => console.log('Test completed successfully'))
    .catch(error => console.error('Test encountered an error:', error));
