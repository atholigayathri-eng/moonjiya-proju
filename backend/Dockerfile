# Stage 1: Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app

# Copy pom.xml and pre-fetch dependencies for layer caching
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy application source code and build production jar
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Production Runtime stage
FROM eclipse-temurin:17-jre
WORKDIR /app

# Create non-root user and group for container security
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Copy compiled JAR from builder stage
COPY --from=builder /app/target/educycle-backend-0.0.1-SNAPSHOT.jar app.jar

# Set ownership to appuser
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose default port (Render will automatically override with PORT env var)
EXPOSE 8080

# Set default PORT environment variable
ENV PORT=8080

# Launch application on 0.0.0.0 binding to dynamic PORT
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT:-8080} -jar app.jar"]
