const fakeData = {
    Object: {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1MywidXNlcm5hbWUiOiJ0ZXN0ZTE2QGdtYWlsLmNvbSIsImV4cCI6MTU0MDYwMjA5MSwiZW1haWwiOiJ0ZXN0ZTE2QGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNTQwNjAxNzkxfQ.SNTK7ViXyoLH54YBAIgF_uvIBqDetEkMFTNTzkXeUY8",
        "user": {
            "email": "teste16@gmail.com",
            "first_name": "",
            "last_name": "",
            "pk": 53,
            "username": "teste16"
        },
    }
}

export default async () => {
    return await new Promise(resolve => {
        resolve(fakeData.Object.json())
    })
}
