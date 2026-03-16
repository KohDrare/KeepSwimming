// Module 4 — C02 : Manipulation de strings
// Exercices couverts : ft_strcpy, ft_strncpy, ft_str_is_alpha, ft_str_is_numeric,
// ft_str_is_lowercase, ft_str_is_uppercase, ft_str_is_printable,
// ft_strupcase, ft_strlowcase, ft_strcapitalize, ft_strlcpy, ft_putstr_non_printable
window.MODULE_M4 = {
  id: "m4", title: "C02 : Manipulation de strings", icon: "\u{1F4DD}",
  description: "Copier, vérifier, transformer des strings — ft_strcpy, ft_str_is_*, ft_strupcase",
  color: "#14B8A6",
  tag: "C02",
  lessons: [
    {
      id: "m4-l1", title: "ft_strcpy : copier une string", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "ft_strcpy copie une string source dans une destination. L'erreur la plus fréquente ? Oublier de copier le '\\0' final." },
          { type: "code", value: "char *ft_strcpy(char *dest, char *src)\n{\n    int i;\n\n    i = 0;\n    while (src[i])       // Copie caractère par caractère\n    {\n        dest[i] = src[i];\n        i++;\n    }\n    dest[i] = '\\0';     // N'oublie JAMAIS le \\0 !\n    return (dest);       // Retourne dest (convention C)\n}\n\n// Utilisation :\nchar buffer[20];\nft_strcpy(buffer, \"Hello\");\n// buffer contient maintenant \"Hello\\0\"\n\n// PIÈGE : si dest est trop petit → overflow !\n// C ne vérifie PAS la taille. C'est à toi de le faire." },
          { type: "key", value: "TOUJOURS copier le \\0 final. Sans lui, la string n'a pas de fin → les fonctions liront dans la mémoire aléatoire = bug." },
        ],
        quiz: {
          question: "Que se passe-t-il si tu oublies dest[i] = '\\0' dans ft_strcpy ?",
          options: ["Rien, ça marche quand même", "La string copiée n'a pas de fin → lecture hors limites", "Erreur de compilation", "Le programme crash immédiatement"],
          correct: 1,
          explanation: "Sans le \\0, les fonctions qui lisent la string (strlen, putstr...) ne savent pas où s'arrêter et lisent la mémoire au-delà → comportement indéfini.",
        },
      },
    },
    {
      id: "m4-l2", title: "ft_strncpy : copier avec limite", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "ft_strncpy copie au maximum n caractères. Subtilité importante : si src est plus courte que n, le reste de dest est rempli de \\0." },
          { type: "code", value: "char *ft_strncpy(char *dest, char *src, unsigned int n)\n{\n    unsigned int i;\n\n    i = 0;\n    while (src[i] && i < n)   // Copie src jusqu'à n\n    {\n        dest[i] = src[i];\n        i++;\n    }\n    while (i < n)             // Remplit le reste de \\0\n    {\n        dest[i] = '\\0';\n        i++;\n    }\n    return (dest);\n}\n\n// Cas 1 : src = \"Hi\" (2 chars), n = 5\n// → dest = ['H','i','\\0','\\0','\\0']\n\n// Cas 2 : src = \"Hello World\", n = 5\n// → dest = ['H','e','l','l','o']  ← PAS de \\0 !\n// ATTENTION : si src >= n, PAS de \\0 ajouté !" },
          { type: "key", value: "Si src est plus courte que n : on remplit de \\0. Si src est plus longue : on coupe à n, SANS ajouter de \\0. C'est le comportement standard de strncpy." },
        ],
        quiz: {
          question: "ft_strncpy(dest, \"AB\", 5) → Que contient dest ?",
          options: ["AB", "AB\\0\\0\\0", "AB???", "ABAB\\0"],
          correct: 1,
          explanation: "src = \"AB\" fait 2 chars. n = 5. On copie 'A', 'B', puis on remplit les 3 positions restantes avec des \\0.",
        },
      },
    },
    {
      id: "m4-l3", title: "Les fonctions ft_str_is_* : vérifier le contenu", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "C02 demande plusieurs fonctions qui vérifient si une string contient uniquement un certain type de caractères. Le piège : une string vide retourne 1 (vrai) !" },
          { type: "code", value: "// ft_str_is_alpha : que des lettres ?\nint ft_str_is_alpha(char *str)\n{\n    int i;\n\n    i = 0;\n    while (str[i])\n    {\n        if (!((str[i] >= 'a' && str[i] <= 'z')\n            || (str[i] >= 'A' && str[i] <= 'Z')))\n            return (0);  // Pas une lettre → FAUX\n        i++;\n    }\n    return (1);  // Tout est OK (ou string vide)\n}\n\n// Même pattern pour :\n// ft_str_is_numeric  : '0'-'9'\n// ft_str_is_lowercase : 'a'-'z'\n// ft_str_is_uppercase : 'A'-'Z'\n// ft_str_is_printable : 32-126 (ASCII imprimable)\n\n// PIÈGE : str = \"\" → la boucle ne s'exécute pas\n//         → return (1) → VRAI !" },
          { type: "key", value: "String vide = retourne 1 (vrai). C'est logique : il n'y a aucun caractère qui viole la condition. C'est le piège classique de C02." },
        ],
        quiz: {
          question: "ft_str_is_alpha(\"\") retourne quoi ?",
          options: ["0 (faux)", "1 (vrai)", "-1 (erreur)", "Comportement indéfini"],
          correct: 1,
          explanation: "String vide : la boucle while ne s'exécute jamais (str[0] = '\\0' = faux). On arrive directement au return (1). C'est la convention : aucun caractère ne viole la règle.",
        },
      },
    },
    {
      id: "m4-l4", title: "ft_strupcase / ft_strlowcase : convertir la casse", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "Convertir une string en majuscules ou minuscules. L'astuce est simple : en ASCII, la différence entre une minuscule et sa majuscule est TOUJOURS 32." },
          { type: "code", value: "// 'a' = 97, 'A' = 65 → différence = 32\n// 'z' = 122, 'Z' = 90 → différence = 32\n\nchar *ft_strupcase(char *str)\n{\n    int i;\n\n    i = 0;\n    while (str[i])\n    {\n        if (str[i] >= 'a' && str[i] <= 'z')\n            str[i] = str[i] - 32;  // minuscule → MAJUSCULE\n        i++;\n    }\n    return (str);\n}\n\nchar *ft_strlowcase(char *str)\n{\n    int i;\n\n    i = 0;\n    while (str[i])\n    {\n        if (str[i] >= 'A' && str[i] <= 'Z')\n            str[i] = str[i] + 32;  // MAJUSCULE → minuscule\n        i++;\n    }\n    return (str);\n}\n\n// On peut aussi écrire : str[i] -= 'a' - 'A';\n// C'est plus lisible et ne dépend pas du 32." },
          { type: "key", value: "Minuscule → Majuscule : - 32 (ou - ('a' - 'A')). Majuscule → Minuscule : + 32. Ne touche que les lettres, laisse le reste intact." },
        ],
        quiz: {
          question: "Comment convertir 'a' en 'A' ?",
          options: ["Ajouter 32", "Soustraire 32", "Multiplier par 2", "Soustraire 'a'"],
          correct: 1,
          explanation: "'a' = 97, 'A' = 65. 97 - 32 = 65 = 'A'. Soustraire 32 convertit minuscule → majuscule.",
        },
      },
    },
    {
      id: "m4-l5", title: "ft_strcapitalize : logique de début de mot", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "ft_strcapitalize met en majuscule la première lettre de chaque mot. Un mot = suite de caractères alphanumériques. C'est l'exo le plus subtil de C02." },
          { type: "code", value: "char *ft_strcapitalize(char *str)\n{\n    int i;\n    int new_word;\n\n    i = 0;\n    new_word = 1;  // Le début de la string = début de mot\n    while (str[i])\n    {\n        if (str[i] >= 'a' && str[i] <= 'z' && new_word)\n            str[i] -= 32;          // Première lettre → MAJ\n        else if (str[i] >= 'A' && str[i] <= 'Z' && !new_word)\n            str[i] += 32;          // Pas début → min\n        // Est-ce qu'on est dans un mot ?\n        if ((str[i] >= 'a' && str[i] <= 'z')\n            || (str[i] >= 'A' && str[i] <= 'Z')\n            || (str[i] >= '0' && str[i] <= '9'))\n            new_word = 0;          // Dans un mot\n        else\n            new_word = 1;          // Séparateur → prochain = début\n        i++;\n    }\n    return (str);\n}\n\n// \"hello world-42fun\" → \"Hello World-42fun\"\n// '4' est alphanumérique mais pas une lettre\n// → 'f' n'est PAS un début de mot" },
          { type: "key", value: "Un mot commence après un caractère non-alphanumérique. Les chiffres font partie du mot mais ne se capitalisent pas. '42fun' → '42fun', pas '42Fun'." },
        ],
        quiz: {
          question: "ft_strcapitalize sur \"42words\" → que donne le 'w' ?",
          options: ["'W' (majuscule)", "'w' (reste minuscule)", "Erreur", "Dépend de l'implémentation"],
          correct: 1,
          explanation: "'4' et '2' sont alphanumériques, donc on est toujours dans le même mot. 'w' n'est pas un début de mot → reste minuscule.",
        },
      },
    },
    {
      id: "m4-l6", title: "ft_strlcpy : la version sécurisée", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "ft_strlcpy est la version 'safe' de strcpy. Elle copie au maximum size-1 caractères et ajoute TOUJOURS un \\0. Elle retourne la longueur de src (pas de dest !)." },
          { type: "code", value: "unsigned int ft_strlcpy(char *dest, char *src,\n                        unsigned int size)\n{\n    unsigned int i;\n    unsigned int src_len;\n\n    src_len = 0;\n    while (src[src_len])  // Calcule strlen(src)\n        src_len++;\n    if (size == 0)\n        return (src_len); // Rien à copier\n    i = 0;\n    while (src[i] && i < size - 1)  // Copie max size-1\n    {\n        dest[i] = src[i];\n        i++;\n    }\n    dest[i] = '\\0';      // TOUJOURS un \\0\n    return (src_len);     // Retourne strlen(src)\n}\n\n// Pourquoi retourner strlen(src) ?\n// Pour savoir si la copie a été tronquée :\n// if (ft_strlcpy(dest, src, size) >= size)\n//     // La string a été tronquée !" },
          { type: "key", value: "ft_strlcpy copie size-1 chars + \\0. Retourne strlen(src). Si retour >= size → la string a été tronquée. Cas size=0 : ne copie rien, retourne strlen(src)." },
        ],
        quiz: {
          question: "ft_strlcpy(dest, \"Hello\", 3) → que contient dest et que retourne la fonction ?",
          options: ["dest=\"He\\0\", retourne 2", "dest=\"He\\0\", retourne 5", "dest=\"Hel\", retourne 3", "dest=\"Hello\", retourne 5"],
          correct: 1,
          explanation: "On copie 3-1=2 chars ('H','e'), on ajoute '\\0'. Mais on retourne strlen(\"Hello\") = 5. Comme 5 >= 3, on sait que la copie est tronquée.",
        },
      },
    },
  ],
};
