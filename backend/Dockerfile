# Etapa de construcción
FROM openjdk:21-jdk AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo JAR al contenedor
COPY target/fodmap-backend-0.0.1-SNAPSHOT.jar /app/fodmap-backend-0.0.1-SNAPSHOT.jar

# Comando para ejecutar el archivo JAR
CMD ["java", "-jar", "/app/fodmap-backend-0.0.1-SNAPSHOT.jar"]
