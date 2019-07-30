<template>
  <div>
    <div v-for="(block, index) in blockchain" :key="index">
      <block :block="block" :key="index"></block>
      <span class="arrow">
        <img src="../assets/icons8-down-arrow-50.png" alt="arrow" />
      </span>
    </div>
  </div>
</template>

<script>
import block from "@/components/block";

export default {
  name: "blockchain",
  //   data() {
  //     return {};
  //   },
  components: {
    block
  },
  computed: {
    blockchain() {
      return this.$store.state.blockChain;
    }
  }
};
</script>
<style>
.card.bg-dark {
  background-color: #ddd !important;
  border: 2px solid #ccc !important;
  margin-bottom: 50px;
}

span.arrow {
  max-width: 50px;
  margin: 20px auto;
  display: block;
}
</style>
