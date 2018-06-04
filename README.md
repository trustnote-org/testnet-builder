# Setup Your TrustNote Testnet from Source

TrustNote is a Directed Acyclic Graph (DAG) based distributed ledger and its development platform for the tokenized economy.

In this tutorial, I will walk you through the simple steps to set up a TrustNote testnet that is separate from the TrustNote main chain.

After successfully completing this tutorial, you’ll have a fully functional TrustNote testnet running on your local computer. This local testnet will allow you to play with the TrustNote software, interact with the examples and the DAG explorer, and of course develop and test your own decentralized apps and tokens in isolation from the TrustNote main chain!

## Prerequisites

- **Ubuntu 16.0.4:** This guide assumes that you are using Ubuntu 16.0.4. Before you begin, you should have a non-root user account with `sudo` privileges set up on your system.

- **Build Essential:** The first step is to check if you have install build essentials, If not, you can tun the following commands to install:

```
sudo apt-get install build-essential git
```

- **nvm 0.33:** You can use `nvm --version` to check if you have installed Nvm 0.33 correctly. To install or upgrade, run cURL and nvm’s install script as following:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

- **Node.js 8:** You can run `node -v` to check if you have installed Node.js 8 correctly. If not, following guideline from [nodejs.org](https://nodejs.org/en/) for how to install Node.js 8 on Ubuntu based Linux distributions.

```
nvm install 8.9.4
```

- **PM2:** Starting a TrustNote testnote requires PM2, a general-purpose process manager and a production runtime for Node.js apps with a built-in Load Balancer. You can use npm to install PM2 if it’s not being installed:

```
sudo npm install pm2 -g
```

- **node-gyp:** Compiling TrustNote needs node-gyp, a cross-platform command-line tool written in Node.js for compiling native addon modules for Node.js. You can use npm to install node-gyp if it’s not being installed:

```
sudo npm install node-gyp -g
```

## 1. Generate a new SSH key

- Run the following command from your home directory:

```
ssh-keygen -t rsa -C "your_email@example.com"
```

- Press **Enter** to accept all default actions when you are prompt for input. Please do **NOT** set the passphrase when prompted.

- Your public key will be saved in `~/.ssh/id_rsa.pub` and you can view it by running the command below:

```
cat ~/.ssh/id_rsa.pub
```

## 2. Install the Source Code

- Download the testnet-builder package from GitHub:

```
git clone https://github.com/trustnote/testnet-builder.git
```

- Get the rest of the packages and install them one by one:

```
cd testnet-builder
git clone https://github.com/trustnote/trustnote-hub.git
git clone https://github.com/trustnote/trustnote-witness.git
git clone https://github.com/trustnote/trustnote-headless.git
git clone https://github.com/trustnote/trustnote-explorer.git
cd trustnote-hub
npm install
cd ../trustnote-witness
npm install
cd ../trustnote-headless
npm install
cd ../trustnote-explorer
npm install
cd ../genesis-scripts
npm install
```

- Create a `data` folder in your `~/testnet-builder` directory:

```
cd ~/testnet-builder
mkdir data
```

- After this, you should have the following folder structure exists in your `~/testnet-builder` directory:

```
├── config-files
│   ├── constants.js
│   ├── hub-conf.js
│   ├── witness-conf.js
│   ├── witness-headless-start.js
│   └── witness-start.js
├── data -- store key and address files
├── deploy.sh -- used to generate 12 witnesses automatically
├── genesis-scripts -- store scripts whick are related to generate the genesis unit
│   ├── conf.js 
│   ├── create_allConfig.js -- used to generate 12 witnesses's keys and addresses , and should be runned before create_genesis.js
│   ├── create_genesis.js -- used to generate the genesis unit
│   └── package.json
├── Readme.md -- this file
├── remove-all-data.sh delete the database of hub, witness and headless in “~/.config/”
├── start.sh -- start up hub and 12 witnesses by using pm2
├── trustnote-explorer
├── trustnote-headless
├── trustnote-hub
└── trustnote-witness
```

## 3. Create configuration files

- Copy all scripts from `~/testnet-builder/genesis-scripts` to `~/trustnote-headless/play`:

```
cp -r ~/testnet-builder/genesis-scripts/* ~/testnet-builder/trustnote-headless/play/
```

- Now you can create the keys and addresses of the 12 witnesses by running the commands below:

```
cd ~/testnet-builder/trustnote-headless/play
node create_allConfig.js
```

- After this, you should have files and folders like below exists in your `~/testnet-builder/data` directory:

```
├── allAddress.jsonwrite something
├── config.json -- seed, keys and address of witness1,witness2,...,witness12,headless13,headless14 and headless15
├── headlessXX -- primary data of headlessXX
│   ├── conf.json
│   └── keys.json
├── witnessXX -- primary data of witnessXX
│   ├── conf.json
│   └── keys.json
└── witnessAddress.json
```

## 4. Create the Genesis Unit

In the following steps, we will start with headless15, assigned in `trustnote-headless/play/package.json`, to send the payment to headless14 and generate the genesis unit accordingly.

- At first, delete headless15’s existing database configuration files from `~/.config/headless15`:

```
rm -rf ~/.config/headless15/trustnote*
```

- Copy the renewed headless15’s configuration files to `~/.config`:

```
cp -r ~/testnet-builder/data/headless15/ ~/.config/
```

- Open `~/testnet-builder/data/config.json`, the json file has an array of 15 objects, each of the object contains a collection of name/value pairs like these:

```
{“
    passphrase”: “”,
    “mnemonic_phrase”: “crash renew radio foster argue host call deposit chuckle ticket early believe”,
    “temp_priv_key”: “XaOz4jyG1sBt3Oeyfv + 3 Vj67NkhoOzuC1ceaGos0NPs = ”,
    “prev_temp_priv_key”: “RJbEXfG8eTvAOeczPt4RBtKxEC2mr / Ias7O635fBqbU = ”,
    “address”: “TIHRRM42ZMOMMSX5IOTNXWVBXGGJ7Y3O”,
    “wallet”: “giApdCEqifheY7cRZZhgR9b7qDJb6Uow7F7qPGYw35w = ”,
    “is_change”: 0,
    “address_index”: 0,
    “definition”: [“sig”,
        {“
            pubkey”: “AoESfCk79 + sE48BAhEs0L8NzCsPy3V06fNf3MhlBG / Ve”
        }
    ]
}
```

- Copy the addresses of the last 3 objects, which represent **headless13**, **headless14**, and **headless15** respectively

- Open `~/testnet-builder/trustnote-headless/play/create_genesis.js`

- Replace the address value of `arrOutputs` (at line: 23) with the address value of **headless13**

- Replace `from_address` (at line: 52) with the address value of **headless15**

- Replace `payee_address` (at line: 53) with the address value of **headless14**

- Save the file

- Now we can generate the genesis unit by running the command below from `~/testnet-builder/trustnote-headless/play`:

```
node create_genesis.js
```

- Press Enter to accept the default action when you are prompt for input. If successful, you will see the following output message which contains the **hash** of the genesis unit just being created:

```
---------->>->> Genesis d, hash=7KMUvSjlmMVGdlArmorJJn+5DwGUwNRPr4Ar4m/F49w=
```

## 5. Starts the Hub and the Witnesses

- Before starting the hub and the witnesses, we need to update `exports.GENESIS_UNIT` in `~/testnet-build/config-files/constants.js` (at Line: 13) with the **hash** of the genesis unit we just created.

- Open `testnet-builder/data/witnessAddress.json`, copy its data as shown below:

```
"5JW7CSFALLSWZSU3ILMVCYV62NAV5YNL",
"6X7X5MJGHOQXG57Z6U3NASRKKC22UWYZ",
"7C737V44ZMHGTOTTXS4HGAFXVKM2R6KQ",
"CIEAKDZBBU7BXTQNFKVE3CCPKTTXBBV4",
"FDFW66BEBF7FG7OHJPGXSYXU7DVCWXE3",
"FFJICZZ2BMFHNML6PWVPRAI33E6SGLSN",
"FPOTZYGAZBJYPUSQ44IB4JO57HCQPGWJ",
"JAVZCH7EMQOGCZG7BEP7P4AY4XQ2OIDR",
"KTKQ2T4LZGCW46Z5W5RLN5CCABA5WXJ7",
"N37NPAAADEOVEEC62FN7S4HM7TNBFESH",
"N6SOVZK24YSS3IZOND3HOAKOC3UMCFKL",
"QZ6WCQCWXDGUXXJPWISOLILDBTHGNDOD"
```

- Open `~/testnet-builder/config-files/hub-conf.js`, replace the value of `exports.initial_witnesses` (at Line: 26) with the data copied from `testnet-builder/data/witnessAddress.json`, save the file

- Open `~/testnet-builder/config-files/explorer-conf.js`, replace the value of `exports.initial_witnesses` (at Line: 14) with the same data copied from `testnet-builder/data/witnessAddress.json`, save the file

- Run `~/testnet-builder/deploy.sh` to copy all witness’ configuration files to the right place:

```
cd ~/testnet-builder
chmod +x deploy.sh
./deploy.sh
```

- Now we can start the hub and the witnesses:

```
chmod +x start.sh
./start.sh
```

- You can view the hub’s log file by running the following command:

```
pm2 logs hub
```

- And check the output of the log file and make sure you do have incoming connections like this:

```
0|hub      | Sat Jun 02 2018 20:33:24 GMT-0700 (PDT): 13 incoming connections, 0 outgoing connections, 0 outgoing connections being opened
```

## 6. The final step

As we mentioned previously, after the hub and witnesses are started, we need to delete headless15’s database configuration file and run create_genesis.js one more time to broadcast the genesis unit:

```
rm -rf ~/.config/headless15/trustnote*
cd ~/testnet-builder/trustnote-headless/play
node create_genesis.js
```

Press Enter to accept the default action when you are prompt for input.

Now you should be able to visit the DAG explorer by opening http://127.0.0.1:8080 from the web browser on your local computer.

You can play with the DAG explorer by entering the addresses you know in the search field and press the search button now!


# **Important files and variables**
- ./config-files/hub-conf.js **exports.port** **exports.initial_witnesses**
- ./config-files/witness-conf.js **exports.hub** **exports.deviceName** **exports.payout_address**
- ./config-files/constants.js **exports.GENESIS_UNIT**
- ./config-files/witness-headless-start.js **set default passphrase**
- ./config-files/witness-start.js **delete sendMail function in noticeAdmin()**
- ./config-files/witness-conf.js **exports.webPort** **exports.initial_witnesses** **exports.initial_peers**
- When witness and headless startup，they will read conf.json and keys.json from ~/.config/$devicename/. If there is no keys.json in the so called directory, they will generate new key and write it in the keys.json.
