export default async (email, password) => {
  const login_path = `${process.env.INTEGRA_LOGIN_AUTH}/api/login/`;

  const login = await fetch(login_path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'username': email, //UsernameField foi definido como email
      'password': password,
    }),
  })
  .then(response => response.json())
  .catch(error => {
    console.log(error);
  });

  return login
}
