function insertMessageAction(message) {
  // Acá va el código que toma el mensaje y lo inserta en la imagen
  for(var i = 10; i <= 200; i++) {
    for(var j = 0; j <= 50; j++) {
      imgCrypter.setPixel(i, j, { r: 255, g: 0, b: 0 });
    }
  }
  imgCrypter.applyChanges();
}

function getMessageAction() {
  var dimensions = imgCrypter.getDimensions();
  var stringBinario = '';
  var inicioByte = 0;
  var finByte = 8;
  var iniciador = 0;
  var limitador = 0;
  var mensaje = '';
  var caracter = '';

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
    mensaje += caracter;
    
    if(asciiByte == 35){
      limitador++;
    }
    if(asciiByte == 64){
      iniciador++;
    }
    if (mensaje.length==2 && iniciador !==2){
    return "La imagen no tiene ningun mensaje encriptado.";
    }
  }
  return mensaje;
}
