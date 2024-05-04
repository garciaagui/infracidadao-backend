import joi from 'joi';

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

export { loginSchema };
