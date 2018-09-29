export const SEARCH = 'SEARCH';

export const actionSearchLocals = value => (console.log('action'),{
    type: 'SEARCH',
    locals: value
});
