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
      id: "m7-l1", title: "La récursion : une fonction qui s'appelle elle-même", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "La récursion c'est quand une fonction s'appelle elle-même. C'est une alternative aux boucles. Deux éléments essentiels : le CAS DE BASE (quand s'arrêter) et le CAS RÉCURSIF (comment avancer)." },
          { type: "analogy", value: "Imagine des poupées russes. Tu ouvres la grande, il y a une plus petite dedans. Tu ouvres celle-là, encore une plus petite. Tu continues jusqu'à la dernière (le cas de base). Puis tu les refermes dans l'autre sens." },
          { type: "code", value: "// Compter de n à 0 — version récursive :\nvoid ft_countdown(int n)\n{\n    if (n < 0)              // CAS DE BASE : on s'arrête\n        return ;\n    ft_putnbr(n);           // Affiche n\n    write(1, \"\\n\", 1);\n    ft_countdown(n - 1);    // CAS RÉCURSIF : on avance\n}\n\n// ft_countdown(3) :\n// → affiche 3, appelle ft_countdown(2)\n//   → affiche 2, appelle ft_countdown(1)\n//     → affiche 1, appelle ft_countdown(0)\n//       → affiche 0, appelle ft_countdown(-1)\n//         → -1 < 0, return (cas de base !)" },
          { type: "key", value: "Toute récursion a 2 parties : le CAS DE BASE (quand s'arrêter) et le CAS RÉCURSIF (le même problème en plus petit). Sans cas de base → boucle infinie." },
        ],
        quiz: {
          question: "Que se passe-t-il si tu oublies le cas de base dans une fonction récursive ?",
          options: ["Rien, ça marche quand même", "La fonction s'appelle infiniment → stack overflow (crash)", "Le programme affiche une erreur", "Le compilateur refuse de compiler"],
          correct: 1,
          explanation: "Sans cas de base, la fonction s'appelle infiniment. Chaque appel utilise de la mémoire (la stack). Quand la stack est pleine → segmentation fault (crash).",
        },
      },
    },
    {
      id: "m7-l2", title: "Factorielle : itérative vs récursive", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "n! (factorielle) = n × (n-1) × (n-2) × ... × 1. Par exemple 5! = 5×4×3×2×1 = 120. C05 demande les deux versions : itérative et récursive." },
          { type: "code", value: "// Version itérative (avec while)\nint ft_iterative_factorial(int nb)\n{\n    int result;\n\n    if (nb < 0)\n        return (0);\n    result = 1;\n    while (nb > 0)\n    {\n        result = result * nb;\n        nb--;\n    }\n    return (result);\n}\n\n// Version récursive\nint ft_recursive_factorial(int nb)\n{\n    if (nb < 0)\n        return (0);\n    if (nb <= 1)          // Cas de base : 0! = 1, 1! = 1\n        return (1);\n    return (nb * ft_recursive_factorial(nb - 1));\n}\n\n// ft_recursive_factorial(4) :\n// = 4 * fact(3)\n// = 4 * 3 * fact(2)\n// = 4 * 3 * 2 * fact(1)\n// = 4 * 3 * 2 * 1 = 24" },
          { type: "key", value: "n! = n × (n-1)!. Cas de base : 0! = 1! = 1. Attention : factorielle de négatif → retourner 0." },
        ],
        quiz: {
          question: "ft_recursive_factorial(0) retourne quoi ?",
          options: ["0", "1", "-1", "Erreur"],
          correct: 1,
          explanation: "0! = 1. C'est une convention mathématique (et c'est le cas de base). Si nb <= 1, on retourne 1.",
        },
      },
    },
    {
      id: "m7-l3", title: "Puissance : itérative vs récursive", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "nb^power = nb multiplié par lui-même power fois. Comme factorielle, C05 demande les versions itérative et récursive." },
          { type: "code", value: "// Version itérative\nint ft_iterative_power(int nb, int power)\n{\n    int result;\n\n    if (power < 0)\n        return (0);\n    if (power == 0)\n        return (1);       // Tout nombre puissance 0 = 1\n    result = 1;\n    while (power > 0)\n    {\n        result = result * nb;\n        power--;\n    }\n    return (result);\n}\n\n// Version récursive\nint ft_recursive_power(int nb, int power)\n{\n    if (power < 0)\n        return (0);\n    if (power == 0)\n        return (1);       // nb^0 = 1\n    return (nb * ft_recursive_power(nb, power - 1));\n}\n\n// ft_recursive_power(2, 4) :\n// = 2 * power(2, 3)\n// = 2 * 2 * power(2, 2)\n// = 2 * 2 * 2 * power(2, 1)\n// = 2 * 2 * 2 * 2 * power(2, 0)\n// = 2 * 2 * 2 * 2 * 1 = 16" },
          { type: "key", value: "nb^power = nb × nb^(power-1). Cas de base : nb^0 = 1. Power négatif → retourner 0 (on gère pas les fractions en int)." },
        ],
        quiz: {
          question: "ft_recursive_power(5, 0) retourne quoi ?",
          options: ["0", "5", "1", "Erreur"],
          correct: 2,
          explanation: "N'importe quel nombre puissance 0 = 1. C'est le cas de base de la récursion.",
        },
      },
    },
    {
      id: "m7-l4", title: "Fibonacci : la suite classique", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "La suite de Fibonacci : chaque nombre est la somme des deux précédents. 0, 1, 1, 2, 3, 5, 8, 13, 21, 34... C'est LE classique de la récursion." },
          { type: "code", value: "int ft_fibonacci(int index)\n{\n    if (index < 0)\n        return (-1);\n    if (index == 0)\n        return (0);\n    if (index == 1)\n        return (1);\n    return (ft_fibonacci(index - 1) + ft_fibonacci(index - 2));\n}\n\n// ft_fibonacci(6) = ft_fibonacci(5) + ft_fibonacci(4)\n// = 5 + 3 = 8\n//\n// Index : 0  1  2  3  4  5  6  7  8  9\n// Valeur: 0  1  1  2  3  5  8  13 21 34\n\n// ATTENTION : cette version récursive est TRÈS lente\n// pour les grands nombres (calculs redondants).\n// fib(40) prend des secondes, fib(50) des minutes !\n// Pour la Piscine c'est OK, mais en vrai on utilise\n// une version itérative." },
          { type: "key", value: "fib(n) = fib(n-1) + fib(n-2). Deux cas de base : fib(0) = 0, fib(1) = 1. Index négatif → -1." },
        ],
        quiz: {
          question: "ft_fibonacci(7) → ?",
          options: ["8", "13", "21", "7"],
          correct: 1,
          explanation: "Suite : 0, 1, 1, 2, 3, 5, 8, 13. L'index 7 (en partant de 0) correspond à 13.",
        },
      },
    },
    {
      id: "m7-l5", title: "ft_sqrt : trouver la racine carrée", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "ft_sqrt retourne la racine carrée entière d'un nombre, ou 0 si ce n'est pas un carré parfait. L'approche : tester i×i jusqu'à trouver ou dépasser nb." },
          { type: "code", value: "int ft_sqrt(int nb)\n{\n    int i;\n\n    if (nb < 0)\n        return (0);\n    if (nb == 0)\n        return (0);\n    i = 1;\n    while (i * i < nb)    // Tant que i² < nb\n        i++;\n    if (i * i == nb)      // Carré parfait ?\n        return (i);\n    return (0);           // Pas un carré parfait\n}\n\n// ft_sqrt(25) : i=1(1), 2(4), 3(9), 4(16), 5(25) → 5\n// ft_sqrt(10) : i=1, 2, 3(9), 4(16) → 16>10 → 0\n// ft_sqrt(0)  → 0\n// ft_sqrt(1)  → 1 (1×1 = 1)\n\n// Optimisation possible : s'arrêter quand i*i > nb\n// car après ça ne peut que grandir." },
          { type: "key", value: "Boucle while (i*i < nb) puis vérifier i*i == nb. Pas de carré parfait → 0. Simple et suffisant pour la Piscine." },
        ],
        quiz: {
          question: "ft_sqrt(144) → ?",
          options: ["12", "14", "0", "72"],
          correct: 0,
          explanation: "12 × 12 = 144. C'est un carré parfait, la racine est 12.",
        },
      },
    },
    {
      id: "m7-l6", title: "ft_is_prime et ft_find_next_prime", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "Un nombre premier est divisible uniquement par 1 et lui-même. ft_is_prime teste ça, ft_find_next_prime trouve le prochain nombre premier >= nb." },
          { type: "code", value: "int ft_is_prime(int nb)\n{\n    int i;\n\n    if (nb <= 1)\n        return (0);       // 0 et 1 ne sont pas premiers\n    i = 2;\n    while (i * i <= nb)   // On teste jusqu'à sqrt(nb)\n    {\n        if (nb % i == 0)\n            return (0);   // Divisible → pas premier\n        i++;\n    }\n    return (1);           // Premier !\n}\n\n// Pourquoi tester jusqu'à sqrt(nb) suffit ?\n// Si nb = a × b, alors a ou b <= sqrt(nb).\n// Si on a pas trouvé de diviseur <= sqrt → premier.\n\nint ft_find_next_prime(int nb)\n{\n    if (nb <= 2)\n        return (2);       // 2 est le plus petit premier\n    while (!ft_is_prime(nb))\n        nb++;\n    return (nb);\n}\n\n// ft_find_next_prime(14) → 14 pas premier, 15 non,\n// 16 non, 17 OUI → retourne 17" },
          { type: "key", value: "Tester les diviseurs jusqu'à sqrt(nb) suffit (i*i <= nb). 0 et 1 ne sont PAS premiers. 2 est le plus petit (et le seul pair)." },
        ],
        quiz: {
          question: "ft_is_prime(1) retourne quoi ?",
          options: ["1 (vrai)", "0 (faux)", "-1 (erreur)", "Dépend"],
          correct: 1,
          explanation: "1 n'est PAS un nombre premier par convention mathématique. Un nombre premier doit avoir exactement 2 diviseurs distincts (1 et lui-même). 1 n'en a qu'un seul.",
        },
      },
    },
  ],
};
