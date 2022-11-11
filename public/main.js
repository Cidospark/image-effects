async function init() {
  let rustApp = null

  try {
    rustApp = await import('../pkg')
  } catch(err) {
    console.error(err)
    return;
  }

  console.log(rustApp)

  const input = document.getElementById('upload')
  const fileReader = new FileReader() // an official javascript class that allows us store file in javascript

  fileReader.onloadend = () => {
    let base64 = fileReader.result.replace(
      /^data:image\/(png|jpeg|jpg);base64,/, ''
    )
    let img_data_url = rustApp.grayscale(base64)
    document.getElementById('new-img').setAttribute(
      'src', img_data_url
    )
  }

  input.addEventListener('change', () => {
    fileReader.readAsDataURL(input.files[0]) // files are read as objects to the input element. 
                                              // with the files values as bytes. the readAsDataUrl() of the fileReader object
                                              // is used to convert the byte values to string and 64 bit encoding to ease tranfer
                                              // to our rust program
  })
}

init()