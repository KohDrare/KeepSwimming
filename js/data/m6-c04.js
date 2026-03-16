// Module 6 — C04 : Nombres & Bases
// Exercices couverts : ft_strlen, ft_putstr, ft_putnbr, ft_atoi, ft_putnbr_base, ft_atoi_base
window.MODULE_M6 = {
  id: "m6", title: "C04 : Nombres & Bases", icon: "\u{1F522}",
  description: "ft_atoi, ft_putnbr, bases numériques — convertir entre strings et nombres",
  color: "#8B5CF6",
  tag: "C04",
  lessons: [
    {
      id: "m6-l1", title: "ft_putnbr : afficher un nombre", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "ft_putnbr de C04 est la même que dans C00, mais tu la maîtrises mieux maintenant. L'idée : décomposer le nombre chiffre par chiffre avec / et %, afficher chaque chiffre avec ft_putchar." },
          { type: "code", value: "void ft_putchar(char c)\n{\n    write(1, &c, 1);\n}\n\nvoid ft_putnbr(int nb)\n{\n    if (nb == -2147483648)\n    {\n        write(1, \"-2147483648\", 11);\n        return ;\n    }\n    if (nb < 0)\n    {\n        ft_putchar('-');\n        nb = -nb;\n    }\n    if (nb >= 10)\n        ft_putnbr(nb / 10);\n    ft_putchar(nb % 10 + '0');\n}\n\n// Rappel : la récursion empile les appels\n// ft_putnbr(42) → ft_putnbr(4) → affiche '4'\n//               → puis affiche '2'\n// Résultat : \"42\" (dans le bon ordre !)" },
          { type: "key", value: "% 10 = dernier chiffre. / 10 = sans le dernier. La récursion assure l'affichage de gauche à droite. Cas spécial : INT_MIN (-2147483648)." },
        ],
        quiz: {
          question: "ft_putnbr(-42) → dans quel ordre les appels récursifs se font ?",
          options: ["affiche '-', puis '4', puis '2'", "affiche '4', '2', puis '-'", "affiche '-', '2', puis '4'", "affiche '-42' d'un coup"],
          correct: 0,
          explanation: "D'abord le '-' (car nb < 0), puis nb = 42. ft_putnbr(42) → ft_putnbr(4) → affiche '4', puis affiche '2'. Résultat : \"-42\".",
        },
      },
    },
    {
      id: "m6-l2", title: "ft_atoi : string vers nombre (version C04)", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "ft_atoi de C04 est plus complexe que la version classique. La GROSSE différence : elle gère PLUSIEURS signes + et -. Un nombre impair de - = négatif." },
          { type: "code", value: "int ft_atoi(char *str)\n{\n    int i;\n    int sign;\n    int result;\n\n    i = 0;\n    sign = 1;\n    result = 0;\n    // 1. Skip les espaces ET les whitespace\n    while (str[i] == ' ' || (str[i] >= 9 && str[i] <= 13))\n        i++;\n    // 2. Gérer PLUSIEURS signes + et -\n    while (str[i] == '+' || str[i] == '-')\n    {\n        if (str[i] == '-')\n            sign = sign * -1;  // Inverse le signe\n        i++;\n    }\n    // 3. Construire le nombre\n    while (str[i] >= '0' && str[i] <= '9')\n    {\n        result = result * 10 + (str[i] - '0');\n        i++;\n    }\n    return (result * sign);\n}\n\n// \"  ---+--+1234ab\" :\n// Skip espaces → index 2\n// Signes : -, -, -, +, -, -, + → 4 fois - = pair = positif\n// Chiffres : 1234\n// Résultat : +1234" },
          { type: "text", value: "ATTENTION : la version C04 de ft_atoi gère PLUSIEURS signes contrairement à la version standard. C'est spécifique au sujet de Piscine." },
          { type: "key", value: "Nombre impair de '-' = négatif. Nombre pair de '-' = positif. Les '+' ne changent rien. C'est LE piège du sujet C04." },
        ],
        quiz: {
          question: "ft_atoi(\"  ---+--+1234ab567\") → ?",
          options: ["-1234", "1234", "-1234567", "0"],
          correct: 0,
          explanation: "Skip espaces. Signes : ---(3 fois -)+(1 fois +)--(2 fois -)+(1 fois +) → 5 fois - = impair = négatif. Chiffres : 1234. Stop à 'a'. Résultat : -1234.",
        },
      },
    },
    {
      id: "m6-l3", title: "Les bases : comprendre le concept", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "On compte en base 10 parce qu'on a 10 doigts. Mais un ordi compte en base 2 (0 et 1). L'hexadécimal est en base 16 (0-9 + a-f). Le principe est TOUJOURS le même." },
          { type: "code", value: "// Base 10 (décimal) : 0 1 2 3 4 5 6 7 8 9\n// 42 en base 10 = 4×10 + 2×1 = 42\n\n// Base 2 (binaire) : 0 1\n// 42 en binaire = 101010\n// = 1×32 + 0×16 + 1×8 + 0×4 + 1×2 + 0×1 = 42\n\n// Base 16 (hexadécimal) : 0 1 2 3 4 5 6 7 8 9 a b c d e f\n// 42 en hexa = 2a\n// = 2×16 + 10×1 = 42 (a = 10)\n\n// Base \"poneyvif\" (8 symboles, base 8) :\n// p=0, o=1, n=2, e=3, y=4, v=5, i=6, f=7\n// 42 en \"poneyvif\" = vn\n// = 5×8 + 2×1 = 42\n\n// Le concept : N symboles = base N\n// Chaque position vaut base^position (de droite à gauche)" },
          { type: "key", value: "Une base c'est un alphabet de symboles. Base N = N symboles. La position d'un symbole détermine sa valeur : symbole × base^position." },
        ],
        quiz: {
          question: "ft_putnbr_base(42, \"01\") affiche quoi ?",
          options: ["42", "101010", "2a", "110"],
          correct: 1,
          explanation: "Base \"01\" = binaire. 42 = 32+8+2 = 101010 en binaire.",
        },
      },
    },
    {
      id: "m6-l4", title: "ft_putnbr_base : afficher en base quelconque", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "ft_putnbr_base affiche un nombre dans n'importe quelle base. Même logique que ft_putnbr mais avec les symboles de la base au lieu de '0'-'9'." },
          { type: "code", value: "// D'abord : vérifier que la base est valide\n// - Au moins 2 caractères\n// - Pas de doublon\n// - Pas de '+' ou '-'\n\nvoid ft_putnbr_base(int nbr, char *base)\n{\n    int base_len;\n    long n;          // long pour gérer INT_MIN\n\n    base_len = 0;\n    while (base[base_len])\n        base_len++;\n    // (+ vérifications de base ici)\n    if (base_len < 2)\n        return ;\n    n = nbr;\n    if (n < 0)\n    {\n        write(1, \"-\", 1);\n        n = -n;\n    }\n    if (n >= base_len)\n        ft_putnbr_base(n / base_len, base);\n    // Au lieu de nb % 10 + '0', on utilise base[n % base_len]\n    write(1, &base[n % base_len], 1);\n}\n\n// ft_putnbr_base(42, \"0123456789abcdef\") → \"2a\" (hexa)\n// ft_putnbr_base(42, \"01\") → \"101010\" (binaire)\n// ft_putnbr_base(42, \"poneyvif\") → \"vn\"" },
          { type: "key", value: "C'est ft_putnbr avec base[n % base_len] au lieu de n % 10 + '0'. La base est juste une string de symboles." },
        ],
        quiz: {
          question: "Pourquoi la base \"aab\" est-elle invalide ?",
          options: ["Elle a moins de 2 caractères", "Elle contient un doublon ('a' deux fois)", "Elle contient des lettres", "Elle n'est pas triée"],
          correct: 1,
          explanation: "Un doublon ('a' apparaît 2 fois) rend la base ambiguë : le nombre \"a\" pourrait valoir 0 ou 1. Chaque symbole doit être unique.",
        },
      },
    },
    {
      id: "m6-l5", title: "ft_atoi_base : parser en base quelconque", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "ft_atoi_base est la fonction inverse de ft_putnbr_base. Elle convertit une string écrite dans une base donnée en nombre entier." },
          { type: "code", value: "// L'idée : pour chaque caractère, trouver sa position\n// dans la base, puis construire le nombre.\n\n// Exemple avec base \"0123456789abcdef\" (hexa) :\n// \"2a\" → '2' est à l'index 2, 'a' est à l'index 10\n// result = 0\n// result = 0 × 16 + 2 = 2\n// result = 2 × 16 + 10 = 42\n\n// Pseudo-code :\n// 1. Skip les whitespace\n// 2. Gérer les signes (multiples, comme ft_atoi C04)\n// 3. Pour chaque char :\n//    - Trouver sa position dans la base\n//    - Si pas dans la base → stop\n//    - result = result * base_len + position\n\n// La difficulté : trouver l'index d'un char dans la base\n// → une boucle while qui parcourt la base\nint get_index(char c, char *base)\n{\n    int i;\n\n    i = 0;\n    while (base[i])\n    {\n        if (base[i] == c)\n            return (i);\n        i++;\n    }\n    return (-1);  // Pas trouvé\n}" },
          { type: "key", value: "result = result * base_len + index. C'est le même principe que ft_atoi (result * 10 + chiffre) mais généralisé à n'importe quelle base." },
        ],
        quiz: {
          question: "ft_atoi_base(\"2a\", \"0123456789abcdef\") → ?",
          options: ["2", "42", "26", "Erreur"],
          correct: 1,
          explanation: "'2' est à l'index 2, 'a' est à l'index 10. result = 0×16+2 = 2, puis result = 2×16+10 = 42.",
        },
      },
    },
  ],
};
