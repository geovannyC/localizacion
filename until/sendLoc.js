const enviarData=async(datos,url)=>{
  try{
    const response = await fetch(url,{
      method: 'POST',
      body: datos,
      headers:{
        'Content-type': 'application/json'
      }
    })
    if (response.ok){
      console.log('respuesta favorable')
    }
  }catch(error){
    console.log(error)
  }
}
export default enviarData;