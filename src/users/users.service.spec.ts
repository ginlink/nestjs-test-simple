import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

const mockUserRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create => Should create a new user and return its data', async () => {
    // arrange
    const createUserDto: CreateUserDto = {
      firstname: 'John',
      lastname: 'Smith',
      email: '1@gmail.com',
    };

    const user = {
      id: Date.now(),
      firstname: createUserDto.firstname,
      lastname: createUserDto.lastname,
      email: createUserDto.email,
    };

    jest.spyOn(mockUserRepository, 'save').mockReturnValue(user);

    // act
    const result = await service.create(createUserDto);

    // assert
    expect(mockUserRepository.save).toBeCalled();
    expect(mockUserRepository.save).toBeCalledWith(createUserDto);
    expect(result).toEqual(user);
  });
  it('findAll => Should return an array of users', async () => {
    // arrange
    const user: User = {
      id: Date.now(),
      firstname: 'John',
      lastname: 'Smith',
      email: '1@gmail.com',
    };
    const users = [user];
    jest.spyOn(mockUserRepository, 'find').mockReturnValue(users);

    // act
    const result = await service.findAll();

    // assert
    expect(mockUserRepository.find).toBeCalled();
    expect(result).toEqual(users);
  });
  it('findOne => should find a user by a given id and return its data', async () => {
    // arrange
    const id = 1;
    const user: User = {
      id,
      firstname: 'John',
      lastname: 'Smith',
      email: '1@gmail.com',
    };
    jest.spyOn(mockUserRepository, 'findOne').mockReturnValue(user);

    // act
    const result = await service.findOne(id);

    // assert
    expect(result).toBe(user);
    expect(mockUserRepository.findOne).toBeCalled();
    expect(mockUserRepository.findOne).toBeCalledWith({ where: { id } });
  });
  // it('update', () => {});
  it('remove => should find a user by a given id, remove and then return Number of affected rows', async () => {
    // arrange
    const id = 1;
    const user: User = {
      id,
      firstname: 'John',
      lastname: 'Smith',
      email: '1@gmail.com',
    };
    jest.spyOn(mockUserRepository, 'delete').mockReturnValue(user);

    // act
    const result = await service.remove(id);

    // assert
    expect(result).toEqual(user);
    expect(mockUserRepository.delete).toBeCalled();
    expect(mockUserRepository.delete).toBeCalledWith(id);
  });
});
