export const steps = [
  {
    id: 'landing',
    type: 'landing',
    topBar: true,
    title: 'PARA QUEM BUSCA CURAR SEUS TRAUMAS DE INFÂNCIA',
    subtitle: 'Responda este <span class="highlight-orange">quiz de 2 minutos</span> para acessar um <span class="highlight-blue">diagnóstico completo</span> das suas feridas emocionais.',
    offer: '<span class="highlight-orange font-bold">E MAIS!</span> Você vai receber um <span class="highlight-blue font-bold">protocolo terapêutico personalizado de 14 dias</span> para se libertar da dependência emocional, relacionamentos tóxicos e autossabotagem.',
    heroImage: 'https://i.imgur.com/whDpSVT.png', 
    question: 'Selecione o seu gênero para <span class="highlight-blue">começar</span>:',
    options: [
      { label: 'Homem ♂️', value: 'male' },
      { label: 'Mulher ♀️', value: 'female' }
    ],
    testimonials: [
        {
          stars: 5,
          title: '“Cresci acreditando que não merecia amor”',
          name: 'Vanessa Ribeiro',
          age: 45,
          text: 'Na minha infância, só ouvia críticas. Meu pai dizia que eu era um erro, e minha mãe raramente demonstrava carinho. Cresci com a sensação de que eu não merecia amor, e isso me acompanhou em todos os meus relacionamentos. Eu aceitava migalhas, achava que qualquer pessoa poderia me tratar mal. Com o diagnóstico da minha criança interior, consegui revisitar essas memórias e ressignificá-las. Hoje sei que não sou definida pelo que vivi na infância. Eu mereço amor e finalmente aprendi a me dar esse amor primeiro.'
        },
        {
          stars: 5,
          title: '“Eu sempre imaginava que algo ruim ia acontecer”',
          name: 'André Luiz Pereira',
          age: 56,
          text: 'Eu cresci em uma casa onde ninguém falava sobre sentimentos. Mas os gritos e as portas batendo diziam tudo. Cada vez que meu pai perdia o controle, eu me escondia debaixo da cama, rezando para não ser o próximo. Carreguei esse medo por toda a vida adulta, sempre esperando que algo ruim fosse acontecer. O meu protocolo personalizado me ajudou a revisitar minha criança ferida, a dar voz a ele e mostrar que hoje ele já está seguro. Foi a primeira vez que senti paz dentro de mim.'
        },
        {
          stars: 5,
          title: '“Eu achava que a vida era só sofrimento”',
          name: 'Camila Mendes',
          age: 32,
          text: 'Meu pai era alcoólatra e eu cresci vendo minha mãe apanhar quando ele bebia. Muitas vezes, eu também era o alvo. Passei a adolescência acreditando que a vida era apenas sofrimento e que violência era algo normal. Isso fez de mim uma mulher fria, insegura e sempre em alerta. O protocolo me deu coragem para encarar essa dor enterrada, que eu evitava a qualquer custo. Hoje não vivo mais preso ao medo do passado. Estou aprendendo a construir uma vida sem repetir o ciclo de dor que herdei.'
        }
    ]
  },
  {
    id: 'transition_gender',
    type: 'transition'
  },
  {
    id: 'q1',
    type: 'question',
    layout: 'grid',
    question: 'Qual é a sua <span class="highlight-blue-bold">idade</span>?',
    options: ['18 - 29', '30 - 39', '40 - 49', '50 - 59', '60 - 69', '70+']
  },
  {
    id: 'q2',
    type: 'question',
    layout: 'list-gender',
    question: 'Você já ouviu falar em <span class="highlight-blue-bold">criança interior</span>?',
    options: [
      { label: 'Sim, já ouvi falar!', value: 'sim' },
      { label: 'É a primeira vez', value: 'nao' }
    ]
  },
  {
    id: 'transition_inner_child',
    type: 'transition',
    condition: (answers) => answers['q2'] === 'sim',
    title: 'Perfeito!',
    image: '/assets/transition_heads.png',
    copy: 'Como você já conhece o conceito de criança interior, vamos montar um <span class="font-black text-slate-900">plano personalizado com ferramentas práticas</span> para você curar as suas feridas emocionais <span class="font-black text-slate-900">sem precisar de anos de terapia</span>.',
    buttonText: 'CONTINUAR'
  },
  {
    id: 'transition_inner_child_intro',
    type: 'transition',
    condition: (answers) => answers['q2'] === 'nao',
    title: '<span class="text-blue-600">Sem problemas</span><span class="text-orange-500">!</span>',
    image: 'https://i.imgur.com/HhjPTSZ.png',
    copy: 'A Cura da Criança Interior foi estruturada para você que sofreu algum tipo de <span class="font-black text-slate-900">trauma emocional no passado</span>.<br><br>Este método terapêutico é baseado nos ensinamentos do criador da psicanálise Sigmund Freud e o psiquiatra Carl Gustav Jung para ajudar você a <span class="font-black text-slate-900">curar os medos e bloqueios que sabotam a sua vida no presente, sem precisar de anos de terapia.</span>',
    buttonText: 'CONTINUAR'
  },

  {
    id: 'q3',
    type: 'question',
    layout: 'grid',
    section: 'Parte 1 - Origem do trauma',
    question: 'Na sua <span class="highlight-blue-bold">infância</span>, seus pais eram...',
    options: [
      'Casados e felizes',
      'Casados mas infelizes',
      'Divorciados',
      'Eu cresci sem pai',
      'Eu cresci sem mãe',
      'Eu cresci sem os dois'
    ]
  },
  {
    id: 'q4',
    type: 'question',
    layout: 'pills',
    section: 'Parte 1 - Origem do trauma',
    multiSelect: true,
    question: 'Como você descreveria o <span class="highlight-blue-bold">ambiente em que você cresceu</span>?',
    subtitle: 'Selecione uma ou mais opções abaixo e depois clique no botão <span class="text-orange-500 font-bold">"CONTINUAR"</span> no final desta página.',
    options: [
      'Amoroso', 'Caótico', 'Feliz', 'Rígido', 'Seguro',
      'Solitário', 'Violento', 'Com muitas brigas',
      'Com dificuldades financeiras', 'Frio emocionalmente'
    ]
  },
  {
    id: 'q5',
    type: 'question',
    layout: 'pills',
    multiSelect: true,
    section: 'Parte 1 - Origem do trauma',
    question: 'Com quais das pessoas abaixo você compartilha <span class="highlight-blue-bold">memórias negativas</span>?',
    subtitle: 'Selecione uma ou mais opções abaixo e depois clique no botão <span class="text-orange-500 font-bold">"CONTINUAR"</span> no final desta página.',
    options: [
      'Pai / Mãe', 'Irmão / Irmã', 'Avô(ó)',
      'Tio(a)', 'Primo(a)', 'Amigo(a)',
      'Professor(a)', 'Colega de sala',
      'Padrasto(Madrasta)',
      'Outras pessoas'
    ]
  },
  {
    id: 'transition_info_1',
    type: 'info',
    carousel: true,
    title: '<span class="text-blue-600">Mais de</span> <span class="text-orange-500">90%</span> das suas feridas emocionais surgiram na infância ou adolescência',
    image: '/assets/inner_child_healing.png',
    subtitle: 'A partir de <span class="text-blue-600">5 sentimentos</span> chave:',
    slides: [
      {
        id: 1,
        title: 'Rejeição',
        icon: 'Ghost',
        color: 'text-orange-500',
        wound: 'Sensação de não ser amado ou de ser excluído.',
        consequences: [
          'Baixa autoestima e sentimento constante de inadequação.',
          'Medo de se expor ou de se aproximar de pessoas (evita intimidade).',
          'Busca excessiva por aprovação externa.',
          'Dificuldade em estabelecer relacionamentos duradouros.',
          'Susceptibilidade à depressão e ansiedade social.'
        ]
      },
      {
        id: 2,
        title: 'Abandono',
        icon: 'UserX',
        color: 'text-blue-400',
        wound: 'Sentimento de desamparo e medo de ficar sozinho ou sem apoio.',
        consequences: [
          'Dependência emocional em relacionamentos',
          'Medo excessivo de perder pessoas',
          'Tolerância a comportamentos tóxicos',
          'Dificuldade em impor limites'
        ]
      },
      {
        id: 3,
        title: 'Humilhação',
        icon: 'ThumbsDown',
        color: 'text-red-400',
        wound: 'Vergonha tóxica e sensação de ser inferior ou indigno.',
        consequences: [
          'Autocrítica severa e constante',
          'Vergonha de expressar necessidades',
          'Colocar os outros sempre em primeiro lugar',
          'Medo de ser julgado ou exposto'
        ]
      },
      {
        id: 4,
        title: 'Traição',
        icon: 'ShieldAlert',
        color: 'text-yellow-500',
        wound: 'Perda de confiança devido a promessas quebradas ou mentiras.',
        consequences: [
          'Dificuldade extrema em confiar',
          'Necessidade de controle excessivo',
          'Ceticismo em relação às intenções alheias',
          'Hipervigilância constante'
        ]
      },
      {
        id: 5,
        title: 'Injustiça',
        icon: 'Scale',
        color: 'text-orange-500',
        wound: 'Sensação de que a vida é injusta e que não se é tratado de forma equitativa.',
        consequences: [
          'Perfeccionismo ou rígida necessidade de controlar tudo.',
          'Raiva constante ou ressentimento em relação a outros.',
          'Falta de empatia ou dificuldade em compreender perspectivas alheias.',
          'Frustração frequente e sensação de impotência.',
          'Dificuldade em lidar com mudanças e situações inesperadas.'
        ]
      }
    ],
    buttonText: 'CONTINUAR'
  },
  {
    id: 'q6',
    type: 'question',
    layout: 'list-icons',
    section: 'Parte 2 - Consequências do trauma',
    question: '<span class="text-blue-600 font-bold">Você sente a sua mente sobrecarregada</span>, como se seus pensamentos e sentimentos fossem demais para lidar?',
    options: ['Todo dia', 'Quase sempre', 'De vez em quando']
  },
  {
    id: 'q7',
    type: 'question',
    layout: 'list-icons',
    section: 'Parte 2 - Consequências do trauma',
    question: 'Com que frequência a sua <span class="text-blue-600 font-bold">voz interna</span> é crítica ou negativa?',
    options: ['Todo dia', 'Mais do que eu gostaria', 'Ás vezes']
  },
  {
    id: 'q8',
    type: 'question',
    layout: 'list-icons',
    section: 'Parte 2 - Consequências do trauma',
    question: '<span class="block text-lg font-normal text-slate-600 mb-2">Você concorda com a afirmação:</span> <span class="text-orange-500">"</span><span class="italic">Nos meus relacionamentos, muitas vezes <span class="text-blue-600">sinto que me importo mais</span> do que a outra pessoa.</span><span class="text-orange-500">"</span>',
    options: [
      'Sim, isso me incomoda bastante',
      'Meus relacionamentos são equilibrados',
      'Eu costumo me dedicar menos'
    ]
  },
  {
    id: 'transition_info_2',
    type: 'info',
    layout: 'news-impact',
    title: 'O trauma vai muito além das <span class="text-blue-600">lembranças</span><span class="text-orange-500">...</span>',
    newsSlides: [
        'https://i.imgur.com/74TNgU5.png',
        'https://i.imgur.com/mx5YDQF.png',
        'https://i.imgur.com/KgamrX4.png'
    ],
    copy: 'Estudos mostram que <span class="font-bold text-slate-900">pessoas com histórico de trauma na infância, apresentam um risco maior de desenvolver problemas físicos e psicológicos</span>, como:',
    gridItems: [
        { text: '<span class="text-orange-500 font-bold">Depressão</span> e episódios recorrentes de ansiedade' },
        { text: '<span class="text-orange-500 font-bold">Inflamação e ganho de peso</span> devido ao cortisol elevado' },
        { text: '<span class="text-orange-500 font-bold">Gastos compulsivos</span> e dificuldade para guardar dinheiro' },
        { text: '<span class="text-orange-500 font-bold">Problemas de pele</span>, cardíacos, digestivos ou hormonais' },
        { text: '<span class="text-orange-500 font-bold">Explosões de raiva</span>, isolamento ou apatia' },
        { text: '<span class="text-orange-500 font-bold">Insônia</span> e pesadelos constantes' },
        { text: '<span class="text-orange-500 font-bold">Maior probabilidade de vício</span> em açúcar, álcool, cigarro, entorpecentes, pornografia e remédios', fullWidth: true }
    ],
    buttonText: 'CONTINUAR'
  },
  {
    id: 'q9',
    type: 'question',
    layout: 'list-icons',
    section: 'Parte 3 - Padrões Inconscientes',
    question: 'Com que frequência você se percebe <span class="text-blue-600 font-bold">procrastinando</span>?',
    options: ['Todo dia', 'Mais do que eu gostaria', 'Às vezes']
  },
  {
    id: 'q10',
    type: 'question',
    layout: 'list-emoji',
    section: 'Parte 3 - Padrões Inconscientes',
    question: '<span class="block text-lg font-normal text-slate-600 mb-2">Você concorda com a afirmação:</span> <span class="text-pink-400 font-bold text-2xl">"</span> <span class="italic font-bold text-slate-900 text-xl">Alguns comportamentos que tenho atrapalham minha <span class="text-blue-600">vida profissional e financeira</span></span> <span class="text-pink-400 font-bold text-2xl">"</span>',
    options: [
      '💸 Infelizmente, eu me saboto nessa área',
      '😳 É raro, mas acontece',
      '😎 Isso nunca acontece comigo'
    ]
  },
  {
    id: 'q11',
    type: 'question',
    layout: 'list-icons',
    section: 'Parte 3 - Padrões Inconscientes',
    question: '<span class="text-slate-900 font-bold">Você tem dificuldade em</span> <span class="text-orange-400 font-black">impôr limites ou dizer não</span>?',
    options: [
      'Sim e acabo me anulando muitas vezes',
      'Algumas vezes',
      'Para mim isso é fácil'
    ]
  },
  {
    id: 'transition_info_3',
    type: 'info',
    layout: 'benefit-carousel',
    title: 'Estamos na <span class="text-blue-600">reta final...</span>',

    subtitle: 'O seu <span class="text-orange-500 font-bold">protocolo vai ajudar você</span> com:',
    copy: 'O seu <span class="text-orange-500 font-bold">protocolo vai ajudar você</span> com:',
    slides: [
        {
            title: '🌧️ Vulnerabilidade Emocional',
            color: 'text-blue-600',
            checks: [
                '✅ Baixa autoestima e amor-próprio',
                '✅ Cicatrizes de relacionamentos passados',
                '✅ Incapacidade de acolher os próprios sentimentos'
            ]
        },
        {
            title: '🌱 Sensação de Vida Estagnada',
            color: 'text-blue-600',
            checks: [
                '✅ Indecisão sobre o caminho profissional a seguir',
                '✅ Sentimento de estar preso em uma rotina que não traz realização',
                '✅ Medo de arriscar e sair da zona de conforto'
            ]
        },
        {
            title: '🧠 Exaustão Mental',
            color: 'text-blue-600',
            checks: [
                '✅ Estresse excessivo causado pelo trabalho e vida pessoal',
                '✅ Pensamentos acelerados que causam ansiedade',
                '✅ Dificuldade em lidar com emoções negativas'
            ]
        }
    ],
    buttonText: 'CONTINUAR'
  },
  {
    id: 'q12',
    type: 'question',
    layout: 'list-icons',
    section: 'Parte 4 - Personalização do Protocolo',
    question: '<span class="block text-lg font-normal text-slate-600 mb-2">Antes de receber seu protocolo de emergência emocional:</span> <span class="text-slate-900 font-bold text-2xl">Você se compromete a <span class="text-blue-600">aplicar todo o passo-a-passo</span>?</span>',
    options: [
      'Eu prometo cumprir todo o protocolo',
      'Vou dar o meu melhor',
      'Sim'
    ]
  },
  {
    id: 'q13',
    type: 'question',
    layout: 'list-checkbox',
    section: 'Parte 4 - Personalização do Protocolo - <span class="text-orange-500">13 / 14</span>',
    question: 'Qual <span class="text-blue-600 font-bold">área da vida</span> você quer melhorar primeiro?',
    subtitle: 'Selecione uma ou mais opções abaixo e depois clique no botão <span class="text-orange-500 font-bold">"CONTINUAR"</span>.',
    multiSelect: true,
    options: [
      'Profissional e financeiro',
      'Relacionamentos afetivos e amorosos',
      'Saúde mental e emocional'
    ]
  },
  {
    id: 'q14',
    type: 'question',
    layout: 'pills',
    section: 'Parte 4 - Personalização do Protocolo - <span class="text-orange-500 font-bold">14 / 14</span>',
    question: 'Existe <span class="text-blue-600">algo mais</span> que você gostaria de trabalhar?',
    subtitle: 'Selecione uma ou mais opções abaixo e depois clique no botão <span class="text-orange-500 font-bold">"CONTINUAR"</span> no final desta página.',
    multiSelect: true,
    options: [
      'Ansiedade', 'Apatia/Congelamento', 'Estresse',
      'Medo', 'Culpa', 'Vergonha',
      'Insegurança', 'Desmotivação',
      'Procrastinação', 'Autossabotagem',
      'Dependência emocional', 'Baixa autoestima'
    ]
  },
  {
    id: 'analysis',
    type: 'analysis',
    copy: 'Analisando suas respostas...',
    completeCopy: 'Seu diagnóstico está pronto!'
  },
  {
    id: 'sales',
    type: 'sales',
    title: 'SOS Criança Interior'
  }
];
