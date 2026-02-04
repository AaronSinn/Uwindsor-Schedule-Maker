# Stage 1: Build React Frontend
FROM node:20 AS frontend_build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build .NET Backend
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend_build
WORKDIR /src

# Copy the rest of the backend source
COPY backend/ ./backend/
RUN dotnet restore "backend/backend.csproj"
WORKDIR "/src/backend"

# Copy the frontend build artifacts to the backend's wwwroot
COPY --from=frontend_build /app/frontend/dist ./wwwroot

RUN dotnet publish "backend.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 3: Final Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=backend_build /app/publish .
ENTRYPOINT ["dotnet", "backend.dll"]