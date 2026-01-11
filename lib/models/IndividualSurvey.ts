import mongoose from 'mongoose'

const IndividualSurveySchema = new mongoose.Schema({
  personalInfo: {
    fullName: { type: String, required: true },
    class: { type: String, required: true }
  },
  responses: {
    question1: { type: String, required: true },
    question2: { type: String, required: true },
    question3: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export default mongoose.models.IndividualSurvey || mongoose.model('IndividualSurvey', IndividualSurveySchema)