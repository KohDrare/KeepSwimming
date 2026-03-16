// Module 0 — Le Déclic : fondations mentales
window.MODULE_M0 = {
  id: "m0", title: "Le Déclic", icon: "💡",
  description: "Comprendre POURQUOI le code existe et COMMENT un ordi pense",
  color: "#F59E0B",
  tag: null,
  lessons: [
    {
      id: "m0-l1", title: "Un ordi est stupide", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "Un ordinateur ne comprend RIEN. Il ne pense pas. Il ne devine pas. Il fait EXACTEMENT ce qu'on lui dit, lettre par lettre, dans l'ordre." },
          { type: "analogy", value: "Imagine que tu donnes des instructions à quelqu'un qui ne parle pas ta langue et qui suit tout au pied de la lettre. Si tu dis 'mets le sel', il ne sait pas OÙ. Si tu dis 'mets le sel dans la casserole', il le fait. Même si la casserole est vide. Il s'en fout. Il exécute." },
          { type: "key", value: "Programmer = donner des instructions ULTRA précises à un idiot très rapide." },
        ],
        quiz: {
          question: "Tu écris un programme qui dit : 'affiche le nombre 5'. L'ordi affiche 5. Tu changes rien et tu relances. Que se passe-t-il ?",
          options: ["Il affiche 5 à nouveau", "Il affiche un nombre aléatoire", "Il affiche rien car il l'a déjà fait", "Ça dépend de son humeur"],
          correct: 0,
          explanation: "Un programme fait TOUJOURS la même chose si on ne change rien. C'est déterministe. Pas d'humeur, pas de hasard, pas de fatigue. C'est ça la force du code.",
        },
      },
    },
    {
      id: "m0-l2", title: "La mémoire : des cases numérotées", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "La mémoire d'un ordi c'est comme un gigantesque meuble avec des tiroirs. Chaque tiroir a un numéro (son adresse) et peut contenir UNE valeur." },
          { type: "visual", value: "memory_boxes" },
          { type: "text", value: "Quand tu crées une variable en C, tu demandes à l'ordi : 'réserve-moi un tiroir, appelle-le X, et mets-y la valeur 42'. L'ordi trouve un tiroir libre, colle l'étiquette dessus, et y range 42." },
          { type: "key", value: "Une variable = un tiroir avec un nom et une valeur dedans. L'adresse du tiroir, c'est ce qu'on appelle un pointeur (on y reviendra)." },
        ],
        quiz: {
          question: "int x = 10; int y = x; y = 20; Que vaut x maintenant ?",
          options: ["20", "10", "30", "Erreur"],
          correct: 1,
          explanation: "y = x copie la VALEUR de x dans y. Après ça, x et y sont deux tiroirs SÉPARÉS. Changer y ne change pas x. Chacun son tiroir.",
        },
      },
    },
    {
      id: "m0-l3", title: "Le flux : ligne par ligne", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "Un programme s'exécute de HAUT en BAS, ligne par ligne. Comme une recette de cuisine. Tu ne fais pas l'étape 3 avant l'étape 1." },
          { type: "code", value: "int a = 5;      // Étape 1 : a vaut 5\nint b = 3;      // Étape 2 : b vaut 3\nint c = a + b;  // Étape 3 : c vaut 8 (pas avant!)\na = 0;          // Étape 4 : a vaut 0 maintenant\n// Mais c vaut TOUJOURS 8 ! c a été calculé avant." },
          { type: "key", value: "L'ordre des lignes est CRUCIAL. c = a + b prend les valeurs de a et b AU MOMENT où la ligne s'exécute, pas après." },
        ],
        quiz: {
          question: "int a = 1; int b = a + 1; a = 100; → Que vaut b ?",
          options: ["101", "2", "100", "Erreur"],
          correct: 1,
          explanation: "b = a + 1 s'exécute quand a vaut 1, donc b = 2. Changer a APRÈS ne change pas b. Le calcul est déjà fait.",
        },
      },
    },
  ],
};
