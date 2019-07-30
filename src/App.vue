<template>
  <div id="app">
    <b-container>
      <h1>Welcome to Blockchain Demo!</h1>
      <blockchain></blockchain>
      <div class="formGroup">
        <addBlock></addBlock>
        <resetBlock></resetBlock>
      </div>
    </b-container>
  </div>
</template>
<script>
import blockchain from "@/components/blockchain.vue";
import addBlock from "@/components/addBlock.vue";
import resetBlock from "@/components/resetBlock.vue";
export default {
  name: "app",
  components: {
    blockchain,
    addBlock,
    resetBlock
  }
};
</script>

<style>
.container {
  max-width: 800px;
}

h1 {
  text-align: center;
}

.formGroup {
  background-color: #ddd;
  border: 2px solid #ccc;
  padding: 20px;
}
</style>
