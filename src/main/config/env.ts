export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/survey-clean-api',
  port: process.env.PORT || 3000
}
