<template>
    <div v-if="isOpen" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close" @click="closeModal">&times;</span>
        <h2 class="modal-header">Review Your Answers</h2>
        <ul class="form-list">
          <!-- Список вопросов и ответов -->
          <li v-if="formData.first_name || formData.last_name">
            <strong>What's your first and last name?:</strong>
            <span class="answer">{{ formData.first_name }} {{ formData.last_name }}</span>
          </li>

          <!-- Email -->
          <li v-if="formData.email">
            <strong>What is your e-mail address?:</strong>
            <span class="answer">{{ formData.email }}</span>
          </li>

          <!-- Phone number -->
          <li v-if="formData.phone_number">
            <strong>What is your phone number?:</strong>
            <span class="answer">{{ formData.phone_number }}</span>
          </li>

          <!-- Relationship -->
          <li v-if="formData.relationship">
            <strong>What is your relationship to the company?:</strong>
            <span class="answer">{{ formData.relationship }}</span>
          </li>

          <!-- Working full time -->
          <li v-if="formData.working_full_time">
            <strong>Are you working on this full time (40+ hours/week)?:</strong>
            <span class="answer">{{ formData.working_full_time }}</span>
          </li>

          <!-- Full time duration -->
          <li v-if="formData.full_time_duration">
            <strong>How long have you been working on this full-time?:</strong>
            <span class="answer">{{ formData.full_time_duration }}</span>
          </li>

          <!-- Company name -->
          <li v-if="formData.company_name">
            <strong>What's the name of your company?:</strong>
            <span class="answer">{{ formData.company_name }}</span>
          </li>

          <!-- One-liner description -->
          <li v-if="formData.one_line_description">
            <strong>What's the one-liner description of your company?:</strong>
            <span class="answer">{{ formData.one_line_description }}</span>
          </li>

          <!-- Problem description -->
          <li v-if="formData.company_description">
            <strong>In one to two sentences, what is the problem you are trying to solve?:</strong>
            <span class="answer">{{ formData.company_description }}</span>
          </li>

          <!-- Solution -->
          <li v-if="formData.company_solution">
            <strong>In one to two sentences, what is your solution?:</strong>
            <span class="answer">{{ formData.company_solution }}</span>
          </li>

          <!-- Elevator pitch -->
          <li v-if="formData.pitch_description">
            <strong>In 2-3 sentences, what is the elevator pitch of your company?:</strong>
            <span class="answer">{{ formData.pitch_description }}</span>
          </li>

          <!-- Target customer -->
          <li v-if="formData.target_customer">
            <strong>Who is your target customer?:</strong>
            <span class="answer">{{ formData.target_customer }}</span>
          </li>

          <!-- Customer acquisition (Array) -->
          <li v-if="formData.customer_acquisition.length">
            <strong>How do you plan on acquiring your customers?:</strong>
            <span class="answer">{{ formData.customer_acquisition.join(', ') }}</span>
          </li>

          <!-- Date founded -->
          <li v-if="formData.date_founded">
            <strong>Date Founded:</strong>
            <span class="answer">{{ formData.date_founded }}</span>
          </li>

          <!-- Product status -->
          <li v-if="formData.product_status">
            <strong>What is the status of your product?:</strong>
            <span class="answer">{{ formData.product_status }}</span>
          </li>

          <!-- Active customers -->
          <li v-if="formData.active_customers">
            <strong>Does your product have active users or customers?:</strong>
            <span class="answer">{{ formData.active_customers }}</span>
          </li>

          <!-- Number of users -->
          <li v-if="formData.how_many_users">
            <strong>How many users do you have?:</strong>
            <span class="answer">{{ formData.how_many_users }}</span>
          </li>

          <!-- Industry (Array) -->
          <li v-if="formData.industry.length">
            <strong>What industry are you in?:</strong>
            <span class="answer">{{ formData.industry.join(', ') }}</span>
          </li>

          <!-- Liberty Ventures industry -->
          <li v-if="formData.liberty_ventures_industry">
            <strong>What industry are you in (Liberty Ventures)?:</strong>
            <span class="answer">{{ formData.liberty_ventures_industry }}</span>
          </li>

          <!-- Product (Array) -->
          <li v-if="formData.product.length">
            <strong>What is the primary product your company is providing?:</strong>
            <span class="answer">{{ formData.product.join(', ') }}</span>
          </li>

          <!-- Business model (Array) -->
          <li v-if="formData.business_model.length">
            <strong>What is your Business Model?:</strong>
            <span class="answer">{{ formData.business_model.join(', ') }}</span>
          </li>

          <!-- Company website -->
          <li v-if="formData.company_website">
            <strong>What is your company website?:</strong>
            <span class="answer">{{ formData.company_website }}</span>
          </li>

          <!-- Pitch deck URL -->
          <li v-if="formData.pitch_deck">
            <strong>If you have a pitch deck to share, provide the link here:</strong>
            <span class="answer">{{ formData.pitch_deck }}</span>
          </li>

          <!-- Pitch deck file -->
          <li v-if="formData.pitch_deck_file">
            <strong>If you have a pitch deck to share as an attachment, attach it here:</strong>
            <span class="answer">{{ formData.pitch_deck_file.name }}</span>
          </li>

          <!-- Headquartered -->
          <li v-if="formData.headquartered">
            <strong>Where is your business incorporated?:</strong>
            <span class="answer">{{ formData.headquartered }}</span>
          </li>

          <!-- Delaware C Corp -->
          <li v-if="formData.is_delaware_corp">
            <strong>Are you a Delaware C Corp?:</strong>
            <span class="answer">{{ formData.is_delaware_corp }}</span>
          </li>

          <!-- Customers based -->
          <li v-if="formData.customers_based">
            <strong>Where are your main customers based?:</strong>
            <span class="answer">{{ formData.customers_based }}</span>
          </li>

          <!-- Specific location -->
          <li v-if="formData.specific_location">
            <strong>Where are you located?:</strong>
            <span class="answer">{{ formData.specific_location }}</span>
          </li>

          <!-- Legal structure -->
          <li v-if="formData.legal_structure">
            <strong>What is the current or intended legal structure of the company?:</strong>
            <span class="answer">{{ formData.legal_structure }}</span>
          </li>

          <!-- Raising round -->
          <li v-if="formData.raising_round">
            <strong>What round are you raising?:</strong>
            <span class="answer">{{ formData.raising_round }}</span>
          </li>

          <!-- Raising amount -->
          <li v-if="formData.raising_amount">
            <strong>How much are you raising (in USD)?:</strong>
            <span class="answer">{{ formData.raising_amount }}</span>
          </li>

          <!-- Earning revenue -->
          <li v-if="formData.earning_revenue">
            <strong>Is your startup earning revenue?:</strong>
            <span class="answer">{{ formData.earning_revenue }}</span>
          </li>

          <!-- Earning amount -->
          <li v-if="formData.earning_amount">
            <strong>How much revenue are you earning per month (USD)?:</strong>
            <span class="answer">{{ formData.earning_amount }}</span>
          </li>

          <!-- Source of revenue -->
          <li v-if="formData.source_of_revenue">
            <strong>What do you expect your main source of revenue to be?:</strong>
            <span class="answer">{{ formData.source_of_revenue }}</span>
          </li>

          <!-- Pre-money valuation -->
          <li v-if="formData.pre_money_valuation">
            <strong>What is your pre-money valuation (USD)?:</strong>
            <span class="answer">{{ formData.pre_money_valuation }}</span>
          </li>

          <!-- Post-money valuation -->
          <li v-if="formData.post_money_valuation">
            <strong>What is your post-money valuation (USD)?:</strong>
            <span class="answer">{{ formData.post_money_valuation }}</span>
          </li>

          <!-- Capital to raise -->
          <li v-if="formData.capital_to_raise">
            <strong>What is the amount you are raising in your current round (USD)?:</strong>
            <span class="answer">{{ formData.capital_to_raise }}</span>
          </li>

          <!-- Team description -->
          <li v-if="formData.team_description">
            <strong>Tell us about you and your team:</strong>
            <span class="answer">{{ formData.team_description }}</span>
          </li>

          <!-- Previous experience -->
          <li v-if="formData.prev_experience">
            <strong>What is your previous entrepreneurial experience?:</strong>
            <span class="answer">{{ formData.prev_experience }}</span>
          </li>

          <!-- Value of team -->
          <li v-if="formData.value_of_team">
            <strong>Why are you/your team awesome?:</strong>
            <span class="answer">{{ formData.value_of_team }}</span>
          </li>

          <!-- Company LinkedIn -->
          <li v-if="formData.company_linkedin">
            <strong>What's your company's LinkedIn?:</strong>
            <span class="answer">{{ formData.company_linkedin }}</span>
          </li>

          <!-- CEO LinkedIn -->
          <li v-if="formData.ceo_linkedin">
            <strong>Founder LinkedIn:</strong>
            <span class="answer">{{ formData.ceo_linkedin }}</span>
          </li>

          <!-- Founder 2 LinkedIn -->
          <li v-if="formData.founder2_linkedin">
            <strong>Founder LinkedIn 2:</strong>
            <span class="answer">{{ formData.founder2_linkedin }}</span>
          </li>

          <!-- Founder 3 LinkedIn -->
          <li v-if="formData.founder3_linkedin">
            <strong>Founder LinkedIn 3:</strong>
            <span class="answer">{{ formData.founder3_linkedin }}</span>
          </li>

          <!-- CTO LinkedIn -->
          <li v-if="formData.cto_linkedin">
            <strong>CTO Linkedin:</strong>
            <span class="answer">{{ formData.cto_linkedin }}</span>
          </li>

          <!-- LinkedIn profiles -->
          <li v-if="formData.linkedin_profiles">
            <strong>Your team's LinkedIn profiles:</strong>
            <span class="answer">{{ formData.linkedin_profiles }}</span>
          </li>

          <!-- Founder video URL -->
          <li v-if="formData.founder_video_url">
            <strong>Founder video URL:</strong>
            <span class="answer">{{ formData.founder_video_url }}</span>
          </li>

          <!-- Team video upload -->
          <li v-if="formData.team_video_upload">
            <strong>Upload video about the team and company:</strong>
            <span class="answer">{{ formData.team_video_upload.name }}</span>
          </li>

          <!-- Vision -->
          <li v-if="formData.vision">
            <strong>What is your vision?:</strong>
            <span class="answer">{{ formData.vision }}</span>
          </li>

          <!-- Pitching live -->
          <li v-if="formData.pitching_live">
            <strong>Are you interested in pitching live in front of a virtual audience?:</strong>
            <span class="answer">{{ formData.pitching_live }}</span>
          </li>

          <!-- Share submission -->
          <li v-if="formData.share_submission">
            <strong>Would you like us to share your submission with other companies?:</strong>
            <span class="answer">{{ formData.share_submission }}</span>
          </li>

          <!-- Investors participating -->
          <li v-if="formData.investors_participating">
            <strong>Investors participating in the current round (if any):</strong>
            <span class="answer">{{ formData.investors_participating }}</span>
          </li>

          <!-- Anything else -->
          <li v-if="formData.want_us_to_know">
            <strong>Anything else you'd like investors to know?:</strong>
            <span class="answer">{{ formData.want_us_to_know }}</span>
          </li>

          <!-- Liberty Ventures alignment -->
          <li v-if="formData.liberty_ventures_alignment">
            <strong>How do the values of your team align with Liberty Ventures?:</strong>
            <span class="answer">{{ formData.liberty_ventures_alignment }}</span>
          </li>
        </ul>
    </div>
  </div>
  <!-- Модальное окно для ввода email -->
  <div v-if="isEmailModalOpen" class="modal email-modal" @click="closeEmailModal">
    <div class="modal-content" @click.stop>
      <span class="close" @click="closeEmailModal">&times;</span>
      <h2 class="modal-header">Enter Your Email</h2>
      <input type="email" v-model="userEmail" class="email-input" placeholder="Your email address" required />
      <button @click="sendFormToEmail" class="send-button">Send</button>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    formData: Object, // Данные формы
    isOpen: Boolean // Открытие/закрытие модального окна с формой
  },
  data() {
    return {
      isEmailModalOpen: false, // Открытие/закрытие модального окна с email
      userEmail: '' // Поле для ввода email
    };
  },
  methods: {
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
  }
};
</script>

<style scoped>
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
  font-size: 35px;
  font-style: normal;
  font-weight: 600;
  text-shadow: 1px 1px 0 #000, 2px 2px 0 #000000, 3px 3px 0 #000000;
  text-align: center;
  margin-bottom: 15px;
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

.form-list li .answer {
  color: rgb(255, 255, 255);
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