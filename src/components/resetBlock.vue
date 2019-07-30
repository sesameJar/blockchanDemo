<template>
  <div>
    <a @click.prevent="resetBlockChain" href="#"> Reset Blockchain</a>
  </div>
</template>
<script>
export default {
  name: "resetBlock",
  data() {
    return {
      genesisBlock: {
        timeStamp: new Date(),
        data: "Genesis Block"
      }
    };
  },
  methods: {
    resetBlockChain() {
      this.$store.commit("emptyBlockChain");
      this.$store.dispatch("addBlock", this.genesisBlock);
    }
  }
};
</script>
<style>
a {
  color: #444 !important;
  text-decoration: underline !important;
  text-transform: uppercase;
}
</style>
