// Module 4 — C02 : Manipulation de strings
// Exercices couverts : ft_strcpy, ft_strncpy, ft_str_is_alpha, ft_str_is_numeric,
// ft_str_is_lowercase, ft_str_is_uppercase, ft_str_is_printable,
// ft_strupcase, ft_strlowcase, ft_strcapitalize, ft_strlcpy
window.MODULE_M4 = {
  id: "m4", title: "C02 : Manipulation de strings", icon: "📝",
  description: "Copier, vérifier, transformer des strings — ft_strcpy, ft_str_is_*, ft_strupcase",
  color: "#14B8A6",
  tag: "C02",
  lessons: [
    {
      id: "m4-l1", title: "Copier une string : strcpy et strncpy", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "Copier une string en C, c'est copier chaque caractère un par un, Y COMPRIS le '\\0' final. Sans ce '\\0', la string n'a pas de fin et les fonctions liront n'importe quoi en mémoire." },
          { type: "analogy", value: "Imagine recopier un mot sur un tableau blanc : tu copies chaque lettre, puis tu poses la craie (le \\0). Si tu oublies de poser la craie, quelqu'un d'autre pourrait croire que le mot continue avec ce qui était écrit avant." },
          { type: "visual", value: "string", str: "Hello" },
          { type: "exercise", title: "ft_strcpy", subject: "Écrire une fonction qui copie la string src dans dest (y compris le \\0), et retourne dest.", prototype: "char *ft_strcpy(char *dest, char *src);" },
          { type: "hint", hints: [
            "Parcours src avec un index i et copie chaque caractère dans dest[i].",
            "La boucle s'arrête quand src[i] == '\\0', mais il faut AUSSI copier ce '\\0' dans dest.",
            "Après la boucle while(src[i]), fais dest[i] = '\\0'. Puis retourne dest.",
          ]},
          { type: "reveal", label: "Voir la solution ft_strcpy", code: "char *ft_strcpy(char *dest, char *src)\n{\n    int i;\n\n    i = 0;\n    while (src[i])\n    {\n        dest[i] = src[i];\n        i++;\n    }\n    dest[i] = '\\0';\n    return (dest);\n}", explanation: "On copie caractère par caractère jusqu'au \\0, puis on ajoute le \\0 dans dest. Le return (dest) est la convention de strcpy." },
          { type: "exercise", title: "ft_strncpy", subject: "Écrire une fonction qui copie au maximum n caractères de src dans dest. Si src est plus courte que n, remplir le reste de dest avec des \\0.", prototype: "char *ft_strncpy(char *dest, char *src, unsigned int n);" },
          { type: "hint", hints: [
            "Deux boucles : la première copie src tant que i < n ET src[i] existe. La deuxième remplit le reste avec des \\0.",
            "Attention : si src est PLUS LONGUE que n, on ne met PAS de \\0. C'est le comportement standard de strncpy.",
            "Première boucle : while (src[i] && i < n). Deuxième boucle : while (i < n) dest[i++] = '\\0'.",
          ]},
          { type: "reveal", label: "Voir la solution ft_strncpy", code: "char *ft_strncpy(char *dest, char *src, unsigned int n)\n{\n    unsigned int i;\n\n    i = 0;\n    while (src[i] && i < n)\n    {\n        dest[i] = src[i];\n        i++;\n    }\n    while (i < n)\n    {\n        dest[i] = '\\0';\n        i++;\n    }\n    return (dest);\n}", explanation: "Si src est plus courte que n : on remplit de \\0. Si src >= n : on coupe à n, SANS \\0. C'est le comportement standard de strncpy." },
          { type: "key", value: "strcpy copie TOUT y compris \\0. strncpy copie au max n chars et remplit de \\0 si src est courte. Si src >= n, PAS de \\0 ajouté — piège classique !" },
          { type: "resources", items: [
            { icon: "📖", value: "man 3 strcpy — copie une string dans une autre" },
            { icon: "📖", value: "man 3 strncpy — copie avec limite de taille" },
            { icon: "⚠️", value: "strcpy ne vérifie PAS la taille de dest — risque de buffer overflow" },
          ]},
        ],
        quiz: {
          type: "bug",
          code: "char *ft_strcpy(char *dest, char *src)\n{\n    int i;\n\n    i = 0;\n    while (src[i])\n    {\n        dest[i] = src[i];\n        i++;\n    }\n    return (dest);\n}",
          question: "Ce ft_strcpy a un bug. Lequel ?",
          options: ["Il manque le return", "Il ne copie pas le \\0 final", "i devrait être unsigned", "Il faut utiliser src[i] != 0"],
          correct: 1,
          explanation: "Après la boucle, il manque dest[i] = '\\0'. Sans ça, la string copiée n'a pas de fin. Les fonctions qui la liront dépasseront la zone mémoire prévue.",
        },
      },
    },
    {
      id: "m4-l2", title: "ft_str_is_alpha et ft_str_is_numeric", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "Ces fonctions vérifient si TOUS les caractères d'une string sont d'un certain type. Le pattern est toujours le même : parcourir, tester chaque char, retourner 0 dès qu'un ne correspond pas." },
          { type: "text", value: "Le piège de C02 : une string vide (\"\") retourne 1 (vrai). C'est logique — aucun caractère ne viole la condition. Mais c'est facile à oublier." },
          { type: "visual", value: "string", str: "abc42" },
          { type: "exercise", title: "ft_str_is_alpha", subject: "Écrire une fonction qui retourne 1 si la string ne contient que des lettres (a-z, A-Z), 0 sinon. Une string vide retourne 1.", prototype: "int ft_str_is_alpha(char *str);" },
          { type: "hint", hints: [
            "Parcours avec while(str[i]). Pour chaque caractère, vérifie s'il est une lettre.",
            "Un caractère est une lettre si (str[i] >= 'a' && str[i] <= 'z') OU (str[i] >= 'A' && str[i] <= 'Z').",
            "Si un caractère n'est PAS une lettre, return (0) immédiatement. Si la boucle finit sans return 0, return (1).",
          ]},
          { type: "reveal", label: "Voir la solution ft_str_is_alpha", code: "int ft_str_is_alpha(char *str)\n{\n    int i;\n\n    i = 0;\n    while (str[i])\n    {\n        if (!((str[i] >= 'a' && str[i] <= 'z')\n            || (str[i] >= 'A' && str[i] <= 'Z')))\n            return (0);\n        i++;\n    }\n    return (1);\n}", explanation: "On parcourt chaque char. Dès qu'un n'est pas une lettre, on retourne 0. Si on finit la boucle, tout est bon → 1. String vide : la boucle ne s'exécute pas → 1." },
          { type: "exercise", title: "ft_str_is_numeric", subject: "Écrire une fonction qui retourne 1 si la string ne contient que des chiffres (0-9), 0 sinon. Une string vide retourne 1.", prototype: "int ft_str_is_numeric(char *str);" },
          { type: "hint", hints: [
            "Exactement le même pattern que ft_str_is_alpha.",
            "Seul le test change : str[i] >= '0' && str[i] <= '9'.",
            "N'oublie pas : '0' c'est le CARACTÈRE 0 (valeur ASCII 48), pas le nombre 0.",
          ]},
          { type: "reveal", label: "Voir la solution ft_str_is_numeric", code: "int ft_str_is_numeric(char *str)\n{\n    int i;\n\n    i = 0;\n    while (str[i])\n    {\n        if (!(str[i] >= '0' && str[i] <= '9'))\n            return (0);\n        i++;\n    }\n    return (1);\n}", explanation: "Même pattern : parcourir, tester, retourner 0 au premier caractère invalide. Return 1 si tous sont des chiffres." },
          { type: "key", value: "Le pattern est toujours : parcourir → tester → return 0 au premier échec → return 1 à la fin. String vide = 1 (vrai). Ce pattern sert pour TOUS les ft_str_is_*." },
          { type: "resources", items: [
            { icon: "📖", value: "man 3 isalpha — la version standard (prend un int, pas une string)" },
            { icon: "📖", value: "man 3 isdigit — idem pour les chiffres" },
            { icon: "💡", value: "En ASCII : 'a'=97, 'z'=122, 'A'=65, 'Z'=90, '0'=48, '9'=57" },
          ]},
        ],
        quiz: {
          type: "output",
          code: "printf(\"%d\", ft_str_is_alpha(\"\"));\nprintf(\"%d\", ft_str_is_alpha(\"Hello\"));\nprintf(\"%d\", ft_str_is_alpha(\"Hello42\"));",
          question: "Que va afficher ce code (3 chiffres) ?",
          options: ["011", "110", "111", "010"],
          correct: 1,
          explanation: "\"\" → 1 (vide = vrai). \"Hello\" → 1 (que des lettres). \"Hello42\" → 0 (les '4' et '2' ne sont pas des lettres).",
        },
      },
    },
    {
      id: "m4-l3", title: "ft_str_is_lowercase, uppercase, printable", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "Trois variantes du même pattern. Seules les bornes ASCII changent. C'est du copier-adapter — une fois que tu as ft_str_is_alpha, les autres sont triviales." },
          { type: "code", value: "// Rappel des plages ASCII :\n// 'a' (97)  → 'z' (122) : minuscules\n// 'A' (65)  → 'Z' (90)  : majuscules\n// 32        → 126        : caractères imprimables\n// (l'espace ' ' = 32 est imprimable, DEL = 127 ne l'est pas)" },
          { type: "exercise", title: "ft_str_is_lowercase", subject: "Retourne 1 si la string ne contient que des minuscules (a-z), 0 sinon.", prototype: "int ft_str_is_lowercase(char *str);" },
          { type: "hint", hints: [
            "Même pattern que ft_str_is_alpha, mais tu ne gardes que la plage minuscule.",
            "Test : str[i] >= 'a' && str[i] <= 'z'. Tout le reste retourne 0.",
          ]},
          { type: "reveal", label: "Voir la solution ft_str_is_lowercase", code: "int ft_str_is_lowercase(char *str)\n{\n    int i;\n\n    i = 0;\n    while (str[i])\n    {\n        if (!(str[i] >= 'a' && str[i] <= 'z'))\n            return (0);\n        i++;\n    }\n    return (1);\n}", explanation: "Seul le test change : on ne vérifie que la plage 'a'-'z'. Le reste du pattern est identique." },
          { type: "exercise", title: "ft_str_is_uppercase", subject: "Retourne 1 si la string ne contient que des majuscules (A-Z), 0 sinon.", prototype: "int ft_str_is_uppercase(char *str);" },
          { type: "hint", hints: [
            "Exactement comme ft_str_is_lowercase mais avec 'A'-'Z'.",
          ]},
          { type: "reveal", label: "Voir la solution ft_str_is_uppercase", code: "int ft_str_is_uppercase(char *str)\n{\n    int i;\n\n    i = 0;\n    while (str[i])\n    {\n        if (!(str[i] >= 'A' && str[i] <= 'Z'))\n            return (0);\n        i++;\n    }\n    return (1);\n}", explanation: "On ne garde que la plage 'A'-'Z'. Même structure, seules les bornes changent." },
          { type: "exercise", title: "ft_str_is_printable", subject: "Retourne 1 si la string ne contient que des caractères imprimables (ASCII 32 à 126), 0 sinon.", prototype: "int ft_str_is_printable(char *str);" },
          { type: "hint", hints: [
            "Les caractères imprimables vont de 32 (espace) à 126 (~). En dessous ou au-dessus : non imprimable.",
            "Test : str[i] >= 32 && str[i] <= 126. Ou bien str[i] >= ' ' && str[i] <= '~'.",
          ]},
          { type: "reveal", label: "Voir la solution ft_str_is_printable", code: "int ft_str_is_printable(char *str)\n{\n    int i;\n\n    i = 0;\n    while (str[i])\n    {\n        if (!(str[i] >= 32 && str[i] <= 126))\n            return (0);\n        i++;\n    }\n    return (1);\n}", explanation: "Caractères imprimables : de l'espace (32) au tilde (126). Le \\t (9), \\n (10) et DEL (127) ne sont PAS imprimables." },
          { type: "key", value: "Les 5 fonctions ft_str_is_* suivent LE MÊME pattern. Seules les bornes du test changent. Maîtrise le pattern une fois, adapte 5 fois." },
        ],
        quiz: {
          type: "truefalse",
          statement: "Le caractère tabulation (\\t, ASCII 9) est considéré comme imprimable par ft_str_is_printable.",
          correct: false,
          explanation: "\\t a la valeur ASCII 9. Les caractères imprimables vont de 32 à 126. 9 < 32, donc \\t n'est PAS imprimable. Seul l'espace (32) et au-dessus sont imprimables.",
        },
      },
    },
    {
      id: "m4-l4", title: "ft_strupcase et ft_strlowcase", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "Convertir une string en majuscules ou minuscules. L'astuce clé : en ASCII, la différence entre une minuscule et sa majuscule est TOUJOURS 32." },
          { type: "code", value: "// Table ASCII (extrait) :\n// 'A' = 65    'a' = 97    →  97 - 65 = 32\n// 'B' = 66    'b' = 98    →  98 - 66 = 32\n// 'Z' = 90    'z' = 122   → 122 - 90 = 32\n//\n// Minuscule → Majuscule : soustraire 32\n// Majuscule → Minuscule : ajouter 32\n// Plus élégant : str[i] -= ('a' - 'A')" },
          { type: "visual", value: "string", str: "Hello" },
          { type: "exercise", title: "ft_strupcase", subject: "Écrire une fonction qui met chaque lettre de la string en majuscule. Les caractères non-alphabétiques restent inchangés.", prototype: "char *ft_strupcase(char *str);" },
          { type: "hint", hints: [
            "Parcours la string. Pour chaque caractère, vérifie si c'est une minuscule (entre 'a' et 'z').",
            "Si c'est une minuscule, soustrais 32 (ou 'a' - 'A') pour la convertir en majuscule.",
            "Ne touche PAS aux caractères qui ne sont pas des minuscules (chiffres, espaces, etc.).",
          ]},
          { type: "reveal", label: "Voir la solution ft_strupcase", code: "char *ft_strupcase(char *str)\n{\n    int i;\n\n    i = 0;\n    while (str[i])\n    {\n        if (str[i] >= 'a' && str[i] <= 'z')\n            str[i] -= 32;\n        i++;\n    }\n    return (str);\n}", explanation: "On parcourt chaque char. Si c'est une minuscule, on soustrait 32 pour la convertir en majuscule. Les autres chars restent intacts." },
          { type: "exercise", title: "ft_strlowcase", subject: "Écrire une fonction qui met chaque lettre de la string en minuscule. Les caractères non-alphabétiques restent inchangés.", prototype: "char *ft_strlowcase(char *str);" },
          { type: "hint", hints: [
            "Même logique que ft_strupcase, mais inversée.",
            "Vérifie si c'est une MAJUSCULE ('A'-'Z'), puis AJOUTE 32.",
          ]},
          { type: "reveal", label: "Voir la solution ft_strlowcase", code: "char *ft_strlowcase(char *str)\n{\n    int i;\n\n    i = 0;\n    while (str[i])\n    {\n        if (str[i] >= 'A' && str[i] <= 'Z')\n            str[i] += 32;\n        i++;\n    }\n    return (str);\n}", explanation: "Même pattern inversé : on détecte les majuscules et on ajoute 32. 'A' + 32 = 'a'." },
          { type: "key", value: "Minuscule → Majuscule : - 32. Majuscule → Minuscule : + 32. Ne touche que les lettres, ignore tout le reste." },
          { type: "resources", items: [
            { icon: "📖", value: "man 3 toupper / man 3 tolower — les versions standard (un char à la fois)" },
            { icon: "💡", value: "str[i] -= ('a' - 'A') est plus lisible que -= 32 et ne dépend pas de la valeur exacte" },
          ]},
        ],
        quiz: {
          type: "output",
          code: "char s[] = \"Hello 42!\";\nft_strupcase(s);\nprintf(\"%s\", s);",
          question: "Que va afficher ce code ?",
          options: ["HELLO 42!", "hello 42!", "HELLO42", "Hello 42!"],
          correct: 0,
          explanation: "'H' reste 'H' (déjà majuscule). 'e','l','l','o' deviennent 'E','L','L','O'. L'espace, '4', '2', '!' ne sont pas des lettres → restent intacts.",
        },
      },
    },
    {
      id: "m4-l5", title: "ft_strcapitalize : la logique de début de mot", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "L'exercice le plus subtil de C02. Il faut mettre en majuscule la PREMIÈRE lettre de chaque mot, et le reste en minuscule. Un 'mot' = suite de caractères alphanumériques." },
          { type: "text", value: "Le piège : les CHIFFRES font partie du mot ! Donc dans \"42hello\", le 'h' n'est PAS un début de mot car '2' est alphanumérique." },
          { type: "visual", value: "string", str: "hello world-42fun" },
          { type: "exercise", title: "ft_strcapitalize", subject: "Met en majuscule la première lettre de chaque mot et le reste en minuscule. Un mot est une suite de caractères alphanumériques, séparés par tout autre caractère.", prototype: "char *ft_strcapitalize(char *str);" },
          { type: "hint", hints: [
            "Tu as besoin d'un flag 'new_word' qui est vrai au début et après chaque séparateur (non-alphanumérique).",
            "Si new_word est vrai et que le char courant est une lettre minuscule → convertis en majuscule. Si new_word est faux et que c'est une majuscule → convertis en minuscule.",
            "Mets à jour new_word : si le char est alphanumérique (lettre OU chiffre), new_word = 0. Sinon, new_word = 1.",
            "Le résultat attendu : \"hello world-42fun\" → \"Hello World-42fun\". Le 'f' reste minuscule car '2' fait partie du mot.",
          ]},
          { type: "reveal", label: "Voir la solution ft_strcapitalize", code: "char *ft_strcapitalize(char *str)\n{\n    int i;\n    int new_word;\n\n    i = 0;\n    new_word = 1;\n    while (str[i])\n    {\n        if (str[i] >= 'a' && str[i] <= 'z' && new_word)\n            str[i] -= 32;\n        else if (str[i] >= 'A' && str[i] <= 'Z' && !new_word)\n            str[i] += 32;\n        if ((str[i] >= 'a' && str[i] <= 'z')\n            || (str[i] >= 'A' && str[i] <= 'Z')\n            || (str[i] >= '0' && str[i] <= '9'))\n            new_word = 0;\n        else\n            new_word = 1;\n        i++;\n    }\n    return (str);\n}", explanation: "Le flag new_word commence à 1 (début = nouveau mot). On capitalise si c'est une lettre en début de mot, on minusculise sinon. Les chiffres font partie du mot sans être capitalisables." },
          { type: "key", value: "Un mot commence après un caractère non-alphanumérique. Les chiffres font partie du mot mais ne se capitalisent pas. \"42fun\" → \"42fun\", PAS \"42Fun\"." },
          { type: "resources", items: [
            { icon: "⚠️", value: "Erreur fréquente : oublier que les chiffres font partie du mot" },
            { icon: "💡", value: "Teste avec : \"hello world\", \"42abc\", \"a-b.c\", \"\", \"HELLO\"" },
          ]},
        ],
        quiz: {
          type: "output",
          code: "char s[] = \"salut, 42PARIS!monde\";\nft_strcapitalize(s);\nprintf(\"%s\", s);",
          question: "Que va afficher ce code ?",
          options: ["Salut, 42Paris!Monde", "Salut, 42paris!Monde", "Salut, 42paris!monde", "salut, 42paris!monde"],
          correct: 1,
          explanation: "\"salut\" → \"Salut\" (début de mot). \",\" = séparateur. \" \" = séparateur. \"42PARIS\" → \"42paris\" (4 commence le mot, PARIS en minuscule car pas début). \"!\" = séparateur. \"monde\" → \"Monde\" (début de mot).",
        },
      },
    },
    {
      id: "m4-l6", title: "ft_strlcpy : la copie sécurisée", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "ft_strlcpy est la version 'safe' de strcpy. Elle copie au maximum size-1 caractères et ajoute TOUJOURS un \\0 à la fin. Elle retourne la longueur de src (pas de dest !)." },
          { type: "text", value: "Pourquoi retourner strlen(src) ? Pour détecter la troncation : si le retour >= size, la string a été coupée. C'est un idiome classique BSD." },
          { type: "visual", value: "string", str: "Hello" },
          { type: "exercise", title: "ft_strlcpy", subject: "Copie src dans dest avec une taille maximum de size (incluant le \\0). Retourne la longueur de src. Si size == 0, ne copie rien mais retourne quand même strlen(src).", prototype: "unsigned int ft_strlcpy(char *dest, char *src, unsigned int size);" },
          { type: "hint", hints: [
            "D'abord, calcule la longueur de src (tu en auras besoin pour le return).",
            "Si size == 0, retourne directement strlen(src) sans rien copier.",
            "Copie au maximum size - 1 caractères de src dans dest, puis ajoute dest[i] = '\\0'.",
            "Retourne TOUJOURS strlen(src), même si tu n'as pas tout copié. C'est ce qui permet de détecter la troncation.",
          ]},
          { type: "reveal", label: "Voir la solution ft_strlcpy", code: "unsigned int ft_strlcpy(char *dest, char *src, unsigned int size)\n{\n    unsigned int i;\n    unsigned int src_len;\n\n    src_len = 0;\n    while (src[src_len])\n        src_len++;\n    if (size == 0)\n        return (src_len);\n    i = 0;\n    while (src[i] && i < size - 1)\n    {\n        dest[i] = src[i];\n        i++;\n    }\n    dest[i] = '\\0';\n    return (src_len);\n}", explanation: "On calcule strlen(src), puis on copie au max size-1 chars + \\0. Le retour est strlen(src). Si retour >= size → troncation détectable." },
          { type: "key", value: "strlcpy copie size-1 chars + \\0. Retourne strlen(src). Si retour >= size → la copie est tronquée. Cas size == 0 : ne copie rien, retourne strlen(src)." },
          { type: "resources", items: [
            { icon: "📖", value: "man 3 strlcpy — version BSD, pas dans la libc standard de Linux (mais dans la norme C23)" },
            { icon: "💡", value: "if (ft_strlcpy(dest, src, size) >= size) → la string a été tronquée" },
            { icon: "⚠️", value: "Erreur classique : oublier le cas size == 0 (division par zéro avec size - 1 si unsigned)" },
          ]},
        ],
        quiz: {
          type: "fill",
          code: "unsigned int ft_strlcpy(char *dest, char *src, unsigned int size)\n{\n    unsigned int i;\n    unsigned int src_len;\n\n    src_len = 0;\n    while (src[src_len])\n        src_len++;\n    if (size == 0)\n        return (src_len);\n    i = 0;\n    while (src[i] && ______)\n    {\n        dest[i] = src[i];\n        i++;\n    }\n    dest[i] = '\\0';\n    return (______);\n}",
          question: "Complète les deux blancs dans ft_strlcpy.",
          options: ["i < size / i", "i < size - 1 / src_len", "i < size - 1 / i", "i <= size / src_len"],
          correct: 1,
          explanation: "La boucle copie tant que i < size - 1 (on garde 1 place pour le \\0). On retourne src_len (la longueur de src, pas de dest) pour permettre la détection de troncation.",
        },
      },
    },
    {
      id: "m4-l7", title: "Récap C02 : le pattern commun", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "C02, c'est UN SEUL pattern décliné 11 fois : parcourir une string char par char avec while(str[i]) et agir sur chaque caractère. Maîtrise ce pattern, et tout C02 tombe." },
          { type: "code", value: "// Le squelette de TOUTES les fonctions C02 :\ntype ft_quelquechose(char *str)\n{\n    int i;\n\n    i = 0;\n    while (str[i])          // Parcours jusqu'au \\0\n    {\n        // Teste / modifie str[i]\n        i++;\n    }\n    return (quelquechose);  // str, 1/0, dest...\n}" },
          { type: "key", value: "C02 = while(str[i]) + action sur chaque char. Les variantes : copier (strcpy), tester (str_is_*), transformer (strupcase), ou un mix (strcapitalize)." },
          { type: "resources", items: [
            { icon: "📖", value: "man ascii — la table ASCII complète, indispensable pour C02" },
            { icon: "💡", value: "Les plages à connaître : 'a'-'z' (97-122), 'A'-'Z' (65-90), '0'-'9' (48-57), imprimable (32-126)" },
            { icon: "⚠️", value: "Piège récurrent : string vide → la boucle ne s'exécute pas → return (1) ou str inchangée" },
          ]},
        ],
        quiz: {
          type: "truefalse",
          statement: "Dans ft_strncpy, si src fait 3 caractères et n vaut 10, les 7 positions restantes de dest sont remplies avec des \\0.",
          correct: true,
          explanation: "C'est le comportement standard de strncpy : si src est plus courte que n, le reste est rempli de \\0. C'est la deuxième boucle while (i < n) dans l'implémentation.",
        },
      },
    },
  ],
};
