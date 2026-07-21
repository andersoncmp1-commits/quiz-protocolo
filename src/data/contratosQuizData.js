export const CONTRATOS_QUIZ_DATA = {
  title: "DESCUBRA QUAL CONTRATO INVISÍVEL GOVERNA A SUA VIDA",
  intro: [
    "Muitas das escolhas que fazemos não nascem da nossa vontade.",
    "Elas nascem de acordos invisíveis que aprendemos, muitas vezes ainda na infância, para receber amor, aprovação, pertencimento ou segurança.",
    "Esses contratos podem influenciar seus relacionamentos, suas decisões, sua autoestima e até a forma como você trata a si mesma, sem que você perceba.",
    "Responda às perguntas pensando em como você realmente age, e não em como gostaria de agir.",
    "Ao final, você descobrirá qual contrato invisível pode estar governando suas escolhas hoje."
  ],
  questions: [
    {
      id: 1,
      contractId: 'aprovacao',
      question: 'Quando alguém importante fica chateado porque você colocou um limite, o que costuma acontecer?',
      options: [
        { letter: 'A', label: 'Consigo manter minha decisão, mesmo que a pessoa não goste.', points: 0 },
        { letter: 'B', label: 'Fico desconfortável, mas tento sustentar o limite.', points: 1 },
        { letter: 'C', label: 'Sinto culpa e, muitas vezes, volto atrás.', points: 2 }
      ]
    },
    {
      id: 2,
      contractId: 'autoridade_externa',
      question: 'Quando precisa tomar uma decisão importante, você costuma:',
      options: [
        { letter: 'A', label: 'Refletir e decidir com base no que considero melhor para mim.', points: 0 },
        { letter: 'B', label: 'Ouvir outras pessoas antes de decidir.', points: 1 },
        { letter: 'C', label: 'Precisar da aprovação de alguém para me sentir segura.', points: 2 }
      ]
    },
    {
      id: 3,
      contractId: 'sacrificio',
      question: 'Quando alguém que você ama está com um problema, você costuma:',
      options: [
        { letter: 'A', label: 'Ajudar dentro dos meus limites.', points: 0 },
        { letter: 'B', label: 'Envolver-me mais do que gostaria.', points: 1 },
        { letter: 'C', label: 'Sentir que preciso resolver o problema, mesmo que isso me custe caro.', points: 2 }
      ]
    },
    {
      id: 4,
      contractId: 'lealdade_familiar',
      question: 'Se você fizesse uma escolha muito diferente daquela que sua família esperava, como se sentiria?',
      options: [
        { letter: 'A', label: 'Livre para construir minha própria vida.', points: 0 },
        { letter: 'B', label: 'Feliz com a escolha, mas um pouco culpada.', points: 1 },
        { letter: 'C', label: 'Como se estivesse decepcionando ou abandonando minha família.', points: 2 }
      ]
    },
    {
      id: 5,
      contractId: 'merecimento',
      question: 'Quando recebe uma oportunidade, um elogio ou um reconhecimento, você costuma:',
      options: [
        { letter: 'A', label: 'Receber com satisfação.', points: 0 },
        { letter: 'B', label: 'Sentir algum desconforto, mas aceitar.', points: 1 },
        { letter: 'C', label: 'Pensar que ainda não fez o suficiente para merecer.', points: 2 }
      ]
    },
    {
      id: 6,
      contractId: 'aprovacao',
      question: 'Quando precisa dizer "não" a alguém, você geralmente:',
      options: [
        { letter: 'A', label: 'Digo com clareza e respeito.', points: 0 },
        { letter: 'B', label: 'Digo, mas explico bastante para não magoar.', points: 1 },
        { letter: 'C', label: 'Acabo dizendo "sim" para não decepcionar a pessoa.', points: 2 }
      ]
    },
    {
      id: 7,
      contractId: 'autoridade_externa',
      question: 'Quando alguém discorda da sua percepção sobre algo que você viveu, você costuma:',
      options: [
        { letter: 'A', label: 'Continuar confiando no que percebi e senti.', points: 0 },
        { letter: 'B', label: 'Ficar em dúvida, mas tentar ouvir a mim mesma.', points: 1 },
        { letter: 'C', label: 'Pensar que a outra pessoa provavelmente sabe melhor do que eu.', points: 2 }
      ]
    },
    {
      id: 8,
      contractId: 'sacrificio',
      question: 'Qual frase mais se aproxima da sua relação com o descanso?',
      options: [
        { letter: 'A', label: 'Descansar é uma necessidade e faz parte da vida.', points: 0 },
        { letter: 'B', label: 'Consigo descansar, mas às vezes sinto culpa.', points: 1 },
        { letter: 'C', label: 'Só consigo descansar depois de cuidar de tudo e de todos.', points: 2 }
      ]
    },
    {
      id: 9,
      contractId: 'lealdade_familiar',
      question: 'Quando pensa em crescer, prosperar ou viver de uma forma diferente da sua família, você sente:',
      options: [
        { letter: 'A', label: 'Que posso amar minha família e escolher outro caminho.', points: 0 },
        { letter: 'B', label: 'Um pouco de culpa por ter oportunidades diferentes.', points: 1 },
        { letter: 'C', label: 'Que não deveria ter uma vida melhor ou muito diferente da deles.', points: 2 }
      ]
    },
    {
      id: 10,
      contractId: 'merecimento',
      question: 'Quando pensa em receber mais dinheiro, reconhecimento, amor ou cuidado, você sente:',
      options: [
        { letter: 'A', label: 'Que posso receber sem precisar provar nada.', points: 0 },
        { letter: 'B', label: 'Que preciso me esforçar um pouco mais para me sentir merecedora.', points: 1 },
        { letter: 'C', label: 'Que só mereço receber depois de trabalhar, sofrer ou fazer muito pelos outros.', points: 2 }
      ]
    }
  ],

  contracts: {
    aprovacao: {
      id: 'aprovacao',
      name: 'Contrato da Aprovação',
      title: 'SEU CONTRATO INVISÍVEL MAIS ATIVO É O CONTRATO DA APROVAÇÃO',
      quote: '"Se eu agradar, estarei segura."',
      icon: 'HeartHandshake',
      color: '#ec4899', // Pink
      lightBg: 'bg-pink-50 border-pink-200',
      paragraphs: [
        'Você pode ter aprendido, ainda na infância, que agradar era a forma mais segura de receber amor, evitar conflitos ou manter o vínculo com as pessoas importantes da sua vida.',
        'Hoje, esse contrato pode fazer com que você tenha dificuldade para dizer "não", coloque as necessidades dos outros acima das suas e sinta culpa sempre que tenta se priorizar.',
        'A boa notícia é que esse contrato foi aprendido. E tudo o que foi aprendido pode ser transformado.',
        'No Descongelar, você vai identificar a origem desse padrão e aprender exercícios práticos para começar a quebrar esse contrato invisível.'
      ]
    },
    autoridade_externa: {
      id: 'autoridade_externa',
      name: 'Contrato da Autoridade Externa',
      title: 'SEU CONTRATO INVISÍVEL MAIS ATIVO É O CONTRATO DA AUTORIDADE EXTERNA',
      quote: '"Alguém sabe melhor do que eu o que devo fazer."',
      icon: 'Compass',
      color: '#8b5cf6', // Purple
      lightBg: 'bg-purple-50 border-purple-200',
      paragraphs: [
        'Você pode ter aprendido a confiar mais na opinião dos outros do que na sua própria percepção.',
        'Por isso, talvez tenha dificuldade para tomar decisões, busque validação constantemente ou duvide das próprias escolhas.',
        'Esse contrato não nasceu com você. Ele foi construído ao longo da sua história.',
        'No Descongelar, você vai aprender a reconhecer esse padrão e fortalecer sua confiança para fazer escolhas com mais segurança.'
      ]
    },
    sacrificio: {
      id: 'sacrificio',
      name: 'Contrato do Sacrifício',
      title: 'SEU CONTRATO INVISÍVEL MAIS ATIVO É O CONTRATO DO SACRIFÍCIO',
      quote: '"Uma boa mulher coloca todos em primeiro lugar."',
      icon: 'ShieldAlert',
      color: '#f97316', // Orange
      lightBg: 'bg-orange-50 border-orange-200',
      paragraphs: [
        'Você pode ter aprendido que amar significa cuidar de todos, suportar tudo e deixar suas próprias necessidades sempre por último.',
        'Com o tempo, isso pode levar à exaustão, à culpa por descansar e à sensação de que nunca faz o suficiente.',
        'Esse contrato pode ser transformado.',
        'No Descongelar, você vai compreender como esse padrão foi criado e aprender, na prática, a cuidar dos outros sem continuar se abandonando.'
      ]
    },
    lealdade_familiar: {
      id: 'lealdade_familiar',
      name: 'Contrato da Lealdade Familiar',
      title: 'SEU CONTRATO INVISÍVEL MAIS ATIVO É O CONTRATO DA LEALDADE FAMILIAR',
      quote: '"Para pertencer, não posso escolher uma vida muito diferente da minha família."',
      icon: 'Users',
      color: '#3b82f6', // Blue
      lightBg: 'bg-blue-50 border-blue-200',
      paragraphs: [
        'Você pode amar sua família profundamente e, ainda assim, sentir culpa quando tenta construir uma vida diferente da que aprendeu.',
        'Esse contrato faz muitas pessoas confundirem amor com obrigação e lealdade com repetição da história familiar.',
        'No Descongelar, você vai aprender como honrar sua história sem continuar presa aos mesmos padrões.'
      ]
    },
    merecimento: {
      id: 'merecimento',
      name: 'Contrato do Merecimento',
      title: 'SEU CONTRATO INVISÍVEL MAIS ATIVO É O CONTRATO DO MERECIMENTO',
      quote: '"Preciso provar meu valor para merecer receber."',
      icon: 'Sparkles',
      color: '#10b981', // Emerald/Green
      lightBg: 'bg-emerald-50 border-emerald-200',
      paragraphs: [
        'Você pode ter aprendido que precisa trabalhar mais, fazer mais e se sacrificar mais para finalmente sentir que merece amor, descanso, reconhecimento ou prosperidade.',
        'Por isso, mesmo quando conquista algo, a sensação de que ainda não é suficiente continua presente.',
        'No Descongelar, você vai identificar a origem desse contrato e aprender como começar a construir uma relação mais saudável com seu próprio valor.'
      ]
    }
  },

  cta: {
    buttonText: "QUERO ENTRAR NO DESCONGELAR",
    redirectUrl: "https://descongelar.jardimconsciente.com.br/versao-b"
  }
};

