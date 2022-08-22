PACKAGE_NAME='file-organizer'
sudo rm -r "$HOME/.local/share/$PACKAGE_NAME"

INITIAL_PATH="$HOME"
INSTALL_PATH=(".local" 'share' $PACKAGE_NAME)

for i in "${INSTALL_PATH[@]}"
do
  echo $i
  INITIAL_PATH="$INITIAL_PATH/$i"
  if [[ ! -d "$INITIAL_PATH" ]]; then
    echo "create $i"
    mkdir $INITIAL_PATH
  fi
done

echo '========='
echo "copying to app to $INITIAL_PATH"
npm i 
sudo cp -r ./* $INITIAL_PATH
echo '========='

cd $INITIAL_PATH

pm2 start ./ecosystem.config.js

CONFIG_PATH="$HOME/.config/$PACKAGE_NAME"
if [[ ! -d "$CONFIG_PATH" ]]; then
  echo "creating config file"
  mkdir $CONFIG_PATH
else
  rm -r $CONFIG_PATH
  mkdir $CONFIG_PATH
fi

echo $CONFIG_PATH

echo '========='
echo "copying to $CONFIG_PATH"
cp config.json $CONFIG_PATH
echo '========='
