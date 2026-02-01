import mongoose from 'mongoose'

// Schema cho thông tin nhóm (Form 1)
const GroupInfoSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  groupCode: { type: String, required: true }, // Mã nhóm
  leaderName: { type: String, required: true },
  leaderEmail: { type: String, required: true },
  leaderPhone: { type: String, required: true },
  memberCount: { type: Number, required: true, min: 2, max: 10 },
  class: { type: String, required: true },
  subject: { type: String, required: true }, // Môn học
  groupAvatar: { type: String }, // URL ảnh nhóm
})

// Schema cho thành viên nhóm (Form 2)
const MembersInfoSchema = new mongoose.Schema({
  members: [{
    name: { type: String, required: true },
    studentId: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ['leader', 'member', 'secretary', 'treasurer'], default: 'member' },
    contribution: { type: Number, min: 0, max: 100 }, // % đóng góp
    skills: [{ type: String }], // Kỹ năng của thành viên
  }],
  teamDynamics: {
    communicationRating: { type: Number, min: 1, max: 5 },
    collaborationRating: { type: Number, min: 1, max: 5 },
    conflictResolution: { type: String, enum: ['excellent', 'good', 'fair', 'poor'] },
    meetingFrequency: { type: String, enum: ['daily', 'weekly', 'biweekly', 'monthly'] },
  }
})

// Schema cho dự án và hoạt động (Form 3)
const ProjectActivitiesSchema = new mongoose.Schema({
  currentProject: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    status: { type: String, enum: ['planning', 'in-progress', 'completed', 'on-hold'], default: 'planning' },
    progress: { type: Number, min: 0, max: 100, default: 0 },
  },
  activities: [{
    name: { type: String },
    type: { type: String, enum: ['meeting', 'research', 'development', 'presentation', 'other'] },
    date: { type: Date },
    duration: { type: Number }, // minutes
    participants: [{ type: String }], // member names
  }],
  achievements: [{ type: String }],
  challenges: [{ type: String }],
  photos: [{ type: String }], // URLs ảnh hoạt động nhóm
})

// Schema cho đánh giá và phản hồi (Form 4)
const EvaluationFeedbackSchema = new mongoose.Schema({
  groupPerformance: {
    overallRating: { type: Number, min: 1, max: 5 },
    strengths: [{ type: String }],
    weaknesses: [{ type: String }],
    improvementAreas: [{ type: String }],
  },
  memberEvaluations: [{
    memberName: { type: String },
    ratings: {
      participation: { type: Number, min: 1, max: 5 },
      reliability: { type: Number, min: 1, max: 5 },
      creativity: { type: Number, min: 1, max: 5 },
      leadership: { type: Number, min: 1, max: 5 },
    },
    feedback: { type: String },
  }],
  futurePlans: {
    continueWorking: { type: Boolean, default: false },
    nextProject: { type: String },
    skillsToImprove: [{ type: String }],
    recommendChanges: { type: String },
  }
})

// Schema chính cho toàn bộ khảo sát nhóm
const GroupSurveySchema = new mongoose.Schema({
  groupInfo: GroupInfoSchema,
  membersInfo: MembersInfoSchema,
  projectActivities: ProjectActivitiesSchema,
  evaluationFeedback: EvaluationFeedbackSchema,
  completedSections: {
    groupInfo: { type: Boolean, default: false },
    members: { type: Boolean, default: false },
    projects: { type: Boolean, default: false },
    evaluation: { type: Boolean, default: false },
  },
  isCompleted: { type: Boolean, default: false },
  submittedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

GroupSurveySchema.pre('save', function(next) {
  this.updatedAt = new Date()
  
  // Kiểm tra xem tất cả sections đã hoàn thành chưa
  const { groupInfo, members, projects, evaluation } = this.completedSections
  if (groupInfo && members && projects && evaluation && !this.isCompleted) {
    this.isCompleted = true
    this.submittedAt = new Date()
  }
  
  next()
})

export default mongoose.models.GroupSurvey || mongoose.model('GroupSurvey', GroupSurveySchema)