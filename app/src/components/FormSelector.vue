<template>
    <div class="form-selector">
      <h2>Select the forms you'd like to fill out</h2>
      <p>Please select one or more forms:</p>
  
      <div class="select-clear-buttons">
      <p class="select-all-text" @click="selectAllForms">Select all investors</p>
      <p class="clear-text" @click="clearAllForms">Clear selected</p>
    </div>
    <div class="form-container">
      <div class="form-header">
        <div class="header-time">Total time: 60 min</div>
        <div class="header-questions">Total questions: 55</div>
      </div>
  
      <div class="form-options-scroll">
        <div class="form-options">
          <!-- Выводим список форм с количеством вопросов -->
          <label v-for="(form, index) in forms" :key="index" class="form-option">
            <input type="checkbox" :value="form" v-model="selectedForms" class="custom-checkbox" />
            <a :href="form.url" target="_blank" class="form-name">{{ form.name }}</a>
            <span class="estimated-time">{{ form.estimatedTime }} min</span>
            <span class="questions-count">{{ form.questions }} questions</span>
          </label>
        </div>
      </div>
    </div>
    
    <div class="total">
    <p>Total estimated time: {{ totalEstimatedTime }} minutes</p>
    <p>Total number of questions: {{ totalQuestions }} questions</p>
</div>
      <div>
        <!-- Кнопка Continue -->
        <button class="button" :disabled="selectedForms.length === 0" @click="submitSelection">Continue</button>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    data() {
      return {
        selectedForms: [],
        forms: [
        { name: "2048 Ventures", estimatedTime: 10, questions: 15, url: "https://www.2048.vc/" },
        { name: "Boost Ventures", estimatedTime: 15, questions: 20, url: "https://www.boost.vc/" },
        { name: "Everywhere Ventures", estimatedTime: 20, questions: 25, url: "https://everywhere.vc/" },
        { name: "Hustle Fund", estimatedTime: 12, questions: 18, url: "https://www.hustlefund.vc/" },
        { name: "Incisive Ventures", estimatedTime: 18, questions: 22, url: "https://incisive.vc/" },
        { name: "Liberty Ventures", estimatedTime: 14, questions: 19, url: "https://libertyventures.xyz/" },
        { name: "Path Ventures", estimatedTime: 16, questions: 21, url: "https://www.path.vc/" },
        { name: "Precursor Ventures", estimatedTime: 10, questions: 13, url: "https://precursorvc.com/" },
        { name: "Spatial Capital", estimatedTime: 22, questions: 30, url: "https://www.spatial.capital/" },
        { name: "Wischoff Ventures", estimatedTime: 8, questions: 12, url: "https://www.wischoff.com/" }
      ]
      };
    },
    computed: {
      totalEstimatedTime() {
        return this.selectedForms.reduce((total, form) => total + form.estimatedTime, 0);
      },
      totalQuestions() {
        return this.selectedForms.reduce((total, form) => total + form.questions, 0);
      }
    },
    methods: {
      submitSelection() {
        if (this.selectedForms.length > 0) {
          this.$emit('forms-selected', this.selectedForms); // Передаем выбранные формы родительскому компоненту
          this.nextStep(); // Переход на следующий шаг
        }
      },
      nextStep() {
        let nextValidStep = this.$parent.currentStep + 1;
  
        // Проверяем и пропускаем шаги, для которых нет вопросов
        while (nextValidStep <= 54 && !this.$parent.hasQuestionsForStep(nextValidStep)) {
          nextValidStep++;
        }
  
        if (nextValidStep <= 54) {
          this.$parent.currentStep = nextValidStep;
          this.$parent.scrollToCurrentStep();
          if (this.$parent.currentStep === 54) {
            this.$parent.hasReachedEnd = true; // Устанавливаем флаг, если пользователь дошел до конца
          }
          this.$parent.showTitle = this.$parent.currentStep !== 1;
        }
      },
      selectAllForms() {
        this.selectedForms = [...this.forms]; // Выбираем все формы
      },
      clearAllForms() {
    this.selectedForms = []; // Очищаем выбранные формы
  }
    }
  };
  </script>
  
  <style scoped>

html, body {
  height: 100%; /* Гарантируем, что высота страницы занимает 100% экрана */
  margin: 0;
  padding: 0;
  overflow-y: auto; /* Включаем вертикальную прокрутку, если контент превышает высоту экрана */
}

.select-clear-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Центрируем кнопки */
}

.total {
    margin-top: 5px;
}

.form-selector {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Высота на 100% экрана */
  overflow-y: auto; /* Позволяет прокручивать содержимое, если оно выходит за пределы */
  margin-top: 0; /* Убираем лишние отступы */
  padding: 20px;
  padding-top: 13vh;
}
h2 {
  color: #ffffff;
  font-size: 2.7em;
  margin-bottom: 20px;
  font-family: Inter;
}

