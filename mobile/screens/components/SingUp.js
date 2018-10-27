export default async (email, password) => {
    var registration_path = `${process.env.INTEGRA_LOGIN_AUTH}/api/registration/`;
    const register = await fetch(registration_path,{
    method: 'POST',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        'email': email,
        'password1': password,
        'password2': password,

    }),
    })
    
    const registerJson = register.json()

    return registerJson
}