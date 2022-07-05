import { AppError } from "../../../../AppError";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userExists = this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError("User does not exists");
    }

    if (!userExists.admin) {
      throw new AppError("Only admin action");
    }

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