p {
  color: #e0e0e0;
  font-size: 1.6em;
  margin-bottom: 20px;
  line-height: 1.5;
}

.form-container {
  display: flex;
  flex-direction: column;
  border: 2px solid #e0e0e0; 
  border-radius: 2px;
  padding: 20px;
  margin-top: 5px;
  overflow-y: auto; /* Включаем прокрутку внутри контейнера, если контент не помещается */
}

.form-header {
  display: flex;
  flex-direction: column; /* Теперь элементы выстроены вертикально */
  align-items: flex-start; /* Выравниваем по левому краю */
  font-size: 1.1em;
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 10px;
}

.header-investors {
  flex: 2;
  text-align: left;
}

.header-time {
  flex: 1;
  text-align: center;
}

.header-questions {
  flex: 1;
  text-align: right;
}

.form-options-scroll {
  max-height: 30vh; /* Ограничиваем высоту до 60% высоты экрана */
  overflow-y: auto; /* Включаем прокрутку */
  margin-bottom: 20px;
  padding-right: 35px;
}


.form-options::-webkit-scrollbar {
  width: 6px;
}

.form-options::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}

.form-options::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.form-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.custom-checkbox {
  width: 20px;
  height: 20px;
  margin-right: 15px;
  accent-color: #ff538c;
}

.form-name {
  flex: 2;
  color: rgb(255, 207, 119); /* Золотой цвет для названий инвесторов */
  font-size: 1.6em;
  text-decoration: underline;
}

.form-name:hover {
  color: rgb(218, 177, 101); /* Цвет ссылки при наведении */
}

.estimated-time {
  flex: 1;
  color: #e0e0e0;
  font-size: 1em;
  text-align: center;
}

.questions-count {
  flex: 1;
  color: #e0e0e0;
  font-size: 1em;
  text-align: right;
}

.select-all-text {
  color: rgb(255, 207, 119);
  text-decoration: underline;
  cursor: pointer;
  font-size: 1.2em;
  margin-bottom: 10px;
}

.clear-text {
  color: rgb(255, 207, 119);
  text-decoration: underline;
  cursor: pointer;
  font-size: 1.2em;
  margin-bottom: 10px;
  margin-left: 20px;
}

.select-all-text:hover, .clear-text:hover {
  color: rgb(218, 177, 101);
}

/* @media (max-width: 1440px) */
@media (max-width: 1440px) {

p {
  font-size: 1.5em;
}

  h2 {
    font-size: 2.5em;
  }

  .form-container {
    padding: 15px;
  }

  .form-name {
    font-size: 1.5em;
  }

  .select-all-text, .clear-text {
    font-size: 1.1em;
  }
}

/* @media (max-width: 1200px) */
@media (max-width: 1200px) {
p {
  font-size: 1.3em;
}

  h2 {
    font-size: 2.3em;
  }

  .form-name {
    font-size: 1.4em;
  }

  .form-header {
    font-size: 1em;
  }

  .select-all-text, .clear-text {
    font-size: 1em;
  }

  .custom-checkbox {
    width: 18px;
    height: 18px;
  }
}

/* @media (max-width: 1024px) */
@media (max-width: 1024px) {

p {
  font-size: 1.2em;
}

  h2 {
    font-size: 2.1em;
  }

  .header-investors, .header-time, .header-questions {
    text-align: left;
    margin-bottom: 5px;
  }

  .form-name {
    font-size: 1.3em;
  }

  .form-header {
    font-size: 0.9em;
  }

  .select-all-text, .clear-text {
    font-size: 0.9em;
  }
}

/* @media (max-width: 768px) */
@media (max-width: 768px) {
p {
  font-size: 1.1em;
}

  h2 {
    font-size: 1.8em;
  }

  .form-container {
    padding: 10px;
  }

  .form-header {
    font-size: 0.8em;
  }

  .form-name {
    font-size: 1.2em;
  }

  .select-all-text, .clear-text {
    font-size: 0.8em;
  }

  .custom-checkbox {
    width: 24px;
    height: 24px;
  }
}

/* @media (max-width: 480px) */
@media (max-width: 480px) {
p {
  font-size: 0.9em;
}


  h2 {
    font-size: 1.6em;
  }

  .form-header > div {
    margin-bottom: 5px;
  }

  .form-name {
    font-size: 1.1em;
  }

  .estimated-time, .questions-count {
    font-size: 0.9em;
  }

  .select-all-text, .clear-text {
    font-size: 0.7em;
  }

  .custom-checkbox {
    width: 20px;
    height: 20px;
  }
}
  </style>
  