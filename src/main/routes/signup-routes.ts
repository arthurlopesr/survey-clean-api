import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeSignUpController } from '@/main/factories/signup'

export default (router: Router): void => {
  router.post('/signup', (req, res) => adaptRoute(makeSignUpController()))
}
