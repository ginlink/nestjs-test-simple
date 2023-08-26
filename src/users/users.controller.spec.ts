import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create => should create a user and return its data', async () => {
    // arrange
    const createUserDto: CreateUserDto = {
      firstname: 'John',
      lastname: 'Smith',
      email: '1@gmail.com',
    };
    const user: User = {
      id: Date.now(),
      firstname: createUserDto.firstname,
      lastname: createUserDto.lastname,
      email: createUserDto.email,
    };
    jest.spyOn(mockUserService, 'create').mockReturnValue(user);

    // act
    const result = await controller.create(createUserDto);

    // assert
    expect(result).toEqual(user);
    expect(mockUserService.create).toBeCalled();
    expect(mockUserService.create).toBeCalledWith(createUserDto);
  });
  it('findAll => should return an array of users', () => {});
  it('findOne => should find a user by a given id and return its data', () => {});
  it('update => should find a user by a given id and update its data', () => {});
  it('remove => should find a user by a given id, remove and then return Number of affected rows', () => {});
});
