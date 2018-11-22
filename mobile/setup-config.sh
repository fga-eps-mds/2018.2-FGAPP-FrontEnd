set -e

echo "Setting up environmental variables..."

function emptyVarMessage(){
    echo " ✘ variable $1 is empty"
}

file='env-config.js'
rm -rf $file
prefix='process.env'

if [ -f .env ]; then
    echo " ✓ Reading .env"
    . .env
fi

# Checking different envs
if [ "$1" = 'production' ]; then
    echo '• production env...'
    VENDAS_API=$PROD_VENDAS_API
    INTEGRA_LOGIN_AUTH=$PROD_INTEGRA_LOGIN_AUTH
    INDICA_AI_API=$PROD_INDICA_AI_API
    GOOGLE_MAPS_KEY=$PROD_GOOGLE_MAPS_KEY

elif [ "$1" = 'staging' ]; then
    echo '• staging env...'
    VENDAS_API=$STG_VENDAS_API
    INTEGRA_LOGIN_AUTH=$STG_INTEGRA_LOGIN_AUTH
    INDICA_AI_API=$STG_INDICA_AI_API
    GOOGLE_MAPS_KEY=$STG_GOOGLE_MAPS_KEY

elif [ "$1" = 'testing' ]; then
    echo '• testing env...'
    VENDAS_API='http://test'
    INTEGRA_LOGIN_AUTH='http://test'
    INDICA_AI_API='http://test'

else
    echo '• default env...'
fi

echo -e "Checking variables... \n"
[ -z "$VENDAS_API" ] && emptyVarMessage 'VENDAS_API' && exit 1
[ -z "$INTEGRA_LOGIN_AUTH" ] && emptyVarMessage 'INTEGRA_LOGIN_AUTH' && exit 1
[ -z "$INDICA_AI_API" ] && emptyVarMessage 'INDICA_AI_API' && exit 1
[ -z "$GOOGLE_MAPS_KEY" ] && emptyVarMessage 'GOOGLE_MAPS_KEY' && exit 1
echo -e " ✓ variables ok! \n"

echo "$prefix.VENDAS_API='$VENDAS_API'" >> $file
echo "$prefix.INTEGRA_LOGIN_AUTH='$INTEGRA_LOGIN_AUTH'" >> $file
echo "$prefix.INDICA_AI_API='$INDICA_AI_API'" >> $file
echo "$prefix.GOOGLE_MAPS_KEY='$GOOGLE_MAPS_KEY'" >> $file


