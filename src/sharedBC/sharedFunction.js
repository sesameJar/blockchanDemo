import { ethers } from "ethers";

export default {
  hashBlock(bl_) {
    console.log(14, bl_);
    let stringifiedBl = JSON.stringify(bl_);
    var result = "";
    for (var i = 0; i < stringifiedBl.length; i++) {
      result += stringifiedBl.charCodeAt(i).toString(16);
    }
    return ethers.utils.keccak256("0x" + result);
  },
  calculateNonce(_bl) {
    let clonedBl = JSON.parse(JSON.stringify(_bl));
    let nonce = 0;
    clonedBl["nonce"] = nonce;
    let hash = this.hashBlock(clonedBl);
    while (hash.substring(2, 5) !== "000") {
      nonce++;
      clonedBl["nonce"] = nonce;
      hash = this.hashBlock(clonedBl);
    }
    return nonce;
  },
  validHash(hash) {
    return hash.substring(2, 5) === "000";
  },
  verifyBlock(bl) {
    let hashOfBl = bl.hash;
    let blWithoutHash = {
      timeStamp: bl.timeStamp,
      data: bl.data,
      prevHash: bl.prevHash,
      blNumber: bl.blNumber,
      nonce: bl.nonce
    };

    let hashOfBlWithoutHash = this.hashBlock(blWithoutHash);
    // console.log(3, this.validHash(hashOfBl));
    // console.log(4, hashOfBlWithoutHash === hashOfBl);
    // console.log(
    //   5,
    //   hashOfBlWithoutHash === hashOfBl && this.validHash(hashOfBl)
    // );
    let result = hashOfBlWithoutHash === hashOfBl && this.validHash(hashOfBl);
    console.log("hashblock func", result);
    return result;
  }
};
