# App

**Readify Plus**

## RFs (Requisitos Funcionais)

- [x] Deve ser possível se cadastrar com dados para identificação e acesso do usuário;
- [x] Deve ser possível cadastrar as preferencias de leitura do usuário (categoria e escritor);
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível recuperar a senha;
- [ ] Deve ser possível obter o perfil do usuário logado;
- [ ] Deve ser possível atualizar as informações do usuário logado;
- [ ] Deve ser possível alterar a senha do usuário logado;
- [ ] Deve ser possível atualizar o modo de leitura do usuário logado;
- [ ] Deve ser possível obter os livros que estão sendo lidos pelo usuário logado;
- [ ] Deve ser possível obter os livros lidos pelo usuário logado;
- [ ] Deve ser possível obter os livros favoritos do usuário logado;
- [ ] Deve ser possível obter os livros sugeridos ao usuário logado (Sistema de recomendação com I.A.);
- [ ] Deve ser possível obter os livros mais populares da plataforma;
- [ ] Deve ser possível buscar livros pelo título;
- [ ] Deve ser possível filtrar livros por gênero textual e/ou escritor;
- [ ] Deve ser possível obter as informações de um livro;
- [ ] Deve ser possível adicionar um livro à lista de favoritos;
- [ ] Deve ser possível obter o texto do livro para leitura;
- [ ] Deve ser possível converter o texto do livro em áudio;
- [ ] Deve ser possível gerar uma avaliação após a leitura do livro;
- [ ] Deve ser possível editar a avaliação do livro feita pelo usuário;
- [ ] Deve ser possível excluir a avaliação do livro feita pelo usuário;
- [ ] Deve ser possível obter a quantidade de visitas na página de um livro;
- [ ] Deve ser possível controlar o progresso da leitura do livro;

## RNs (Regras de Negócio)

- [x] O usuário não pode se cadastrar com um e-mail já existente;
- [ ] O usuário só pode gerar uma avaliação após finalizar a leitura do livro;
- [ ] O usuário só pode editar ou excluir avaliações feitas por ele mesmo;
- [ ] O usuário deve permanecer logado por meio do sistema de autenticação com refresh token;
- [ ] As recomendações de livros devem levar em consideração os gêneros, escritores e o progresso e engajamento do usuário na leitura;
- [ ] A funcionalidade de leitura em voz alta deve estar disponível para todos os livros, como recurso de acessibilidade;

## RNFs (Requisitos Não Funcionais)

- [x] A senha do usuário deve estar criptografada;
- [ ] Os dados da aplicação devem estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de livros devem ser paginadas com 10 livros por página;
- [ ] Todas as listas de avaliações devem ser paginadas com 5 avaliações por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
- [ ] O usuário pode obter um novo JWT por meio de um refresh token (quando já estiver logado);
- [ ] Os livros devem ser armazenados em arquivos PDF;
- [ ] Para recuperação de senha, o usuário deve receber um e-mail com um código de 6 dígitos;
- [ ] As respostas das recomendações baseadas em IA devem ser entregues em até 2 segundos para manter a fluidez da experiência;
- [ ] O processamento de dados sensíveis para recomendações deve seguir políticas de privacidade e anonimização;
