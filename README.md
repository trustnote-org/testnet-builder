To build the trustnote's testnet it is required to follow the instruction below. This instruction will result in successful build only on **Linux** systems. The most important reason is, Linux is a better platform for developers. Even more, the complexity of windows environment which requires plenty of additional packages are avoided by using Linux system. This manual describes the installation of testnet from installing few additional packages and required tools on the system to all the required setting needed to be modified. Finally, it is explained that how to make the testnet works properly.

# **Installing required tools on Ubuntu**
The following procedure has been tested on ubuntu version 16.04 successfully.

First step is to install "compiler" and "git" as below:
> sudo apt-get install build-essential git

Next is to install "nvm":
> curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash

Finally, to reconnect your server and make sure that "nvm" working, also checking the "nvm" version:
> nvm -v

Further more, to install "lts node.js" in "nvm":
> nvm install 8.9.4

And for checking the version of "node.js" and "npm":
> node -v<br>
> npm -v

It's also required to install "node.js process manager":
> npm install pm2 -g

And to install "node.js native code compiler":
> npm install node-gyp -g

# **Downloading trustnote source code**
In order to download the trsutnote source code, you are required to generate ssh key before continuing the following steps.

**notice: Please, do not set the passphrase. Otherwise, 'npm install' will keep waiting for the user input, even though you insert the input, the process will be aborted.**
> mkdir ~/.ssh<br>
> ssh-keygen -t rsa -C "yourEmail@example.com"<br>
> cat ~/.ssh/id_rsa.pub<br>
> ssh-rsa<br> AAAAB3NzaC1yc2EAAAADAQABAAABAQDH5A8oWo8NNXdfRcqjSY4mY18s079UF7C5Jni9aHZQ9iJ7iNH+53R4TSfztEhvkUnGe7XrQSfodWXu16FOnH1dIXZzJ63hR6lZ4ZOz9opt4AOkoGgJ1NC7Z1oFW7OX6siWSjElSHc1lfNiSia+aazIbN5LlYe6B966EJ2bGCE1HRqAJrhAA1zlGL+CCUYcyRBvjv+mTx+GWMqwixh3TKgbt7+xEuKnbDaVWXF+LlgjSKg2qzehgmjiA4WFQBZnhB5z3990ZGrbSrdUUnpdpYHbWaZBQWoN36QwkBo4RNr6KYpdRbHCTRVqIWMpeI08GMMypIh7QIASUAM6pPIWq5qd yourname@example.com

