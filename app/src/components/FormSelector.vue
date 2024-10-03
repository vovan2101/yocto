<template>
  <div class="form-selector">
    <h2 class="modal-header">Select the forms you'd like to fill out</h2>
    <p>Please select one or more forms:</p>

    <div class="select-clear-buttons">
      <p class="select-all-text" @click="selectAllForms">Select all investors</p>
      <p class="clear-text" @click="clearAllForms">Clear selected</p>
    </div>

    <!-- Таблица с инвесторами -->
    <div class="table-container">
      <table class="investor-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Investor Name</th>
            <th>Questions</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(form, index) in forms" :key="index">
            <td>
              <label class="custom-checkbox-container">
                <input 
                  type="checkbox" 
                  :value="form" 
                  v-model="selectedForms" 
                />
                <span class="custom-checkbox"></span>
              </label>
            </td>
            <td><a :href="form.url" target="_blank">{{ form.name }}</a></td>
            <td>{{ form.questions }}</td>
            <td>{{ form.estimatedTime }} minutes</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Отображение общего времени и количества вопросов -->
    <div class="total-info">
      <p><strong>Question Count:</strong> {{ totalQuestions }} questions</p>
      <p><strong>Time to Complete:</strong> {{ totalEstimatedTime }} minutes</p>
      <div class="continue-button">
      <button class="button" :disabled="selectedForms.length === 0" @click="submitSelection">Continue</button>
    </div>
    </div>

  </div>
