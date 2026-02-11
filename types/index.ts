// ============================================
// USER TYPES
// ============================================

export interface User {
  id: number;
  name: string;
  phone: string;
  preferredLanguage: Language;
  village: string | null;
  canReadText: boolean;
  hoursPerDay: number | null;
  wantsRemoteWork: boolean;
  profilePhotoUrl: string | null;
  createdAt: Date;
}

export interface UserCreate {
  name: string;
  phone: string;
  preferredLanguage: Language;
  village?: string;
  canReadText: boolean;
  hoursPerDay?: number;
  wantsRemoteWork?: boolean;
  profilePhotoUrl?: string;
}

// ============================================
// SKILL TYPES
// ============================================

export interface Skill {
  id: number;
  name: string;
  imagePath: string;
  simpleDescription: string | null;
  canEarn: string | null;
  needsTools: string | null;
}

export interface SkillWithProgress extends Skill {
  progress?: number;
  isEnrolled: boolean;
  lastCompletedStep?: number;
}

// ============================================
// LESSON TYPES
// ============================================

export interface Lesson {
  id: number;
  skillId: number;
  stepNumber: number;
  title: string;
  videoUrl: string | null;
  audioUrl: string | null;
  imagePath: string | null;
  durationMinutes: number | null;
}

export interface LessonWithCompletion extends Lesson {
  isCompleted: boolean;
}

// ============================================
// USER PROGRESS TYPES
// ============================================

export interface UserProgress {
  id: number;
  userId: number;
  skillId: number;
  lastCompletedStep: number;
  startedAt: Date;
  finishedAt: Date | null;
  certificateGenerated: boolean;
}

// ============================================
// JOB TYPES
// ============================================

export interface Job {
  id: number;
  title: string;
  companyName: string;
  whatYouDo: string;
  skillNeeded: number | null;
  village: string | null;
  canWorkFromHome: boolean;
  monthlyPay: string | null;
  hoursPerDay: number | null;
  isVerified: boolean;
  employerPhone: string | null;
  createdAt: Date;
  expiresAt: Date | null;
  isActive: boolean;
}

export interface JobWithSkill extends Job {
  skillName?: string;
}

// ============================================
// APPLICATION TYPES
// ============================================

export type ApplicationStatus = 
  | "submitted" 
  | "employer_contacted" 
  | "hired" 
  | "rejected";

export interface Application {
  id: number;
  userId: number;
  jobId: number;
  applicantName: string;
  applicantPhone: string;
  applicantVillage: string | null;
  voiceMessageUrl: string | null;
  status: ApplicationStatus;
  appliedAt: Date;
  employerViewedAt: Date | null;
  statusUpdatedAt: Date | null;
}

export interface ApplicationWithJob extends Application {
  job: Job;
}

// ============================================
// NOTIFICATION TYPES
// ============================================

export type NotificationType = 
  | "new_job" 
  | "application_update" 
  | "lesson_reminder";

export interface Notification {
  id: number;
  userId: number;
  type: NotificationType;
  title: string;
  message: string;
  actionUrl: string | null;
  isRead: boolean;
  createdAt: Date;
}

// ============================================
// LANGUAGE TYPES
// ============================================

export type Language = "hindi" | "english" | "tamil";

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  speechCode: string; // For text-to-speech
}

// ============================================
// TRANSLATION TYPES
// ============================================

export interface TranslationStrings {
  // Onboarding
  welcome: string;
  selectLanguage: string;
  next: string;
  back: string;
  submit: string;
  
  // Profile
  yourName: string;
  phoneNumber: string;
  village: string;
  canYouRead: string;
  yes: string;
  no: string;
  
  // Work preferences
  howManyHours: string;
  workType: string;
  fromHome: string;
  goToWorkplace: string;
  both: string;
  
  // Skills
  learnSkills: string;
  earnPerMonth: string;
  startLearning: string;
  continue: string;
  completed: string;
  
  // Lessons
  step: string;
  of: string;
  markComplete: string;
  nextStep: string;
  congratulations: string;
  courseComplete: string;
  downloadCertificate: string;
  
  // Jobs
  jobsNearYou: string;
  newJobs: string;
  perMonth: string;
  hoursPerDay: string;
  viewDetails: string;
  apply: string;
  applied: string;
  
  // Applications
  myApplications: string;
  waiting: string;
  contacted: string;
  hired: string;
  rejected: string;
  
  // Common
  home: string;
  profile: string;
  notifications: string;
  loading: string;
  error: string;
  tryAgain: string;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
