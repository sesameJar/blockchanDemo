<template>
  <div>
    <form @submit="buildBlock">
      <b-input-group prepend="DATA" class="mt-3">
        <b-form-input v-model="block.data" />
        <b-input-group-append>
          <b-button type="submit" variant="info">Add Block</b-button>
        </b-input-group-append>
      </b-input-group>
    </form>
  </div>
</template>

<script>
export default {
  name: "addBlock",
  data() {
    return {
      block: {
        data: "",
        timeStamp: new Date()
      }
    };
  },
  methods: {
    buildBlock() {
      this.block.timeStamp = new Date();
      this.$store.dispatch("addBlock", this.block);
    }
  }
};
</script>
