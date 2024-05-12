import joi from 'joi';

const occurrenceCreationSchema = joi.object({
  title: joi.string().min(10).max(127).required().messages({
    'any.required': 'Campo título não pode ser vazio',
    'string.empty': 'Campo título não pode ser vazio',
    'string.base': 'Título precisa ser do tipo string',
    'string.min': 'O título precisa ter no mínimo 10 caracteres',
    'string.max': 'O título pode ter no máximo 127 caracteres'
  }),
  description: joi.string().min(40).max(255).required().messages({
    'any.required': 'Campo descrição não pode ser vazia',
    'string.empty': 'Campo descrição não pode ser vazia',
    'string.base': 'Descrição precisa ser do tipo string',
    'string.min': 'A descrição precisa ter no mínimo 40 caracteres'
  }),
  neighborhood: joi.string().required().messages({
    'any.required': 'Campo bairro não pode ser vazio',
    'string.empty': 'Campo bairro não pode ser vazio',
    'string.base': 'Bairro precisa ser do tipo string'
  }),
  street: joi.string().required().messages({
    'any.required': 'Campo rua não pode ser vazio',
    'string.empty': 'Campo rua não pode ser vazio',
    'string.base': 'Rua precisa ser do tipo string'
  }),
  zipCode: joi.string().length(10).required().messages({
    'any.required': 'Campo CEP não pode ser vazio',
    'string.empty': 'Campo CEP não pode ser vazio',
    'string.base': 'CEP precisa ser do tipo string',
    'string.length': 'CEP deve ter exatamente 8 dígitos'
  }), // Embora o necessário seja 8 dígitos, consideramos 10 por conta do ponto e traço. Exemplo: 18.540-000.
  reference: joi.string().messages({
    'string.empty': 'Campo referência não pode ser vazio',
    'string.base': 'Referência precisa ser do tipo string'
  }),
  userId: joi.number().integer().required().messages({
    'any.required': 'Campo id de usuário não pode ser vazio',
    'number.empty': 'Campo id de usuário não pode ser vazio',
    'number.base': 'Id de usuário deve ser um número inteiro',
    'number.integer': 'Id de usuário deve ser um número inteiro'
  })
});

const occurrenceSchema = occurrenceCreationSchema.keys({
  status: joi.string().valid('Aberto').required().messages({
    'any.required': 'Campo status não pode ser vazio',
    'any.only': `Valor de status inválido. Novas ocorrências só podem ter 'Aberto' como status inicial`
  }),
  image: joi.string().required().messages({
    'any.required': 'Campo URL de imagem não pode ser vazio',
    'string.empty': 'Campo URL de imagem não pode ser vazio',
    'string.base': 'URL de imagem precisa ser do tipo string'
  })
});

const loginSchema = joi.object({
  email: joi.string().email().required().messages({
    'any.required': 'Campo de e-mail não pode ser vazio',
    'string.empty': 'Campo de e-mail não pode ser vazio',
    'string.base': 'E-mail precisa ser do tipo string',
    'string.email': 'E-mail inválido'
  }),
  password: joi.string().min(8).required().messages({
    'any.required': 'Campo de senha não pode ser vazio',
    'string.empty': 'Campo de senha não pode ser vazio',
    'string.base': 'Senha precisa ser do tipo string',
    'string.min': 'Senha precisa ter no mínimo 8 caracteres'
  })
});

export { loginSchema, occurrenceCreationSchema, occurrenceSchema };
