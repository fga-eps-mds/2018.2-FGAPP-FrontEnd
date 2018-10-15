export const searchAction = localName => (
    console.log('SEARCH ACTION'),
    console.log(localName), console.log('FINISH ACTION'), {
    type: 'GET_LOCALS',
    locals: localName
})
