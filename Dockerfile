# Usa una imagen base oficial de Node.js (ajusta la versión según tus necesidades)
FROM node:18

# Define el directorio de trabajo en el contenedor
WORKDIR /app

# Instala git para clonar el repositorio
RUN apt-get update && apt-get install -y git

# Clona el repositorio desde GitHub (reemplaza con tu propio repositorio)
RUN git clone https://github.com/usuario/proyecto-nestjs.git /app

# Instala las dependencias del proyecto
RUN npm install

# Compila el código TypeScript a JavaScript
RUN npm run build

# Define variables de entorno
ENV NODE_ENV=production

# Expone el puerto en el que corre la aplicación NestJS
EXPOSE 3000

# Comando para iniciar la aplicación en modo producción
CMD ["npm", "run", "start:prod"]
