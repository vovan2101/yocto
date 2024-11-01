function formatFormData(formData) {
  let formattedData = '';

  if (Array.isArray(formData.selectedForms)) {
    formattedData += `Your form has been successfully submitted to the following investors: ${formData.selectedForms.join(', ')}.\n\n`;
  } else {
    formattedData += `Your form has been successfully submitted to the following investors: ${String(formData.selectedForms)}.\n\n`;
  }  

  if (formData.first_name || formData.last_name) {
    formattedData += `1. What's your first and last name?\n${formData.first_name || ''} ${formData.last_name || ''}\n\n`;
  }

  if (formData.email) {
    formattedData += `2. What is your e-mail address?\n${formData.email}\n\n`;
  }

  if (formData.phone_number) {
    formattedData += `3. What is your phone number?\n${formData.phone_number}\n\n`;
  }

  if (formData.specific_location) {
    formattedData += `4. Where are you located?\n${formData.specific_location}\n\n`;
  }

  if (formData.company_name) {
    formattedData += `5. What's the name of your company?\n${formData.company_name}\n\n`;
  }

  if (formData.date_founded) {
    formattedData += `6. Date Founded?\n${formData.date_founded}\n\n`;
  }

  if (formData.relationship) {
    formattedData += `7. What is your relationship to the company?\n${formData.relationship}\n\n`;
  }

  if (formData.working_full_time) {
    formattedData += `8. Are you working on this full time (40+ hours/week)?\n${formData.working_full_time}\n\n`;
  }

  if (formData.one_line_description) {
    formattedData += `9. What's the one-liner description of your company?\n${formData.one_line_description}\n\n`;
  }

  if (formData.company_description) {
    formattedData += `10. In one to two sentences, what is the problem you are trying to solve?\n${formData.company_description}\n\n`;
  }

  if (formData.company_solution) {
    formattedData += `11. In one to two sentences, what is your solution?\n${formData.company_solution}\n\n`;
  }

  if (formData.pitch_description) {
    formattedData += `12. In no more than 4 sentences, what is the elevator pitch of your company?\n${formData.pitch_description}\n\n`;
  }

  if (formData.target_customer) {
    formattedData += `13. Who is your target customer & how are you going to acquire them?\n${formData.target_customer}\n\n`;
  }

  if (formData.customer_acquisition) {
    formattedData += `14. How do you plan on acquiring your customers?\n${formData.customer_acquisition}\n\n`;
  }

  if (formData.product_selection) {
    formattedData += `15. What is the primary product your company is providing?\n${formData.product_selection}\n\n`;
  }

  if (formData.product_status) {
    formattedData += `16. What is the status of your product?\n${formData.product_status}\n\n`;
  }

  if (formData.active_customers) {
    formattedData += `17. Does your product have active users or customers?\n${formData.active_customers}\n\n`;
  }

  if (formData.how_many_users) {
    formattedData += `18. How many users do you have?\n${formData.how_many_users}\n\n`;
  }

  if (formData.business_model) {
    formattedData += `19. What is your Business Model?\n${formData.business_model}\n\n`;
  }

  if (formData.customers_based) {
    formattedData += `20. Where are your main customers based?\n${formData.customers_based}\n\n`;
  }

  if (formData.vision) {
    formattedData += `21. What is your big vision for the company?\n${formData.vision}\n\n`;
  }

  if (formData.company_website) {
    formattedData += `22. What is your company website?\n${formData.company_website}\n\n`;
  }

  if (formData.industry) {
    formattedData += `23. What industry are you in?\n${formData.industry}\n\n`;
  }

  if (formData.liberty_ventures_industry) {
    formattedData += `24. What industry are you in (Liberty Ventures)?\n${formData.liberty_ventures_industry}\n\n`;
  }

  if (formData.headquartered) {
    formattedData += `25. Where is your business incorporated?\n${formData.headquartered}\n\n`;
  }

  if (formData.legal_structure) {
    formattedData += `26. What is the current or intended legal structure of the company?\n${formData.legal_structure}\n\n`;
  }

  if (formData.pitch_deck) {
    formattedData += `27. If you have a pitch deck that you would like to share as a link, please share it here!\n${formData.pitch_deck}\n\n`;
  }

  if (formData.raising_round) {
    formattedData += `28. What round are you raising?\n${formData.raising_round}\n\n`;
  }

  if (formData.raising_amount) {
    formattedData += `29. How much capital have you raised all in prior rounds? (in USD)\n${formData.raising_amount}\n\n`;
  }

  if (formData.capital_to_raise) {
    formattedData += `30. What is the amount you are raising in your current round? (USD)\n${formData.capital_to_raise}\n\n`;
  }

  if (formData.earning_revenue) {
    formattedData += `31. Is your startup earning revenue?\n${formData.earning_revenue}\n\n`;
  }

  if (formData.earning_amount) {
    formattedData += `32. Approximately how much revenue are you earning per month? (in USD)\n${formData.earning_amount}\n\n`;
  }

  if (formData.source_of_revenue) {
    formattedData += `33. What do you expect your main source of revenue to be?\n${formData.source_of_revenue}\n\n`;
  }

  if (formData.pre_money_valuation) {
    formattedData += `34. What is your pre-money valuation (USD)?\n${formData.pre_money_valuation}\n\n`;
  }

  if (formData.post_money_valuation) {
    formattedData += `35. What is the post-money valuation you are looking for in your current round? (in USD)\n${formData.post_money_valuation}\n\n`;
  }

  if (formData.prev_experience) {
    formattedData += `36. What is your previous entrepreneurial experience?\n${formData.prev_experience}\n\n`;
  }

  if (formData.team_description) {
    formattedData += `37. In 2-3 sentences, why you / your team are awesome?\n${formData.team_description}\n\n`;
  }

  if (formData.company_linkedin) {
    formattedData += `38. What's your company's LinkedIn?\n${formData.company_linkedin}\n\n`;
  }

  if (formData.ceo_linkedin) {
    formattedData += `39. Founder LinkedIn\n${formData.ceo_linkedin}\n\n`;
  }

  if (formData.founder2_linkedin) {
    formattedData += `40. Founder 2 LinkedIn\n${formData.founder2_linkedin}\n\n`;
  }

  if (formData.founder3_linkedin) {
    formattedData += `41. Founder 3 LinkedIn\n${formData.founder3_linkedin}\n\n`;
  }

  if (formData.cto_linkedin) {
    formattedData += `42. CTO LinkedIn\n${formData.cto_linkedin}\n\n`;
  }

  if (formData.founder_video_url) {
    formattedData += `43. Founder video URL\n${formData.founder_video_url}\n\n`;
  }

  if (formData.pitching_live) {
    formattedData += `44. Would you be interested in pitching live in front of a virtual audience?\n${formData.pitching_live}\n\n`;
  }

  if (formData.share_submission) {
    formattedData += `45. Would you like us to share your submission with other companies?\n${formData.share_submission}\n\n`;
  }

  if (formData.investors_participating) {
    formattedData += `46. Investors participating in the current round (if any)\n${formData.investors_participating}\n\n`;
  }

  if (formData.want_us_to_know) {
    formattedData += `47. Anything else you'd like investors to know?\n${formData.want_us_to_know}\n\n`;
  }

  if (formData.value_of_team) {
    formattedData += `48. How do the values of your team align with those of Liberty Ventures?\n${formData.value_of_team}\n\n`;
  }

  return formattedData;
}

module.exports = formatFormData;
