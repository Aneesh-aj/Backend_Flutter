import { UserController } from "../../../../controllers/userController";
import { UserRepository } from "../../../database/mongodb/repository/userRepository/userRepository";
import { UserUseCase } from "../../../../usecases/usecases/userUseCase";
import userModel from "../../../database/mongodb/model/userModel";
import { JWTtoken } from "../../../service/jwt";
import { Encrypt } from "../../../service/hashPassword";
import { OtpGenerate } from "../../../service/otpGenerator";
import { OtpRepository } from "../../../database/mongodb/repository/otpRepository/otpRepository"
import { SentEmail } from "../../../service/sentEmail";
import { ProductController } from "../../../../controllers/productController";
import { ProductUsecase } from "../../../../usecases/usecases/productUseCase";
import { ProductRepository } from "../../../database/mongodb/repository/productRepository/productRepository";


const bycryptsurvice =new  Encrypt()
const jwttoken = new JWTtoken()
const otpGenerate = new OtpGenerate()
const otprepository = new OtpRepository()
const sentemail = new SentEmail()


const userrepository = new UserRepository(userModel)
const productrepository = new ProductRepository()

const userusecase = new UserUseCase(userrepository,jwttoken,otpGenerate,otprepository,sentemail,bycryptsurvice)
const productusecase = new ProductUsecase(productrepository)


const  userController = new UserController(userusecase)
const productController = new ProductController(productusecase)

export { userController,productController}