# App

**Readify Plus**

## RFs (Requisitos Funcionais)

- [x] Deve ser possível se cadastrar com dados para identificação e acesso do usuário;
- [x] Deve ser possível cadastrar as preferencias de leitura do usuário (categoria e escritor);
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível redefinir a senha;
- [x] Deve ser possível obter o perfil do usuário logado;
- [x] Deve ser possível atualizar as informações do usuário logado;
- [x] Deve ser possível alterar a senha do usuário logado;
- [x] Deve ser possível obter o modo de leitura do usuário logado;
- [x] Deve ser possível atualizar o modo de leitura do usuário logado;
- [x] Deve ser possível obter os livros que estão sendo lidos pelo usuário logado;
- [x] Deve ser possível obter os livros lidos pelo usuário logado;
- [x] Deve ser possível obter a quantidade de livros lidos pelo usuário logado;
- [x] Deve ser possível obter os livros favoritos do usuário logado;
- [ ] Deve ser possível obter os livros sugeridos ao usuário logado (Sistema de recomendação com I.A.);
- [x] Deve ser possível obter os livros mais populares da plataforma;
- [x] Deve ser possível buscar livros pelo título;
- [x] Deve ser possível filtrar livros por gênero textual e/ou escritor;
- [x] Deve ser possível obter as informações de um livro;
- [x] Deve ser possível adicionar um livro à lista de favoritos;
- [x] Deve ser possível remover um livro da lista de favoritos;
- [ ] Deve ser possível obter o texto do livro para leitura;
- [ ] Deve ser possível converter o texto do livro em áudio;
- [x] Deve ser possível dar um like em uma avaliação;  //
- [x] Deve ser possível remover o like em uma avaliação;  //
- [x] Deve ser possível gerar uma avaliação do livro;  //
- [ ] Deve ser possível obter as avaliações de um livro;
- [ ] Deve ser possível obter uma avaliação;
- [ ] Deve ser possível editar uma avaliação do livro;
- [ ] Deve ser possível excluir uma avaliação do livro;
- [x] Deve ser possível obter a quantidade de comentarios feitos pelo usuário logado; 
- [x] Deve ser possível controlar visitas na página de um livro;
- [ ] Deve ser possível controlar o progresso da leitura do livro; //
- [ ] Deve ser possível obter o progresso da leitura do livro; //

## RNs (Regras de Negócio)

- [x] O usuário não pode se cadastrar com um e-mail já existente;
- [x] O usuário deve cadastrar pelo menos 2 preferencias de leitura para categoria e escritor; 
- [x] O usuário quando cadastrar deve ser criado a configuração de leitura padrão e vincular ao usuário;
- [ ] O usuário só pode gerar uma avaliação após finalizar a leitura do livro;
- [ ] O usuário só pode editar ou excluir avaliações feitas por ele mesmo;
- [x] O usuário deve permanecer logado por meio do sistema de autenticação com refresh token;
- [ ] As recomendações de livros devem levar em consideração os gêneros, escritores e o progresso e engajamento do usuário na leitura;
- [ ] A funcionalidade de leitura em voz alta deve estar disponível para todos os livros, como recurso de acessibilidade;

## RNFs (Requisitos Não Funcionais)

- [x] A senha do usuário deve estar criptografada;
- [x] Os dados da aplicação devem estar persistidos em um banco PostgreSQL;
- [ ] Listas de sugestão de livros e mais populares devem ser paginadas com 10 livros por página;
- [ ] Todas as listas de avaliações devem ser paginadas com 5 avaliações por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);
- [x] O usuário pode obter um novo JWT por meio de um refresh token (quando já estiver logado);
- [ ] Os livros devem ser armazenados em arquivos PDF;
- [x] Para recuperação de senha, o usuário deve receber um e-mail com um código de 6 dígitos;
- [ ] As respostas das recomendações baseadas em IA devem ser entregues em até 2 segundos para manter a fluidez da experiência;
- [ ] O processamento de dados sensíveis para recomendações deve seguir políticas de privacidade e anonimização;
