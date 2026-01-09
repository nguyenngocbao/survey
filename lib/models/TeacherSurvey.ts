import mongoose from 'mongoose'

// Schema cho thông tin cơ bản giáo viên
const PersonalInfoSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  educationLevel: { type: String, required: true }, // THCS, THPT, Cao đẳng, Đại học, other
  otherEducationLevel: { type: String }, // Nếu chọn other
  school: { type: String },
  subject: { type: String }, // Bộ môn phụ trách
  otherSubject: { type: String }, // Nếu chọn other
})

// Schema cho sử dụng AI trong giảng dạy
const AIUsageSchema = new mongoose.Schema({
  frequency: { type: String }, // Tần suất sử dụng AI
  teachingPhase: [{ type: String }], // Giai đoạn sử dụng AI (multiple choice)
  contentUsage: [{ type: String }], // Cách sử dụng nội dung AI (multiple choice)
  surprisingLearning: { type: String }, // Điều bất ngờ/hữu ích từ AI
  aiAccuracy: { type: String }, // Độ chính xác AI
  studentThinkingImpact: { type: String }, // Tác động đến tư duy học sinh
  aiIntegrationNecessity: { type: String }, // Tính cần thiết tích hợp AI
  officialTraining: { type: String }, // Tập huấn chính thức
  effectiveApproach: { type: String }, // Cách tiếp cận hiệu quả
  otherEffectiveApproach: { type: String }, // Cách tiếp cận khác
  importantConditions: [{ type: String }], // Điều kiện quan trọng (multiple choice)
  otherImportantCondition: { type: String }, // Điều kiện khác
  implementedActivities: { type: String }, // Đã triển khai hoạt động AI
  reasonsNotImplemented: [{ type: String }], // Lý do chưa triển khai (multiple choice)
  readinessToImplement: { type: String }, // Sẵn sàng triển khai
  desiredStudentActivities: [{ type: String }], // Mong muốn học sinh sử dụng AI (multiple choice)
  improvementSuggestions: { type: String }, // Đề xuất cải thiện
})

// Schema chính cho khảo sát giáo viên
const TeacherSurveySchema = new mongoose.Schema({
  personalInfo: PersonalInfoSchema,
  aiUsage: AIUsageSchema,
  isCompleted: { type: Boolean, default: false },
  submittedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

TeacherSurveySchema.pre('save', function(next) {
  this.updatedAt = new Date()
  
  // Kiểm tra xem survey đã hoàn thành chưa
  if (this.personalInfo?.fullName && this.personalInfo?.educationLevel && !this.isCompleted) {
    this.isCompleted = true
    this.submittedAt = new Date()
  }
  
  next()
})

export default mongoose.models.TeacherSurvey || mongoose.model('TeacherSurvey', TeacherSurveySchema)