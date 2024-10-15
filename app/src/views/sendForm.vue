<template>
  <div class="outer-container">
    <router-link to="/" class="home-logo">Yocto</router-link>
    <div ref="steps">
      <transition name="fade" mode="out-in">
        <div :key="currentStep">

          <!-- Step 0: Introduction -->
          <div v-if="currentStep === 0" class="intro-container">
          <div class="header-container-welcome-and-congrats">
            <h2>Welcome to Yocto!</h2>
          </div>
          <p class="welcome-and-congrats">We've preconfigured the applications for 10 top pre-seed & seed investors (more coming soon).</p>
          <p class="welcome-and-congrats">Please select the investors you would like to submit an application to based on the time you have.</p>
          <p class="welcome-and-congrats">Time estimates assume you know the answers to the questions and have any files requested readliy available.</p>
          <p class="welcome-and-congrats">Certain investors have unique questions and/or may request additional information.</p>
          <p class="welcome-and-congrats">At the end, you can review and edit your answers before submitting.</p>
          <p class="welcome-and-congrats"><strong>Let’s begin!</strong></p>
          <div class="button-container-welcome-and-congrats">
            <button class="button" @click="nextStep">Get Started</button>
            <p class="enter-text">press Enter ↵</p>
          </div>
        </div>
            <!-- Шаг 1: Выбор форм -->
            <FormSelector 
      v-if="currentStep === 1" 
      :initial-selected-forms="selectedForms" 
      @forms-selected="handleFormSelection" 
    />
    <!-- Step 2: First and Last Name -->
    <div v-if="currentStep === 2 && hasQuestionsForStep(2)" id="first_name">
      <div class="header-container">
        <h2>What's your first and last name?</h2>
      </div>
      <input class="input-field" v-model="formData.first_name" placeholder="First name" required />
      <input class="input-field" v-model="formData.last_name" placeholder="Last name" required />
      <div class="button-container">
        <button class="button" @click="nextStep">Next</button>
        <p class="enter-text">press Enter ↵</p>
      </div>
      <div class="link-left-container">
        <a @click="openModal('first_name')" class="link-scroll">Which investors require this information?</a>
      </div>
    </div>

    <!-- Step 3: Email -->
    <div v-if="currentStep === 3 && hasQuestionsForStep(3)" id="email">

      <div class="header-container">
        <h2>What is your e-mail address?</h2>
      </div>
      <input class="input-field" type="email" placeholder="name@example.com" v-model="formData.email" required />
      <div class="button-container">
        <button class="button" @click="nextStep">Next</button>
        <p class="enter-text">press Enter ↵</p>
      </div>
      <div class="link-left-container">
        <a @click="openModal('email')" class="link-scroll">Which investors require this information?</a>
      </div>
    </div>

    <!-- Step 4: Phone Number -->
    <div v-if="currentStep === 4 && hasQuestionsForStep(4)" id="phone_number">

      <div class="header-container">
        <h2>What is your phone number?</h2>
      </div>
      <input class="input-field" type="tel" placeholder="Type your answer here..." v-model="formData.phone_number" required />
      <div class="button-container">
        <button class="button" @click="nextStep">Next</button>
        <p class="enter-text">press Enter ↵</p>
      </div>
      <div class="link-left-container">
        <a @click="openModal('phone_number')" class="link-scroll">Which investors require this information?</a>
      </div>
    </div>

    <div v-if="currentStep === 5 && hasQuestionsForStep(5)" id="specific_location">

<div class="header-container">
  <h2>Where are you located?</h2>
</div>
<p>Hint: if your company is remote, that's totally fine, just pick the geo where you are physically located.</p>
<div class="scrollable-content">
<div class="radio-group">
  <label class="custom-radio" v-for="(location, index) in locations" :key="index">
    <input 
      type="radio" 
      :id="location.value" 
      :value="location.value" 
      v-model="formData.specific_location" 
      @change="checkOtherLocation" 
      required
    />
    <span class="radio-button">
      <span class="radio-key">{{ location.key }}</span> {{ location.label }}
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
</div>
</div>
<div v-if="['US - Other', 'Canada - Other', 'Asia - Other', 'Asia - India', 'Latin America', 'Europe', 'Africa'].includes(formData.specific_location)" class="other-location-input">
  <p>Please specify your location? (City, State, Country)</p>
  <input class="input-field" v-model="formData.other_specific_location" placeholder="Please specify" required />
</div>
<div class="button-container">
  <button class="button" @click="nextStep">Next</button>
  <p class="enter-text">press Enter ↵</p>
</div>
<div class="link-left-container">
<a @click="openModal('specific_location')" class="link-scroll">Which investors require this information?</a>
</div>
</div>

<div v-if="currentStep === 6 && hasQuestionsForStep(6)" id="company_name">

<div class="header-container">
  <h2>What's the name of your company?</h2>
</div>
<p>No corporate suffixes needed - For example, Inc, LLC, etc.</p>
<input class="input-field" placeholder="Type your answer here..." v-model="formData.company_name" required />
<div class="button-container">
  <button class="button" @click="nextStep">Next</button>
  <p class="enter-text">press Enter ↵</p>
</div>
<div class="link-left-container">
  <a @click="openModal('company_name')" class="link-scroll">Which investors require this information?</a>
</div>
</div>

<div v-if="currentStep === 7 && hasQuestionsForStep(7)" id="date_founded">

<div class="header-container">
  <h2>Date Founded?</h2>
</div>
<p>Approximately, when did you start the company?</p>
<input class="input-field" type="date" v-model="formData.date_founded" />
<div class="button-container">
  <button class="button" @click="nextStep">Next</button>
  <p class="enter-text">press Enter ↵</p>
</div>
<div class="link-left-container">
<a @click="openModal('date_founded')" class="link-scroll">Which investors require this information?</a>
</div>
</div>

    <!-- Step 5: Relationship -->
    <div v-if="currentStep === 8 && hasQuestionsForStep(8)" id="relationship">
      <div class="header-container">
        <h2>What is your relationship to the company?</h2>
      </div>
      <div class="radio-group">
        <label class="custom-radio">
          <input type="radio" value="Founder" v-model="formData.relationship" required @change="checkOtherRelationship" />
          <span class="radio-button">
            <span class="radio-key">A</span> Founder
            <span class="checkmark">&#10003;</span>
          </span>
        </label>
        <label class="custom-radio">
          <input type="radio" value="Other" v-model="formData.relationship" required @change="checkOtherRelationship" />
          <span class="radio-button">
            <span class="radio-key">B</span> Other
            <span class="checkmark">&#10003;</span>
          </span>
        </label>
      </div>
      <div v-if="formData.relationship === 'Other'" class="other-relationship-input">
        <input class="input-field" v-model="formData.other_relationship" placeholder="Please specify" required />
      </div>
      <div class="button-container">
        <button class="button" @click="nextStep">Next</button>
        <p class="enter-text">press Enter ↵</p>
      </div>
      <div class="link-left-container">
        <a @click="openModal('relationship')" class="link-scroll">Which investors require this information?</a>
      </div>
    </div>

    <!-- Step 6: Full Time Work -->
    <div v-if="currentStep === 9 && hasQuestionsForStep(9)" id="working_full_time">

      <div class="header-container">
        <h2>Are you working on this full time (40+ hours/week)?</h2>
      </div>
      <div class="radio-group">
        <label class="custom-radio">
          <input type="radio" name="full_time" value="Yes" v-model="formData.working_full_time" @change="showAdditionalQuestion">
          <span class="radio-button">
            <span class="radio-key">A</span> Yes
            <span class="checkmark">&#10003;</span>
          </span>
        </label>
        <label class="custom-radio">
          <input type="radio" name="full_time" value="No" v-model="formData.working_full_time" @change="hideAdditionalQuestion">
          <span class="radio-button">
            <span class="radio-key">B</span> No
            <span class="checkmark">&#10003;</span>
          </span>
        </label>
      </div>
      <div v-if="showFullTimeDuration">
        <div class="header-container">
          <h3>How long have you been working on this full-time?</h3>
        </div>
        <div class="radio-group">
          <label class="custom-radio">
            <input type="radio" value="0-6 Months" v-model="formData.full_time_duration" required>
            <span class="radio-button">
              <span class="radio-key">A</span> 0-6 Months
              <span class="checkmark">&#10003;</span>
            </span>
          </label>
          <label class="custom-radio">
            <input type="radio" value="6-12 Months" v-model="formData.full_time_duration" required>
            <span class="radio-button">
              <span class="radio-key">B</span> 6-12 Months
              <span class="checkmark">&#10003;</span>
            </span>
          </label>
          <label class="custom-radio">
            <input type="radio" value="12-18 Months" v-model="formData.full_time_duration" required>
            <span class="radio-button">
              <span class="radio-key">C</span> 12-18 Months
              <span class="checkmark">&#10003;</span>
            </span>
          </label>
          <label class="custom-radio">
            <input type="radio" value="18-24 Months" v-model="formData.full_time_duration" required>
            <span class="radio-button">
              <span class="radio-key">D</span> 18-24 Months
              <span class="checkmark">&#10003;</span>
            </span>
          </label>
          <label class="custom-radio">
            <input type="radio" value="24-36 Months" v-model="formData.full_time_duration" required>
            <span class="radio-button">
              <span class="radio-key">E</span> 24-36 Months
              <span class="checkmark">&#10003;</span>
            </span>
          </label>
          <label class="custom-radio">
            <input type="radio" value="36 Months or More" v-model="formData.full_time_duration" required>
            <span class="radio-button">
              <span class="radio-key">F</span> 36 Months or More
              <span class="checkmark">&#10003;</span>
            </span>
          </label>
        </div>
      </div>
      <div class="button-container">
        <button class="button" @click="nextStep">Next</button>
        <p class="enter-text">press Enter ↵</p>
      </div>
      <div class="link-left-container">
        <a @click="openModal('working_full_time')" class="link-scroll">Which investors require this information?</a>
      </div>
    </div>


          <!-- Step 8 -->
          <div v-if="currentStep === 10 && hasQuestionsForStep(10)" id="one_line_description">

            <div class="header-container">
              <h2>What's the one-line description of your company?</h2>
            </div>
            <p>(Keep it simple - eg "We're the Uber for babysitters")</p>
            <textarea class="input-field" placeholder="Type your answer here..." v-model="formData.one_line_description"></textarea>
            <div class="button-container">
              <button class="button" @click="nextStep">Next</button>
              <p class="enter-text">press Enter ↵</p>
            </div>
            <div class="link-left-container">
            <a @click="openModal('one_line_description')" class="link-scroll">Which investors require this information?</a>
          </div>
          </div>
          <!-- Step 9 -->
          <div v-if="currentStep === 11 && hasQuestionsForStep(11)" id="company_description">

            <div class="header-container">
              <h2>In one to two sentences, what is the problem you are trying to solve?</h2>
            </div>
            <textarea class="input-field" placeholder="Type your answer here..." v-model="formData.company_description" required></textarea>
            <div class="button-container">
              <button class="button" @click="nextStep">Next</button>
              <p class="enter-text">press Enter ↵</p>
            </div>
            <div class="link-left-container">
            <a @click="openModal('company_description')" class="link-scroll">Which investors require this information?</a>
          </div>
          </div>
          <!-- Step 10 -->
          <div v-if="currentStep === 12 && hasQuestionsForStep(12)" id="company_solution">

            <div class="header-container">
              <h2>In one to two sentences, what is your solution?</h2>
            </div>
            <p>Tip - tell us what your business does and how you are unique.</p>
            <textarea class="input-field" placeholder="Type your answer here..." v-model="formData.company_solution" required></textarea>
            <div class="button-container">
              <button class="button" @click="nextStep">Next</button>
              <p class="enter-text">press Enter ↵</p>
            </div>
            <div class="link-left-container">
            <a @click="openModal('company_solution')" class="link-scroll">Which investors require this information?</a>
          </div>
          </div>
          <!-- Step 11 -->
          <div v-if="currentStep === 13 && hasQuestionsForStep(13)" id="pitch_description">

            <div class="header-container">
              <h2>In no more than 4 sentences, what is the elevator pitch of your company?</h2>
            </div>
            <textarea class="input-field" placeholder="Type your answer here..." v-model="formData.pitch_description" required></textarea>
            <div class="button-container">
              <button class="button" @click="nextStep">Next</button>
              <p class="enter-text">press Enter ↵</p>
            </div>
            <div class="link-left-container">
            <a @click="openModal('pitch_description')" class="link-scroll">Which investors require this information?</a>
          </div>
          </div>
          <!-- Step 12 -->
          <div v-if="currentStep === 14 && hasQuestionsForStep(14)" id="target_customer">

            <div class="header-container">
              <h2>Who is your target customer & how are you going to acquire them?</h2>
            </div>
            <p>Pro tip: We're specifically looking for info around how you think about customer acquisition (now and at scale) and revenue.</p>
            <textarea class="input-field" placeholder="Type your answer here..." v-model="formData.target_customer" required></textarea>
            <div class="button-container">
              <button class="button" @click="nextStep">Next</button>
              <p class="enter-text">press Enter ↵</p>
            </div>
            <div class="link-left-container">
            <a @click="openModal('target_customer')" class="link-scroll">Which investors require this information?</a>
          </div>
          </div>
          <!-- Step 13 -->
          <div v-if="currentStep === 15 && hasQuestionsForStep(15)" id="customer_acquisition">

            <div class="header-container">
              <h2>How do you plan on acquiring your customers?</h2>
            </div>
            <p>Please select the options that apply to your business the most - the fewer the better!</p>
            <div class="choices">
              Make between 1 and 3 choices
            </div>
            <!-- Контейнер с прокруткой -->
            <div class="scrollable-content">
              <div class="checkbox-group">
                <label class="custom-checkbox" v-for="option in acquisitionOptions" :key="option.value">
                  <input 
                    type="checkbox" 
                    :value="option.value" 
                    v-model="formData.customer_acquisition" 
                    :disabled="isCustomerAcquisitionDisabled(option.value, formData.customer_acquisition)" 
                    @change="handleCustomerAcquisitionChange" 
                    required
                  />
                  <span class="checkbox-button">
                    <span class="checkbox-key">{{ option.key }}</span> {{ option.label }}
                    <span class="checkmark">&#10003;</span>
                  </span>
                </label>
              </div>
              <div v-if="formData.customer_acquisition.includes('Other')" class="other-customer-acquisition-input">
                <input 
                  class="input-field" 
                  v-model="formData.other_customer_acquisition" 
                  placeholder="Please specify" 
                  required 
                />
              </div>
            </div>

            <div class="button-container">
              <button class="button" @click="prepareCustomerAcquisitionData(); nextStep()">Next</button>
              <p class="enter-text">press Enter ↵</p>
            </div>
            <div class="link-left-container">
            <a @click="openModal('customer_acquisition')" class="link-scroll">Which investors require this information?</a>
          </div>
          </div>

          <div v-if="currentStep === 16 && hasQuestionsForStep(16)" id="product_selection">

<div class="header-container">
  <h2>What is the primary product your company is providing?</h2>
</div>
<p>Please select the options that apply to your business the most - the fewer the better!</p>
<div class="choices">
  You can choose up to 2
</div>
<div class="scrollable-content">
<div class="checkbox-group">
  <label class="custom-checkbox" v-for="option in productOptions" :key="option.value">
    <input 
      type="checkbox" 
      :value="option.value" 
      v-model="formData.product" 
      :disabled="isDisabled(option.value, formData.product)"
      @change="handleProductChange"
    />
    <span class="checkbox-button">
      <span class="checkbox-key">{{ option.key }}</span> {{ option.label }}
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
</div>
</div>
<div v-if="formData.product.includes('Other')" class="other-product-input">
  <input 
    class="input-field" 
    v-model="formData.other_product" 
    placeholder="Please specify" 
    required 
  />
