<template>
    <div class="coming-soon">
      <div class="content">
        <h1>Coming Soon</h1>
        <p>Get ready to embark on a retro adventure!</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ComingSoon',
  }
  </script>
  
  <style scoped>
  .coming-soon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between; /* Распределяет пространство между контентом и картинкой */
    height: 100vh;
    background-color: #282828; /* Темный фон */
    color: #fff;
    text-align: center;
  }
  
  .content {
    margin-top: 37vh;
  }
  
  h1 {
    font-size: 3em;
    color: rgb(255, 207, 119);
    margin-bottom: 20px;
  }
  
  p {
    font-size: 1.2em;
  }
  

  </style>
  