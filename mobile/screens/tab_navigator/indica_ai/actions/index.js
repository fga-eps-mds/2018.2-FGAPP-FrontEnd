export const requestSearchAction = localName => ({
    type: 'REQUEST_LOCALS',
    local: localName,
})

export const searchAction = locals => ({
    type: 'GET_LOCALS',
    locals: locals,
})
