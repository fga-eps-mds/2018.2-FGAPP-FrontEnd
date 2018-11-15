set -e

function emptyVarMessage(){
    echo " ✘ variable $1 is empty"
}

variables=( 'VENDAS_API' 'INTEGRA_LOGIN_AUTH' 'INDICA_AI_API' )
file='env-config.js'

echo "Setting up environmental variables"

if [ -f .env ]; then
    echo " ✓ Reading .env"
    . .env
fi

echo "Checking variables... \n"

[ -z "$VENDAS_API" ] && emptyVarMessage 'VENDAS_API' && exit 1
[ -z "$INTEGRA_LOGIN_AUTH" ] && emptyVarMessage 'INTEGRA_LOGIN_AUTH' && exit 1
[ -z "$INDICA_AI_API" ] && emptyVarMessage 'INDICA_AI_API' && exit 1

echo " ✓ variables ok! \n"

rm -rf $file

prefix='process.env'
echo "$prefix.VENDAS_API='$VENDAS_API'" >> $file
echo "$prefix.INTEGRA_LOGIN_AUTH='$INTEGRA_LOGIN_AUTH'" >> $file
echo "$prefix.INDICA_AI_API='$INDICA_AI_API'" >> $file