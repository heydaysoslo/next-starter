// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  console.log('res', res)
  console.log('req', req)
  res.statusCode = 200
  res.json({ name: 'John Doe' })
  // const { url } = JSON.parse(event.body)

  // extract(url)
  //   .then(data => {
  //     callback(null, {
  //       statusCode: 200,
  //       body: JSON.stringify({
  //         result: data,
  //         status: 'success'
  //       })
  //     })
  //   })
  //   .catch(err => {
  //     callback(null, {
  //       statusCode: 500,
  //       body: JSON.stringify({
  //         error: err,
  //         status: 'error'
  //       })
  //     })
  //   })
}