</div>
<div class="button-container">
  <button class="button" @click="prepareProductData(); nextStep()">Next</button>
  <p class="enter-text">press Enter ↵</p>
</div>
<div class="link-left-container">
<a @click="openModal('product')" class="link-scroll">Which investors require this information?</a>
</div>
</div>

          <!-- Step 15 -->
          <div v-if="currentStep === 17 && hasQuestionsForStep(17)" id="product_status">

            <div class="header-container">
              <h2>What is the status of your product?</h2>
            </div>
            <div class="radio-group">
              <label class="custom-radio">
                <input type="radio" value="Idea/Prototype Stage" v-model="formData.product_status" />
                <span class="radio-button">
                  <span class="radio-key">A</span> Idea/Prototype Stage
                  <span class="checkmark">&#10003;</span>
                </span>
              </label>
              <label class="custom-radio">
                <input type="radio" value="Currently building MVP" v-model="formData.product_status" />
                <span class="radio-button">
                  <span class="radio-key">B</span> Currently building MVP
                  <span class="checkmark">&#10003;</span>
                </span>
              </label>
              <label class="custom-radio">
                <input type="radio" value="MVP built, < 3 months in market" v-model="formData.product_status" />
                <span class="radio-button">
                  <span class="radio-key">C</span> MVP built, &lt; 3 months in market
                  <span class="checkmark">&#10003;</span>
                </span>
              </label>
              <label class="custom-radio">
                <input type="radio" value="MVP built with > 3 months in the market" v-model="formData.product_status" />
                <span class="radio-button">
                  <span class="radio-key">D</span> MVP built with &gt; 3 months in the market
                  <span class="checkmark">&#10003;</span>
                </span>
              </label>
              <label class="custom-radio">
                <input type="radio" value="Full-fledged product built, < 3 months in market" v-model="formData.product_status" />
                <span class="radio-button">
                  <span class="radio-key">E</span> Full-fledged product built, &lt; 3 months in market
                  <span class="checkmark">&#10003;</span>
                </span>
              </label>
              <label class="custom-radio">
                <input type="radio" value="Full-fledged product built, > 3 months in market" v-model="formData.product_status" />
                <span class="radio-button">
                  <span class="radio-key">F</span> Full-fledged product built, &gt; 3 months in market
                  <span class="checkmark">&#10003;</span>
                </span>
              </label>
            </div>
            <div class="button-container">
              <button class="button" @click="nextStep">Next</button>
              <p class="enter-text">press Enter ↵</p>
            </div>
            <div class="link-left-container">
            <a @click="openModal('product_status')" class="link-scroll">Which investors require this information?</a>
          </div>
          </div>
          <!-- Step 16 -->
          <div v-if="currentStep === 18 && hasQuestionsForStep(18)" id="active_customers">

            <div class="header-container">
              <h2>Does your product have active users or customers?</h2>
            </div>
            <div class="radio-group">
              <label class="custom-radio">
                <input type="radio" value="No" v-model="formData.active_customers" />
                <span class="radio-button">
                  <span class="radio-key">A</span> No
                  <span class="checkmark">&#10003;</span>
                </span>
              </label>
              <label class="custom-radio">
                <input type="radio" value="No, but we have a wait list" v-model="formData.active_customers" />
                <span class="radio-button">
                  <span class="radio-key">B</span> No, but we have a wait list
                  <span class="checkmark">&#10003;</span>
                </span>
              </label>
              <label class="custom-radio">
                <input type="radio" value="Yes" v-model="formData.active_customers" />
                <span class="radio-button">
                  <span class="radio-key">C</span> Yes
                  <span class="checkmark">&#10003;</span>
                </span>
              </label>
            </div>
            <div class="button-container">
              <button class="button" @click="nextStep">Next</button>
              <p class="enter-text">press Enter ↵</p>
            </div>
            <div class="link-left-container">
            <a @click="openModal('active_customers')" class="link-scroll">Which investors require this information?</a>
          </div>
          </div>
          <!-- Step 17 -->
          <div v-if="currentStep === 19 && hasQuestionsForStep(19)" id="how_many_users">

            <div class="header-container">
              <h2>How many users do you have?</h2>
            </div>
            <p>Including wait list if applicable.</p>
            <div class="scrollable-content">
            <div class="radio-group">
              <label class="custom-radio">
                <input type="radio" value="1-5" v-model="formData.how_many_users" />
                <span class="radio-button">
                  <span class="radio-key">A</span> 1-5
                  <span class="checkmark">&#10003;</span>
                </span>
              </label>
              <label class="custom-radio">
                <input type="radio" value="6-10" v-model="formData.how_many_users" />
                <span class="radio-button">
                  <span class="radio-key">B</span> 6-10
                  <span class="checkmark">&#10003;</span>
                </span>
              </label>
              <label class="custom-radio">
                <input type="radio" value="11-20" v-model="formData.how_many_users" />
                <span class="radio-button">
                  <span class="radio-key">C</span> 11-20
                  <span class="checkmark">&#10003;</span>
                </span>
              </label>
              <label class="custom-radio">
                <input type="radio" value="21-50" v-model="formData.how_many_users" />
                <span class="radio-button">
                  <span class="radio-key">D</span> 21-50
                  <span class="checkmark">&#10003;</span>
                </span>
              </label>
              <label class="custom-radio">
                <input type="radio" value="51-100" v-model="formData.how_many_users" />
                <span class="radio-button">
                  <span class="radio-key">E</span> 51-100
                  <span class="checkmark">&#10003;</span>
                </span>
              </label>
              <label class="custom-radio">
                <input type="radio" value="101-300" v-model="formData.how_many_users" />
                <span class="radio-button">
                  <span class="radio-key">F</span> 101-300
                  <span class="checkmark">&#10003;</span>
                </span>
              </label>
              <label class="custom-radio">
                <input type="radio" value="301-500" v-model="formData.how_many_users" />
                <span class="radio-button">
                  <span class="radio-key">G</span> 301-500
                  <span class="checkmark">&#10003;</span>
                </span>
              </label>
              <label class="custom-radio">
                <input type="radio" value="501-1k" v-model="formData.how_many_users" />
                <span class="radio-button">
                  <span class="radio-key">H</span> 501-1k
                  <span class="checkmark">&#10003;</span>
                </span>
              </label>
              <label class="custom-radio">
                <input type="radio" value="1-5k" v-model="formData.how_many_users" />
                <span class="radio-button">
                  <span class="radio-key">I</span> 1-5k
                  <span class="checkmark">&#10003;</span>
                </span>
              </label>
              <label class="custom-radio">
                <input type="radio" value="5-10k" v-model="formData.how_many_users" />
                <span class="radio-button">
                  <span class="radio-key">J</span> 5-10k
                  <span class="checkmark">&#10003;</span>
                </span>
              </label>
              <label class="custom-radio">
                <input type="radio" value="10k+" v-model="formData.how_many_users" />
                <span class="radio-button">
                  <span class="radio-key">K</span> 10k+
                  <span class="checkmark">&#10003;</span>
                </span>
              </label>
            </div>
            </div>
            <div class="button-container">
              <button class="button" @click="nextStep">Next</button>
              <p class="enter-text">press Enter ↵</p>
            </div>
            <div class="link-left-container">
            <a @click="openModal('how_many_users')" class="link-scroll">Which investors require this information?</a>
          </div>
          </div>
          <div v-if="currentStep === 20 && hasQuestionsForStep(20)" id="business_model">

<div class="header-container">
  <h2>What is your Business Model?</h2>
</div>
<p>Please select the options that apply to your business the most - the fewer the better!</p>
<p>(If you are a Marketplace/Network, please specify the types of users interacting on your platform. )</p>
<div class="choices">
  You can choose up to 2
</div>
<div class="scrollable-content">
<div class="checkbox-group">
  <label class="custom-checkbox" v-for="model in businessModelOptions" :key="model.value">
    <input 
      type="checkbox" 
      :value="model.value" 
      v-model="formData.business_model" 
      :disabled="isDisabled(model.value, formData.business_model)"
      @change="handleBusinessModelChange" 
      required
    />
    <span class="checkbox-button">
      <span class="checkbox-key">{{ model.key }}</span> {{ model.label }}
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
</div>
</div>
<div v-if="formData.business_model.includes('Other')" class="other-business-model-input">
  <input 
    class="input-field" 
    v-model="formData.other_business_model" 
    placeholder="Please specify" 
    required 
  />
</div>
<div class="button-container">
  <button class="button" @click="prepareBusinessModelData(); nextStep()">Next</button>
  <p class="enter-text">press Enter ↵</p>
</div>
<div class="link-left-container">
<a @click="openModal('business_model')" class="link-scroll">Which investors require this information?</a>
</div>
</div>

<div v-if="currentStep === 21 && hasQuestionsForStep(21)" id="customers_based">

<div class="header-container">
  <h2>Where are your main customers based?</h2>
</div>
<div class="scrollable-content">
<div class="radio-group">
  <label class="custom-radio">
    <input type="radio" value="US" v-model="formData.customers_based" />
    <span class="radio-button">
      <span class="radio-key">A</span> US
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Canada" v-model="formData.customers_based" />
    <span class="radio-button">
      <span class="radio-key">B</span> Canada
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Mexico" v-model="formData.customers_based" />
    <span class="radio-button">
      <span class="radio-key">C</span> Mexico
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Asia - East" v-model="formData.customers_based" />
    <span class="radio-button">
      <span class="radio-key">D</span> Asia - East
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Asia - Central" v-model="formData.customers_based" />
    <span class="radio-button">
      <span class="radio-key">E</span> Asia - Central
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Asia - India / Pakistan / Bangladesh" v-model="formData.customers_based" />
    <span class="radio-button">
      <span class="radio-key">F</span> Asia - India / Pakistan / Bangladesh
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Asia - Southeast Asia" v-model="formData.customers_based" />
    <span class="radio-button">
      <span class="radio-key">G</span> Asia - Southeast Asia
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Australia / New Zealand" v-model="formData.customers_based" />
    <span class="radio-button">
      <span class="radio-key">H</span> Australia / New Zealand
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Europe" v-model="formData.customers_based" />
    <span class="radio-button">
      <span class="radio-key">I</span> Europe
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Latin America" v-model="formData.customers_based" />
    <span class="radio-button">
      <span class="radio-key">J</span> Latin America
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Middle East" v-model="formData.customers_based" />
    <span class="radio-button">
      <span class="radio-key">K</span> Middle East
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Africa" v-model="formData.customers_based" />
    <span class="radio-button">
      <span class="radio-key">L</span> Africa
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Global" v-model="formData.customers_based" />
    <span class="radio-button">
      <span class="radio-key">M</span> Global
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
<input type="radio" value="Other" v-model="formData.customers_based" @change="handleCustomersBasedChange" />
<span class="radio-button">
<span class="radio-key">N</span> Other
<span class="checkmark">&#10003;</span>
</span>
</label>
</div>
</div>
<!-- Появляется поле для ввода, если выбрано 'Other' -->
<div v-if="formData.customers_based === 'Other'" class="other-product-input">
<input 
class="input-field" 
v-model="formData.other_customers_based" 
placeholder="Please specify" 
required 
/>
</div>
<div class="button-container">
  <button class="button" @click="nextStep">Next</button>
  <p class="enter-text">press Enter ↵</p>
</div>
<div class="link-left-container">
  <a @click="openModal('customers_based')" class="link-scroll">Which investors require this information?</a>
</div>
</div>

<div v-if="currentStep === 22 && hasQuestionsForStep(22)" id="vision">

<div class="header-container">
  <h2>What is your big vision for the company?</h2>
</div>
<p>In 5-7 years, what is the world dominating vision for your company? </p>
<textarea class="input-field" type="input-field" placeholder="Type your answer here..." v-model="formData.vision"></textarea>
<div class="button-container">
  <button class="button" @click="nextStep">Next</button>
  <p class="enter-text">press Enter ↵</p>
</div>
<div class="link-left-container">
      <a @click="openModal('vision')" class="link-scroll">Which investors require this information?</a>
  </div>
</div>

<div v-if="currentStep === 23 && hasQuestionsForStep(23)" id="company_website">

<div class="header-container">
  <h2>What is your company website?</h2>
</div>
<input class="input-field" type="url" placeholder="https://website.com" v-model="formData.company_website" />
<div class="button-container">
  <button class="button" @click="nextStep">Next</button>
  <p class="enter-text">press Enter ↵</p>
</div>
<div class="link-left-container">
<a @click="openModal('company_website')" class="link-scroll">Which investors require this information?</a>
</div>
</div>
          <div v-if="currentStep === 24 && hasQuestionsForStep(24)" id="industry_selection">

            <div class="header-container">
              <h2>What industry are you in?</h2>
            </div>
            <p>Please select the options that apply to your business the most - the fewer the better!</p>
            <div class="choices">
              You can choose up to 3
            </div>
            <div class="scrollable-content">
            <div class="checkbox-group">
              <label class="custom-checkbox" v-for="option in industryOptions" :key="option.value">
                <input 
                  type="checkbox" 
                  :value="option.value" 
                  v-model="formData.industry" 
                  :disabled="isIndustryDisabled(option.value, formData.industry)"
                  @change="handleIndustryChange"
                />
                <span class="checkbox-button">
                  <span class="checkbox-key">{{ option.key }}</span> {{ option.label }}
                  <span class="checkmark">&#10003;</span>
                </span>
              </label>
            </div>
            </div>
            <div v-if="formData.industry.includes('Other')" class="other-product-input">
              <input 
                class="input-field" 
                v-model="formData.other_industry" 
                placeholder="Please specify" 
                required 
              />
            </div>
            <div class="button-container">
              <button class="button" @click="prepareIndustryData(); nextStep()">Next</button>
              <p class="enter-text">press Enter ↵</p>
            </div>
            <div class="link-left-container">
            <a @click="openModal('industry')" class="link-scroll">Which investors require this information?</a>
          </div>
          </div>
          <!-- Step 19 -->
          <div v-if="currentStep === 25 && hasQuestionsForStep(25)" id="liberty_ventures_industry">

            <div class="header-container">
              <h2>What industry are you in (Liberty Ventures)?</h2>
            </div>
            <div class="choices">
              You may only choose 1
            </div>
            <div class="scrollable-content">
            <div class="radio-group">
              <label class="custom-radio" v-for="option in snapshotIndustryOptions" :key="option.value">
                <input 
                  type="radio" 
                  :id="option.value" 
                  :value="option.value" 
                  v-model="formData.liberty_ventures_industry" 
                />
                <span class="radio-button">
                  <span class="radio-key">{{ option.key }}</span> {{ option.label }}
                  <span class="checkmark">&#10003;</span>
                </span>
              </label>
            </div>
            </div>
            <div class="button-container">
              <button class="button" @click="nextStep">Next</button>
              <p class="enter-text">press Enter ↵</p>
            </div>
            <div class="link-left-container">
            <a @click="openModal('liberty_ventures_industry')" class="link-scroll">Which investors require this information?</a>
          </div>
          </div>

          <div v-if="currentStep === 26 && hasQuestionsForStep(26)" id="headquartered">

<div class="header-container">
  <h2>Where is your business incorporated?</h2>
