# USED OF LOCAL BUILD OF IMAGE AND RUNNING THE CONTAINER. IMAGED PUSHED TO DOCKER HUB.
#FROM openjdk:22-jdk
#
#ADD ./target/VehicleTracker-0.0.1-SNAPSHOT.jar  VechicleTracker.jar
#
#ENTRYPOINT ["java", "-jar" , "VechicleTracker.jar"]




# -------- STAGE 1: BUILD --------
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

# -------- STAGE 2: RUN --------
FROM eclipse-temurin:17-jre
WORKDIR /app

COPY --from=build /app/target/VehicleTracker-0.0.1-SNAPSHOT.jar VehicleTracker.jar

ENTRYPOINT ["java", "-jar", "VehicleTracker.jar"]

