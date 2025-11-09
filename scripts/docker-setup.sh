#!/bin/bash

# Script để setup và quản lý Docker containers

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
}

# Start MongoDB
start_mongodb() {
    print_status "Starting MongoDB container..."
    docker-compose up -d mongodb
    
    print_status "Waiting for MongoDB to be ready..."
    sleep 10
    
    # Check if MongoDB is running
    if docker-compose ps mongodb | grep -q "Up"; then
        print_success "MongoDB is running successfully!"
        print_status "MongoDB URL: mongodb://localhost:27017"
        print_status "Admin credentials: admin/password123"
    else
        print_error "Failed to start MongoDB"
        exit 1
    fi
}

# Start MongoDB with Mongo Express
start_full() {
    print_status "Starting MongoDB and Mongo Express..."
    docker-compose up -d
    
    print_status "Waiting for services to be ready..."
    sleep 15
    
    print_success "All services are running!"
    print_status "MongoDB: mongodb://localhost:27017"
    print_status "Mongo Express (Web UI): http://localhost:8081"
    print_status "Admin credentials: admin/password123"
}

# Stop all services
stop_services() {
    print_status "Stopping all services..."
    docker-compose down
    print_success "All services stopped!"
}

# Reset database (remove all data)
reset_database() {
    print_warning "This will delete all data in the database!"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Stopping services and removing data..."
        docker-compose down -v
        print_success "Database reset complete!"
    else
        print_status "Reset cancelled."
    fi
}

# Show logs
show_logs() {
    docker-compose logs -f
}

# Show status
show_status() {
    print_status "Service status:"
    docker-compose ps
}

# Main menu
show_menu() {
    echo
    echo "=== Student Survey - Docker Management ==="
    echo "1. Start MongoDB only"
    echo "2. Start MongoDB + Mongo Express (Web UI)"
    echo "3. Stop all services"
    echo "4. Show service status"
    echo "5. Show logs"
    echo "6. Reset database (DELETE ALL DATA)"
    echo "7. Exit"
    echo
}

# Main script
main() {
    check_docker
    
    if [ $# -eq 0 ]; then
        while true; do
            show_menu
            read -p "Choose an option (1-7): " choice
            
            case $choice in
                1)
                    start_mongodb
                    ;;
                2)
                    start_full
                    ;;
                3)
                    stop_services
                    ;;
                4)
                    show_status
                    ;;
                5)
                    show_logs
                    ;;
                6)
                    reset_database
                    ;;
                7)
                    print_status "Goodbye!"
                    exit 0
                    ;;
                *)
                    print_error "Invalid option. Please choose 1-7."
                    ;;
            esac
        done
    else
        case $1 in
            "start")
                start_mongodb
                ;;
            "start-full")
                start_full
                ;;
            "stop")
                stop_services
                ;;
            "status")
                show_status
                ;;
            "logs")
                show_logs
                ;;
            "reset")
                reset_database
                ;;
            *)
                echo "Usage: $0 [start|start-full|stop|status|logs|reset]"
                exit 1
                ;;
        esac
    fi
}

main "$@"