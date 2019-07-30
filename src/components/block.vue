<template>
  <div>
    <b-card bg-variant="dark" text-variant="white">
      <b-input-group class="mt-3">
        <b-input-group-text slot="prepend"
          ><strong class="text-danger">DATA</strong></b-input-group-text
        >
        <b-form-input
          v-model="blData.data"
          @update="updateBlock"
          type="text"
          placeholder="Welcome to Blockchain Demo 2.0!"
        />
      </b-input-group>
      <b-card-text :class="valid ? 'valid' : 'inValid'">
        PREVIOUSE HASH <span>{{ prevBlHash }}</span></b-card-text
      >
      <b-card-text :class="valid ? 'valid' : 'inValid'">
        HASH {{ blockHash }}</b-card-text
      >
      <button :disabled="valid == 1" v-on:click="reValidateBlock">
        {{ blockNonce }}
      </button>
      <span class="time">{{ timeStamp }}</span>
    </b-card>
  </div>
</template>

<script>
import cryptoFunc from "../sharedBC/sharedFunction.js";

export default {
  name: "block",
  data() {
    return {
      blockNo: "",
      blockData: "",
      blockHash: "",
      prevBlHash: "",
      timeStamp: "",
      blockNonce: "",
      valid: true
    };

    // blData.hash
    //block.data
  },
  props: ["block"],
  computed: {
    blData: {
      get() {
        return this.$store.state.blockChain[this.blockNo];
      },
      set(value) {
        this.$store.commit("updateBlock", {
          data: value,
          index: this.blockNo
        });
      }
    }
  },
  created() {
    this.blockNo = this.block.blNumber;
    this.blockData = this.block.data;
    this.blockHash = this.block.hash;
    this.prevBlHash = this.block.prevHash;
    this.timeStamp = this.block.timeStamp;
    this.blockNonce = this.block.nonce;
    this.valid = this.block.valid;
  },
  methods: {
    updateBlock() {
      this.blockHash = cryptoFunc.hashBlock({
        timeStamp: this.timeStamp,
        data: this.blData,
        prevHash: this.prevBlHash,
        blNumber: this.blockNo,
        nonce: this.blockNonce
      });

      this.valid = cryptoFunc.validHash(this.blockHash);

      this.$store.commit("updateBlock", {
        data: this.blData,
        index: this.blockNo,
        hash: this.blockHash,
        valid: this.valid,
        nonce: this.nonce
      });
      this.$store.dispatch("verifyAllBlockChain");
    },
    reValidateBlock() {
      this.$store.dispatch("reValidBl", this.blockNo);
      if (this.blockNo > 0) {
        this.prevBlHash = this.$store.state.blockChain[this.blockNo - 1].hash;
      }
      this.valid = this.$store.state.blockChain[this.blockNo].valid;
      this.blockNonce = this.$store.state.blockChain[this.blockNo].nonce;
      this.blockHash = this.$store.state.blockChain[this.blockNo].hash;
    }
  }
};
</script>
<style>
.valid {
  color: green !important;
}
.inValid {
  color: red !important;
}

input.form-control {
  outline: 0 none;
  background-color: rgba(0, 0, 0, 0.8);
  color: #eee;
}

span.time {
  color: #444;
  font-size: 12px;
  text-transform: uppercase;
  margin-left: 10px;
}
button {
  border: 1px solid #aaa;
}
</style>
