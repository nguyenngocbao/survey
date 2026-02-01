import mongoose from 'mongoose'

// Schema cho thông tin cá nhân (Form 1)
const PersonalInfoSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  studentId: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  class: { type: String, required: true },
  major: { type: String, required: true },
  avatar: { type: String }, // URL ảnh đại diện
})

// Schema cho thông tin học tập (Form 2)
const AcademicInfoSchema = new mongoose.Schema({
  gpa: { type: Number, min: 0, max: 4 },
  favoriteSubjects: [{ type: String }],
  studyHours: { type: Number },
  learningStyle: { type: String, enum: ['visual', 'auditory', 'kinesthetic', 'reading'] },
  difficulties: [{ type: String }],
})

// Schema cho sở thích và hoạt động (Form 3)
const InterestsSchema = new mongoose.Schema({
  hobbies: [{ type: String }],
  sports: [{ type: String }],
  clubs: [{ type: String }],
  volunteerWork: { type: Boolean, default: false },
  leadership: { type: Boolean, default: false },
  photos: [{ type: String }], // Mảng URL ảnh hoạt động
})

// Schema cho kế hoạch tương lai (Form 4)
const FuturePlansSchema = new mongoose.Schema({
  careerGoals: { type: String },
  graduationPlan: { type: String },
  furtherEducation: { type: Boolean, default: false },
  workExperience: { type: Boolean, default: false },
  skills: [{ type: String }],
})

// Schema chính cho toàn bộ khảo sát
const SurveySchema = new mongoose.Schema({
  personalInfo: PersonalInfoSchema,
  academicInfo: AcademicInfoSchema,
  interests: InterestsSchema,
  futurePlans: FuturePlansSchema,
  completedSections: {
    personal: { type: Boolean, default: false },
    academic: { type: Boolean, default: false },
    interests: { type: Boolean, default: false },
    future: { type: Boolean, default: false },
  },
  isCompleted: { type: Boolean, default: false },
  submittedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

SurveySchema.pre('save', function(next) {
  this.updatedAt = new Date()
  
  // Kiểm tra xem tất cả sections đã hoàn thành chưa
  const { personal, academic, interests, future } = this.completedSections
  if (personal && academic && interests && future && !this.isCompleted) {
    this.isCompleted = true
    this.submittedAt = new Date()
  }
  
  next()
})

export default mongoose.models.Survey || mongoose.model('Survey', SurveySchema)