## ***:computer: Documentação***

Você pode acessar o link da produção [aqui](http://ec2-44-210-240-20.compute-1.amazonaws.com/)

## Infraestrutura utilizadas

- Amazon EC2: Instância virtual na AWS que hospeda a aplicação em produção.
- Amazon RDS: Serviço de banco de dados relacional na nuvem, gerenciado pela AWS.

### ***Configurações Iniciais***

- Primeiro, você precisa ter o <kbd>[Node.js](https://nodejs.org) (LTS version)</kbd> instalado na sua máquina. 

Se você estiver utilizando o **Linux**, você pode optar por instalar o **Node** através do gerênciador de versões <kbd>[nvm](https://github.com/nvm-sh/nvm)</kbd> para facilitar o processo de mudança da versão do **Node**, quando for necessário.

Você pode optar também por utilizar o **yarn** no lugar do **npm**. Você pode instalar clicando nesse link <kbd>[Yarn](https://yarnpkg.com/en/docs/install#windows-stable)</kbd>, ou através do <kbd>[nvm](https://github.com/nvm-sh/nvm)</kbd>.

***Baixando Projeto***

#### - ***Instalação Projeto Designado***

```sh
# Clonando repositório designado para o projeto.

$ git clone {link do projeto}

# Instalando dependência no projeto.

$ npm install 

# Executando a aplicação em modo de desenvolvimento:

$ npm run dev 
ou
$ npm run start

```

### - ***Configurações do Git Local***

```
git config --local core.autocrlf false
git config --local core.safecrlf false
```

### - ***Padrão de Versionamento***

```
X.Y.Z
│ │ └──> Bug fixes or improvements
│ └────> New features
└──────> New version
```

#### - ***Criando um Pull Request***

Depois de subir a branch para o repositório no GitHub você deverá criar um ***Pull Request*** onde o código será avaliado e depois de compararmos os códigos faremos um ***merge*** para juntar todos os códigos.

<i><h2 align="center">Responsável, <a href="https://www.linkedin.com/in/cicerolinoeneto/">Cicero Lino</a></h2></i>
