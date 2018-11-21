# cobianApp

`npm i`

# en windows para apk en tienda

iniciar cmd como administrador

Agregar a variables de entorono `cd C:\Program Files\Java\jdk1.8.0_181\bin` y `C:\Users\Cesar\AppData\Local\Android\Sdk\build-tools\28.0.2`

Ejecutar en la carpeta de la apk

`keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000`

`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore HelloWorld-release-unsigned.apk alias_name`

`zipalign -v 4 HelloWorld-release-unsigned.apk HelloWorld.apk`
