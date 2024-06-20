import { ApiOperation, ApiTags, ApiResponse, getSchemaPath, ApiParam, ApiQuery, ApiBody, ApiHeader } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { ViewBadgeDTO } from '../dtos/response/view-badge.dto';
import { RegisterBadgeDTO } from '../dtos/request/register-badge.dto';
import { UpdateBadgeDTO } from '../dtos/request/update-badge.dto';
import { RemoveOrAddBadgeDTO } from '../dtos/request/remove-or-addbadge.dto';

export function GetAllBadgesSwagger() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({
      summary: 'Obter todos os Badges.',
      description: 'Get para obter todos os Badges.'
    })(target, propertyKey, descriptor);
    ApiTags('Badge')(target, propertyKey, descriptor);
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Lista de todos os badges.',
      type: [ViewBadgeDTO]
    })(target, propertyKey, descriptor)
  };
}

export function GetBadgesSwagger() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({
      summary: 'Obter badges paginados.',
      description: 'Get para obter badges com paginação.'
    })(target, propertyKey, descriptor);
    ApiTags('Badge')(target, propertyKey, descriptor);
    ApiQuery({ name: 'page', required: false, type: Number, example: 1 })(target, propertyKey, descriptor);
    ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })(target, propertyKey, descriptor);
    ApiQuery({ name: 'name', required: false, type: String, example: 'Cidade Alta' })(target, propertyKey, descriptor);
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Badges paginados.',
      schema: {
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(ViewBadgeDTO) }
          },
          total: { type: 'number', example: 100 }
        }
      }
    })(target, propertyKey, descriptor)
  };
}

export function GetUserBadgesSwagger() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({
      summary: 'Obter badges de um usuário.',
      description: 'Get para obter todos os badges de um usuário específico.'
    })(target, propertyKey, descriptor);
    ApiTags('Badge')(target, propertyKey, descriptor);
    ApiParam({ name: 'userId', required: true, type: Number, example: 1 })(target, propertyKey, descriptor);
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Badges do usuário.',
      type: [ViewBadgeDTO]
    })(target, propertyKey, descriptor)
  };
}

export function RedeemBadgeSwagger() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({
      summary: 'Resgatar um badge.',
      description: 'Get para resgatar um badge por slug.'
    })(target, propertyKey, descriptor);
    ApiTags('Badge')(target, propertyKey, descriptor);
    ApiHeader({
      name: 'Authorization',
      description: 'Token de autenticação do usuário'
    })(target, propertyKey, descriptor);
    ApiParam({ name: 'slug', required: true, type: String, example: 'badge-slug' })(target, propertyKey, descriptor);
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Retorna os Badges do usuário que resgatou atualizado(com o badge que foi resgatado).\n\nBadge resgatado com sucesso!',
      type: ViewBadgeDTO
    })(target, propertyKey, descriptor)
  };
}

export function AbandonBadgeSwagger() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({
      summary: 'Abandonar um badge.',
      description: 'Get para abandonar um badge por slug.'
    })(target, propertyKey, descriptor);
    ApiTags('Badge')(target, propertyKey, descriptor);
    ApiHeader({
      name: 'Authorization',
      description: 'Token de autenticação do usuário'
    })(target, propertyKey, descriptor);
    ApiParam({ name: 'slug', required: true, type: String, example: 'badge-slug' })(target, propertyKey, descriptor);
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Retorna os Badges do usuário atualizado(sem o badge que foi abandonado).\n\nBadge abandonado com sucesso!',
      type: [ViewBadgeDTO]
    })(target, propertyKey, descriptor)
  };
}


export function GiveBadgeSwagger() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({
      summary: 'Presentear um badge.',
      description: 'Post para presentear um usuário com um badge por slug.'
    })(target, propertyKey, descriptor);
    ApiTags('Badge')(target, propertyKey, descriptor);
    ApiHeader({
      name: 'Authorization',
      description: 'Token de autenticação do usuário'
    })(target, propertyKey, descriptor);
    ApiParam({
      name: 'slug', required: true, type: String, example: 'badge-slug'
    })(target, propertyKey, descriptor);

    ApiResponse({
      status: HttpStatus.OK,
      description: 'Retorna os Badges do usuário que presenteou atualizado(sem o badge que foi dado).\n\nBadge presenteado com sucesso!',
      type: [ViewBadgeDTO]
    })(target, propertyKey, descriptor);
  };
}


export function RegisterBadgeSwagger() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({
      summary: 'Registrar Badge.',
      description: 'Post para registrar novo Badge.'
    })(target, propertyKey, descriptor);
    ApiHeader({
      name: 'Authorization',
      description: 'Token de autenticação do usuário'
    })(target, propertyKey, descriptor);
    ApiTags('Admin')(target, propertyKey, descriptor);
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Badge criado com sucesso!',
      type: ViewBadgeDTO
    })(target, propertyKey, descriptor)
  };
}

export function RemoveBadgeSwagger() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({
      summary: 'Remover um badge do usuário.',
      description: 'Post para remover um badge do usuário.'
    })(target, propertyKey, descriptor);
    ApiTags('Admin')(target, propertyKey, descriptor);
    ApiHeader({
      name: 'Authorization',
      description: 'Token de autenticação do usuário'
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Retorna os Badges do usuário que teve o Badge removido atualizado(sem o badge que foi removido).\n\nBadge removido com sucesso!',
      type: [ViewBadgeDTO]
    })(target, propertyKey, descriptor)
  };
}

export function AddBadgeSwagger() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({
      summary: 'Adicionar um badge para o usuário.',
      description: 'Post para adicionar um badge ao usuário.'
    })(target, propertyKey, descriptor);
    ApiTags('Admin')(target, propertyKey, descriptor);
    ApiHeader({
      name: 'Authorization',
      description: 'Token de autenticação do usuário'
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Retorna os Badges do usuário que teve o Badge adicionado atualizado(com o badge que foi adicionado).\n\nBadge adicionado com sucesso!',
      type: [ViewBadgeDTO]
    })(target, propertyKey, descriptor)
  };
}

export function UpdateBadgeSwagger() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({
      summary: 'Atualizar um badge.',
      description: 'Put para atualizar um badge existente.'
    })(target, propertyKey, descriptor);
    ApiTags('Admin')(target, propertyKey, descriptor);
    ApiHeader({
      name: 'Authorization',
      description: 'Token de autenticação do usuário'
    })(target, propertyKey, descriptor);
    ApiParam({ name: 'IdBadge', required: true, type: Number, example: 1 })(target, propertyKey, descriptor);
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Badge atualizado com sucesso!',
      type: ViewBadgeDTO
    })(target, propertyKey, descriptor)
  };
}