</div>
<div class="scrollable-content">
<div class="radio-group">
  <label class="custom-radio">
    <input type="radio" value="US" v-model="formData.headquartered" />
    <span class="radio-button">
      <span class="radio-key">A</span> US
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Canada" v-model="formData.headquartered" />
    <span class="radio-button">
      <span class="radio-key">B</span> Canada
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Mexico" v-model="formData.headquartered" />
    <span class="radio-button">
      <span class="radio-key">C</span> Mexico
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Asia - East" v-model="formData.headquartered" />
    <span class="radio-button">
      <span class="radio-key">D</span> Asia - East
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Asia - India / Pakistan / Bangladesh" v-model="formData.headquartered" />
    <span class="radio-button">
      <span class="radio-key">E</span> Asia - India / Pakistan / Bangladesh
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Asia - Southeast Asia" v-model="formData.headquartered" />
    <span class="radio-button">
      <span class="radio-key">F</span> Asia - Southeast Asia
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Australia / New Zealand" v-model="formData.headquartered" />
    <span class="radio-button">
      <span class="radio-key">G</span> Australia / New Zealand
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Europe" v-model="formData.headquartered" />
    <span class="radio-button">
      <span class="radio-key">H</span> Europe
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Latin America" v-model="formData.headquartered" />
    <span class="radio-button">
      <span class="radio-key">I</span> Latin America
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Middle East" v-model="formData.headquartered" />
    <span class="radio-button">
      <span class="radio-key">J</span> Middle East
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Africa" v-model="formData.headquartered" />
    <span class="radio-button">
      <span class="radio-key">K</span> Africa
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Other" v-model="formData.headquartered" />
    <span class="radio-button">
      <span class="radio-key">L</span> Other
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
</div>
</div>

<div v-if="formData.headquartered === 'US'" class="additional-question">
  <h3>Are you a C-Corp?</h3>
  <div class="radio-group">
    <label class="custom-radio">
      <input type="radio" value="Yes" v-model="formData.is_delaware_corp" />
      <span class="radio-button">
        <span class="radio-key">A</span> Yes
        <span class="checkmark">&#10003;</span>
      </span>
    </label>
    <label class="custom-radio">
      <input type="radio" value="No" v-model="formData.is_delaware_corp" />
      <span class="radio-button">
        <span class="radio-key">B</span> No
        <span class="checkmark">&#10003;</span>
      </span>
    </label>
  </div>
</div>

<div class="button-container">
  <button class="button" @click="nextStep">Next</button>
  <p class="enter-text">press Enter ↵</p>
</div>
<div class="link-left-container">
  <a @click="openModal('headquartered')" class="link-scroll">Which investors require this information?</a>
</div>
</div>

<div v-if="currentStep === 27 && hasQuestionsForStep(27)" id="legal_structure">

<div class="header-container">
  <h2>What is the current or intended legal structure of the company?</h2>
</div>
<div class="radio-group">
  <label class="custom-radio">
    <input type="radio" id="delaware_c_corp" value="Delaware C-Corp" v-model="formData.legal_structure" />
    <span class="radio-button">
      <span class="radio-key">A</span> Delaware C-Corp
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" id="canadian_company" value="Canadian company" v-model="formData.legal_structure" />
    <span class="radio-button">
      <span class="radio-key">B</span> Canadian company
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" id="b_corp" value="B-Corp" v-model="formData.legal_structure" />
    <span class="radio-button">
      <span class="radio-key">C</span> B-Corp
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" id="pbc" value="Public Benefit Corporation (PBC)" v-model="formData.legal_structure" />
    <span class="radio-button">
      <span class="radio-key">D</span> Public Benefit Corporation (PBC)
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" id="llc" value="LLC" v-model="formData.legal_structure" />
    <span class="radio-button">
      <span class="radio-key">E</span> LLC
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" id="s_corp" value="S-Corp" v-model="formData.legal_structure" />
    <span class="radio-button">
      <span class="radio-key">F</span> S-Corp
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" id="non_profit" value="Non-profit" v-model="formData.legal_structure" />
    <span class="radio-button">
      <span class="radio-key">G</span> Non-profit
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" id="other" value="Other" v-model="formData.legal_structure" @change="checkOtherLegalStructure"/>
    <span class="radio-button">
      <span class="radio-key">H</span> Other
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <div v-if="formData.legal_structure === 'Other'">
    <input class="input-field" v-model="formData.other_legal_structure" placeholder="Please specify" />
  </div>
</div>
<div class="button-container">
  <button class="button" @click="nextStep">Next</button>
  <p class="enter-text">press Enter ↵</p>
</div>
<div class="link-left-container">
<a @click="openModal('legal_structure')" class="link-scroll">Which investors require this information?</a>
</div>
</div>

          <!-- Step 23 -->
          <div v-if="currentStep === 28 && hasQuestionsForStep(28)" id="pitch_deck">

            <div class="header-container">
              <h2 class="long-header">If you have a pitch deck that you would like to share as a link, please share it here!</h2>
            </div>
            <input class="input-field" type="url" placeholder="https://pitch.com" v-model="formData.pitch_deck" required />
            <div class="button-container">
              <button class="button" @click="nextStep">Next</button>
              <p class="enter-text">press Enter ↵</p>
            </div>
            <div class="link-left-container">
              <a @click="openModal('pitch_deck')" class="link-scroll">Which investors require this information?</a>
          </div>
          </div>

          <!-- Step 24 -->
          <div v-if="currentStep === 29 && hasQuestionsForStep(29)" id="pitch_deck_file">

            <div class="header-container">
              <h2 class="long-header">If you have a pitch deck that you would like to share as an attachment, please attach it here!</h2>
            </div>
            <div class="file-upload-container">
              <label class="custom-file-upload">
                <input type="file" @change="handlePitchDeckUpload" />
                Upload File
              </label>
              <p v-if="formData.pitch_deck_file" class="file-name">File: {{ formData.pitch_deck_file.name }} uploaded successfully.</p>
            </div>
            <div class="button-container">
              <button class="button" @click="nextStep">Next</button>
              <p class="enter-text">press Enter ↵</p>
            </div>
            <div class="link-left-container">
              <a @click="openModal('pitch_deck_file')" class="link-scroll">Which investors require this information?</a>
          </div>
          </div>

    <div v-if="currentStep === 30 && hasQuestionsForStep(30)" id="raising_round">

        <div class="header-container">
          <h2>What round are you raising?</h2>
        </div>
        <div class="radio-group">
          <label class="custom-radio">
            <input type="radio" value="Friends and Family" v-model="formData.raising_round" @change="checkBeyondSeriesA" />
            <span class="radio-button">
              <span class="radio-key">A</span> Friends and Family
              <span class="checkmark">&#10003;</span>
            </span>
          </label>
          <label class="custom-radio">
            <input type="radio" value="Angel" v-model="formData.raising_round" @change="checkBeyondSeriesA" />
            <span class="radio-button">
              <span class="radio-key">B</span> Angel
              <span class="checkmark">&#10003;</span>
            </span>
          </label>
          <label class="custom-radio">
            <input type="radio" value="Pre-Seed" v-model="formData.raising_round" @change="checkBeyondSeriesA" />
            <span class="radio-button">
              <span class="radio-key">C</span> Pre-Seed
              <span class="checkmark">&#10003;</span>
            </span>
          </label>
          <label class="custom-radio">
            <input type="radio" value="Pre-Seed extension" v-model="formData.raising_round" @change="checkBeyondSeriesA" />
            <span class="radio-button">
              <span class="radio-key">D</span> Pre-Seed extension
              <span class="checkmark">&#10003;</span>
            </span>
          </label>
          <label class="custom-radio">
            <input type="radio" value="Seed" v-model="formData.raising_round" @change="checkBeyondSeriesA" />
            <span class="radio-button">
              <span class="radio-key">E</span> Seed
              <span class="checkmark">&#10003;</span>
            </span>
          </label>
          <label class="custom-radio">
            <input type="radio" value="Seed extension" v-model="formData.raising_round" @change="checkBeyondSeriesA" />
            <span class="radio-button">
              <span class="radio-key">F</span> Seed extension
              <span class="checkmark">&#10003;</span>
            </span>
          </label>
          <label class="custom-radio">
            <input type="radio" value="Series A" v-model="formData.raising_round" @change="checkBeyondSeriesA" />
            <span class="radio-button">
              <span class="radio-key">G</span> Series A
              <span class="checkmark">&#10003;</span>
            </span>
          </label>
          <label class="custom-radio">
            <input type="radio" value="Beyond Series A" v-model="formData.raising_round" @change="checkBeyondSeriesA" />
            <span class="radio-button">
              <span class="radio-key">H</span> Beyond Series A
              <span class="checkmark">&#10003;</span>
            </span>
          </label>
        </div>

        <div v-if="formData.raising_round === 'Beyond Series A'">
          <div class="header-container">
            <h2>Please specify</h2>
          </div>
          <div class="radio-group">
            <label class="custom-radio">
              <input type="radio" value="Series B" v-model="formData.beyond_series_a_round" />
              <span class="radio-button">
                <span class="radio-key">I</span> Series B
                <span class="checkmark">&#10003;</span>
              </span>
            </label>
            <label class="custom-radio">
              <input type="radio" value="Series C" v-model="formData.beyond_series_a_round" />
              <span class="radio-button">
                <span class="radio-key">J</span> Series C
                <span class="checkmark">&#10003;</span>
              </span>
            </label>
          </div>
        </div>

        <div class="button-container">
          <button class="button" @click="nextStep">Next</button>
          <p class="enter-text">press Enter ↵</p>
        </div>
        <div class="link-left-container">
        <a @click="openModal('raising_round')" class="link-scroll">Which investors require this information?</a>
    </div>
      </div>

      <div v-if="currentStep === 31 && hasQuestionsForStep(31)" id="raising_amount">

<div class="header-container">
  <h2>How much capital have you raised all in prior rounds? (in USD)</h2>
</div>
<input class="input-field" type="text" placeholder="Type your answer here..." v-model="formData.raising_amount" required />
<div class="button-container">
  <button class="button" @click="nextStep">Next</button>
  <p class="enter-text">press Enter ↵</p>
</div>
<div class="link-left-container">
    <a @click="openModal('raising_amount')" class="link-scroll">Which investors require this information?</a>
</div>
</div>

      <div v-if="currentStep === 32 && hasQuestionsForStep(32)" id="capital_to_raise">

<div class="header-container">
  <h2 class="long-header">What is the amount of money you are looking to raise in your current round? (USD)</h2>
</div>
<p>Please provide the total round size.</p>
<input class="input-field" type="text" placeholder="Type your answer here..." v-model="formData.capital_to_raise" />
<div class="button-container">
  <button class="button" @click="nextStep">Next</button>
  <p class="enter-text">press Enter ↵</p>
</div>
<div class="link-left-container">
    <a @click="openModal('capital_to_raise')" class="link-scroll">Which investors require this information?</a>
</div>
</div>

<div v-if="currentStep === 33 && hasQuestionsForStep(33)" id="earning_revenue">

  <div class="header-container">
    <h2>Is your startup currently earning revenue?</h2>
  </div>
  <div class="radio-group">
    <label class="custom-radio">
      <input type="radio" value="Yes" v-model="formData.earning_revenue" />
      <span class="radio-button">
        <span class="radio-key">A</span> Yes
        <span class="checkmark">&#10003;</span>
      </span>
    </label>
    <label class="custom-radio">
      <input type="radio" value="No" v-model="formData.earning_revenue" />
      <span class="radio-button">
        <span class="radio-key">B</span> No
        <span class="checkmark">&#10003;</span>
      </span>
    </label>
  </div>
  <div class="button-container">
    <button class="button" @click="nextStep">Next</button>
    <p class="enter-text">press Enter ↵</p>
  </div>
  <div class="link-left-container">
        <a @click="openModal('earning_revenue')" class="link-scroll">Which investors require this information?</a>
    </div>
</div>


<div v-if="currentStep === 34 && hasQuestionsForStep(34)" id="earning_amount">

  <div class="header-container">
    <h2 class="long-header">Approximately how much revenue are you earning per month (in USD)?</h2>
  </div>
  <div class="radio-group">
    <label class="custom-radio">
      <input type="radio" value="1-$999" v-model="formData.earning_amount" />
      <span class="radio-button">
        <span class="radio-key">A</span> $0 - $999
        <span class="checkmark">&#10003;</span>
      </span>
    </label>
    <label class="custom-radio">
      <input type="radio" value="$1000-$4,999" v-model="formData.earning_amount" />
      <span class="radio-button">
        <span class="radio-key">B</span> $1000 - $4,999
        <span class="checkmark">&#10003;</span>
      </span>
    </label>
    <label class="custom-radio">
      <input type="radio" value="$5,000-$10,000" v-model="formData.earning_amount" />
      <span class="radio-button">
        <span class="radio-key">C</span> $5,000 - $10,000
        <span class="checkmark">&#10003;</span>
      </span>
    </label>
    <label class="custom-radio">
      <input type="radio" value="$10,001+" v-model="formData.earning_amount" />
      <span class="radio-button">
        <span class="radio-key">D</span> $10,001 +
        <span class="checkmark">&#10003;</span>
      </span>
    </label>
  </div>
  <div class="button-container">
    <button class="button" @click="nextStep">Next</button>
    <p class="enter-text">press Enter ↵</p>
  </div>
  <div class="link-left-container">
        <a @click="openModal('earning_amount')" class="link-scroll">Which investors require this information?</a>
    </div>
</div>

<div v-if="currentStep === 35 && hasQuestionsForStep(35)" id="source_of_revenue">

  <div class="header-container">
    <h2>What do you expect your main source of revenue to be?</h2>
  </div>
  <p>Please use "other" for sources you don't see below or if your business has multiple sources.</p>
  <div class="radio-group">
    <label class="custom-radio">
      <input type="radio" value="Ads / Sponsors" v-model="formData.source_of_revenue" @change="handleSourceChange" />
      <span class="radio-button">
        <span class="radio-key">A</span> Ads / Sponsors
        <span class="checkmark">&#10003;</span>
      </span>
    </label>
    <label class="custom-radio">
      <input type="radio" value="Affiliate" v-model="formData.source_of_revenue" @change="handleSourceChange" />
      <span class="radio-button">
        <span class="radio-key">B</span> Affiliate
        <span class="checkmark">&#10003;</span>
      </span>
    </label>
    <label class="custom-radio">
      <input type="radio" value="Commission (percentage of sale)" v-model="formData.source_of_revenue" @change="handleSourceChange" />
      <span class="radio-button">
        <span class="radio-key">C</span> Commission (percentage of sale)
        <span class="checkmark">&#10003;</span>
      </span>
    </label>
    <label class="custom-radio">
      <input type="radio" value="Purchases" v-model="formData.source_of_revenue" @change="handleSourceChange" />
      <span class="radio-button">
        <span class="radio-key">D</span> Purchases
        <span class="checkmark">&#10003;</span>
      </span>
    </label>
    <label class="custom-radio">
      <input type="radio" value="Subscription" v-model="formData.source_of_revenue" @change="handleSourceChange" />
      <span class="radio-button">
        <span class="radio-key">E</span> Subscription
        <span class="checkmark">&#10003;</span>
      </span>
    </label>
    <label class="custom-radio">
      <input type="radio" value="Other" v-model="formData.source_of_revenue" @change="handleSourceChange" />
      <span class="radio-button">
        <span class="radio-key">F</span> Other
        <span class="checkmark">&#10003;</span>
      </span>
    </label>
  </div>
  <div v-if="formData.source_of_revenue === 'Other'" class="other-source-input">
    <input class="input-field" v-model="formData.other_source_of_revenue" placeholder="Please specify" required />
  </div>
  <div class="button-container">
    <button class="button" @click="nextStep">Next</button>
    <p class="enter-text">press Enter ↵</p>
  </div>
  <div class="link-left-container">
        <a @click="openModal('source_of_revenue')" class="link-scroll">Which investors require this information?</a>
    </div>
</div>

<div v-if="currentStep === 36 && hasQuestionsForStep(36)" id="pre_money_valuation">

    <div class="header-container">
      <h2>What is your pre-money valuation? (in USD)</h2>
    </div>
    <input class="input-field" type="text" placeholder="Type your answer here..." v-model="formData.pre_money_valuation" />
    <div class="button-container">
      <button class="button" @click="nextStep">Next</button>
      <p class="enter-text">press Enter ↵</p>
    </div>
    <div class="link-left-container">
        <a @click="openModal('pre_money_valuation')" class="link-scroll">Which investors require this information?</a>
    </div>
