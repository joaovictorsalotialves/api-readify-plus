export const regex = {
  // Valida senha:
  // - Se possui pelo menos 1 letra
  // - Se possui pelo menos 1 número
  // - Se possui pelo menos 1 caracter especial:
  //   (! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ ` { | } ~)

  strongPasswordRegex:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/,
}
