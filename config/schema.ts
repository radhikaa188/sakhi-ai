import {
  pgTable,
  integer,
  varchar,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

/* ===================== USERS ===================== */
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 15 }).notNull().unique(), 
  preferredLanguage: varchar("preferred_language", { length: 50 }).notNull(),
  village: varchar({ length: 255 }), 
  canReadText: boolean("can_read_text").default(false), // Affects entire UI
  hoursPerDay: integer("hours_per_day"), 
  wantsRemoteWork: boolean("wants_remote_work").default(false), 
  profilePhotoUrl: text("profile_photo_url"), // Optional - for job applications
  createdAt: timestamp("created_at").defaultNow(),
});

/* ===================== SKILLS ===================== */
export const skillsTable = pgTable("skills", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(), 
  imagePath: text("image_path").notNull(), 
  simpleDescription: text("simple_description"), 
  canEarn: varchar("can_earn", { length: 50 }), 
  needsTools: text("needs_tools"),
});

/* ===================== LESSONS ===================== */
export const lessonsTable = pgTable("lessons", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  skillId: integer("skill_id")
    .notNull()
    .references(() => skillsTable.id),
  stepNumber: integer("step_number").notNull(), 
  title: varchar({ length: 255 }).notNull(), 
  
  videoUrl: text("video_url"), 
  audioUrl: text("audio_url"), 
  imagePath: text("image_path"), 
  
  durationMinutes: integer("duration_minutes"),
});

/* ===================== USER PROGRESS ===================== */
export const userProgressTable = pgTable("user_progress", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  skillId: integer("skill_id")
    .notNull()
    .references(() => skillsTable.id),
  lastCompletedStep: integer("last_completed_step").default(0), 
  startedAt: timestamp("started_at").defaultNow(),
  finishedAt: timestamp("finished_at"),
  certificateGenerated: boolean("certificate_generated").default(false), // Simple PDF certificate
});

/* ===================== JOBS ===================== */
export const jobsTable = pgTable("jobs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  companyName: varchar("company_name", { length: 255 }).notNull(), // Who's hiring
  whatYouDo: text("what_you_do").notNull(), 
  skillNeeded: integer("skill_needed").references(() => skillsTable.id),
  
  village: varchar({ length: 255 }), 
  canWorkFromHome: boolean("can_work_from_home").default(false),
  
  monthlyPay: varchar("monthly_pay", { length: 50 }), 
  hoursPerDay: integer("hours_per_day"), 
  
  isVerified: boolean("is_verified").default(false), 
  employerPhone: varchar("employer_phone", { length: 15 }), // For backend to contact employer
  
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at"),
  isActive: boolean("is_active").default(true),
});

/* ===================== JOB APPLICATIONS ===================== */
// Simple 1-tap application process
export const applicationsTable = pgTable("applications", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  jobId: integer("job_id")
    .notNull()
    .references(() => jobsTable.id),
  
  // Application data (auto-filled from user profile)
  applicantName: varchar("applicant_name", { length: 255 }).notNull(),
  applicantPhone: varchar("applicant_phone", { length: 15 }).notNull(),
  applicantVillage: varchar("applicant_village", { length: 255 }),
  
  // Voice message option (instead of written cover letter)
  voiceMessageUrl: text("voice_message_url"), // "Why I want this job" in their voice
  
  status: varchar({ length: 50 }).default("submitted"), // submitted → employer_contacted → hired → rejected
  
  appliedAt: timestamp("applied_at").defaultNow(),
  employerViewedAt: timestamp("employer_viewed_at"), // Track if employer saw it
  
  // Notifications for user
  statusUpdatedAt: timestamp("status_updated_at"),
});

/* ===================== NOTIFICATIONS ===================== */
// Simple notification system (show in app)
export const notificationsTable = pgTable("notifications", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  
  type: varchar({ length: 50 }).notNull(), // new_job | application_update | lesson_reminder
  title: varchar({ length: 255 }).notNull(), // "New job in your area!"
  message: text().notNull(), // "Tailoring job posted in Bhopal"
  
  actionUrl: text("action_url"), // Deep link to job/lesson
  
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

/* ===================== EMPLOYER CONTACTS (for your team) ===================== */
// When user applies, YOUR system notifies employer
export const employerNotificationsTable = pgTable("employer_notifications", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  jobId: integer("job_id")
    .notNull()
    .references(() => jobsTable.id),
  applicationId: integer("application_id")
    .notNull()
    .references(() => applicationsTable.id),
  
  sentVia: varchar("sent_via", { length: 50 }), // sms | whatsapp | call
  sentAt: timestamp("sent_at").defaultNow(),
  deliveryStatus: varchar("delivery_status", { length: 50 }), // sent | delivered | failed
});