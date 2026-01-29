# =========================
# Runtime image
# =========================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
ENV ASPNETCORE_URLS=http://+:80
ENV ASPNETCORE_ENVIRONMENT=Development

# =========================
# Build image
# =========================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project files (better Docker cache)
COPY src/VehicleTracker.API/VehicleTracker.API.csproj src/VehicleTracker.API/
COPY src/VehicleTracker.DAL/VehicleTracker.DAL.csproj src/VehicleTracker.DAL/
COPY src/VehicleTracker.Models/VehicleTracker.Models.csproj src/VehicleTracker.Models/

# Restore dependencies
RUN dotnet restore src/VehicleTracker.API/VehicleTracker.API.csproj

# Copy everything else
COPY . .

# Build & publish
RUN dotnet publish src/VehicleTracker.API/VehicleTracker.API.csproj \
    -c Release \
    -o /app/publish \
    /p:UseAppHost=false

# =========================
# Final image
# =========================
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "VehicleTracker.API.dll"]