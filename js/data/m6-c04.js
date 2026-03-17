// Module 6 — C04 : Nombres & Bases
// Exercices couverts : ft_strlen, ft_putstr, ft_putnbr, ft_atoi, ft_putnbr_base, ft_atoi_base
window.MODULE_M6 = {
  id: "m6", title: "C04 : Nombres & Bases", icon: "🔢",
  description: "ft_atoi, ft_putnbr, bases numériques — convertir entre strings et nombres",
  color: "#8B5CF6",
  tag: "C04",
  lessons: [
    {
      id: "m6-l1", title: "ft_strlen et ft_putstr (rappel)", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "C04 commence par ft_strlen et ft_putstr, déjà vus en C01. C'est un rappel — le sujet attend les mêmes fonctions. Si tu as fait C01, c'est du cadeau." },
          { type: "exercise", title: "ft_strlen", subject: "Écrire une fonction qui retourne la longueur d'une string (sans compter le \\0 final).", prototype: "int ft_strlen(char *str);" },
          { type: "hint", hints: [
            "Parcours la string avec un compteur i. La boucle s'arrête quand str[i] == '\\0'.",
            "while(str[i]) i++; — à la fin, i = la longueur.",
          ]},
          { type: "reveal", label: "Voir la solution ft_strlen", code: "#include <stdio.h>\n\nint ft_strlen(char *str)\n{\n    int i;                     // Compteur de caracteres\n\n    i = 0;                     // Commence au debut de la string\n    while (str[i])             // Avance tant que le caractere n'est pas '\\0'\n        i++;                   // Incremente le compteur\n    return (i);                // Retourne la longueur (sans le '\\0')\n}\n\n// --- Test (a retirer avant de rendre) ---\nint main(void)\n{\n    printf(\"%d\\n\", ft_strlen(\"Hello\"));  // Attendu : 5\n    printf(\"%d\\n\", ft_strlen(\"\"));       // Attendu : 0\n    return (0);\n}", compileCmd: "gcc -Wall -Wextra -Werror ft_strlen.c -o test && ./test", expectedOutput: "5\\n0", explanation: "On parcourt jusqu'au \\0 et on retourne le compteur. C'est la base de presque tout en C." },
          { type: "exercise", title: "ft_putstr", subject: "Écrire une fonction qui affiche une string sur la sortie standard.", prototype: "void ft_putstr(char *str);" },
          { type: "hint", hints: [
            "Même pattern que strlen : parcourir avec while(str[i]).",
            "À chaque itération, write(1, &str[i], 1) pour afficher un char.",
          ]},
          { type: "reveal", label: "Voir la solution ft_putstr", code: "#include <unistd.h>\n#include <stdio.h>\n\nvoid ft_putstr(char *str)\n{\n    int i;                     // Index pour parcourir la string\n\n    i = 0;                     // Commence au debut\n    while (str[i])             // Parcourt jusqu'au '\\0'\n    {\n        write(1, &str[i], 1); // Affiche le caractere courant sur stdout\n        i++;                   // Passe au caractere suivant\n    }\n}\n\n// --- Test (a retirer avant de rendre) ---\nint main(void)\n{\n    ft_putstr(\"Hello World!\"); // Affiche la string caractere par caractere\n    printf(\"\\n\");             // Saut de ligne pour lisibilite\n    return (0);\n}", compileCmd: "gcc -Wall -Wextra -Werror ft_putstr.c -o test && ./test", expectedOutput: "Hello World!", explanation: "On parcourt la string et on affiche chaque caractère. Variante plus courte : write(1, str, ft_strlen(str))." },
          { type: "key", value: "ft_strlen et ft_putstr sont les mêmes qu'en C01. C04 les redemande car le projet est indépendant — tu ne peux pas inclure tes fichiers C01." },
          { type: "resources", items: [
            { icon: "📖", value: "man 3 strlen — retourne la longueur d'une string" },
            { icon: "📖", value: "man 2 write — write(fd, buf, count)" },
          ]},
        ],
        quiz: {
          type: "truefalse",
          question: "ft_strlen(\"Hello\") retourne 6 car elle compte le \\0.",
          options: ["Vrai", "Faux"],
          correct: 1,
          explanation: "ft_strlen retourne 5. Le \\0 n'est PAS compté. La boucle while(str[i]) s'arrête QUAND elle rencontre le \\0, sans l'inclure dans le compteur.",
        },
      },
    },
    {
      id: "m6-l2", title: "ft_putnbr : afficher un nombre", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "ft_putnbr affiche un int sur la sortie standard. L'idée : décomposer le nombre chiffre par chiffre avec / 10 et % 10, puis afficher chaque chiffre. La récursion gère l'ordre d'affichage." },
          { type: "analogy", value: "Pour afficher 42, tu dois afficher '4' PUIS '2'. Mais 42 % 10 = 2 (le dernier chiffre). Il faut d'abord traiter 42 / 10 = 4 (récursion), PUIS afficher le 2. La récursion empile et dépile dans le bon ordre." },
          { type: "exercise", title: "ft_putnbr", subject: "Écrire une fonction qui affiche un int sur la sortie standard. Doit gérer les négatifs et INT_MIN (-2147483648).", prototype: "void ft_putnbr(int nb);" },
          { type: "hint", hints: [
            "Cas spécial INT_MIN : -2147483648 ne peut pas être rendu positif (car INT_MAX = 2147483647). Il faut le gérer à part.",
            "Pour les négatifs : affiche '-' puis inverse le signe avec nb = -nb.",
            "Récursion : si nb >= 10, appelle ft_putnbr(nb / 10) d'abord, PUIS affiche nb % 10 + '0'.",
            "nb % 10 donne le dernier chiffre (ex: 42 % 10 = 2). + '0' le convertit en char ASCII.",
          ]},
          { type: "reveal", label: "Voir la solution ft_putnbr", code: "#include <unistd.h>\n#include <stdio.h>\n\nvoid ft_putnbr(int nb)\n{\n    char c;                    // Variable pour le chiffre a afficher\n\n    if (nb == -2147483648)     // INT_MIN : -nb overflow, on affiche en dur\n    {\n        write(1, \"-2147483648\", 11);\n        return ;               // Quitte, pas besoin de continuer\n    }\n    if (nb < 0)                // Si negatif, affiche '-' et inverse\n    {\n        write(1, \"-\", 1);      // Affiche le signe moins\n        nb = -nb;              // Rend le nombre positif\n    }\n    if (nb >= 10)              // S'il reste des chiffres a gauche\n        ft_putnbr(nb / 10);   // Recursion sur les chiffres superieurs\n    c = nb % 10 + '0';        // Convertit le dernier chiffre en char ASCII\n    write(1, &c, 1);          // Affiche ce chiffre\n}\n\n// --- Test (a retirer avant de rendre) ---\nint main(void)\n{\n    ft_putnbr(42);             // Attendu : 42\n    printf(\"\\n\");\n    ft_putnbr(-2147483648);   // Attendu : -2147483648 (INT_MIN)\n    printf(\"\\n\");\n    return (0);\n}", compileCmd: "gcc -Wall -Wextra -Werror ft_putnbr.c -o test && ./test", expectedOutput: "42\\n-42\\n0\\n-2147483648", explanation: "INT_MIN est géré en dur (hardcodé). Pour le reste : on gère le signe, puis la récursion traite les chiffres de gauche à droite grâce à l'empilement des appels." },
          { type: "key", value: "% 10 = dernier chiffre. / 10 = tout sauf le dernier. La récursion empile de droite à gauche et dépile de gauche à droite → affichage correct." },
          { type: "resources", items: [
            { icon: "📖", value: "man 2 write — pour afficher chaque caractère" },
            { icon: "⚠️", value: "INT_MIN = -2147483648. -INT_MIN overflow car INT_MAX = 2147483647" },
          ]},
        ],
        quiz: {
          type: "output",
          code: "ft_putnbr(-42);",
          question: "Quel est l'ordre des appels récursifs pour afficher -42 ?",
          options: ["write '-', ft_putnbr(4) → write '4', write '2'", "write '4', write '2', write '-'", "write '-', write '2', write '4'", "write '-42' d'un coup"],
          correct: 0,
          explanation: "nb < 0 → affiche '-', nb = 42. ft_putnbr(42) : 42 >= 10 → ft_putnbr(4). ft_putnbr(4) : 4 < 10 → affiche '4'. Retour → affiche '2'. Résultat : \"-42\".",
        },
      },
    },
    {
      id: "m6-l3", title: "ft_atoi : la version C04 avec multiples signes", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "ft_atoi de C04 est plus complexe que la version classique. La GROSSE particularité : elle gère PLUSIEURS signes + et -. Un nombre impair de '-' donne un résultat négatif." },
          { type: "text", value: "Les whitespace à ignorer : espace (32) et les caractères 9 à 13 (\\t, \\n, \\v, \\f, \\r). Puis les signes (multiples). Puis les chiffres. On s'arrête au premier non-chiffre." },
          { type: "exercise", title: "ft_atoi", subject: "Écrire une fonction qui convertit une string en int. Ignore les whitespace au début, gère PLUSIEURS signes + et -, puis convertit les chiffres. S'arrête au premier non-chiffre.", prototype: "int ft_atoi(char *str);" },
          { type: "hint", hints: [
            "3 phases : 1) skip whitespace, 2) compter les signes, 3) construire le nombre.",
            "Phase 1 : while (str[i] == ' ' || (str[i] >= 9 && str[i] <= 13)) i++;",
            "Phase 2 : while (str[i] == '+' || str[i] == '-'). Si c'est '-', inverse sign (sign *= -1).",
            "Phase 3 : while (str[i] >= '0' && str[i] <= '9'). result = result * 10 + (str[i] - '0').",
            "Retourne result * sign.",
          ]},
          { type: "reveal", label: "Voir la solution ft_atoi", code: "#include <stdio.h>\n\nint ft_atoi(char *str)\n{\n    int i;                     // Index pour parcourir la string\n    int sign;                  // Signe final : 1 ou -1\n    int result;                // Nombre en cours de construction\n\n    i = 0;                     // Commence au debut\n    sign = 1;                  // Par defaut positif\n    result = 0;                // Resultat initial a 0\n    while (str[i] == ' ' || (str[i] >= 9 && str[i] <= 13))\n        i++;                   // Phase 1 : saute les whitespace\n    while (str[i] == '+' || str[i] == '-')\n    {\n        if (str[i] == '-')\n            sign *= -1;        // Phase 2 : chaque '-' inverse le signe\n        i++;\n    }\n    while (str[i] >= '0' && str[i] <= '9')\n    {\n        result = result * 10 + (str[i] - '0'); // Phase 3 : construit le nombre\n        i++;\n    }\n    return (result * sign);    // Applique le signe et retourne\n}\n\n// --- Test (a retirer avant de rendre) ---\nint main(void)\n{\n    printf(\"%d\\n\", ft_atoi(\"  42\"));                // Attendu : 42\n    printf(\"%d\\n\", ft_atoi(\"  ---+--+1234ab567\"));  // Attendu : -1234\n    return (0);\n}", compileCmd: "gcc -Wall -Wextra -Werror ft_atoi.c -o test && ./test", expectedOutput: "42\\n-1234\\n0", explanation: "3 boucles : skip whitespace, compte les signes (impair de '-' = négatif), construit le nombre. S'arrête au premier non-chiffre." },
          { type: "key", value: "Version C04 = PLUSIEURS signes. Impair de '-' = négatif, pair = positif. Les '+' ne changent rien. C'est LE piège du sujet." },
          { type: "resources", items: [
            { icon: "📖", value: "man 3 atoi — la version standard ne gère qu'UN seul signe" },
            { icon: "⚠️", value: "Attention : la version C04 gère les signes multiples, pas la version standard !" },
            { icon: "💡", value: "Whitespace = espace (32) + \\t (9) + \\n (10) + \\v (11) + \\f (12) + \\r (13)" },
          ]},
        ],
        quiz: {
          type: "output",
          code: "printf(\"%d\", ft_atoi(\"  ---+--+1234ab567\"));",
          question: "Que va afficher ce code ?",
          options: ["-1234", "1234", "-1234567", "0"],
          correct: 0,
          explanation: "Skip espaces. Signes : ---+--+ → 5 fois '-' = impair = négatif. Chiffres : 1234. Stop à 'a'. Résultat : -1234.",
        },
      },
    },
    {
      id: "m6-l4", title: "Les bases numériques : comprendre le concept", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "On compte en base 10 (0-9) parce qu'on a 10 doigts. Un ordi compte en base 2 (0-1). L'hexadécimal est en base 16 (0-9 + a-f). Le PRINCIPE est toujours le même : chaque position vaut symbole × base^position." },
          { type: "code", value: "// Base 10 (décimal) : symboles = 0 1 2 3 4 5 6 7 8 9\n// 42 = 4×10¹ + 2×10⁰ = 42\n\n// Base 2 (binaire) : symboles = 0 1\n// 101010 = 1×32 + 0×16 + 1×8 + 0×4 + 1×2 + 0×1 = 42\n\n// Base 16 (hexa) : symboles = 0 1 2 3 4 5 6 7 8 9 a b c d e f\n// 2a = 2×16 + 10×1 = 42  (a = 10)\n\n// Base 8 (octal) : symboles = 0 1 2 3 4 5 6 7\n// 52 = 5×8 + 2×1 = 42\n\n// Base quelconque \"poneyvif\" (base 8) :\n// p=0, o=1, n=2, e=3, y=4, v=5, i=6, f=7\n// 42 en \"poneyvif\" = \"vn\" (v=5, n=2 → 5×8+2 = 42)" },
          { type: "text", value: "Pour ft_putnbr_base et ft_atoi_base, la BASE est une string dont chaque caractère est un symbole. La longueur de cette string = le nombre de symboles = la base." },
          { type: "key", value: "Une base = une string de symboles uniques. La longueur de la string = la valeur de la base. L'index de chaque char = sa valeur numérique." },
          { type: "resources", items: [
            { icon: "💡", value: "Base \"01\" = binaire. Base \"0123456789\" = décimal. Base \"0123456789abcdef\" = hexa." },
            { icon: "💡", value: "La position d'un symbole dans la string base = sa valeur : base[0] vaut 0, base[3] vaut 3, etc." },
          ]},
        ],
        quiz: {
          type: "output",
          code: "// Base = \"poneyvif\" (p=0, o=1, n=2, e=3, y=4, v=5, i=6, f=7)\n// \"vn\" en base \"poneyvif\" vaut combien en décimal ?",
          question: "Que vaut \"vn\" en base \"poneyvif\" ?",
          options: ["52", "42", "25", "72"],
          correct: 1,
          explanation: "v est à l'index 5, n est à l'index 2. Valeur = 5 × 8 + 2 = 42. (La base a 8 symboles.)",
        },
      },
    },
    {
      id: "m6-l5", title: "ft_putnbr_base : afficher en base quelconque", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "ft_putnbr_base, c'est ft_putnbr mais généralisé. Au lieu de % 10 + '0', on fait % base_len et on utilise base[reste] comme symbole. La récursion est identique." },
          { type: "text", value: "IMPORTANT : il faut vérifier que la base est valide. Une base valide a au moins 2 caractères, pas de doublons, pas de '+' ni '-'." },
          { type: "exercise", title: "ft_putnbr_base", subject: "Écrire une fonction qui affiche un nombre dans la base donnée. La base est une string de symboles uniques (min 2 chars, pas de +/-, pas de doublons).", prototype: "void ft_putnbr_base(int nbr, char *base);" },
          { type: "hint", hints: [
            "D'abord, vérifie la base : longueur >= 2, pas de doublon, pas de + ou -. Si invalide, ne fais rien.",
            "Utilise un long pour stocker nbr (pour gérer INT_MIN sans overflow).",
            "Gère le signe : si n < 0, affiche '-' et inverse n.",
            "Récursion : si n >= base_len, appelle ft_putnbr_base(n / base_len, base). Puis affiche base[n % base_len].",
          ]},
          { type: "reveal", label: "Voir la solution ft_putnbr_base", code: "#include <unistd.h>\n#include <stdio.h>\n\nint check_base(char *base)\n{\n    int i;                     // Index du char courant\n    int j;                     // Index pour detecter les doublons\n\n    i = 0;\n    while (base[i])            // Parcourt chaque caractere de la base\n    {\n        if (base[i] == '+' || base[i] == '-')\n            return (0);        // +/- interdits (reserves aux signes)\n        j = i + 1;\n        while (base[j])        // Compare avec tous les chars suivants\n        {\n            if (base[i] == base[j])\n                return (0);    // Doublon trouve : base invalide\n            j++;\n        }\n        i++;\n    }\n    return (i >= 2);           // Valide si au moins 2 symboles\n}\n\nvoid ft_putnbr_base(int nbr, char *base)\n{\n    int base_len;              // Nombre de symboles dans la base\n    long n;                    // Long pour gerer INT_MIN sans overflow\n\n    if (!check_base(base))     // Verifie la base avant de continuer\n        return ;\n    base_len = 0;\n    while (base[base_len])     // Calcule la longueur de la base\n        base_len++;\n    n = nbr;                   // Copie dans un long (safe pour INT_MIN)\n    if (n < 0)\n    {\n        write(1, \"-\", 1);      // Affiche le signe moins\n        n = -n;                // Rend positif (safe grace au long)\n    }\n    if (n >= base_len)         // S'il reste des chiffres a gauche\n        ft_putnbr_base(n / base_len, base); // Recursion sans le dernier chiffre\n    write(1, &base[n % base_len], 1); // Affiche le symbole du dernier chiffre\n}\n\n// --- Test (a retirer avant de rendre) ---\nint main(void)\n{\n    ft_putnbr_base(42, \"0123456789abcdef\"); // Attendu : 2a (hexa)\n    printf(\"\\n\");\n    ft_putnbr_base(42, \"01\");               // Attendu : 101010 (binaire)\n    printf(\"\\n\");\n    return (0);\n}", compileCmd: "gcc -Wall -Wextra -Werror ft_putnbr_base.c -o test && ./test", expectedOutput: "42\\n2a\\n101010\\n-42", explanation: "On vérifie la base, puis c'est ft_putnbr avec base[n % base_len] au lieu de n % 10 + '0'. Le long gère INT_MIN." },
          { type: "key", value: "ft_putnbr_base = ft_putnbr avec base[n % base_len]. La vérification de base (doublons, +/-, longueur) est indispensable." },
          { type: "resources", items: [
            { icon: "⚠️", value: "Vérification de base : >= 2 chars, pas de doublons, pas de + ni -" },
            { icon: "💡", value: "Utilise long au lieu de int pour éviter l'overflow avec INT_MIN" },
          ]},
        ],
        quiz: {
          type: "output",
          code: "ft_putnbr_base(42, \"0123456789abcdef\");",
          question: "Que va afficher ce code ?",
          options: ["42", "2a", "101010", "52"],
          correct: 1,
          explanation: "Base hexa (16 symboles). 42 / 16 = 2 (reste 10). 2 < 16 → affiche base[2]='2'. Puis base[10]='a'. Résultat : \"2a\".",
        },
      },
    },
    {
      id: "m6-l6", title: "ft_atoi_base : parser en base quelconque", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "ft_atoi_base est l'INVERSE de ft_putnbr_base. Elle lit une string écrite dans une base donnée et la convertit en int. C'est ft_atoi généralisé." },
          { type: "text", value: "L'algorithme : pour chaque char, trouver sa POSITION dans la string base (c'est sa valeur). Puis result = result × base_len + position. C'est le même result * 10 + chiffre mais avec base_len au lieu de 10." },
          { type: "exercise", title: "ft_atoi_base", subject: "Écrire une fonction qui convertit une string écrite dans la base donnée en int. Gère les whitespace, les signes multiples (comme ft_atoi C04), et s'arrête au premier char absent de la base.", prototype: "int ft_atoi_base(char *str, char *base);" },
          { type: "hint", hints: [
            "Réutilise la même vérification de base que ft_putnbr_base.",
            "Tu as besoin d'une fonction helper get_index(char c, char *base) qui retourne la position de c dans base, ou -1 si absent.",
            "Les 3 phases de ft_atoi : skip whitespace, compter les signes, construire le nombre.",
            "Phase 3 : tant que get_index(str[i], base) != -1, fais result = result * base_len + index.",
          ]},
          { type: "reveal", label: "Voir la solution ft_atoi_base", code: "#include <stdio.h>\n\nint check_base(char *base)\n{\n    int i;                     // Index du char courant\n    int j;                     // Index pour detecter les doublons\n\n    i = 0;\n    while (base[i])            // Parcourt chaque caractere de la base\n    {\n        if (base[i] == '+' || base[i] == '-')\n            return (0);        // +/- interdits\n        j = i + 1;\n        while (base[j])        // Compare avec les chars suivants\n        {\n            if (base[i] == base[j])\n                return (0);    // Doublon : base invalide\n            j++;\n        }\n        i++;\n    }\n    return (i >= 2);           // Valide si au moins 2 symboles\n}\n\nint get_index(char c, char *base)\n{\n    int i;                     // Index de parcours\n\n    i = 0;\n    while (base[i])            // Parcourt la base\n    {\n        if (base[i] == c)      // Symbole trouve\n            return (i);        // Retourne son index (= sa valeur)\n        i++;\n    }\n    return (-1);               // Char absent de la base\n}\n\nint ft_atoi_base(char *str, char *base)\n{\n    int i;                     // Index pour parcourir la string\n    int sign;                  // Signe final : 1 ou -1\n    int result;                // Nombre en cours de construction\n    int base_len;              // Longueur de la base\n    int idx;                   // Index du char courant dans la base\n\n    if (!check_base(base))     // Verifie la base\n        return (0);\n    base_len = 0;\n    while (base[base_len])     // Calcule la longueur de la base\n        base_len++;\n    i = 0;\n    sign = 1;\n    result = 0;\n    while (str[i] == ' ' || (str[i] >= 9 && str[i] <= 13))\n        i++;                   // Phase 1 : saute les whitespace\n    while (str[i] == '+' || str[i] == '-')\n    {\n        if (str[i] == '-')\n            sign *= -1;        // Phase 2 : gere les signes multiples\n        i++;\n    }\n    while ((idx = get_index(str[i], base)) != -1)\n    {\n        result = result * base_len + idx; // Phase 3 : construit le nombre en base N\n        i++;\n    }\n    return (result * sign);    // Applique le signe et retourne\n}\n\n// --- Test (a retirer avant de rendre) ---\nint main(void)\n{\n    printf(\"%d\\n\", ft_atoi_base(\"2a\", \"0123456789abcdef\")); // Attendu : 42\n    printf(\"%d\\n\", ft_atoi_base(\"101010\", \"01\"));            // Attendu : 42\n    return (0);\n}", compileCmd: "gcc -Wall -Wextra -Werror ft_atoi_base.c -o test && ./test", expectedOutput: "42\\n42\\n-42", explanation: "get_index trouve la valeur d'un symbole dans la base. Le reste est ft_atoi avec base_len au lieu de 10 et get_index au lieu de str[i] - '0'." },
          { type: "key", value: "ft_atoi_base = ft_atoi avec base_len au lieu de 10 et get_index() au lieu de str[i] - '0'. Le concept est identique, seul l'alphabet change." },
          { type: "resources", items: [
            { icon: "📖", value: "man 3 strtol — la version standard gère les bases 2 à 36" },
            { icon: "💡", value: "get_index est la clé : il traduit un symbole en valeur numérique" },
            { icon: "⚠️", value: "N'oublie pas : signes multiples comme dans ft_atoi C04" },
          ]},
        ],
        quiz: {
          type: "fill",
          code: "// Pour convertir \"2a\" en base hexa :\nresult = 0;\n// '2' est à l'index 2 dans la base\nresult = result * 16 + ______;\n// 'a' est à l'index 10 dans la base\nresult = result * 16 + ______;\n// result = ?",
          question: "Complète les blancs et donne le résultat final.",
          options: ["2 / 10 → result = 42", "2 / a → result = 2a", "'2' / 'a' → result = 42", "2 / 10 → result = 32"],
          correct: 0,
          explanation: "result = 0 × 16 + 2 = 2. Puis result = 2 × 16 + 10 = 42. Les blancs sont 2 et 10 (les index dans la base).",
        },
      },
    },
  ],
};
