function insertMessageAction(message) {
  // Acá va el código que toma el mensaje y lo inserta en la imagen
  //Declaración de variables a utilizar
  var msgBinario = imgCrypter.stringToBinary(message);
  var dimensions = imgCrypter.getDimensions();
  var inicioByte = 0;
  var finByte = 3;  
  //Recorremos la imagen pixel por pixel
  for(var j = 0; j <= dimensions.height; j++) {
    for(var i = 0; i <= dimensions.width; i++) {      
      //Tomamos los valores RGB del pixel en el que estamos parados y los comparamos con los 3 bits correspondientes al msj que debemos encriptar. De ser necesario los modificamos.
      var pixelInfo = imgCrypter.getPixel(i, j);
      var subMsgBinario = msgBinario.substring(inicioByte, finByte);
      inicioByte = finByte;
      finByte += 3;        

      if (pixelInfo.r%2 != subMsgBinario[0]){        
        if (pixelInfo.r%2 == 0){
          pixelInfo.r++
        }else{
          pixelInfo.r--
        }
      }
      
      if (pixelInfo.g%2 != subMsgBinario[1]){
        if (pixelInfo.g%2 == 0){
          pixelInfo.g++
        }else{
          pixelInfo.g--
        }
      }

      if (pixelInfo.b%2 != subMsgBinario[2]){
        if (pixelInfo.b%2 == 0){
          pixelInfo.b++
        }else{
          pixelInfo.b--
        }
      }
      
      imgCrypter.setPixel(i, j, { r: pixelInfo.r, g: pixelInfo.g, b: pixelInfo.b });      
    }  
  }
  //Aplicamos los cambios en la imagen y mostramos un msj al usuario.
  imgCrypter.applyChanges();
  alert('El mensaje ha sido codificado con éxito.');
}

function getMessageAction() {
  // Acá va el código que toma la imagen y la recorre en busca de un msj. De haberlo, lo decodifica.
  //Declaración de variables a utilizar
  var dimensions = imgCrypter.getDimensions();
  var stringBinario = '';
  var inicioByte = 0;
  var finByte = 8;
  var iniciador = 0;
  var limitador = 0;
  var mensaje = '';
  var caracter = '';
  //Recorremos la imagen pixel por pixel y vamos almacenando los valores del LSB en un string.
  for(var j = 0; j <= dimensions.height; j++) {
    for(var i = 0; i <= dimensions.width; i++) {
      var pixelInfo = imgCrypter.getPixel(i, j);
      
      if (pixelInfo.r%2 == 0){
        stringBinario += 0;
      }else{
        stringBinario += 1;
      }
      
      if (pixelInfo.g%2 == 0){
        stringBinario += 0;
      }else{
        stringBinario += 1;
      }

      if (pixelInfo.b%2 == 0){
        stringBinario += 0;
      }else{
        stringBinario += 1;
      }
    }
  }

  //Una vez obtenidos todos los LSB de cada pixel de la imagen, recorremos el string de 8 en 8, y lo vamos convirtiendo, primero en ASCII y luego en un caracter.
  while(limitador!=2){
    var subStringBinario = stringBinario.substring(inicioByte, finByte);
    inicioByte = finByte;
    finByte += 8;
    var asciiByte = 0;
    var j = 7;
    
    for (i=0; i<=7; i++){
      var n = parseInt(subStringBinario[i]);
      asciiByte += n*Math.pow(2, j);
      j--      
    }
    caracter = String.fromCharCode(asciiByte);
    //Almacenamos caracter por caracter en una variable, para formar el msj.
    mensaje += caracter;
    //Si encontramos un # suma uno al limitador. Al llegar a 2, deja de recorrer el string y devuelve el msj obtenido.
    if(asciiByte == 35){
      limitador++;
    }
    //Si encontramos un @ suma uno al iniciador.
    if(asciiByte == 64){
      iniciador++;
    }
    //Si despues de decodificar 2 caracteres, el iniciador no esta en 2, devuelve un msj de error.
    if (mensaje.length==2 && iniciador !==2){
    return "La imagen no tiene ningun mensaje encriptado.";
    }
  }
  return mensaje;
}
