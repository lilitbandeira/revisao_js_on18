/* 
2. Uma cliente solicitou a criação de uma aplicação que calcula a média das notas das alunas em cada tema de uma prova de vestibular da sua faculdade de Medicina e classifique as aprovadas, reprovadas e quem ficou na lista de espera. Ela nos forneceu as seguintes informações:

- As 5 com melhores notas estão aprovadas;
- As 3 que tiverem melhores notas além das aprovadas ficam na lista de espera;
- São 5 notas (Redaçao, Inglês, Exatas, Humanas, Biológicas) que variam entre 0 e 100 pontos;
- Quem tiver alguma nota 0 está eliminada
- O retorno da aplicação deve ser uma lista em ordem de pontuação, com as pessoas que tiveram algum 0 nas últimas colocações e com as tags: 'aprovada', 'lista de espera' e 'reprovada', exemplo:

Maria 87 (Aprovada)
Maria 85 (Aprovada)
Maria 81 (Aprovada)
Maria 73 (Aprovada)
Maria 69 (Aprovada)
Maria 67 (Lista Espera)
Maria 52 (Lista Espera)
Maria 39 (Reprovada)
[...]

- Bateremos em dois endpoints, o primeiro para obter o token válido que será usado no segundo que bate um banco de dados para obter a lista com todas as notas das alunas, seguem os endpoints(FAKEs):
*/

function obterToken() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('EabKDDtC_Q93WmuPQQuNun@L-TAFXG'), 1000)
  })
}

let endPointListaNotas = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(id != 'EabKDDtC_Q93WmuPQQuNun@L-TAFXG') {
        return reject({
          status: 403,
          message: 'Forbiden: Token inválido'});
      }
      return resolve([
        {
          aluna: 'Bianca',
          notas: {
            redacao: 57,
            ingles: 83, 
            exatas: 64, 
            humanas: 73, 
            biologicas: 42,
          }
        },
        {
          aluna: 'Gabriela',
          notas: {
            redacao: 81,
            ingles: 67, 
            exatas: 50, 
            humanas: 82, 
            biologicas: 39,
          }
        },
        {
          aluna: 'Luana',
          notas: {
            redacao: 0,
            ingles: 90, 
            exatas: 87, 
            humanas: 34, 
            biologicas: 42,
          }
        },
        {
          aluna: 'Ana',
          notas: {
            redacao: 90,
            ingles: 78, 
            exatas: 45, 
            humanas: 95, 
            biologicas: 50,
          }
        },
        {
          aluna: 'Alana',
          notas: {
            redacao: 91,
            ingles: 62, 
            exatas: 72, 
            humanas: 58, 
            biologicas: 60,
          }
        },
        {
          aluna: 'Lisboa',
          notas: {
            redacao: 79,
            ingles: 39, 
            exatas: 0, 
            humanas: 98, 
            biologicas: 90,
          }
        },
        {
          aluna: 'Jessica',
          notas: {
            redacao: 38,
            ingles: 90, 
            exatas: 72, 
            humanas: 68, 
            biologicas: 65,
          }
        },
        {
          aluna: 'Isabela',
          notas: {
            redacao: 10,
            ingles: 98, 
            exatas: 100, 
            humanas: 70, 
            biologicas: 72,
          }
        },
        {
          aluna: 'Leinane',
          notas: {
            redacao: 99,
            ingles: 98, 
            exatas: 100, 
            humanas: 99, 
            biologicas: 100,
          }
        },
        {
          aluna: 'Luzia',
          notas: {
            redacao: 92,
            ingles: 83, 
            exatas: 73, 
            humanas: 70, 
            biologicas: 52,
          }
        },
        {
          aluna: 'Bianca',
          notas: {
            redacao: 30,
            ingles: 100, 
            exatas: 75, 
            humanas: 75, 
            biologicas: 80,
          }
        }
      ]);
    }, 1000)
  });
}

/* 
PS.: neste exercício você pode aplicar conceitos de: estrutura condicional, estruturas de repetição, métodos de array, funções, promises, async/await e try/catch...
*/


/*
Maria 87 (Aprovada)
Maria 85 (Aprovada)
Maria 81 (Aprovada)
Maria 73 (Aprovada)
Maria 69 (Aprovada)
Maria 67 (Lista Espera)
Maria 52 (Lista Espera)
Maria 39 (Reprovada)
*/

async function executar() {
  try {
    const token = await obterToken()
    const alunas = await endPointListaNotas(token)
    const classificacao = [] 
    const resultado = []
    alunas.forEach((aluna) => {
      let notas = Object.values(aluna.notas)
      let alunaZerou = notas.includes(0) 
      let media = (notas.reduce((acumulador, nota) => acumulador + nota))/5
      if(alunaZerou) {
        resultado.push(`${aluna.aluna} ${media} (Reprovada)`)
      } else {
        classificacao.push([media, aluna.aluna])
      }
    })
    const novaClassificacao = classificacao.sort()
    // console.log(novaClassificacao)
    for(let i = 0; i < novaClassificacao.length; i++) {
      if(i >= novaClassificacao.length - 5) {
        resultado.unshift(`${novaClassificacao[i][1]} ${novaClassificacao[i][0]} (Aprovada)`)
      } else if (i >= novaClassificacao.length - 8) {
        resultado.unshift(`${novaClassificacao[i][1]} ${novaClassificacao[i][0]} (Lista de espera)`)
      } else {
        resultado.push(`${novaClassificacao[i][1]} ${novaClassificacao[i][0]} (Reprovada)`)
      }
    }
    return resultado
  }
  catch(err) {
    console.error(err)
  }
}

executar().then((resposta) => console.log(resposta))


