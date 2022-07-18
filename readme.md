# Escopo Projeto
Projeto para a Secretaria Municipal de Assistência Social da cidade de joinville, desenvolvido durante as aulas do curso de engenharia de software.
Ainda não foi aprovado e não necessariamente será enviado para produção, pois se trata de um MVP.

## Subindo sistema localmente
## Configurar variaveis de ambiente
* Em produção existem mais variaveis de ambiente, note que TOKEN_SECRET é importantissima, pois ela é usada como parametro para gerar o token.
* Deve-se ter um arquivo '.env' no diretorio "/src", com o seguinte conteúdo


~~~
DATABASE_URL=postgres://postgres:pac123@localhost:5432/mydb
PASSWORD=pac123
DATABASE=mydb
PORT=3333
NODE_ENV=development
TOKEN_SECRET=token
~~~

## para subir um container do postgres no docker:
1. docker run --name my-postgres -e "POSTGRES_PASSWORD=pac123" -p 5432:5432 -d postgres

## Para iniciar a aplicação localmente:
1. npx sequelize-cli db:create
2. npx sequelize-cli db:migrate
3. npm run dev

## Dicas Desenvolvimento

## Para criar um model (mapeamento de uma entidade do banco no codigo):
npx sequelize-cli model:generate --name NomeEntidade --attributes nome:string,quantidade:integer

## Comandos do migration do banco
1. Para criar o banco definido no arquivo config.json:
   ~~~
   yarn sequelize-cli db:create
   ~~~ 
2. Para rodar o migrate e criar as entidades anteriormente geradas pelo "sequelize-cli model:generate":
   ~~~
   yarn sequelize-cli db:migrate
   ~~~
3. Criar um migration para editar uma tabela
   - Vide exemplo do arquivo migration usuario_add_coluna_endereco_id
   ~~~
   yarn sequelize-cli migration:create --name usuario_add_coluna_endereco_id
   ~~~
   
   
   
> Desenvolvido por: https://github.com/victorEsantos e https://github.com/xandegrawe
