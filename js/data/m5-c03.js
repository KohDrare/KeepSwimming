// Module 5 — C03 : Comparer & Concaténer
// Exercices couverts : ft_strcmp, ft_strncmp, ft_strcat, ft_strncat, ft_strstr, ft_strlcat
window.MODULE_M5 = {
  id: "m5", title: "C03 : Comparer & Concaténer", icon: "\u{1F517}",
  description: "ft_strcmp, ft_strcat, ft_strstr — comparer, coller, chercher des strings",
  color: "#F97316",
  tag: "C03",
  lessons: [
    {
      id: "m5-l1", title: "ft_strcmp : comparer deux strings", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "ft_strcmp compare deux strings caractère par caractère. Elle retourne 0 si elles sont identiques, ou la différence entre les premiers chars qui divergent." },
          { type: "code", value: "int ft_strcmp(char *s1, char *s2)\n{\n    int i;\n\n    i = 0;\n    while (s1[i] && s2[i] && s1[i] == s2[i])\n        i++;               // Avance tant que c'est pareil\n    return (s1[i] - s2[i]); // Différence au point de divergence\n}\n\n// Exemples :\n// ft_strcmp(\"abc\", \"abc\") → 0     (identiques)\n// ft_strcmp(\"abc\", \"abd\") → -1    ('c' - 'd' = 99-100)\n// ft_strcmp(\"abd\", \"abc\") → 1     ('d' - 'c' = 100-99)\n// ft_strcmp(\"ab\",  \"abc\") → -99   ('\\0' - 'c' = 0-99)\n\n// Résumé :\n// retour == 0 → s1 et s2 sont identiques\n// retour < 0  → s1 est \"avant\" s2 (alphabétiquement)\n// retour > 0  → s1 est \"après\" s2" },
          { type: "key", value: "strcmp retourne la DIFFÉRENCE des chars, pas juste -1/0/1. C'est important pour les exos de tri." },
        ],
        quiz: {
          question: "ft_strcmp(\"abc\", \"abd\") retourne quoi ?",
          options: ["0 (égales)", "Négatif (-1)", "Positif (1)", "Erreur"],
          correct: 1,
          explanation: "Diverge à l'index 2 : 'c' - 'd' = 99 - 100 = -1. Négatif signifie que s1 vient 'avant' s2 dans l'ordre alphabétique.",
        },
      },
    },
    {
      id: "m5-l2", title: "ft_strncmp : comparer avec limite n", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "ft_strncmp est comme strcmp mais compare au maximum n caractères. Utile quand tu veux comparer juste le début d'une string." },
          { type: "code", value: "int ft_strncmp(char *s1, char *s2, unsigned int n)\n{\n    unsigned int i;\n\n    if (n == 0)\n        return (0);         // 0 chars à comparer = égal\n    i = 0;\n    while (s1[i] && s2[i] && s1[i] == s2[i]\n           && i < n - 1)    // On compare max n chars\n        i++;\n    return (s1[i] - s2[i]);\n}\n\n// Exemples :\n// ft_strncmp(\"abcX\", \"abcY\", 3) → 0\n//   On compare 'a','b','c' → identiques sur 3 chars\n// ft_strncmp(\"abcX\", \"abcY\", 4) → -1\n//   On compare aussi 'X' vs 'Y' → 'X'-'Y' = -1" },
          { type: "key", value: "strncmp compare au maximum n caractères. Si les n premiers chars sont identiques, elle retourne 0 même si le reste diffère." },
        ],
        quiz: {
          question: "ft_strncmp(\"hello\", \"helium\", 3) retourne quoi ?",
          options: ["0", "Négatif", "Positif", "3"],
          correct: 0,
          explanation: "Les 3 premiers chars sont 'h','e','l' dans les deux strings → identiques sur 3 chars → retourne 0.",
        },
      },
    },
    {
      id: "m5-l3", title: "ft_strcat : concaténer deux strings", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "ft_strcat ajoute src à la fin de dest. L'astuce : d'abord aller à la fin de dest (le \\0), puis copier src à partir de là." },
          { type: "code", value: "char *ft_strcat(char *dest, char *src)\n{\n    int i;\n    int j;\n\n    i = 0;\n    while (dest[i])       // Va à la fin de dest\n        i++;\n    j = 0;\n    while (src[j])        // Copie src\n    {\n        dest[i] = src[j];\n        i++;\n        j++;\n    }\n    dest[i] = '\\0';      // Termine la string\n    return (dest);\n}\n\n// Exemple :\nchar buf[20] = \"Hi\";\nft_strcat(buf, \" World\");\n// buf = \"Hi World\"\n\n// En mémoire :\n// Avant : ['H']['i']['\\0']...\n// Après : ['H']['i'][' ']['W']['o']['r']['l']['d']['\\0']" },
          { type: "key", value: "ft_strcat utilise 2 index : i pour dest, j pour src. On écrase le \\0 de dest et on en met un nouveau à la fin." },
        ],
        quiz: {
          question: "char dest[10] = \"Hi\"; ft_strcat(dest, \"!\"); → Que contient dest ?",
          options: ["Hi", "Hi!", "!Hi", "Erreur"],
          correct: 1,
          explanation: "ft_strcat va à la fin de dest ('H','i','\\0'), remplace le \\0 par '!' puis ajoute un nouveau \\0. Résultat : \"Hi!\"",
        },
      },
    },
    {
      id: "m5-l4", title: "ft_strncat : concaténer avec limite", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "ft_strncat est la version limitée de strcat. Elle ajoute au maximum n caractères de src, et ajoute TOUJOURS un \\0 à la fin." },
          { type: "code", value: "char *ft_strncat(char *dest, char *src, unsigned int nb)\n{\n    unsigned int i;\n    unsigned int j;\n\n    i = 0;\n    while (dest[i])\n        i++;\n    j = 0;\n    while (src[j] && j < nb)  // Max nb chars de src\n    {\n        dest[i] = src[j];\n        i++;\n        j++;\n    }\n    dest[i] = '\\0';          // Toujours un \\0\n    return (dest);\n}\n\n// Différence avec strncpy :\n// strncpy ne met PAS forcément un \\0\n// strncat met TOUJOURS un \\0\n// (oui, c'est incohérent, bienvenue en C)" },
          { type: "key", value: "strncat ajoute max nb chars de src et TOUJOURS un \\0 à la fin. Contrairement à strncpy qui est plus vicieux." },
        ],
        quiz: {
          question: "char dest[20] = \"AB\"; ft_strncat(dest, \"CDEF\", 2); → Résultat ?",
          options: ["ABCD", "ABCDEF", "AB", "ABCDE"],
          correct: 0,
          explanation: "On va à la fin de \"AB\", on copie max 2 chars de \"CDEF\" → 'C','D', on ajoute '\\0'. Résultat : \"ABCD\".",
        },
      },
    },
    {
      id: "m5-l5", title: "ft_strstr : chercher une sous-string", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "ft_strstr cherche la première occurrence de 'to_find' dans 'str'. Si trouvée, elle retourne un pointeur vers le début de la correspondance. Sinon, NULL." },
          { type: "code", value: "char *ft_strstr(char *str, char *to_find)\n{\n    int i;\n    int j;\n\n    if (to_find[0] == '\\0')   // String vide → retourne str\n        return (str);\n    i = 0;\n    while (str[i])             // Pour chaque position dans str\n    {\n        j = 0;\n        while (str[i + j] && to_find[j]\n               && str[i + j] == to_find[j])\n            j++;               // Compare caractère par caractère\n        if (to_find[j] == '\\0') // On a parcouru tout to_find !\n            return (&str[i]);   // Trouvé ! Retourne le pointeur\n        i++;\n    }\n    return (0);                // Pas trouvé → NULL\n}\n\n// ft_strstr(\"Hello World\", \"World\") → pointeur vers \"World\"\n// ft_strstr(\"Hello World\", \"xyz\")   → NULL\n// ft_strstr(\"aaab\", \"aab\")          → pointeur vers \"aab\"" },
          { type: "key", value: "Double boucle : i parcourt str, j compare to_find. Si to_find[j] == '\\0' → on a tout trouvé. L'astuce : str[i + j] évite un deuxième index pour str." },
        ],
        quiz: {
          question: "ft_strstr(\"abcabc\", \"cab\") → que retourne-t-elle ?",
          options: ["NULL", "Pointeur vers \"cabc\" (index 2)", "Pointeur vers \"abc\" (index 0)", "Pointeur vers \"abc\" (index 3)"],
          correct: 1,
          explanation: "On cherche \"cab\" dans \"abcabc\". À l'index 2 on trouve 'c','a','b' → match ! Retourne &str[2] qui pointe vers \"cabc\".",
        },
      },
    },
    {
      id: "m5-l6", title: "ft_strlcat : concaténation sécurisée", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "ft_strlcat est la version sécurisée de strcat, comme strlcpy l'est pour strcpy. Elle concatène dans un buffer de taille fixe et retourne la taille qu'il AURAIT fallu." },
          { type: "code", value: "unsigned int ft_strlcat(char *dest, char *src,\n                        unsigned int size)\n{\n    unsigned int d_len;\n    unsigned int s_len;\n    unsigned int i;\n\n    d_len = 0;\n    while (dest[d_len] && d_len < size)\n        d_len++;\n    s_len = 0;\n    while (src[s_len])\n        s_len++;\n    if (d_len >= size)        // dest remplit déjà tout\n        return (size + s_len);\n    i = 0;\n    while (src[i] && d_len + i < size - 1)\n    {\n        dest[d_len + i] = src[i];\n        i++;\n    }\n    dest[d_len + i] = '\\0';\n    return (d_len + s_len);   // Taille théorique\n}\n\n// Si retour >= size → la concaténation a été tronquée" },
          { type: "key", value: "ft_strlcat retourne strlen(dest) + strlen(src) (la taille qu'il aurait fallu). Si cette valeur >= size, la concaténation a été tronquée." },
        ],
        quiz: {
          question: "char dest[8] = \"Hi\"; ft_strlcat(dest, \" World\", 8); → Que contient dest ?",
          options: ["Hi World", "Hi Worl", "Hi Wor", "Hi"],
          correct: 1,
          explanation: "dest a 2 chars. size=8, donc on peut ajouter 8-2-1=5 chars. \" World\" fait 6 chars, on copie 5 : ' ','W','o','r','l' + '\\0'. dest = \"Hi Worl\".",
        },
      },
    },
  ],
};
