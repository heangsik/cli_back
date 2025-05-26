import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;
  @IsNotEmpty()
  @IsString()
  productName: string;
  @IsNotEmpty()
  @IsNumber()
  productPrice: number;
  @IsNotEmpty()
  @IsNumber()
  productQuantity: number;
  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;
}
