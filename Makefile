# Makefile for Student Survey App

.PHONY: help install dev build start stop status logs reset clean

# Default target
help:
	@echo "Student Survey App - Available commands:"
	@echo ""
	@echo "Setup & Development:"
	@echo "  make install     - Install dependencies"
	@echo "  make dev         - Start development server"
	@echo "  make build       - Build the application"
	@echo ""
	@echo "Docker & Database:"
	@echo "  make docker-start    - Start MongoDB with Docker"
	@echo "  make docker-full     - Start MongoDB + Mongo Express"
	@echo "  make docker-stop     - Stop all Docker services"
	@echo "  make docker-status   - Show Docker services status"
	@echo "  make docker-logs     - Show Docker logs"
	@echo "  make docker-reset    - Reset database (DELETE ALL DATA)"
	@echo ""
	@echo "Utilities:"
	@echo "  make clean       - Clean node_modules and build files"
	@echo "  make setup       - Complete setup (install + docker)"

# Install dependencies
install:
	@echo "Installing dependencies..."
	npm install --legacy-peer-deps

# Start development server
dev:
	@echo "Starting development server..."
	npm run dev

# Build application
build:
	@echo "Building application..."
	npm run build

# Complete setup
setup: install docker-start
	@echo "Setup complete! You can now run 'make dev' to start development."

# Docker commands
docker-start:
	@echo "Starting MongoDB container..."
	docker-compose up -d mongodb
	@echo "Waiting for MongoDB to be ready..."
	@sleep 10
	@echo "MongoDB is ready at mongodb://localhost:27017"

docker-full:
	@echo "Starting MongoDB and Mongo Express..."
	docker-compose up -d
	@echo "Waiting for services to be ready..."
	@sleep 15
	@echo "Services ready:"
	@echo "  - MongoDB: mongodb://localhost:27017"
	@echo "  - Mongo Express: http://localhost:8081"

docker-stop:
	@echo "Stopping Docker services..."
	docker-compose down

docker-status:
	@echo "Docker services status:"
	docker-compose ps

docker-logs:
	docker-compose logs -f

docker-reset:
	@echo "⚠️  This will DELETE ALL DATA in the database!"
	@read -p "Are you sure? (y/N): " confirm && [ "$$confirm" = "y" ] || exit 1
	@echo "Resetting database..."
	docker-compose down -v
	@echo "Database reset complete!"

# Clean up
clean:
	@echo "Cleaning up..."
	rm -rf node_modules
	rm -rf .next
	rm -rf dist
	@echo "Clean complete!"

# Check if Docker is available
check-docker:
	@which docker > /dev/null || (echo "Docker is not installed!" && exit 1)
	@which docker-compose > /dev/null || (echo "Docker Compose is not installed!" && exit 1)