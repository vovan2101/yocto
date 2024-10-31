<template>
    <div class="home-container">
        <router-link to="/" class="home-logo">Yocto</router-link>
    <section class="home-project">
      <div class="home-understand">
        <div class="home-content13">
          <div class="home-heading02">
            <h2 class="home-header07">About us</h2>
            <p class="home-header08">
                Yocto helps you save valuable time and focus on product development. With Yocto, the process of sending forms to investors is quick and seamless—let Yocto handle the process for you.
            </p>
          </div>
        </div>
        <img alt="image" src="/group%202415.svg" class="home-image23" />
      </div>
      </section>
    <section class="home-cards">
      <div class="home-row">
        <div class="home-card">
          <div class="home-avatar">
            <img alt="image" src="/Avatars/avatar.svg" class="home-avatar1" />
          </div>
          <div class="home-main">
            <div class="home-content01">
              <h2 class="home-header02">Select Your Target Investors</h2>
              <p class="home-description02">
                Browse our growing list of investors, or select specific ones that match your needs. Currently, Yocto includes 10 forms from seed and pre-seed investors, with more being added soon. Simply answer questions, and Yocto will deliver your responses directly.
              </p>
            </div>
            <button class="home-learn1 button">
                <router-link to="/send-form"><span class="home-text07">Connect to investors</span></router-link>
              <img alt="image" src="/Icons/arrow.svg" class="home-image02" />
            </button>
          </div>
        </div>
        <div class="home-card01">
          <div class="home-avatar2">
            <img
              alt="image"
              src="/Avatars/default-avatar.svg"
              class="home-avatar3"
            />
          </div>
          <div class="home-main1">
            <div class="home-content02">
              <h2 class="home-header03">Request New Investor Forms</h2>
              <p class="home-description03">
                Can't find a specific investor? Request their form, and we’ll add it within 48 hours. Investors interested in joining Yocto can submit their forms directly. To request new investors, use the link below.
              </p>
            </div>
            <button @click="openModal" class="home-learn2 button">
              <span class="home-text08">See investor list</span>
              <img alt="image" src="/Icons/arrow-2.svg" class="home-image03" />
            </button>
          </div>
        </div>
      </div>
        <!-- Модальное окно -->
  <div v-if="isModalOpen" class="modal" @click="outsideClick">
  <div class="modal-content">
    <span class="close" @click="closeModal">&times;</span>
    <h2 class="modal-header">Investor List</h2>

    <!-- Таблица только с названиями инвесторов -->
    <table class="investor-table">
  <tbody>
    <tr v-for="(form, index) in forms" :key="index">
      <td>
        <span class="investor-number">{{ index + 1 }}.</span>
        <a :href="form.url" target="_blank">{{ form.name }}</a>
      </td>
    </tr>
  </tbody>
</table>
<div class="modal-options">
  <!-- Ссылка для пользователя -->
  <a href="#user-request-input" class="modal-link" @click="toggleUserRequestForm">Don't see an investor with a form you are looking for?</a>
  
  <!-- Форма запроса от пользователя, которая отображается под вопросом -->
  <div v-show="isUserRequestFormVisible" class="request-form">
    <input id="user-request-input" v-model="userRequestedFormName" placeholder="Please provide the URL for the investor's submission form." />
    <button class="button small-button" @click="submitUserRequest">Submit</button>
  </div>
  
  <br>

  <!-- Ссылка для инвестора -->
  <a href="#investor-request-input" class="modal-link" @click="toggleInvestorRequestForm">Are you an investor and want to add your form?</a>

  <!-- Форма запроса от инвестора, которая отображается под вопросом -->
  <div v-show="isInvestorRequestFormVisible" class="request-form">
    <input id="investor-request-input" v-model="investorRequestedFormName" placeholder="Please provide the URL for your submission form." />
    <button class="button small-button" @click="submitInvestorRequest">Submit</button>
  </div>

  <!-- Сообщения успеха или ошибки отображаются здесь, под обеими формами -->
  <p v-if="userSuccessMessage || userErrorMessage" class="success-message">{{ userSuccessMessage || userErrorMessage }}</p>
  <p v-if="investorSuccessMessage || investorErrorMessage" class="success-message">{{ investorSuccessMessage || investorErrorMessage }}</p>
</div>
  </div>
