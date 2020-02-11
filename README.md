# urban-map-site

Site do Mapa de Acessibilidade Urbana.

### Pré-requisitos

- [Node.js](https://nodejs.org) (versão 12 ou maior)


### Ambientação
Crie uma cópia do arquivo `.env.default` com o nome `.env` na raíz do projeto. Em seguida, é necessário configurar corretamente as variáveis de ambiente no seu novo arquivo `.env`. As variáveis não são comitadas no repositório por questões de segurança. Entre em contato com o administrador do projeto para demais dúvidas.

### Integrações
Esta aplicação tem integração com o [Google Maps](https://developers.google.com/maps/documentation/javascript/tutorial). Para fazer a integração, é necessário configurável a chave de API do Google Maps no arquivo `.env`. Contate o a


### Desenvolvimento

Primeiro, execute o comando de instalação de dependências:
```
$ npm install -g yarn
$ yarn
```


Com o servidor [urban-map-api](https://github.com/lucascomp/urban-map-api) sendo executado, rode a aplicação com o comando:
```
$ yarn dev
```

Você poderá acessar o urban-map-site através do endereço http://localhost:3000

Para acessar a aplicação através de um dispositivo móvel, entre na mesma rede wi-fi, descubra o endereço IP da sua máquina em que a aplicação está sendo executada e acesse este endereço através do dispositivo móvel.
