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
    {
      id: "m0-l4", title: "Tester son code : le main() de test", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "À 42 et pendant la Piscine, tu n'as pas de framework de test. Tu testes TOI-MÊME ton code en écrivant un main() de test dans LE MÊME fichier que ta fonction. C'est la méthode standard, et c'est comme ça que tout le monde travaille." },
          { type: "text", value: "Le workflow est toujours le même, en 5 étapes :" },
          { type: "code", value: "// ÉTAPE 1 : Tu écris ta fonction dans le fichier .c\n// Exemple : ft_is_negative.c\n\n#include <unistd.h>\n\nvoid ft_is_negative(int n)\n{\n    if (n < 0)\n        write(1, \"N\", 1);\n    else\n        write(1, \"P\", 1);\n}\n\n// ÉTAPE 2 : Tu ajoutes un main() EN DESSOUS pour tester\n\n// --- Main de test (à retirer avant de rendre) ---\nint main(void)\n{\n    ft_is_negative(42);\n    ft_is_negative(-19);\n    ft_is_negative(0);\n    write(1, \"\\n\", 1);\n    return (0);\n}\n\n// ÉTAPE 3 : Tu compiles\n// gcc -Wall -Wextra -Werror ft_is_negative.c -o test\n\n// ÉTAPE 4 : Tu exécutes\n// ./test\n// Output attendu : PNP\n\n// ÉTAPE 5 : Quand ça marche, tu RETIRES le main\n// avant de push sur Vogsphere !" },
          { type: "key", value: "Le cycle : écrire la fonction → ajouter un main de test → compiler → tester → RETIRER le main avant de rendre. C'est LE workflow de base de la Piscine." },
          { type: "text", value: "IMPORTANT — En EXAM c'est différent ! Le sujet te demande d'écrire un PROGRAMME complet (avec un main). Dans ce cas, le main FAIT PARTIE de l'exercice, tu le gardes." },
          { type: "text", value: "Quelques bonnes pratiques pour tes mains de test :" },
          { type: "code", value: "// 1. Teste les cas NORMAUX\nft_is_negative(42);     // Positif → P\nft_is_negative(-5);     // Négatif → N\n\n// 2. Teste les cas LIMITES (edge cases)\nft_is_negative(0);      // Zéro → P (piège !)\nft_is_negative(-2147483648); // INT_MIN\nft_is_negative(2147483647);  // INT_MAX\n\n// 3. Compare avec le comportement attendu du sujet\n// 4. Teste UN truc à la fois pour isoler les bugs" },
          { type: "key", value: "Teste toujours : cas normal, cas limite (0, -1, INT_MIN, INT_MAX, string vide), et les pièges du sujet. Un bon main de test attrape les bugs AVANT la moulinette." },
        ],
        quiz: {
          question: "Tu as fini ft_putstr et ton main de test marche. Que fais-tu avant de push sur Vogsphere ?",
          options: ["Tu push directement avec le main", "Tu retires ou commentes le main de test", "Tu mets le main dans un autre fichier", "Tu laisses le main mais tu commentes la fonction"],
          correct: 1,
          explanation: "On retire le main de test avant de rendre. Vogsphere compile tes fichiers avec son propre main de test (la moulinette). Si tu laisses le tien, il y aura deux main() → erreur de compilation !",
        },
      },
    },
  ],
};
