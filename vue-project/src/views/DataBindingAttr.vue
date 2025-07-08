<template>
  <h3>DataBindingAtt.vue</h3>
  <p>attribute 바인딩하기</p>
  <img :src="imgSrc" :width="widVal + px" />
  <p><input type="number" v-model.number="widVal" /></p>
  <p>
    <input type="text" v-model="msg" />
    <button :disabled="msg === ''" @click="alertFnc">클릭</button>
  </p>

  <h3 :class="{ 'text-red': isRed, active: isActive }">홍길동</h3>
  <p>배열을 활용한 바인딩.</p>

  <h3 :class="classAry">김길동</h3>
  <p><button @click="showFnc">에러스타일</button></p>
</template>

<script>
export default {
  //data 영역
  data() {
    return {
      imgSrc: "https://vuejs.org/images/logo.png",
      imgWid: "130px",
      widVal: 100,
      btnShow: true,
      msg: "",

      isRed: true,
      isActive: true,

      activeClass: "active",
      errorClass: "text-red",

      classAry: ["active", "text-red"],
    };
  },
  methods: {
    // 이벤트
    alertFnc() {
      alert(this.msg);
    },
    showFnc() {
      //홍길동의 폰트색깔을 변경
      this.isRed = !this.isRed;
    },
  },
  mounted() {
    console.log(this);
    this.msg = "홍길동";
    this.imgWid = "230px";
  },
};
</script>

<style scoped>
.text-red {
  color: red;
}

.active {
  background-color: antiquewhite;
}
</style>
