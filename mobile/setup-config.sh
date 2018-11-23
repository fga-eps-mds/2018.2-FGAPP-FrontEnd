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

ROLES_CLOUDNARY_KEY=$ROLES_CLOUDNARY_KEY
ROLES_CLOUDNARY_SECRET=$ROLES_CLOUDNARY_SECRET
ROLES_CLOUDNARY_CLOUD=$ROLES_CLOUDNARY_CLOUD

# Checking different envs
if [ "$1" = 'production' ]; then
    echo '• production env...'
    VENDAS_API=$PROD_VENDAS_API
    INTEGRA_LOGIN_AUTH=$PROD_INTEGRA_LOGIN_AUTH
    INDICA_AI_API=$PROD_INDICA_AI_API
    ROLES_EVENTS_API=$PROD_ROLES_EVENTS_API
    ROLES_COMMENTS_API=$PROD_ROLES_COMMENTS_API

elif [ "$1" = 'staging' ]; then
    echo '• staging env...'
    VENDAS_API=$STG_VENDAS_API
    INTEGRA_LOGIN_AUTH=$STG_INTEGRA_LOGIN_AUTH
    INDICA_AI_API=$STG_INDICA_AI_API
    ROLES_EVENTS_API=$STG_ROLES_EVENTS_API
    ROLES_COMMENTS_API=$STG_ROLES_COMMENTS_API

elif [ "$1" = 'testing' ]; then
    echo '• testing env...'
    VENDAS_API='http://test'
    INTEGRA_LOGIN_AUTH='http://test'
    INDICA_AI_API='http://test'
    ROLES_EVENTS_API='http://test'
    ROLES_COMMENTS_API='http://test'
    ROLES_CLOUDNARY_KEY=123
    ROLES_CLOUDNARY_SECRET=123
    ROLES_CLOUDNARY_CLOUD=123

else
    echo '• default env...'
fi

echo -e "Checking variables... \n"
[ -z "$VENDAS_API" ] && emptyVarMessage 'VENDAS_API' && exit 1
[ -z "$INTEGRA_LOGIN_AUTH" ] && emptyVarMessage 'INTEGRA_LOGIN_AUTH' && exit 1
[ -z "$INDICA_AI_API" ] && emptyVarMessage 'INDICA_AI_API' && exit 1
[ -z "$ROLES_EVENTS_API" ] && emptyVarMessage 'ROLES_EVENTS_API' && exit 1
[ -z "$ROLES_COMMENTS_API" ] && emptyVarMessage 'ROLES_COMMENTS_API' && exit 1
[ -z "$ROLES_CLOUDNARY_KEY" ] && emptyVarMessage 'ROLES_CLOUDNARY_KEY' && exit 1
[ -z "$ROLES_CLOUDNARY_SECRET" ] && emptyVarMessage 'ROLES_CLOUDNARY_SECRET' && exit 1
[ -z "$ROLES_CLOUDNARY_CLOUD" ] && emptyVarMessage 'ROLES_CLOUDNARY_CLOUD' && exit 1
echo -e " ✓ variables ok! \n"

echo "$prefix.VENDAS_API='$VENDAS_API'" >> $file
echo "$prefix.INTEGRA_LOGIN_AUTH='$INTEGRA_LOGIN_AUTH'" >> $file
echo "$prefix.INDICA_AI_API='$INDICA_AI_API'" >> $file
echo "$prefix.ROLES_EVENTS_API='$ROLES_EVENTS_API'" >> $file
echo "$prefix.ROLES_COMMENTS_API='$ROLES_COMMENTS_API'" >> $file
echo "$prefix.ROLES_CLOUDNARY_KEY='$ROLES_CLOUDNARY_KEY'" >> $file
echo "$prefix.ROLES_CLOUDNARY_CLOUD='$ROLES_CLOUDNARY_CLOUD'" >> $file
echo "$prefix.ROLES_CLOUDNARY_SECRET='$ROLES_CLOUDNARY_SECRET'" >> $file


