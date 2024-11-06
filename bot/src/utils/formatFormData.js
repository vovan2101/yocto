function formatFormData(formData) {
  let formattedData = '';
  let questionNumber = 1;

  // Добавляем приветствие с именем
  if (formData.first_name != null && formData.first_name !== '') {
    formattedData += `Hi ${formData.first_name},\n\n`;
  } else {
    formattedData += `Hi,\n\n`;
  }

  if (Array.isArray(formData.selectedForms) && formData.selectedForms.length > 0) {
    formattedData += `Your form has been successfully submitted to the following investors: ${formData.selectedForms.join(',  ')}.\n\n`;
  } else if (formData.selectedForms != null && formData.selectedForms !== '') {
    formattedData += `Your form has been successfully submitted to the following investors: ${String(formData.selectedForms)}.\n\n`;
  }

  if ((formData.first_name != null && formData.first_name !== '') || 
      (formData.last_name != null && formData.last_name !== '')) {
    formattedData += `${questionNumber}. What's your first and last name?\n${formData.first_name || ''} ${formData.last_name || ''}\n\n`;
    questionNumber++;
  }

  if (formData.email != null && formData.email !== '') {
    formattedData += `${questionNumber}. What is your e-mail address?\n${formData.email}\n\n`;
    questionNumber++;
  }

  if (formData.phone_number != null && formData.phone_number !== '') {
    formattedData += `${questionNumber}. What is your phone number?\n${formData.phone_number}\n\n`;
    questionNumber++;
  }

  if (formData.specific_location != null && formData.specific_location !== '') {
    formattedData += `${questionNumber}. Where are you located?\n${formData.specific_location}\n\n`;
    questionNumber++;
  }

  if (formData.company_name != null && formData.company_name !== '') {
    formattedData += `${questionNumber}. What's the name of your company?\n${formData.company_name}\n\n`;
    questionNumber++;
  }

  if (formData.date_founded != null && formData.date_founded !== '' && formData.date_founded !== 'null') {
    formattedData += `${questionNumber}. Date Founded?\n${formData.date_founded}\n\n`;
    questionNumber++;
  }

  if (formData.relationship != null && formData.relationship !== '') {
    formattedData += `${questionNumber}. What is your relationship to the company?\n${formData.relationship}\n\n`;
    questionNumber++;
  }

  if (formData.working_full_time != null && formData.working_full_time !== '') {
    formattedData += `${questionNumber}. Are you working on this full time (40+ hours/week)?\n${formData.working_full_time}\n\n`;
    questionNumber++;
  }

  if (formData.one_line_description != null && formData.one_line_description !== '') {
    formattedData += `${questionNumber}. What's the one-liner description of your company?\n${formData.one_line_description}\n\n`;
    questionNumber++;
  }

  if (formData.company_description != null && formData.company_description !== '') {
    formattedData += `${questionNumber}. In one to two sentences, what is the problem you are trying to solve?\n${formData.company_description}\n\n`;
    questionNumber++;
  }

  if (formData.company_solution != null && formData.company_solution !== '') {
    formattedData += `${questionNumber}. In one to two sentences, what is your solution?\n${formData.company_solution}\n\n`;
    questionNumber++;
  }

  if (formData.pitch_description != null && formData.pitch_description !== '') {
    formattedData += `${questionNumber}. In no more than 4 sentences, what is the elevator pitch of your company?\n${formData.pitch_description}\n\n`;
    questionNumber++;
  }

  if (formData.target_customer != null && formData.target_customer !== '') {
    formattedData += `${questionNumber}. Who is your target customer & how are you going to acquire them?\n${formData.target_customer}\n\n`;
    questionNumber++;
  }

  if ((Array.isArray(formData.customer_acquisition) && formData.customer_acquisition.length > 0) ||
  (typeof formData.customer_acquisition === 'string' && formData.customer_acquisition.trim() !== '')) {
formattedData += `${questionNumber}. How do you plan on acquiring your customers?\n${Array.isArray(formData.customer_acquisition) ? formData.customer_acquisition.join(', ') : formData.customer_acquisition}\n\n`;
questionNumber++;
}

if ((Array.isArray(formData.industry) && formData.industry.length > 0) ||
(typeof formData.industry=== 'string' && formData.industry.trim() !== '')) {
formattedData += `${questionNumber}. What industry are you in?\n${Array.isArray(formData.industry) ? formData.industry.join(', ') : formData.industry}\n\n`;
questionNumber++;
}

if ((Array.isArray(formData.product) && formData.product.length > 0) ||
    (typeof formData.product === 'string' && formData.product.trim() !== '')) {
  formattedData += `${questionNumber}. What is the primary product your company is providing?\n${Array.isArray(formData.product) ? formData.product.join(', ') : formData.product}\n\n`;
  questionNumber++;
}

if ((Array.isArray(formData.business_model) && formData.business_model.length > 0) ||
    (typeof formData.business_model === 'string' && formData.business_model.trim() !== '')) {
  formattedData += `${questionNumber}. What is your Business Model?\n${Array.isArray(formData.business_model) ? formData.business_model.join(', ') : formData.business_model}\n\n`;
  questionNumber++;
}


  if (formData.product_status != null && formData.product_status !== '') {
    formattedData += `${questionNumber}. What is the status of your product?\n${formData.product_status}\n\n`;
    questionNumber++;
  }

  if (formData.active_customers != null && formData.active_customers !== '') {
    formattedData += `${questionNumber}. Does your product have active users or customers?\n${formData.active_customers}\n\n`;
    questionNumber++;
  }

  if (formData.how_many_users != null && formData.how_many_users !== '') {
    formattedData += `${questionNumber}. How many users do you have?\n${formData.how_many_users}\n\n`;
    questionNumber++;
  }

  if (formData.customers_based != null && formData.customers_based !== '') {
    formattedData += `${questionNumber}. Where are your main customers based?\n${formData.customers_based}\n\n`;
    questionNumber++;
  }

  if (formData.vision != null && formData.vision !== '') {
    formattedData += `${questionNumber}. What is your big vision for the company?\n${formData.vision}\n\n`;
    questionNumber++;
  }

  if (formData.company_website != null && formData.company_website !== '') {
    formattedData += `${questionNumber}. What is your company website?\n${formData.company_website}\n\n`;
    questionNumber++;
  }

  if (formData.liberty_ventures_industry != null && formData.liberty_ventures_industry !== '') {
    formattedData += `${questionNumber}. What industry are you in (Liberty Ventures)?\n${formData.liberty_ventures_industry}\n\n`;
    questionNumber++;
  }

  if (formData.headquartered != null && formData.headquartered !== '') {
    formattedData += `${questionNumber}. Where is your business incorporated?\n${formData.headquartered}\n\n`;
    questionNumber++;
  }

  if (formData.headquartered_precursor != null && formData.headquartered_precursor !== '') {
    formattedData += `${questionNumber}. Where is your business headquartered?\n${formData.headquartered_precursor}\n\n`;
    questionNumber++;
  }

  if (formData.legal_structure != null && formData.legal_structure !== '') {
    formattedData += `${questionNumber}. What is the current or intended legal structure of the company?\n${formData.legal_structure}\n\n`;
    questionNumber++;
  }

  if (formData.pitch_deck != null && formData.pitch_deck !== '') {
    formattedData += `${questionNumber}. If you have a pitch deck that you would like to share as a link, please share it here!\n${formData.pitch_deck}\n\n`;
    questionNumber++;
  }

  if (formData.pitch_deck_file_name != null && formData.pitch_deck_file_name !== '') {
    formattedData += `${questionNumber}. If you have a pitch deck that you would like to share as an attachment, it is attached as:\n${formData.pitch_deck_file_name}\n\n`;
    questionNumber++;
  }

  if (formData.raising_round != null && formData.raising_round !== '') {
    formattedData += `${questionNumber}. What round are you raising?\n${formData.raising_round}\n\n`;
    questionNumber++;
  }

  if (formData.raising_amount != null && formData.raising_amount !== '') {
    formattedData += `${questionNumber}. How much capital have you raised in prior rounds? (in USD)\n${formData.raising_amount}\n\n`;
    questionNumber++;
  }

  if (formData.capital_to_raise != null && formData.capital_to_raise !== '') {
    formattedData += `${questionNumber}. What is the amount you are raising in your current round? (USD)\n${formData.capital_to_raise}\n\n`;
    questionNumber++;
  }

  if (formData.earning_revenue != null && formData.earning_revenue !== '') {
    formattedData += `${questionNumber}. Is your startup earning revenue?\n${formData.earning_revenue}\n\n`;
    questionNumber++;
  }

  if (formData.earning_amount != null && formData.earning_amount !== '') {
    formattedData += `${questionNumber}. Approximately how much revenue are you earning per month? (in USD)\n${formData.earning_amount}\n\n`;
    questionNumber++;
  }

  if (formData.source_of_revenue != null && formData.source_of_revenue !== '') {
    formattedData += `${questionNumber}. What do you expect your main source of revenue to be?\n${formData.source_of_revenue}\n\n`;
    questionNumber++;
  }

  if (formData.pre_money_valuation != null && formData.pre_money_valuation !== '') {
    formattedData += `${questionNumber}. What is your pre-money valuation (USD)?\n${formData.pre_money_valuation}\n\n`;
    questionNumber++;
  }

  if (formData.post_money_valuation != null && formData.post_money_valuation !== '') {
    formattedData += `${questionNumber}. What is the post-money valuation you are looking for in your current round? (USD)\n${formData.post_money_valuation}\n\n`;
    questionNumber++;
  }

  if (formData.prev_experience != null && formData.prev_experience !== '') {
    formattedData += `${questionNumber}. What is your previous entrepreneurial experience?\n${formData.prev_experience}\n\n`;
    questionNumber++;
  }

  if (formData.team_description != null && formData.team_description !== '') {
    formattedData += `${questionNumber}. In 2-3 sentences, why you / your team are awesome?\n${formData.team_description}\n\n`;
    questionNumber++;
  }

  if (formData.company_linkedin != null && formData.company_linkedin !== '') {
    formattedData += `${questionNumber}. What's your company's LinkedIn?\n${formData.company_linkedin}\n\n`;
    questionNumber++;
  }

  if (formData.ceo_linkedin != null && formData.ceo_linkedin !== '') {
    formattedData += `${questionNumber}. Founder LinkedIn\n${formData.ceo_linkedin}\n\n`;
    questionNumber++;
  }

  if (formData.founder2_linkedin != null && formData.founder2_linkedin !== '') {
    formattedData += `${questionNumber}. Founder 2 LinkedIn\n${formData.founder2_linkedin}\n\n`;
    questionNumber++;
  }

  if (formData.founder3_linkedin != null && formData.founder3_linkedin !== '') {
    formattedData += `${questionNumber}. Founder 3 LinkedIn\n${formData.founder3_linkedin}\n\n`;
    questionNumber++;
  }

  if (formData.cto_linkedin != null && formData.cto_linkedin !== '') {
    formattedData += `${questionNumber}. CTO LinkedIn\n${formData.cto_linkedin}\n\n`;
    questionNumber++;
  }

  if (formData.founder_video_url != null && formData.founder_video_url !== '') {
    formattedData += `${questionNumber}. Founder video URL\n${formData.founder_video_url}\n\n`;
    questionNumber++;
  }

  if (formData.pitching_live != null && formData.pitching_live !== '') {
    formattedData += `${questionNumber}. Would you be interested in pitching live in front of a virtual audience?\n${formData.pitching_live}\n\n`;
    questionNumber++;
  }

  if (formData.share_submission != null && formData.share_submission !== '') {
    formattedData += `${questionNumber}. Would you like us to share your submission with other companies?\n${formData.share_submission}\n\n`;
    questionNumber++;
  }

  if (formData.investors_participating != null && formData.investors_participating !== '') {
    formattedData += `${questionNumber}. Investors participating in the current round (if any)\n${formData.investors_participating}\n\n`;
    questionNumber++;
  }

  if (formData.want_us_to_know != null && formData.want_us_to_know !== '') {
    formattedData += `${questionNumber}. Anything else you'd like investors to know?\n${formData.want_us_to_know}\n\n`;
    questionNumber++;
  }

  if (formData.value_of_team != null && formData.value_of_team !== '') {
    formattedData += `${questionNumber}. How do the values of your team align with those of Liberty Ventures?\n${formData.value_of_team}\n\n`;
    questionNumber++;
  }

  return formattedData;
}

module.exports = formatFormData;
