# Para iniciar a aplicação digite:
## yarn dev

# para subir um container do postgres no docker:
## docker run --name my-postgres -e "POSTGRES_PASSWORD=pac123" -p 5432:5432 -d postgres


# Para criar um model (mapeamento de uma entidade do banco no codigo):
## yarn sequelize-cli model:generate --name NomeEntidade --attributes nome:string,quantidade:integer


# Comandos do migration do banco
##  Para criar o banco definido no arquivo config.json:
### yarn sequelize-cli db:create
## Para rodar o migrate e criar as entidades anteriormente geradas pelo "sequelize-cli model:generate":
### yarn sequelize-cli db:migrate
## Criar um migration para editar uma tabela
###  yarn sequelize-cli migration:create --name usuario_add_coluna_endereco_id
### vide exempl do arquivo migration usuario_add_coluna_endereco_id