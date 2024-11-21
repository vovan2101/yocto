<template>
  <div v-if="isModalOpen" class="modal" @click="outsideClick">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2 class="modal-header">Investors Requiring This Field</h2>
      <ul class="form-list">
        <!-- Отображение только выбранных инвесторов -->
        <li v-for="form in filteredInvestors" :key="form.name"
            :class="{'status-required': form.status === 'Required', 'status-optional': form.status === 'Optional'}">
          <a :href="form.url" target="_blank" class="button-link-scrollable">{{ form.name }} - <span class="status-text">{{ form.status }}</span></a>
        </li>
      </ul>
    </div>
  </div>
</template>
  
  <script>
  export default {
    props: {
      isModalOpen: {
        type: Boolean,
        required: true,
      },
      field: {
        type: String,
        required: true,
      },
      selectedForms: {
      type: Array,
      required: true,
    },
    },
    data() {
      return {
        formInfo: {
  first_name: [
    { name: '2048 Ventures', status: 'Required', url: 'https://airtable.com/appV89PYGo3zN47f9/shr2lijl8JHhvxghK?prefill_Introd+By+Type=Direct&hide_Introd+By+Type=true' },
    { name: 'Boost Ventures', status: 'Required', url: 'https://forms.fillout.com/t/gKcwHBe9SQus' },
    { name: 'Everywhere Ventures', status: 'Required', url: 'https://everywhere.vc/' },
    { name: 'Hustle Fund', status: 'Required', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://airtable.com/appAMCFupamv6Euf8/shrKq915ChZNzweep' },
    { name: 'Liberty Ventures', status: 'Required', url: 'https://share.hsforms.com/1DHSuFcRRQTGI5MLAO8Pa6Aqg7u9' },
    { name: 'Path Ventures', status: 'Required', url: 'https://www.path.vc/form' },
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/startup/' },
    { name: 'Spatial Capital', status: 'Optional', url: 'https://www.spatial.capital/application' },
  ],
  email: [
    { name: '2048 Ventures', status: 'Required', url: 'https://airtable.com/appV89PYGo3zN47f9/shr2lijl8JHhvxghK?prefill_Introd+By+Type=Direct&hide_Introd+By+Type=true' },
    { name: 'Boost Ventures', status: 'Required', url: 'https://forms.fillout.com/t/gKcwHBe9SQus' },
    { name: 'Everywhere Ventures', status: 'Required', url: 'https://everywhere.vc/' },
    { name: 'Hustle Fund', status: 'Required', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://airtable.com/appAMCFupamv6Euf8/shrKq915ChZNzweep' },
    { name: 'Liberty Ventures', status: 'Required', url: 'https://share.hsforms.com/1DHSuFcRRQTGI5MLAO8Pa6Aqg7u9' },
    { name: 'Path Ventures', status: 'Required', url: 'https://www.path.vc/form' },
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/startup/' },
    { name: 'Spatial Capital', status: 'Required', url: 'https://www.spatial.capital/' },
    { name: 'Wischoff Ventures', status: 'Required', url: 'https://airtable.com/appl0n7pzw0060tns/shr28rdgNSzNC7ioU' },
  ],
  phone_number: [
    { name: 'Liberty Ventures', status: 'Required', url: 'https://share.hsforms.com/1DHSuFcRRQTGI5MLAO8Pa6Aqg7u9' },
  ],
  relationship: [
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/startup/' },
  ],
  working_full_time: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
  ],
  company_name: [
    { name: '2048 Ventures', status: 'Required', url: 'https://airtable.com/appV89PYGo3zN47f9/shr2lijl8JHhvxghK?prefill_Introd+By+Type=Direct&hide_Introd+By+Type=true' },
    { name: 'Everywhere Ventures', status: 'Required', url: 'https://everywhere.vc/' },
    { name: 'Hustle Fund', status: 'Required', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://airtable.com/appAMCFupamv6Euf8/shrKq915ChZNzweep' },
    { name: 'Liberty Ventures', status: 'Required', url: 'https://share.hsforms.com/1DHSuFcRRQTGI5MLAO8Pa6Aqg7u9' },
    { name: 'Path Ventures', status: 'Required', url: 'https://www.path.vc/form' },
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/startup/' },
    { name: 'Spatial Capital', status: 'Required', url: 'https://www.spatial.capital/application' },
    { name: 'Wischoff Ventures', status: 'Required', url: 'https://airtable.com/appl0n7pzw0060tns/shr28rdgNSzNC7ioU' },
  ],
  one_line_description: [
    { name: 'Liberty Ventures', status: 'Required', url: 'https://share.hsforms.com/1DHSuFcRRQTGI5MLAO8Pa6Aqg7u9' },
    { name: 'Path Ventures', status: 'Optional', url: 'https://www.path.vc/form' },
    { name: 'Spatial Capital', status: 'Required', url: 'https://www.spatial.capital/application' },
  ],
  company_description: [
    { name: '2048 Ventures', status: 'Required', url: 'https://airtable.com/appV89PYGo3zN47f9/shr2lijl8JHhvxghK?prefill_Introd+By+Type=Direct&hide_Introd+By+Type=true' },
    { name: 'Boost Ventures', status: 'Required', url: 'https://forms.fillout.com/t/gKcwHBe9SQus' },
    { name: 'Hustle Fund', status: 'Required', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/startup/' },
  ],
  company_solution: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
    { name: 'Incisive Ventures', status: 'Optional', url: 'https://airtable.com/appAMCFupamv6Euf8/shrKq915ChZNzweep' },
  ],
  pitch_description: [
    { name: 'Incisive Ventures', status: 'Required', url: 'https://airtable.com/appAMCFupamv6Euf8/shrKq915ChZNzweep' },
  ],
  target_customer: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
  ],
  customer_acquisition: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
  ],
  date_founded: [
    { name: '2048 Ventures', status: 'Required', url: 'https://airtable.com/appV89PYGo3zN47f9/shr2lijl8JHhvxghK?prefill_Introd+By+Type=Direct&hide_Introd+By+Type=true' },
  ],
  product_status: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://airtable.com/appAMCFupamv6Euf8/shrKq915ChZNzweep' },
  ],
  active_customers: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
  ],
  how_many_users: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
  ],
  industry: [
    { name: '2048 Ventures', status: 'Required', url: 'https://airtable.com/appV89PYGo3zN47f9/shr2lijl8JHhvxghK?prefill_Introd+By+Type=Direct&hide_Introd+By+Type=true' },
    { name: 'Hustle Fund', status: 'Required', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
    { name: 'Incisive Ventures', status: 'Optional', url: 'https://airtable.com/appAMCFupamv6Euf8/shrKq915ChZNzweep' },
    { name: 'Path Ventures', status: 'Optional', url: 'https://www.path.vc/form' },
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/startup/' },
    { name: 'Wischoff Ventures', status: 'Optional', url: 'https://airtable.com/appl0n7pzw0060tns/shr28rdgNSzNC7ioU' },
  ],
  liberty_ventures_industry: [
    { name: 'Liberty Ventures', status: 'Required', url: 'https://share.hsforms.com/1DHSuFcRRQTGI5MLAO8Pa6Aqg7u9' },
  ],
  product: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
    { name: 'Incisive Ventures', status: 'Optional', url: 'https://airtable.com/appAMCFupamv6Euf8/shrKq915ChZNzweep' },
  ],
  business_model: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
  ],
  company_website: [
    { name: '2048 Ventures', status: 'Required', url: 'https://airtable.com/appV89PYGo3zN47f9/shr2lijl8JHhvxghK?prefill_Introd+By+Type=Direct&hide_Introd+By+Type=true' },
    { name: 'Everywhere Ventures', status: 'Required', url: 'https://everywhere.vc/' },
    { name: 'Hustle Fund', status: 'Optional', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://airtable.com/appAMCFupamv6Euf8/shrKq915ChZNzweep' },
    { name: 'Liberty Ventures', status: 'Required', url: 'https://libertyventures.xyz/' },
    { name: 'Path Ventures', status: 'Optional', url: 'https://www.path.vc/form' },
    { name: 'Precursor Ventures', status: 'Optional', url: 'https://precursorvc.com/startup/' },
    { name: 'Spatial Capital', status: 'Required', url: 'https://www.spatial.capital/' },
  ],
  pitch_deck: [
    { name: '2048 Ventures', status: 'Required', url: 'https://airtable.com/appV89PYGo3zN47f9/shr2lijl8JHhvxghK?prefill_Introd+By+Type=Direct&hide_Introd+By+Type=true' },
    { name: 'Boost Ventures', status: 'Optional', url: 'https://forms.fillout.com/t/gKcwHBe9SQus' },
    { name: 'Everywhere Ventures', status: 'Required', url: 'https://everywhere.vc/' },
    { name: 'Hustle Fund', status: 'Optional', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://airtable.com/appAMCFupamv6Euf8/shrKq915ChZNzweep' },
    { name: 'Path Ventures', status: 'Optional', url: 'https://www.path.vc/form' },
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/startup/' },
    { name: 'Spatial Capital', status: 'Optional', url: 'https://www.spatial.capital/application' },
    { name: 'Wischoff Ventures', status: 'Optional', url: 'https://airtable.com/appl0n7pzw0060tns/shr28rdgNSzNC7ioU' },
  ],
  pitch_deck_file: [
    { name: 'Hustle Fund', status: 'Optional', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
    { name: 'Liberty Ventures', status: 'Required', url: 'https://share.hsforms.com/1DHSuFcRRQTGI5MLAO8Pa6Aqg7u9' },
    { name: 'Spatial Capital', status: 'Optional', url: 'https://www.spatial.capital/application' },
  ],
  headquartered: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
    { name: 'Incisive Ventures', status: 'Optional', url: 'https://airtable.com/appAMCFupamv6Euf8/shrKq915ChZNzweep' },
    { name: 'Wischoff Ventures', status: 'Optional', url: 'https://airtable.com/appl0n7pzw0060tns/shr28rdgNSzNC7ioU' },
  ],
  headquartered_precursor: [
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/startup/' },
  ],
  customers_based: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
  ],
  specific_location: [
    { name: '2048 Ventures', status: 'Required', url: 'https://airtable.com/appV89PYGo3zN47f9/shr2lijl8JHhvxghK?prefill_Introd+By+Type=Direct&hide_Introd+By+Type=true' },
    { name: 'Boost Ventures', status: 'Required', url: 'https://forms.fillout.com/t/gKcwHBe9SQus' },
    { name: 'Everywhere Ventures', status: 'Required', url: 'https://everywhere.vc/' },
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/startup/' },
  ],
  legal_structure: [
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/startup/' },
  ],
  raising_round: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://airtable.com/appAMCFupamv6Euf8/shrKq915ChZNzweep' },
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/startup/' },
    { name: 'Wischoff Ventures', status: 'Optional', url: 'https://airtable.com/appl0n7pzw0060tns/shr28rdgNSzNC7ioU' },
  ],
  raising_amount: [
    { name: '2048 Ventures', status: 'Required', url: 'https://airtable.com/appV89PYGo3zN47f9/shr2lijl8JHhvxghK?prefill_Introd+By+Type=Direct&hide_Introd+By+Type=true' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://airtable.com/appAMCFupamv6Euf8/shrKq915ChZNzweep' },
    { name: 'Precursor Ventures', status: 'Required', url: 'https://precursorvc.com/startup/' },
    { name: 'Spatial Capital', status: 'Optional', url: 'https://www.spatial.capital/application' },
  ],
  earning_revenue: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
  ],
  earning_amount: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
    { name: 'Incisive Ventures', status: 'Optional', url: 'https://airtable.com/appAMCFupamv6Euf8/shrKq915ChZNzweep' },
  ],
  source_of_revenue: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
  ],
  pre_money_valuation: [
    { name: 'Precursor Ventures', status: 'Optional', url: 'https://precursorvc.com/startup/' },
  ],
  post_money_valuation: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://airtable.com/appAMCFupamv6Euf8/shrKq915ChZNzweep' },
  ],
  capital_to_raise: [
    { name: 'Hustle Fund', status: 'Required', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://airtable.com/appAMCFupamv6Euf8/shrKq915ChZNzweep' },
    { name: '2048 Ventures', status: 'Required', url: 'https://airtable.com/appV89PYGo3zN47f9/shr2lijl8JHhvxghK?prefill_Introd+By+Type=Direct&hide_Introd+By+Type=true' },
  ],
  prev_experience: [
    { name: 'Incisive Ventures', status: 'Required', url: 'https://airtable.com/appAMCFupamv6Euf8/shrKq915ChZNzweep' },
  ],
  team_description: [
    { name: 'Boost Ventures', status: 'Required', url: 'https://forms.fillout.com/t/gKcwHBe9SQus' },
  ],
  company_linkedin: [
    { name: 'Spatial Capital', status: 'Optional', url: 'https://www.spatial.capital/application' },
  ],
  ceo_linkedin: [
    { name: 'Boost Ventures', status: 'Required', url: 'https://forms.fillout.com/t/gKcwHBe9SQus' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://airtable.com/appAMCFupamv6Euf8/shrKq915ChZNzweep' },
    { name: 'Liberty Ventures', status: 'Required', url: 'https://share.hsforms.com/1DHSuFcRRQTGI5MLAO8Pa6Aqg7u9' },
    { name: 'Path Ventures', status: 'Optional', url: 'https://www.path.vc/form' },
    { name: '2048 Ventures', status: 'Required', url: 'https://airtable.com/appV89PYGo3zN47f9/shr2lijl8JHhvxghK?prefill_Introd+By+Type=Direct&hide_Introd+By+Type=true' },
    { name: 'Everywhere Ventures', status: 'Optional', url: 'https://everywhere.vc/' },
    { name: 'Hustle Fund', status: 'Optional', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
  ],
  cto_linkedin: [
    { name: '2048 Ventures', status: 'Optional', url: 'https://airtable.com/appV89PYGo3zN47f9/shr2lijl8JHhvxghK?prefill_Introd+By+Type=Direct&hide_Introd+By+Type=true' },
  ],
  founder_video_url: [
    { name: '2048 Ventures', status: 'Required', url: 'https://airtable.com/appV89PYGo3zN47f9/shr2lijl8JHhvxghK?prefill_Introd+By+Type=Direct&hide_Introd+By+Type=true' },
    { name: 'Path Ventures', status: 'Optional', url: 'https://www.path.vc/form' },
    { name: 'Boost Ventures', status: 'Required', url: 'https://forms.fillout.com/t/gKcwHBe9SQus' },
  ],
  vision: [
    { name: '2048 Ventures', status: 'Required', url: 'https://airtable.com/appV89PYGo3zN47f9/shr2lijl8JHhvxghK?prefill_Introd+By+Type=Direct&hide_Introd+By+Type=true' },
  ],
  pitching_live: [
    { name: 'Hustle Fund', status: 'Optional', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
  ],
  share_submission: [
    { name: 'Hustle Fund', status: 'Optional', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
    { name: 'Incisive Ventures', status: 'Required', url: 'https://airtable.com/appAMCFupamv6Euf8/shrKq915ChZNzweep' },
  ],
  investors_participating: [
    { name: 'Hustle Fund', status: 'Optional', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
    { name: 'Incisive Ventures', status: 'Optional', url: 'https://airtable.com/appAMCFupamv6Euf8/shrKq915ChZNzweep' },
  ],
  want_us_to_know: [
    { name: 'Hustle Fund', status: 'Optional', url: 'https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc' },
    { name: 'Incisive Ventures', status: 'Optional', url: 'https://airtable.com/appAMCFupamv6Euf8/shrKq915ChZNzweep' },
  ],
  value_of_team: [
    { name: 'Liberty Ventures', status: 'Required', url: 'https://share.hsforms.com/1DHSuFcRRQTGI5MLAO8Pa6Aqg7u9' },
  ],
},
      };
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      outsideClick(event) {
        if (event.target.classList.contains('modal')) {
          this.closeModal();
        }
      },
    },
  computed: {
    // Отфильтрованные инвесторы, которые пользователь выбрал
    filteredInvestors() {
      return this.formInfo[this.field].filter(form => this.selectedForms.includes(form.name));
    }
  },
};
  </script>
  
  <style scoped>

.status-required .status-text {
  color: rgb(218, 177, 101);
}

.status-optional .status-text {
  color: rgb(255, 255, 255);
}


  .modal {
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }
  
  .modal-content {
    background-color: #282828;
    margin: 10% auto;
    padding: 20px;
    border: 2px solid #888;
    width: 80%;
    max-width: 600px;
    color: #fff;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
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
    list-style-type: none;
    padding: 0;
    margin: 0;
    max-height: 300px;
    overflow-y: auto;
  }
  
  .form-list li {
    padding: 6px 0;
    border-bottom: 1px solid #444;
  }
  
  .form-list li:last-child {
    border-bottom: none;
  }
  
  .button-link-scrollable {
    display: block;
    color: rgb(255, 255, 255);
    text-decoration: none;
    font-weight: 600;
    padding: 10px;
    transition: background-color 0.3s ease;
    text-decoration: underline; /* Добавляем подчеркивание */
  }
  
  .button-link-scrollable:hover {
    background-color: #444;
  }

  /* Стили для устройств с разрешением до 1024px */
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
  