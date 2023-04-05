const user = 'cesar.martinez'
const password = 'Yecgaa-kjkszpj-2'

const data = new FormData()
data.append('usuario', user)
data.append('password', password)

const url = 'http://187.218.23.71/API_REST/api/autorizacion'

const getData = async (url) => {
  const res = await fetch(url, {
    method: 'POST',
    body: data
  })
  const auth = await res.json()
  return auth
}

getData(url).then((data) =>
  data.status !== 200
    ? console.log('Credenciales incorrectas!')
    : console.log(data)
)
