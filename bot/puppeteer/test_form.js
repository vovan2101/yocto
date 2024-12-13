const fillIncisiveVenturesForm = require('./incisiveVenturesForm');
const fillLibertyVenturesForm = require('./libertyVenturesForm');
const fillSpatialCapitalForm= require('./spatialCapitalForm');
const fillForm = require('./precursorvcForm');
const fillhustleFundForm = require('./hustleFundForm');


const testFormData = {
first_name: 'asdad',
last_name: 'asdas',
email: 'vels21@gmail.com',
phone_number: '+14157471212',
relationship: 'Founder',
other_relationship: 'null',
working_full_time: 'Yes',
full_time_duration: '12-18 Months',
company_name: 'asdasasd',
one_line_description: 'asdasdasdadadasdadadas',
company_description: 'asdasdasdad',
company_solution: 'adsdasdasdasda',
pitch_description: 'asdas.,das./d,a,d.asl;dasldlas',
target_customer: 'asdsdasd',
customer_acquisition: '["Community Engagement & Referrals","Other","Paid Advertisement"]',
other_customer_acquisition: 'hello',
date_founded: '2024-12-09',
product_status: 'Idea/Prototype Stage',
active_customers: 'Yes',
how_many_users: '21-50',
industry: '["Health / Fitness / Wellness"]',
liberty_ventures_industry: 'Alternative Dispute Resolution',
other_industry: 'null',
product: '["Software - Marketplace / Network","Other"]',
other_product: 'hello',
business_model: '["C2C","B2C / D2C"]',
other_business_model: 'null',
company_website: 'https://asda.com',
pitch_deck: 'https://asdas.com',
pitch_deck_file_name: 'archlinux-512.webp',
headquartered: 'US',
headquartered_precursor: 'North America',
customers_based: 'US',
other_customers_based: 'null',
specific_location: 'Philadelphia',
other_specific_location: 'null',
legal_structure: 'Delaware C-Corp',
other_legal_structure: 'null',
raising_round: 'Angel',
beyond_series_a_round: 'null',
earning_amount: '$1000-$4,999',
raising_amount: '0',
earning_revenue: 'No',
source_of_revenue: 'Subscription',
other_source_of_revenue: 'null',
pre_money_valuation: '1.75M',
post_money_valuation: '2M',
capital_to_raise: '250k',
prev_experience: 'Created more than 3 startups',
team_description: 'asdadasdasas',
company_linkedin: 'https://asd.com',
ceo_linkedin: 'https://asd.com',
founder2_linkedin: 'null',
founder3_linkedin: 'null',
cto_linkedin: 'https://asda.com',
founder_video_url: 'https://asd.com',
vision: 'sdsfsdf',
pitching_live: 'yes',
share_submission: 'Yes',
investors_participating: 'asdsad',
want_us_to_know: 'asdasd',
value_of_team: 'asdas',
industryString: 'Health / Fitness / Wellness',
productString: 'Software - Marketplace / Network; Other',
customer_acquisitionString: 'Community Engagement & Referrals; Other; Paid Advertisement',
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
],
};

  
  
        
    

fillForm(testFormData)
    .then(() => console.log('Test completed successfully'))
    .catch(error => console.error('Test encountered an error:', error));
