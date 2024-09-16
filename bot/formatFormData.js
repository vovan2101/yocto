// Функция для форматирования данных формы
function formatFormData(formData) {
    let formattedData = '';
  
    if (formData.first_name || formData.last_name) {
      formattedData += `What's your first and last name?: ${formData.first_name || ''} ${formData.last_name || ''}\n`;
    }
  
    if (formData.email) {
      formattedData += `What is your e-mail address?: ${formData.email}\n`;
    }
  
    if (formData.phone_number) {
      formattedData += `What is your phone number?: ${formData.phone_number}\n`;
    }
  
    if (formData.relationship) {
      formattedData += `What is your relationship to the company?: ${formData.relationship}\n`;
    }
  
    if (formData.working_full_time) {
      formattedData += `Are you working on this full time (40+ hours/week)?: ${formData.working_full_time}\n`;
    }
  
    if (formData.full_time_duration) {
      formattedData += `How long have you been working on this full-time?: ${formData.full_time_duration}\n`;
    }
  
    if (formData.company_name) {
      formattedData += `What's the name of your company?: ${formData.company_name}\n`;
    }
  
    if (formData.one_line_description) {
      formattedData += `What's the one-liner description of your company?: ${formData.one_line_description}\n`;
    }
  
    if (formData.company_description) {
      formattedData += `In one to two sentences, what is the problem you are trying to solve?: ${formData.company_description}\n`;
    }
  
    if (formData.company_solution) {
      formattedData += `In one to two sentences, what is your solution?: ${formData.company_solution}\n`;
    }
  
    if (formData.pitch_description) {
      formattedData += `In 2-3 sentences, what is the elevator pitch of your company?: ${formData.pitch_description}\n`;
    }
  
    if (formData.target_customer) {
      formattedData += `Who is your target customer?: ${formData.target_customer}\n`;
    }
  
    if (formData.customer_acquisition.length) {
      formattedData += `How do you plan on acquiring your customers?: ${formData.customer_acquisition.join(', ')}\n`;
    }
  
    if (formData.date_founded) {
      formattedData += `Date Founded: ${formData.date_founded}\n`;
    }
  
    if (formData.product_status) {
      formattedData += `What is the status of your product?: ${formData.product_status}\n`;
    }
  
    if (formData.active_customers) {
      formattedData += `Does your product have active users or customers?: ${formData.active_customers}\n`;
    }
  
    if (formData.how_many_users) {
      formattedData += `How many users do you have?: ${formData.how_many_users}\n`;
    }
  
    if (formData.industry.length) {
      formattedData += `What industry are you in?: ${formData.industry.join(', ')}\n`;
    }
  
    if (formData.liberty_ventures_industry) {
      formattedData += `What industry are you in (Liberty Ventures)?: ${formData.liberty_ventures_industry}\n`;
    }
  
    if (formData.product.length) {
      formattedData += `What is the primary product your company is providing?: ${formData.product.join(', ')}\n`;
    }
  
    if (formData.business_model.length) {
      formattedData += `What is your Business Model?: ${formData.business_model.join(', ')}\n`;
    }
  
    if (formData.company_website) {
      formattedData += `What is your company website?: ${formData.company_website}\n`;
    }
  
    if (formData.pitch_deck) {
      formattedData += `If you have a pitch deck to share, provide the link here: ${formData.pitch_deck}\n`;
    }
    
    if (formData.headquartered) {
      formattedData += `Where is your business incorporated?: ${formData.headquartered}\n`;
    }
  
    if (formData.is_delaware_corp) {
      formattedData += `Are you a Delaware C Corp?: ${formData.is_delaware_corp}\n`;
    }
  
    if (formData.customers_based) {
      formattedData += `Where are your main customers based?: ${formData.customers_based}\n`;
    }
  
    if (formData.specific_location) {
      formattedData += `Where are you located?: ${formData.specific_location}\n`;
    }
  
    if (formData.legal_structure) {
      formattedData += `What is the current or intended legal structure of the company?: ${formData.legal_structure}\n`;
    }
  
    if (formData.raising_round) {
      formattedData += `What round are you raising?: ${formData.raising_round}\n`;
    }
  
    if (formData.raising_amount) {
      formattedData += `How much are you raising (in USD)?: ${formData.raising_amount}\n`;
    }
  
    if (formData.earning_revenue) {
      formattedData += `Is your startup earning revenue?: ${formData.earning_revenue}\n`;
    }
  
    if (formData.earning_amount) {
      formattedData += `How much revenue are you earning per month (USD)?: ${formData.earning_amount}\n`;
    }
  
    if (formData.source_of_revenue) {
      formattedData += `What do you expect your main source of revenue to be?: ${formData.source_of_revenue}\n`;
    }
  
    if (formData.pre_money_valuation) {
      formattedData += `What is your pre-money valuation (USD)?: ${formData.pre_money_valuation}\n`;
    }
  
    if (formData.post_money_valuation) {
      formattedData += `What is your post-money valuation (USD)?: ${formData.post_money_valuation}\n`;
    }
  
    if (formData.capital_to_raise) {
      formattedData += `What is the amount you are raising in your current round (USD)?: ${formData.capital_to_raise}\n`;
    }
  
    if (formData.team_description) {
      formattedData += `Tell us about you and your team: ${formData.team_description}\n`;
    }
  
    if (formData.prev_experience) {
      formattedData += `What is your previous entrepreneurial experience?: ${formData.prev_experience}\n`;
    }
  
    if (formData.value_of_team) {
      formattedData += `Why are you/your team awesome?: ${formData.value_of_team}\n`;
    }
  
    if (formData.company_linkedin) {
      formattedData += `What's your company's LinkedIn?: ${formData.company_linkedin}\n`;
    }
  
    if (formData.ceo_linkedin) {
      formattedData += `Founder LinkedIn: ${formData.ceo_linkedin}\n`;
    }
  
    if (formData.founder2_linkedin) {
      formattedData += `Founder LinkedIn 2: ${formData.founder2_linkedin}\n`;
    }
  
    if (formData.founder3_linkedin) {
      formattedData += `Founder LinkedIn 3: ${formData.founder3_linkedin}\n`;
    }
  
    if (formData.cto_linkedin) {
      formattedData += `CTO Linkedin: ${formData.cto_linkedin}\n`;
    }
  
    if (formData.linkedin_profiles) {
      formattedData += `Your team's LinkedIn profiles: ${formData.linkedin_profiles}\n`;
    }
  
    if (formData.founder_video_url) {
      formattedData += `Founder video URL: ${formData.founder_video_url}\n`;
    }
  
    if (formData.vision) {
      formattedData += `What is your vision?: ${formData.vision}\n`;
    }
  
    if (formData.pitching_live) {
      formattedData += `Are you interested in pitching live in front of a virtual audience?: ${formData.pitching_live}\n`;
    }
  
    if (formData.share_submission) {
      formattedData += `Would you like us to share your submission with other companies?: ${formData.share_submission}\n`;
    }
  
    if (formData.investors_participating) {
      formattedData += `Investors participating in the current round (if any): ${formData.investors_participating}\n`;
    }
  
    if (formData.want_us_to_know) {
      formattedData += `Anything else you'd like investors to know?: ${formData.want_us_to_know}\n`;
    }
  
    if (formData.liberty_ventures_alignment) {
      formattedData += `How do the values of your team align with Liberty Ventures?: ${formData.liberty_ventures_alignment}\n`;
    }
  
    return formattedData;
  }
  
  // Экспортируем функцию для использования в других модулях
  module.exports = formatFormData;