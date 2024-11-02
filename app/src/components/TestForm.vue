<template>
    <div v-if="isOpen" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close" @click="closeModal">&times;</span>
        <h2 class="modal-header">Yocto.vc Form</h2>
    
        <!-- Отображение полей тестовой формы -->
        <div class="form-field" v-for="(value, key) in formFields" :key="key">
          <p class="question"><strong>{{ formatLabel(key) }}:</strong></p>
          <p class="answer">{{ value }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: {
        type: Boolean,
        default: false
      },
      formData: {
        type: Object,
        required: true
      }
    },
    computed: {
    formFields() {
      // Сопоставление вопросов формы Yocto.vc с данными из formData
      return {
        "What's your first and last name?": `${this.formData.first_name} ${this.formData.last_name}`.trim(),
        "What is your e-mail address?": this.formData.email,
        "Where are you located?": `${this.formData.specific_location}, ${this.formData.other_specific_location}`.trim(),
        "What's the name of your company?": this.formData.company_name,
        "Are you working on this full time (40+ hours/week)?": this.formData.working_full_time,
        "What's the one-line description of your company?": this.formData.one_line_description,
        "In one to two sentences, what is the problem you are trying to solve?": this.formData.company_description,
        "In one to two sentences, what is your solution?": this.formData.company_solution,
        "In 2-3 sentences, what is the elevator pitch of your company?": this.formData.pitch_description,
        "Who is your target customer & how are you going to acquire them?": this.formData.target_customer,
        "How do you plan on acquiring your customers?": [
      ...this.formData.customer_acquisition,
      this.formData.other_customer_acquisition || null
    ].filter(Boolean).join(', '),
        "What is the primary product your company is providing?": [
      ...this.formData.product,
      this.formData.other_product || null
    ].filter(Boolean).join(', '),
        "What is the status of your product?": this.formData.product_status,
        "Does your product have active users or customers?": this.formData.active_customers,
        "How many users do you have?": this.formData.how_many_users,
        "What is your Business Model?": [
      ...this.formData.business_model,
      this.formData.other_business_model || null
    ].filter(Boolean).join(', '),
    "Where are your main customers based?": [
      this.formData.customers_based,
      this.formData.other_customers_based || null
    ].filter(Boolean).join(', '),
        "What is your big vision for the company?": this.formData.vision,
        "What is your company website?": this.formData.company_website,
        "What industry are you in?": [
      ...this.formData.industry,
      this.formData.other_industry || null
    ].filter(Boolean).join(', '),
        "Where is your business incorporated?": this.formData.headquartered,
        "Where is your business headquartered?": this.formData.headquartered_precursor,
        "What is the current or intended legal structure of the company?": this.formData.legal_structure || this.formData.other_legal_structure,
        "If you have a pitch deck that you would like to share as a link, please share it here!": this.formData.pitch_deck,
        "If you have a pitch deck that you would like to share as an attachment, please attach it here!": this.formData.pitch_deck_file ? 'Attached' : 'Not attached',
        "What round are you raising?": this.formData.raising_round,
        "What is the amount of money you are looking to raise in your current round? (USD)": this.formData.raising_amount,
        "How much capital have you raised in prior rounds? (in USD)": this.formData.capital_to_raise,
        "Is your startup currently earning revenue?": this.formData.earning_revenue,
        "Approximately how much revenue are you earning per month (in USD)?": this.formData.earning_amount,
        "What do you expect your main source of revenue to be?": [
      this.formData.source_of_revenue,
      this.formData.other_source_of_revenue || null
    ].filter(Boolean).join(', '),
        "What is your post-money valuation you are looking for in your current round? (in USD)": this.formData.post_money_valuation,
        "What is your previous entrepreneurial experience?": this.formData.prev_experience,
        "In 2-3 sentences, tell us why you and your team are awesome.": this.formData.team_description,
        "What's your company's LinkedIn?": this.formData.company_linkedin,
        "Founder LinkedIn": this.formData.ceo_linkedin,
      };
    }
  },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      formatLabel(key) {
        // Форматирует ключ в более читаемую форму, например "first_name" в "First Name"
        return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }
    }
  };
  </script>
  
  <style scoped>
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
  max-height: 60vh; /* Ограничиваем высоту модального окна до 60% от высоты экрана */
  color: #fff;
  border-radius: 8px;
  position: relative;
  overflow-y: auto; /* Добавляем прокрутку по вертикали, если содержимое превышает max-height */
}
  
  .modal-header {
    color: #ff538c;
    font-size: 30px;
    text-align: center;
    margin-bottom: 15px;
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
    cursor: pointer;
  }
  
  .form-field {
    margin-bottom: 15px; /* Увеличиваем отступ между вопросами */
  }
  
  .question {
    color: rgb(255, 207, 119);
  }
  
  .answer {
    color: white; /* Белый цвет для ответов */
    margin-top: 3px; /* Отступ сверху для ответа */
  }
  </style>