</template>
  
  
  <script>
  export default {
    props: {
    initialSelectedForms: {
      type: Array,
      default: () => [],
    },
  },
    data() {
      return {
        selectedForms: [],
        forms: [
        { name: "2048 Ventures", estimatedTime: 8, questions: 17, url: "https://www.2048.vc/" },
        { name: "Boost Ventures", estimatedTime: 5, questions: 11, url: "https://www.boost.vc/" },
        { name: "Everywhere Ventures", estimatedTime: 4, questions: 9, url: "https://everywhere.vc/" },
        { name: "Hustle Fund", estimatedTime: 15, questions: 31, url: "https://www.hustlefund.vc/" },
        { name: "Incisive Ventures", estimatedTime: 11, questions: 23, url: "https://incisive.vc/" },
        { name: "Liberty Ventures", estimatedTime: 5, questions: 5, url: "https://libertyventures.xyz/" },
        { name: "Path Ventures", estimatedTime: 5, questions: 10, url: "https://www.path.vc/" },
        { name: "Precursor Ventures", estimatedTime: 7, questions: 14, url: "https://precursorvc.com/" },
        { name: "Spatial Capital", estimatedTime: 3, questions: 7, url: "https://www.spatial.capital/" },
        { name: "Wischoff Ventures", estimatedTime: 4, questions: 9, url: "https://www.wischoff.com/" }
      ],
      stepInvestors: {
        2: ['2048 Ventures', 'Boost Ventures', 'Everywhere Ventures', 'Hustle Fund', 'Incisive Ventures', 'Liberty Ventures', 'Path Ventures', 'Precursor Ventures', 'Spatial Capital'],
        3: ['2048 Ventures', 'Boost Ventures', 'Everywhere Ventures', 'Hustle Fund', 'Incisive Ventures', 'Liberty Ventures', 'Path Ventures', 'Precursor Ventures', 'Wischoff Ventures'],
        4: ['Liberty Ventures'],
        5: ['Precursor Ventures'],
        6: ['Hustle Fund'],
        7: ['2048 Ventures', 'Everywhere Ventures', 'Hustle Fund', 'Incisive Ventures', 'Liberty Ventures', 'Path Ventures', 'Precursor Ventures', 'Wischoff Ventures'],
        8: ['Liberty Ventures', 'Path Ventures', 'Spatial Capital'],
        9: ['2048 Ventures', 'Boost Ventures', 'Hustle Fund', 'Precursor Ventures'],
        10: ['Hustle Fund', 'Incisive Ventures'],
        11: ['Incisive Ventures'],
        12: ['Hustle Fund'],
        13: ['Hustle Fund'],
        14: ['2048 Ventures'],
        15: ['Hustle Fund', 'Incisive Ventures'],
        16: ['Hustle Fund'],
        17: ['Hustle Fund'],
        18: ['2048 Ventures', 'Hustle Fund', 'Incisive Ventures', 'Path Ventures', 'Precursor Ventures', 'Wischoff Ventures'],
        19: ['Liberty Ventures'],
        20: ['Hustle Fund', 'Incisive Ventures'],
        21: ['Hustle Fund'],
        22: ['2048 Ventures', 'Everywhere Ventures', 'Hustle Fund', 'Incisive Ventures', 'Path Ventures', 'Precursor Ventures'],
        23: ['2048 Ventures', 'Boost Ventures', 'Everywhere Ventures', 'Hustle Fund', 'Incisive Ventures', 'Path Ventures', 'Precursor Ventures', 'Spatial Capital'],
        24: ['Hustle Fund', 'Liberty Ventures', 'Spatial Capital', 'Wischoff Ventures'],
        25: ['Hustle Fund', 'Incisive Ventures', 'Precursor Ventures', 'Wischoff Ventures'],
        26: ['Hustle Fund'],
        27: ['2048 Ventures', 'Boost Ventures', 'Everywhere Ventures', 'Precursor Ventures'],
        28: ['Precursor Ventures'],
        29: ['Hustle Fund', 'Incisive Ventures', 'Precursor Ventures', 'Wischoff Ventures'],
        30: ['2048 Ventures', 'Incisive Ventures', 'Precursor Ventures', 'Spatial Capital'],
        31: ['Hustle Fund'],
        32: ['Hustle Fund', 'Incisive Ventures'],
        33: ['Hustle Fund'],
        34: ['Precursor Ventures'],
        35: ['Hustle Fund', 'Incisive Ventures'],
        36: ['Hustle Fund', 'Incisive Ventures', '2048 Ventures'],
        37: ['Incisive Ventures'],
        38: ['Boost Ventures'],
        39: ['Spatial Capital'],
        40: ['Boost Ventures', 'Incisive Ventures', 'Liberty Ventures', 'Path Ventures', '2048 Ventures', 'Everywhere Ventures', 'Hustle Fund', 'Wischoff Ventures'],
        41: ['2048 Ventures'],
        42: ['Boost Ventures', 'Incisive Ventures', 'Liberty Ventures', '2048 Ventures', 'Wischoff Ventures', 'Everywhere Ventures'],
        43: ['2048 Ventures', 'Boost Ventures', 'Path Ventures'],
        44: ['Boost Ventures'],
        45: ['2048 Ventures'],
        46: ['Hustle Fund'],
        47: ['Hustle Fund', 'Incisive Ventures'],
        48: ['Hustle Fund', 'Incisive Ventures'],
        49: ['Hustle Fund', 'Incisive Ventures'],
        50: ['Liberty Ventures'],
        51: ['2048 Ventures', 'Boost Ventures', 'Everywhere Ventures', 'Hustle Fund', 'Incisive Ventures', 'Liberty Ventures', 'Path Ventures', 'Precursor Ventures', 'Spatial Capital', 'Wischoff Ventures']
      },
      stepIds: {
        2: 'first_name',
        3: 'email',
        4: 'phone_number',
        5: 'relationship',
        6: 'working_full_time',
        7: 'company_name',
        8: 'one_line_description',
        9: 'company_description',
        10: 'company_solution',
        11: 'pitch_description',
        12: 'target_customer',
        13: 'customer_acquisition',
        14: 'date_founded',
        15: 'product_status',
        16: 'active_customers',
        17: 'how_many_users',
        18: 'industry_selection',
        19: 'liberty_ventures_industry',
        20: 'product_selection',
        21: 'business_model',
        22: 'company_website',
        23: 'pitch_deck',
        24: 'pitch_deck_file',
        25: 'headquartered',
        26: 'customers_based',
        27: 'specific_location',
        28: 'legal_structure',
        29: 'raising_round',
        30: 'raising_amount',
        31: 'earning_revenue',
        32: 'earning_amount',
        33: 'source_of_revenue',
        34: 'pre_money_valuation',
        35: 'post_money_valuation',
        36: 'capital_to_raise',
        37: 'prev_experience',
        38: 'team_description',
        39: 'company_linkedin',
        40: 'ceo_linkedin',
        41: 'cto_linkedin',
        42: 'linkedin_profiles',
        43: 'founder_video_url',
        44: 'team_video_upload',
        45: 'vision',
        46: 'pitching_live',
        47: 'share_submission',
        48: 'investors_participating',
        49: 'want_us_to_know',
        50: 'value_of_team',
        51: 'final_step'
      }
    };
  },
  created() {
  // Устанавливаем все формы по умолчанию при загрузке компонента
  this.selectedForms = [...this.forms];
},
watch: {
    selectedForms(newSelectedForms) {
      // Отправляем обновленный список выбранных форм родительскому компоненту
      this.$emit('update:selected-forms', newSelectedForms);
    },
  },
computed: {
    totalEstimatedTime() {
      const uniqueSteps = this.getUniqueStepsForSelectedForms();
      // 1 вопрос = 0.5 минут (30 секунд)
      return Math.floor(uniqueSteps.length * 0.5);
    },
    totalQuestions() {
      const uniqueSteps = this.getUniqueStepsForSelectedForms();
      return uniqueSteps.length;
    }
  },
    methods: {
      getUniqueStepsForSelectedForms() {
      const uniqueSteps = new Set();

      // Собираем уникальные шаги для выбранных форм
      Object.keys(this.stepInvestors).forEach(step => {
        this.selectedForms.forEach(form => {
          if (this.stepInvestors[step] && this.stepInvestors[step].includes(form.name)) {
            uniqueSteps.add(step);
          }
        });
      });

      return Array.from(uniqueSteps);
    },
      submitSelection() {
  if (this.selectedForms.length > 0) {
    console.log('Selected forms:', this.selectedForms);
    this.$emit('forms-selected', this.selectedForms); // Передаем выбранные формы родительскому компоненту

    // Ждем обновления состояния в родительском компоненте перед переходом на следующий шаг
    this.$nextTick(() => {
      this.nextStep(); // Переход на следующий шаг
    });
  }
},
      nextStep() {
        let nextValidStep = this.$parent.currentStep + 1;
  
        // Проверяем и пропускаем шаги, для которых нет вопросов
        while (nextValidStep <= 51 && !this.$parent.hasQuestionsForStep(nextValidStep)) {
          nextValidStep++;
        }
  
        if (nextValidStep <= 51) {
          this.$parent.currentStep = nextValidStep;
          this.$parent.scrollToCurrentStep();
          if (this.$parent.currentStep === 51) {
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
  },
  updateSelectedForms(newSelectedForms) {
      this.selectedForms = [...newSelectedForms]; // Сохраняем изменения
    },
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

/* Header styling */
.modal-header {
  color: #ff538c;
  font-size: 32px;
  font-weight: 600;
  text-shadow: 1px 1px 0 #000;
  text-align: center;
  margin-bottom: 20px;
}

.table-container {
  max-height: 70vh; /* Ограничиваем высоту контейнера до 70% высоты видимой области экрана */
  overflow-y: auto; /* Добавляем вертикальную прокрутку */
}

/* Investor Table */
.investor-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  display: table; /* Устанавливаем обычное поведение таблицы */
}

.investor-table th,
.investor-table td {
  border: 1px solid #444;
  padding: 10px;
  text-align: left;
  color: #ddd;
}

.investor-table th {
  background-color: #444;
  font-weight: bold;
  color: #fff;
}

.investor-table td a {
  color: rgb(255, 207, 119);
  text-decoration: none;
}

.investor-table td a:hover {
  text-decoration: underline;
}


.investor-table tr:hover {
  background-color: #333;
}

/* Total info section */
.total-info {
  position: sticky;
  bottom: 0;
  background-color: #282828;
  text-align: center;
  padding-bottom: 10px;
}

.total-info p {
  color: #fff;
  margin: 5px 0;
}


/* Custom checkbox styles */
.custom-checkbox-container {
  display: inline-flex; /* Flexbox для правильного выравнивания */
  align-items: center; /* Центрирование по вертикали */
  justify-content: center; /* Центрирование по горизонтали */
  padding-left: 0; /* Убираем лишний отступ */
  cursor: pointer;
  font-size: 16px;
  user-select: none;
}

.custom-checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.custom-checkbox {
  position: relative;
  height: 30px; /* Увеличиваем размер чекбокса */
  width: 30px;  /* Увеличиваем размер чекбокса */
  background-color: #eee;
  border: 2px solid #ccc;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.custom-checkbox-container:hover input ~ .custom-checkbox {
  background-color: #f0f0f0;
  border-color: #aaa;
}

.custom-checkbox:after {
  content: "";
  position: absolute;
  display: none;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(45deg); /* Центрируем галочку */
  width: 10px;
  height: 18px;
  border: solid #fff; /* Белая галочка */
  border-width: 0 3px 3px 0;
}

.custom-checkbox-container input:checked ~ .custom-checkbox {
  background-color: #ff538c; /* Розовый цвет для фона */
  border-color: #000000;
}

.custom-checkbox-container input:checked ~ .custom-checkbox:after {
  display: block;
}


.form-selector {
  background-color: #282828;
  padding: 20px;
  padding-bottom: 0px;
  border: 2px solid #888;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  width: 70vw; /* Устанавливаем ширину в 90% от видимой области экрана */
  max-height: 80vh;
  margin: 0 auto; /* Центрируем форму на экране */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Разделяем содержимое на верхнюю и нижнюю части */
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
  margin: 0 auto; /* Убираем верхний и нижний отступы и центрируем элемент по горизонтали */
  line-height: 1.5;
  text-align: center; /* Центрируем текст внутри <p> */
  margin-top: 10px; /* Добавляем небольшой отступ сверху для пространства между .modal-header и <p> */
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
  .form-selector {
    width: 85vw; /* Сужаем форму для меньших экранов */
  }

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

}

/* @media (max-width: 1024px) */
@media (max-width: 1024px) {
  .form-selector {
    width: 85vw; /* Сужаем форму для меньших экранов */
  }


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
  .form-selector {
    width: 90vw;
    padding: 15px;
    box-sizing: border-box; /* Включаем отступы в общую высоту */
  }

  .table-container {
    max-height: 50vh; /* Уменьшаем высоту таблицы до 50% на меньших экранах */
    overflow-y: auto;
  }

/* Total info section */
.total-info {
  position: sticky;
  bottom: 0;
  background-color: #282828;
  text-align: center;
  padding-bottom: 10px;
  margin-bottom: 0; /* Убираем любые внешние отступы */
}

p {
  font-size: 1.2em;
}

  h2 {
    font-size: 1.5em;
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
    font-size: 1em;
  }



}

/* @media (max-width: 480px) */
@media (max-width: 480px) {
  .form-selector {
    width: 90vw; /* На самых маленьких экранах делаем форму на всю ширину */
    padding: 10px; /* Уменьшаем внутренние отступы */
  }

  .table-container {
    max-height: 50vh; /* Уменьшаем высоту таблицы до 50% на самых маленьких экранах */
    overflow-y: auto;
    overflow-x: hidden;
  }

p {
  font-size: 1.0em;
}

.modal-header {
  font-size: 20px;
  margin-bottom: 20px;
}

  h2 {
    font-size: 1.3em;
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
    font-size: 1em;
  }

  .investor-table {
    width: 100%; /* Заставляем таблицу занимать всю ширину контейнера */
    table-layout: fixed; /* Фиксированное расположение таблицы для равномерного распределения столбцов */
    font-size: 14px;
  }


.investor-table th,
.investor-table td {
  padding: 2px;
  text-align: center;
}

.button {
  font-size: 13px;
}

}
  </style>
  