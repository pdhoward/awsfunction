exports.handler = async event => {  
  console.log(`------------this fired -----------`)
  const params = JSON.parse(event.body) 
  console.log(params)
  return {
    statusCode: 200,
    body: `Hello ${params.name}!`
  }
}
