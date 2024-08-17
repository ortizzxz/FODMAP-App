FROM openjdk:21-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 9898
CMD ["java", "-jar", "app.jar"]