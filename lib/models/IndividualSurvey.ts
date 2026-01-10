import mongoose from 'mongoose'

const IndividualSurveySchema = new mongoose.Schema({
  personalInfo: {
    fullName: { type: String, required: true },
    class: { type: String, required: true },
  },
  responses: {
    question1: { type: String, required: true }, // Khoảng khắc ấn tượng nhất
    question2: { type: String, required: true }, // Điểm tiến bộ nhất
    question3: { type: String, required: true }, // Đề xuất cải tiến
  },
  submittedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

IndividualSurveySchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.IndividualSurvey || mongoose.model('IndividualSurvey', IndividualSurveySchema)