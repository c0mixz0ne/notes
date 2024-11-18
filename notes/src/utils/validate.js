const validate = (type, value) => {
  const length = value.trim().length

  switch (type) {
    case 'email':
      return length < 1
        ? 'E-Mail не может быть пустым'
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? 'Невалидный адрес электронной почты'
          : ''
    case 'password':
      return length < 1
        ? 'Пароль не может быть пустым'
        : length > 12
          ? 'Пароль не может быть длиннее 12 символов'
          : length < 4
            ? 'Пароль не может быть короче 4 символов'
            : ''
    case 'confirm':
      return length < 1
        ? 'Подтверждение пароля не может быть пустым'
        : length < 4
          ? 'Подтверждение пароля не может быть короче 4 символов'
          : ''
    case 'title':
      return length < 1
        ? 'Заголовок не может быть пустым'
        : length > 64
          ? 'Заголовок не может быть длиннее 64 символов'
          : ''
    case 'content':
      return length < 1 ? 'Содержимое не может быть пустым' : ''
    default:
      return ''
  }
}

export default validate
