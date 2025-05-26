import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should regist a new order', () => {
    const dto = {
      orderId: 'ori_1234567890',
      productName: 'test product name',
      productPrice: 'T',
      productQuantity: 1,
      totalPrice: 1000,
    } as any;
    const result = controller.regist(dto);
    // console.log('result:', result);
    expect(result).toEqual(
      expect.objectContaining({
        id: 1,
        ...dto,
        status: 'registered',
      }),
    );
    expect(result.createdAt).toBeDefined();
  });

  it('should fail validattion for orderId', async () => {
    const invalidDto = {
      orderId: '',
      productName: 'test product name',
      productPrice: 'T',
      productQuantity: 1,
      totalPrice: 1000,
    } as any;

    const dtoInstance = plainToInstance(CreateOrderDto, invalidDto);
    const errors = await validate(dtoInstance);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.map((e) => e.property)).toContain('orderId');
  });
  it('should fail validattion for productName', async () => {
    const invalidDto = {
      orderId: 'ori_1234567890',
      productName: '',
      productPrice: 'T',
      productQuantity: 1,
      totalPrice: 1000,
    } as any;

    const dtoInstance = plainToInstance(CreateOrderDto, invalidDto);
    const errors = await validate(dtoInstance);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.map((e) => e.property)).toContain('productName');
  });

  it('should fail validattion for productPrice', async () => {
    const invalidDto = {
      orderId: 'ori_1234567890',
      productName: 'test product name',
      productPrice: '',
      productQuantity: 1,
      totalPrice: 1000,
    } as any;

    const dtoInstance = plainToInstance(CreateOrderDto, invalidDto);
    const errors = await validate(dtoInstance);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.map((e) => e.property)).toContain('productPrice');
  });

  it('should fail validattion for productQuantity', async () => {
    const invalidDto = {
      orderId: 'ori_1234567890',
      productName: 'test product name',
      productPrice: 'T',
      productQuantity: '',
      totalPrice: 1000,
    } as any;

    const dtoInstance = plainToInstance(CreateOrderDto, invalidDto);
    const errors = await validate(dtoInstance);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.map((e) => e.property)).toContain('productQuantity');
  });

  it('should fail validattion for totalPrice', async () => {
    const invalidDto = {
      orderId: 'ori_1234567890',
      productName: 'test product name',
      productPrice: 'T',
      productQuantity: 1,
      totalPrice: '',
    } as any;

    const dtoInstance = plainToInstance(CreateOrderDto, invalidDto);
    const errors = await validate(dtoInstance);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.map((e) => e.property)).toContain('totalPrice');
  });
});
