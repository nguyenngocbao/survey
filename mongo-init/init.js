// Khởi tạo database và user cho ứng dụng
db = db.getSiblingDB('student-survey');

// Tạo user cho ứng dụng
db.createUser({
  user: 'app_user',
  pwd: 'app_password',
  roles: [
    {
      role: 'readWrite',
      db: 'student-survey'
    }
  ]
});

// Tạo collection surveys với validation
db.createCollection('surveys', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['personalInfo', 'completedSections'],
      properties: {
        personalInfo: {
          bsonType: 'object',
          required: ['fullName', 'studentId', 'email'],
          properties: {
            fullName: { bsonType: 'string' },
            studentId: { bsonType: 'string' },
            email: { bsonType: 'string' },
            phone: { bsonType: 'string' },
            class: { bsonType: 'string' },
            major: { bsonType: 'string' }
          }
        },
        completedSections: {
          bsonType: 'object',
          properties: {
            personal: { bsonType: 'bool' },
            academic: { bsonType: 'bool' },
            interests: { bsonType: 'bool' },
            future: { bsonType: 'bool' }
          }
        },
        isCompleted: { bsonType: 'bool' }
      }
    }
  }
});

// Tạo index cho tìm kiếm nhanh
db.surveys.createIndex({ 'personalInfo.studentId': 1 }, { unique: true });
db.surveys.createIndex({ 'isCompleted': 1 });
db.surveys.createIndex({ 'createdAt': 1 });

print('Database initialized successfully!');