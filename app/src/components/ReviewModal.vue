<template>
  <div v-if="isOpen" class="modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <span class="close" @click="closeModal">&times;</span>
      <h2 class="modal-header">Review My Answers</h2>
      <p class="info-text">
        You can click on a question to move directly to it and make changes.
      </p>
      <ul class="form-list">
        <!-- First and Last Name -->
        <li v-if="shouldDisplayQuestion(2, 'first_name') || shouldDisplayQuestion(2, 'last_name')">
          <strong><a @click="goToStep(2)">What's your first and last name?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': (!formData.first_name && isRequiredField('first_name')) || (!formData.last_name && isRequiredField('last_name')) }">
            {{ formData.first_name || (isRequiredField('first_name') ? 'This question is required' : 'Not answered') }} 
            {{ formData.last_name || (isRequiredField('last_name') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

        <!-- Email -->
        <li v-if="shouldDisplayQuestion(3, 'email')">
          <strong><a @click="goToStep(3)">What is your e-mail address?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.email && isRequiredField('email') }">
            {{ formData.email || (isRequiredField('email') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

        <!-- Phone Number -->
        <li v-if="shouldDisplayQuestion(4, 'phone_number')">
          <strong><a @click="goToStep(4)">What is your phone number?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.phone_number && isRequiredField('phone_number') }">
            {{ formData.phone_number || (isRequiredField('phone_number') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

        <!-- Specific Location -->
        <li v-if="shouldDisplayQuestion(5, 'specific_location')">
          <strong><a @click="goToStep(5)">Where are you located?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.specific_location && isRequiredField('specific_location') }">
            {{ formData.specific_location || (isRequiredField('specific_location') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

        <!-- Company Name -->
        <li v-if="shouldDisplayQuestion(6, 'company_name')">
          <strong><a @click="goToStep(6)">What's the name of your company?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.company_name && isRequiredField('company_name') }">
            {{ formData.company_name || (isRequiredField('company_name') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

        <!-- Date Founded -->
        <li v-if="shouldDisplayQuestion(7, 'date_founded')">
          <strong><a @click="goToStep(7)">Date Founded?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.date_founded && isRequiredField('date_founded') }">
            {{ formData.date_founded || (isRequiredField('date_founded') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

        <!-- Relationship -->
        <li v-if="shouldDisplayQuestion(8, 'relationship')">
          <strong><a @click="goToStep(8)">What is your relationship to the company?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.relationship && isRequiredField('relationship') }">
            {{ formData.relationship || (isRequiredField('relationship') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

        <!-- Working Full Time -->
        <li v-if="shouldDisplayQuestion(9, 'working_full_time')">
          <strong><a @click="goToStep(9)">Are you working on this full time (40+ hours/week)?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.working_full_time && isRequiredField('working_full_time') }">
            {{ formData.working_full_time || (isRequiredField('working_full_time') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

        <!-- One-Liner Description -->
        <li v-if="shouldDisplayQuestion(10, 'one_line_description')">
          <strong><a @click="goToStep(10)">What's the one-line description of your company?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.one_line_description && isRequiredField('one_line_description') }">
            {{ formData.one_line_description || (isRequiredField('one_line_description') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

        <!-- Problem Description -->
        <li v-if="shouldDisplayQuestion(11, 'company_description')">
          <strong><a @click="goToStep(11)">In one to two sentences, what is the problem you are trying to solve?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.company_description && isRequiredField('company_description') }">
            {{ formData.company_description || (isRequiredField('company_description') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

        <!-- Solution -->
        <li v-if="shouldDisplayQuestion(12, 'company_solution')">
          <strong><a @click="goToStep(12)">In one to two sentences, what is your solution?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.company_solution && isRequiredField('company_solution') }">
            {{ formData.company_solution || (isRequiredField('company_solution') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

        <!-- Elevator Pitch -->
        <li v-if="shouldDisplayQuestion(13, 'pitch_description')">
          <strong><a @click="goToStep(13)">In no more than 4 sentences, what is the elevator pitch of your company?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.pitch_description && isRequiredField('pitch_description') }">
            {{ formData.pitch_description || (isRequiredField('pitch_description') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

        <!-- Target Customer -->
        <li v-if="shouldDisplayQuestion(14, 'target_customer')">
          <strong><a @click="goToStep(14)">Who is your target customer & how are you going to acquire them?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.target_customer && isRequiredField('target_customer') }">
            {{ formData.target_customer || (isRequiredField('target_customer') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

<!-- Customer Acquisition -->
<li v-if="shouldDisplayQuestion(15, 'customer_acquisition')">
  <strong><a @click="goToStep(15)">How do you plan on acquiring your customers?</a></strong>
  <span 
    class="answer" 
    :class="{ 'required-text': (!formData.customer_acquisition || formData.customer_acquisition.length === 0) && isRequiredField('customer_acquisition') }">
    {{ 
      Array.isArray(formData.customer_acquisition) && formData.customer_acquisition.length > 0 
        ? formData.customer_acquisition.join(', ') 
        : (isRequiredField('customer_acquisition') ? 'This question is required' : 'Not answered') 
    }}
  </span>
</li>


      <!-- Product Selection -->
      <li v-if="shouldDisplayQuestion(16, 'product')">
        <strong><a @click="goToStep(16)">What is the primary product your company is providing?</a></strong>
        <span 
          class="answer" 
          :class="{ 'required-text': (!formData.product || formData.product.length === 0) && isRequiredField('product') }">
          {{ 
            Array.isArray(formData.product) && formData.product.length > 0 
              ? formData.product.join(', ') 
              : (isRequiredField('product') ? 'This question is required' : 'Not answered') 
          }}
        </span>
      </li>

        <!-- Product Status -->
        <li v-if="shouldDisplayQuestion(17, 'product_status')">
          <strong><a @click="goToStep(17)">What is the status of your product?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.product_status && isRequiredField('product_status') }">
            {{ formData.product_status || (isRequiredField('product_status') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

        <li v-if="shouldDisplayQuestion(18, 'active_customers')">
          <strong><a @click="goToStep(18)">Does your product have active users or customers?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.active_customers && isRequiredField('active_customers') }">
            {{ formData.active_customers || (isRequiredField('active_customers') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

        <!-- Number of Users -->
        <li v-if="shouldDisplayQuestion(19, 'how_many_users')">
          <strong><a @click="goToStep(19)">How many users do you have?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.how_many_users && isRequiredField('how_many_users') }">
            {{ formData.how_many_users || (isRequiredField('how_many_users') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

      <!-- Business Model -->
      <li v-if="shouldDisplayQuestion(20, 'business_model')">
        <strong><a @click="goToStep(20)">What is your Business Model?</a></strong>
        <span 
          class="answer" 
          :class="{ 'required-text': (!formData.business_model || formData.business_model.length === 0) && isRequiredField('business_model') }">
          {{ 
            Array.isArray(formData.business_model) && formData.business_model.length > 0 
              ? formData.business_model.join(', ') 
              : (isRequiredField('business_model') ? 'This question is required' : 'Not answered') 
          }}
        </span>
      </li>

        <!-- Customers Based -->
        <li v-if="shouldDisplayQuestion(21, 'customers_based')">
          <strong><a @click="goToStep(21)">Where are your main customers based?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.customers_based && isRequiredField('customers_based') }">
            {{ formData.customers_based || (isRequiredField('customers_based') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

        <!-- Vision -->
        <li v-if="shouldDisplayQuestion(22, 'vision')">
          <strong><a @click="goToStep(22)">What is your big vision for the company?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.vision && isRequiredField('vision') }">
            {{ formData.vision || (isRequiredField('vision') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

        <!-- Company Website -->
        <li v-if="shouldDisplayQuestion(23, 'company_website')">
          <strong><a @click="goToStep(23)">What is your company website?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.company_website && isRequiredField('company_website') }">
            {{ formData.company_website || (isRequiredField('company_website') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

      <!-- Industry Selection -->
      <li v-if="shouldDisplayQuestion(24, 'industry')">
        <strong><a @click="goToStep(24)">What industry are you in?</a></strong>
        <span 
          class="answer" 
          :class="{ 'required-text': (!formData.industry || formData.industry.length === 0) && isRequiredField('industry') }">
          {{ 
            Array.isArray(formData.industry) && formData.industry.length > 0 
              ? formData.industry.join(', ') 
              : (isRequiredField('industry') ? 'This question is required' : 'Not answered') 
          }}
        </span>
      </li>

        <!-- Liberty Ventures Industry -->
        <li v-if="shouldDisplayQuestion(25, 'liberty_ventures_industry')">
          <strong><a @click="goToStep(25)">What industry are you in (Liberty Ventures)?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.liberty_ventures_industry && isRequiredField('liberty_ventures_industry') }">
            {{ formData.liberty_ventures_industry || (isRequiredField('liberty_ventures_industry') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

        <!-- Headquartered -->
        <li v-if="shouldDisplayQuestion(26, 'headquartered')">
          <strong><a @click="goToStep(26)">Where is your business incorporated?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.headquartered && isRequiredField('headquartered') }">
            {{ formData.headquartered || (isRequiredField('headquartered') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

                <!-- Headquartered -->
          <li v-if="shouldDisplayQuestion(27, 'headquartered_precursor')">
          <strong><a @click="goToStep(27)">Where is your business headquartered?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.headquartered_precursor && isRequiredField('headquartered_precursor') }">
            {{ formData.headquartered_precursor || (isRequiredField('headquartered_precursor') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

        <!-- Legal Structure -->
        <li v-if="shouldDisplayQuestion(28, 'legal_structure')">
          <strong><a @click="goToStep(28)">What is the current or intended legal structure of the company?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.legal_structure && isRequiredField('legal_structure') }">
            {{ formData.legal_structure || (isRequiredField('legal_structure') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

        <!-- Pitch Deck URL -->
        <li v-if="shouldDisplayQuestion(29, 'pitch_deck')">
          <strong><a @click="goToStep(29)">If you have a pitch deck that you would like to share as a link, please share it here!</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.pitch_deck && isRequiredField('pitch_deck') }">
            {{ formData.pitch_deck || (isRequiredField('pitch_deck') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

<!-- Pitch Deck URL -->
<li v-if="shouldDisplayQuestion(29, 'pitch_deck')">
  <strong><a @click="goToStep(29)">If you have a pitch deck that you would like to share as a link, please share it here!</a></strong>
  <span 
    class="answer" 
    :class="{ 'required-text': !formData.pitch_deck && isRequiredField('pitch_deck') }">
    {{ formData.pitch_deck || (isRequiredField('pitch_deck') ? 'This question is required' : 'Not answered') }}
  </span>
</li>

<!-- Pitch Deck File -->
<li v-if="shouldDisplayQuestion(30, 'pitch_deck_file')">
  <strong><a @click="goToStep(30)">If you have a pitch deck that you would like to share as an attachment, please attach it here!</a></strong>
  <span 
    class="answer" 
    :class="{ 'required-text': !formData.pitch_deck_file && isRequiredField('pitch_deck_file') }">
    {{ formData.pitch_deck_file_name || (isRequiredField('pitch_deck_file') ? 'This question is required' : 'Not answered') }}
  </span>
</li>

        <!-- Raising Round -->
        <li v-if="shouldDisplayQuestion(31, 'raising_round')">
          <strong><a @click="goToStep(31)">What round are you raising?</a></strong>
          <span 
            class="answer" 
            :class="{ 'required-text': !formData.raising_round && isRequiredField('raising_round') }">
            {{ formData.raising_round || (isRequiredField('raising_round') ? 'This question is required' : 'Not answered') }}
          </span>
        </li>

 <!-- Raising Amount -->
<li v-if="shouldDisplayQuestion(32, 'raising_amount')">
  <strong><a @click="goToStep(32)">How much capital have you raised in all prior rounds? (in USD)</a></strong>
  <span 
    class="answer" 
    :class="{ 'required-text': !formData.raising_amount && isRequiredField('raising_amount') }">
    {{ formData.raising_amount || (isRequiredField('raising_amount') ? 'This question is required' : 'Not answered') }}
  </span>
</li>

<!-- Capital to Raise -->
<li v-if="shouldDisplayQuestion(33, 'capital_to_raise')">
  <strong><a @click="goToStep(33)">What is the amount of money you are looking to raise in your current round? (USD)</a></strong>
  <span 
    class="answer" 
    :class="{ 'required-text': !formData.capital_to_raise && isRequiredField('capital_to_raise') }">
    {{ formData.capital_to_raise || (isRequiredField('capital_to_raise') ? 'This question is required' : 'Not answered') }}
  </span>
</li>

<!-- Earning Revenue -->
<li v-if="shouldDisplayQuestion(34, 'earning_revenue')">
  <strong><a @click="goToStep(34)">Is your startup currently earning revenue?</a></strong>
  <span 
    class="answer" 
    :class="{ 'required-text': !formData.earning_revenue && isRequiredField('earning_revenue') }">
    {{ formData.earning_revenue || (isRequiredField('earning_revenue') ? 'This question is required' : 'Not answered') }}
  </span>
</li>

<!-- Earning Amount -->
<li v-if="shouldDisplayQuestion(35, 'earning_amount')">
  <strong><a @click="goToStep(35)">Approximately how much revenue are you earning per month? (in USD)</a></strong>
  <span 
    class="answer" 
    :class="{ 'required-text': !formData.earning_amount && isRequiredField('earning_amount') }">
    {{ formData.earning_amount || (isRequiredField('earning_amount') ? 'This question is required' : 'Not answered') }}
  </span>
</li>

<!-- Source of Revenue -->
<li v-if="shouldDisplayQuestion(36, 'source_of_revenue')">
  <strong><a @click="goToStep(36)">What do you expect your main source of revenue to be?</a></strong>
  <span 
    class="answer" 
    :class="{ 'required-text': !formData.source_of_revenue && isRequiredField('source_of_revenue') }">
    {{ formData.source_of_revenue || (isRequiredField('source_of_revenue') ? 'This question is required' : 'Not answered') }}
  </span>
</li>

<!-- Pre-money Valuation -->
<li v-if="shouldDisplayQuestion(37, 'pre_money_valuation')">
  <strong><a @click="goToStep(37)">What is your pre-money valuation? (in USD)</a></strong>
  <span 
    class="answer" 
    :class="{ 'required-text': !formData.pre_money_valuation && isRequiredField('pre_money_valuation') }">
    {{ formData.pre_money_valuation || (isRequiredField('pre_money_valuation') ? 'This question is required' : 'Not answered') }}
  </span>
</li>

<!-- Post-money Valuation -->
<li v-if="shouldDisplayQuestion(38, 'post_money_valuation')">
  <strong><a @click="goToStep(38)">What is the post-money valuation you are looking for in your current round? (in USD)</a></strong>
  <span 
    class="answer" 
    :class="{ 'required-text': !formData.post_money_valuation && isRequiredField('post_money_valuation') }">
    {{ formData.post_money_valuation || (isRequiredField('post_money_valuation') ? 'This question is required' : 'Not answered') }}
  </span>
</li>

<!-- Previous Experience -->
<li v-if="shouldDisplayQuestion(39, 'prev_experience')">
  <strong><a @click="goToStep(39)">What is your previous entrepreneurial experience?</a></strong>
  <span 
    class="answer" 
    :class="{ 'required-text': !formData.prev_experience && isRequiredField('prev_experience') }">
    {{ formData.prev_experience || (isRequiredField('prev_experience') ? 'This question is required' : 'Not answered') }}
  </span>
</li>

<!-- Team Description -->
<li v-if="shouldDisplayQuestion(40, 'team_description')">
  <strong><a @click="goToStep(40)">In 2-3 sentences, why you / your team are awesome?</a></strong>
  <span 
    class="answer" 
    :class="{ 'required-text': !formData.team_description && isRequiredField('team_description') }">
    {{ formData.team_description || (isRequiredField('team_description') ? 'This question is required' : 'Not answered') }}
  </span>
</li>

<!-- Company LinkedIn -->
<li v-if="shouldDisplayQuestion(41, 'company_linkedin')">
  <strong><a @click="goToStep(41)">What's your company's LinkedIn?</a></strong>
  <span 
    class="answer" 
    :class="{ 'required-text': !formData.company_linkedin && isRequiredField('company_linkedin') }">
    {{ formData.company_linkedin || (isRequiredField('company_linkedin') ? 'This question is required' : 'Not answered') }}
  </span>
</li>

<!-- CEO LinkedIn -->
<li v-if="shouldDisplayQuestion(42, 'ceo_linkedin')">
  <strong><a @click="goToStep(42)">Founder LinkedIn?</a></strong>
  <span 
    class="answer" 
    :class="{ 'required-text': !formData.ceo_linkedin && isRequiredField('ceo_linkedin') }">
    {{ formData.ceo_linkedin || (isRequiredField('ceo_linkedin') ? 'This question is required' : 'Not answered') }}
  </span>
</li>

<!-- CTO LinkedIn -->
<li v-if="shouldDisplayQuestion(43, 'cto_linkedin')">
  <strong><a @click="goToStep(43)">CTO LinkedIn? (Leave blank if not applicable)</a></strong>
  <span 
    class="answer" 
    :class="{ 'required-text': !formData.cto_linkedin && isRequiredField('cto_linkedin') }">
    {{ formData.cto_linkedin || (isRequiredField('cto_linkedin') ? 'This question is required' : 'Not answered') }}
  </span>
</li>

<!-- Founder Video URL -->
<li v-if="shouldDisplayQuestion(44, 'founder_video_url')">
  <strong><a @click="goToStep(44)">Founder video URL?</a></strong>
  <span 
    class="answer" 
    :class="{ 'required-text': !formData.founder_video_url && isRequiredField('founder_video_url') }">
    {{ formData.founder_video_url || (isRequiredField('founder_video_url') ? 'This question is required' : 'Not answered') }}
  </span>
</li>

<!-- Pitching Live -->
<li v-if="shouldDisplayQuestion(45, 'pitching_live')">
  <strong><a @click="goToStep(45)">Would you be interested in pitching live in front of a virtual audience?</a></strong>
  <span 
    class="answer" 
    :class="{ 'required-text': !formData.pitching_live && isRequiredField('pitching_live') }">
    {{ formData.pitching_live || (isRequiredField('pitching_live') ? 'This question is required' : 'Not answered') }}
  </span>
</li>

<!-- Share Submission -->
<li v-if="shouldDisplayQuestion(46, 'share_submission')">
  <strong><a @click="goToStep(46)">Would you like us to share your submission with other companies?</a></strong>
  <span 
    class="answer" 
    :class="{ 'required-text': !formData.share_submission && isRequiredField('share_submission') }">
    {{ formData.share_submission || (isRequiredField('share_submission') ? 'This question is required' : 'Not answered') }}
  </span>
</li>

<!-- Investors Participating -->
<li v-if="shouldDisplayQuestion(47, 'investors_participating')">
  <strong><a @click="goToStep(47)">Investors participating in the current round (if any).</a></strong>
  <span 
    class="answer" 
    :class="{ 'required-text': !formData.investors_participating && isRequiredField('investors_participating') }">
    {{ formData.investors_participating || (isRequiredField('investors_participating') ? 'This question is required' : 'Not answered') }}
  </span>
</li>

<!-- Anything Else -->
<li v-if="shouldDisplayQuestion(48, 'want_us_to_know')">
  <strong><a @click="goToStep(48)">Anything else you want investors to know?</a></strong>
  <span 
    class="answer" 
    :class="{ 'required-text': !formData.want_us_to_know && isRequiredField('want_us_to_know') }">
    {{ formData.want_us_to_know || (isRequiredField('want_us_to_know') ? 'This question is required' : 'Not answered') }}
  </span>
</li>

<!-- Value of Team -->
<li v-if="shouldDisplayQuestion(49, 'value_of_team')">
  <strong><a @click="goToStep(49)">How do the values of your team align with those of Liberty Ventures?</a></strong>
  <span 
    class="answer" 
    :class="{ 'required-text': !formData.value_of_team && isRequiredField('value_of_team') }">
    {{ formData.value_of_team || (isRequiredField('value_of_team') ? 'This question is required' : 'Not answered') }}
  </span>
</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formData: Object, // Данные формы
    isOpen: Boolean, // Открытие/закрытие модального окна с формой
    selectedForms: Array // Список выбранных форм
  },
  data() {
    return {
      isEmailModalOpen: false, // Открытие/закрытие модального окна с email
      userEmail: '', // Поле для ввода email
      formInfo: {
  first_name: [
    { name: '2048 Ventures', status: 'Required', url: 'https://www.2048.vc/' },
    { name: 'Boost Ventures', status: 'Required', url: 'https://www.boost.vc/' },
    { name: 'Everywhere Ventures', status: 'Required', url: 'https://everywhere.vc/' },
    { name: 'Hustle Fund', status: 'Required', url: 'https://www.hustlefund.vc/' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://incisive.vc/' },
    { name: 'Liberty Ventures', status: 'Required', url: 'https://libertyventures.xyz/' },
    { name: 'Path Ventures', status: 'Required', url: 'https://www.path.vc/' },
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/' },
    { name: 'Spatial Capital', status: 'Optional', url: 'https://www.spatial.capital/' },
  ],
  last_name: [
    { name: '2048 Ventures', status: 'Required', url: 'https://www.2048.vc/' },
    { name: 'Boost Ventures', status: 'Required', url: 'https://www.boost.vc/' },
    { name: 'Everywhere Ventures', status: 'Required', url: 'https://everywhere.vc/' },
    { name: 'Hustle Fund', status: 'Required', url: 'https://www.hustlefund.vc/' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://incisive.vc/' },
    { name: 'Liberty Ventures', status: 'Required', url: 'https://libertyventures.xyz/' },
    { name: 'Path Ventures', status: 'Required', url: 'https://www.path.vc/' },
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/' },
    { name: 'Spatial Capital', status: 'Optional', url: 'https://www.spatial.capital/' },
  ],
  email: [
    { name: '2048 Ventures', status: 'Required', url: 'https://www.2048.vc/' },
    { name: 'Boost Ventures', status: 'Required', url: 'https://www.boost.vc/' },
    { name: 'Everywhere Ventures', status: 'Required', url: 'https://everywhere.vc/' },
    { name: 'Hustle Fund', status: 'Required', url: 'https://www.hustlefund.vc/' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://incisive.vc/' },
    { name: 'Liberty Ventures', status: 'Required', url: 'https://libertyventures.xyz/' },
    { name: 'Path Ventures', status: 'Required', url: 'https://www.path.vc/' },
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/' },
    { name: 'Spatial Capital', status: 'Optional', url: 'https://www.spatial.capital/' },
    { name: 'Wischoff Ventures', status: 'Optional', url: 'https://www.wischoff.com/' },
  ],
  phone_number: [
    { name: 'Liberty Ventures', status: 'Required', url: 'https://libertyventures.xyz/' },
  ],
  relationship: [
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/' },
  ],
  working_full_time: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://www.hustlefund.vc/' },
  ],
  company_name: [
    { name: '2048 Ventures', status: 'Required', url: 'https://www.2048.vc/' },
    { name: 'Everywhere Ventures', status: 'Optional', url: 'https://everywhere.vc/' },
    { name: 'Hustle Fund', status: 'Required', url: 'https://www.hustlefund.vc/' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://incisive.vc/' },
    { name: 'Liberty Ventures', status: 'Required', url: 'https://libertyventures.xyz/' },
    { name: 'Path Ventures', status: 'Required', url: 'https://www.path.vc/' },
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/' },
    { name: 'Spatial Capital', status: 'Required', url: 'https://www.spatial.capital/' },
    { name: 'Wischoff Ventures', status: 'Optional', url: 'https://www.wischoff.com/' },
  ],
  one_line_description: [
    { name: 'Liberty Ventures', status: 'Required', url: 'https://libertyventures.xyz/' },
    { name: 'Path Ventures', status: 'Optional', url: 'https://www.path.vc/' },
    { name: 'Spatial Capital', status: 'Required', url: 'https://www.spatial.capital/' },
  ],
  company_description: [
    { name: '2048 Ventures', status: 'Required', url: 'https://www.2048.vc/' },
    { name: 'Boost Ventures', status: 'Required', url: 'https://www.boost.vc/' },
    { name: 'Hustle Fund', status: 'Required', url: 'https://www.hustlefund.vc/' },
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/' },
  ],
  company_solution: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://www.hustlefund.vc/' },
    { name: 'Incisive Ventures', status: 'Optional', url: 'https://incisive.vc/' },
  ],
  pitch_description: [
    { name: 'Incisive Ventures', status: 'Required', url: 'https://incisive.vc/' },
  ],
  target_customer: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://www.hustlefund.vc/' },
  ],
  customer_acquisition: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://www.hustlefund.vc/' },
  ],
  date_founded: [
    { name: '2048 Ventures', status: 'Required', url: 'https://www.2048.vc/' },
  ],
  product_status: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://www.hustlefund.vc/' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://incisive.vc/' },
  ],
  active_customers: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://www.hustlefund.vc/' },
  ],
  how_many_users: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://www.hustlefund.vc/' },
  ],
  industry: [
    { name: '2048 Ventures', status: 'Required', url: 'https://www.2048.vc/' },
    { name: 'Hustle Fund', status: 'Required', url: 'https://www.hustlefund.vc/' },
    { name: 'Incisive Ventures', status: 'Optional', url: 'https://incisive.vc/' },
    { name: 'Path Ventures', status: 'Optional', url: 'https://www.path.vc/' },
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/' },
    { name: 'Wischoff Ventures', status: 'Optional', url: 'https://www.wischoff.com/' },
  ],
  liberty_ventures_industry: [
    { name: 'Liberty Ventures', status: 'Required', url: 'https://libertyventures.xyz/' },
  ],
  product: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://www.hustlefund.vc/' },
    { name: 'Incisive Ventures', status: 'Optional', url: 'https://incisive.vc/' },
  ],
  business_model: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://www.hustlefund.vc/' },
  ],
  company_website: [
    { name: '2048 Ventures', status: 'Required', url: 'https://www.2048.vc/' },
    { name: 'Everywhere Ventures', status: 'Required', url: 'https://everywhere.vc/' },
    { name: 'Hustle Fund', status: 'Optional', url: 'https://www.hustlefund.vc/' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://incisive.vc/' },
    { name: 'Liberty Ventures', status: 'Required', url: 'https://libertyventures.xyz/' },
    { name: 'Path Ventures', status: 'Optional', url: 'https://www.path.vc/' },
    { name: 'Precursor Ventures', status: 'Optional', url: 'https://precursorvc.com/' },
    { name: 'Spatial Capital', status: 'Required', url: 'https://www.spatial.capital/' },
  ],
  pitch_deck: [
    { name: '2048 Ventures', status: 'Required', url: 'https://www.2048.vc/' },
    { name: 'Boost Ventures', status: 'Optional', url: 'https://www.boost.vc/' },
    { name: 'Everywhere Ventures', status: 'Required', url: 'https://everywhere.vc/' },
    { name: 'Hustle Fund', status: 'Optional', url: 'https://www.hustlefund.vc/' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://incisive.vc/' },
    { name: 'Path Ventures', status: 'Optional', url: 'https://www.path.vc/' },
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/' },
    { name: 'Spatial Capital', status: 'Optional', url: 'https://www.spatial.capital/' },
  ],
  pitch_deck_file: [
    { name: 'Hustle Fund', status: 'Optional', url: 'https://www.hustlefund.vc/' },
    { name: 'Liberty Ventures', status: 'Required', url: 'https://libertyventures.xyz/' },
    { name: 'Spatial Capital', status: 'Optional', url: 'https://www.spatial.capital/' },
    { name: 'Wischoff Ventures', status: 'Optional', url: 'https://www.wischoff.com/' },
  ],
  headquartered: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://www.hustlefund.vc/' },
    { name: 'Incisive Ventures', status: 'Optional', url: 'https://incisive.vc/' },
    { name: 'Wischoff Ventures', status: 'Optional', url: 'https://www.wischoff.com/' },
  ],
  headquartered_precursor: [
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/' },
  ],
  customers_based: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://www.hustlefund.vc/' },
  ],
  specific_location: [
    { name: '2048 Ventures', status: 'Required', url: 'https://www.2048.vc/' },
    { name: 'Boost Ventures', status: 'Required', url: 'https://www.boost.vc/' },
    { name: 'Everywhere Ventures', status: 'Required', url: 'https://everywhere.vc/' },
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/' },
  ],
  legal_structure: [
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/' },
  ],
  raising_round: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://www.hustlefund.vc/' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://incisive.vc/' },
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/' },
    { name: 'Wischoff Ventures', status: 'Optional', url: 'https://www.wischoff.com/' },
  ],
  raising_amount: [
    { name: '2048 Ventures', status: 'Required', url: 'https://www.2048.vc/' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://incisive.vc/' },
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/' },
    { name: 'Spatial Capital', status: 'Optional', url: 'https://www.spatial.capital/' },
  ],
  earning_revenue: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://www.hustlefund.vc/' },
  ],
  earning_amount: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://www.hustlefund.vc/' },
    { name: 'Incisive Ventures', status: 'Optional', url: 'https://incisive.vc/' },
  ],
  source_of_revenue: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://www.hustlefund.vc/' },
  ],
  pre_money_valuation: [
    { name: 'Precursor Ventures', status: 'Optional', url: 'https://precursorvc.com/' },
  ],
  post_money_valuation: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://www.hustlefund.vc/' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://incisive.vc/' },
  ],
  capital_to_raise: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://www.hustlefund.vc/' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://incisive.vc/' },
    { name: '2048 Ventures', status: 'Required', url: 'https://www.2048.vc/' },
  ],
  prev_experience: [
    { name: 'Incisive Ventures', status: 'Required', url: 'https://incisive.vc/' },
  ],
  team_description: [
    { name: 'Boost Ventures', status: 'Required', url: 'https://www.boost.vc/' },
  ],
  company_linkedin: [
    { name: 'Spatial Capital', status: 'Optional', url: 'https://www.spatial.capital/' },
  ],
  ceo_linkedin: [
    { name: 'Boost Ventures', status: 'Required', url: 'https://www.boost.vc/' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://incisive.vc/' },
    { name: 'Liberty Ventures', status: 'Required', url: 'https://libertyventures.xyz/' },
    { name: 'Path Ventures', status: 'Optional', url: 'https://www.path.vc/' },
    { name: '2048 Ventures', status: 'Required', url: 'https://www.2048.vc/' },
    { name: 'Everywhere Ventures', status: 'Optional', url: 'https://everywhere.vc/' },
    { name: 'Hustle Fund', status: 'Optional', url: 'https://www.hustlefund.vc/' },
  ],
  cto_linkedin: [
    { name: '2048 Ventures', status: 'Optional', url: 'https://www.2048.vc/' },
  ],
  founder_video_url: [
    { name: '2048 Ventures', status: 'Required', url: 'https://www.2048.vc/' },
    { name: 'Path Ventures', status: 'Optional', url: 'https://www.path.vc/' },
    { name: 'Boost Ventures', status: 'Required', url: 'https://www.boost.vc/' },
  ],
  vision: [
    { name: '2048 Ventures', status: 'Required', url: 'https://www.2048.vc/' },
  ],
  pitching_live: [
    { name: 'Hustle Fund', status: 'Optional', url: 'https://www.hustlefund.vc/' },
  ],
  share_submission: [
    { name: 'Hustle Fund', status: 'Optional', url: 'https://www.hustlefund.vc/' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://incisive.vc/' },
  ],
  investors_participating: [
    { name: 'Hustle Fund', status: 'Optional', url: 'https://www.hustlefund.vc/' },
    { name: 'Incisive Ventures', status: 'Optional', url: 'https://incisive.vc/' },
  ],
  want_us_to_know: [
    { name: 'Hustle Fund', status: 'Optional', url: 'https://www.hustlefund.vc/' },
    { name: 'Incisive Ventures', status: 'Optional', url: 'https://incisive.vc/' },
  ],
  value_of_team: [
    { name: 'Liberty Ventures', status: 'Required', url: 'https://libertyventures.xyz/' },
  ],
},
    };
  },
  methods: {
    shouldDisplayQuestion(stepNumber, fieldKey) {
  // Retrieve the list of investors associated with this step
  const stepInvestors = {
    2: ['2048 Ventures', 'Boost Ventures', 'Everywhere Ventures', 'Hustle Fund', 'Incisive Ventures', 'Liberty Ventures', 'Path Ventures', 'Precursor Ventures', 'Spatial Capital'],
    3: ['2048 Ventures', 'Boost Ventures', 'Everywhere Ventures', 'Hustle Fund', 'Incisive Ventures', 'Liberty Ventures', 'Path Ventures', 'Precursor Ventures', 'Spatial Capital', 'Wischoff Ventures'],
    4: ['Liberty Ventures'],
    5: ['2048 Ventures', 'Boost Ventures', 'Everywhere Ventures', 'Precursor Ventures'],
    6: ['2048 Ventures', 'Everywhere Ventures', 'Hustle Fund', 'Incisive Ventures', 'Liberty Ventures', 'Path Ventures', 'Precursor Ventures', 'Wischoff Ventures'],
    7: ['2048 Ventures'],
    8: ['Precursor Ventures'],
    9: ['Hustle Fund'],
    10: ['Liberty Ventures', 'Path Ventures', 'Spatial Capital'],
    11: ['2048 Ventures', 'Boost Ventures', 'Hustle Fund', 'Precursor Ventures'],
    12: ['Hustle Fund', 'Incisive Ventures'],
    13: ['Incisive Ventures'],
    14: ['Hustle Fund'],
    15: ['Hustle Fund'],
    16: ['Hustle Fund', 'Incisive Ventures'],
    17: ['Hustle Fund', 'Incisive Ventures'],
    18: ['Hustle Fund'],
    19: ['Hustle Fund'],
    20: ['Hustle Fund'],
    21: ['Hustle Fund'],
    22: ['2048 Ventures'],
    23: ['2048 Ventures', 'Everywhere Ventures', 'Hustle Fund', 'Incisive Ventures', 'Liberty Ventures', 'Path Ventures', 'Precursor Ventures', 'Spatial Capital'],
    24: ['2048 Ventures', 'Hustle Fund', 'Incisive Ventures', 'Path Ventures', 'Precursor Ventures', 'Wischoff Ventures'],
    25: ['Liberty Ventures'],
    26: ['Hustle Fund', 'Incisive Ventures', 'Precursor Ventures', 'Wischoff Ventures'],
    27: ['Precursor Ventures'],
    28: ['Precursor Ventures'],
    29: ['2048 Ventures', 'Boost Ventures', 'Everywhere Ventures', 'Hustle Fund', 'Incisive Ventures', 'Path Ventures', 'Precursor Ventures', 'Spatial Capital'],
    30: ['Hustle Fund', 'Liberty Ventures', 'Spatial Capital', 'Wischoff Ventures'],
    31: ['Hustle Fund', 'Incisive Ventures', 'Precursor Ventures', 'Wischoff Ventures'],
    32: ['2048 Ventures', 'Incisive Ventures', 'Precursor Ventures', 'Spatial Capital'],
    33: ['Hustle Fund', 'Incisive Ventures', '2048 Ventures'],
    34: ['Hustle Fund'],
    35: ['Hustle Fund', 'Incisive Ventures'],
    36: ['Hustle Fund'],
    37: ['Precursor Ventures'],
    38: ['Hustle Fund', 'Incisive Ventures'],
    39: ['Incisive Ventures'],
    40: ['Boost Ventures'],
    41: ['Spatial Capital'],
    42: ['Boost Ventures', 'Incisive Ventures', 'Liberty Ventures', 'Path Ventures', '2048 Ventures', 'Everywhere Ventures', 'Hustle Fund'],
    43: ['2048 Ventures'],
    44: ['2048 Ventures', 'Path Ventures', 'Boost Ventures'],
    45: ['Hustle Fund'],
    46: ['Hustle Fund', 'Incisive Ventures'],
    47: ['Hustle Fund', 'Incisive Ventures'],
    48: ['Hustle Fund', 'Incisive Ventures'],
    49: ['Liberty Ventures'],
    50: ['2048 Ventures', 'Boost Ventures', 'Everywhere Ventures', 'Hustle Fund', 'Incisive Ventures', 'Liberty Ventures', 'Path Ventures', 'Precursor Ventures', 'Spatial Capital', 'Wischoff Ventures'] // Available to all forms
  };

    // Check if the field is associated with selected investors
    const isRelevantInvestor = this.formData.selectedForms.some(form => stepInvestors[stepNumber]?.includes(form));
    
    return isRelevantInvestor; // Always display if it's relevant to the selected forms
  },
  isRequiredField(fieldKey) {
    // Checks if a question is required by any of the selected investors
    return this.formInfo[fieldKey]?.some(
      (requirement) => requirement.status === 'Required' && this.formData.selectedForms.includes(requirement.name)
    );
  },

  getQuestionStatus(fieldKey) {
    // Return specific messages based on the field status
    if (!this.formData[fieldKey]) {
      if (this.isRequiredField(fieldKey)) {
        return 'This question is required';
      } else {
        return 'Not answered';
      }
    }
    return '';
    }, // No message if answered
    // Закрыть основное модальное окно
    closeModal() {
      this.$emit('close');
    },
    // Открыть модальное окно для ввода email
    openEmailModal() {
      console.log("Opening email modal");
      this.isEmailModalOpen = true;
    },
    // Закрыть модальное окно для email
    closeEmailModal() {
      this.isEmailModalOpen = false;
    },
    goToStep(step) {
      this.closeModal(); // Close the review modal before navigating
      this.$emit('go-to-step', step);
    },
    // Логика для отправки формы на email
    sendFormToEmail() {
      const email = this.userEmail;

      if (!email) {
        alert('Please enter a valid email address');
        return;
      }

      // Отправка данных формы на сервер для отправки email
      fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          formData: this.formData
        })
      })
        .then(response => {
          if (response.ok) {
            alert('Form successfully sent to ' + email);
            this.closeEmailModal();
          } else {
            alert('Error sending form. Please try again later.');
          }
        })
        .catch(error => {
          alert('Error sending form. Please try again later.');
          console.error(error);
        });
    }
  },
  computed: {
  fieldsByStep() {
    return {
      2: { key: 'first_name', question: "What's your first and last name?" },
      3: { key: 'email', question: 'What is your e-mail address?' },
      4: { key: 'phone_number', question: 'What is your phone number?' },
      5: { key: 'specific_location', question: 'Where are you located?' },
      6: { key: 'company_name', question: "What's the name of your company?" },
      7: { key: 'date_founded', question: 'Date Founded:' },
      8: { key: 'relationship', question: 'What is your relationship to the company?' },
      9: { key: 'working_full_time', question: 'Are you working on this full time (40+ hours/week)?' },
      10: { key: 'one_line_description', question: "What's the one-liner description of your company?" },
      11: { key: 'company_description', question: 'In one to two sentences, what is the problem you are trying to solve?' },
      12: { key: 'company_solution', question: 'In one to two sentences, what is your solution?' },
      13: { key: 'pitch_description', question: 'In 2-3 sentences, what is the elevator pitch of your company?' },
      14: { key: 'target_customer', question: 'Who is your target customer?' },
      15: { key: 'customer_acquisition', question: 'How do you plan on acquiring your customers?' },
      16: { key: 'product', question: 'What is the primary product your company is providing?' },
      17: { key: 'product_status', question: 'What is the status of your product?' },
      18: { key: 'active_customers', question: 'Does your product have active users or customers?' },
      19: { key: 'how_many_users', question: 'How many users do you have?' },
      20: { key: 'business_model', question: 'What is your Business Model?' },
      21: { key: 'customers_based', question: 'Where are your main customers based?' },
      22: { key: 'vision', question: 'What is your big vision for the company?' },
      23: { key: 'company_website', question: 'What is your company website?' },
      24: { key: 'industry', question: 'What industry are you in?' },
      25: { key: 'liberty_ventures_industry', question: 'What industry are you in (Liberty Ventures)?' },
      26: { key: 'headquartered', question: 'Where is your business incorporated?' },
      27: { key: 'headquartered_precursor', question: 'Where is your business headquartered?' },
      28: { key: 'legal_structure', question: 'What is the current or intended legal structure of the company?' },
      29: { key: 'pitch_deck', question: 'If you have a pitch deck to share, provide the link here:' },
      30: { key: 'pitch_deck_file', question: 'If you have a pitch deck to share as an attachment, attach it here:' },
      31: { key: 'raising_round', question: 'What round are you raising?' },
      32: { key: 'raising_amount', question: 'How much are you raising (in USD)?' },
      33: { key: 'capital_to_raise', question: 'What is the amount you are raising in your current round (USD)?' },
      34: { key: 'earning_revenue', question: 'Is your startup earning revenue?' },
      35: { key: 'earning_amount', question: 'How much revenue are you earning per month (USD)?' },
      36: { key: 'source_of_revenue', question: 'What do you expect your main source of revenue to be?' },
      37: { key: 'pre_money_valuation', question: 'What is your pre-money valuation (USD)?' },
      38: { key: 'post_money_valuation', question: 'What is your post-money valuation (USD)?' },
      39: { key: 'prev_experience', question: 'What is your previous entrepreneurial experience?' },
      40: { key: 'team_description', question: 'Tell us about you and your team:' },
      41: { key: 'company_linkedin', question: "What's your company's LinkedIn?" },
      42: { key: 'ceo_linkedin', question: 'Founder LinkedIn:' },
      43: { key: 'cto_linkedin', question: 'CTO Linkedin:' },
      44: { key: 'founder_video_url', question: 'Founder video URL:' },
      45: { key: 'pitching_live', question: 'Are you interested in pitching live in front of a virtual audience?' },
      46: { key: 'share_submission', question: 'Would you like us to share your submission with other companies?' },
      47: { key: 'investors_participating', question: 'Investors participating in the current round (if any):' },
      48: { key: 'want_us_to_know', question: "Anything else you'd like investors to know?" },
      49: { key: 'value_of_team', question: 'How do the values of your team align with Liberty Ventures?' }
    };
  },
},

};
</script>

<style scoped>
.info-text {
  font-size: 16px;
  margin-bottom: 15px;
  color: #ffffff; /* Цвет текста для информативного сообщения */
  text-align: center;
}

.required .answer {
  color: #ea2929;
  font-weight: bold;
}

.send-email-button {
  background-color: #ff538c;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  border-radius: 4px;
  text-align: center;
}

.send-email-button:hover {
  background-color: #ff75a1;
}

.required-text {
  color: #ea2929;
  font-weight: bold;
}

.email-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #888;
}

.send-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  text-align: center;
}

.send-button:hover {
  background-color: #45a049;
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #282828;
  padding: 20px;
  border: 2px solid #888;
  width: 80%;
  max-width: 600px;
  max-height: 80%;
  color: #fff;
  border-radius: 8px;
  position: relative;
  overflow-y: auto;
}

.close {
  color: #fff;
  float: right;
  font-size: 28px;
  font-weight: bold;
  transition: color 0.3s ease;
}

.close:hover,
.close:focus {
  color: #707070;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  color: #ff538c;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  text-shadow: 1px 1px 0 #000;
  text-align: center;
  margin-bottom: 20px;
}

.form-list {
  font-size: 18px;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.form-list li {
  margin-bottom: 15px;
}
  
.form-list li strong {
  color: rgb(255, 207, 119);
  text-decoration: underline; /* Подчеркивание вопроса */
}

.form-list a {
  cursor: pointer; /* Указатель при наведении на вопрос */
  color: rgb(255, 207, 119); /* Цвет текста вопроса по умолчанию */
  text-decoration: none; /* Убираем подчеркивание по умолчанию */
  transition: color 0.3s ease, text-decoration 0.3s ease; /* Плавные переходы */
}

.form-list a:hover {
  color: #ff538c; /* Яркий цвет при наведении */
  text-decoration: underline; /* Добавляем подчеркивание при наведении */
}

.form-list li .answer {
  margin-top: 5px;
  display: block; /* Перенос ответа на новую строку */
  word-wrap: break-word; /* Перенос на следующую строку, если ответ слишком длинный */
}

.email-modal {
  position: fixed;
  z-index: 1001; /* Примерно выше других элементов */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.email-modal .modal-content {
  width: 60%;
  max-width: 400px;
  padding: 15px;
}

@media (max-width: 1024px) {
    .modal-header {
  font-size: 30px;

}
}

@media (max-width: 768px) {
    .modal-header {
  font-size: 25px;
    }
    .form-list {
  font-size: 16px;
}
}

@media (max-width: 480px) {
    .modal-header {
  font-size: 20px;
    }
    .form-list {
  font-size: 14px;
}
}

</style>