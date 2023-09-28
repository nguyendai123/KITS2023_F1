FROM jelastic/maven:3.8.6-openjdk-20.ea-b6 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:20-jdk-slim
COPY --from=build /target/demo-0.0.1-SNAPSHOT.jar demo.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","demo.jar"]