</div>
      <!-- <div class="home-card02">
        <div class="home-avatar4">
          <img alt="image" src="/Avatars/light-avatar.svg" class="home-avatar5" />
        </div>
        <div class="home-row1">
          <div class="home-main2">
            <div class="home-content03">
              <h2 class="home-header04">Efficient Communication</h2>
              <p class="home-description04">
                Short on time? No worries. Yocto saves your answers, so you can return and finish later. Typically, investors respond within three days and will reach out directly if interested.
              </p>
            </div>
          </div>
          <img alt="image" src="/group%202262.svg" class="home-image05" />
        </div>
      </div>
    </section>
    <section class="home-collection">
      <div class="home-content04">
        <div class="home-heading01">
          <h2 class="home-header05">All investors we have</h2>
          <p class="home-header06">
            We currently have 10 investors who invest in seed and pree seed companies. If we does't have the form you are looking for or you are an investor and want to add your form to Yocto, let us know on the link below and we will add it within 48 hours.
          </p>
          <button @click="openModal" class="home-learn2 button">
              <span class="home-text09">See investor list</span>
              <img alt="image" src="/Icons/arrow.svg" class="home-image02" />
            </button>
        </div>
      </div>
      <div class="home-main3">
        <div class="home-card03">
          <div class="home-image06">
            <img
              alt="image"
              src="/Characters/precursorventures.png"
              class="home-image07"
            />
          </div>
          <div class="home-content05">
            <span class="home-caption02">Precursor Ventures</span>
            <h3 class="home-title">14 questions</h3>
          </div>
        </div>
        <div class="home-card04">
          <div class="home-image08">
            <img
              alt="image"
              src="/Characters/pathvc.png"
              class="home-image09"
            />
          </div>
          <div class="home-content06">
            <span class="home-caption03">Path Ventures</span>
            <h3 class="home-title1">9 questions</h3>
          </div>
        </div>
        <div class="home-card05">
          <div class="home-image10">
            <img
              alt="image"
              src="/Characters/hustlefund.jpeg"
              class="home-image11"
            />
          </div>
          <div class="home-content07">
            <span class="home-caption04">Hustle Fund</span>
            <h3 class="home-title2">30 questions</h3>
          </div>
        </div>
        <div class="home-card06">
          <div class="home-image12">
            <img
              alt="image"
              src="/Characters/boost.png"
              class="home-image13"
            />
          </div>
          <div class="home-content08">
            <span class="home-caption05">
              <span>Boost Ventures</span>
              <br />
            </span>
            <h3 class="home-title3">8 questions</h3>
          </div>
        </div>
        <div class="home-card07">
          <div class="home-image14">
            <img
              alt="image"
              src="/Characters/2048venture.jpg"
              class="home-image15"
            />
          </div>
          <div class="home-content09">
            <span class="home-caption06">2048 Ventures</span>
            <h3 class="home-title4">15 questions</h3>
          </div>
        </div>
        <div class="home-card08">
          <div class="home-image16">
            <img
              alt="image"
              src="/Characters/libertyventures.jpg"
              class="home-image17"
            />
          </div>
          <div class="home-content10">
            <span class="home-caption07">Liberty Ventures</span>
            <h3 class="home-title5">10 questions</h3>
          </div>
        </div>
        <div class="home-card09">
          <div class="home-image18">
            <img
              alt="image"
              src="/Characters/everywhereventures.png"
              class="home-image19"
            />
          </div>
          <div class="home-content11">
            <span class="home-caption08">Everywhere Ventures</span>
            <h3 class="home-title6">7 questions</h3>
          </div>
        </div>
        <div class="home-card10">
          <div class="home-image20">
            <img
              alt="image"
              src="/Characters/incisiveventures.jpg"
              class="home-image21"
            />
          </div>
          <div class="home-content12">
            <span class="home-caption09">Incisive Ventures</span>
            <h3 class="home-title7">21 questions</h3>
          </div>
        </div>
        <div class="home-card08">
          <div class="home-image16">
            <img
              alt="image"
              src="/Characters/wischoffventures.jpg"
              class="home-image17"
            />
          </div>
          <div class="home-content10">
            <span class="home-caption07">Wischoff Ventures</span>
            <h3 class="home-title5">8 questions</h3>
          </div>
        </div>
        <div class="home-card07">
          <div class="home-image14">
            <img
              alt="image"
              src="/Characters/spatial.jpg"
              class="home-image15"
            />
          </div>
          <div class="home-content09">
            <span class="home-caption06">Spatial Capital</span>
            <h3 class="home-title4">7 questions</h3>
          </div>
        </div> -->
    </section>
    <section class="home-project">
      <div class="home-mining">
        <img alt="image" src="/group%202422.svg" class="home-image24" />
        <div class="home-content14">
          <div class="home-heading03">
            <h2 class="home-header09">How Yocto works</h2>
            <p class="home-header10">
              <span>
                <p class="yellow-square">1. Select the investors you'd like to connect with.</p>
                    <p class="blue-square">2. Complete the Yocto questionnaire.</p>
                    <p class="black-square">3. Submit your responses.</p>
                    <p class="green-square">4. Wait for interested investors to get back to you.</p>
              </span>
              <br />
              <br />
              <br />
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- <section class="home-roadmap">
      <div class="home-heading04">
        <h2 class="home-header11">Roadmap</h2>
        <p class="home-header12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore
        </p>
      </div>
      <div class="home-list">
        <div class="home-step">
          <span class="home-caption12">01</span>
          <div class="home-heading05">
            <h2 class="home-header13">Project Launch</h2>
            <p class="home-header14">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
          </div>
          <router-link to="/survey" class="home-button6 button">Get Investments Now</router-link>
        </div>
        <div class="home-step1">
          <span class="home-caption13">02</span>
          <div class="home-heading06">
            <h2 class="home-header15">Metadata and Character</h2>
            <p class="home-header16">
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                <span v-html="raw1hn9"></span>
              </span>
              <br />
              <br />
              <span>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </span>
              <br />
            </p>
          </div>
        </div>
        <div class="home-step2">
          <span class="home-caption14">03</span>
          <div class="home-heading07">
            <h2 class="home-header17">Get Physical</h2>
            <p class="home-header18">
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                <span v-html="raws40p"></span>
              </span>
              <br />
              <br />
              <span>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </span>
              <br />
            </p>
          </div>
        </div>
        <div class="home-step3">
          <span class="home-caption15">04</span>
          <div class="home-heading08">
            <h2 class="home-header19">Private club community</h2>
            <p class="home-header20">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              <span v-html="rawxrbx"></span>
            </p>
            <div class="home-benefits">
              <div class="home-item">
                <img alt="image" src="/Icons/people.svg" class="home-image26" />
                <p class="home-header21">Consectetur adipiscing elit</p>
              </div>
              <div class="home-item1">
                <img alt="image" src="/Icons/paper.svg" class="home-image27" />
                <p class="home-header22">Consectetur adipiscing elit</p>
              </div>
              <div class="home-item2">
                <img
                  alt="image"
                  src="/Icons/checklist.svg"
                  class="home-image28"
                />
                <p class="home-header23">Consectetur adipiscing elit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->
    <section class="home-faq">
      <h2 class="home-header25">FAQ</h2>
      <div class="home-accordion">
        <div data-role="accordion-container" class="home-element accordion">
          <div class="home-content16">
            <span class="home-header26">
              Lorem ipsum dolor sit ametetur elit?
            </span>
            <span data-role="accordion-content" class="home-description05">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
              <span v-html="rawbgus"></span>
            </span>
          </div>
          <div class="home-icon-container">
            <svg
              viewBox="0 0 1024 1024"
              data-role="accordion-icon-closed"
              class="home-icon10"
            >
              <path
                d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"
              ></path></svg
            ><svg
              viewBox="0 0 1024 1024"
              data-role="accordion-icon-open"
              class="home-icon12"
            >
              <path
                d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"
              ></path>
            </svg>
          </div>
        </div>
        <div data-role="accordion-container" class="home-element1 accordion">
          <div class="home-content17">
            <span class="home-header27">
              Excepteur sint occaecat cupidatat non sunt in culpa qui officia
              deserunt mollit anim id est laborum?
            </span>
            <span data-role="accordion-content" class="home-description06">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
              <span v-html="rawkqx8"></span>
            </span>
          </div>
          <div class="home-icon-container1">
            <svg
              viewBox="0 0 1024 1024"
              data-role="accordion-icon-closed"
              class="home-icon14"
            >
              <path
                d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"
              ></path></svg
            ><svg
              viewBox="0 0 1024 1024"
              data-role="accordion-icon-open"
              class="home-icon16"
            >
              <path
                d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"
              ></path>
            </svg>
          </div>
        </div>
        <div data-role="accordion-container" class="home-element2 accordion">
          <div class="home-content18">
            <span class="home-header28">
              Tempor incididunt ut labore et dolore magna aliquat enim ad minim?
            </span>
            <span data-role="accordion-content" class="home-description07">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
              <span v-html="rawwfnp"></span>
            </span>
          </div>
          <div class="home-icon-container2">
            <svg
              viewBox="0 0 1024 1024"
              data-role="accordion-icon-closed"
              class="home-icon18"
            >
              <path
                d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"
              ></path></svg
            ><svg
              viewBox="0 0 1024 1024"
              data-role="accordion-icon-open"
              class="home-icon20"
            >
              <path
                d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"
              ></path>
            </svg>
          </div>
        </div>
        <div data-role="accordion-container" class="home-element3 accordion">
          <div class="home-content19">
            <span class="home-header29">
              Lorem ipsum dolor sit ametetur elit?
            </span>
            <span data-role="accordion-content" class="home-description08">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
              <span v-html="rawwvf2"></span>
            </span>
          </div>
          <div class="home-icon-container3">
            <svg
              viewBox="0 0 1024 1024"
              data-role="accordion-icon-closed"
              class="home-icon22"
            >
              <path
                d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"
              ></path></svg
            ><svg
              viewBox="0 0 1024 1024"
              data-role="accordion-icon-open"
              class="home-icon24"
            >
              <path
                d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"
              ></path>
            </svg>
          </div>
        </div>
        <div data-role="accordion-container" class="home-element4 accordion">
          <div class="home-content20">
            <span class="home-header30">Incididunt ut labore et dolore?</span>
            <span data-role="accordion-content" class="home-description09">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
              <span v-html="rawo84v"></span>
            </span>
          </div>
          <div class="home-icon-container4">
            <svg
              viewBox="0 0 1024 1024"
              data-role="accordion-icon-closed"
              class="home-icon26"
            >
              <path
                d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"
              ></path></svg
            ><svg
              viewBox="0 0 1024 1024"
              data-role="accordion-icon-open"
              class="home-icon28"
            >
              <path
                d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
    <!-- <section class="home-get-yours">
      <div class="home-row2">
        <div class="home-column">
          <div class="home-card11">
            <img
              alt="image"
              src="/Characters/character-9.svg"
              class="home-image30"
            />
          </div>
        </div>
        <div class="home-column1">
          <div class="home-card12">
            <img
              alt="image"
              src="/Characters/character-10.svg"
              class="home-image31"
            />
          </div>
        </div>
      </div>
      <div class="home-column2">
        <div class="home-card13">
          <div class="home-content21">
            <h2 class="home-header31">Get yours now</h2>
            <p class="home-description10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliquat enim ad
              minim veniam.
            </p>
          </div>
          <router-link to="/send-form" class="button">Connect to investors</router-link>
        </div>
      </div>
    </section> -->
    </div>
</template>

<script>
import DangerousHTML from 'dangerous-html/vue'

