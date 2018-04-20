/*jslint node: true */
"use strict";

const fs = require('fs');
const db = require('trustnote-common/db.js');
const eventBus = require('trustnote-common/event_bus.js');
const constants = require('trustnote-common/constants.js');
var objectHash = require('trustnote-common/object_hash.js');
var Mnemonic = require('bitcore-mnemonic');
var ecdsaSig = require('trustnote-common/signature.js');
var validation = require('trustnote-common/validation.js');
var headlessWallet = require('trustnote-headless');

const witness_budget = 1000000;
const witness_budget_count = 8;
const genesisConfigFile = "../../data/config.json";
const creation_message = "先帝创业未半而花光预算"

var genesisConfigData = {};
var witnesses = [];
var allAddress = [];
var arrOutputs = [
    {address: "IO3JFSLJQVS4GNWR6I4QYIPBYGIUF3ZF", amount: 0 } //第一笔，找零地址。
];

var contenta = fs.readFileSync('../../data/allAddress.json');
var contentb = fs.readFileSync('../../data/witnessAddress.json');

witnesses = JSON.parse(contentb);
allAddress = JSON.parse(contenta);

console.log(JSON.stringify(witnesses));

for (let address of allAddress) {           // initial the payment arrOutputs
    for(var i=0; i<witness_budget_count; ++i) {
        arrOutputs.push({address: address, amount: witness_budget});
    }
}

function createPayment(from_address){
    console.log('starting createPayment');
    var composer = require('trustnote-common/composer.js');
    var network = require('trustnote-common/network.js');
    var callbacks = composer.getSavingCallbacks({
        ifNotEnoughFunds: onError,
        ifError: onError,
        ifOk: function(objJoint){
            network.broadcastJoint(objJoint);
        }
    });

    var from_address = "IO3JFSLJQVS4GNWR6I4QYIPBYGIUF3ZF";
    var payee_address = "XIM76DRNUNFWPXPI5AGOCYNMA3IOXL7V";
    var arrOutputs = [
        {address: from_address, amount: 0},      // the change
        {address: payee_address, amount: 100}  // the receiver
    ];
    composer.setGenesis(false);
    composer.composePaymentJoint([from_address], arrOutputs, headlessWallet.signer, callbacks);
}



function  rungen(){
  fs.readFile(genesisConfigFile, 'utf8', function(err, data) {
      if (err){
        console.log("Read genesis input file \"bgenesis.json\" failed: " + err);
        process.exit(0);
      }
      // set global data
      genesisConfigData = JSON.parse(data);
      console.log("Read genesis input data\n: %s", JSON.stringify(genesisConfigData,null,2) );

      createGenesisUnit(witnesses, function(genesisHash) {
          console.log("\n\n---------->>->> Genesis d, hash=" + genesisHash+ "\n\n");

          setTimeout(createPayment,1000*30);
          //process.exit(0);
          // var placeholders = Array.apply(null, Array(witnesses.length)).map(function(){ return '(?)'; }).join(',');
          // console.log('will insert witnesses', witnesses);
          // var witnesslist = witnesses;
      //     db.query("INSERT INTO my_witnesses (address) VALUES "+placeholders, witnesses, function(){
      //     console.log('inserted witnesses');
      //     setInterval(createPayment,1000*30)
      // });
  });
})
}

function onError(err) {
    throw Error(err);
}

function getConfEntryByAddress(address) {
    for (let item of genesisConfigData) {
        if(item["address"] === address){
            return item;
        }
    }
    console.log(" \n >> Error: witness address "
    + address +" not founded in the \"bgensis.json\" file!!!!\n");
    process.exit(0);
    //return null;
}

function getDerivedKey(mnemonic_phrase, passphrase, account, is_change, address_index) {
    console.log("**************************************************************");
    console.log(mnemonic_phrase);

    var mnemonic = new Mnemonic(mnemonic_phrase);
    var xPrivKey = mnemonic.toHDPrivateKey(passphrase);
    //console.log(">> about to  signature with private key: " + xPrivKey);
    var path = "m/44'/0'/" + account + "'/"+is_change+"/"+address_index;
    var derivedPrivateKey = xPrivKey.derive(path).privateKey;
    console.log(">> derived key: " + derivedPrivateKey);
    return derivedPrivateKey.bn.toBuffer({size:32});        // return as buffer
}

// signer that uses witeness address
var signer = {
    readSigningPaths: function(conn, address, handleLengthsBySigningPaths){
        handleLengthsBySigningPaths({r: constants.SIG_LENGTH});
    },
    readDefinition: function(conn, address, handleDefinition){
        var conf_entry = getConfEntryByAddress(address);
       // console.log(" \n\n conf_entry is ---> \n" + JSON.stringify(conf_entry,null,2));
        var definition = conf_entry["definition"];
        handleDefinition(null, definition);
    },
    sign: function(objUnsignedUnit, assocPrivatePayloads, address, signing_path, handleSignature){
        var buf_to_sign = objectHash.getUnitHashToSign(objUnsignedUnit);
        var item = getConfEntryByAddress(address);
        var derivedPrivateKey = getDerivedKey(
            item["mnemonic_phrase"],
            item["passphrase"],
            0,
            item["is_change"],
            item["address_index"]
          );
        handleSignature(null, ecdsaSig.sign(buf_to_sign, derivedPrivateKey));
    }
};

function createGenesisUnit(witnesses, onDone) {
    var composer = require('trustnote-common/composer.js');
    var network = require('trustnote-common/network.js');

    var savingCallbacks = composer.getSavingCallbacks({
        ifNotEnoughFunds: onError,
        ifError: onError,
        ifOk: function(objJoint) {
            network.broadcastJoint(objJoint);
            onDone(objJoint.unit.unit);
        }
    });

    composer.setGenesis(true);

    var genesisUnitInput = {
        witnesses: witnesses,
        paying_addresses: witnesses,
        outputs: arrOutputs,
        signer: signer,
        callbacks: {
            ifNotEnoughFunds: onError,
            ifError: onError,
            ifOk: function(objJoint, assocPrivatePayloads, composer_unlock) {
                constants.GENESIS_UNIT = objJoint.unit.unit;
                savingCallbacks.ifOk(objJoint, assocPrivatePayloads, composer_unlock);
            }
        },
        messages: [{
            app: "text",
            payload_location: "inline",
            payload_hash: objectHash.getBase64Hash(creation_message),
            payload: creation_message
        }]
    };
    composer.composeJoint( genesisUnitInput );
}

eventBus.once('headless_wallet_ready', function() {
    console.log("创建创世单元");
    rungen();
}
);
