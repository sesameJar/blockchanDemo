import Vue from "vue";
import Vuex from "vuex";
import cryptoFunc from "./sharedBC/sharedFunction.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    valid: true,

    blockChain: [],
    block: {}
    // genesisBlock : {
    //   data : "Genesis Block",
    //   timeStamp : Date.now(),
    //   prevHash : "0"
    // }
  },
  getters: {
    inValidBlocks: state => {
      return state.blockChain.filter(block => block.valid === false);
    }
  },
  mutations: {
    addToBlockChain(state, payload) {
      state.blockChain.push(payload);
    },
    updateBlock(state, payload) {
      state.blockChain[payload.index].data = payload.data;
      state.blockChain[payload.index].hash = payload.hash;
      state.blockChain[payload.index].valid = payload.valid;
      state.blockChain[payload.index].nonce = payload.nonce;
    },
    changeBlValidation(state, payload) {
      state.blockChain[payload.index].valid = payload.valid;
    },
    emptyBlockChain(state) {
      state.blockChain = [];
    }
  },
  actions: {
    addBlock({ state, commit }, payload) {
      let prevHash = 0;
      let number = 0;
      if (state.blockChain.length > 0) {
        let prevBlock = state.blockChain[state.blockChain.length - 1];
        prevHash = prevBlock.hash;
        number = prevBlock.blNumber + 1;
      }
      let returnBlock = {
        timeStamp: payload.timeStamp,
        data: payload.data,
        prevHash: prevHash,
        blNumber: number
      };
      let nonce = cryptoFunc.calculateNonce(returnBlock);
      returnBlock["nonce"] = nonce;
      let hash = cryptoFunc.hashBlock(returnBlock);
      returnBlock["hash"] = hash;
      returnBlock["valid"] = true;
      commit("addToBlockChain", returnBlock);
    },
    verifyAllBlockChain({ state, commit }) {
      state.blockChain.forEach((block, index) => {
        let preBlIndex = index - 1;
        let blPrevHash = 0;
        if (preBlIndex > -1) {
          blPrevHash = state.blockChain[preBlIndex].hash;
        }
        if (!(cryptoFunc.verifyBlock(block) && block.prevHash === blPrevHash)) {
          commit("changeBlValidation", {
            index: block.blNumber,
            valid: false
          });
        } else {
          commit("changeBlValidation", {
            index: block.blNumber,
            valid: true
          });
        }
      });
    },
    reValidBl({ state, commit }, payload) {
      let bl = state.blockChain[payload];
      let returnBl = {
        timeStamp: bl.timeStamp,
        data: bl.data,
        prevHash: bl.prevHash,
        blNumber: bl.blNumber
      };

      bl.nonce = cryptoFunc.calculateNonce(returnBl);
      returnBl["nonce"] = bl.nonce;
      bl.hash = cryptoFunc.hashBlock(returnBl);
      commit("updateBlock", {
        index: bl.blNumber,
        hash: bl.hash,
        nonce: bl.nonce,
        valid: true,
        data: bl.data
      });
    }
  }
});