export default {
    name: 'about',
    props: {},
    components: {
        DangerousHTML,
    },
    data() {
        return {
            raweg1t: ' ',
            raw74xv: ' ',
            raw7y8p: ' ',
            rawz6f1: ' ',
            rawd98h: ' ',
            rawdf0n: ' ',
            rawdf0n: ' ',
            rawfwya: ' ',
            rawopgq: ' ',
            isModalOpen: false, // для управления состоянием модального окна
            isUserRequestFormVisible: false,
            isInvestorRequestFormVisible: false,
            userRequestedFormName: '',
            investorRequestedFormName: '',
            userSuccessMessage: '',
            userErrorMessage: '',
            successMessage: '',
            errorMessage: '',
            investorSuccessMessage: '',
            investorErrorMessage: '',
            successMessageTimeout: null,
            errorMessageTimeout: null,
            forms: [
                { name: "2048 Ventures", estimatedTime: 8, questions: 17, url: "https://www.2048.vc/" },
                { name: "Boost Ventures", estimatedTime: 5, questions: 11, url: "https://www.boost.vc/" },
                { name: "Everywhere Ventures", estimatedTime: 4, questions: 9, url: "https://everywhere.vc/" },
                { name: "Hustle Fund", estimatedTime: 15, questions: 31, url: "https://www.hustlefund.vc/" },
                { name: "Incisive Ventures", estimatedTime: 11, questions: 23, url: "https://incisive.vc/" },
                { name: "Liberty Ventures", estimatedTime: 5, questions: 8, url: "https://libertyventures.xyz/" },
                { name: "Path Ventures", estimatedTime: 5, questions: 10, url: "https://www.path.vc/" },
                { name: "Precursor Ventures", estimatedTime: 7, questions: 14, url: "https://precursorvc.com/" },
                { name: "Spatial Capital", estimatedTime: 3, questions: 7, url: "https://www.spatial.capital/" },
                { name: "Wischoff Ventures", estimatedTime: 4, questions: 9, url: "https://www.wischoff.com/" },
            ],
        }
    },
    created() {
  // Устанавливаем все формы по умолчанию при загрузке компонента
  this.isUserRequestFormVisible = false;
  this.isInvestorRequestFormVisible = false;
},

methods: {
    // Переключение видимости формы для пользователя
    toggleUserRequestForm() {
      this.isUserRequestFormVisible = !this.isUserRequestFormVisible;
      this.clearMessages(); // Убираем сообщения при скрытии формы
      this.isInvestorRequestFormVisible = false; // Закрываем форму для инвестора
    },
    
    // Переключение видимости формы для инвестора
    toggleInvestorRequestForm() {
      this.isInvestorRequestFormVisible = !this.isInvestorRequestFormVisible;
      this.clearMessages(); // Убираем сообщения при скрытии формы
      this.isUserRequestFormVisible = false; // Закрываем форму для пользователя
    },
    scrollToBottom() {
    // Прокручиваем только при видимой форме
    if (this.isUserRequestFormVisible || this.isInvestorRequestFormVisible) {
      this.$nextTick(() => {
        setTimeout(() => {
          const inputElement = this.$el.querySelector('#user-request-input') || this.$el.querySelector('#investor-request-input');
          if (inputElement) {
            inputElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 200);
      });
    }
  },
showUserRequestForm() {
    this.isUserRequestFormVisible = true;
    this.isInvestorRequestFormVisible = false;
  },
  showInvestorRequestForm() {
    this.isInvestorRequestFormVisible = true;
    this.isUserRequestFormVisible = false;
  },
  async submitUserRequest() {
  if (this.userRequestedFormName.trim() !== '') {
    await this.saveFormRequest('user', this.userRequestedFormName);
    this.userSuccessMessage = 'Your request has been submitted. Thank you!';
    this.userRequestedFormName = '';
    this.isUserRequestFormVisible = false;
    this.clearMessagesAfterDelay();
  } else {
    this.userErrorMessage = 'Please provide a valid URL.';
    this.clearMessagesAfterDelay();
  }
},
clearMessages() {
      this.userSuccessMessage = '';
      this.userErrorMessage = '';
      this.investorSuccessMessage = '';
      this.investorErrorMessage = '';
    },
    clearMessagesAfterDelay() {
      setTimeout(() => {
        this.clearMessages();
      }, 5000); // Сообщение исчезает через 5 секунд
    },

    async submitInvestorRequest() {
      if (this.investorRequestedFormName.trim() !== '') {
        await this.saveFormRequest('investor', this.investorRequestedFormName);
        this.investorRequestedFormName = '';
        this.isInvestorRequestFormVisible = false;
      }
    },
    async saveFormRequest(type, formName) {
  // Получаем deviceId из localStorage
  const deviceId = localStorage.getItem('device_id');

  // Если deviceId не найден, прерываем выполнение
  if (!deviceId) {
    console.error('device_id не найден при попытке отправки формы.');
    return;
  }

  const requestData = {
    device_id: deviceId, // Используем существующий или созданный device_id
    type: type,
    form_name: formName,
  };
      try {
        await fetch('http://localhost:3002/form-requests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
      } catch (error) {
        console.error('Error submitting form request:', error);
      }
    },
    openModal() {
      this.isModalOpen = true;
      document.body.classList.add('modal-open');
    },
    closeModal() {
      this.isModalOpen = false;
      document.body.classList.remove('modal-open');
    },
    outsideClick(event) {
    if (event.target === event.currentTarget) {
      this.closeModal();
      }
    }
}
}

</script>

<style scoped>

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Полупрозрачный черный фон */
  display: flex;
  justify-content: center;
  align-items: center; /* Центрирование модального окна */
}

.modal-open {
  overflow: hidden;
}

.modal-content {
  background-color: #282828; /* Темный фон для модального окна */
  border: 2px solid #888;
  width: 80%;
  max-width: 600px;
  color: #fff;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Тень для объема */
  overflow-y: auto; /* Прокрутка для содержимого */
  max-height: 60vh; /* Ограничиваем максимальную высоту до 80% высоты экрана */
  min-height: 50vh; /* Устанавливаем минимальную высоту на 50% высоты экрана */
  height: auto; /* Автоматическая высота, зависит от содержимого */
  display: flex;
  flex-direction: column; /* Располагаем элементы столбиком */
}

.close {
  color: #fff;
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 28px;
  font-weight: bold;
  transition: color 0.3s ease; /* Плавный переход цвета за 0.3 секунды */
}

.close:hover,
.close:focus {
  color: #707070; /* Тёмно-серый цвет */
  text-decoration: none;
  cursor: pointer;
}

/* Новый стиль для заголовка, аналогичный логотипу */
.modal-header {
  color: #ff538c;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  text-shadow: 1px 1px 0 #000;
  text-align: center;
  margin-bottom: 20px;
}

/* Таблица инвесторов */
.investor-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  flex-grow: 1; /* Растягиваем таблицу, чтобы она занимала все доступное пространство */
}

.investor-number {
  font-weight: bold;
  margin-right: 7px;
  color: #ffffff;
}

.modal-link {
  color: white;
  text-decoration: underline;
  font-size: 18px; /* Увеличиваем размер шрифта */
  display: block; /* Ссылки занимают всю ширину */
}

/* Добавляем отступ только под второй ссылкой */
.modal-link:nth-of-type(2) {
  margin-bottom: 10px; /* Небольшой отступ снизу */
}


.modal-link:hover {
  text-decoration: none;
}

.modal-options {
  margin: 10px 20px auto; /* Увеличиваем отступ сверху */
}

.request-form {
  margin: 15px 0;
}

.small-button {
  font-size: 14px; /* Меньший размер шрифта */
  padding: 0.3rem 0.6rem; /* Меньшие отступы */
}


.request-form input {
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
}

.request-form button {
  padding: 8px 16px;
}


.investor-number {
  font-weight: bold;
  margin-right: 7px;
  color: #ffffff;
}

.success-message {
  color: #4caf50;
  font-size: 20px
}

.error-message {
  color: #f44336;
  font-size: 20px
}

.investor-table th,
.investor-table td {
  border: 1px solid #444; /* Более темная рамка */
  padding: 20px;
  text-align: left;
  color: #ddd; /* Светлый текст */
}

.investor-table th {
  background-color: #444; /* Темный фон для заголовков */
  font-weight: bold;
  color: #fff; /* Белый цвет текста */
}

.investor-table td a {
  color: rgb(255, 207, 119);
  text-decoration: none;
}

.investor-table td a:hover {
  text-decoration: underline;
}

.investor-table tr:hover {
  background-color: #333; /* Темный фон при наведении */
}


.home-container1 {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: var(--dl-space-space-threeunits);
  justify-content: space-between;
}
.home-header01 {
  color: rgb(255, 255, 255);
  font-size: 90px;
  max-width: 80wh;
  font-style: normal;
  text-align: center;
  font-weight: 500;
  line-height: 40px;
}
.home-intro {
    max-width: 800px;
    text-align: center;
    margin-bottom: 40px;
    font-size: 1.2rem;
    color: #333;
}

.home-cards {
  gap: var(--dl-space-space-fiveunits);
  width: 100%;
  display: flex;
  max-width: 1440px;
  align-items: center;
  padding-top: var(--dl-space-space-fiveunits);
  padding-left: var(--dl-space-space-fiveunits);
  padding-right: var(--dl-space-space-fiveunits);
  flex-direction: column;
  padding-bottom: 75px;
}

.home-card {
  gap: var(--dl-space-space-twounits);
  flex: 1;
  display: flex;
  align-items: flex-start;
  padding-top: var(--dl-space-space-sixunits);
  padding-left: var(--dl-space-space-fourunits);
  padding-right: var(--dl-space-space-fiveunits);
  flex-direction: column;
  padding-bottom: var(--dl-space-space-fourunits);
  background-color: #000000;
}

.home-card01 {
  gap: var(--dl-space-space-twounits);
  flex: 1;
  display: flex;
  align-items: flex-start;
  padding-top: var(--dl-space-space-sixunits);
  padding-left: var(--dl-space-space-fourunits);
  padding-right: var(--dl-space-space-fiveunits);
  flex-direction: column;
  padding-bottom: var(--dl-space-space-fourunits);
  background-color: #FFCF77;
}

.home-card02 {
  gap: var(--dl-space-space-twounits);
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding-top: var(--dl-space-space-sixunits);
  padding-left: var(--dl-space-space-fourunits);
  padding-right: var(--dl-space-space-fiveunits);
  flex-direction: column;
  padding-bottom: var(--dl-space-space-fourunits);
  background-color: #8FA7DF;
}

.home-card03 {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-color: #ffffff;
}

.home-card04 {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-color: #ffffff;
}

.home-card05 {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-color: #ffffff;
}

.home-card06 {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-color: #ffffff;
}

.home-card07 {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-color: #ffffff;
}

.home-card08 {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-color: #ffffff;
}

.home-card09 {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-color: #ffffff;
}

.home-card10 {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-color: #ffffff;
}

.home-card11 {
  display: flex;
  padding: var(--dl-space-space-oneandhalfunits);
  align-items: center;
  flex-direction: column;
  background-color: #FFCF77;
}

.home-card12 {
  display: flex;
  padding: var(--dl-space-space-oneandhalfunits);
  align-items: center;
  flex-direction: column;
  background-color: #000000;
}

.home-card13 {
  gap: var(--dl-space-space-twounits);
  width: 100%;
  display: flex;
  padding: var(--dl-space-space-fourunits);
  align-items: flex-start;
  flex-direction: column;
  background-color: #8FA7DF;
}

.home-row {
  gap: var(--dl-space-space-fiveunits);
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
}

.home-row1 {
  gap: var(--dl-space-space-fourunits);
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: center;
}

.home-row2 {
  gap: var(--dl-space-space-threeunits);
  height: 100%;
  display: flex;
  flex-direction: row;
}

.home-avatar {
  width: 60px;
  height: 60px;
  display: flex;
  overflow: hidden;
  align-items: flex-start;
  border-radius: var(--dl-radius-radius-round);
  flex-direction: column;
  background-color: #FDEA6B;
}
.home-avatar1 {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.home-avatar2 {
  width: 60px;
  height: 60px;
  display: flex;
  overflow: hidden;
  align-items: center;
  border-radius: var(--dl-radius-radius-round);
  flex-direction: column;
  justify-content: center;
  background-color: #EC7495;
}

.home-text09 {
    color: white;
}
.home-avatar3 {
  width: 28px;
  object-fit: cover;
}
.home-avatar4 {
  width: 60px;
  height: 60px;
  display: flex;
  overflow: hidden;
  align-items: center;
  border-radius: var(--dl-radius-radius-round);
  flex-direction: column;
  justify-content: center;
  background-color: #000000;
}
.home-avatar5 {
  width: 22px;
  object-fit: cover;
}

.home-main {
  gap: var(--dl-space-space-threeunits);
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.home-main1 {
  gap: var(--dl-space-space-threeunits);
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.home-main2 {
  gap: var(--dl-space-space-threeunits);
  width: 100%;
  display: flex;
  max-width: 460px;
  align-items: flex-start;
  flex-direction: column;
}

.home-main3 {
  gap: var(--dl-space-space-twounits);
  width: 100%;
  display: grid;
  align-items: flex-start;
  flex-direction: column;
  grid-template-columns: repeat(4, 1fr);
}

.home-main4 {
  gap: var(--dl-space-space-threeunits);
  display: flex;
  align-items: center;
  flex-direction: column;
}

.home-main5 {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
}

.home-content01 {
  gap: var(--dl-space-space-unit);
  width: 100%;
  display: flex;
  max-width: 460px;
  align-items: flex-start;
  flex-direction: column;
}

.home-header02 {
  color: rgb(255, 255, 255);
  font-size: 52px;
  font-style: normal;
  font-weight: 500;
}

.home-description02 {
  color: rgba(255, 255, 255, 0.8);
  width: 100%;
  font-size: 22px;
  max-width: 400px;
  line-height: 27px;
}

.home-text07 {
  font-style: normal;
  font-weight: 500;
}

.home-image02 {
  width: 16px;
  object-fit: cover;
}

.home-content02 {
  gap: var(--dl-space-space-unit);
  width: 100%;
  display: flex;
  max-width: 460px;
  align-items: flex-start;
  flex-direction: column;
}

.home-description03 {
  color: #000000;
  width: 100%;
  font-size: 22px;
  max-width: 400px;
  line-height: 27px;
}

.home-description04 {
  color: #000000;
  width: 100%;
  font-size: 25px;
  max-width: 400px;
  line-height: 27px;
}

.home-text08 {
  font-style: normal;
  font-weight: 500;
  color: black;
}

.home-learn3 {
  gap: var(--dl-space-space-unit);
  color: #000000;
  display: flex;
  padding: 0px;
  box-shadow: none;
  align-items: center;
  padding-top: 0px;
  border-width: 0px;
  padding-left: 0px;
  padding-right: 0px;
  flex-direction: row;
  padding-bottom: 0px;
  background-color: transparent;
}

.home-collection {
  gap: var(--dl-space-space-fiveunits);
  width: 100%;
  display: flex;
  max-width: 1600px;
  align-items: flex-start;
  padding-left: var(--dl-space-space-fiveunits);
  padding-right: var(--dl-space-space-fiveunits);
  flex-direction: column;
  padding-bottom: 90px;
}

.home-learn1 {
  gap: var(--dl-space-space-unit);
  color: white;
  display: flex;
  padding: 0px;
  box-shadow: none;
  align-items: center;
  padding-top: 0px;
  border-width: 0px;
  padding-left: 0px;
  padding-right: 0px;
  flex-direction: row;
  padding-bottom: 0px;
  background-color: transparent;
}

.home-learn2 {
  gap: var(--dl-space-space-unit);
  color: #000000;
  margin-top: 40px;
  display: flex;
  padding: 0px;
  box-shadow: none;
  align-items: center;
  padding-top: 0px;
  border-width: 0px;
  padding-left: 0px;
  padding-right: 0px;
  flex-direction: row;
  padding-bottom: 0px;
  background-color: transparent;
}

.home-learn3 {
  gap: var(--dl-space-space-unit);
  color: #000000;
  display: flex;
  padding: 0px;
  box-shadow: none;
  align-items: center;
  padding-top: 0px;
  border-width: 0px;
  padding-left: 0px;
  padding-right: 0px;
  flex-direction: row;
  padding-bottom: 0px;
  background-color: transparent;
}

.home-content04 {
  gap: var(--dl-space-space-threeunits);
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.home-caption01 {
  color: #FFCF77;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.home-heading01 {
  width: 100%;
  display: flex;
  max-width: 1200px;
  align-items: flex-start;
  flex-direction: column;
}
.home-header05 {
  color: rgb(255, 207, 119);
  font-size: 72px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 1px;
}
.home-header06 {
  color: rgba(255, 255, 255, 0.8);
  font-size: 25px;
  line-height: 35px;
}
.home-main3 {
  gap: var(--dl-space-space-twounits);
  width: 100%;
  display: grid;
  align-items: flex-start;
  flex-direction: column;
  grid-template-columns: repeat(4, 1fr);
}
.home-card03 {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-color: #ffffff;
}

.home-learn {
  color: rgb(255, 255, 255);
  text-decoration: underline;
}
.home-image06 {
  width: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  padding-left: var(--dl-space-space-oneandhalfunits);
  padding-right: var(--dl-space-space-oneandhalfunits);
  flex-direction: column;
  justify-content: center;
  background-color: #FDEA6B;
}
.home-image07 {
  object-fit: cover;
}
.home-content05 {
  gap: var(--dl-space-space-halfunit);
  width: 100%;
  display: flex;
  padding: var(--dl-space-space-oneandhalfunits);
  align-items: flex-start;
  flex-direction: column;
}
.home-caption02 {
  font-style: normal;
  font-weight: 600;
}
.home-title {
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
}
.home-card04 {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-color: #ffffff;
}
.home-image08 {
  width: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  padding-left: var(--dl-space-space-oneandhalfunits);
  padding-right: var(--dl-space-space-oneandhalfunits);
  flex-direction: column;
  justify-content: center;
  background-color: #FFCF77;
}
.home-image09 {
  object-fit: cover;
}
.home-content06 {
  gap: var(--dl-space-space-halfunit);
  width: 100%;
  display: flex;
  padding: var(--dl-space-space-oneandhalfunits);
  align-items: flex-start;
  flex-direction: column;
}
.home-caption03 {
  font-style: normal;
  font-weight: 600;
}
.home-title1 {
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
}
.home-card05 {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-color: #ffffff;
}
.home-image10 {
  width: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  padding-left: var(--dl-space-space-oneandhalfunits);
  padding-right: var(--dl-space-space-oneandhalfunits);
  flex-direction: column;
  justify-content: center;
  background-color: #8FA7DF;
}
.home-image11 {
  object-fit: cover;
}
.home-content07 {
  gap: var(--dl-space-space-halfunit);
  width: 100%;
  display: flex;
  padding: var(--dl-space-space-oneandhalfunits);
  align-items: flex-start;
  flex-direction: column;
}
.home-caption04 {
  font-style: normal;
  font-weight: 600;
}
.home-title2 {
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
}
.home-card06 {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-color: #ffffff;
}
.home-image12 {
  width: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  padding-left: var(--dl-space-space-oneandhalfunits);
  padding-right: var(--dl-space-space-oneandhalfunits);
  flex-direction: column;
  justify-content: center;
  background-color: #9DDADB;
}
.home-image13 {
  object-fit: cover;
}
.home-content08 {
  gap: var(--dl-space-space-halfunit);
  width: 100%;
  display: flex;
  padding: var(--dl-space-space-oneandhalfunits);
  align-items: flex-start;
  flex-direction: column;
}
.home-caption05 {
  font-style: normal;
  font-weight: 600;
}
.home-title3 {
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
}
.home-card07 {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-color: #ffffff;
}
.home-image14 {
  width: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  padding-left: var(--dl-space-space-oneandhalfunits);
  padding-right: var(--dl-space-space-oneandhalfunits);
  flex-direction: column;
  justify-content: center;
  background-color: #9FD8E5;
}
.home-image15 {
  object-fit: cover;
}
.home-content09 {
  gap: var(--dl-space-space-halfunit);
  width: 100%;
  display: flex;
  padding: var(--dl-space-space-oneandhalfunits);
  align-items: flex-start;
  flex-direction: column;
}
.home-caption06 {
  font-style: normal;
  font-weight: 600;
}
.home-title4 {
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
}
.home-card08 {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-color: #ffffff;
}
.home-image16 {
  width: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  padding-left: var(--dl-space-space-oneandhalfunits);
  padding-right: var(--dl-space-space-oneandhalfunits);
  flex-direction: column;
  justify-content: center;
  background-color: #EC7495;
}
.home-image17 {
  object-fit: cover;
}
.home-content10 {
  gap: var(--dl-space-space-halfunit);
  width: 100%;
  display: flex;
  padding: var(--dl-space-space-oneandhalfunits);
  align-items: flex-start;
  flex-direction: column;
}
.home-caption07 {
  font-style: normal;
  font-weight: 600;
}
.home-title5 {
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
}
.home-card09 {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-color: #ffffff;
}
.home-image18 {
  width: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  padding-left: var(--dl-space-space-oneandhalfunits);
  padding-right: var(--dl-space-space-oneandhalfunits);
  flex-direction: column;
  justify-content: center;
  background-color: #FFCF77;
}
.home-image19 {
  object-fit: cover;
}
.home-content11 {
  gap: var(--dl-space-space-halfunit);
  width: 100%;
  display: flex;
  padding: var(--dl-space-space-oneandhalfunits);
  align-items: flex-start;
  flex-direction: column;
}
.home-caption08 {
  font-style: normal;
  font-weight: 600;
}
.home-title6 {
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
}
.home-card10 {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-color: #ffffff;
}
.home-image20 {
  width: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  padding-left: var(--dl-space-space-oneandhalfunits);
  padding-right: var(--dl-space-space-oneandhalfunits);
  flex-direction: column;
  justify-content: center;
  background-color: #FDEA6B;
}
.home-image21 {
  object-fit: cover;
}
.home-content12 {
  gap: var(--dl-space-space-halfunit);
  width: 100%;
  display: flex;
  padding: var(--dl-space-space-oneandhalfunits);
  align-items: flex-start;
  flex-direction: column;
}
.home-caption09 {
  font-style: normal;
  font-weight: 600;
}
.home-title7 {
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
}
.home-view2 {
  width: 100%;
  text-align: center;
}
.home-project {
  gap: 120px;
  width: 100%;
  display: flex;
  max-width: 1440px;
  align-items: center;
  padding-left: var(--dl-space-space-fiveunits);
  padding-right: var(--dl-space-space-fiveunits);
  flex-direction: column;
}
.home-content03 {
  gap: var(--dl-space-space-unit);
  width: 100%;
  display: flex;
  max-width: 460px;
  align-items: flex-start;
  flex-direction: column;
}
.home-understand {
  gap: var(--dl-space-space-fiveunits);
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-top: 100px;
  padding-bottom: 30px;
  padding-top: 30px;
}

.home-content13 {
  gap: var(--dl-space-space-threeunits);
  width: 100%;
  display: flex;
  max-width: 640px;
  align-items: flex-start;
  flex-direction: column;
}
.home-caption10 {
  color: rgb(255, 207, 119);
  font-style: normal;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.home-heading02 {
  gap: var(--dl-space-space-twounits);
  width: 100%;
  display: flex;
  max-width: 640px;
  align-items: flex-start;
  flex-direction: column;
}
.home-header07 {
  color: rgb(255, 207, 119);
  font-size: 72px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 1px;
}
.home-header08 {
  color: rgb(255, 255, 255);
  font-size: 30px;
  line-height: 38px;
}
.home-container {
  width: 100%;
  display: flex;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
  background-color: #27272D;
}
.home-view3 {
  gap: var(--dl-space-space-unit);
  width: 100%;
  display: flex;
  margin-top: var(--dl-space-space-fourunits);
  text-align: left;
  align-items: center;
  flex-direction: row;
}
.home-image22 {
  width: 25px;
  object-fit: cover;
}
.home-image23 {
  width: 480px;
  object-fit: cover;
}
.home-mining {
  gap: 130px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}
.home-image24 {
  width: 510px;
  object-fit: cover;
}
.home-image05 {
  width: 100%;
  object-fit: cover;
}
.home-content14 {
  gap: var(--dl-space-space-threeunits);
  width: 100%;
  display: flex;
  max-width: 640px;
  align-items: flex-start;
  flex-direction: column;
}
.home-caption11 {
  color: rgb(255, 207, 119);
  font-style: normal;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.home-heading03 {
  width: 100%;
  display: flex;
  max-width: 640px;
  align-items: flex-start;
  flex-direction: column;
}
.home-header09 {
  color: rgb(255, 255, 255);
  font-size: 72px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 1px;
}
.home-header10 {
  color: rgb(255, 255, 255);
  line-height: 15px;
}
.home-view4 {
  gap: var(--dl-space-space-unit);
  width: 100%;
  display: flex;
  text-align: left;
  align-items: center;
  flex-direction: row;
}
.home-image25 {
  width: 25px;
  object-fit: cover;
}
.home-roadmap {
  gap: var(--dl-space-space-fiveunits);
  width: 100%;
  display: flex;
  max-width: 1440px;
  align-items: center;
  padding-left: var(--dl-space-space-fiveunits);
  padding-right: var(--dl-space-space-fiveunits);
  flex-direction: column;
  padding-bottom: 120px;
}
.home-heading04 {
  gap: var(--dl-space-space-twounits);
  width: 100%;
  display: flex;
  max-width: 640px;
  align-items: center;
  flex-direction: column;
}
.home-header11 {
  color: rgb(255, 255, 255);
  font-size: 90px;
  max-width: 900px;
  font-style: normal;
  font-weight: 500;
  line-height: 108px;
}
.home-header12 {
  color: rgb(255, 255, 255);
  font-size: 24px;
  text-align: center;
  line-height: 36px;
}
.home-list {
  gap: 106px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding-top: var(--dl-space-space-threeunits);
  border-color: rgba(255, 255, 255, 0.3);
  padding-left: var(--dl-space-space-fiveunits);
  flex-direction: column;
  padding-bottom: var(--dl-space-space-threeunits);
  border-left-width: 1px;
}
.home-step {
  gap: var(--dl-space-space-oneandhalfunits);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.home-caption12 {
  color: rgb(255, 207, 119);
  font-style: normal;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.home-heading05 {
  gap: var(--dl-space-space-twounits);
  width: 100%;
  display: flex;
  max-width: 640px;
  align-items: flex-start;
  flex-direction: column;
}
.home-header13 {
  color: rgb(255, 255, 255);
  font-size: 72px;
  font-style: normal;
  font-weight: 500;
}
.home-header14 {
  color: rgb(255, 255, 255);
  font-size: 18px;
  line-height: 27px;
}

.home-step1 {
  gap: var(--dl-space-space-oneandhalfunits);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.home-caption13 {
  color: rgb(255, 207, 119);
  font-style: normal;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.home-heading06 {
  gap: var(--dl-space-space-twounits);
  width: 100%;
  display: flex;
  max-width: 640px;
  align-items: flex-start;
  flex-direction: column;
}
.home-header15 {
  color: rgb(255, 255, 255);
  font-size: 72px;
  font-style: normal;
  font-weight: 500;
}
.home-header16 {
  color: rgb(255, 255, 255);
  font-size: 18px;
  line-height: 27px;
}
.home-button5 {
  color: rgb(255, 255, 255);
}

.home-step2 {
  gap: var(--dl-space-space-oneandhalfunits);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.home-caption14 {
  color: rgb(255, 207, 119);
  font-style: normal;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.home-heading07 {
  gap: var(--dl-space-space-twounits);
  width: 100%;
  display: flex;
  max-width: 640px;
  align-items: flex-start;
  flex-direction: column;
}
.home-header17 {
  color: rgb(255, 255, 255);
  font-size: 72px;
  font-style: normal;
  font-weight: 500;
}
.home-header18 {
  color: rgb(255, 255, 255);
  font-size: 18px;
  line-height: 27px;
}
.home-step3 {
  gap: var(--dl-space-space-oneandhalfunits);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.home-caption15 {
  color: rgb(255, 207, 119);
  font-style: normal;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.home-heading08 {
  gap: var(--dl-space-space-twounits);
  width: 100%;
  display: flex;
  max-width: 640px;
  align-items: flex-start;
  flex-direction: column;
}
.home-header19 {
  color: rgb(255, 255, 255);
  font-size: 72px;
  font-style: normal;
  font-weight: 500;
}
.home-header20 {
  color: rgb(255, 255, 255);
  font-size: 18px;
  line-height: 27px;
}
.home-benefits {
  gap: var(--dl-space-space-unit);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.home-item {
  gap: var(--dl-space-space-unit);
  display: flex;
  align-items: center;
  flex-direction: row;
}
.home-image26 {
  width: 16px;
  object-fit: cover;
}
.home-icon02 {
  width: var(--dl-size-size-xsmall);
  height: var(--dl-size-size-xsmall);
}
.home-nav2 {
  flex: 0 0 auto;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.home-header21 {
  color: rgb(255, 255, 255);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 27px;
}
.home-item1 {
  gap: var(--dl-space-space-unit);
  display: flex;
  align-items: center;
  flex-direction: row;
}
.home-image27 {
  width: 16px;
  object-fit: cover;
}
.home-header22 {
  color: rgb(255, 255, 255);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 27px;
}
.home-item2 {
  gap: var(--dl-space-space-unit);
  display: flex;
  align-items: center;
  flex-direction: row;
}
.home-image28 {
  width: 20px;
  object-fit: cover;
}
.home-header23 {
  color: rgb(255, 255, 255);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 27px;
}
.home-join-us {
  width: 100%;
  display: flex;
  max-width: 1440px;
  align-items: center;
  padding-left: var(--dl-space-space-fiveunits);
  padding-right: var(--dl-space-space-fiveunits);
  flex-direction: column;
  padding-bottom: 160px;
}
.home-content15 {
  gap: var(--dl-space-space-twounits);
  width: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  padding-top: var(--dl-space-space-fiveunits);
  flex-direction: column;
  background-color: #FFCF77;
}
.home-btn-group {
  gap: var(--dl-space-space-fourunits);
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}
.home-main4 {
  gap: var(--dl-space-space-threeunits);
  display: flex;
  align-items: center;
  flex-direction: column;
}
.home-heading09 {
  gap: var(--dl-space-space-twounits);
  display: flex;
  align-items: center;
  flex-direction: column;
}
.home-header24 {
  font-size: 90px;
  max-width: 900px;
  font-style: normal;
  text-align: center;
  font-weight: 500;
  line-height: 108px;
}
.home-caption16 {
  font-size: 24px;
  max-width: 800px;
  line-height: 36px;
}
.home-view5 {
  background-color: #9DDADB;
}
.home-image29 {
  width: 100%;
  object-fit: cover;
}
.home-faq {
  gap: var(--dl-space-space-fiveunits);
  display: flex;
  align-items: center;
  padding-left: var(--dl-space-space-fiveunits);
  padding-right: var(--dl-space-space-fiveunits);
  flex-direction: column;
  padding-bottom: 160px;
}
.home-header25 {
  color: #ffcf77;
  font-size: 72px;
  max-width: 900px;
  font-style: normal;
  text-align: center;
  font-weight: 500;
  line-height: 108px;
}
.home-accordion {
  width: 100%;
  display: flex;
  position: relative;
  max-width: 900px;
  align-items: center;
  flex-direction: column;
}
.home-element {
  align-items: flex-start;
  padding-top: var(--dl-space-space-threeunits);
  border-color: rgba(255, 255, 255, 0.3);
  padding-bottom: var(--dl-space-space-threeunits);
  border-top-width: 1px;
}
.home-content16 {
  gap: var(--dl-space-space-oneandhalfunits);
  display: flex;
  max-width: 800px;
  align-items: flex-start;
  flex-direction: column;
}
.home-header26 {
  color: rgb(255, 255, 255);
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  padding-right: var(--dl-space-space-oneandhalfunits);
}
.home-description05 {
  color: rgb(255, 255, 255);
  font-size: 18px;
  max-width: 800px;
  line-height: 27px;
}
.home-icon-container {
  padding-top: var(--dl-space-space-halfunit);
}
.home-icon10 {
  fill: #ffffff;
  width: 16px;
  height: 16px;
  display: none;
}
.home-icon12 {
  fill: #ffffff;
  width: 16px;
  height: 16px;
}
.home-element1 {
  align-items: flex-start;
  padding-top: var(--dl-space-space-threeunits);
  border-color: rgba(255, 255, 255, 0.3);
  padding-bottom: var(--dl-space-space-threeunits);
}
.home-content17 {
  gap: var(--dl-space-space-oneandhalfunits);
  display: flex;
  max-width: 800px;
  align-items: flex-start;
  flex-direction: column;
}
.home-header27 {
  color: rgb(255, 255, 255);
  font-size: 32px;
  padding-right: var(--dl-space-space-oneandhalfunits);
}
.home-description06 {
  color: rgb(255, 255, 255);
  font-size: 18px;
  max-width: 800px;
  line-height: 27px;
}
.home-content03 {
  gap: var(--dl-space-space-unit);
  width: 100%;
  display: flex;
  max-width: 460px;
  align-items: flex-start;
  flex-direction: column;
}
.home-icon-container1 {
  padding-top: var(--dl-space-space-halfunit);
}
.home-icon14 {
  fill: #ffffff;
  width: 16px;
  height: 16px;
  display: none;
}
.home-icon16 {
  fill: #ffffff;
  width: 16px;
  height: 16px;
}
.home-element2 {
  align-items: flex-start;
  padding-top: var(--dl-space-space-threeunits);
  border-color: rgba(255, 255, 255, 0.3);
  padding-bottom: var(--dl-space-space-threeunits);
}
.home-content18 {
  gap: var(--dl-space-space-oneandhalfunits);
  display: flex;
  max-width: 800px;
  align-items: flex-start;
  flex-direction: column;
}
.home-header28 {
  color: rgb(255, 255, 255);
  font-size: 32px;
  padding-right: var(--dl-space-space-oneandhalfunits);
}
.home-description07 {
  color: rgb(255, 255, 255);
  font-size: 18px;
  max-width: 800px;
  line-height: 27px;
}
.home-icon-container2 {
  padding-top: var(--dl-space-space-halfunit);
}
.home-icon18 {
  fill: #ffffff;
  width: 16px;
  height: 16px;
  display: none;
}
.home-icon20 {
  fill: #ffffff;
  width: 16px;
  height: 16px;
}
.home-element3 {
  align-items: flex-start;
  padding-top: var(--dl-space-space-threeunits);
  border-color: rgba(255, 255, 255, 0.3);
  padding-bottom: var(--dl-space-space-threeunits);
}
.home-content19 {
  gap: var(--dl-space-space-oneandhalfunits);
  display: flex;
  max-width: 800px;
  align-items: flex-start;
  flex-direction: column;
}
.home-header29 {
  color: rgb(255, 255, 255);
  font-size: 32px;
  padding-right: var(--dl-space-space-oneandhalfunits);
}
.home-description08 {
  color: rgb(255, 255, 255);
  font-size: 18px;
  max-width: 800px;
  line-height: 27px;
}
.home-icon-container3 {
  padding-top: var(--dl-space-space-halfunit);
}
.home-icon22 {
  fill: #ffffff;
  width: 16px;
  height: 16px;
  display: none;
}
.home-icon24 {
  fill: #ffffff;
  width: 16px;
  height: 16px;
}
.home-element4 {
  align-items: flex-start;
  padding-top: var(--dl-space-space-threeunits);
  border-color: rgba(255, 255, 255, 0.3);
  padding-bottom: var(--dl-space-space-threeunits);
}
.home-content20 {
  gap: var(--dl-space-space-oneandhalfunits);
  display: flex;
  max-width: 800px;
  align-items: flex-start;
  flex-direction: column;
}
.home-header30 {
  color: rgb(255, 255, 255);
  font-size: 32px;
  padding-right: var(--dl-space-space-oneandhalfunits);
}
.home-description09 {
  color: rgb(255, 255, 255);
  font-size: 18px;
  max-width: 800px;
  line-height: 27px;
}
.home-icon-container4 {
  padding-top: var(--dl-space-space-halfunit);
}
.home-icon26 {
  fill: #ffffff;
  width: 16px;
  height: 16px;
  display: none;
}

.yellow-square {
    color: #ffcf77; /* Matches the yellow square */
    font-size: 30px;
  line-height: 40px;
  font-weight: 800;
}

.blue-square {
    color: #8fa7df; /* Matches the blue square */
    font-size: 30px;
  line-height: 40px;
  font-weight: 800;
}

.black-square {
    color: #000; /* Matches the black square */
    font-size: 30px;
  line-height: 40px;
  font-weight: 800;
}

.green-square {
    color: #78e185; /* Matches the green square */
    font-size: 30px;
  line-height: 40px;
  font-weight: 800;
}
.home-icon28 {
  fill: #ffffff;
  width: 16px;
  height: 16px;
}
.home-get-yours {
  gap: var(--dl-space-space-threeunits);
  width: 100%;
  height: 555px;
  display: flex;
  max-width: 1440px;
  padding-left: var(--dl-space-space-fiveunits);
  padding-right: var(--dl-space-space-fiveunits);
  flex-direction: row;
}
.home-row2 {
  gap: var(--dl-space-space-threeunits);
  height: 100%;
  display: flex;
  flex-direction: row;
}
.home-column {
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.home-card11 {
  display: flex;
  padding: var(--dl-space-space-oneandhalfunits);
  align-items: center;
  flex-direction: column;
  background-color: #FFCF77;
}
.home-image30 {
  width: 240px;
  object-fit: cover;
}
.home-column1 {
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-end;
}
.home-card12 {
  display: flex;
  padding: var(--dl-space-space-oneandhalfunits);
  align-items: center;
  flex-direction: column;
  background-color: #000000;
}
.home-image31 {
  width: 240px;
  object-fit: cover;
}
.home-column2 {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.home-card13 {
  gap: var(--dl-space-space-twounits);
  width: 100%;
  display: flex;
  padding: var(--dl-space-space-fourunits);
  align-items: flex-start;
  flex-direction: column;
  background-color: #8FA7DF;
}
.home-content21 {
  gap: var(--dl-space-space-unit);
  width: 100%;
  display: flex;
  max-width: 460px;
  align-items: flex-start;
  flex-direction: column;
}
.home-header31 {
  color: rgb(0, 0, 0);
  font-size: 52px;
  font-style: normal;
  font-weight: 500;
}
.home-description10 {
  color: rgb(0, 0, 0);
  width: 100%;
  font-size: 18px;
  max-width: 500px;
  line-height: 27px;
}
.home-button7 {
  margin-top: var(--dl-space-space-oneandhalfunits);
}
.home-footer {
  gap: var(--dl-space-space-threeunits);
  width: 100%;
  display: flex;
  position: relative;
  max-width: 1440px;
  align-items: flex-start;
  padding-top: 120px;
  padding-left: var(--dl-space-space-fiveunits);
  padding-right: var(--dl-space-space-fiveunits);
  flex-direction: column;
  padding-bottom: var(--dl-space-space-threeunits);
}
.home-main5 {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
}
.home-branding {
  gap: var(--dl-space-space-threeunits);
  display: flex;
  max-width: 600px;
  align-items: flex-start;
  flex-direction: column;
}
.home-heading10 {
  gap: var(--dl-space-space-threeunits);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.home-logo2 {
  color: rgb(255, 255, 255);
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
}
.home-caption17 {
  color: rgb(255, 255, 255);
  font-size: 18px;
  line-height: 27px;
}
.home-socials1 {
  gap: var(--dl-space-space-unit);
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}
.home-twitter1 {
  text-decoration: none;
}
.home-image32 {
  width: 100px;
  object-fit: cover;
}
.home-discord1 {
  text-decoration: none;
}
.home-image33 {
  width: 100px;
  object-fit: cover;
}
.home-links1 {
  gap: 120px;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
}
.home-list1 {
  gap: var(--dl-space-space-threeunits);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.home-heading11 {
  color: rgb(255, 255, 255);
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
}
.home-items {
  gap: var(--dl-space-space-oneandhalfunits);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.home-link02 {
  color: rgb(255, 255, 255);
}
.home-link03 {
  color: rgb(255, 255, 255);
}
.home-link04 {
  color: rgb(255, 255, 255);
}
.home-link05 {
  color: rgb(255, 255, 255);
}
.home-list2 {
  gap: var(--dl-space-space-threeunits);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.home-heading12 {
  color: rgb(255, 255, 255);
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
}
.home-items1 {
  gap: var(--dl-space-space-oneandhalfunits);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.home-link06 {
  color: rgb(255, 255, 255);
}
.home-link07 {
  color: rgb(255, 255, 255);
}
.home-link08 {
  color: rgb(255, 255, 255);
}
.home-link09 {
  color: rgb(255, 255, 255);
}
.home-link10 {
  color: rgb(255, 255, 255);
}
.home-socials2 {
  gap: var(--dl-space-space-unit);
  display: none;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}
.home-twitter2 {
  text-decoration: none;
}
.home-image34 {
  width: 100px;
  object-fit: cover;
}
.home-discord2 {
  text-decoration: none;
}
.home-image35 {
  width: 100px;
  object-fit: cover;
}
.home-copyright {
  color: rgb(255, 255, 255);
  font-size: 12px;
}
.home-container5 {
  display: contents;
}
.home-logo {
  color: #ff538c;
  font-size: 72px;
  font-style: normal;
  margin-top: 80px;
  font-weight: 600;
  text-shadow: 1px 1px 0 #000, 2px 2px 0 #000000, 3px 3px 0 #000000;
}

.home-logo1 {
  color: #ff538c;
  font-size: 52px;
  font-style: normal;
  font-weight: 600;
  text-shadow: 1px 1px 0 #000, 2px 2px 0 #000000, 3px 3px 0 #000000;
}

.home-caption {
  color: rgb(255, 255, 255);
  font-size: 30px; /* Увеличенный размер шрифта */
  text-align: center;
  line-height: 1.2; /* Коррекция межстрочного расстояния */
  margin: 0 auto;
}

.home-header {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.home-navbar {
  width: 100%;
  display: flex;
  position: relative;
  max-width: 1440px;
  align-items: center;
  padding-top: var(--dl-space-space-threeunits);
  padding-left: var(--dl-space-space-fiveunits);
  padding-right: var(--dl-space-space-fiveunits);
  padding-bottom: var(--dl-space-space-threeunits);
  justify-content: space-between;
}

.home-desktop-menu {
  display: flex;
}

.home-nav {
  gap: var(--dl-space-space-twounits);
  flex: 0 0 auto;
  color: #ffffff;
  display: flex;
  align-items: center;
  flex-direction: row;
}

.home-learn {
  color: rgb(255, 255, 255);
  text-decoration: underline;
}
.home-icon {
  width: var(--dl-size-size-xsmall);
  height: var(--dl-size-size-xsmall);
}
.home-mobile-menu {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  display: flex;
  padding: 32px;
  z-index: 100;
  position: fixed;
  transform: translateX(100%);
  transition: 0.5s;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
}

.home-nav1 {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.home-menu-close {
  display: flex;
  align-items: center;
  justify-content: center;
}
@media(max-width: 1400px) {
    .home-row {
    flex-direction: column;
  }

  .home-get-yours {
    height: auto;
    align-items: center;
    flex-direction: column;
  }

  .home-card {
    width: 100%;
  }

  .home-card01 {
    width: 100%;
  }

  .home-card11 {
    width: 100%;
    aspect-ratio: 0.85;
    justify-content: center;
  }

  .home-card12 {
    width: 100%;
    aspect-ratio: 0.85;
  }

  .home-row1 {
    flex-direction: column;
  }
  

  .home-row2 {
    gap: var(--dl-space-space-threeunits);
    width: 100%;
    height: 555px;
    align-items: center;
    justify-content: center;
  }

  .home-main3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media(max-width: 1100px) {
  .home-caption {
    white-space: normal;
  }

  .home-header01 {
    font-size: 73px;
    max-width: 90%;
    line-height: 70px;
  }
}

@media(max-width: 991px) {
  .home-desktop-menu {
    display: none;
  }
  .home-btn-group {
    display: none;
  }
  .home-burger-menu {
    display: flex;
  }

  .home-header01 {
    font-size: 55px;
    line-height: 62px;
  }

  .home-caption {
    white-space: normal;
  }
  .home-button6 {
    display: flex;
    padding: var(--dl-space-space-unit);
    flex-direction: row;
  }
  .modal-header {
  font-size: 35px;
}
.modal-content {
    width: 90%;
    max-width: 550px;
  }

  .home-header01 {
    font-size: 36px;
    max-width: 90%;
    line-height: 43px;
  }

  .investor-table th,
  .investor-table td {
    padding: 20px;
    font-size: 14px;
  }

  .home-row {
    flex-direction: column;
  }
  .home-card {
    width: 100%;
  }
  .home-card01 {
    width: 100%;
  }
  .home-row1 {
    flex-direction: column;
  }
  .home-main3 {
    grid-template-columns: repeat(2, 1fr);
  }
  .home-project {
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
    padding-bottom: var(--dl-space-space-sixunits);
  }
  .home-understand {
    align-items: center;
    flex-direction: column;
  }
  .home-mining {
    flex-direction: column-reverse;
  }
  .home-heading09 {
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
  }
  .home-caption16 {
    text-align: center;
  }
  .home-get-yours {
    height: auto;
    align-items: center;
    flex-direction: column;
  }
  .home-row2 {
    gap: var(--dl-space-space-threeunits);
    width: 100%;
    height: 555px;
    align-items: center;
    justify-content: center;
  }
  .home-column {
    flex: 1;
    align-items: flex-start;
  }
  .home-card11 {
    width: 100%;
    aspect-ratio: 0.85;
    justify-content: center;
  }
  .home-column1 {
    flex: 1;
    align-items: flex-end;
  }
  .home-card12 {
    width: 100%;
    aspect-ratio: 0.85;
  }
  .home-column2 {
    width: 100%;
  }
}


@media(max-width: 767px) {
    .home-cards {
    padding-top: var(--dl-space-space-threeunits);
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
    padding-bottom: var(--dl-space-space-fourunits);
  }
  .home-card {
    gap: var(--dl-space-space-oneandhalfunits);
    padding-top: var(--dl-space-space-threeunits);
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
    padding-bottom: var(--dl-space-space-threeunits);
  }

  .home-card01 {
    gap: var(--dl-space-space-oneandhalfunits);
    padding-top: var(--dl-space-space-threeunits);
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
    padding-bottom: var(--dl-space-space-threeunits);
  }

  .home-card02 {
    gap: var(--dl-space-space-oneandhalfunits);
    padding-top: var(--dl-space-space-threeunits);
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
    padding-bottom: var(--dl-space-space-oneandhalfunits);
  }

  .home-card11 {
    padding: var(--dl-space-space-unit);
  }
  .home-image30 {
    width: 100%;
  }
  .home-card12 {
    padding: var(--dl-space-space-unit);
  }

  .home-card13 {
    gap: var(--dl-space-space-threeunits);
    align-items: center;
    padding-top: var(--dl-space-space-threeunits);
    padding-left: var(--dl-space-space-unit);
    padding-right: var(--dl-space-space-unit);
    padding-bottom: var(--dl-space-space-threeunits);
  }
  .home-row1 {
    gap: var(--dl-space-space-twounits);
  }

  .home-row2 {
    gap: var(--dl-space-space-oneandhalfunits);
    height: 555px;
  }

  .home-main {
    gap: var(--dl-space-space-oneandhalfunits);
  }

  .home-main1 {
    gap: var(--dl-space-space-oneandhalfunits);
  }
  .home-main2 {
    gap: var(--dl-space-space-oneandhalfunits);
  }
  .home-main4 {
    gap: var(--dl-space-space-twounits);
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
  }
  .home-main5 {
    gap: var(--dl-space-space-threeunits);
    flex-direction: column;
    justify-content: flex-start;
  }

  .home-header02 {
    font-size: 24px;
  }
  .home-description03 {
    font-size: 14px;
    line-height: 21px;
  }

  .home-collection {
    gap: var(--dl-space-space-fourunits);
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
  }

  .home-content04 {
    gap: var(--dl-space-space-oneandhalfunits);
  }
  .home-heading01 {
    gap: var(--dl-space-space-unit);
  }
  .home-header05 {
    font-size: 32px;
    letter-spacing: 0;
  }
  .home-header06 {
    font-size: 18px;
    line-height: 21px;
  }
  .home-image06 {
    padding-left: 0px;
    padding-right: 0px;
  }
  .home-image08 {
    padding-left: 0px;
    padding-right: 0px;
  }
  .home-image10 {
    padding-left: 0px;
    padding-right: 0px;
  }
  .home-image12 {
    padding-left: 0px;
    padding-right: 0px;
  }
  .home-image14 {
    padding-left: 0px;
    padding-right: 0px;
  }
  .home-image16 {
    padding-left: 0px;
    padding-right: 0px;
  }
  .home-image18 {
    padding-left: 0px;
    padding-right: 0px;
  }
  .home-image20 {
    padding-left: 0px;
    padding-right: 0px;
  }
  .home-view2 {
    display: none;
  }
  .home-project {
    gap: var(--dl-space-space-threeunits);
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
    padding-bottom: var(--dl-space-space-sixunits);
  }
  .home-understand {
    gap: var(--dl-space-space-oneandhalfunits);
  }
  .home-content13 {
    gap: var(--dl-space-space-oneandhalfunits);
  }
  .home-heading02 {
    gap: var(--dl-space-space-unit);
  }
  .home-header07 {
    font-size: 32px;
    letter-spacing: 0;
    align-self: center;
  }
  .home-header08 {
    font-size: 18px;
    line-height: 21px;
  }
  .home-view3 {
    margin-top: var(--dl-space-space-unit);
  }
  .home-image23 {
    width: 100%;
  }
  .home-mining {
    gap: var(--dl-space-space-fourunits);
  }
  .home-image24 {
    width: 100%;
  }
  .home-content14 {
    gap: var(--dl-space-space-oneandhalfunits);
  }
  .home-heading03 {
    gap: var(--dl-space-space-unit);
  }
  .home-header09 {
    font-size: 32px;
    letter-spacing: 0;
  }
  .home-header10 {
    font-size: 14px;
    line-height: 21px;
  }
  .home-view4 {
    margin-top: var(--dl-space-space-unit);
  }
  .home-roadmap {
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
    padding-bottom: var(--dl-space-space-fourunits);
  }
  .home-heading04 {
    gap: var(--dl-space-space-unit);
  }
  .home-header11 {
    font-size: 36px;
    line-height: 43px;
  }
  .home-header12 {
    width: 80%;
    font-size: 16px;
    line-height: 24px;
  }
  .home-list {
    gap: var(--dl-space-space-threeunits);
    padding-top: 0px;
    padding-left: var(--dl-space-space-unit);
    padding-bottom: 0px;
  }
  .home-heading05 {
    gap: var(--dl-space-space-unit);
  }
  .home-header13 {
    font-size: 32px;
  }
  .home-header14 {
    font-size: 14px;
    line-height: 21px;
  }
  .home-button6 {
    margin-top: 0px;
  }
  .home-heading06 {
    gap: var(--dl-space-space-unit);
  }
  .home-header15 {
    font-size: 32px;
  }
  .home-header16 {
    font-size: 14px;
    line-height: 21px;
  }
  .home-heading07 {
    gap: var(--dl-space-space-unit);
  }
  .home-header17 {
    font-size: 32px;
  }
  .home-header18 {
    font-size: 14px;
    line-height: 21px;
  }
  .home-heading08 {
    gap: var(--dl-space-space-oneandhalfunits);
  }
  .home-header19 {
    font-size: 32px;
  }
  .home-header20 {
    font-size: 14px;
    line-height: 21px;
  }
  .home-header21 {
    font-size: 14px;
    line-height: 21px;
  }
  .home-header22 {
    font-size: 14px;
    line-height: 21px;
  }
  .home-image28 {
    width: 17px;
  }
  .home-header23 {
    font-size: 14px;
    line-height: 21px;
  }
  .home-join-us {
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
    padding-bottom: var(--dl-space-space-fourunits);
  }
  .home-content15 {
    padding-top: var(--dl-space-space-threeunits);
  }
  .home-main4 {
    gap: var(--dl-space-space-twounits);
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
  }
  .home-heading09 {
    gap: var(--dl-space-space-unit);
  }
  .home-header24 {
    font-size: 36px;
    line-height: 43px;
  }
  .home-caption16 {
    font-size: 16px;
    line-height: 24px;
  }
  .home-image29 {
    width: 150%;
  }
  .home-faq {
    gap: var(--dl-space-space-threeunits);
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
    padding-bottom: var(--dl-space-space-fourunits);
  }
  .home-header25 {
    font-size: 36px;
    line-height: 43px;
  }
  .home-element {
    align-items: flex-start;
    padding-top: var(--dl-space-space-oneandhalfunits);
    padding-bottom: var(--dl-space-space-oneandhalfunits);
  }
  .home-header26 {
    font-size: 16px;
  }
  .home-description05 {
    font-size: 14px;
    line-height: 21px;
  }
  .home-element1 {
    align-items: flex-start;
    padding-top: var(--dl-space-space-oneandhalfunits);
    padding-bottom: var(--dl-space-space-oneandhalfunits);
  }
  .home-header27 {
    font-size: 16px;
  }
  .home-description06 {
    font-size: 14px;
    line-height: 21px;
  }
  .home-element2 {
    align-items: flex-start;
    padding-top: var(--dl-space-space-oneandhalfunits);
    padding-bottom: var(--dl-space-space-oneandhalfunits);
  }
  .home-header28 {
    font-size: 16px;
  }
  .home-description07 {
    font-size: 14px;
    line-height: 21px;
  }
  .home-element3 {
    align-items: flex-start;
    padding-top: var(--dl-space-space-oneandhalfunits);
    padding-bottom: var(--dl-space-space-oneandhalfunits);
  }
  .home-header29 {
    font-size: 16px;
  }
  .home-description08 {
    font-size: 14px;
    line-height: 21px;
  }
  .home-element4 {
    align-items: flex-start;
    padding-top: var(--dl-space-space-oneandhalfunits);
    padding-bottom: var(--dl-space-space-oneandhalfunits);
  }
  .home-header30 {
    font-size: 16px;
  }
  .home-description09 {
    font-size: 14px;
    line-height: 21px;
  }
  .home-get-yours {
    gap: var(--dl-space-space-oneandhalfunits);
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
  }
  .home-row2 {
    gap: var(--dl-space-space-oneandhalfunits);
    height: 555px;
  }
  .home-card11 {
    padding: var(--dl-space-space-unit);
  }
  .home-image30 {
    width: 100%;
  }
  .home-card12 {
    padding: var(--dl-space-space-unit);
  }
  .home-image31 {
    width: 100%;
  }

  .home-content21 {
    align-items: center;
  }
  .home-header31 {
    font-size: 32px;
    text-align: center;
  }
  .home-description10 {
    font-size: 14px;
    text-align: center;
    line-height: 21px;
  }
  .home-button7 {
    margin-top: 0px;
  }
  .home-footer {
    gap: var(--dl-space-space-oneandhalfunits);
    padding-top: var(--dl-space-space-fourunits);
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
  }
  .home-main5 {
    gap: var(--dl-space-space-threeunits);
    flex-direction: column;
    justify-content: flex-start;
  }
  .home-heading10 {
    gap: var(--dl-space-space-unit);
  }
  .home-logo2 {
    font-size: 20px;
    line-height: 24px;
  }
  .home-caption17 {
    width: 80%;
    font-size: 12px;
    line-height: 18px;
  }
  .home-socials1 {
    display: none;
  }
  .home-links1 {
    gap: var(--dl-space-space-fourunits);
    width: 100%;
    justify-content: flex-start;
  }
  .home-list1 {
    gap: var(--dl-space-space-oneandhalfunits);
  }
  .home-list2 {
    gap: var(--dl-space-space-oneandhalfunits);
  }
  .home-socials2 {
    display: flex;
  }
  .home-navbar {
    padding-left: var(--dl-space-space-twounits);
    padding-right: var(--dl-space-space-twounits);
  }
}

@media(max-width: 479px) {
    .home-row2 {
    height: 350px;
  }

  .home-main3 {
    grid-template-columns: repeat(1, 1fr);
  }

  .home-caption {
    white-space: normal;
  }
  .home-navbar {
    padding: var(--dl-space-space-unit);
  }
  .home-mobile-menu {
    padding: 16px;
  }
  .home-main3 {
    grid-template-columns: repeat(1, 1fr);
  }
  .home-image29 {
    width: 200%;
  }
  .home-header26 {
    font-size: 16px;
  }
  .home-description05 {
    font-size: 14px;
    line-height: 21px;
  }
  .home-header27 {
    font-size: 16px;
  }
  .home-description06 {
    font-size: 14px;
    line-height: 21px;
  }
  .home-header28 {
    font-size: 16px;
  }
  .home-description07 {
    font-size: 14px;
    line-height: 21px;
  }
  .home-header29 {
    font-size: 16px;
  }
  .home-description08 {
    font-size: 14px;
    line-height: 21px;
  }
  .home-header30 {
    font-size: 16px;
  }
  .home-description09 {
    font-size: 14px;
    line-height: 21px;
  }
  .home-row2 {
    height: 350px;
  }
  .button {
  font-size: 12px;
}
}

</style>
