import mongoose from 'mongoose'

// Schema cho thông tin cơ bản
const PersonalInfoSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  educationLevel: { type: String, required: true }, // THCS, THPT
  school: { type: String },
  grade: { type: String, required: true }, // 6-12
})

// Schema cho sử dụng AI trong học tập
const AIUsageSchema = new mongoose.Schema({
  frequency: { type: String }, // Tần suất sử dụng
  purposes: [{ type: String }], // Mục đích sử dụng (multiple choice)
  otherPurpose: { type: String }, // Mục đích khác
  tools: [{ type: String }], // Công cụ AI sử dụng (multiple choice)
  otherTool: { type: String }, // Công cụ khác
  dependencyLevel: { type: String }, // Mức độ phụ thuộc
  surprisingLearning: { type: String }, // Điều bất ngờ học được
  aiAccuracy: { type: String }, // Độ chính xác AI
  resultUsage: { type: String }, // Cách sử dụng kết quả AI
  thinkingImpact: { type: String }, // Tác động đến tư duy
  difficulties: [{ type: String }], // Khó khăn gặp phải (multiple choice)
  otherDifficulty: { type: String }, // Khó khăn khác
  guidance: { type: String }, // Hướng dẫn từ thầy cô
})

// Schema cho dự án kỹ thuật
const TechnicalProjectsSchema = new mongoose.Schema({
  experiences: [{ type: String }], // Trải nghiệm kỹ thuật (multiple choice)
  otherExperience: { type: String }, // Trải nghiệm khác
  aiSupport: [{ type: String }], // Mong muốn AI hỗ trợ (multiple choice)
  otherSupport: { type: String }, // Hỗ trợ khác
  learningInterest: { type: String }, // Quan tâm học về AI
  otherInterest: { type: String }, // Quan tâm khác
})

// Schema chính cho khảo sát AI học sinh
const AISurveySchema = new mongoose.Schema({
  personalInfo: PersonalInfoSchema,
  aiUsage: AIUsageSchema,
  technicalProjects: TechnicalProjectsSchema,
  isCompleted: { type: Boolean, default: false },
  submittedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

AISurveySchema.pre('save', function(next) {
  this.updatedAt = new Date()
  
  // Kiểm tra xem survey đã hoàn thành chưa
  if (this.personalInfo?.fullName && this.personalInfo?.educationLevel && this.personalInfo?.grade && !this.isCompleted) {
    this.isCompleted = true
    this.submittedAt = new Date()
  }
  
  next()
})

export default mongoose.models.AISurvey || mongoose.model('AISurvey', AISurveySchema)