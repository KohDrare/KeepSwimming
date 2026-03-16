// Module 5 — C03 : Comparer & Concaténer
// Exercices couverts : ft_strcmp, ft_strncmp, ft_strcat, ft_strncat, ft_strstr, ft_strlcat
window.MODULE_M5 = {
  id: "m5", title: "C03 : Comparer & Concaténer", icon: "🔗",
  description: "ft_strcmp, ft_strcat, ft_strstr — comparer, coller, chercher des strings",
  color: "#F97316",
  tag: "C03",
  lessons: [
    {
      id: "m5-l1", title: "ft_strcmp : comparer deux strings", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "strcmp compare deux strings caractère par caractère. Elle avance tant que les chars sont identiques et qu'aucune des deux n'est finie. Au premier écart (ou à la fin), elle retourne la DIFFÉRENCE des chars." },
          { type: "analogy", value: "C'est comme comparer deux mots dans un dictionnaire : tu lis lettre par lettre. Dès qu'une lettre diffère, tu sais quel mot vient en premier. Si tu arrives au bout sans différence, ils sont identiques." },
          { type: "visual", value: "string", str: "abc" },
          { type: "code", value: "// Résumé des retours :\n// retour == 0 → s1 et s2 sont identiques\n// retour < 0  → s1 est \"avant\" s2 (ordre ASCII)\n// retour > 0  → s1 est \"après\" s2\n//\n// strcmp(\"abc\", \"abc\") → 0      (identiques)\n// strcmp(\"abc\", \"abd\") → -1     ('c' - 'd' = -1)\n// strcmp(\"ab\",  \"abc\") → -99    ('\\0' - 'c' = -99)" },
          { type: "exercise", title: "ft_strcmp", subject: "Écrire une fonction qui compare les strings s1 et s2. Retourne la différence entre les premiers caractères qui diffèrent, ou 0 si les strings sont identiques.", prototype: "int ft_strcmp(char *s1, char *s2);" },
          { type: "hint", hints: [
            "Avance tant que les deux chars sont identiques ET qu'aucun n'est '\\0'.",
            "La condition de la boucle : s1[i] && s2[i] && s1[i] == s2[i].",
            "Après la boucle, retourne s1[i] - s2[i]. Si les strings sont identiques, les deux sont '\\0' → retourne 0.",
          ]},
          { type: "reveal", label: "Voir la solution ft_strcmp", code: "#include <unistd.h>\n\nvoid ft_putchar(char c)\n{\n    write(1, &c, 1);\n}\n\nvoid ft_putnbr(int nb)\n{\n    if (nb < 0)\n    {\n        ft_putchar('-');\n        nb = -nb;\n    }\n    if (nb >= 10)\n        ft_putnbr(nb / 10);\n    ft_putchar(nb % 10 + '0');\n}\n\nint ft_strcmp(char *s1, char *s2)\n{\n    int i;\n\n    i = 0;\n    while (s1[i] && s2[i] && s1[i] == s2[i])\n        i++;\n    return (s1[i] - s2[i]);\n}\n\n// --- Main de test (à retirer avant de rendre) ---\nint main(void)\n{\n    ft_putnbr(ft_strcmp(\"abc\", \"abc\"));\n    write(1, \"\\n\", 1);\n    ft_putnbr(ft_strcmp(\"abc\", \"abd\"));\n    write(1, \"\\n\", 1);\n    ft_putnbr(ft_strcmp(\"abd\", \"abc\"));\n    write(1, \"\\n\", 1);\n    return (0);\n}", compileCmd: "gcc -Wall -Wextra -Werror ft_strcmp.c -o test && ./test", expectedOutput: "0\\n-1\\n1", explanation: "On avance tant que les chars sont identiques et non-nuls. À la sortie, la différence donne : 0 si identiques, négatif si s1 < s2, positif si s1 > s2." },
          { type: "key", value: "strcmp retourne la DIFFÉRENCE des chars (pas juste -1/0/1). C'est important pour les exos de tri plus tard." },
          { type: "resources", items: [
            { icon: "📖", value: "man 3 strcmp — compare deux strings, retourne un entier" },
            { icon: "💡", value: "s1[i] - s2[i] : si les deux sont '\\0', ça donne 0 - 0 = 0" },
          ]},
        ],
        quiz: {
          type: "output",
          code: "printf(\"%d\\n\", ft_strcmp(\"ab\", \"abc\"));",
          question: "Que va afficher ce code ?",
          options: ["0", "-99", "-1", "1"],
          correct: 1,
          explanation: "\"ab\" s'arrête à l'index 2 : s1[2] = '\\0' (valeur 0), s2[2] = 'c' (valeur 99). Retour : 0 - 99 = -99.",
        },
      },
    },
    {
      id: "m5-l2", title: "ft_strncmp : comparer avec limite n", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "ft_strncmp est comme strcmp mais s'arrête après n caractères maximum. Utile pour comparer juste le DÉBUT d'une string, ou pour limiter la comparaison à une certaine longueur." },
          { type: "exercise", title: "ft_strncmp", subject: "Écrire une fonction qui compare au maximum n caractères de s1 et s2. Retourne 0 si les n premiers chars sont identiques.", prototype: "int ft_strncmp(char *s1, char *s2, unsigned int n);" },
          { type: "hint", hints: [
            "Cas spécial : si n == 0, retourne 0 (rien à comparer = égal).",
            "Même logique que strcmp, mais ajoute la condition i < n - 1 dans la boucle.",
            "La boucle : while (s1[i] && s2[i] && s1[i] == s2[i] && i < n - 1). Puis return (s1[i] - s2[i]).",
          ]},
          { type: "reveal", label: "Voir la solution ft_strncmp", code: "#include <unistd.h>\n\nvoid ft_putchar(char c)\n{\n    write(1, &c, 1);\n}\n\nvoid ft_putnbr(int nb)\n{\n    if (nb < 0)\n    {\n        ft_putchar('-');\n        nb = -nb;\n    }\n    if (nb >= 10)\n        ft_putnbr(nb / 10);\n    ft_putchar(nb % 10 + '0');\n}\n\nint ft_strncmp(char *s1, char *s2, unsigned int n)\n{\n    unsigned int i;\n\n    if (n == 0)\n        return (0);\n    i = 0;\n    while (s1[i] && s2[i] && s1[i] == s2[i] && i < n - 1)\n        i++;\n    return (s1[i] - s2[i]);\n}\n\n// --- Main de test (à retirer avant de rendre) ---\nint main(void)\n{\n    ft_putnbr(ft_strncmp(\"abcX\", \"abcY\", 3));\n    write(1, \"\\n\", 1);\n    ft_putnbr(ft_strncmp(\"abc\", \"abd\", 2));\n    write(1, \"\\n\", 1);\n    return (0);\n}", compileCmd: "gcc -Wall -Wextra -Werror ft_strncmp.c -o test && ./test", expectedOutput: "0\\n0", explanation: "Si n == 0 → 0. Sinon, on compare comme strcmp mais on s'arrête à n - 1 (car on compare aussi le char à la position n-1). Si les n premiers chars sont identiques → 0." },
          { type: "key", value: "n == 0 → retourne 0. Sinon, compare max n chars. Le piège : la condition est i < n - 1 (pas i < n), car on compare s1[i] vs s2[i] APRÈS la boucle." },
          { type: "resources", items: [
            { icon: "📖", value: "man 3 strncmp — compare au maximum n caractères" },
            { icon: "⚠️", value: "Attention au cas n == 0 avec unsigned int : n - 1 donnerait 4294967295 !" },
          ]},
        ],
        quiz: {
          type: "output",
          code: "printf(\"%d\", ft_strncmp(\"abcX\", \"abcY\", 3));",
          question: "Que va afficher ce code ?",
          options: ["0", "-1", "1", "3"],
          correct: 0,
          explanation: "On compare au max 3 chars : 'a'=='a', 'b'=='b', 'c'=='c' → identiques sur 3 chars → retourne 0. La différence X/Y à l'index 3 est ignorée.",
        },
      },
    },
    {
      id: "m5-l3", title: "ft_strcat et ft_strncat : concaténer", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "Concaténer = coller src à la fin de dest. L'idée : d'abord aller à la FIN de dest (au \\0), puis copier src à partir de là. C'est un ft_strcpy qui commence au bout de dest." },
          { type: "visual", value: "string", str: "Hi World" },
          { type: "exercise", title: "ft_strcat", subject: "Écrire une fonction qui concatène src à la fin de dest. Retourne dest.", prototype: "char *ft_strcat(char *dest, char *src);" },
          { type: "hint", hints: [
            "Deux phases : 1) trouver la fin de dest, 2) copier src à partir de là.",
            "Phase 1 : while (dest[i]) i++; — maintenant dest[i] est le \\0 de dest.",
            "Phase 2 : while (src[j]) dest[i++] = src[j++]; — puis dest[i] = '\\0'.",
          ]},
          { type: "reveal", label: "Voir la solution ft_strcat", code: "#include <unistd.h>\n\nvoid ft_putstr(char *str)\n{\n    while (*str)\n        write(1, str++, 1);\n}\n\nchar *ft_strcat(char *dest, char *src)\n{\n    int i;\n    int j;\n\n    i = 0;\n    while (dest[i])\n        i++;\n    j = 0;\n    while (src[j])\n    {\n        dest[i] = src[j];\n        i++;\n        j++;\n    }\n    dest[i] = '\\0';\n    return (dest);\n}\n\n// --- Main de test (à retirer avant de rendre) ---\nint main(void)\n{\n    char dest[30] = \"Hello \";\n\n    ft_strcat(dest, \"World!\");\n    ft_putstr(dest);\n    write(1, \"\\n\", 1);\n    return (0);\n}", compileCmd: "gcc -Wall -Wextra -Werror ft_strcat.c -o test && ./test", expectedOutput: "Hello World!", explanation: "On va au \\0 de dest, on copie src char par char, on termine avec un nouveau \\0. Le \\0 original de dest est écrasé par le premier char de src." },
          { type: "exercise", title: "ft_strncat", subject: "Écrire une fonction qui concatène au maximum nb caractères de src à la fin de dest. Ajoute toujours un \\0 à la fin. Retourne dest.", prototype: "char *ft_strncat(char *dest, char *src, unsigned int nb);" },
          { type: "hint", hints: [
            "Même logique que ft_strcat, mais la phase 2 a une limite.",
            "Condition de la boucle de copie : src[j] && j < nb.",
            "Important : strncat met TOUJOURS un \\0. Contrairement à strncpy (incohérence classique de C).",
          ]},
          { type: "reveal", label: "Voir la solution ft_strncat", code: "#include <unistd.h>\n\nvoid ft_putstr(char *str)\n{\n    while (*str)\n        write(1, str++, 1);\n}\n\nchar *ft_strncat(char *dest, char *src, unsigned int nb)\n{\n    unsigned int i;\n    unsigned int j;\n\n    i = 0;\n    while (dest[i])\n        i++;\n    j = 0;\n    while (src[j] && j < nb)\n    {\n        dest[i] = src[j];\n        i++;\n        j++;\n    }\n    dest[i] = '\\0';\n    return (dest);\n}\n\n// --- Main de test (à retirer avant de rendre) ---\nint main(void)\n{\n    char dest[30] = \"Hello \";\n\n    ft_strncat(dest, \"World!!!\", 6);\n    ft_putstr(dest);\n    write(1, \"\\n\", 1);\n    return (0);\n}", compileCmd: "gcc -Wall -Wextra -Werror ft_strncat.c -o test && ./test", expectedOutput: "Hello World!", explanation: "Comme ft_strcat mais on copie au max nb chars de src. Le \\0 est TOUJOURS ajouté (contrairement à strncpy)." },
          { type: "key", value: "strcat = aller au bout de dest + copier src. strncat = pareil mais avec une limite. strncat met TOUJOURS un \\0, strncpy PAS forcément — piège classique." },
          { type: "resources", items: [
            { icon: "📖", value: "man 3 strcat / man 3 strncat — concaténation de strings" },
            { icon: "⚠️", value: "strcat ne vérifie pas la taille de dest — risque de buffer overflow" },
          ]},
        ],
        quiz: {
          type: "bug",
          code: "char *ft_strcat(char *dest, char *src)\n{\n    int i;\n    int j;\n\n    i = 0;\n    j = 0;\n    while (src[j])\n    {\n        dest[i] = src[j];\n        i++;\n        j++;\n    }\n    dest[i] = '\\0';\n    return (dest);\n}",
          question: "Ce ft_strcat a un bug critique. Lequel ?",
          options: ["Il manque le \\0 final", "Il écrase dest au lieu de concaténer (i ne commence pas à la fin de dest)", "src ne peut pas être vide", "Il faut retourner src"],
          correct: 1,
          explanation: "i commence à 0 au lieu de commencer à la FIN de dest. Ce code ÉCRASE dest avec src au lieu de concaténer. Il faut d'abord faire while(dest[i]) i++; pour se positionner à la fin.",
        },
      },
    },
    {
      id: "m5-l4", title: "ft_strstr : chercher une sous-string", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "ft_strstr cherche la première occurrence de 'to_find' dans 'str'. Si trouvée, retourne un pointeur vers le début du match. Sinon, retourne NULL. C'est l'exo le plus difficile de C03." },
          { type: "analogy", value: "C'est comme chercher un mot dans un livre : tu parcours le texte, et à chaque position tu vérifies si le mot commence là. Dès que tu trouves, tu pointes l'endroit." },
          { type: "visual", value: "string", str: "Hello World" },
          { type: "exercise", title: "ft_strstr", subject: "Écrire une fonction qui cherche la première occurrence de to_find dans str. Retourne un pointeur vers le début de la correspondance, ou NULL si non trouvée. Si to_find est vide, retourne str.", prototype: "char *ft_strstr(char *str, char *to_find);" },
          { type: "hint", hints: [
            "Cas spécial : si to_find est vide (to_find[0] == '\\0'), retourne str directement.",
            "Double boucle : i parcourt str (boucle externe), j compare avec to_find (boucle interne).",
            "Boucle interne : while (str[i + j] && to_find[j] && str[i + j] == to_find[j]) j++;",
            "Si to_find[j] == '\\0' après la boucle interne, c'est qu'on a trouvé tout to_find → retourne &str[i].",
          ]},
          { type: "reveal", label: "Voir la solution ft_strstr", code: "#include <unistd.h>\n\nvoid ft_putstr(char *str)\n{\n    while (*str)\n        write(1, str++, 1);\n}\n\nchar *ft_strstr(char *str, char *to_find)\n{\n    int i;\n    int j;\n\n    if (to_find[0] == '\\0')\n        return (str);\n    i = 0;\n    while (str[i])\n    {\n        j = 0;\n        while (str[i + j] && to_find[j]\n               && str[i + j] == to_find[j])\n            j++;\n        if (to_find[j] == '\\0')\n            return (&str[i]);\n        i++;\n    }\n    return (0);\n}\n\n// --- Main de test (à retirer avant de rendre) ---\nint main(void)\n{\n    char *result;\n\n    result = ft_strstr(\"Hello World\", \"World\");\n    if (result)\n        ft_putstr(result);\n    write(1, \"\\n\", 1);\n    result = ft_strstr(\"Hello World\", \"xyz\");\n    if (result)\n        ft_putstr(result);\n    else\n        ft_putstr(\"(null)\");\n    write(1, \"\\n\", 1);\n    return (0);\n}", compileCmd: "gcc -Wall -Wextra -Werror ft_strstr.c -o test && ./test", expectedOutput: "World\\n(null)", explanation: "Pour chaque position i dans str, on vérifie si to_find commence là. L'astuce str[i + j] permet de comparer sans modifier i. Si on parcourt tout to_find (to_find[j] == '\\0'), c'est trouvé." },
          { type: "key", value: "Double boucle avec str[i + j]. Le test to_find[j] == '\\0' signifie qu'on a parcouru TOUT to_find = match trouvé. N'oublie pas le cas to_find vide." },
          { type: "resources", items: [
            { icon: "📖", value: "man 3 strstr — trouve la première occurrence d'une sous-string" },
            { icon: "💡", value: "&str[i] retourne un pointeur vers str à partir de la position i" },
            { icon: "⚠️", value: "Piège : \"aab\" dans \"aaab\" — ne t'arrête pas au premier 'a' qui échoue !" },
          ]},
        ],
        quiz: {
          type: "output",
          code: "char *r = ft_strstr(\"aaabaaab\", \"aab\");\nprintf(\"%s\", r);",
          question: "Que va afficher ce code ?",
          options: ["aab", "aabaaab", "aaabaaab", "NULL"],
          correct: 1,
          explanation: "On cherche \"aab\" dans \"aaabaaab\". À l'index 1 : str[1]='a', str[2]='a', str[3]='b' → match ! Retourne &str[1] → affiche \"aabaaab\" (tout depuis l'index 1).",
        },
      },
    },
    {
      id: "m5-l5", title: "ft_strlcat : concaténation sécurisée", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "ft_strlcat est la version sécurisée de strcat. Elle concatène dans un buffer de taille fixe et retourne la longueur totale théorique. C'est l'exo le plus piégeux de C03." },
          { type: "text", value: "Ce que retourne strlcat : strlen(dest_initial) + strlen(src). Si ce retour >= size, la concaténation a été tronquée. Cas spécial : si size <= strlen(dest), retourne size + strlen(src)." },
          { type: "exercise", title: "ft_strlcat", subject: "Concatène src à dest dans un buffer de taille size. Ajoute toujours un \\0. Retourne strlen(dest) + strlen(src) si size > strlen(dest), sinon size + strlen(src).", prototype: "unsigned int ft_strlcat(char *dest, char *src, unsigned int size);" },
          { type: "hint", hints: [
            "D'abord, mesure la longueur de dest (mais ne dépasse pas size pour éviter de lire hors du buffer).",
            "Mesure la longueur de src normalement (on en a besoin pour le retour).",
            "Si d_len >= size → le buffer est déjà plein, retourne size + s_len.",
            "Sinon, copie src dans dest à partir de d_len, avec la limite d_len + i < size - 1. Puis \\0.",
            "Retourne d_len + s_len (la longueur théorique sans troncation).",
          ]},
          { type: "reveal", label: "Voir la solution ft_strlcat", code: "#include <unistd.h>\n\nvoid ft_putchar(char c)\n{\n    write(1, &c, 1);\n}\n\nvoid ft_putnbr(int nb)\n{\n    if (nb < 0)\n    {\n        ft_putchar('-');\n        nb = -nb;\n    }\n    if (nb >= 10)\n        ft_putnbr(nb / 10);\n    ft_putchar(nb % 10 + '0');\n}\n\nvoid ft_putstr(char *str)\n{\n    while (*str)\n        write(1, str++, 1);\n}\n\nunsigned int ft_strlcat(char *dest, char *src, unsigned int size)\n{\n    unsigned int d_len;\n    unsigned int s_len;\n    unsigned int i;\n\n    d_len = 0;\n    while (dest[d_len] && d_len < size)\n        d_len++;\n    s_len = 0;\n    while (src[s_len])\n        s_len++;\n    if (d_len >= size)\n        return (size + s_len);\n    i = 0;\n    while (src[i] && d_len + i < size - 1)\n    {\n        dest[d_len + i] = src[i];\n        i++;\n    }\n    dest[d_len + i] = '\\0';\n    return (d_len + s_len);\n}\n\n// --- Main de test (à retirer avant de rendre) ---\nint main(void)\n{\n    char dest[20] = \"Hello \";\n    unsigned int ret;\n\n    ret = ft_strlcat(dest, \"World!\", 20);\n    ft_putstr(dest);\n    write(1, \" \", 1);\n    ft_putnbr(ret);\n    write(1, \"\\n\", 1);\n    return (0);\n}", compileCmd: "gcc -Wall -Wextra -Werror ft_strlcat.c -o test && ./test", expectedOutput: "Hello World! 12", explanation: "On mesure dest (sans dépasser size), on mesure src. Si dest remplit déjà le buffer → retour spécial. Sinon on concatène avec limite et on retourne la longueur théorique." },
          { type: "key", value: "strlcat retourne strlen(dest) + strlen(src). Si retour >= size → troncation. Le cas d_len >= size est le piège : retourne size + strlen(src), pas d_len + s_len." },
          { type: "resources", items: [
            { icon: "📖", value: "man 3 strlcat — concaténation sécurisée (BSD)" },
            { icon: "💡", value: "if (ft_strlcat(dest, src, size) >= size) → la concaténation a été tronquée" },
            { icon: "⚠️", value: "Le d_len < size dans la première boucle est crucial : sans ça, on lirait hors du buffer si dest n'a pas de \\0" },
          ]},
        ],
        quiz: {
          type: "fill",
          code: "unsigned int ft_strlcat(char *dest, char *src, unsigned int size)\n{\n    unsigned int d_len;\n    unsigned int s_len;\n    unsigned int i;\n\n    d_len = 0;\n    while (dest[d_len] && d_len < size)\n        d_len++;\n    s_len = 0;\n    while (src[s_len])\n        s_len++;\n    if (d_len >= size)\n        return (______);\n    // ... copie ...\n    return (______);\n}",
          question: "Complète les deux return de ft_strlcat.",
          options: ["d_len + s_len / d_len + s_len", "size + s_len / d_len + s_len", "d_len + s_len / size + s_len", "size + s_len / size + s_len"],
          correct: 1,
          explanation: "Si dest >= size (buffer plein) : retourne size + s_len. Sinon (cas normal) : retourne d_len + s_len. La distinction est LE piège de strlcat.",
        },
      },
    },
    {
      id: "m5-l6", title: "Récap C03 : comparer, coller, chercher", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "C03 tourne autour de 3 opérations fondamentales sur les strings : comparer (strcmp), concaténer (strcat), et chercher (strstr). Chaque opération a sa version 'limitée' ou 'sécurisée'." },
          { type: "code", value: "// Les paires de C03 :\n// strcmp  → strncmp    (comparer avec limite)\n// strcat  → strncat    (concaténer avec limite)\n// strcat  → strlcat    (concaténer sécurisé)\n//\n// Et le solitaire :\n// strstr → chercher une sous-string (double boucle)\n//\n// Pattern commun : parcourir avec while, 2 index,\n// et toujours penser au \\0" },
          { type: "key", value: "C03 = manipuler deux strings en même temps. Toujours 2 index (i pour dest/s1, j pour src/s2). Le \\0 reste le piège n°1." },
          { type: "resources", items: [
            { icon: "📖", value: "man ascii — pour les valeurs numériques des caractères (utile pour strcmp)" },
            { icon: "💡", value: "La version sécurisée (strl*) retourne la taille théorique pour détecter la troncation" },
            { icon: "⚠️", value: "Les versions non-sécurisées (strcpy, strcat) ne vérifient JAMAIS la taille — danger de buffer overflow" },
          ]},
        ],
        quiz: {
          type: "truefalse",
          statement: "strncat ajoute toujours un \\0 à la fin, contrairement à strncpy qui ne le fait que si src est plus courte que n.",
          correct: true,
          explanation: "C'est une incohérence historique de C : strncat met TOUJOURS un \\0, mais strncpy ne le fait QUE si src < n. C'est un piège classique d'examen.",
        },
      },
    },
  ],
};
