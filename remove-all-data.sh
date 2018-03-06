pm2 delete all

rm ~/.config/trustnote-hub/trustnote*

for i in {13..15}
do
    rm  ~/.config/headless$i/trustnote*
done

for i in {1..12}
do
    rm  ~/.config/witness$i/trustnote*
done

echo All database has been deleted！
