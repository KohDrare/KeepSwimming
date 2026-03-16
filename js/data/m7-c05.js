// Module 7 — C05 : Récursion & Maths
// Exercices couverts : ft_iterative_factorial, ft_recursive_factorial,
// ft_iterative_power, ft_recursive_power, ft_fibonacci, ft_sqrt, ft_is_prime, ft_find_next_prime
window.MODULE_M7 = {
  id: "m7", title: "C05 : Récursion & Maths", icon: "🔄",
  description: "Factorielle, puissance, fibonacci, nombres premiers — récursion et itération",
  color: "#EF4444",
  tag: "C05",
  lessons: [
    {
      id: "m7-l1", title: "La récursion : comprendre le concept", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "La récursion, c'est quand une fonction s'appelle elle-même. C'est une alternative aux boucles. Deux éléments ESSENTIELS : le CAS DE BASE (quand s'arrêter) et le CAS RÉCURSIF (comment avancer vers le cas de base)." },
          { type: "analogy", value: "Imagine des poupées russes. Tu ouvres la grande, il y a une plus petite dedans. Tu ouvres celle-là, encore une plus petite. Tu continues jusqu'à la dernière (le cas de base). Puis tu les refermes dans l'autre sens — c'est le 'dépilage' de la récursion." },
          { type: "visual", value: "stack", frames: [
            { name: "ft_countdown(3)", vars: [{ name: "n", val: "3" }] },
            { name: "ft_countdown(2)", vars: [{ name: "n", val: "2" }] },
            { name: "ft_countdown(1)", vars: [{ name: "n", val: "1" }] },
            { name: "ft_countdown(0)", vars: [{ name: "n", val: "0" }] },
          ]},
          { type: "code", value: "// Compter de n à 0 — version récursive :\nvoid ft_countdown(int n)\n{\n    if (n < 0)              // CAS DE BASE : on s'arrête\n        return ;\n    ft_putnbr(n);\n    write(1, \"\\n\", 1);\n    ft_countdown(n - 1);    // CAS RÉCURSIF : problème plus petit\n}" },
          { type: "key", value: "Toute récursion a 2 parties : le CAS DE BASE (quand s'arrêter) et le CAS RÉCURSIF (le même problème en plus petit). Sans cas de base → boucle infinie → stack overflow." },
          { type: "resources", items: [
            { icon: "💡", value: "Chaque appel récursif empile un 'cadre' sur la stack. Trop d'appels = stack overflow (segfault)" },
            { icon: "💡", value: "Tout ce qui est récursif peut être fait en itératif (avec des boucles) et vice-versa" },
          ]},
        ],
        quiz: {
          question: "Que se passe-t-il si tu oublies le cas de base dans une fonction récursive ?",
          options: ["Rien, ça marche quand même", "La fonction s'appelle infiniment → stack overflow (crash)", "Le programme affiche une erreur", "Le compilateur refuse de compiler"],
          correct: 1,
          explanation: "Sans cas de base, la fonction s'appelle infiniment. Chaque appel utilise de la mémoire (la stack). Quand la stack est pleine → segmentation fault.",
        },
      },
    },
    {
      id: "m7-l2", title: "Factorielle : itérative et récursive", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "n! (factorielle de n) = n × (n-1) × (n-2) × ... × 1. Par exemple 5! = 5×4×3×2×1 = 120. C05 demande les DEUX versions : itérative (boucle) et récursive." },
          { type: "visual", value: "stack", frames: [
            { name: "fact(4)", vars: [{ name: "return", val: "4 × fact(3)" }] },
            { name: "fact(3)", vars: [{ name: "return", val: "3 × fact(2)" }] },
            { name: "fact(2)", vars: [{ name: "return", val: "2 × fact(1)" }] },
            { name: "fact(1)", vars: [{ name: "return", val: "1 (base)" }] },
          ]},
          { type: "exercise", title: "ft_iterative_factorial", subject: "Écrire une fonction qui retourne la factorielle de nb en utilisant une boucle (pas de récursion). Retourne 0 si nb est négatif. 0! = 1.", prototype: "int ft_iterative_factorial(int nb);" },
          { type: "hint", hints: [
            "Initialise result à 1. Multiplie par nb, puis nb--, tant que nb > 0.",
            "Cas spéciaux : nb < 0 → return 0. nb == 0 → return 1 (par convention).",
            "La boucle : while (nb > 0) { result *= nb; nb--; }",
          ]},
          { type: "reveal", label: "Voir la solution itérative", code: "int ft_iterative_factorial(int nb)\n{\n    int result;\n\n    if (nb < 0)\n        return (0);\n    result = 1;\n    while (nb > 0)\n    {\n        result *= nb;\n        nb--;\n    }\n    return (result);\n}", explanation: "On multiplie result par nb, puis on décrémente nb. Quand nb = 0, la boucle s'arrête. result contient n!." },
          { type: "exercise", title: "ft_recursive_factorial", subject: "Même chose mais avec la récursion (la fonction s'appelle elle-même). Retourne 0 si nb est négatif. 0! = 1.", prototype: "int ft_recursive_factorial(int nb);" },
          { type: "hint", hints: [
            "Cas de base : nb <= 1 → retourne 1 (0! = 1! = 1).",
            "Cas récursif : retourne nb × factorial(nb - 1).",
            "N'oublie pas : nb < 0 → retourne 0 (avant le cas de base).",
          ]},
          { type: "reveal", label: "Voir la solution récursive", code: "int ft_recursive_factorial(int nb)\n{\n    if (nb < 0)\n        return (0);\n    if (nb <= 1)\n        return (1);\n    return (nb * ft_recursive_factorial(nb - 1));\n}", explanation: "n! = n × (n-1)!. On descend jusqu'à 1 (cas de base), puis on remonte en multipliant : 1 × 2 × 3 × ... × n." },
          { type: "key", value: "n! = n × (n-1)!. Cas de base : 0! = 1! = 1. Négatif → 0. La version récursive est plus élégante, l'itérative est plus économe en mémoire." },
          { type: "resources", items: [
            { icon: "💡", value: "0! = 1 est une convention mathématique (produit vide = 1)" },
            { icon: "⚠️", value: "13! dépasse INT_MAX (2147483647). Avec int, factorielle est fiable jusqu'à 12!" },
          ]},
        ],
        quiz: {
          type: "output",
          code: "printf(\"%d\", ft_recursive_factorial(0));\nprintf(\"%d\", ft_recursive_factorial(5));\nprintf(\"%d\", ft_recursive_factorial(-3));",
          question: "Que va afficher ce code (3 nombres) ?",
          options: ["0 120 -6", "1 120 0", "1 120 -1", "0 120 0"],
          correct: 1,
          explanation: "0! = 1. 5! = 120. Négatif → 0. Résultat : \"11200\".",
        },
      },
    },
    {
      id: "m7-l3", title: "Puissance : itérative et récursive", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "nb^power = nb multiplié par lui-même power fois. 2^4 = 2×2×2×2 = 16. Comme pour factorielle, C05 demande les deux versions." },
          { type: "exercise", title: "ft_iterative_power", subject: "Écrire une fonction qui retourne nb élevé à la puissance power (itérativement). Retourne 0 si power est négatif. nb^0 = 1.", prototype: "int ft_iterative_power(int nb, int power);" },
          { type: "hint", hints: [
            "Initialise result à 1. Multiplie par nb, power fois.",
            "power < 0 → return 0. power == 0 → return 1.",
            "while (power > 0) { result *= nb; power--; }",
          ]},
          { type: "reveal", label: "Voir la solution itérative", code: "int ft_iterative_power(int nb, int power)\n{\n    int result;\n\n    if (power < 0)\n        return (0);\n    if (power == 0)\n        return (1);\n    result = 1;\n    while (power > 0)\n    {\n        result *= nb;\n        power--;\n    }\n    return (result);\n}", explanation: "On multiplie result par nb, power fois. result accumule le résultat." },
          { type: "exercise", title: "ft_recursive_power", subject: "Même chose mais en récursif. Power négatif → 0. nb^0 = 1.", prototype: "int ft_recursive_power(int nb, int power);" },
          { type: "hint", hints: [
            "Cas de base : power == 0 → return 1. Power < 0 → return 0.",
            "Cas récursif : return nb × ft_recursive_power(nb, power - 1).",
          ]},
          { type: "reveal", label: "Voir la solution récursive", code: "int ft_recursive_power(int nb, int power)\n{\n    if (power < 0)\n        return (0);\n    if (power == 0)\n        return (1);\n    return (nb * ft_recursive_power(nb, power - 1));\n}", explanation: "nb^p = nb × nb^(p-1). On descend jusqu'à power = 0 (retourne 1), puis on remonte en multipliant." },
          { type: "key", value: "nb^power = nb × nb^(power-1). Cas de base : nb^0 = 1. Power négatif → 0 (on ne gère pas les fractions en int)." },
        ],
        quiz: {
          type: "truefalse",
          statement: "ft_recursive_power(0, 0) retourne 0.",
          correct: false,
          explanation: "0^0 = 1 par convention mathématique (et c'est le cas de base : power == 0 → return 1). Ce n'est pas spécifique à nb = 0.",
        },
      },
    },
    {
      id: "m7-l4", title: "ft_fibonacci : la suite classique", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "La suite de Fibonacci : chaque nombre est la somme des deux précédents. 0, 1, 1, 2, 3, 5, 8, 13, 21, 34... C'est LE classique de la récursion (mais la version récursive naive est très lente)." },
          { type: "visual", value: "stack", frames: [
            { name: "fib(5)", vars: [{ name: "return", val: "fib(4) + fib(3)" }] },
            { name: "fib(4)", vars: [{ name: "return", val: "fib(3) + fib(2)" }] },
            { name: "fib(3)", vars: [{ name: "return", val: "fib(2) + fib(1)" }] },
            { name: "fib(2)", vars: [{ name: "return", val: "fib(1) + fib(0)" }] },
          ]},
          { type: "code", value: "// La suite :\n// Index : 0  1  2  3  4  5  6   7   8   9\n// Valeur: 0  1  1  2  3  5  8  13  21  34\n//\n// fib(n) = fib(n-1) + fib(n-2)\n// fib(0) = 0, fib(1) = 1" },
          { type: "exercise", title: "ft_fibonacci", subject: "Écrire une fonction qui retourne l'élément à l'index donné dans la suite de Fibonacci. Le premier élément (index 0) est 0, le second (index 1) est 1. Index négatif → -1.", prototype: "int ft_fibonacci(int index);" },
          { type: "hint", hints: [
            "Index < 0 → return -1. Index == 0 → return 0. Index == 1 → return 1.",
            "Cas récursif : return fib(index - 1) + fib(index - 2). C'est la définition même de Fibonacci.",
            "Attention : cette version récursive fait des tonnes de calculs redondants. C'est OK pour la Piscine, pas pour la prod.",
          ]},
          { type: "reveal", label: "Voir la solution ft_fibonacci", code: "int ft_fibonacci(int index)\n{\n    if (index < 0)\n        return (-1);\n    if (index == 0)\n        return (0);\n    if (index == 1)\n        return (1);\n    return (ft_fibonacci(index - 1) + ft_fibonacci(index - 2));\n}", explanation: "fib(n) = fib(n-1) + fib(n-2). Deux cas de base : fib(0)=0, fib(1)=1. Simple et élégant, mais exponentiellement lent." },
          { type: "key", value: "fib(n) = fib(n-1) + fib(n-2). Deux cas de base. La récursion naive est O(2^n) — très lente pour n > 40, mais suffisante pour la Piscine." },
          { type: "resources", items: [
            { icon: "💡", value: "La version itérative (avec 2 variables prev/curr) est O(n) — beaucoup plus rapide" },
            { icon: "⚠️", value: "fib(46) = 1836311903, proche de INT_MAX. fib(47) dépasse !" },
          ]},
        ],
        quiz: {
          type: "output",
          code: "printf(\"%d\", ft_fibonacci(7));",
          question: "Que va afficher ce code ?",
          options: ["8", "13", "21", "7"],
          correct: 1,
          explanation: "Suite : 0, 1, 1, 2, 3, 5, 8, 13. L'index 7 (en partant de 0) correspond à 13.",
        },
      },
    },
    {
      id: "m7-l5", title: "ft_sqrt : racine carrée entière", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "ft_sqrt retourne la racine carrée entière d'un nombre, ou 0 si ce n'est pas un carré parfait. L'approche la plus simple : tester i × i de 1 jusqu'à trouver ou dépasser nb." },
          { type: "exercise", title: "ft_sqrt", subject: "Écrire une fonction qui retourne la racine carrée entière de nb. Si nb n'est pas un carré parfait, retourne 0. Si nb <= 0, retourne 0.", prototype: "int ft_sqrt(int nb);" },
          { type: "hint", hints: [
            "Si nb <= 0, retourne 0. Si nb == 1, retourne 1.",
            "Boucle : i commence à 1. Tant que i × i < nb, incrémente i.",
            "Après la boucle : si i × i == nb → c'est un carré parfait, retourne i. Sinon, retourne 0.",
          ]},
          { type: "reveal", label: "Voir la solution ft_sqrt", code: "int ft_sqrt(int nb)\n{\n    int i;\n\n    if (nb <= 0)\n        return (0);\n    i = 1;\n    while (i * i < nb)\n        i++;\n    if (i * i == nb)\n        return (i);\n    return (0);\n}", explanation: "On incrémente i tant que i² < nb. Quand i² >= nb : si i² == nb c'est un carré parfait, sinon non." },
          { type: "key", value: "Boucle while (i*i < nb) puis vérifier i*i == nb. Simple et suffisant. L'optimisation serait inutile ici." },
        ],
        quiz: {
          type: "output",
          code: "printf(\"%d %d %d\", ft_sqrt(25), ft_sqrt(10), ft_sqrt(1));",
          question: "Que va afficher ce code ?",
          options: ["5 0 1", "5 3 1", "5 0 0", "25 10 1"],
          correct: 0,
          explanation: "sqrt(25) = 5 (5×5=25). sqrt(10) = 0 (pas un carré parfait, 3²=9 < 10 < 16=4²). sqrt(1) = 1 (1×1=1).",
        },
      },
    },
    {
      id: "m7-l6", title: "ft_is_prime et ft_find_next_prime", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "Un nombre premier n'est divisible que par 1 et lui-même. L'astuce pour tester : il suffit de vérifier les diviseurs jusqu'à √nb. Si aucun ne divise nb → premier." },
          { type: "text", value: "Pourquoi √nb suffit ? Si nb = a × b, alors soit a soit b est ≤ √nb. Si on n'a trouvé aucun diviseur ≤ √nb, il n'y en a pas du tout." },
          { type: "exercise", title: "ft_is_prime", subject: "Écrire une fonction qui retourne 1 si nb est premier, 0 sinon. 0 et 1 ne sont PAS premiers.", prototype: "int ft_is_prime(int nb);" },
          { type: "hint", hints: [
            "nb <= 1 → return 0 (ni 0 ni 1 ne sont premiers).",
            "Teste les diviseurs de 2 à √nb : while (i * i <= nb).",
            "Si nb % i == 0 → divisible → pas premier → return 0.",
            "Si la boucle finit sans trouver de diviseur → return 1.",
          ]},
          { type: "reveal", label: "Voir la solution ft_is_prime", code: "int ft_is_prime(int nb)\n{\n    int i;\n\n    if (nb <= 1)\n        return (0);\n    i = 2;\n    while (i * i <= nb)\n    {\n        if (nb % i == 0)\n            return (0);\n        i++;\n    }\n    return (1);\n}", explanation: "On teste les diviseurs de 2 à √nb. Si aucun ne divise nb, c'est un nombre premier. La condition i*i <= nb est l'astuce √nb." },
          { type: "exercise", title: "ft_find_next_prime", subject: "Écrire une fonction qui retourne le plus petit nombre premier supérieur ou égal à nb.", prototype: "int ft_find_next_prime(int nb);" },
          { type: "hint", hints: [
            "Si nb <= 2, retourne 2 (le plus petit premier).",
            "Sinon, teste nb avec ft_is_prime. S'il n'est pas premier, incrémente et recommence.",
            "while (!ft_is_prime(nb)) nb++; return nb;",
          ]},
          { type: "reveal", label: "Voir la solution ft_find_next_prime", code: "int ft_find_next_prime(int nb)\n{\n    if (nb <= 2)\n        return (2);\n    while (!ft_is_prime(nb))\n        nb++;\n    return (nb);\n}", explanation: "On incrémente nb jusqu'à tomber sur un premier. find_next_prime(14) → 14(non), 15(non), 16(non), 17(OUI) → 17." },
          { type: "key", value: "is_prime teste les diviseurs jusqu'à √nb (i*i <= nb). find_next_prime boucle sur is_prime. 0 et 1 ne sont PAS premiers. 2 est le plus petit (et le seul pair)." },
          { type: "resources", items: [
            { icon: "💡", value: "Optimisation possible : ne tester que les nombres impairs (sauf 2), car les pairs ne sont jamais premiers" },
            { icon: "💡", value: "Quelques premiers : 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47" },
            { icon: "⚠️", value: "1 n'est PAS premier (convention). Un premier a EXACTEMENT 2 diviseurs : 1 et lui-même" },
          ]},
        ],
        quiz: {
          type: "output",
          code: "printf(\"%d\", ft_find_next_prime(20));",
          question: "Que va afficher ce code ?",
          options: ["20", "21", "23", "19"],
          correct: 2,
          explanation: "20 pas premier (2×10), 21 non (3×7), 22 non (2×11), 23 OUI (divisible que par 1 et 23) → retourne 23.",
        },
      },
    },
  ],
};
