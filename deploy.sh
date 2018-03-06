pm2 delete all

rm -rf ~/.config/trustnote*
rm -rf ~/.config/witness*
rm -rf ~/.config/headless*
rm -rf ./witness*
rm -rf ./headless*

cp -r ./data/witness* ~/.config/
cp -r ./data/headless* ~/.config/
cp -r ./config-files/hub-conf.js ./trustnote-hub/conf.js
cp -r ./config-files/witness-conf.js ./trustnote-witness/conf.js
cp -r ./config-files/explorer-conf.js ./trustnote-explorer/conf.js
cp -r ./config-files/witness-headless-start.js ./trustnote-witness/node_modules/trustnote-headless/start.js
cp -r ./config-files/witness-start.js ./trustnote-witness/start.js
cp -r ./config-files/constants.js ./trustnote-witness/node_modules/trustnote-common/constants.js
cp -r ./config-files/constants.js ./trustnote-headless/node_modules/trustnote-common/constants.js
cp -r ./config-files/constants.js ./trustnote-hub/node_modules/trustnote-common/constants.js
cp -r ./config-files/constants.js ./trustnote-explorer/node_modules/trustnote-common/constants.js

for i in {1..12}
do
    echo  deploy witness$i
    cp -r  trustnote-witness/ ./witness$i
    sed -i "s/trustnote-witness/witness$i/g" ./witness$i/package.json
done

echo deploy finshed! run ./start.sh!
