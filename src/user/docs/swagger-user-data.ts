import { ApiOperation, ApiTags, ApiResponse, getSchemaPath, ApiParam, ApiHeader } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { ViewUserDTO } from '../dtos/response/view-user.dto';
import { LoginResponse } from '../dtos/response/login-response.dto';

export function RegisterUserSwagger() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({
      summary: 'Registrar User.',
      description: 'Post para registrar novo usuario.'
    })(target, propertyKey, descriptor);
    ApiTags('User')(target, propertyKey, descriptor);
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Usuario criado com sucesso!',
      type: ViewUserDTO
    })(target, propertyKey, descriptor)
  };
}

export function LoginUserSwagger() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({
      summary: 'Logar User.',
      description: 'Post para logar um usuario existente.'
    })(target, propertyKey, descriptor);
    ApiTags('User')(target, propertyKey, descriptor);
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Usuario logado com sucesso!',
      type: LoginResponse

    })(target, propertyKey, descriptor)
  };
}

export function LogoutUserSwagger() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({
      summary: 'Deslogar User.',
      description: 'Post para deslogar o usuario logado.'
    })(target, propertyKey, descriptor);
    ApiTags('User')(target, propertyKey, descriptor);
    ApiHeader({
      name: 'Authorization',
      description: 'Token de autenticação do usuário'
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Usuario deslogado com sucesso!',
      schema: {
        properties: {
          acces_token: {
            type: 'string',
            description: "Token de acesso do usuário",
            example: null
          },
          status: {
            type: 'number',
            description: "Http Status code",
            example: 200
          }
        }
      }
    })(target, propertyKey, descriptor)
  };
}

export function UpdateUserSwagger() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({
      summary: 'Atualizar usuário.',
      description: 'Put para atualizar informações de um usuário existente.'
    })(target, propertyKey, descriptor);
    ApiTags('User')(target, propertyKey, descriptor);
    ApiHeader({
      name: 'Authorization',
      description: 'Token de autenticação do usuário'
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Usuário atualizado com sucesso!',
      type: ViewUserDTO
    })(target, propertyKey, descriptor)
  };
}

