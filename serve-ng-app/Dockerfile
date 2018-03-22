FROM openjdk:8-jre-alpine

RUN mkdir /app

WORKDIR /app

ADD ./target/serve-ng-app-0.0.1-SNAPSHOT.jar /app

EXPOSE 4200

CMD ["java", "-jar", "serve-ng-app-0.0.1-SNAPSHOT.jar"]