/**
 * Computes general score, general title, and dominant contract(s)
 * based on user's answers map: { [questionId]: points (0, 1, 2) }
 */
export function calculateContratosResult(answers) {
  let totalScore = 0;
  
  const contractScores = {
    aprovacao: 0,
    autoridade_externa: 0,
    sacrificio: 0,
    lealdade_familiar: 0,
    merecimento: 0
  };

  CONTRATOS_QUIZ_DATA.questions.forEach((q) => {
    const pts = Number(answers[q.id]) || 0;
    totalScore += pts;
    if (contractScores[q.contractId] !== undefined) {
      contractScores[q.contractId] += pts;
    }
  });

  // General Score Title
  let generalTitle = "";
  if (totalScore <= 5) {
    generalTitle = "Seus contratos invisíveis aparecem em situações específicas.";
  } else if (totalScore <= 12) {
    generalTitle = "Alguns contratos invisíveis ainda influenciam suas escolhas.";
  } else {
    generalTitle = "Seus contratos invisíveis podem estar governando grande parte da sua vida.";
  }

  // Find max score among contracts
  let maxScore = -1;
  Object.values(contractScores).forEach((sc) => {
    if (sc > maxScore) maxScore = sc;
  });

  // Contracts with max score
  const topContracts = Object.keys(contractScores)
    .filter((id) => contractScores[id] === maxScore)
    .map((id) => CONTRATOS_QUIZ_DATA.contracts[id]);

  let dominantContracts = [];

  if (topContracts.length === 1) {
    dominantContracts = topContracts;
  } else if (topContracts.length === 2) {
    // Rule 4: If 2 tied, show both full results
    dominantContracts = topContracts;
  } else {
    // Rule 4: If 3 or more tied (or overall ranking), show the top 3 contracts with highest score
    const sorted = Object.keys(contractScores)
      .map((id) => ({
        contract: CONTRATOS_QUIZ_DATA.contracts[id],
        score: contractScores[id]
      }))
      .sort((a, b) => b.score - a.score);

    dominantContracts = sorted.slice(0, 3).map((item) => item.contract);
  }

  return {
    totalScore,
    generalTitle,
    contractScores,
    dominantContracts
  };
}
