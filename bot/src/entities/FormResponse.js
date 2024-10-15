const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'FormResponse',
  tableName: 'form_responses',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    device_id: {
      type: 'text',
      nullable: false,
      unique: true,
    },
    selected_investors: {
      type: 'simple-array',
      nullable: true,
    },
    first_name: {
      type: 'text',
      nullable: true,
    },
    last_name: {
      type: 'text',
      nullable: true,
    },
    email: {
      type: 'text',
      nullable: true,
    },
    phone_number: {
      type: 'text',
      nullable: true,
    },
    specific_location: {
      type: 'text',
      nullable: true,
    },
    other_specific_location: {
      type: 'text',
      nullable: true,
    },
    company_name: {
      type: 'text',
      nullable: true,
    },
    date_founded: {
      type: 'date',
      nullable: true,
    },
    relationship: {
      type: 'text',
      nullable: true,
    },
    other_relationship: {
      type: 'text',
      nullable: true,
    },
    working_full_time: {
      type: 'text',
      nullable: true,
    },
    full_time_duration: {
      type: 'text',
      nullable: true,
    },
    one_line_description: {
      type: 'text',
      nullable: true,
    },
    company_description: {
      type: 'text',
      nullable: true,
    },
    company_solution: {
      type: 'text',
      nullable: true,
    },
    pitch_description: {
      type: 'text',
      nullable: true,
    },
    target_customer: {
      type: 'text',
      nullable: true,
    },
    customer_acquisition: {
      type: 'simple-array',
      nullable: true,
    },
    other_customer_acquisition: {
      type: 'text',
      nullable: true,
    },
    product: {
      type: 'simple-array',
      nullable: true,
    },
    other_product: {
      type: 'text',
      nullable: true,
    },
    product_status: {
      type: 'text',
      nullable: true,
    },
    active_customers: {
      type: 'text',
      nullable: true,
    },
    how_many_users: {
      type: 'text',
      nullable: true,
    },
    business_model: {
      type: 'simple-array',
      nullable: true,
    },
    other_business_model: {
      type: 'text',
      nullable: true,
    },
    customers_based: {
      type: 'text',
      nullable: true,
    },
    other_customers_based: {
      type: 'text',
      nullable: true,
    },
    vision: {
      type: 'text',
      nullable: true,
    },
    company_website: {
      type: 'text',
      nullable: true,
    },
    industry: {
      type: 'simple-array',
      nullable: true,
    },
    other_industry: {
      type: 'text',
      nullable: true,
    },
    liberty_ventures_industry: {
      type: 'text',
      nullable: true,
    },
    headquartered: {
      type: 'text',
      nullable: true,
    },
    is_delaware_corp: {
      type: 'text',
      nullable: true,
    },
    legal_structure: {
      type: 'text',
      nullable: true,
    },
    other_legal_structure: {
      type: 'text',
      nullable: true,
    },
    pitch_deck: {
      type: 'text',
      nullable: true,
    },
    pitch_deck_file: {
      type: 'text',
      nullable: true,
    },
    raising_round: {
      type: 'text',
      nullable: true,
    },
    beyond_series_a_round: {
      type: 'text',
      nullable: true,
    },
    raising_amount: {
      type: 'text',
      nullable: true,
    },
    capital_to_raise: {
      type: 'text',
      nullable: true,
    },
    earning_revenue: {
      type: 'text',
      nullable: true,
    },
    earning_amount: {
      type: 'text',
      nullable: true,
    },
    source_of_revenue: {
      type: 'text',
      nullable: true,
    },
    other_source_of_revenue: {
      type: 'text',
      nullable: true,
    },
    pre_money_valuation: {
      type: 'text',
      nullable: true,
    },
    post_money_valuation: {
      type: 'text',
      nullable: true,
    },
    prev_experience: {
      type: 'text',
      nullable: true,
    },
    team_description: {
      type: 'text',
      nullable: true,
    },
    company_linkedin: {
      type: 'text',
      nullable: true,
    },
    ceo_linkedin: {
      type: 'text',
      nullable: true,
    },
    founder2_linkedin: {
      type: 'text',
      nullable: true,
    },
    founder3_linkedin: {
      type: 'text',
      nullable: true,
    },
    cto_linkedin: {
      type: 'text',
      nullable: true,
    },
    linkedin_profiles: {
      type: 'text',
      nullable: true,
    },
    founder_video_url: {
      type: 'text',
      nullable: true,
    },
    founder_video_file: {
      type: 'text',
      nullable: true,
    },
    pitching_live: {
      type: 'text',
      nullable: true,
    },
    share_submission: {
      type: 'text',
      nullable: true,
    },
    investors_participating: {
      type: 'text',
      nullable: true,
    },
    want_us_to_know: {
      type: 'text',
      nullable: true,
    },
    value_of_team: {
      type: 'text',
      nullable: true,
    },
  },
});
