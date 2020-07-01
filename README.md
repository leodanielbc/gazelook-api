# GazeLook 🚀

### Requisitos del Proyecto.📋
  * Node.js
  * Mysql
  * TypeScript

### Instrucciones de instalación 🔧
  _Lo que se necesista es:_
1. Chequear la base de datos si esta creada
2. Revisar la configuración del archivo
```
ormconfig.json
```
3. Ejecutar en el directorio principal del proyecto
```
npm install
```
### Ejecución del Proyecto. ⚙️
_Se realiza los siguientes pasos:_

Ejecutar en el directorio principal del proyecto
```
npm run start
```
si se desea quitar la carpeta dist
```
npm rum clean
```
### Documentación del API.📋
Luego de ejecutar el proyecto pueden revisar la documentación del API
```
http://localhost:4000/api-docs
```
### Configuración de Amazon S3.📋
En el directorio de configuración
```
src/config/config.ts
```
Pueden poner sus credenciales de la propiedades
```
accessKeyId
secretAccessKey
bucket
```
En Amazon S3 deben crear dos carpetas
```

perfilUser -> para las imagenes de perfil de usuario
contentProject -> para el contenido digital(audio/video) de los proyectos
```
### Dependencias. 📦
>[aws-sdk](https://www.npmjs.com/package/aws-sdk) - Se utilizo para almacenar archivos en el storage de amazon
>[bcryptjs](https://www.npmjs.com/package/bcryptjs) - se uso para encriptar contraseñas
>[class-validator](https://www.npmjs.com/package/class-validator) - validar objetos anidados
>[cors](https://www.npmjs.com/package/cors) - utiliza cabeceras HTTP adicionales
>[express](https://www.npmjs.com/package/express) - proporciona mecanismos para Escritura de manejadores de peticiones
>[helmet](https://www.npmjs.com/package/helmet) - proteger las aplicaciones Express configurando varios encabezados HTTP
>[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Permite crea JWT de manera sencilla
>[morgan](https://www.npmjs.com/package/morgan) - Se utiliza para registrar detalles de solicitud
> [multer](https://www.npmjs.com/package/multer) - Permite subir archivos a una web app de Node
> [mysql](https://www.npmjs.com/package/mysql) - Permite la conexion a la base de datos entre node.js
> [nanoid](https://www.npmjs.com/package/nanoid) - Permite empaquetar un número similar de bits aleatorios en solo 21 símbolos en lugar de 36
> [reflect-metadata](https://www.npmjs.com/package/reflect-metadata) -  Agregan la capacidad de aumentar una clase y sus miembros
> [rimraf](https://www.npmjs.com/package/rimraf) - Permite Distribuir el anidamiento de carpetas
> [ts-node](https://www.npmjs.com/package/ts-node) -  Permite al usuario ejecutar archivos mecanografiados directamente
> [typeorm](https://www.npmjs.com/package/typeorm) - Es un ORM que puede ejecutarse en plataformas NodeJS entre otras.
