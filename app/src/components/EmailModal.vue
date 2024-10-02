<template>
    <div v-if="isOpen" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close" @click="closeModal">&times;</span>
        <h2 class="modal-header">Send Form to My Email</h2>
        <p>If you do not receive the email, please check your spam folder.</p>
  
        <!-- Поле для ввода email -->
        <input
          type="email"
          v-model="userEmail"
          class="email-input"
          placeholder="name@example.com"
          required
        />
  
      <!-- Кнопка для отправки email -->
      <button
        @click="sendFormToEmail"
        class="send-button"
        :disabled="isSendingDisabled"
      >
        Send
      </button>
  
        <!-- Сообщение об успешной отправке -->
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  
        <!-- Сообщение об ошибке -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: Boolean,
      formData: Object
    },
    data() {
      return {
        userEmail: '', // Поле для ввода email
        successMessage: '', // Сообщение об успешной отправке
        errorMessage: '', // Сообщение об ошибке
        lastSentTime: null, // Время последней отправки
        isSendingDisabled: false // Переменная для блокировки кнопки
      };
    },
    methods: {
        closeModal() {
            this.$emit('close'); // Закрытие модального окна
        },
        // Логика отправки формы на email
        async sendFormToEmail() {
            const email = this.userEmail;
            
                // Проверяем, прошло ли 60 секунд с момента последней отправки
        const currentTime = new Date().getTime();
        if (this.lastSentTime && currentTime - this.lastSentTime < 60000) {
            this.errorMessage = 'You can only send one email per minute. Please wait.';
            this.successMessage = '';
            return;
        }

        if (!email) {
          this.errorMessage = 'Please enter a valid email address';
          this.successMessage = '';
          return;
        }
  
        try {
          const response = await fetch('http://test.yocto.vc/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              formData: this.formData
            })
          });
  
          if (response.ok) {
            this.successMessage = 'Form successfully sent to ' + email;
            this.errorMessage = '';
            this.lastSentTime = currentTime; // Сохраняем время отправки
            this.isSendingDisabled = true; // Блокируем кнопку на 60 секунд
            setTimeout(() => {
            this.isSendingDisabled = false;
          }, 60000);
          } else {
            this.errorMessage = 'Error sending form. Please try again later.';
            this.successMessage = '';
          }
        } catch (error) {
          this.errorMessage = 'An error occurred while sending the email.';
          this.successMessage = '';
          console.error(error);
        }
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
  
  .email-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #888;
  }
  
  .send-button {
  color: var(--dl-color-gray-black); /* Сохраняем цвет текста */
  cursor: pointer;
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 18px;
  box-shadow: 5px 6px 0px 0px #000000; /* Тень для кнопки */
  font-style: normal;
  transition: 0.3s;
  font-weight: 500;
  padding-top: var(--dl-space-space-unit);
  border-color: var(--dl-color-gray-black);
  border-width: 1px;
  padding-left: var(--dl-space-space-oneandhalfunits);
  border-radius: 0px;
  padding-right: var(--dl-space-space-oneandhalfunits);
  padding-bottom: var(--dl-space-space-unit);
  background-color: #ff538c; /* Розовый цвет фона */
}

.send-button:hover {
    background-color: #c43d6e; /* Более светлый розовый при наведении */
}

.send-button:focus {
  outline: none; /* Убираем рамку при нажатии */
}

  /* Стиль для успешного сообщения */
  .success-message {
    color: #4caf50;
    font-weight: bold;
    margin-top: 15px;
}

  
  /* Стиль для сообщения об ошибке */
  .error-message {
    color: #f44336;
    font-weight: bold;
    margin-top: 15px;
}

  p {
    margin-bottom: 15px;
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
}

@media (max-width: 480px) {
    .modal-header {
        font-size: 20px;
  }
}
  </style>
  