Next it is needed to set the "public-key" to "gitee" and to download "testnet-builder" package from [TrustNote](https://github.com/trustnote):
> cd ~<br>
> git clone https://github.com/trustnote/testnet-builder.git

Even more, we should download "hub", "witness" and "headless" from "gitee" in "testnet-builder/". After the download completion it is required to run 'npm install' in each sub-folder.
> cd testnet-builder<br>
> git clone https://github.com/trustnote/trustnote-hub.git<br>
> git clone https://github.com/trustnote/trustnote-witness.git<br>
> git clone https://github.com/trustnote/trustnote-headless.git<br>
> git clone https://github.com/trustnote/trustnote-explorer.git

If "npm install" throws any error or exception, it is required to run "npm install" for more times until it works properly.

# **Files available in ~/testnet-builder/ directory**
├── config-files<br>
│   ├── constants.js<br>
│   ├── hub-conf.js<br>
│   ├── witness-conf.js<br>
│   ├── witness-headless-start.js<br>
│   └── witness-start.js<br>
├── data -- store key and address files<br>
├── deploy.sh -- used to generate 12 witnesses automatically<br>
├── genesis-scripts -- store scripts whick are related to generate the genesis unit<br>
│   ├── conf.js <br>
│   ├── create_allConfig.js -- used to generate 12 witnesses's keys and addresses , and should be runned before create_genesis.js<br>
│   ├── create_genesis.js -- used to generate the genesis unit<br>
│   └── package.json<br>
├── Readme.md -- this file<br>
├── remove-all-data.sh delete the database of hub, witness and headless in “~/.config/”<br>
├── start.sh -- start up hub and 12 witnesses by using pm2<br>
├── trustnote-explorer<br>
├── trustnote-headless<br>
├── trustnote-hub<br>
└── trustnote-witness

# **Running the testnet-builder script**
It is required to copy all files in "testnet-builder" folder to "trustnote-headless/play:
> cp -r ~/testnet-builder/genesis-scripts/* ~/testnet-builder/trustnote-headless/play/

And then:
> cd ~/testnet-builder/trustnote-headless/play<br>
> node create_allConfig.js

Eventually all data generated will be available at "~/testnet-builder/data/"

# **Files available in "~/testnet-build/data/" directory**
├── allAddress.json<br>write something
├── config.json -- seed, keys and address of witness1,witness2,...,witness12,headless13,headless14 and headless15<br>
├── headlessXX -- primary data of headlessXX<br>
│   ├── conf.json<br>
│   └── keys.json<br>
├── witnessXX -- primary data of witnessXX<br>
│   ├── conf.json<br>
│   └── keys.json<br>
└── witnessAddress.json

# **Create genesis unit**
In the following steps headless15, assigned in trustnote-headless/play/package.json, will be used to generate the genesis unit.

To delete headless15's database:
> rm -rf ~/.config/headless15/trustnote*

Next for renewing headless15's conf.json and keys.json:
> cp -r ~/testnet-builder/data/headless15/ ~/.config/

Also to get the addresses of "witnesses" and "headlesses":
> cat ~/testnet-builder/data/config.json<br>
>{<br>
>                "passphrase": "",<br>
>                "mnemonic_phrase": "faith oak symbol link window deliver gym shift know lab forest cupboard",<br>
>                "temp_priv_key": "ZXDxyZAPltxWEoloDUnHgh8bpzsO5B+3N3uvTh3FfO8=",<br>
>                "prev_temp_priv_key": "EyM9Cei0+ACAQvXmXOqvzsdgp5JTPQLPBFkcTzK0yYs=",<br>
>                **"address": "OZAMEJPXNVBSRDPYO5WQWDOWBUTNUIF7",**<br>
>                "wallet": "iOF60fTjMyjNEMHLjAYR3ptTBv12wKHpS9LyQyE5FaU=",<br>
>                "is_change": 0,<br>
>                "address_index": 0,<br>
>                "definition": [<br>
>                        "sig",<br>
>                        {<br>
>                                "pubkey": "At+qvLBte+RkXGZCQ1+7uU5pHm03Y3S9Ciapj/KEq2yj"<br>
>                        }<br>
>                ]<br>
>        },<br>

Update create_genesis.js.<br>
Update arrOutputs (change address of the genesis unit) with headless13's address.<br>
Update from_address (sending address of the first transaction) in createPayment() with headless15's address.<br>
Update payee_address (receiving address of the first transaction) in createPayment() with headless14's address.<br>

Now, it is required to run "create_genesis.js" for first time to get hash value of the genesis unit.
> node create_genesis.js

So, you will get the hash of the genesis unit if everything is OK.
> ---------->>->> Genesis d, hash=**uYjgSazo4Q+OtA7gZrHGuMWoFvUQFitzuu6juWGA/cI=**

To update the *exports.GENESIS_UNIT* in "config-files/constants.js" which will be used by hub and witnesses.
> vi ~/testnet-build/config-files/constants.js<br>

Also, delete "database of headless15" before running "create_genesis.js" for second time.
> rm -rf ~/.config/headless15/trustnote*

# **Startup hub and witnesses**
To startup hub and witness first it is required to update **exports.initial_witnesses** in "hub-conf.js" and "explorer-conf.js" by using the data in "testnet-builder/data/**witnessAddress.json**".
> cat ~/testnet-builder/data/witnessAddress.json<br>
> vi ~/testnet-builder/config-files/hub-conf.js<br>
> vi ~/testnet-builder/config-files/explorer-conf.js

Second running the "deploy" script:
> cd ~/testnet-builder<br>
> ./deploy.sh

Now, it's time to startup "hub" and "witnesses":
> ./start.sh

Then, for viewing hub's log:
> pm2 logs hub

Finally, for checking incoming connections:
> Tue Feb 27 2018 13:54:51 GMT+0800 (CST): **12 incoming connections**, 0 outgoing connections, 0 outgoing connections being opened

# **One more final step to go**
This last step is running "create_genesis.js" one more time. Last time, hub considered the genesis unit as invalid. Therefore, after updating the hash value of the genesis unit in hub and witness, you are required to run create_genesis.js again. Please, note that before running create_genesis.js, you must delete headless15's database first.
> rm -rf ~/.config/headless15/trustnote*
> cd ~/testnet-builder/trustnote-headless/play<br>
> node create_genesis.js

Finally, we will observe that the testnet is built and running successfully, and you can visit the DAG ledger explorer by ip:port.

# **Important files and variables**
- ./config-files/hub-conf.js **exports.port** **exports.initial_witnesses**
- ./config-files/witness-conf.js **exports.hub** **exports.deviceName** **exports.payout_address**
- ./config-files/constants.js **exports.GENESIS_UNIT**
- ./config-files/witness-headless-start.js **set default passphrase**
- ./config-files/witness-start.js **delete sendMail function in noticeAdmin()**
- ./config-files/witness-conf.js **exports.webPort** **exports.initial_witnesses** **exports.initial_peers**
- When witness and headless startup，they will read conf.json and keys.json from ~/.config/$devicename/. If there is no keys.json in the so called directory, they will generate new key and write it in the keys.json.