</div>

<div v-if="currentStep === 37 && hasQuestionsForStep(37)" id="post_money_valuation">

    <div class="header-container">
      <h2 class="long-header">What is the post-money valuation you are looking for in your current round? (in USD)</h2>
    </div>
    <input class="input-field" type="text" placeholder="Type your answer here..." v-model="formData.post_money_valuation" />
    <div class="button-container">
      <button class="button" @click="nextStep">Next</button>
      <p class="enter-text">press Enter ↵</p>
    </div>
    <div class="link-left-container">
        <a @click="openModal('post_money_valuation')" class="link-scroll">Which investors require this information?</a>
    </div>
</div>

<div v-if="currentStep === 38 && hasQuestionsForStep(38)" id="prev_experience">

<div class="header-container">
  <h2>What is your previous entrepreneurial experience?</h2>
</div>
<div class="radio-group">
  <label class="custom-radio">
    <input type="radio" value="First startup" v-model="formData.prev_experience" />
    <span class="radio-button">
      <span class="radio-key">A</span> First company
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Second startup" v-model="formData.prev_experience" />
    <span class="radio-button">
      <span class="radio-key">B</span> Second company
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Third startup" v-model="formData.prev_experience" />
    <span class="radio-button">
      <span class="radio-key">C</span> Third company
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
  <label class="custom-radio">
    <input type="radio" value="Created more than 3 startups" v-model="formData.prev_experience" />
    <span class="radio-button">
      <span class="radio-key">D</span> Created more than 3 companies
      <span class="checkmark">&#10003;</span>
    </span>
  </label>
</div>
<div class="button-container">
  <button class="button" @click="nextStep">Next</button>
  <p class="enter-text">press Enter ↵</p>
</div>
<div class="link-left-container">
      <a @click="openModal('prev_experience')" class="link-scroll">Which investors require this information?</a>
  </div>
</div>

<div v-if="currentStep === 39 && hasQuestionsForStep(39)" id="team_description">

  <div class="header-container">
    <h2>In 2-3 sentences, why you / your team are awesome?</h2>
  </div>
  <textarea class="input-field" placeholder="Type your answer here..." v-model="formData.team_description" required></textarea>
  <div class="button-container">
    <button class="button" @click="nextStep">Next</button>
    <p class="enter-text">press Enter ↵</p>
  </div>
  <div class="link-left-container">
        <a @click="openModal('team_description')" class="link-scroll">Which investors require this information?</a>
    </div>
</div>

<div v-if="currentStep === 40 && hasQuestionsForStep(40)" id="company_linkedin">

  <div class="header-container">
    <h2>What's your company's LinkedIn?</h2>
  </div>
  <input class="input-field" type="url" placeholder="https://" v-model="formData.company_linkedin" />
  <div class="button-container">
    <button class="button" @click="nextStep">Next</button>
    <p class="enter-text">press Enter ↵</p>
  </div>
  <div class="link-left-container">
        <a @click="openModal('company_linkedin')" class="link-scroll">Which investors require this information?</a>
    </div>
</div>

<div v-if="currentStep === 41 && hasQuestionsForStep(41)" id="ceo_linkedin">

  <div class="header-container">
    <h2>Founder LinkedIn.</h2>
  </div>
  <input class="input-field" type="url" placeholder="https://" v-model="formData.ceo_linkedin" />

  <div class="header-container">
    <h2>Founder 2 LinkedIn. (Leave blank if not applicable)</h2>
  </div>
  <input class="input-field" type="url" placeholder="https://" v-model="formData.founder2_linkedin" />

  <div class="header-container">
    <h2>Founder 3 LinkedIn. (Leave blank if not applicable)</h2>
  </div>
  <input class="input-field" type="url" placeholder="https://" v-model="formData.founder3_linkedin" />

  <div class="button-container">
    <button class="button" @click="nextStep">Next</button>
    <p class="enter-text">press Enter ↵</p>
  </div>
  <div class="link-left-container">
        <a @click="openModal('ceo_linkedin')" class="link-scroll">Which investors require this information?</a>
    </div>
</div>

<div v-if="currentStep === 42 && hasQuestionsForStep(42)" id="cto_linkedin">

  <div class="header-container">
    <h2>CTO LinkedIn? (Leave blank if not applicable)</h2>
  </div>
  <input class="input-field" type="url" placeholder="https://" v-model="formData.cto_linkedin" />
  <div class="button-container">
    <button class="button" @click="nextStep">Next</button>
    <p class="enter-text">press Enter ↵</p>
  </div>
  <div class="link-left-container">
        <a @click="openModal('cto_linkedin')" class="link-scroll">Which investors require this information?</a>
    </div>
</div>

<div v-if="currentStep === 43 && hasQuestionsForStep(43)" id="linkedin_profiles">

  <div class="header-container">
    <h2>Your team's LinkedIn profiles.</h2>
  </div>
  <input class="input-field" type="url" placeholder="https://" v-model="formData.linkedin_profiles" />
  <div class="button-container">
    <button class="button" @click="nextStep">Next</button>
    <p class="enter-text">press Enter ↵</p>
  </div>
  <div class="link-left-container">
        <a @click="openModal('linkedin_profiles')" class="link-scroll">Which investors require this information?</a>
    </div>
</div>

<div v-if="currentStep === 44 && hasQuestionsForStep(44)" id="founder_video_url">

  <div class="header-container">
    <h2>Founder video URL.</h2>
  </div>
  <p>You may tell us about you/your team, what you are building, and why you are excited about it (no more than 2 minutes).</p>
  <input class="input-field" type="url" placeholder="https://" v-model="formData.founder_video_url" />
  <div class="button-container">
    <button class="button" @click="nextStep">Next</button>
    <p class="enter-text">press Enter ↵</p>
  </div>
  <div class="link-left-container">
        <a @click="openModal('founder_video_url')" class="link-scroll">Which investors require this information?</a>
    </div>
</div>

<div v-if="currentStep === 45 && hasQuestionsForStep(45)" id="team_video_upload">

  <div class="header-container">
    <h2>Founder video File.</h2>
  </div>
  <p>You may tell us about you/your team, what you are building, and why you are excited about it (no more than 2 minutes).</p>
  <div class="file-upload-container">
    <label class="custom-file-upload">
      <input type="file" @change="handleVideoUpload" />
      Upload Video
    </label>
    <p v-if="formData.founder_video_file" class="file-name">File: {{ formData.founder_video_file }} uploaded successfully.</p>
  </div>
  <div class="button-container">
    <button class="button" @click="nextStep">Next</button>
    <p class="enter-text">press Enter ↵</p>
  </div>
  <div class="link-left-container">
        <a @click="openModal('team_video_upload')" class="link-scroll">Which investors require this information?</a>
    </div>
</div>

<div v-if="currentStep === 46 && hasQuestionsForStep(46)" id="pitching_live">

  <div class="header-container">
    <h2>Would you be interested in pitching live in front of a virtual audience?</h2>
  </div>
  <ul>
    <li>- This would involve asking you a series of questions about your business</li>
    <li>- Then walking the audience through our decision-making process</li>
  </ul>
  <div class="radio-group">
    <label class="custom-radio">
      <input type="radio" value="yes" v-model="formData.pitching_live" />
      <span class="radio-button">
        <span class="radio-key">A</span> Yes
        <span class="checkmark">&#10003;</span>
      </span>
    </label>
    <label class="custom-radio">
      <input type="radio" value="no" v-model="formData.pitching_live" />
      <span class="radio-button">
        <span class="radio-key">B</span> No
        <span class="checkmark">&#10003;</span>
      </span>
    </label>
  </div>
  <div class="button-container">
    <button class="button" @click="nextStep">Next</button>
    <p class="enter-text">press Enter ↵</p>
  </div>
  <div class="link-left-container">
        <a @click="openModal('pitching_live')" class="link-scroll">Which investors require this information?</a>
    </div>
</div>

<div v-if="currentStep === 47 && hasQuestionsForStep(47)" id="share_submission">

  <div class="header-container">
    <h2>Would you like us to share your submission with other companies?</h2>
  </div>
  <p>Sometimes we meet companies that aren't a fit for us, but may be a fit for other venture firms we work with.</p>
  <div class="radio-group">
    <label class="custom-radio">
      <input type="radio" value="Yes" v-model="formData.share_submission" />
      <span class="radio-button">
        <span class="radio-key">A</span> Yes
        <span class="checkmark">&#10003;</span>
      </span>
    </label>
    <label class="custom-radio">
      <input type="radio" value="No" v-model="formData.share_submission" />
      <span class="radio-button">
        <span class="radio-key">B</span> No
        <span class="checkmark">&#10003;</span>
      </span>
    </label>
  </div>
  <div class="button-container">
    <button class="button" @click="nextStep">Next</button>
    <p class="enter-text">press Enter ↵</p>
  </div>
  <div class="link-left-container">
        <a @click="openModal('share_submission')" class="link-scroll">Which investors require this information?</a>
    </div>
</div>

<div v-if="currentStep === 48 && hasQuestionsForStep(48)" id="investors_participating">

  <div class="header-container">
    <h2>Investors participating in the current round (if any).</h2>
  </div>
  <textarea class="input-field" placeholder="Type your answer here..." v-model="formData.investors_participating" required></textarea>
  <div class="button-container">
    <button class="button" @click="nextStep">Next</button>
    <p class="enter-text">press Enter ↵</p>
  </div>
  <div class="link-left-container">
        <a @click="openModal('investors_participating')" class="link-scroll">Which investors require this information?</a>
    </div>
</div>

<div v-if="currentStep === 49 && hasQuestionsForStep(49)" id="want_us_to_know">

  <div class="header-container">
    <h2>Anything else you want investors to know?</h2>
  </div>
  <textarea class="input-field" placeholder="Type your answer here..." v-model="formData.want_us_to_know" required></textarea>
  <div class="button-container">
    <button class="button" @click="nextStep">Next</button>
    <p class="enter-text">press Enter ↵</p>
  </div>
  <div class="link-left-container">
        <a @click="openModal('want_us_to_know')" class="link-scroll">Which investors require this information?</a>
    </div>
</div>

<div v-if="currentStep === 50 && hasQuestionsForStep(50)" id="value_of_team">

  <div class="header-container">
    <h2>How do the values of your team align with those of Liberty Ventures?</h2>
  </div>
  <p>Check their website for more information on their values: https://libertyventures.xyz/values</p>
  <textarea class="input-field" placeholder="Type your answer here..." v-model="formData.value_of_team" required></textarea>
  <div class="button-container">
    <button class="button" @click="nextStep">Next</button>
    <p class="enter-text">press Enter ↵</p>
  </div>
  <div class="link-left-container">
        <a @click="openModal('value_of_team')" class="link-scroll">Which investors require this information?</a>
    </div>
</div>
<!-- Step 54: Final Step -->
<div v-if="currentStep === 51 && hasQuestionsForStep(51)" id="final_step">
  <div class="header-container">
    <h2 class="header-container-welcome-and-congrats">Congratulations! All of the information requested has been completed.</h2>
  </div>
  <p class="congrats">You may now review and edit your responses before submitting.</p>
  <ul>
  <li class="welcome-and-congrats">To review your answers, select "Review Your Answers"</li>
  <li class="welcome-and-congrats">To receive a copy of your responses via email, select "Send to my Email"</li>
  <li class="welcome-and-congrats">To submit your responses, select "Submit"</li>
</ul>
  <div class="button-container-congrats">
    <!-- Кнопка для отправки формы -->
    <button class="pink-button" @click="submitForm">Submit</button>
    
    <!-- Кнопка для открытия модального окна с проверкой ответов -->
    <button class="link-scroll" @click="openReviewModal">Review My Answers</button>
    
    <!-- Кнопка для отправки формы на email -->
    <button class="link-scroll" @click="openEmailModal">Send to My Email</button>
        <!-- Кнопка для отображения тестовой формы -->
      <button class="link-scroll" @click="openTestForm">View Yocto.vc Form</button>

<!-- Тестовая форма -->
<TestForm 
  :isOpen="isTestFormOpen" 
  :formData="formData" 
  @close="closeTestForm" 
/>
  </div>

  <!-- Модальные окна для проверки ответов -->
  <ReviewModal 
  :formData="formData" 
  :isOpen="isReviewModalOpen" 
  :selectedForms="selectedForms"
  @close="closeReviewModal" 
  @go-to-step="goToStep"
/>
  <EmailModal :formData="formData" :isOpen="isEmailModalOpen" @close="closeEmailModal" />
</div>

      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
    </transition>
    </div>
    <div class="nav-buttons-left">

      <button 
    class="nav-button" 
    @click="goToFirstStep" 
    v-if="currentStep >= 1">
    Back to Start
  </button>

   <button 
    class="nav-button" 
    @click="goToEnd" 
    v-if="hasReachedEnd && currentStep >= 2">
    Go to End
  </button>

    </div>
    <div class="nav-buttons-right">
    <!-- Кнопка "назад" неактивна на первом шаге -->
    <button
  class="nav-button"
  :disabled="currentStep === 1"
  @click="prevStep"
  v-if="currentStep > 1"
>
  ←
</button>


    <!-- Кнопка "вперед" отключена, если нет выбранных форм на первом шаге -->
    <button
      class="nav-button"
      :disabled="currentStep === 1"
      @click="nextStep"
      v-if="currentStep > 1 && currentStep < 51"
    >
      →
    </button>
    </div>
        <!-- Модальное окно -->
        <FormInfoModal
        v-if="isModalOpen"
        :isModalOpen="isModalOpen"
        :field="currentField"
        @close="closeModal"
      />
  </div>
</template>

