export const searchAction = locals => ({
    type: 'GET_LOCALS',
    locals: locals,
})

export const authAction = token => ({
    type: 'GET_TOKEN',
    token: token
})

export const favoriteAction = favorites => ({
    type: 'GET_FAVORITES',
    favorites: favorites
})
