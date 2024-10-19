<template>
  <div v-if="isOpen" class="modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <span class="close" @click="closeModal">&times;</span>
      <h2 class="modal-header">Review My Answers</h2>
      <p class="info-text">
        You can click on a question to move directly to it and make changes.
      </p>
      <ul class="form-list">
        <!-- Список вопросов и ответов -->
        <!-- First and Last Name -->
        <li v-if="shouldDisplayQuestion(2, 'first_name') || shouldDisplayQuestion(2, 'last_name')">
    <strong><a @click="goToStep(2)">What's your first and last name?:</a></strong>
    <span class="answer">{{ formData.first_name }} {{ formData.last_name }}</span>
  </li>

  <!-- Email -->
  <li v-if="shouldDisplayQuestion(3, 'email')">
    <strong><a @click="goToStep(3)">What is your e-mail address?:</a></strong>
    <span class="answer">{{ formData.email }}</span>
  </li>

  <!-- Phone Number -->
  <li v-if="shouldDisplayQuestion(4, 'phone_number')">
    <strong><a @click="goToStep(4)">What is your phone number?:</a></strong>
    <span class="answer">{{ formData.phone_number }}</span>
  </li>

  <!-- Specific Location -->
  <li v-if="shouldDisplayQuestion(5, 'specific_location')">
    <strong><a @click="goToStep(5)">Where are you located?:</a></strong>
    <span class="answer">{{ formData.specific_location }}</span>
  </li>

  <!-- Company Name -->
  <li v-if="shouldDisplayQuestion(6, 'company_name')">
    <strong><a @click="goToStep(6)">What's the name of your company?:</a></strong>
    <span class="answer">{{ formData.company_name }}</span>
  </li>

  <!-- Date Founded -->
  <li v-if="shouldDisplayQuestion(7, 'date_founded')">
    <strong><a @click="goToStep(7)">Date Founded:</a></strong>
    <span class="answer">{{ formData.date_founded }}</span>
  </li>

  <!-- Relationship -->
  <li v-if="shouldDisplayQuestion(8, 'relationship')">
    <strong><a @click="goToStep(8)">What is your relationship to the company?:</a></strong>
    <span class="answer">{{ formData.relationship }}</span>
  </li>

  <!-- Working Full Time -->
  <li v-if="shouldDisplayQuestion(9, 'working_full_time')">
    <strong><a @click="goToStep(9)">Are you working on this full time (40+ hours/week)?:</a></strong>
    <span class="answer">{{ formData.working_full_time }}</span>
  </li>

  <!-- One-Liner Description -->
  <li v-if="shouldDisplayQuestion(10, 'one_line_description')">
    <strong><a @click="goToStep(10)">What's the one-liner description of your company?:</a></strong>
    <span class="answer">{{ formData.one_line_description }}</span>
  </li>

  <!-- Problem Description -->
  <li v-if="shouldDisplayQuestion(11, 'company_description')">
    <strong><a @click="goToStep(11)">In one to two sentences, what is the problem you are trying to solve?:</a></strong>
    <span class="answer">{{ formData.company_description }}</span>
  </li>

  <!-- Solution -->
  <li v-if="shouldDisplayQuestion(12, 'company_solution')">
    <strong><a @click="goToStep(12)">In one to two sentences, what is your solution?:</a></strong>
    <span class="answer">{{ formData.company_solution }}</span>
  </li>

  <!-- Elevator Pitch -->
  <li v-if="shouldDisplayQuestion(13, 'pitch_description')">
    <strong><a @click="goToStep(13)">In 2-3 sentences, what is the elevator pitch of your company?:</a></strong>
    <span class="answer">{{ formData.pitch_description }}</span>
  </li>

  <!-- Target Customer -->
  <li v-if="shouldDisplayQuestion(14, 'target_customer')">
    <strong><a @click="goToStep(14)">Who is your target customer?:</a></strong>
    <span class="answer">{{ formData.target_customer }}</span>
  </li>

  <!-- Customer Acquisition -->
  <li v-if="shouldDisplayQuestion(15, 'customer_acquisition')">
    <strong><a @click="goToStep(15)">How do you plan on acquiring your customers?:</a></strong>
    <span class="answer">{{ formData.customer_acquisition.join(', ') }}</span>
  </li>

  <!-- Product Selection -->
  <li v-if="shouldDisplayQuestion(16, 'product_selection')">
    <strong><a @click="goToStep(16)">What is the primary product your company is providing?:</a></strong>
    <span class="answer">{{ formData.product.join(', ') }}</span>
  </li>

  <!-- Product Status -->
  <li v-if="shouldDisplayQuestion(17, 'product_status')">
    <strong><a @click="goToStep(17)">What is the status of your product?:</a></strong>
    <span class="answer">{{ formData.product_status }}</span>
  </li>

  <!-- Active Customers -->
  <li v-if="shouldDisplayQuestion(18, 'active_customers')">
    <strong><a @click="goToStep(18)">Does your product have active users or customers?:</a></strong>
    <span class="answer">{{ formData.active_customers }}</span>
  </li>

  <!-- Number of Users -->
  <li v-if="shouldDisplayQuestion(19, 'how_many_users')">
    <strong><a @click="goToStep(19)">How many users do you have?:</a></strong>
    <span class="answer">{{ formData.how_many_users }}</span>
  </li>

  <!-- Business Model -->
  <li v-if="shouldDisplayQuestion(20, 'business_model')">
    <strong><a @click="goToStep(20)">What is your Business Model?:</a></strong>
    <span class="answer">{{ formData.business_model.join(', ') }}</span>
  </li>

  <!-- Customers Based -->
  <li v-if="shouldDisplayQuestion(21, 'customers_based')">
    <strong><a @click="goToStep(21)">Where are your main customers based?:</a></strong>
    <span class="answer">{{ formData.customers_based }}</span>
  </li>

  <!-- Vision -->
  <li v-if="shouldDisplayQuestion(22, 'vision')">
    <strong><a @click="goToStep(22)">What is your big vision for the company?:</a></strong>
    <span class="answer">{{ formData.vision }}</span>
  </li>

  <!-- Company Website -->
  <li v-if="shouldDisplayQuestion(23, 'company_website')">
    <strong><a @click="goToStep(23)">What is your company website?:</a></strong>
    <span class="answer">{{ formData.company_website }}</span>
  </li>

  <!-- Industry Selection -->
  <li v-if="shouldDisplayQuestion(24, 'industry')">
    <strong><a @click="goToStep(24)">What industry are you in?:</a></strong>
    <span class="answer">{{ formData.industry.join(', ') }}</span>
  </li>

  <!-- Liberty Ventures Industry -->
  <li v-if="shouldDisplayQuestion(25, 'liberty_ventures_industry')">
    <strong><a @click="goToStep(25)">What industry are you in (Liberty Ventures)?:</a></strong>
    <span class="answer">{{ formData.liberty_ventures_industry }}</span>
  </li>

  <!-- Headquartered -->
  <li v-if="shouldDisplayQuestion(26, 'headquartered')">
    <strong><a @click="goToStep(26)">Where is your business incorporated?:</a></strong>
    <span class="answer">{{ formData.headquartered }}</span>
  </li>

  <!-- Legal Structure -->
  <li v-if="shouldDisplayQuestion(27, 'legal_structure')">
    <strong><a @click="goToStep(27)">What is the current or intended legal structure of the company?:</a></strong>
    <span class="answer">{{ formData.legal_structure }}</span>
  </li>

  <!-- Pitch Deck URL -->
  <li v-if="shouldDisplayQuestion(28, 'pitch_deck')">
    <strong><a @click="goToStep(28)">If you have a pitch deck to share, provide the link here:</a></strong>
    <span class="answer">{{ formData.pitch_deck }}</span>
  </li>

  <!-- Pitch Deck File -->
  <li v-if="shouldDisplayQuestion(29, 'pitch_deck_file')">
    <strong><a @click="goToStep(29)">If you have a pitch deck to share as an attachment, attach it here:</a></strong>
    <span class="answer">{{ formData.pitch_deck_file.name }}</span>
  </li>

  <!-- Raising Round -->
  <li v-if="shouldDisplayQuestion(30, 'raising_round')">
    <strong><a @click="goToStep(30)">What round are you raising?:</a></strong>
    <span class="answer">{{ formData.raising_round }}</span>
  </li>

  <!-- Raising Amount -->
  <li v-if="shouldDisplayQuestion(31, 'raising_amount')">
    <strong><a @click="goToStep(31)">How much are you raising (in USD)?:</a></strong>
    <span class="answer">{{ formData.raising_amount }}</span>
  </li>

  <!-- Capital to Raise -->
  <li v-if="shouldDisplayQuestion(32, 'capital_to_raise')">
    <strong><a @click="goToStep(32)">What is the amount you are raising in your current round (USD)?:</a></strong>
    <span class="answer">{{ formData.capital_to_raise }}</span>
  </li>

  <!-- Earning Revenue -->
  <li v-if="shouldDisplayQuestion(33, 'earning_revenue')">
    <strong><a @click="goToStep(33)">Is your startup earning revenue?:</a></strong>
    <span class="answer">{{ formData.earning_revenue }}</span>
  </li>

  <!-- Earning Amount -->
  <li v-if="shouldDisplayQuestion(34, 'earning_amount')">
    <strong><a @click="goToStep(34)">How much revenue are you earning per month (USD)?:</a></strong>
    <span class="answer">{{ formData.earning_amount }}</span>
  </li>

  <!-- Source of Revenue -->
  <li v-if="shouldDisplayQuestion(35, 'source_of_revenue')">
    <strong><a @click="goToStep(35)">What do you expect your main source of revenue to be?:</a></strong>
    <span class="answer">{{ formData.source_of_revenue }}</span>
  </li>

  <!-- Pre-money Valuation -->
  <li v-if="shouldDisplayQuestion(36, 'pre_money_valuation')">
    <strong><a @click="goToStep(36)">What is your pre-money valuation (USD)?:</a></strong>
    <span class="answer">{{ formData.pre_money_valuation }}</span>
  </li>

  <!-- Post-money Valuation -->
  <li v-if="shouldDisplayQuestion(37, 'post_money_valuation')">
    <strong><a @click="goToStep(37)">What is your post-money valuation (USD)?:</a></strong>
    <span class="answer">{{ formData.post_money_valuation }}</span>
  </li>

  <!-- Previous Experience -->
  <li v-if="shouldDisplayQuestion(38, 'prev_experience')">
    <strong><a @click="goToStep(38)">What is your previous entrepreneurial experience?:</a></strong>
    <span class="answer">{{ formData.prev_experience }}</span>
  </li>

  <!-- Team Description -->
  <li v-if="shouldDisplayQuestion(39, 'team_description')">
    <strong><a @click="goToStep(39)">Tell us about you and your team:</a></strong>
    <span class="answer">{{ formData.team_description }}</span>
  </li>

  <!-- Company LinkedIn -->
  <li v-if="shouldDisplayQuestion(40, 'company_linkedin')">
    <strong><a @click="goToStep(40)">What's your company's LinkedIn?:</a></strong>
    <span class="answer">{{ formData.company_linkedin }}</span>
  </li>

  <!-- CEO LinkedIn -->
  <li v-if="shouldDisplayQuestion(41, 'ceo_linkedin')">
    <strong><a @click="goToStep(41)">Founder LinkedIn:</a></strong>
    <span class="answer">{{ formData.ceo_linkedin }}</span>
  </li>

  <!-- CTO LinkedIn -->
  <li v-if="shouldDisplayQuestion(42, 'cto_linkedin')">
    <strong><a @click="goToStep(42)">CTO Linkedin:</a></strong>
    <span class="answer">{{ formData.cto_linkedin }}</span>
  </li>

  <!-- Founder Video URL -->
  <li v-if="shouldDisplayQuestion(43, 'founder_video_url')">
    <strong><a @click="goToStep(43)">Founder video URL:</a></strong>
    <span class="answer">{{ formData.founder_video_url }}</span>
  </li>

  <!-- Pitching Live -->
  <li v-if="shouldDisplayQuestion(44, 'pitching_live')">
    <strong><a @click="goToStep(44)">Are you interested in pitching live in front of a virtual audience?:</a></strong>
    <span class="answer">{{ formData.pitching_live }}</span>
  </li>

  <!-- Share Submission -->
  <li v-if="shouldDisplayQuestion(45, 'share_submission')">
    <strong><a @click="goToStep(45)">Would you like us to share your submission with other companies?:</a></strong>
    <span class="answer">{{ formData.share_submission }}</span>
  </li>

  <!-- Investors Participating -->
  <li v-if="shouldDisplayQuestion(46, 'investors_participating')">
    <strong><a @click="goToStep(46)">Investors participating in the current round (if any):</a></strong>
    <span class="answer">{{ formData.investors_participating }}</span>
  </li>

  <!-- Anything Else -->
  <li v-if="shouldDisplayQuestion(47, 'want_us_to_know')">
    <strong><a @click="goToStep(47)">Anything else you'd like investors to know?:</a></strong>
    <span class="answer">{{ formData.want_us_to_know }}</span>
  </li>

  <!-- Value of Team -->
  <li v-if="shouldDisplayQuestion(48, 'value_of_team')">
    <strong><a @click="goToStep(48)">How do the values of your team align with Liberty Ventures?:</a></strong>
    <span class="answer">{{ formData.value_of_team }}</span>
  </li>
      </ul>
    </div>
  </div>

  <!-- Email Modal -->
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
    isOpen: Boolean, // Открытие/закрытие модального окна с формой
    selectedForms: Array // Список выбранных форм
  },
  data() {
    return {
      isEmailModalOpen: false, // Открытие/закрытие модального окна с email
      userEmail: '' // Поле для ввода email
    };
  },
  methods: {
    shouldDisplayQuestion(stepNumber, fieldKey) {
      const stepInvestors = {
        2: ['2048 Ventures', 'Boost Ventures', 'Everywhere Ventures', 'Hustle Fund', 'Incisive Ventures', 'Liberty Ventures', 'Path Ventures', 'Precursor Ventures', 'Spatial Capital'],
        3: ['2048 Ventures', 'Boost Ventures', 'Everywhere Ventures', 'Hustle Fund', 'Incisive Ventures', 'Liberty Ventures', 'Path Ventures', 'Precursor Ventures', 'Wischoff Ventures'],
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
        23: ['2048 Ventures', 'Everywhere Ventures', 'Hustle Fund', 'Incisive Ventures', 'Liberty Ventures', 'Path Ventures', 'Precursor Ventures', 'Spatial Capital', 'Wischoff Ventures'],
        24: ['2048 Ventures', 'Hustle Fund', 'Incisive Ventures', 'Path Ventures', 'Precursor Ventures', 'Wischoff Ventures'],
        25: ['Liberty Ventures'],
        26: ['Hustle Fund', 'Incisive Ventures', 'Precursor Ventures', 'Wischoff Ventures'],
        27: ['Precursor Ventures'],
        28: ['2048 Ventures', 'Boost Ventures', 'Everywhere Ventures', 'Hustle Fund', 'Incisive Ventures', 'Path Ventures', 'Precursor Ventures', 'Spatial Capital'],
        29: ['Hustle Fund', 'Liberty Ventures', 'Spatial Capital', 'Wischoff Ventures'],
        30: ['Hustle Fund', 'Incisive Ventures', 'Precursor Ventures', 'Wischoff Ventures'],
        31: ['2048 Ventures', 'Incisive Ventures', 'Precursor Ventures', 'Spatial Capital'],
        32: ['Hustle Fund', 'Incisive Ventures', '2048 Ventures'],
        33: ['Hustle Fund'],
        34: ['Hustle Fund', 'Incisive Ventures'],
        35: ['Hustle Fund'],
        36: ['Precursor Ventures'],
        37: ['Hustle Fund', 'Incisive Ventures'],
        38: ['Incisive Ventures'],
        39: ['Boost Ventures'],
        40: ['Spatial Capital'],
        41: ['Boost Ventures', 'Incisive Ventures', 'Liberty Ventures', 'Path Ventures', '2048 Ventures', 'Everywhere Ventures', 'Hustle Fund', 'Wischoff Ventures'],
        42: ['2048 Ventures'],
        43: ['2048 Ventures', 'Path Ventures', 'Boost Ventures'],
        44: ['Hustle Fund'],
        45: ['Hustle Fund', 'Incisive Ventures'],
        46: ['Hustle Fund', 'Incisive Ventures'],
        47: ['Hustle Fund', 'Incisive Ventures'],
        48: ['Liberty Ventures'],
        49: ['2048 Ventures', 'Boost Ventures', 'Everywhere Ventures', 'Hustle Fund', 'Incisive Ventures', 'Liberty Ventures', 'Path Ventures', 'Precursor Ventures', 'Spatial Capital', 'Wischoff Ventures'] // Доступен для всех форм
    };
      
      // Проверяем, есть ли соответствующий ответ в данных формы и привязан ли шаг к выбранным формам
      return this.formData[fieldKey] && this.selectedForms.some(form => stepInvestors[stepNumber]?.includes(form));
    },
    
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
  }
};
</script>

<style scoped>
.info-text {
  font-size: 16px;
  margin-bottom: 15px;
  color: #ffffff; /* Цвет текста для информативного сообщения */
  text-align: center;
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