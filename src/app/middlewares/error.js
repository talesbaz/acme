module.exports = [
  {
    404: (request, response) => response.status(404).send({ message: `Rota ${request.url} não encontrada` })
  },
  {
    500: (request, response) => response.status(500).send({ message: 'Erro Interno' })
  }
];
