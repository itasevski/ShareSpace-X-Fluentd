FROM adoptopenjdk:11-jre-hotspot
ARG JAR_FILE=*.jar
COPY ${JAR_FILE} sbapplication.jar
ENTRYPOINT ["java", "-jar", "sbapplication.jar"]