<script>
import EmailModal from '../components/EmailModal.vue';
import FormInfoModal from '../components/FormInfoModal.vue';
import ReviewModal from '../components/ReviewModal.vue';
import FormSelector from '../components/FormSelector.vue';
import TestForm from '../components/TestForm.vue';
export default {
  components: {
    FormInfoModal,  // Регистрация компонента
    ReviewModal,
    EmailModal,
    FormSelector,
    TestForm,

  },
  data() {
    return {
      currentStep: 0,
      hasReachedEnd: false,
      selectedForms: [],
      showTitle: false,
      isModalOpen: false, // Для управления видимостью модального окна
      isTestFormOpen: false,
      currentField: '',   // Поле, для которого будет показана информация
      snapshotIndustryOptions: [
          { key: '1', value: 'Accounting', label: 'Accounting' },
          { key: '2', value: 'Airlines and Aviation', label: 'Airlines and Aviation' },
          { key: '3', value: 'Alternative Dispute Resolution', label: 'Alternative Dispute Resolution' },
          { key: '4', value: 'Alternative Medicine', label: 'Alternative Medicine' },
          { key: '5', value: 'Animation', label: 'Animation' },
          { key: '6', value: 'Apparel & Fashion', label: 'Apparel & Fashion' },
          { key: '7', value: 'Architecture & Planning', label: 'Architecture & Planning' },
          { key: '8', value: 'Arts & Crafts', label: 'Arts & Crafts' },
          { key: '9', value: 'Aviation & Aerospace', label: 'Aviation & Aerospace' },
          { key: '10', value: 'Banking', label: 'Banking' },
          { key: '11', value: 'Biotechnology', label: 'Biotechnology' },
          { key: '12', value: 'Broadcast Media', label: 'Broadcast Media' },
          { key: '13', value: 'Business Supplies & Equipment', label: 'Business Supplies & Equipment' },
          { key: '14', value: 'Capital Markets', label: 'Capital Markets' },
          { key: '15', value: 'Ceramics & Concrete', label: 'Ceramics & Concrete' },
          { key: '16', value: 'Chemicals', label: 'Chemicals' },
          { key: '17', value: 'Civic & Social Organization', label: 'Civic & Social Organization' },
          { key: '18', value: 'Commercial Real Estate', label: 'Commercial Real Estate' },
          { key: '19', value: 'Computer & Network Security', label: 'Computer & Network Security' },
          { key: '20', value: 'Computer Games', label: 'Computer Games' },
          { key: '21', value: 'Computer Hardware', label: 'Computer Hardware' },
          { key: '22', value: 'Computer Networking', label: 'Computer Networking' },
          { key: '23', value: 'Consumer Electronics', label: 'Consumer Electronics' },
          { key: '24', value: 'Consumer Services', label: 'Consumer Services' },
          { key: '25', value: 'Cosmetics', label: 'Cosmetics' },
          { key: '26', value: 'Dairy', label: 'Dairy' },
          { key: '27', value: 'Defense & Space', label: 'Defense & Space' },
          { key: '28', value: 'Electrical & Electronic Manufacturing', label: 'Electrical & Electronic Manufacturing' },
          { key: '29', value: 'Entertainment', label: 'Entertainment' },
          { key: '30', value: 'Environmental Services', label: 'Environmental Services' },
          { key: '31', value: 'Events Services', label: 'Events Services' },
          { key: '32', value: 'Executive Office', label: 'Executive Office' },
          { key: '33', value: 'Facilities Services', label: 'Facilities Services' },
          { key: '34', value: 'Farming', label: 'Farming' },
          { key: '35', value: 'Film Production', label: 'Film Production' },
          { key: '36', value: 'Finance - Banking', label: 'Finance - Banking' },
          { key: '37', value: 'Fine Art', label: 'Fine Art' },
          { key: '38', value: 'Fishery', label: 'Fishery' },
          { key: '39', value: 'Food and Beverage Retail', label: 'Food and Beverage Retail' },
          { key: '40', value: 'Food Production', label: 'Food Production' },
          { key: '41', value: 'Furniture', label: 'Furniture' },
          { key: '42', value: 'Gambling & Casinos', label: 'Gambling & Casinos' },
          { key: '43', value: 'Glass', label: 'Glass' },
          { key: '44', value: 'Government Administration', label: 'Government Administration' },
          { key: '45', value: 'Government Relations', label: 'Government Relations' },
          { key: '46', value: 'Graphic Design', label: 'Graphic Design' },
          { key: '47', value: 'Healthcare', label: 'Healthcare' },
          { key: '48', value: 'Hospitality', label: 'Hospitality' },
          { key: '49', value: 'Human Resources', label: 'Human Resources' },
          { key: '50', value: 'Import & Export', label: 'Import & Export' },
          { key: '51', value: 'Industrial Automation', label: 'Industrial Automation' },
          { key: '52', value: 'Information Technology & Services', label: 'Information Technology & Services' },
          { key: '53', value: 'Insurance', label: 'Insurance' },
          { key: '54', value: 'Investment Banking', label: 'Investment Banking' },
          { key: '55', value: 'Investment Management', label: 'Investment Management' },
          { key: '56', value: 'Judiciary', label: 'Judiciary' },
          { key: '57', value: 'Law Practice', label: 'Law Practice' },
          { key: '58', value: 'Legal Services', label: 'Legal Services' },
          { key: '59', value: 'Leisure', label: 'Leisure' },
          { key: '60', value: 'Libraries', label: 'Libraries' },
          { key: '61', value: 'Logistics', label: 'Logistics' },
          { key: '62', value: 'Luxury Goods & Jewelry', label: 'Luxury Goods & Jewelry' },
          { key: '63', value: 'Machinery', label: 'Machinery' },
          { key: '64', value: 'Management Consulting', label: 'Management Consulting' },
          { key: '65', value: 'Manufacturing', label: 'Manufacturing' },
          { key: '66', value: 'Marine Transport', label: 'Marine Transport' },
          { key: '67', value: 'Maritime', label: 'Maritime' },
          { key: '68', value: 'Media Production', label: 'Media Production' },
          { key: '69', value: 'Mechanical or Industrial Engineering', label: 'Mechanical or Industrial Engineering' },
          { key: '70', value: 'Mental Healthcare', label: 'Mental Healthcare' },
          { key: '71', value: 'Mining & Metals', label: 'Mining & Metals' },
          { key: '72', value: 'Mobile Games', label: 'Mobile Games' },
          { key: '73', value: 'Motion Pictures & Film', label: 'Motion Pictures & Film' },
          { key: '74', value: 'Museums & Institutions', label: 'Museums & Institutions' },
          { key: '75', value: 'Music', label: 'Music' },
          { key: '76', value: 'Newspapers', label: 'Newspapers' },
          { key: '77', value: 'Non-Profit Organization Management', label: 'Non-Profit Organization Management' },
          { key: '78', value: 'Online Media', label: 'Online Media' },
          { key: '79', value: 'Outsourcing/Offshoring', label: 'Outsourcing/Offshoring' },
          { key: '80', value: 'Packaging & Containers', label: 'Packaging & Containers' },
          { key: '81', value: 'Paper & Forest Products', label: 'Paper & Forest Products' },
          { key: '82', value: 'Performing Arts', label: 'Performing Arts' },
          { key: '83', value: 'Philanthropy', label: 'Philanthropy' },
          { key: '84', value: 'Photography', label: 'Photography' },
          { key: '85', value: 'Plastics', label: 'Plastics' },
          { key: '86', value: 'Political Organization', label: 'Political Organization' },
          { key: '87', value: 'Printing', label: 'Printing' },
          { key: '88', value: 'Professional Training & Coaching', label: 'Professional Training & Coaching' },
          { key: '89', value: 'Program Development', label: 'Program Development' },
          { key: '90', value: 'Public Policy', label: 'Public Policy' },
          { key: '91', value: 'Public Relations & Communications', label: 'Public Relations & Communications' },
          { key: '92', value: 'Publishing', label: 'Publishing' },
          { key: '93', value: 'Railroad Manufacture', label: 'Railroad Manufacture' },
          { key: '94', value: 'Ranching', label: 'Ranching' },
          { key: '95', value: 'Recreational Facilities & Services', label: 'Recreational Facilities & Services' },
          { key: '96', value: 'Religious Institutions', label: 'Religious Institutions' },
          { key: '97', value: 'Research Services', label: 'Research Services' },
          { key: '98', value: 'Restaurants', label: 'Restaurants' },
          { key: '99', value: 'Retail', label: 'Retail' },
          { key: '100', value: 'Security & Investigations', label: 'Security & Investigations' },
          { key: '101', value: 'Semiconductors', label: 'Semiconductors' },
          { key: '102', value: 'Shipbuilding', label: 'Shipbuilding' },
          { key: '103', value: 'Smart Cities/Urban Tech', label: 'Smart Cities/Urban Tech' },
          { key: '104', value: 'Sports', label: 'Sports' },
          { key: '105', value: 'Staffing & Recruiting', label: 'Staffing & Recruiting' },
          { key: '106', value: 'Supermarkets', label: 'Supermarkets' },
          { key: '107', value: 'Telecommunications', label: 'Telecommunications' },
          { key: '108', value: 'Textiles', label: 'Textiles' },
          { key: '109', value: 'Think Tanks', label: 'Think Tanks' },
          { key: '110', value: 'Tobacco', label: 'Tobacco' },
          { key: '111', value: 'Translation & Localization', label: 'Translation & Localization' },
          { key: '112', value: 'Transportation/Trucking/Railroad', label: 'Transportation/Trucking/Railroad' },
          { key: '113', value: 'Utilities', label: 'Utilities' },
          { key: '114', value: 'Venture Capital & Private Equity', label: 'Venture Capital & Private Equity' },
          { key: '115', value: 'Veterinary', label: 'Veterinary' },
          { key: '116', value: 'Warehousing', label: 'Warehousing' },
          { key: '117', value: 'Wholesale', label: 'Wholesale' },
          { key: '118', value: 'Wine and Spirits', label: 'Wine and Spirits' },
          { key: '119', value: 'Wireless', label: 'Wireless' },
          { key: '120', value: 'Writing & Editing', label: 'Writing & Editing' }
        ],

                industryOptions: [
          { key: '1', value: '3D printing', label: '3D printing' },
          { key: '2', value: 'AdTech', label: 'AdTech' },
          { key: '3', value: 'Agtech', label: 'Agtech' },
          { key: '4', value: 'Advertising / Marketing', label: 'Advertising / Marketing' },
          { key: '5', value: 'Audiotech', label: 'Audiotech' },
          { key: '6', value: 'Autonomous cars', label: 'Autonomous cars' },
          { key: '7', value: 'AI / ML', label: 'AI / ML' },
          { key: '8', value: 'Augmented reality (AR)', label: 'Augmented reality (AR)' },
          { key: '9', value: 'Beauty / Fashion Products', label: 'Beauty / Fashion Products' },
          { key: '10', value: 'B2B Marketplace', label: 'B2B Marketplace' },
          { key: '11', value: 'B2B SaaS', label: 'B2B SaaS' },
          { key: '12', value: 'B2B payments', label: 'B2B payments' },
          { key: '13', value: 'Biotech', label: 'Biotech' },
          { key: '14', value: 'Big Data', label: 'Big Data' },
          { key: '15', value: 'Blockchain / Crypto / NFT / Web3', label: 'Blockchain / Crypto / NFT / Web3' },
          { key: '16', value: 'Cannabis', label: 'Cannabis' },
          { key: '17', value: 'Carsharing', label: 'Carsharing' },
          { key: '18', value: 'Cleantech / Climate / Sustainability', label: 'Cleantech / Climate / Sustainability' },
          { key: '19', value: 'Cloudtech and DevOps', label: 'Cloudtech and DevOps' },
          { key: '20', value: 'Communications / Collaboration / Productivity', label: 'Communications / Collaboration / Productivity' },
          { key: '21', value: 'Consumer', label: 'Consumer' },
          { key: '22', value: 'Consumer Goods', label: 'Consumer Goods' },
          { key: '23', value: 'Consumer Tech', label: 'Consumer Tech' },
          { key: '24', value: 'Construction / Materials', label: 'Construction / Materials' },
          { key: '25', value: 'Cyber Security', label: 'Cyber Security' },
          { key: '26', value: 'Data / Analytics', label: 'Data / Analytics' },
          { key: '27', value: 'Developer Tools', label: 'Developer Tools' },
          { key: '28', value: 'Digital health', label: 'Digital health' },
          { key: '29', value: 'Ecommerce Enablement', label: 'Ecommerce Enablement' },
          { key: '30', value: 'eCommerce', label: 'eCommerce' },
          { key: '31', value: 'Education / Personal and professional development', label: 'Education / Personal and professional development' },
          { key: '32', value: 'Electronics / IOT', label: 'Electronics / IOT' },
          { key: '33', value: 'Enterprise', label: 'Enterprise' },
          { key: '34', value: 'Femtech', label: 'Femtech' },
          { key: '35', value: 'Future of Work', label: 'Future of Work' },
          { key: '36', value: 'Family / Parenting / Relationships / ElderTech', label: 'Family / Parenting / Relationships / ElderTech' },
          { key: '37', value: 'Finance - banking / payments / lending', label: 'Finance - banking / payments / lending' },
          { key: '38', value: 'Finance - Insurance', label: 'Finance - Insurance' },
          { key: '39', value: 'Finance - Other', label: 'Finance - Other' },
          { key: '40', value: 'FinTech', label: 'FinTech' },
          { key: '41', value: 'Food / Beverages / agriculture', label: 'Food / Beverages / agriculture' },
          { key: '42', value: 'Gaming', label: 'Gaming' },
          { key: '43', value: 'General / Industry agnostic', label: 'General / Industry agnostic' },
          { key: '44', value: 'GovTech', label: 'GovTech' },
          { key: '45', value: 'Hardware', label: 'Hardware' },
          { key: '46', value: 'Health / Fitness / Wellness', label: 'Health / Fitness / Wellness' },
          { key: '47', value: 'Healthcare', label: 'Healthcare' },
          { key: '48', value: 'HR / hiring / employment', label: 'HR / hiring / employment' },
          { key: '49', value: 'Impact investing', label: 'Impact investing' },
          { key: '50', value: 'Industrials', label: 'Industrials' },
          { key: '51', value: 'Legal / government / regulation', label: 'Legal / government / regulation' },
          { key: '52', value: 'Longevity', label: 'Longevity' },
          { key: '53', value: 'Lifestyles of Health and Sustainability (LOHAS) and wellness', label: 'Lifestyles of Health and Sustainability (LOHAS) and wellness' },
          { key: '54', value: 'Manufacturing', label: 'Manufacturing' },
          { key: '55', value: 'MarTech', label: 'MarTech' },
          { key: '56', value: 'Medical devices', label: 'Medical devices' },
          { key: '57', value: 'Mobility / Transportation', label: 'Mobility / Transportation' },
          { key: '58', value: 'Micro-mobility', label: 'Micro-mobility' },
          { key: '59', value: 'Mobility tech', label: 'Mobility tech' },
          { key: '60', value: 'Mobile', label: 'Mobile' },
          { key: '61', value: 'Mortgage tech', label: 'Mortgage tech' },
          { key: '62', value: 'Nanotechnology', label: 'Nanotechnology' },
          { key: '63', value: 'Oil and gas', label: 'Oil and gas' },
          { key: '64', value: 'Personal and Professional Services', label: 'Personal and Professional Services' },
          { key: '65', value: 'Pets / animals', label: 'Pets / animals' },
          { key: '66', value: 'Physical infrastructure / Utilities', label: 'Physical infrastructure / Utilities' },
          { key: '67', value: 'Real Estate / Housing', label: 'Real Estate / Housing' },
          { key: '68', value: 'Robotics / drones', label: 'Robotics / drones' },
          { key: '69', value: 'Restaurant tech', label: 'Restaurant tech' },
          { key: '70', value: 'SaaS', label: 'SaaS' },
          { key: '71', value: 'Sales / Operations / Customer Service', label: 'Sales / Operations / Customer Service' },
          { key: '72', value: 'Science / deep tech', label: 'Science / deep tech' },
          { key: '73', value: 'SMB SaaS', label: 'SMB SaaS' },
          { key: '74', value: 'Social Media / Community / Networking', label: 'Social Media / Community / Networking' },
          { key: '75', value: 'Space Tech', label: 'Space Tech' },
          { key: '76', value: 'Supply Chain: Logistics / Shipping / Delivery', label: 'Supply Chain: Logistics / Shipping / Delivery' },
          { key: '77', value: 'Travel / Hospitality', label: 'Travel / Hospitality' },
          { key: '78', value: 'Vertical Saas', label: 'Vertical Saas' },
          { key: '79', value: 'Virtual reality (VR)', label: 'Virtual reality (VR)' },
          { key: '80', value: 'Wearables and quantified self', label: 'Wearables and quantified self' },
          { key: '81', value: 'Other', label: 'Other' }
        ],
        locations: [
        { key: 'A', label: 'San Francisco / Bay Area', value: 'San Francisco / Bay Area' },
        { key: 'B', label: 'New York', value: 'New York' },
        { key: 'C', label: 'Boston', value: 'Boston' },
        { key: 'F', label: 'Los Angeles', value: 'Los Angeles' },
        { key: 'G', label: 'Austin', value: 'Austin' },
        { key: 'J', label: 'Chicago', value: 'Chicago' },
        { key: 'K', label: 'Seattle', value: 'Seattle' },
        { key: 'L', label: 'Atlanta', value: 'Atlanta' },
        { key: 'H', label: 'Denver', value: 'Denver' },
        { key: 'I', label: 'Utah', value: 'Utah' },
        { key: 'M', label: 'Philadelphia', value: 'Philadelphia' },
        { key: 'D', label: 'Toronto', value: 'Toronto' },
        { key: 'E', label: 'Montreal', value: 'Montreal' },
        { key: 'N', label: 'US - Other', value: 'US - Other' },
        { key: 'O', label: 'Canada - Other', value: 'Canada - Other' },
        { key: 'P', label: 'Latin America', value: 'Latin America' },
        { key: 'Q', label: 'Europe', value: 'Europe' },
        { key: 'R', label: 'Asia - India', value: 'Asia - India' },
        { key: 'S', label: 'Asia - Other', value: 'Asia - Other' },
        { key: 'T', label: 'Africa', value: 'Africa' },
      ],
      businessModelOptions: [
        { key: 'A', value: 'B2B', label: 'B2B' },
        { key: 'B', value: 'B2C', label: 'B2C / D2C' },
        { key: 'C', value: 'B2G', label: 'B2G' },
        { key: 'D', value: 'B2B2C', label: 'B2B2C' },
        { key: 'E', value: 'C2C', label: 'C2C' },
        { key: 'F', value: 'C2B', label: 'C2B' },
        { key: 'G', value: 'P2P', label: 'P2P' },
        { key: 'H', value: 'Other', label: 'Other' }
      ],
      acquisitionOptions: [
        { key: 'A', value: 'Affiliate', label: 'Affiliate' },
        { key: 'B', value: 'Community Engagement & Referrals', label: 'Community Engagement & Referrals' },
        { key: 'C', value: 'Content Marketing', label: 'Content Marketing' },
        { key: 'D', value: 'Direct Sales', label: 'Direct Sales' },
        { key: 'E', value: 'Events', label: 'Events' },
        { key: 'F', value: 'Paid Advertisement', label: 'Paid Advertisement' },
        { key: 'G', value: 'Partnerships', label: 'Partnerships' },
        { key: 'H', value: 'SEO', label: 'SEO' },
        { key: 'I', value: 'Social Media', label: 'Social Media' },
        { key: 'J', value: 'Other', label: 'Other' }
      ],
      productOptions: [
        { key: 'A', value: 'Software - Service (SaaS)', label: 'Software - Service (SaaS)' },
        { key: 'B', value: 'Software - Marketplace / Network', label: 'Software - Marketplace / Network' },
        { key: 'C', value: 'Software - AI/ML', label: 'Software - AI/ML' },
        { key: 'D', value: 'Software - Dev Tools', label: 'Software - Dev Tools' },
        { key: 'E', value: 'Software - Infrastructure (API, cloud, etc.)', label: 'Software - Infrastructure (API, cloud, etc.)' },
        { key: 'F', value: 'Software - Other', label: 'Software - Other' },
        { key: 'G', value: 'Hardware', label: 'Hardware' },
        { key: 'H', value: 'Physical Goods', label: 'Physical Goods' },
        { key: 'I', value: 'Services', label: 'Services' },
        { key: 'J', value: 'Digital Goods / Content', label: 'Digital Goods / Content' },
        { key: 'K', value: 'Experiences', label: 'Experiences' },
        { key: 'AA', value: 'Other', label: 'Other' }
      ],
      formData: {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        relationship: '',
        other_relationship: '',
        working_full_time: '',
        full_time_duration: '',
        company_name: '',
        one_line_description: '',
        company_description: '',
        company_solution: '',
        pitch_description: '',
        target_customer: '',
        customer_acquisition: [],
        other_customer_acquisition: '',
        date_founded: '',
        product_status: '',
        active_customers: '',
        how_many_users: '',
        industry: [],
        liberty_ventures_industry: '',
        other_industry: '',
        product: [],
        other_product: '',
        business_model: [],
        other_business_model: '',
        company_website: '',
        pitch_deck: '',
        pitch_deck_file: null,
        headquartered: '',
        is_delaware_corp: '',
        customers_based: '',
        other_customers_based: '',
        specific_location: '',
        other_specific_location: '',
        legal_structure: '',
        other_legal_structure: '',
        raising_round: '',
        beyond_series_a_round: '',
        earning_amount: '',
        raising_amount: '',
        earning_revenue: '',
        source_of_revenue: '',
        other_source_of_revenue: '',
        pre_money_valuation: '',
        post_money_valuation: '',
        capital_to_raise: '',
        prev_experience: '',
        team_description: '',
        company_linkedin: '',
        ceo_linkedin: '',
        founder2_linkedin: '',
        founder3_linkedin: '',
        cto_linkedin: '',
        linkedin_profiles: '',
        founder_video_url: '',
        founder_video_file: null,
        vision: '',
        pitching_live: '',
        share_submission: '',
        investors_participating: '',
        want_us_to_know: '',
        value_of_team: '',
      },
      successMessage: '',
      errorMessage: '',
      isEmailModalOpen: false, // Управляет отображением окна email
      isReviewModalOpen: false, // Управляет отображением окна обзора
    };
  },
  methods: {
    getStepId(stepNumber) {
  const stepIds = {
    2: 'first_name',
    3: 'email',
    4: 'phone_number',
    5: 'specific_location',
    6: 'company_name',
    7: 'date_founded',
    8: 'relationship',
    9: 'working_full_time',
    10: 'one_line_description',
    11: 'company_description',
    12: 'company_solution',
    13: 'pitch_description',
    14: 'target_customer',
    15: 'customer_acquisition',
    16: 'product_selection',
    17: 'product_status',
    18: 'active_customers',
    19: 'how_many_users',
    20: 'business_model',
    21: 'customers_based',
    22: 'vision',
    23: 'company_website',
    24: 'industry_selection',
    25: 'liberty_ventures_industry',
    26: 'headquartered',
    27: 'legal_structure',
    28: 'pitch_deck',
    29: 'pitch_deck_file',
    30: 'raising_round',
    31: 'raising_amount',
    32: 'capital_to_raise',
    33: 'earning_revenue',
    34: 'earning_amount',
    35: 'source_of_revenue',
    36: 'pre_money_valuation',
    37: 'post_money_valuation',
    38: 'prev_experience',
    39: 'team_description',
    40: 'company_linkedin',
    41: 'ceo_linkedin',
    42: 'cto_linkedin',
    43: 'linkedin_profiles',
    44: 'founder_video_url',
    45: 'team_video_upload',
    46: 'pitching_live',
    47: 'share_submission',
    48: 'investors_participating',
    49: 'want_us_to_know',
    50: 'value_of_team',
    51: 'final_step',
  };

  return stepIds[stepNumber];
},
  handleFormSelection(forms) {
      this.selectedForms = forms.map(form => form.name); // Сохраняем выбранные формы
      console.log('Selected forms in parent:', this.selectedForms);
    },
    goToStep(stepNumber) {
  console.log(`Navigating to step: ${stepNumber}`);
  this.currentStep = stepNumber;

  this.$nextTick(() => {
    setTimeout(() => {
      const stepId = this.getStepId(stepNumber);
      const targetElement = document.getElementById(stepId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } 
    }, 300);
  });
},

  hasQuestionsForStep(stepNumber) {
    const stepInvestors = {
      0: ['2048 Ventures', 'Boost Ventures', 'Everywhere Ventures', 'Hustle Fund', 'Incisive Ventures', 'Liberty Ventures', 'Path Ventures', 'Precursor Ventures', 'Spatial Capital', 'Wischoff Ventures'],
      1: ['2048 Ventures', 'Boost Ventures', 'Everywhere Ventures', 'Hustle Fund', 'Incisive Ventures', 'Liberty Ventures', 'Path Ventures', 'Precursor Ventures', 'Spatial Capital', 'Wischoff Ventures'],
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
      43: ['Boost Ventures'],
      44: ['2048 Ventures', 'Path Ventures'],
      45: ['Boost Ventures'],
      46: ['Hustle Fund'],
      47: ['Hustle Fund', 'Incisive Ventures'],
      48: ['Hustle Fund', 'Incisive Ventures'],
      49: ['Hustle Fund', 'Incisive Ventures'],
      50: ['Liberty Ventures'],
      51: ['2048 Ventures', 'Boost Ventures', 'Everywhere Ventures', 'Hustle Fund', 'Incisive Ventures', 'Liberty Ventures', 'Path Ventures', 'Precursor Ventures', 'Spatial Capital', 'Wischoff Ventures'] // Доступен для всех форм
    };

    // Проверяем, есть ли инвесторы для текущего шага
    return this.selectedForms.some(form => stepInvestors[stepNumber]?.includes(form));
  },

  async saveField(fieldName, fieldValue) {
  const formData = {
    device_id: localStorage.getItem('device_id'), // Используем только device_id
    [fieldName]: fieldValue, // Сохраняем только указанное поле
  };

  console.log('Сохранение поля формы:', { fieldName, fieldValue, formData });

  try {
    const response = await fetch('http://test.yocto.vc/api/form-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();

    if (!response.ok) {
      console.error('Ошибка при сохранении поля формы:', result.message);
      throw new Error(result.message || 'Failed to save form field');
    }

    console.log('Поле формы успешно сохранено:', result);
  } catch (error) {
    console.error('Ошибка при сохранении поля формы:', error);
  }
},

  openTestForm() {
      this.isTestFormOpen = true;
    },
    closeTestForm() {
      this.isTestFormOpen = false;
    },
  
    openEmailModal() {
      this.isEmailModalOpen = true; // Открыть окно email
    },
    closeEmailModal() {
      this.isEmailModalOpen = false; // Закрыть окно email
    },
    openReviewModal() {
      this.isReviewModalOpen = true;
    },
    closeReviewModal() {
      this.isReviewModalOpen = false;
    },
    handleCustomersBasedChange() {
    // Если значение 'Other' не выбрано, сбрасываем значение поля other_customers_based
    if (this.formData.customers_based !== 'Other') {
      this.formData.other_customers_based = '';
    }
  },
  goToFirstStep() {
  let firstStep = 0;
  
  // Проходим по шагам, начиная со 2-го, чтобы найти первый валидный шаг
  for (let step = 0; step <= 51; step++) {
    if (this.hasQuestionsForStep(step)) {
      firstStep = step; // Как только найден шаг с вопросами, назначаем его как первый
      break; // Прерываем цикл, так как нашли нужный шаг
    }
  }

  this.currentStep = firstStep; // Переходим на первый валидный шаг
  this.scrollToCurrentStep(); // Прокручиваем страницу к найденному шагу
},
    openModal(field) {
      this.currentField = field;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    checkOtherLocation() {
    if (!['US - Other', 'Canada - Other', 'Asia - Other'].includes(this.formData.specific_location)) {
      this.formData.other_location = '';
      }
    },
    handleIndustryChange() {
        // Если значение 'Other' не выбрано, сбрасываем значение поля other_industry
        if (!this.formData.industry.includes('Other')) {
            this.formData.other_industry = '';
        }
        if (this.formData.industry.length > 3) {
            this.formData.industry.pop();
        }
    },
    prepareIndustryData() {
        // Формируем строку из выбранных значений индустрий
        this.formData.industryString = this.formData.industry.join('; ');
    },
    prepareCustomerAcquisitionData() {
            // Формируем строку из выбранных значений перед отправкой на сервер
            this.formData.customer_acquisitionString = this.formData.customer_acquisition.join('; ');
        },
    handleProductChange() {
        // Если значение 'Other' не выбрано, сбрасываем значение поля other_product
        if (!this.formData.product.includes('Other')) {
            this.formData.other_product = '';
        }
    },
    handleSourceChange() {
        // Если значение 'Other' не выбрано, сбрасываем значение поля other_product
        if (!this.formData.source_of_revenue.includes('Other')) {
            this.formData.other_source_of_revenue = '';
        }
    },
    prepareProductData() {
        // Формируем строку из выбранных значений перед отправкой на сервер
        this.formData.productString = this.formData.product.join('; ');
    },
    prepareBusinessModelData() {
        this.formData.businessModelString = this.formData.business_model.join('; ');
    },
    showAdditionalQuestion() {
      this.showFullTimeDuration = true;
    },
    hideAdditionalQuestion() {
      this.showFullTimeDuration = false;
      this.formData.full_time_duration = ''; 
    },
    handleCustomerAcquisitionChange() {
      if (!this.formData.customer_acquisition.includes('Other')) {
        this.formData.other_customer_acquisition = '';
      }
    },
    checkOtherRelationship() {
      if (this.formData.relationship !== 'Other') {
        this.formData.other_relationship = '';
      }
    },
    checkOtherBusinessModel() {
   if (!this.formData.business_model.includes('Other')) {
     this.formData.other_business_model = '';
   }
},
    isDisabled(value, array, maxSelections = 2) {
        // Блокируем остальные поля, если выбрано уже максимальное количество вариантов
        return (
            array.length >= maxSelections &&
            !array.includes(value)
        );
    },
    isIndustryDisabled(value, array) {
        // Для поля "industry" устанавливаем максимум 3 выбора
        return array.length >= 3 && !array.includes(value);
    },
    isCustomerAcquisitionDisabled(value, array) {
            // Для поля "customer acquisition" устанавливаем максимум 3 выбора
            return this.isDisabled(value, array, 3);
        },
    checkOtherLegalStructure() {
    if (!this.formData.legal_structure.includes('Other')) {
      this.formData.other_legal_structure = '';
    }
  },
    checkIndustry() {
      if (this.formData.industry !== 'FinTech') {
        this.formData.fintech_type = '';
      }
    },
    checkBeyondSeriesA() {
      if (this.formData.raising_round !== 'Beyond Series A') {
        this.formData.beyond_series_a_round = '';
      }
    },
    handleVideoUpload(event) {
      const file = event.target.files[0];
      this.formData.founder_video_file = file;
    },
    handlePitchDeckUpload(event) {
      const file = event.target.files[0];
      this.formData.pitch_deck_file = file;
    },
   async nextStep() {
  // Если мы на шаге 0, всегда переходим на шаг 1
  if (this.currentStep === 0) {
    this.currentStep = 1;
    this.scrollToCurrentStep();
    return;
  }

// Сохраняем данные текущего шага перед переходом на следующий шаг
if (this.currentStep === 2) {
  // Step 2: Сохранение имени и фамилии
  await this.saveField('first_name', this.formData.first_name);
  await this.saveField('last_name', this.formData.last_name);
} else if (this.currentStep === 3) {
  // Step 3: Сохранение email
  await this.saveField('email', this.formData.email);
} else if (this.currentStep === 4) {
  // Step 4: Сохранение номера телефона
  await this.saveField('phone_number', this.formData.phone_number);
} else if (this.currentStep === 5) {
  // Step 5: Сохранение местоположения
  await this.saveField('specific_location', this.formData.specific_location);
  if (this.formData.specific_location === 'Other') {
    await this.saveField('other_specific_location', this.formData.other_specific_location);
  }
} else if (this.currentStep === 6) {
  // Step 6: Сохранение имени компании
  await this.saveField('company_name', this.formData.company_name);
} else if (this.currentStep === 7) {
  // Step 7: Сохранение даты основания компании
  await this.saveField('date_founded', this.formData.date_founded);
} else if (this.currentStep === 8) {
  // Step 8: Сохранение отношения к компании
  await this.saveField('relationship', this.formData.relationship);
  if (this.formData.relationship === 'Other') {
    await this.saveField('other_relationship', this.formData.other_relationship);
  }
} else if (this.currentStep === 9) {
  // Step 9: Полная занятость
  await this.saveField('working_full_time', this.formData.working_full_time);
  if (this.formData.working_full_time === 'Yes') {
    await this.saveField('full_time_duration', this.formData.full_time_duration);
  }
} else if (this.currentStep === 10) {
  // Step 10: Однострочное описание компании
  await this.saveField('one_line_description', this.formData.one_line_description);
} else if (this.currentStep === 11) {
  // Step 11: Описание проблемы
  await this.saveField('company_description', this.formData.company_description);
} else if (this.currentStep === 12) {
  // Step 12: Описание решения
  await this.saveField('company_solution', this.formData.company_solution);
} else if (this.currentStep === 13) {
  await this.saveField('pitch_description', this.formData.pitch_description);
} else if (this.currentStep === 14) {
  await this.saveField('target_customer', this.formData.target_customer);
} else if (this.currentStep === 15) {
  this.prepareCustomerAcquisitionData();
  await this.saveField('customer_acquisition', this.formData.customer_acquisition);
  if (this.formData.customer_acquisition.includes('Other')) {
    await this.saveField('other_customer_acquisition', this.formData.other_customer_acquisition);
  }
} else if (this.currentStep === 16) {
  this.prepareProductData();
  await this.saveField('product', this.formData.product);
  if (this.formData.product.includes('Other')) {
    await this.saveField('other_product', this.formData.other_product);
  }
} else if (this.currentStep === 17) {
  await this.saveField('product_status', this.formData.product_status);
} else if (this.currentStep === 18) {
  await this.saveField('active_customers', this.formData.active_customers);
} else if (this.currentStep === 19) {
  await this.saveField('how_many_users', this.formData.how_many_users);
} else if (this.currentStep === 20) {
  this.prepareBusinessModelData();
  await this.saveField('business_model', this.formData.business_model);
  if (this.formData.business_model.includes('Other')) {
    await this.saveField('other_business_model', this.formData.other_business_model);
  }
} else if (this.currentStep === 21) {
  await this.saveField('customers_based', this.formData.customers_based);
  if (this.formData.customers_based === 'Other') {
    await this.saveField('other_customers_based', this.formData.other_customers_based);
  }
} else if (this.currentStep === 22) {
  await this.saveField('vision', this.formData.vision);
} else if (this.currentStep === 23) {
  await this.saveField('company_website', this.formData.company_website);
} else if (this.currentStep === 24) {
  this.prepareIndustryData();
  await this.saveField('industry', this.formData.industry);
  if (this.formData.industry.includes('Other')) {
    await this.saveField('other_industry', this.formData.other_industry);
  }
} else if (this.currentStep === 25) {
  await this.saveField('liberty_ventures_industry', this.formData.liberty_ventures_industry);
} else if (this.currentStep === 26) {
  await this.saveField('headquartered', this.formData.headquartered);
  if (this.formData.headquartered === 'US') {
    await this.saveField('is_delaware_corp', this.formData.is_delaware_corp);
  }
} else if (this.currentStep === 27) {
  await this.saveField('legal_structure', this.formData.legal_structure);
  if (this.formData.legal_structure === 'Other') {
    await this.saveField('other_legal_structure', this.formData.other_legal_structure);
  }
} else if (this.currentStep === 28) {
  await this.saveField('pitch_deck', this.formData.pitch_deck);
} else if (this.currentStep === 29) {
  await this.saveField('pitch_deck_file', this.formData.pitch_deck_file);
} else if (this.currentStep === 30) {
  await this.saveField('raising_round', this.formData.raising_round);
  if (this.formData.raising_round === 'Beyond Series A') {
    await this.saveField('beyond_series_a_round', this.formData.beyond_series_a_round);
  }
} else if (this.currentStep === 31) {
  await this.saveField('raising_amount', this.formData.raising_amount);
} else if (this.currentStep === 32) {
  await this.saveField('capital_to_raise', this.formData.capital_to_raise);
} else if (this.currentStep === 33) {
  await this.saveField('earning_revenue', this.formData.earning_revenue);
} else if (this.currentStep === 34) {
  await this.saveField('earning_amount', this.formData.earning_amount);
} else if (this.currentStep === 35) {
  await this.saveField('source_of_revenue', this.formData.source_of_revenue);
  if (this.formData.source_of_revenue === 'Other') {
    await this.saveField('other_source_of_revenue', this.formData.other_source_of_revenue);
  }
} else if (this.currentStep === 36) {
  await this.saveField('pre_money_valuation', this.formData.pre_money_valuation);
} else if (this.currentStep === 37) {
  await this.saveField('post_money_valuation', this.formData.post_money_valuation);
} else if (this.currentStep === 38) {
  await this.saveField('prev_experience', this.formData.prev_experience);
} else if (this.currentStep === 39) {
  await this.saveField('team_description', this.formData.team_description);
} else if (this.currentStep === 40) {
  await this.saveField('company_linkedin', this.formData.company_linkedin);
} else if (this.currentStep === 41) {
  await this.saveField('ceo_linkedin', this.formData.ceo_linkedin);
  await this.saveField('founder2_linkedin', this.formData.founder2_linkedin);
  await this.saveField('founder3_linkedin', this.formData.founder3_linkedin);
} else if (this.currentStep === 42) {
  await this.saveField('cto_linkedin', this.formData.cto_linkedin);
} else if (this.currentStep === 43) {
  await this.saveField('linkedin_profiles', this.formData.linkedin_profiles);
} else if (this.currentStep === 44) {
  await this.saveField('founder_video_url', this.formData.founder_video_url);
} else if (this.currentStep === 45) {
  await this.saveField('founder_video_file', this.formData.founder_video_file);
} else if (this.currentStep === 46) {
  await this.saveField('pitching_live', this.formData.pitching_live);
} else if (this.currentStep === 47) {
  await this.saveField('share_submission', this.formData.share_submission);
} else if (this.currentStep === 48) {
  await this.saveField('investors_participating', this.formData.investors_participating);
} else if (this.currentStep === 49) {
  await this.saveField('want_us_to_know', this.formData.want_us_to_know);
} else if (this.currentStep === 50) {
  await this.saveField('value_of_team', this.formData.value_of_team);
}


  // Иначе выполняем стандартную логику для пропуска шагов без вопросов
  let nextValidStep = this.currentStep + 1;

  // Проверяем и пропускаем шаги, для которых нет вопросов
  while (nextValidStep <= 51 && !this.hasQuestionsForStep(nextValidStep)) {
    nextValidStep++;
  }

  if (nextValidStep <= 51) {
    this.currentStep = nextValidStep;
    setTimeout(() => {
      this.scrollToCurrentStep();
    }, 500); // Задержка в 500 мс для гарантированного рендеринга
    if (this.currentStep === 51) {
      this.hasReachedEnd = true;
    }
    this.showTitle = this.currentStep !== 1;
  }
},

    // Метод для загрузки данных формы из базы данных
    async loadFormData(device_id) {
  console.log('Загрузка данных формы для device_id:', device_id);

  if (!device_id) {
    console.error('device_id не передан в loadFormData.');
    return;
  }

  try {
    const response = await fetch(`http://test.yocto.vc/api/form-response/device/${device_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 404) {
      console.log('Данные для device_id не найдены, начинаем с пустой формы.');
      return;
    }

    if (!response.ok) {
      console.error('Ошибка при загрузке данных формы:', response.status);
      throw new Error('Failed to load form data');
    }

    const result = await response.json();

    console.log('Данные формы, полученные с сервера:', result);

    if (result) {
      this.formData = { ...this.formData, ...result }; // Восстанавливаем данные формы
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных формы:', error);
  }
},

    goToEnd() {
    this.currentStep = 51; // Переводим пользователя на последний шаг
    this.scrollToCurrentStep();
  },
  findSecondValidStep() {
    let secondStep = 2; // Начнем с шага 2 как с первого шага после выбора формы
    
    // Проходим по шагам, начиная со 2-го, чтобы найти второй валидный шаг
    for (let step = 2; step <= 51; step++) {
      if (this.hasQuestionsForStep(step)) {
        secondStep = step; // Назначаем найденный шаг как "второй"
        break;
      }
    }

    return secondStep; // Возвращаем второй валидный шаг
  },
  prevStep() {
  let prevValidStep = this.currentStep - 1;

  // Если текущий шаг больше второго, продолжаем проверку шагов
  if (this.currentStep > 2) {
    // Проверяем и пропускаем шаги, для которых нет вопросов
    while (prevValidStep >= 2 && !this.hasQuestionsForStep(prevValidStep)) {
      prevValidStep--;
    }
  }

  // Если после проверки шагов мы находимся на шаге 2, либо шаг 2 пропускается для инвестора, просто переходим на шаг 1 (выбор формы)
  if (prevValidStep === 1 || this.currentStep === 2) {
    this.currentStep = 1; // Возвращаемся на шаг выбора форм
    this.scrollToCurrentStep();
    return;
  }

  // Переход на предыдущий валидный шаг, если он существует
  if (prevValidStep >= 2) {
    this.currentStep = prevValidStep;
    this.scrollToCurrentStep();
  }
},
scrollToCurrentStep() {
  this.$nextTick(() => {
    setTimeout(() => {
      const stepId = this.getStepId(this.currentStep);
      const targetElement = document.getElementById(stepId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300); // 300 мс задержка
  });
},
    async submitForm() {
      if (this.formData.relationship === 'Other' && !this.formData.other_relationship) {
        this.errorMessage = 'Please specify your relationship to the company.';
        this.successMessage = '';
        return;
      }

      if (this.formData.business_model.includes('Other') && !this.formData.other_business_model) {
        this.errorMessage = 'Please specify your business model.';
        this.successMessage = '';
        return;
      }

      if (this.formData.product === 'Other' && !this.formData.other_product) {
        this.errorMessage = 'Please specify your product.';
        this.successMessage = '';
        return;
      }

      try {
        const formData = new FormData();
        for (const key in this.formData) {
          formData.append(key, this.formData[key]);
        }

        const response = await fetch('http://test.yocto.vc/api/send-forms', {
          method: 'POST',
          body: formData
    });

        if (response.ok) {
          this.successMessage = 'Form submitted successfully!';
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Failed to submit form.';
          this.successMessage = '';
        }
      } catch (error) {
        this.errorMessage = 'An error occurred while submitting the form.';
        this.successMessage = '';
      }
    },
    handleKeydown(event) {
      if (event.key === 'Enter') {
        this.nextStep();
      }
    }
  },
  mounted() {
  console.log('Компонент смонтирован. Проверка наличия device_id.');

  let deviceId = localStorage.getItem('device_id');

  if (!deviceId) {
    // Если device_id не существует, генерируем новый уникальный UUID
    deviceId = crypto.randomUUID(); // Генерация нового UUID
    localStorage.setItem('device_id', deviceId);
    console.log('Создан новый device_id:', deviceId);
  } else {
    console.log('Существующий device_id найден:', deviceId);
  }

   // Проверяем, что deviceId не равен null или undefined
   if (deviceId) {
    console.log('Текущий device_id перед загрузкой данных формы:', deviceId);
    this.loadFormData(deviceId);
  } else {
    console.error('device_id не найден после проверки localStorage.');
  }
  
    setTimeout(() => {
      this.showTitle = true;
    }, 500); // Задержка для плавного появления заголовка
    document.addEventListener('keydown', this.handleKeydown);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeydown);
  },
};
</script>

<style scoped>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #faf9f6;
  padding: 20px;
}

.step-indicator {
  font-size: 1.6em; /* Увеличим размер шрифта для индикатора шага */
  color: #ffffff;
}

.outer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Центрируем заголовок по вертикали */
  height: 100vh; /* Высота контейнера на весь экран */
  background-color: #27272D;
}
h2 {
  color: #ffffff;
  font-size: 2.7em; /* Увеличим размер шрифта заголовков */
  margin-bottom: 20px;
  font-family: Inter;
  text-align: center;
}

h3 {
  color: #ffffff;
  font-size: 1.5em; /* Увеличим размер шрифта заголовков */
  margin-bottom: 20px;
  font-family: Inter;
  margin-top: 20px;
  text-align: center;
}

.pink-button {
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

.pink-button:hover {
  background-color: #c43d6e;
}

.pink-button:focus {
  outline: none; /* Убираем рамку при нажатии */
}

.header-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px; /* Отступ между элементами */
}

.header-container-welcome-and-congrats {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px; /* Отступ между элементами */
}

.long-header {
  text-align: center; /* Центрирование текста заголовка */
  max-width: 80vw; /* Ограничиваем максимальную ширину заголовка */
  line-height: 1.3; /* Межстрочный интервал */
}

.choices {
  color: #ffffff;
  margin-bottom: 5px;
  text-align: center;
}

p {
  color: #e0e0e0;
  font-size: 1.6em; /* Увеличим размер шрифта для параграфов */
  margin-bottom: 20px;
  line-height: 1.5;
  text-align: center;
}

p.welcome-and-congrats {
  color: #e0e0e0;
  font-size: 1.6em; /* Увеличим размер шрифта для параграфов */
  margin-bottom: 20px;
  line-height: 1.5;
  text-align: left;
}

p.congrats {
  color: #e0e0e0;
  font-size: 1.6em; /* Увеличим размер шрифта для параграфов */
  margin-bottom: 20px;
  line-height: 1.5;
  text-align: left;
}


li.welcome-and-congrats {
  color: #e0e0e0;
  font-size: 1em; /* Увеличим размер шрифта для параграфов */
  line-height: 1.1;
  text-align: left;
}

.input-field {
  width: 70%; /* Увеличим ширину полей ввода */
  padding: 10px 15px; /* Увеличим внутренние отступы */
  margin: 10px auto 0; /* Увеличим внешние отступы */
  display: block;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid #e0e0e0;
  font-size: 1.5em; /* Увеличим размер шрифта */
  text-align: left;
}

.input-field:focus {
  border-bottom: 2px solid #333;
  outline: none;
}

.fixed-title {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgb(255, 207, 119);
  color: #333;
  padding: 10px 20px;
  text-align: center;
  font-size: 1.5em;
  z-index: 1;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px; /* Увеличим расстояние между кнопками */
  margin-top: 3vh; /* Увеличим отступ сверху */
  text-align: center;
}

.button-container-welcome-and-congrats {
  display: flex;
  justify-content: left;
  gap: 10px; /* Увеличим расстояние между кнопками */
  margin-top: 1.5vh; /* Увеличим отступ сверху */
  text-align: center;
}

.button-container-congrats{
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 15px; /* Увеличим расстояние между кнопками */
  margin-top: 1.5vh; /* Увеличим отступ сверху */
  text-align: center;
}

.nav-buttons-left {
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.nav-buttons-right {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.nav-button {
  color: var(--dl-color-gray-black);
  cursor: pointer;
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 18px;
  box-shadow: 5px 6px 0px 0px #000000;
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
  background-color: rgb(255, 207, 119);
}

.nav-button:hover {
  opacity: 0.5;
  background-color: rgb(218, 177, 101);
}

.success-message {
  color: #4caf50;
  font-weight: bold;
}

.error-message {
  color: #f44336;
  font-weight: bold;
}

.enter-text {
  font-size: 1.5em; /* Увеличим размер шрифта */
  color: #ffffff;
  margin-top: 10px;
}

ul {
  color: #e0e0e0;
  list-style-type: none;
  font-size: 1.6em;
  margin-bottom: 35px;
  text-align: center;
}

button:focus {
  outline: 2px solid #f0c14b;
}

.checkbox-group {
  max-width: 75%;
  max-height: 45vh;
  margin: 25px auto 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto; /* Добавляем прокрутку при переполнении */
  align-items: center;
}

.radio-group {
  max-width: 75%;
  max-height: 45vh;
  margin: 25px auto 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto; /* Добавляем прокрутку при переполнении */
  align-items: center;
}

.custom-radio {
  display: flex;
  align-items: center;
  background-color: #ffffff; /* Цвет фона по умолчанию — белый */
  padding: 4px 8px;
  border: 2px solid transparent; /* Убираем рамку */
  cursor: pointer;
  position: relative;
  width: 100%;
  transition: background-color 0.3s, border-color 0.3s; /* Плавные переходы */
}

.custom-radio:hover {
  background-color: #808080; /* Цвет при наведении мыши */
  border-color: #000; /* Цвет рамки при наведении */
}

.custom-radio input[type="radio"] {
  display: none;
}

.radio-button {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
}

.custom-checkbox {
  display: flex;
  align-items: center;
  background-color: #ffffff; /* Цвет фона по умолчанию — белый */
  padding: 4px 8px;
  border: 2px solid transparent; /* Убираем рамку */
  cursor: pointer;
  position: relative;
  width: 100%;
  transition: background-color 0.3s, border-color 0.3s; /* Плавные переходы */
}

.custom-checkbox input[type="checkbox"] {
  display: none;
}

.custom-checkbox input[type="checkbox"]:checked + .checkbox-button {
  background-color: #808080; /* Цвет фона при выборе */
  color: #ffffff; /* Цвет текста при выборе */
}

.custom-checkbox input[type="checkbox"]:checked + .checkbox-button .checkbox-key {
  background-color: #000000; /* Темный фон ключа */
  color: #ffffff; /* Белый текст для ключа */
}

.checkbox-button {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Выравниваем содержимое по левому краю */
  font-size: 16px;
  font-weight: 500;
  position: relative;
  width: 100%;
  gap: 10px; /* Добавим отступ между ключом и текстом */
}

.custom-checkbox input[type="checkbox"]:checked + .checkbox-button .checkmark {
  display: inline; /* Показываем галочку */
  color: #ffffff; /* Белая галочка */
  margin-left: auto;
}

.custom-checkbox:hover {
  background-color: #808080; /* Цвет при наведении мыши */
  border-color: #000; /* Цвет рамки при наведении */
}

.custom-checkbox:hover .checkbox-button {
  color: #000000;
}

.checkbox-key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background-color: #fff; /* Цвет фона буквы */
  margin-right: 10px;
  font-weight: bold;
  font-size: 12px;
  color: #000;
}

.custom-checkbox:hover .checkbox-key {
  background-color: #ffffff;
}

.radio-key {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background-color: #fff; /* Белый цвет ключа по умолчанию */
  margin-right: 10px;
  font-weight: bold;
  font-size: 12px;
  color: #000;
}

.custom-radio input[type="radio"]:checked + .radio-button {
  background-color: #808080; /* Серый цвет при выборе */
  border-color: transparent !important; /* Убираем рамку при выборе */
  color: #ffffff; /* Белый текст при выборе */
}

.custom-radio input[type="radio"]:checked + .radio-button .radio-key {
  background-color: #000000; /* Темный фон ключа */
  color: #ffffff; /* Белый текст для ключа */
}

.custom-radio input[type="radio"]:checked + .radio-button .checkmark {
  display: inline; /* Показываем галочку */
  color: #ffffff; /* Белая галочка */
  margin-left: auto;
}

.checkmark {
  display: none;
  margin-left: auto;
  color: #000;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.home-logo {
  position: absolute; /* Или fixed, если хотите, чтобы текст был зафиксирован на экране */
  top: 25px; /* Задайте отступ от верхней части после фиксированного заголовка */
  left: 20px; /* Отступ от левой части экрана */
  color: #ff538c;
  font-size: 52px;
  font-style: normal;
  font-weight: 600;
  text-shadow: 1px 1px 0 #000, 2px 2px 0 #000000, 3px 3px 0 #000000;
  z-index: 1; /* Этот элемент будет выше других элементов на странице */
}

.other-relationship-input {
  margin-top: 15px; /* Добавляем отступ сверху, чтобы поле не прилипало к радио-кнопкам */
}

.link-left-container {
    display: flex;
    justify-content: flex-start;
    margin-top: 10px; /* Отступ сверху */
    justify-content: center;
}

.link-scroll {
    color: white; /* Белый цвет для ссылки */
    cursor: pointer;
    text-decoration: underline; /* Подчёркивание для ссылки */
    margin-top: 15px;
}


.link-scroll:hover {
    text-decoration: none; /* Убирает подчёркивание при наведении */
}

.link-scroll:focus {
  outline: none; /* Убираем рамку при нажатии */
}

.file-upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.custom-file-upload {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  color: #e04d80;
  box-shadow: 5px 6px 0px 0px #000000;
  background-color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.custom-file-upload:hover {
  background-color: #b1b1b1;
}

.custom-file-upload input[type="file"] {
  display: none;
}

.file-name {
  margin-top: 10px;
  font-size: 14px;
  color: #ffffff;
}

/* Медиазапросы для адаптации под мобильные устройства */

/* Стили для устройств с разрешением до 1440px (для широкоформатных ноутбуков и мониторов) */
@media (max-width: 1440px) {
  .header-container {
  display: flex;
  align-items: center;
}

h2 {
  font-size: 2.2em;
  text-align: center;
}

h3 {
  font-size: 1.9em;
  text-align: center;
}

.step-indicator {
  display: none;
}

p {
  font-size: 1.4em;
  text-align: center;
}

p.welcome-and-congrats{
  font-size: 1.4em; /* Увеличим размер шрифта для параграфов */
}

p.congrats{
  font-size: 1.4em; /* Увеличим размер шрифта для параграфов */
}

li.welcome-and-congrats{
  font-size: 1.4em; /* Увеличим размер шрифта для параграфов */
}

.fixed-title {
  font-size: 1.2em; /* Уменьшаем размер шрифта */
    padding: 10px 15px; /* Уменьшаем отступы */
  }


.file-upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  text-align: center;
}

.choices {
  margin-top: 20px;
  text-align: center;
}

.input-field {
  width: 70%; 
  font-size: 1.2em;
  margin: 20px auto 0;
  display: block;
  text-align: left;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 1.5vh;
  text-align: center;
}


.nav-button {
  font-size: 20px;
  padding: 0.5rem 0.9rem;
}

ul {
  font-size: 1.2em;
  margin-bottom: 25px;
  text-align: center;
}

.link-left-container {
        justify-content: center; /* Выравниваем ссылку по центру на маленьких экранах */
    }

.custom-file-upload {
  padding: 8px 16px;
  font-size: 14px;
}

.file-name {
  font-size: 12px;
}

.radio-group,
.checkbox-group {
  max-width: 75%;
  max-height: none;
  margin: 25px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scrollable-content {
  max-height: 34vh; 
  overflow-y: auto;
  margin-top: 10px;
}

.home-logo {
  font-size: 35px;
}
}

@media (max-width: 1200px) {
  .header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  font-size: 1.9em;
  text-align: center;
}

h3 {
  font-size: 1.7em;
  text-align: center;
}

.step-indicator {
  display: none;
}

p {
  font-size: 1.2em;
  text-align: center;
}

p.welcome-and-congrats {
  font-size: 1.2em; /* Увеличим размер шрифта для параграфов */
}

p.congrats {
  font-size: 1.2em; /* Увеличим размер шрифта для параграфов */
}

li.welcome-and-congrats {
  font-size: 1.2em; /* Увеличим размер шрифта для параграфов */
}

.fixed-title {
  font-size: 1.3em; /* Уменьшаем размер шрифта */
    padding: 5px 10px; /* Уменьшаем отступы */
  }


.file-upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  text-align: center;
}

.choices {
  margin-top: 20px;
  text-align: center;
}

.input-field {
  width: 70%; 
  font-size: 1.2em;
  margin: 20px auto 0;
  display: block;
  text-align: left;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 1.5vh;
  text-align: center;
}

.nav-button {
  font-size: 16px;
  padding: 0.4rem 0.8rem;
}

ul {
  font-size: 1.1em;
  margin-bottom: 25px;
  text-align: center;
}

.link-left-container {
        justify-content: center; /* Выравниваем ссылку по центру на маленьких экранах */
    }

.custom-file-upload {
  padding: 8px 16px;
  font-size: 14px;
}

.file-name {
  font-size: 12px;
}

.radio-group,
.checkbox-group {
  max-width: 75%;
  max-height: none;
  margin: 25px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scrollable-content {
  max-height: 34vh; 
  overflow-y: auto;
  margin-top: 10px;
}

.home-logo {
  font-size: 30px;
}
}

/* Стили для устройств с разрешением до 1024px */
@media (max-width: 1024px) {

.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  font-size: 1.8em;
  text-align: center;
}

h3 {
  font-size: 1.6em;
  text-align: center;
}

.step-indicator {
  display: none;
}

p {
  font-size: 1.1em;
  text-align: center;
}

p.welcome-and-congrats {
  font-size: 1.0em; /* Увеличим размер шрифта для параграфов */
}

p.congrats {
  font-size: 1.0em; /* Увеличим размер шрифта для параграфов */
  text-align: center;
}

li.welcome-and-congrats {
  font-size: 1.0em; /* Увеличим размер шрифта для параграфов */
  text-align: center;
}


.fixed-title {
    font-size: 1.3em; /* Уменьшаем размер шрифта */
    padding: 5px 10px; /* Уменьшаем отступы */
  }


.file-upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  text-align: center;
}

.choices {
  margin-top: 20px;
  text-align: center;
}

.button, .email-button {
    font-size: 16px; /* Уменьшаем размер текста */
    padding: 0.4rem 0.8rem; /* Уменьшаем отступы */
  }

.input-field {
  width: 65%; 
  font-size: 1.3em;
  margin: 20px auto 0;
  display: block;
  text-align: left;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 1.5vh;
  text-align: center;
}

.nav-button {
  font-size: 18px;
  padding: 0.5rem 1rem;
}

ul {
  font-size: 1.2em;
  margin-bottom: 30px;
  text-align: center;
}

.link-left-container {
        justify-content: center; /* Выравниваем ссылку по центру на маленьких экранах */
    }

.custom-file-upload {
  padding: 10px 20px;
  font-size: 16px;
}

.file-name {
  font-size: 14px;
}

.radio-group,
.checkbox-group {
  max-width: 75%;
  max-height: none;
  margin: 30px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scrollable-content {
  max-height: 33vh; 
  overflow-y: auto;
  margin-top: 10px;
}

.home-logo {
  font-size: 30px;
}

.button-container-congrats{
  display: flex;
  justify-content: center;
  gap: 10px; /* Увеличим расстояние между кнопками */
  margin-top: 1.5vh; /* Увеличим отступ сверху */
  text-align: center;
}

}

@media (max-width: 768px) {

.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-container-welcome-and-congrats {
  display: flex;
  align-items: center;
}

h2 {
  font-size: 2em;
  text-align: center;
}

h3 {
  font-size: 1.5em;
  text-align: center;
}

.step-indicator {
  display: none;
}

p {
  font-size: 1.1em;
  text-align: center;
}

p.welcome-and-congrats {
  font-size: 1.1em; /* Увеличим размер шрифта для параграфов */
  text-align: center;
}

p.congrats {
  font-size: 1.1em; /* Увеличим размер шрифта для параграфов */

}


li.welcome-and-congrats {
  font-size: 1.1em; /* Увеличим размер шрифта для параграфов */
  text-align: center;
}


.fixed-title {
    font-size: 1.2em; /* Уменьшаем размер шрифта */
    padding: 3px 7px; /* Уменьшаем отступы */
  }


.file-upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  text-align: center;
}

.choices {
  margin-top: 20px;
  text-align: center;
}

.input-field {
  width: 70%; 
  font-size: 1.2em;
  margin: 20px auto 0;
  display: block;
  text-align: left;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 1.5vh;
  text-align: center;
}

.button-container-welcome-and-congrats {
  display: flex;
  justify-content: center;
  gap: 10px; /* Увеличим расстояние между кнопками */
  margin-top: 1.5vh; /* Увеличим отступ сверху */
  text-align: center;
}

.button-container-congrats{
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 10px; /* Увеличим расстояние между кнопками */
  margin-top: 1.5vh; /* Увеличим отступ сверху */
  text-align: center;
}


.nav-button {
  font-size: 16px;
  padding: 0.4rem 0.8rem;
}

ul {
  font-size: 1.1em;
  margin-bottom: 25px;
  text-align: center;
}

.home-logo {
  font-size: 30px;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
}

.link-left-container {
        justify-content: center; /* Выравниваем ссылку по центру на маленьких экранах */
    }

.custom-file-upload {
  padding: 8px 16px;
  font-size: 14px;
}

.file-name {
  font-size: 12px;
}

.radio-group,
.checkbox-group {
  max-width: 75%;
  max-height: none;
  margin: 25px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scrollable-content {
  max-height: 35vh; 
  overflow-y: auto;
  margin-top: 10px;
}
}


@media (max-width: 480px) {
  
  .header-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Выравниваем содержимое по центру */
}

  h2 {
    font-size: 1.3em;
    text-align: center;
  }

  h3 {
    font-size: 1.1em;
    text-align: center;
  }

  .step-indicator {
    display: none;
  }

  .button, .email-button {
    font-size: 14px; /* Ещё больше уменьшаем размер текста */
    padding: 0.3rem 0.6rem; /* Ещё больше уменьшаем отступы */
  }

  p {
    font-size: 0.9em;
    text-align: center;
  }

  
  p.welcome-and-congrats {
  font-size: 0.9em; /* Увеличим размер шрифта для параграфов */
}

p.congrats {
  font-size: 0.9em; /* Увеличим размер шрифта для параграфов */

}

li.welcome-and-congrats {
  font-size: 0.9em; /* Увеличим размер шрифта для параграфов */
}


  .fixed-title {
    font-size: 1.1em; /* Уменьшаем размер шрифта */
    padding: 5px 10px; /* Уменьшаем отступы */
  }


  .file-upload-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Центрируем элементы по горизонтали */
  justify-content: center; /* Центрируем элементы по вертикали, если необходимо */
  margin-top: 10px;
  text-align: center; /* Центрируем текст внутри контейнера */
}

  .choices {
    margin-top: 20px;
    text-align: center;
  }

  .input-field {
    width: 75%; /* Ограничиваем ширину до 75% */
    font-size: 1em;
    margin: 20px auto 0;
    display: block; /* Позволяет полю быть центровкой */
    text-align: left; /* Текст внутри поля начинается с левой стороны */
}

.button-container {
    display: flex; /* Включаем Flexbox */
    justify-content: center; /* Выровнять элементы по горизонтали по центру */
    gap: 10px;
    margin-top: 1.5vh;
    text-align: center; /* Это сохранит текст выравненным по центру */
}

.button-container-welcome-and-congrats {
  display: flex;
  justify-content: center;
  gap: 10px; /* Увеличим расстояние между кнопками */
  margin-top: 1.5vh; /* Увеличим отступ сверху */
  text-align: center;
}

.button-container-congrats{
  display: flex;
  justify-content: left;
  gap: 10px; /* Увеличим расстояние между кнопками */
  margin-top: 1.5vh; /* Увеличим отступ сверху */
  text-align: center;
}


  .nav-button {
    font-size: 14px;
    padding: 0.3rem 0.6rem;
  }

  ul {
    font-size: 1em;
    margin-bottom: 20px;
    text-align: center;
  }

  .home-logo {
    font-size: 30px;
    top: 6px;
    left: 50%; /* Сместить логотип на середину экрана */
    transform: translateX(-50%); /* Смещение на половину ширины логотипа, чтобы он был по центру */
    position: absolute; /* Убедитесь, что логотип всё ещё в абсолютном позиционировании */
}

.link-left-container {
        justify-content: center; /* Выравниваем ссылку по центру на маленьких экранах */
    }

  .custom-file-upload {
    padding: 6px 12px;
    font-size: 12px;
  }

  .file-name {
    font-size: 10px;
  }

  .radio-group,
  .checkbox-group {
    max-width: 75%;
    max-height: 20vh;
    margin: 20px auto 0; /* Центрирование по горизонтали */
    display: flex;
    flex-direction: column;
    align-items: center; /* Выровнять элементы внутри групп по центру */
}

.custom-checkbox {
  padding: 1px 2px;
  border: 1px solid transparent; /* Убираем рамку */
}

.custom-radio {
  padding: 1px 2px;
  border: 1px solid transparent; /* Убираем рамку */
}



.enter-text {
  font-size: 1.1em; /* Увеличим размер шрифта */
}

.scrollable-content {
  max-height: 30vh; /* Ограничиваем высоту контейнера */
  overflow-y: auto; /* Добавляем вертикальную прокрутку */
  margin-top: 10px; /* Отступ сверху, чтобы отделить от остальных элементов */
}
}
</style>
