FROM openjdk:8-jre-alpine

RUN mkdir /app

WORKDIR /app

ADD ./api/target/api-1.0.jar /app

EXPOSE 8080

CMD ["java", "-jar", "api-1.0.jar"]
