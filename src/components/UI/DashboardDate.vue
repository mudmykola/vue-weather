<template>
  <div>
    <div class="dashboard-date">
      <div class="dashboard-date__month">
        <h2> {{ month }}</h2>
        <p>{{ year }}</p>

      </div>
      <div class="dashboard-date__day">
        <h2>  {{ day }}</h2>,
        <p>{{ date }}</p>,
        <span>{{ year }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardDate",
  data() {
    return {
      month: '',
      year: '',
      day: '',
      date: '',
    };
  },
  mounted() {
    this.getCurrentDate();
  },
  methods: {
    getCurrentDate() {
      const currentDate = new Date();
      const options = { month: 'long', year: 'numeric', weekday: 'long', day: 'numeric' };

      this.month = currentDate.toLocaleDateString('ua', { month: 'long' });
      this.year = currentDate.toLocaleDateString('ua', { year: 'numeric' });
      this.day = currentDate.toLocaleDateString('ua', { weekday: 'long' });
      this.date = currentDate.toLocaleDateString('ua', { day: 'numeric' });
    },
  },
}
</script>

<style lang="scss" >
@use "src/styles/variables" as var;
.dashboard-date{
  &__month{
    display: flex;
    align-items: center;
    h2{
      text-transform: capitalize;
    }
    h2,p{
      color: var.$c103;
      font-weight: var.$font-b;
      font-size: 30px;
    }
    p{
      margin-left:  10px;
    }
  }
  &__day{

    display: flex;
    align-items: center;
    h2,p,span{
      font-size: 14px;
      line-height: 20px;
      color: var.$c101;
      font-weight: var.$font-m;
    }


  }
}

// 768

@media (max-width: 768px) {
  .container-848{
    width: 280px;
  }
  .dashboard-date{
    width: 250px;

  }
}

// 600
@media (max-width: 600px) {

}

// 480
@media (max-width: 480px) {
  .container-848{
    width: 280px;
  }
  .dashboard-date{
    width: 250px;

  }
}

// 320
@media (max-width: 320px) {
  .container-848{
    width: 280px;
  }
.dashboard-date{
  width: 250px;

}
}

</style>