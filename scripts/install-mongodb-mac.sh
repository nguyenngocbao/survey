#!/bin/bash

# Script cài đặt MongoDB trực tiếp trên macOS (alternative cho Docker)

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

# Check if Homebrew is installed
check_homebrew() {
    if ! command -v brew &> /dev/null; then
        print_error "Homebrew is not installed. Installing Homebrew first..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
}

# Install MongoDB
install_mongodb() {
    print_status "Installing MongoDB Community Edition..."
    
    # Add MongoDB tap
    brew tap mongodb/brew
    
    # Install MongoDB
    brew install mongodb-community
    
    print_success "MongoDB installed successfully!"
}

# Start MongoDB service
start_mongodb() {
    print_status "Starting MongoDB service..."
    
    # Start MongoDB as a service
    brew services start mongodb-community
    
    # Wait for MongoDB to start
    sleep 5
    
    # Check if MongoDB is running
    if brew services list | grep mongodb-community | grep -q started; then
        print_success "MongoDB is running!"
        print_status "MongoDB URL: mongodb://localhost:27017"
    else
        print_error "Failed to start MongoDB service"
        return 1
    fi
}

# Create database and user
setup_database() {
    print_status "Setting up database and user..."
    
    # Wait a bit more for MongoDB to be fully ready
    sleep 3
    
    # Create database and user using mongosh
    mongosh --eval "
        use student-survey;
        db.createUser({
            user: 'app_user',
            pwd: 'app_password',
            roles: [{ role: 'readWrite', db: 'student-survey' }]
        });
        print('Database and user created successfully!');
    " 2>/dev/null || {
        print_warning "Could not create user (database might already exist)"
    }
}

# Update .env.local
update_env() {
    print_status "Updating .env.local file..."
    
    if [ -f ".env.local" ]; then
        # Update existing file
        sed -i '' 's|MONGODB_URI=.*|MONGODB_URI=mongodb://localhost:27017/student-survey|' .env.local
    else
        # Create new file
        echo "MONGODB_URI=mongodb://localhost:27017/student-survey" > .env.local
    fi
    
    print_success ".env.local updated!"
}

# Main function
main() {
    echo "=== MongoDB Installation for macOS ==="
    echo
    
    check_homebrew
    
    # Check if MongoDB is already installed
    if brew list mongodb-community &> /dev/null; then
        print_warning "MongoDB is already installed"
        
        # Check if it's running
        if brew services list | grep mongodb-community | grep -q started; then
            print_success "MongoDB is already running!"
        else
            start_mongodb
        fi
    else
        install_mongodb
        start_mongodb
    fi
    
    setup_database
    update_env
    
    echo
    print_success "Setup complete!"
    echo
    echo "MongoDB is now running at: mongodb://localhost:27017"
    echo "Database: student-survey"
    echo
    echo "You can now run: npm run dev"
    echo
    echo "To stop MongoDB: brew services stop mongodb-community"
    echo "To start MongoDB: brew services start mongodb-community"
}

main "$@"